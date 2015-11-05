require('babel-core/register')();//({optional: ['es7.objectRestSpread', 'es7.asyncFunctions', 'regenerator']});
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var requireDir = require('require-dir');
requireDir('./tasks');

var gulp = require('gulp');

gulp.task('default', ['dev']);
