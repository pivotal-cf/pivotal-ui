import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import del from 'del';
import drF from 'dr-frankenstyle';
import webpack from 'webpack-stream';
import {exec} from 'child_process';

const plugins = loadPlugins();
const runSequence = require('run-sequence').use(gulp);

gulp.task('styleguide-clean', callback => del(['build'], callback));

gulp.task('hologram', callback => exec('bundle exec hologram', callback));

gulp.task('build-component-css', function() {
  return drF()
    .pipe(plugins.plumber())
    .pipe(gulp.dest('build/'));
});

gulp.task('build-sass', () =>
    gulp.src('src/styleguide.scss')
      .pipe(plugins.sass())
      .pipe(plugins.cssnext())
      .pipe(gulp.dest('build/styleguide'))
);

gulp.task('build-js', function() {
  return gulp.src('src/index.js')
    .pipe(webpack({
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
          },
          {
            test: /bootstrap/,
            loader: 'imports?jQuery=jquery'
          }
        ],
      },
    }))
    .pipe(plugins.rename('index.js'))
    .pipe(gulp.dest('build/'));
});

gulp.task('styleguide-assets', () =>
    gulp.src([
      'src/github.css',
      'src/images/*'
    ]).pipe(gulp.dest('build/styleguide'))
);

gulp.task('prism-assets', () =>
    gulp.src('node_modules/prismjs/themes/{prism,prism-okaidia}.css')
      .pipe(gulp.dest('build/prismjs'))
);

gulp.task('import-bootstrap-js', () =>
    gulp.src('node_modules/bootstrap-sass/assets/javascripts/bootstrap.js')
      .pipe(gulp.dest('build/'))
);

gulp.task('import-zeroclipboard-assets', () =>
    gulp.src('node_modules/zeroclipboard/dist/ZeroClipboard.{js,swf}')
      .pipe(gulp.dest('build/zeroclipboard'))
);

gulp.task('copy-old-styleguides', () => {
  gulp.src('old_styleguides/**/*')
    .pipe(gulp.dest('build'));
});

gulp.task('styleguide-build', callback => runSequence('styleguide-clean', [
  'hologram',
  'build-sass',
  'build-js',
  'build-component-css',
  'import-bootstrap-js',
  'import-zeroclipboard-assets',
  'styleguide-assets',
  'prism-assets',
  'copy-old-styleguides'
], callback));
