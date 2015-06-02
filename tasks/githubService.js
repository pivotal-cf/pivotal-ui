var q = require('q');
var rest = require('restler');

module.exports = {
  createRelease: function createRelease(tagName, versionChanges) {
    var deferred = q.defer();

    rest.post('https://api.github.com/repos/pivotal-cf/pivotal-ui/releases', {
      query: {
        access_token: process.env.RELEASE_TOKEN
      },
      data: JSON.stringify({
        'tag_name': tagName,
        'name': tagName,
        'body': versionChanges,
        'draft': true
      })
    })
    .on('complete', function(result, response) {
      if (!/2../.test(response.statusCode)) {
        deferred.reject({
          statusCode: response.statusCode,
          message: result.message
        });
      } else {
        deferred.resolve({
          statusCode: response.statusCode,
          releaseId: result.id
        });
      }
    });

    return deferred.promise;
  },

  uploadFile: function uploadFile(releaseId, data) {
    var deferred = q.defer();

    rest.post('https://uploads.github.com/repos/pivotal-cf/pivotal-ui/releases/' + releaseId + '/assets', {
      query: {
        name: 'variables.scss',
        access_token: process.env.RELEASE_TOKEN
      },
      headers: {
        'Content-Type': 'text/plain'
      },
      data: data
    })
    .on('complete', function(result, response) {
      if (!/2../.test(response.statusCode)) {
        deferred.reject({
          statusCode: response.statusCode,
          result: result
        });
      } else {
        deferred.resolve(result, response);
      }
    });

    return deferred.promise;
  }
};
