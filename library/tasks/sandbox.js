import concat from 'gulp-concat';
import del from 'del';
import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import webpack from 'webpack-stream';
import webpackConfig from '../config/webpack';

const plugins = loadPlugins();
const runSequence = require('run-sequence').use(gulp);

const SANDBOX_BUILD_DIR = 'sandbox/build/';

gulp.task('sandbox-serve', ['sandbox-build'], () => {
  plugins.connect.server({
    root: [SANDBOX_BUILD_DIR],
    port: process.env.DEVELOPMENT_PORT || 8001
  });
});

gulp.task('sandbox-build', ['sandbox-clean'], () =>
    runSequence([
      'sandbox-build-sass',
      'sandbox-build-js',
      'sandbox-copy-fonts',
      'sandbox-copy-html'
    ])
);

gulp.task('sandbox-clean', done => del([SANDBOX_BUILD_DIR], done));

gulp.task('sandbox-copy-html', () =>
    gulp.src('sandbox/index.html')
      .pipe(gulp.dest(SANDBOX_BUILD_DIR))
);

gulp.task('sandbox-build-js', () =>
    gulp.src('sandbox/sandbox.js')
      .pipe(webpack(webpackConfig()))
      .pipe(plugins.rename('sandbox.js'))
      .pipe(gulp.dest(SANDBOX_BUILD_DIR))
);

gulp.task('sandbox-build-sass', () =>
    gulp.src('src/pivotal-ui/components/**/*.scss')
      .pipe(plugins.sass())
      .pipe(plugins.cssnext())
      .pipe(concat('pivotal-ui.css'))
      .pipe(gulp.dest(SANDBOX_BUILD_DIR))
);

gulp.task('sandbox-copy-fonts', () =>
    gulp.src('src/pivotal-ui/components/typography/fonts/*')
      .pipe(gulp.dest(`${SANDBOX_BUILD_DIR}/fonts`))
);
