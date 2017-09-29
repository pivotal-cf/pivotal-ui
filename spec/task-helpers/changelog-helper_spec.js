import ChangelogHelper from '../../tasks/helpers/changelog-helper';
import ChildProcess from 'child_process';
import axios from 'axios';
import fs from 'fs';
import {version} from '../../package.json';

describe('ChangelogHelper', () => {
  describe('#getBranch', () => {
    let branch;

    beforeEach(() => {
      spyOn(ChildProcess, 'execSync').and.returnValue('branch-name  ');
      branch = ChangelogHelper.getBranch();
    });

    it('returns the branch name', () => {
      expect(branch).toBe('branch-name');
    })
  });

  describe('#getStoryIds', () => {
    let storyIds;

    beforeEach(() => {
      const commits = 'some commit[#12345678]\nsome commit2[#454522335]\nsome commit3 #898945\n';
      storyIds = ChangelogHelper.getStoryIds(commits);
    });

    it('gets all the story ids', () => {
      expect(storyIds).toEqual(['12345678', '454522335', '898945']);
    });
  });

  describe('#getStory', () => {
    let story;

    beforeEach(async(done) => {
      spyOn(axios, 'get').and.returnValue(Promise.resolve({data: {resp: 'resp'}}));
      done();
    });

    it('calls the correct endpoint', async(done) => {
      await ChangelogHelper.getStory('12345');
      expect(axios.get).toHaveBeenCalledWith(`https://www.pivotaltracker.com/services/v5/projects/1126018/stories/12345`,
        {headers: {'X-TrackerToken': '99f0bca6045f9a83715a284a1a2b37cc'}});
      done();
    });

    it('returns the story', async(done) => {
      story = await ChangelogHelper.getStory('12345');
      expect(story).toEqual({data: {resp: 'resp'}});
      done();
    });
  });

  describe('#getStoriesSinceLastTag', () => {
    describe('when branch cannot be determined', () => {
      beforeEach(() => {
        spyOn(console, 'error');
        spyOn(ChangelogHelper, 'getBranch').and.returnValue('HEAD');
      });

      it('returns undefined', async(done) => {
        const stories = await ChangelogHelper.getStoriesSinceLastTag();
        expect(stories).toBeUndefined();
        done();
      });
    });

    describe('when branch can be determined', () => {
      let stories, commit;

      beforeEach(() => {
        spyOn(console, 'error');
        commit = 'commit 1 [#123]\ncommit 2 [#456]\ncommit 3 [#789]\ncommit 4 [#123]';
        spyOn(ChildProcess, 'execSync').and.returnValue(commit);
        spyOn(ChangelogHelper, 'getStoryIds').and.returnValue(['123', '456', '789', '123']);
        spyOn(ChangelogHelper, 'getStory').and.callFake((storyId) => {
          if (storyId === '789') return Promise.reject('story not found!');
          return Promise.resolve({data: {id: storyId}});
        });
        spyOn(ChangelogHelper, 'getBranch').and.returnValue('v9');
      });

      it('gets the commits since last tag', async(done) => {
        stories = await ChangelogHelper.getStoriesSinceLastTag();
        expect(ChildProcess.execSync).toHaveBeenCalledWith('git log `git describe --tags --abbrev=0`..v9 --oneline')
        done();
      });

      it('gets the story Ids', async(done) => {
        stories = await ChangelogHelper.getStoriesSinceLastTag();
        expect(ChangelogHelper.getStoryIds).toHaveBeenCalledWith(commit);
        done();
      });

      it('calls getStory for each story id', async(done) => {
        stories = await ChangelogHelper.getStoriesSinceLastTag();
        expect(ChangelogHelper.getStory).toHaveBeenCalledWith('123');
        expect(ChangelogHelper.getStory).toHaveBeenCalledWith('456');
        expect(ChangelogHelper.getStory).toHaveBeenCalledWith('789');
        done();
      });

      it('returns all the stories', async(done) => {
        stories = await ChangelogHelper.getStoriesSinceLastTag();
        expect(stories).toEqual([{id: '123'}, {id: '456'}]);
        done();
      });
    });
  });

  describe('#generateStoryList', () => {
    let stories, storyList;

    beforeEach(() => {
      stories = [{name: 'name1', id: '123'}, {name: 'name2', id: '456'}];
      storyList = ChangelogHelper.generateStoryList(stories);
    });

    it('returns a list of bullet points', () => {
      expect(storyList).toEqual(['* name1 [#123]', '* name2 [#456]'])
    });
  });

  describe('#generateSummary', () => {
    let storyList, summary;

    describe('when there are stories', () => {
      beforeEach(() => {
        storyList = [{name:'name1', id: '123'}, {name: 'name2', id:'456'}];
        summary = ChangelogHelper.generateSummary('Bug Fixes', storyList);
      });

      it('returns a bug fix section', () => {
        expect(summary).toBe('### Bug Fixes\n\n* name1 [#123]\n* name2 [#456]')
      });
    });

    describe('when there are no stories', () => {
      beforeEach(() => {
        storyList = [];
        summary = ChangelogHelper.generateSummary('Bug Fixes', storyList);
      });

      it('returns empty string', () => {
        expect(summary).toBe('');
      });
    });
  });

  describe('#generateChangelog', () => {
    let changelog, nextVersion;

    beforeEach(() => {
      spyOn(ChangelogHelper, 'getStoriesSinceLastTag').and.returnValue(Promise.resolve([]));
      spyOn(ChangelogHelper, 'generateSummary').and.callFake(header => {
        return header === 'Bug Fixes' ? 'bugs': 'features';
      });
      spyOn(ChangelogHelper, 'getDate').and.returnValue('2017-3-11');
      nextVersion = '10.0.0';
    });

    it('returns a changelog', async(done) => {
      changelog = await ChangelogHelper.generateChangelog(nextVersion);
      expect(changelog).toBe(`<a name="10.0.0"></a>
## 10.0.0 (2017-3-11)

bugs

features
`);
      done();
    });
  });

  describe('#updateChangelog', () => {
    beforeEach(async(done) => {
      spyOn(fs, 'writeFileSync');
      spyOn(fs, 'readFileSync').and.returnValue('current changelog');
      spyOn(ChangelogHelper, 'generateChangelog').and.returnValue(Promise.resolve('new changelog'));
      await ChangelogHelper.updateChangelog();
      done();
    });

    it('gets the new changelog section', () => {
      expect(ChangelogHelper.generateChangelog).toHaveBeenCalledWith(version);
    });

    it('reads the current changelog', () => {
      expect(fs.readFileSync).toHaveBeenCalledWith('CHANGELOG.md');
    });

    it('prepends the new changelog to CHANGELOG.md', () => {
      expect(fs.writeFileSync).toHaveBeenCalledWith('CHANGELOG.md', 'new changelog\ncurrent changelog');
    });
  });
});