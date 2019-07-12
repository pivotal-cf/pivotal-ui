if (parseInt(process.versions.node, 10) > 8) {
  throw new Error(
    'This version of Pivotal UI only builds on Node 8, though the\n' +
    'PUI node module may be used with other versions. On a mac, try:\n' +
    '☞ brew install node@8\n' +
    '☞ /usr/local/opt/node\\@8/bin/node /usr/local/Cellar/yarn/1.16.0/libexec/bin/yarn.js\n' +
    '☞ /usr/local/opt/node\\@8/bin/node node_modules/gulp/bin/gulp.js\n'
  );
}
require('babel-core/register');
require('babel-polyfill');
require('./gulpfile.babel');