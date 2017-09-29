import {exec, execSync} from 'child_process';
import axios from 'axios';
import {version} from '../../package.json';
import fs from 'fs';

const puiProjectId = '1126018';
const token = '99f0bca6045f9a83715a284a1a2b37cc';

const ChangelogHelper = {
  updateChangelog: async() => {
    const newChangelogSection = await ChangelogHelper.generateChangelog(version);
    const currentChangelog = fs.readFileSync('CHANGELOG.md');
    const newChangeLog = `${newChangelogSection}\n${currentChangelog}`;
    fs.writeFileSync('CHANGELOG.md', newChangeLog);
  },

  generateChangelog: async nextVersion => {
    const stories = await ChangelogHelper.getStoriesSinceLastTag();
    const bugStories = stories.filter(story => story.story_type === 'bug');
    const featureStories = stories.filter(story => story.story_type === 'feature');
    const bugFixes = ChangelogHelper.generateSummary('Bug Fixes', bugStories);
    const features = ChangelogHelper.generateSummary('Features', featureStories);
    const formattedDate = ChangelogHelper.getDate();

    return `<a name="${nextVersion}"></a>
## ${nextVersion} (${formattedDate})

${bugFixes}

${features}
`;
  },

  getDate(){
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    return `${year}-${month}-${date}`;
  },

  generateSummary: (header, storyList) => {
    const summary = storyList.map(story => `* ${story.name} [#${story.id}]`).join('\n');
    return summary ? `### ${header}\n\n${summary}` : '';
  },

  generateStoryList: stories => {
    return stories.map((story) => {
      return `* ${story.name} [#${story.id}]`;
    });
  },

  getBranch: () => {
    const stdout = execSync('git rev-parse --abbrev-ref HEAD');
    return stdout.toString().trim();
  },

  getStoryIds: commits => {
    const storyIdRegex = /#([0-9]+)/g;
    const storyIds = [];
    let match;

    do {
      match = storyIdRegex.exec(commits);
      if (match) {
        storyIds.push(match[1]);
      }
    } while (match);
    return storyIds;
  },

  getStory: async storyId => {
    const endpoint = `https://www.pivotaltracker.com/services/v5/projects/${puiProjectId}/stories/${storyId}`;
    return await axios.get(endpoint, {headers: {'X-TrackerToken': token}});
  },

  getStoriesSinceLastTag: async() => {
    const branch = ChangelogHelper.getBranch();
    if (branch === 'HEAD') {
      console.error('Could not determine branch');
      return;
    }

    const commits = execSync(`git log \`git describe --tags --abbrev=0\`..${branch} --oneline`);

    const storyIds = Array.from(new Set(ChangelogHelper.getStoryIds(commits)));

    const stories = storyIds.map(async(storyId) => {
      try {
        return (await ChangelogHelper.getStory(storyId)).data;
      } catch (e) {
        console.error(e);
      }
    });
    return (await Promise.all(stories)).filter(story => story);
  }
};

export default ChangelogHelper;