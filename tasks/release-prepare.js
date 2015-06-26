import {exec} from 'child_process';
import gulp from 'gulp';
import {merge} from 'event-stream';
import path from 'path';
import promisify from 'es6-promisify';
import {argv} from 'yargs';
import runSequence from 'run-sequence';
import {Stream} from 'stream';
import glob from 'glob';
import through from 'through2';
import File from 'vinyl';

import {getVersionChanges, getNewVersion, releaseDest} from './helpers/release-helper';
import {componentsToUpdate, updatePackageJsons} from './helpers/package-version-helper';

const plugins = require('gulp-load-plugins')();
const execPromise = promisify(exec);
const globPromise = promisify(glob);

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

gulp.task('release-update-package-versions', () => {
  const componentsToUpdateStream = componentsWithChanges()
    .pipe(componentsToUpdate());

  return componentsToUpdateStream
    .pipe(updatePackageJsons())
    .pipe(gulp.dest('.'));
});

gulp.task('release-generate-changelog', function() {
  return gulp.src(['CHANGELOG.md'])
    .pipe(through.obj(async function(changelog, _, callback) {
      try {
        const versionChanges = await getVersionChanges();

        const oldChangelog = changelog.contents.toString();
        changelog.contents = new Buffer(versionChanges + oldChangelog);
        this.push(changelog);

        const latestChangesFile = new File({path: 'LATEST_CHANGES.md', contents: new Buffer(versionChanges)});
        this.push(latestChangesFile);
        callback();
      }
      catch(error) {
        console.error(error);
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
               LATEST_CHANGES.md \
               src/pivotal-ui/components/*/package.json \
               src/pivotal-ui-react/*/package.json \
               release/ \
         && git commit -m "v${version}"`
    ))
);

gulp.task('release-prepare', (done) =>
  runSequence(
    [
      'release-update-package-versions',
      'release-generate-changelog',
      'release-generate-release-folder'
    ],
    'release-commit',
    done
  )
);
