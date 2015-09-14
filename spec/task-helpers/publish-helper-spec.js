import mockPromises from 'mock-promises';
import {readArray, writeArray, map} from 'event-stream';
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

  it('returns packages that have newer versions', (done) => {
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

    readArray([file1, file2])
      .pipe(infoForUpdatedPackages())
      .pipe(map((data, callback) => {
        expect(data.length).toEqual(1);
        expect(data[0].name).toEqual('hotdog');
        done();
      }));
  });
});
