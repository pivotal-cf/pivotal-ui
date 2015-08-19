import del from 'del';
import gulp from 'gulp';
import mergeStream from 'merge-stream';
import runSequence from 'run-sequence';
import license from './helpers/license-helper';
import {readme, packageJson} from './helpers/css-components-helper';
import {publishPackages} from './helpers/publish-helper';
import {readArray} from 'event-stream';
import path from 'path';

const plugins = require('gulp-load-plugins')();
const argv = require('yargs').argv;

const componentsGlob = ['src/pivotal-ui/components/*', '!src/**/*.scss'];
const buildFolder = 'dist/css';

gulp.task('css-build-license', () =>
    gulp.src(componentsGlob)
      .pipe(license())
      .pipe(gulp.dest(buildFolder))
);

gulp.task('css-build-package-json', () =>
    gulp.src('src/pivotal-ui/components/*/package.json')
      .pipe(packageJson())
      .pipe(gulp.dest(buildFolder))
);

gulp.task('css-build-readme', () =>
    gulp.src(componentsGlob)
      .pipe(readme())
      .pipe(gulp.dest(buildFolder))
);

gulp.task('css-build-src', function() {
  return gulp.src(['src/pivotal-ui/components/**/*.scss', '!src/pivotal-ui/components/*.scss'])
    .pipe(plugins.sass({outputStyle: 'compressed'}))
    .pipe(plugins.cssnext())
    .pipe(gulp.dest(buildFolder));
});

gulp.task('css-build-assets', function() {
  return gulp.src('src/pivotal-ui/components/*/**/!(package.json|*.md|*.scss)')
    .pipe(gulp.dest(buildFolder));
});

gulp.task('css-build-variables-and-mixins-package', function() {
  return mergeStream(
    gulp.src(['src/pivotal-ui/components/pui-variables.scss', 'src/pivotal-ui/components/mixins.scss']),
    gulp.src(['PUI_VARIABLES_AND_MIXINS_README.md'])
      .pipe(plugins.rename({basename: 'README'})),
    plugins.file('package.json', JSON.stringify({
      name: 'pui-css-variables-and-mixins',
      version: require('../package.json').version,
      repository: {
        type: 'git',
        url: 'https://github.com/pivotal-cf/pivotal-ui.git'
      },
      keywords: [
        'pivotal ui',
        'pivotal ui modularized'
      ],
      author: 'Pivotal Software, Inc',
      bugs: {
        url: 'https://github.com/pivotal-cf/pivotal-ui/issues'
      }
    }, null, 2), {src: true})
  ).pipe(gulp.dest('dist/css/variables-and-mixins'));
});

gulp.task('css-clean', callback => del([buildFolder], callback));

gulp.task('css-build', callback => runSequence('css-clean', [
  'css-build-package-json',
  'css-build-readme',
  'css-build-license',
  'css-build-src',
  'css-build-assets',
  'css-build-variables-and-mixins-package'
], callback));

gulp.task('css-publish', ['css-build'], () => {
  if (!argv.component) {
    return new Error('Usage: gulp css-publish --component <component-name>');
  }

  return readArray([[{
    name: `pui-css-${argv.component}`,
    dir: path.join('dist', 'css', argv.component)
  }]]).pipe(publishPackages());
});

import promisify from 'es6-promisify';

import npm from 'npm';
import {exec} from 'child_process';
import {map} from 'event-stream';
import reduce from 'stream-reduce';

function publishFakePackages() {
  return map(async (packageInfos, callback) => {
    try {
      const npmLoad = promisify(npm.load);
      await npmLoad({});

      const npmPublish = promisify(npm.commands.publish);
      const npmInstall = promisify(npm.commands.install);

      npm.config.set('registry', 'http://localhost:4873/');

      if (npm.config.get('registry') != 'http://localhost:4873/') {
        console.error('that aint right');
        callback('nooo');
      } else {

        for (const packageInfo of packageInfos) {
          try {
            await promisify(npm.commands.view)([packageInfo.name], true);
          } catch (e) {
            console.log('Publishing', packageInfo.name);
            npm.config.set('save', true);

            await npmPublish([packageInfo.dir]);
            await npmInstall([packageInfo.name]);
          }
        }
        callback();
      }
    }
    catch (e) {
      console.error(e);
      console.error(packageInfo);
      callback(e);
    }
  });
}

gulp.task('css-publish-local', ['css-build'], () => {
  return gulp.src('dist/css/*')
    .pipe(map(function(folder, callback) {
      callback(null,
        {
          name: `pui-css-${path.basename(folder.path)}`,
          dir: folder.path
        }
      );
    }))
    .pipe(reduce(function(packageInfos, packageInfo) {
      packageInfos.push(packageInfo);
      return packageInfos;
    }, []))
    .pipe(publishFakePackages());
});

gulp.task('test-mode-magic', (callback) => {
  runSequence(
    'css-clean-local',
    'css-publish-local',
    'dev',
    callback
  )
})
;

gulp.task('css-clean-local', async () => {
  const npmLoad = promisify(npm.load);
  await npmLoad({});

  const execPromise = promisify(exec);
  const cleanPromise = promisify(npm.commands.cache.clean);

  await execPromise('rm -rf ~/.local/share/sinopia/storage');

  await cleanPromise([]);
});
