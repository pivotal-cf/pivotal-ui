import gulp from 'gulp';
import a11y from 'a11y';
import runSequence from 'run-sequence';
import {log, colors} from 'gulp-util';

gulp.task('set-accessibility-ci-port', () => process.env.STYLEGUIDE_PORT = 9002);

gulp.task('accessibility-a11y', ['monolith-serve'], (done) => {
  const page = 'http://localhost:9002/elements.html';
  log(`Testing accessibility of ${page}`);

  a11y(page, (err, reports) => {
    if (err) {
      done(err);
      process.exit(1);
    }

    console.log(reports);
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
  'accessibility-a11y',
  done
));
