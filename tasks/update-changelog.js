import gulp from 'gulp';
import ChangelogHelper from './helpers/changelog_helper';
import GitHelper from './helpers/git_helper';
import TrackerHelper from './helpers/tracker_helper';
import {argv} from 'yargs';

gulp.task('update-changelog', async () => {
  const {trackerToken} = argv;
  if (!trackerToken) throw new Error('Log into lpass and run update-changelog.sh');
  await new ChangelogHelper(new GitHelper(), new TrackerHelper(trackerToken)).updateChangelog('v8.3.2');
});