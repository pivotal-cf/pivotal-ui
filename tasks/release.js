import {exec} from 'child_process';
import gulp from 'gulp';
import {map, split, merge} from 'event-stream';
import path from 'path';
import promisify from 'es6-promisify';
import reduce from 'stream-reduce';
import {argv} from 'yargs';
import runSequence from 'run-sequence';

import {getVersionChanges, getNewVersion, releaseDest} from './helpers/release-helper';
import {componentsToUpdate, updatePackageJsons} from './helpers/package-version-helper';

const plugins = require('gulp-load-plugins')();
const execPromise = promisify(exec);

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

gulp.task('release-update-package-versions', () => {
  const baseSetOfComponents = argv.all ? allComponents() : componentsWithChanges();
  const componentsToUpdateStream = baseSetOfComponents.pipe(componentsToUpdate());

  return componentsToUpdateStream
    .pipe(updatePackageJsons())
    .pipe(gulp.dest('.'));
});

gulp.task('release-generate-changelog', function() {
  return gulp.src('CHANGELOG.md')
    .pipe(map(async (changelog, callback) => {
      try {
        const oldChangelog = changelog.contents.toString();
        const versionChanges = await getVersionChanges();
        changelog.contents = new Buffer(versionChanges + oldChangelog);
        callback(null, changelog);
      }
      catch (error) {
        callback(error);
      }
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('release-generate-release-folder', ['monolith'], () => {
  const oocssStream = gulp.src([
    'src/oocss/utils/_clearfix-me.scss',
    'src/oocss/list/_listWhitespace.scss',
    'src/oocss/whitespace/_whitespace.scss'
  ]).pipe(releaseDest('oocss'));

  const bootstrapSassStream = gulp.src('node_modules/bootstrap-sass/assets/stylesheets/**/*')
    .pipe(releaseDest('bootstrap-sass'));

  const styleguideAndMiscStream = gulp.src([
    'src/pivotal-ui/components/pui-variables.scss',
    'build/**/*',
    '!build/pivotal-ui.css',
    '!build/pivotal-ui.js',
    '!build/pivotal-ui-react.js'
  ]).pipe(releaseDest());

  const puiCssStream = gulp.src('build/pivotal-ui.css')
    .pipe(plugins.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/\n?/g, ''))
    .pipe(releaseDest())
    .pipe(plugins.minifyCss({keepBreaks: true}))
    .pipe(plugins.rename({extname: '.min.css'}))
    .pipe(releaseDest());

  const puiJsStream = gulp.src(['build/pivotal-ui.js', 'build/pivotal-ui-react.js'])
    .pipe(releaseDest())
    .pipe(plugins.uglify())
    .pipe(plugins.rename({extname: '.min.js'}))
    .pipe(releaseDest());

  return merge(
    oocssStream,
    bootstrapSassStream,
    styleguideAndMiscStream,
    puiCssStream,
    puiJsStream
  );
});

gulp.task('release-commit', () =>
  getNewVersion()
    .then((version) => execPromise(
      `git add package.json \
               CHANGELOG.md \
               src/pivotal-ui/components/*/package.json \
               src/pivotal-ui-react/*/package.json \
               release/ \
         && git commit -m "v${version}"`
    ))
);

gulp.task('release-tag', () =>
  getNewVersion().then((version) => execPromise(`git tag v${version}`))
);

gulp.task('release-prepare', (done) =>
  runSequence(
    [
      'release-update-package-versions',
      'release-generate-changelog',
      'release-generate-release-folder'
    ],
    'release-commit',
    'release-tag',
    done
  )
);
