process.env.NODE_ENV = process.env.NODE_ENV || 'development';
import requireDir from 'require-dir';
requireDir('./tasks');

import gulp from 'gulp';

gulp.task('default', ['dev']);
