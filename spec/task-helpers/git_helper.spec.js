import GitHelper from '../../tasks/helpers/git_helper';

describe('GitHelper', () => {
  let gitHelper;

  beforeEach(() => {
    gitHelper = new GitHelper();
  });

  describe('#getLatestCommit', () => {
    describe('when the tag does not exist', () => {
      describe('when the major version branch exists', () => {
        beforeEach(async () => {
          spyOn(gitHelper, 'git').and.callFake(command => {
            if (command === 'branch') {
              return Promise.resolve('  v8\n  v9\n* v10\n  master');
            } else if (command.startsWith('rev-parse')) {
              return Promise.reject(new Error('tag does not exist'));
            }
          });
          await gitHelper.getLatestCommit('10.0.0');
        });

        it('gets the latest commit on that branch', () => {
          expect(gitHelper.git).toHaveBeenCalledWith('rev-parse 10.0.0');
          expect(gitHelper.git).toHaveBeenCalledWith('log v10 -1 --oneline --format=format:%H');
        });
      });

      describe('when the major version branch does not exists', () => {
        beforeEach(async () => {
          spyOn(gitHelper, 'git').and.callFake(command => {
            if (command === 'branch') {
              return Promise.resolve('  v8\n  v9\n* master');
            } else if (command.startsWith('rev-parse')) {
              return Promise.reject(new Error('tag does not exist'));
            }
          });
          await gitHelper.getLatestCommit('10.0.0');
        });

        it('gets the latest commit on master', () => {
          expect(gitHelper.git).toHaveBeenCalledWith('rev-parse 10.0.0');
          expect(gitHelper.git).toHaveBeenCalledWith('log master -1 --oneline --format=format:%H');
        });
      });
    });

    describe('when the tag does exist', () => {
      beforeEach(async () => {
        spyOn(gitHelper, 'git').and.returnValue(Promise.resolve(''));
        await gitHelper.getLatestCommit('10.0.0');
      });

      it('returns the commit of that tag', () => {
        expect(gitHelper.git).toHaveBeenCalledWith('rev-parse 10.0.0');
        expect(gitHelper.git).not.toHaveBeenCalledWith('log master -1 --oneline --format=format:%H');
      });
    });
  });
});