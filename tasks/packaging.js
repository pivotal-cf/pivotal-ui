import {exec} from 'child_process';
import gulp from 'gulp';
import {map, split} from 'event-stream';
import path from 'path';
import reduce from 'stream-reduce';
import {argv} from 'yargs';

import {componentsToUpdate, updatePackageJsons} from './helpers/package-version-helper';

function allComponents() {
  return gulp.src(['src/pivotal-ui/components/*/package.json', 'src/pivotal-ui-react/*/package.json'])
    .pipe(map((file, callback) => callback(null, path.relative(process.cwd(), path.dirname(file.path)) + path.sep)));
}

function componentsWithChanges() {
  const gitProcess = exec('git fetch && git describe --tags origin/master');
  gitProcess.on('exit', (exitCode) => {
    if (exitCode) {
      throw 'There was a problem fetching the latest tag. Exited with code ${exitCode}. Have you added your git credentials?';
    }
  });

  return gitProcess.stdout
    .pipe(reduce((memo, describeData) => describeData.split('-')[0], ''))
    .pipe(map((lastTag, cb) =>
      exec(`git diff --dirstat=files,1 HEAD..${lastTag} src/pivotal-ui-react/ src/pivotal-ui/components`, cb)
     ))
    .pipe(split())
    .pipe(map((diffData, callback) => callback(null, diffData.trim().split(' ')[1])));
}

gulp.task('update-package-versions', () => {
  const baseSetOfComponents = argv.all ? allComponents() : componentsWithChanges();
  const componentsToUpdateStream = baseSetOfComponents.pipe(componentsToUpdate());

  return componentsToUpdateStream
    .pipe(updatePackageJsons())
    .pipe(gulp.dest('.'));
});


