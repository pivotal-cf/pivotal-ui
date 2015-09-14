import mockPromises from 'mock-promises';
const proxyquire = require('proxyquire').noPreserveCache();
global.Promise = require('bluebird');

describe('filterPackages', () => {
  let filterPackages;

  beforeEach(() => {
    mockPromises.install(global.Promise);
    mockPromises.reset();

    filterPackages = proxyquire('../../tasks/helpers/publish-helper', {
      'child_process': {
        exec: (command, callback) => {
          callback(null, '0.0.0');
        }
      }
    }).filterPackages;
  });

  it('returns packageInfo when the package is newer', () => {
    const file = {
      contents: {
        toString() {
          return '{"name": "hamburger", "version": "0.0.1"}';
        }
      },
      path: 'i/like/hamburger'
    };

    var packageInfo;

    filterPackages(file, (error, value) => {
      packageInfo = value;
    });

    mockPromises.tick(1);

    expect(packageInfo.name).toEqual('hamburger');
    expect(packageInfo.dir).toEqual('i/like');
  });

  it('skips when the package is not newer', () => {
    const file = {
      contents: {
        toString() {
          return '{"name": "hamburger", "version": "0.0.0"}';
        }
      },
      path: 'i/like/hamburger'
    };

    var packageInfo;

    filterPackages(file, (error, value) => {
      packageInfo = value;
    });

    mockPromises.tick(1);

    expect(packageInfo).toEqual(undefined);
  });
});
