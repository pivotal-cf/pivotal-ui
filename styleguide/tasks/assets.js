import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import del from 'del';
import webpack from 'webpack-stream';
import {exec} from 'child_process';

const plugins = loadPlugins();
const runSequence = require('run-sequence').use(gulp);
const ExtractTextPlugin = require('extract-text-webpack-plugin');

gulp.task('styleguide-clean', callback => del(['build'], callback));

gulp.task('hologram', callback => exec('bundle exec hologram', callback));

gulp.task('build-sass', () =>
  gulp.src('src/styleguide.scss')
    .pipe(plugins.sass())
    .pipe(plugins.postcss([require("postcss-cssnext")()]))
    .pipe(gulp.dest('build/styleguide'))
);

gulp.task('build-js', function() {
  return gulp.src('src/index.js')
    .pipe(webpack({
      bail: false,
      module: {
        loaders: [
          {test: [/\.svg(\?|$)/, /\.png(\?|$)/, /\.eot(\?|$)/, /\.ttf(\?|$)/, /\.woff2?(\?|$)/, /\.jpg?(\?|$)/], exclude: /iconography/, loader: 'url?name=[name].[ext]'},
          {test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader')},
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          },
          {
            test: /bootstrap.js/,
            loader: 'imports?jQuery=jquery'
          }
        ]
      },
      plugins: [
        new ExtractTextPlugin('components.css', {
          allChunks: true
        })
      ],
      output: {
        filename: 'index.js'
      }
    }))
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

gulp.task('copy-old-styleguides', () => {
  gulp.src('old_styleguides/**/*')
    .pipe(gulp.dest('build'));
});

gulp.task('styleguide-build', callback => runSequence('styleguide-clean', [
  'hologram',
  'build-sass',
  'build-js',
  'import-bootstrap-js',
  'styleguide-assets',
  'prism-assets',
  'copy-old-styleguides'
], callback));
