import {exec} from 'child_process';
import gulp from 'gulp';
import path from 'path';
import {argv} from 'yargs';

gulp.task('vendor-package', ['css-build', 'react-build'], (callback) => {
  const {type: componentType, component: componentName, dest} = argv;

  function useVendoredPackageInProject() {
    console.log('hi');
    const originalDirectory = process.cwd();
    process.chdir(dest);

    exec(`npm install --save ${path.join('pui-vendor', componentType, componentName)}`, (error) => {
      if (error) {
        new gutil.PluginError('vendor-package', {message: error});
      }
      process.chdir(originalDirectory);
      callback();
    });
  }

  gulp.src(`dist/${componentType}/${componentName}/*`)
    .pipe(gulp.dest(`${dest}/pui-vendor/${componentType}/${componentName}`))
    .on('end', useVendoredPackageInProject);
});
