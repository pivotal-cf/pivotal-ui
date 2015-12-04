import gulp from 'gulp';
import a11y from 'a11y';
import {split, map, wait} from 'event-stream';
import runSequence from 'run-sequence';
import {log, colors} from 'gulp-util';
import webpack from 'webpack-stream';
import waitTillListening from 'strong-wait-till-listening';
import {spawn} from 'child_process';
import phantomjs from 'phantomjs';
import webpackConfig from '../config/webpack';

gulp.task('set-accessibility-ci-port', (done) => {
  process.env.STYLEGUIDE_PORT = 9002;
  done();
});

gulp.task('accessibility-react-a11y-injectable', () =>
  gulp.src('templates/react-a11y-injectable.js')
    .pipe(webpack(webpackConfig({nodeEnv: 'accessibility'})))
    .pipe(gulp.dest('build/'))
);

gulp.task('accessibility-react-a11y', ['accessibility-react-a11y-injectable'], function(callback) {
  const port = process.env.STYLEGUIDE_PORT || 8000;

  waitTillListening({port, timeoutInMs: 3000}, function() {
    var phantom = spawn(phantomjs.path, ['phantomjs/react_a11y_runner.js', port]);
    phantom.stdout
      .pipe(split())
      .pipe(map(function(line, callback) {
        if (line.indexOf('REACT-A11Y-ERR') !== -1) {
          callback(null, line);
        } else {
          callback();
        }
      }))
      .pipe(map(function(line, callback) {
        const [, id, msg, srcNode] = line.match(/(.+) REACT-A11Y-ERR (.+?)(?: Source Node\: (<.+>))?$/);
        log(colors.red('FAIL', id, msg), srcNode ? `\n${srcNode}` : '');
        callback(null, line + '\n');
      }))
      .pipe(wait(function(err, body) {
        if (err) { log('ERROR:', err); }

        const numErrors = body.split('\n').length - 1;
        if (numErrors) {
          log(colors.red(`Found ${numErrors} React accessibility errors`));
          // TODO: should cause accessibility-ci to exit w/ non-zero code
        }
        else {
          log(colors.green('PASS No React-a11y errors'));
        }
      }));

    phantom.on('close', function() {
      callback();
    });
    ['SIGINT', 'SIGTERM'].forEach(e => process.once(e, () => phantom && phantom.kill()));
  });
});

gulp.task('accessibility-a11y', async () => {
  const port = process.env.STYLEGUIDE_PORT || 8000;

  // TODO: When every page is going green, then check the all page. Until then, it should be extra noise.
  //const pages = ['index', 'layout', 'elements', 'objects', 'utilities', 'forms', 'react', 'faq', 'all'];
  const pages = ['css_all', 'react_all'];

  await* pages.map(function(page) {
    const url = `http://localhost:${port}/${page}.html`;

    return new Promise(function(resolve) {
      a11y(url, (err, reports) => {
        var failureCount = 0;
        log('');
        log('------------------------------------------------------------------');
        log(`Testing accessibility of the ${page} page`);
        log('------------------------------------------------------------------');
        log('');
        if (err) {
          process.exit(1);
        }

        let hasErrors;

        for (let el of reports.audit) {
          if (el.result === 'FAIL') {
            failureCount++;
            log(colors.red('FAIL', el.heading), el.elements.replace(/\n/g, '\n  '));
            hasErrors = true;
          }
          else if (el.result === 'NA') {
            log(colors.yellow('NA', el.heading));
          }
          else {
            log(colors.green('PASS', el.heading));
          }
        }

        if (hasErrors) {
          log('');
          log('------------------------------------------------------------------');
          log(`${failureCount} ADT failures on the ${page} page`);
          log('------------------------------------------------------------------');
          log('');
          // TODO: should cause accessibility-ci to exit w/ non-zero code

        }
        resolve();
      });
    });
  });
});

gulp.task('accessibility-ci', (done) => runSequence(
  'set-accessibility-ci-port',
  'monolith-serve',
  'accessibility-a11y',
  'accessibility-react-a11y',
  'monolith-kill-server',
  done
));
