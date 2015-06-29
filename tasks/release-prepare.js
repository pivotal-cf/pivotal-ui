import {exec} from 'child_process';
import gulp from 'gulp';
import {merge, map} from 'event-stream';
import series from 'stream-series';
import path from 'path';
import promisify from 'es6-promisify';
import {argv} from 'yargs';
import runSequence from 'run-sequence';
import {Stream} from 'stream';
import glob from 'glob';
import changelog from 'conventional-changelog';
import {log} from 'gulp-util';
import source from 'vinyl-source-stream';
import semver from 'semver';

import {releaseDest} from './helpers/release-helper';
import {getNewVersion} from './helpers/version-helper';
import {componentsToUpdate, updatePackageJsons} from './helpers/package-version-helper';
import {commitTransform} from './helpers/changelog-helper';

const plugins = require('gulp-load-plugins')();
const execPromise = promisify(exec);
const globPromise = promisify(glob);
const recommendedBump = promisify(require('conventional-recommended-bump'));

function componentsWithChanges() {
  const stream = new Stream();
  stream.readable = true;

  (async () => {
    try {
      const lastTag = (await execPromise('git fetch && git describe --tags origin/master')).split('-')[0];
      const mixinsAndVariablesChanged = !!((await execPromise(`git diff --name-only HEAD..${lastTag} src/pivotal-ui/components/{mixins,pui-variables}.scss`)).trim().length);

      let components;
      if (argv.updateAll || mixinsAndVariablesChanged) {
        components = (await globPromise('src/{pivotal-ui/components,pivotal-ui-react}/*/package.json')).map((packageJsonPath) => path.dirname(packageJsonPath));
      }
      else {
        const diffResults = (await execPromise(`git diff --dirstat=files,1 HEAD..${lastTag} src/pivotal-ui-react/ src/pivotal-ui/components`)).trim();
        components = diffResults.split('\n').map(diffResult => diffResult.trim().split(' ')[1]);
      }

      for (let component of components) {
        stream.emit('data', component);
      }
    }

    catch(error) {
      stream.emit('error', error);
    }

    finally {
      stream.emit('end');
    }
  })();

  return stream;
}

gulp.task('release-update-version', (done) => {
  gulp.src('package.json')
    .pipe(plugins.plumber())
    .pipe(map(async (file, callback) => {
      try {
        const jsonContents = JSON.parse(file.contents.toString());
        const versionBumpType = await recommendedBump({preset: 'angular'});
        jsonContents.version = semver.inc(jsonContents.version, versionBumpType);
        file.contents = new Buffer(JSON.stringify(jsonContents, null, 2));
        callback(null, file);
      }
      catch(e) { callback(e); }
    }))
    .pipe(gulp.dest('.'))
    .on('end', () => {
      delete require.cache[path.join(process.cwd(), 'package.json')];
        // Ensure that we can get the new package version this way
      done();
    });
});

gulp.task('release-update-package-versions', () => {
  const componentsToUpdateStream = componentsWithChanges()
    .pipe(componentsToUpdate());

  return componentsToUpdateStream
    .pipe(updatePackageJsons())
    .pipe(gulp.dest('.'));
});

gulp.task('release-generate-changelog', () => {
  const newChangesStream = changelog(
    {preset: 'angular', warn: log},
    {},
    {},
    {noteKeywords: ['BREAKING CHANGE', 'DEPRECATION WARNING']},
    {transform: commitTransform}
  );

  const oldChangesStream = gulp.src('CHANGELOG.md')
    .pipe(map((file, cb) => cb(null, file.contents)));

  const latestChangesFileStream = newChangesStream
    .pipe(source('LATEST_CHANGES.md'));

  const changelogFileStream = series(newChangesStream, oldChangesStream)
    .pipe(source('CHANGELOG.md'));

  return merge(changelogFileStream, latestChangesFileStream)
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
  execPromise(
    `git add package.json \
             CHANGELOG.md \
             LATEST_CHANGES.md \
             src/pivotal-ui/components/*/package.json \
             src/pivotal-ui-react/*/package.json \
             release/ \
       && git commit -m "v${getNewVersion()}"`
  )
);

gulp.task('release-prepare', (done) =>
  runSequence(
    'release-update-version',
    [
      'release-update-package-versions',
      'release-generate-changelog',
      'release-generate-release-folder'
    ],
    'release-commit',
    done
  )
);
