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
