var changelog = require('conventional-changelog');
var q = require('q');
var semver = require('semver');

var getNewVersion = function() {
  var deferred = q.defer();

  determineReleaseType(function(err, releaseType) {
    if (err) {
      deferred.reject(err);
    } else {
      var newVersion;
      var oldVersion = require('../package.json').version;
      newVersion = semver.inc(oldVersion, releaseType);
      deferred.resolve(newVersion);
    }
  });

  return deferred.promise;
}();

var getNewTagName = function() {
  var deferred = q.defer();

  getNewVersion
  .then(function(newVersion) {
    deferred.resolve('v' + newVersion);
  })
  .fail(function(err) {
    deferred.reject(err);
  });

  return deferred.promise;
}();

var getVersionChanges = function() {
  var deferred = q.defer();

  getNewVersion
  .then(function(newVersion) {
    changelog({
      version: newVersion,
      file: 'tmp/foo',
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
}();

module.exports = {
  getNewVersion: getNewVersion,
  getNewTagName: getNewTagName,
  getVersionChanges: getVersionChanges
};

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
