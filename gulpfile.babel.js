import gulp from 'gulp';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

require('./tasks/css-components');
require('./tasks/react-components');
require('./tasks/js-components');
require('./tasks/test');
require('./tasks/dev');
require('./tasks/release');

gulp.task('default', gulp.series('ci'));
