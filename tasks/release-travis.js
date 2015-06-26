import {map} from 'event-stream';
import gulp from 'gulp';
import {addReleaseNotesToLatest} from './helpers/github-service';
import {log} from 'gulp-util';

const plugins = require('gulp-load-plugins')();

gulp.task('release-zip', () => {
  const version = require('../package.json').version;

  return gulp.src(`release/pui-v${version}/**/*`, {base: 'release/'})
    .pipe(plugins.zip(`pui.zip`))
    .pipe(gulp.dest('.'));
});

gulp.task('release-add-release-notes', () => {
  if (!process.env.TRAVIS_TAG) {
    log('Skipping - because we did not cut a new release');
    return;
  }
  return gulp.src('LATEST_CHANGES.md')
    .pipe(map(async (latestChangesFile, callback) => {
      log('Updating release notes...');
      try {
        await addReleaseNotesToLatest(latestChangesFile.contents.toString());
        callback();
      }
      catch(error) {
        console.error(error);
        callback(error);
      }
    }));
});
