const proxyquire = require('proxyquire').noPreserveCache();

describe('infoForUpdatedPackages', () => {
  let infoForUpdatedPackages;

  beforeEach(() => {
    infoForUpdatedPackages = proxyquire('../../tasks/helpers/publish-helper', {
      'child_process': {
        exec: (command, callback) => {
          callback(null, '1.0.0');
        }
      },
      'gulp-util': {
        log: () => {}
      }
    }).infoForUpdatedPackages;
  });

  it('returns packages that have newer versions', async (done) => {
    const file1 = {
      contents: {
        toString() {
          return '{"name": "hamburger", "version": "0.0.1"}';
        }
      },
      path: 'i/like/hamburger'
    };

    const file2 = {
      contents: {
        toString() {
          return '{"name": "hotdog", "version": "1.0.1"}';
        }
      },
      path: 'i/love/hotdog'
    };

    const packages = await infoForUpdatedPackages([file1, file2]);

    expect(packages.length).toEqual(1);
    expect(packages[0].name).toEqual('hotdog');

    done();
  });
});

describe('publishPackages', () => {
  let publishPackages, npmOwner, npmPublish;
  beforeEach(() => {
    npmOwner = jasmine.createSpy('npm.commands.owner');
    npmPublish = jasmine.createSpy('npm.commands.publish');

    publishPackages = proxyquire('../../tasks/helpers/publish-helper', {
      npm: {
        commands: {
          publish(args, callback) {
            npmPublish(args);
            callback();
          },
          owner(args, callback) {
            npmOwner(args);
            callback();
          }
        },
        config: {
          set() {
          },
          get() {
          }
        },
        load(_, callback) {
          callback();
        }
      },
      'gulp-util': {
        log: () => {
        }
      }
    }).publishPackages;
  });

  describe('packages', () => {
    let packages;
    beforeEach(() => {
      packages = [
        {name: 'hamburger', dir: 'i/like'},
        {name: 'hotdog', dir: 'i/love'}
      ];
    });

    it('publishes the package', async (done) => {
      await publishPackages()(
        packages
      );

      expect(npmPublish).toHaveBeenCalledWith(['i/like']);
      expect(npmPublish).toHaveBeenCalledWith(['i/love']);
      done();

    });

    it('sets the owners', async (done) => {
      await publishPackages()(
        packages
      );
      expect(npmOwner).toHaveBeenCalledWith(['add', 'stubbornella', 'hamburger']);
      expect(npmOwner).toHaveBeenCalledWith(['add', 'stubbornella', 'hotdog']);
      done();
    });
  });
});
