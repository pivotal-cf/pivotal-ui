import {writeArray} from 'event-stream';
import gulp from 'gulp';
import license from '../../tasks/helpers/license-helper';

describe('license', () => {
  let result;

  beforeEach(done => {
    const licenseStream = gulp.src('src/pivotal-ui/components/alerts')
      .pipe(license());

    licenseStream.on('error', (error) => {
      console.error(error);
      callback();
    });

    licenseStream.pipe(writeArray((error, data) => {
      result = data;
      done();
    }));
  });

  it('creates an MIT license for the component', () => {
    expect(result[0].path).toEqual('alerts/LICENSE');
    expect(result[0].contents.toString()).toContain('The MIT License');
  });
});

