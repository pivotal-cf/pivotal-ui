import gulp from 'gulp';
import reduce from 'stream-reduce';
import loadPlugins from 'gulp-load-plugins';
import {map, merge} from 'event-stream';
import File from 'vinyl';
import path from 'path';

const plugins = loadPlugins();


gulp.task('css-critic-prepare', ['styleguide-build'], function() {
  const regressionRunnerJsStream = gulp.src('./spec/css/components/*.html', {read: false})
    .pipe(reduce((memo, file) => {
      const name = path.basename(file.path, '.html');
      memo.push(`csscritic.add({url: 'components/${name}.html', desc: '${name}'});`);
      return memo;
    }, []))
    .pipe(map((filelist, callback) => {
      const contents = `window.onload = function() {
  csscritic.addReporter(csscritic.NiceReporter());
  ${filelist.join('\n  ')}
  csscritic.execute();
}`;
      callback(null, new File({path: 'regressionRunner.js', contents: new Buffer(contents)}));
    }))
    .pipe(gulp.dest('./spec/css'));

  const cssCriticAssetsStream = gulp.src('build/**/!(*.html)')
    .pipe(gulp.dest('spec/css/components/'));

  return merge(regressionRunnerJsStream, cssCriticAssetsStream);
});

gulp.task('css-critic', ['css-critic-prepare'], function() {
  return gulp.src('./spec/css/regressionRunner.html')
    .pipe(plugins.open('./spec/css/regressionRunner.html', {app: 'firefox'}));
});
