import gulp from 'gulp';
import Changelog_helper from './helpers/changelog_helper';
import Git_helper from './helpers/git_helper';
import Tracker_helper from './helpers/tracker_helper';
import {argv} from 'yargs';

gulp.task('update-changelog', async () => {
  const {trackerToken} = argv;
  if (!trackerToken) throw new Error('Log into lpass and run update-changelog.sh');
  await new Changelog_helper(new Git_helper(), new Tracker_helper(trackerToken)).updateChangelog('v8.3.2');
});