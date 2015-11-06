import {map} from 'event-stream';
import gulp from 'gulp';
import {addReleaseNotesToTag} from './helpers/github-service';
import {log} from 'gulp-util';

const plugins = require('gulp-load-plugins')();

gulp.task('release-zip', () => {
  const tagName = process.env.TRAVIS_TAG;

  if (!tagName) {
    log('Skipping - because we did not cut a new release');
    return null;
  }

  return gulp.src(`release/pui-${tagName}/**/*`, {base: 'release/'})
    .pipe(plugins.zip(`pui.zip`))
    .pipe(gulp.dest('.'));
});

gulp.task('release-add-release-notes', () => {
  const tagName = process.env.TRAVIS_TAG;

  if (!tagName) {
    log('Skipping - because we did not cut a new release');
    return null;
  }

  if (!process.env.RELEASE_TOKEN) {
    log('Skipping - please set the RELEASE_TOKEN env var');
    return null;
  }

  return gulp.src('LATEST_CHANGES.md')
    .pipe(map(async (latestChangesFile, callback) => {
      log(`Updating release notes for ${tagName}...`);
      try {
        await addReleaseNotesToTag(tagName, latestChangesFile.contents.toString());
        callback();
      }
      catch(error) {
        console.error(error.stack);
        callback(error);
      }
    }));
});
