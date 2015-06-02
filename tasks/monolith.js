import {exec} from 'child_process';
import gulp from 'gulp';
import del from 'del';
import drFrankenstyle from 'dr-frankenstyle';
import source from 'vinyl-source-stream';
import browserify from 'browserify';
import runSequence from 'run-sequence';
import loadPlugins from 'gulp-load-plugins';
const plugins = loadPlugins();

function renameBasename(from, to) {
  return plugins.rename(filePath => {
    if (filePath.basename === from) {
      filePath.basename = to;
    }
    return filePath;
  });
}

gulp.task('monolith-clean', callback => del(['build'], callback));

gulp.task('monolith-hologram', callback => exec('bundle exec hologram', callback));

gulp.task('monolith-dr-frankenstyle', () =>
  drFrankenstyle()
    .pipe(renameBasename('components', 'pivotal-ui'))
    .pipe(gulp.dest('build'))
    .pipe(drFrankenstyle.railsUrls())
    .pipe(renameBasename('pivotal-ui', 'pivotal-ui-rails'))
    .pipe(gulp.dest('build'))
);

gulp.task('monolith-html', () =>
  gulp.src('src/styleguide/pane.html')
    .pipe(gulp.dest('build'))
);

gulp.task('monolith-styleguide-css', () =>
  gulp.src('src/styleguide/styleguide.scss')
    .pipe(plugins.sass())
    .pipe(plugins.cssnext())
    .pipe(gulp.dest('build/styleguide'))
);

gulp.task('monolith-build-js', () =>
  browserify('./src/pivotal-ui/javascripts/pivotal-ui.js')
    .bundle()
    .pipe(source('pivotal-ui.js'))
    .pipe(gulp.dest('build'))
);

gulp.task('monolith-build-react-js', () =>
  browserify('./src/pivotal-ui/javascripts/pivotal-ui-react.js')
    .bundle()
    .pipe(source('pivotal-ui-react.js'))
    .pipe(gulp.dest('build'))
);

gulp.task('monolith-prism-assets', () =>
  gulp.src('node_modules/prismjs/themes/{prism,prism-okaidia}.css')
    .pipe(gulp.dest('build/prismjs'))
);

gulp.task('monolith-styleguide-assets', () =>
  gulp.src([
    'src/styleguide/*.js',
    'src/styleguide/github.css',
    'src/images/*'
  ]).pipe(gulp.dest('build/styleguide'))
);

gulp.task('monolith-zeroclipboard-assets', () =>
  gulp.src('node_modules/zeroclipboard/dist/ZeroClipboard.{js,swf}')
    .pipe(gulp.dest('build/zeroclipboard'))
);

gulp.task('monolith-app-config', () =>
  gulp.src(['src/Staticfile', 'config/nginx.conf'])
    .pipe(gulp.dest('build'))
);

gulp.task('monolith', callback => runSequence('monolith-clean', [
  'monolith-hologram',
  'monolith-dr-frankenstyle',
  'monolith-html',
  'monolith-styleguide-css',
  'monolith-build-js',
  'monolith-build-react-js',
  'monolith-prism-assets',
  'monolith-styleguide-assets',
  'monolith-zeroclipboard-assets',
  'monolith-app-config'
], callback));

gulp.task('monolith-watch', ['monolith'], () => {
  gulp.watch(['src/pivotal-ui/components/**/*.scss', 'src/pivotal-ui/pivotal-ui.scss'], ['monolith-hologram']);
  gulp.watch(['src/styleguide/**/*.scss'], ['monolith-styleguide-css']);
  //gulp.watch(['src/pivotal-ui/javascripts/**/*.js', 'src/pivotal-ui/javascripts/**/*.jsx'], ['_puiJs']);
});

gulp.task('monolith-serve', ['monolith'], () => {
  plugins.connect.server({
    root: ['build'],
    port: process.env.STYLEGUIDE_PORT || 8000
  });
});
