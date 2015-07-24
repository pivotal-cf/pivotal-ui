import gulp from 'gulp';
import a11y from 'a11y';
import runSequence from 'run-sequence';
import {log, colors} from 'gulp-util';


gulp.task('set-accessibility-ci-port', (done) => {
  process.env.STYLEGUIDE_PORT = 9002;
  done();
});

gulp.task('accessibility-a11y', (done) => {
  const port = process.env.STYLEGUIDE_PORT || 8000;
  const page = `http://localhost:${port}/react.html`;
  log(`Testing accessibility of ${page}`);

  a11y(page, (err, reports) => {
    if (err) {
      done(err);
      process.exit(1);
    }

    let hasErrors;

    for (let el of reports.audit) {
      if (el.result === 'FAIL') {
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
      done('Google accessibility errors');
      process.exit(2);
    }
    else {
      done();
    }
  });
});

gulp.task('accessibility-ci', (done) => runSequence(
  'set-accessibility-ci-port',
  'monolith-serve',
  'accessibility-a11y',
  done
));
