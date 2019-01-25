import {version} from '../../package.json';
import fs from 'fs';

const peerDepNote = 'React 16 is no longer a direct dependency. Now, React is a peer dependency, requiring version 15 or 16.';

const hardcodedNotes = {
  '10.4.0': peerDepNote,
  '11.2.0': peerDepNote,
  '12.4.0': peerDepNote,
  '13.1.0': peerDepNote,
  '14.1.0': peerDepNote,
  '15.1.0': peerDepNote,
  '16.1.0': peerDepNote
};

const trackerIcons = {
  bug: ':beetle:',
  chore: ':gear:',
  feature: ':star:'
};

function getStoryNumbers(messages) {
  const storyNumbers = {};
  messages.forEach(message => {
    const re = /#(\d{9,})/gm;
    let matches;
    while (matches = re.exec(message)) {
      storyNumbers[matches[1]] = true;
    }
  });
  return Object.keys(storyNumbers);
}

function formatStory(storyNumber, stories) {
  if (!stories[storyNumber]) return `#${storyNumber}`;
  const icon = trackerIcons[stories[storyNumber].story_type];
  return `[${icon}#${storyNumber}](https://www.pivotaltracker.com/story/show/${storyNumber})`;
}

const privates = new WeakMap();

export default class Changelog_helper {
  constructor(gitHelper, trackerHelper) {
    privates.set(this, {gitHelper, trackerHelper});
  }

  async updateChangelog(firstTag) {
    const {gitHelper} = privates.get(this);
    const tags = [version, ...await gitHelper.getTags(firstTag, version)];
    const sections = (await Promise.all(tags.map(tag => this.getDiff(tag)))).join('\n');
    const oldChangelog = await gitHelper.getFile('CHANGELOG.md', await gitHelper.getPreviousTagSha(firstTag));
    fs.writeFileSync('CHANGELOG.md', `${sections}\n${oldChangelog}`);
  }

  async getDiff(tag) {
    const {gitHelper, trackerHelper} = privates.get(this);
    const previousTagSha = await gitHelper.getPreviousTagSha(tag);
    const latestCommit = await gitHelper.getLatestCommit(tag);
    const commits = await gitHelper.getCommits(previousTagSha, latestCommit);
    const storyNumbers = getStoryNumbers(Object.values(commits));
    const stories = await trackerHelper.getStories(storyNumbers);
    const files = await gitHelper.getFiles(Object.keys(commits));
    const summary = gitHelper.getSummary(files, commits);
    const categories = Object.keys(summary);
    categories.sort();
    const componentsMd = categories.map(category => {
      const components = Object.keys(summary[category]);
      components.sort();
      const componentsMd = components.map(component => {
        const commits = summary[category][component];
        const commitsMd = Object.keys(commits).map(sha => {
          const message = commits[sha].replace(/#(\d{9,})/,
            (full, storyNumber) => formatStory(storyNumber, stories));
          const link = `https://github.com/pivotal-cf/pivotal-ui/commit/${sha}`;
          return `${message} ([${sha}](${link}))`;
        });
        const prefix = `* **${component}**:`;
        if (commitsMd.length === 1) return `${prefix} ${commitsMd[0]}`;
        return `${prefix}\n${commitsMd.map(c => `  * ${c}`).join('\n')}`;
      });
      return `#### ${category}\n${componentsMd.join('\n')}`;
    });
    const headingMd = tag.split('.').pop() === '0' ? '#' : '##';
    const semver = tag.replace(/^v/, '');
    const commitDate = tag !== version ? await gitHelper.getCommitDate(tag) : Date.now();
    const date = new Date(commitDate).toISOString().split('T')[0];
    const notes = hardcodedNotes[semver] ? `\n${hardcodedNotes[semver]}` : '';
    return `<a name="${semver}"></a>
${headingMd} ${semver} (${date})${notes}
${componentsMd.join('\n')}`;
  }
};