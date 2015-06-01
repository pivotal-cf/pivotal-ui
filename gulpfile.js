require('babel/register')({optional: ['es7.objectRestSpread', 'regenerator']});

var gulp = require('gulp');

require('./tasks/monolith');
require('./tasks/css-components');
require('./tasks/test');
require('./tasks/release');

gulp.task('default', [
  'monolith-serve'
]);

