import memoize from 'lodash.memoize';
import changelog from 'conventional-changelog';
import q from 'q';
import semver from 'semver';
import {map, pipeline} from 'event-stream';
import gulp from 'gulp';
import path from 'path';
import {execSync} from 'child_process';

function determineReleaseType(callback) {
  changelog({
    version: 'foo',
    file: 'tmp/foo'
  }, function(err, log) {
    if (err) {
      callback(err, null);
    } else if (/# breaking changes/i.test(log)) {
      callback(null, 'major');
    } else if (/# features/i.test(log)) {
      callback(null, 'minor');
    } else if (/# bug fixes/i.test(log)) {
      callback(null, 'patch');
    } else {
      callback('No changes found', null);
    }
  });
}

// getNewVersion is memoized to ensure that the value is consistent within a
//   given process lifetime, even if additional commits are made
export const getNewVersion = memoize(function() {
  var deferred = q.defer();

  try { execSync('git fetch'); }
  catch(e) { deferred.reject('Unable to fetch files'); }

  determineReleaseType(function(err, releaseType) {
    if (err) {
      deferred.reject(err);
    } else {
      var newVersion;
      var oldVersion = require('../../package.json').version;
      newVersion = semver.inc(oldVersion, releaseType);
      deferred.resolve(newVersion);
    }
  });

  return deferred.promise;
});

export const getVersionChanges = memoize(function() {
  var deferred = q.defer();

  getNewVersion()
  .then(function(newVersion) {
    changelog({
      version: newVersion,
      file: 'tmp/foo'
    }, function(err, versionChanges) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(versionChanges);
      }
    });
  })
  .fail(function(err) {
    deferred.reject(err);
  });

  return deferred.promise;
});

export function releaseDest(folderName='') {
  const prefixReleaseToDestStream = map(async (file, callback) => {
    try {
      const version = await getNewVersion();
      if (file.path.indexOf(`pui-v${version}`) === -1) {
        file.path = path.join(file.base, `pui-v${version}`, folderName, file.relative);
      }
      callback(null, file);
    }
    catch(e) {
      callback(e);
    }
  });

  return pipeline(
    prefixReleaseToDestStream,
    gulp.dest('release/')
  );
}
