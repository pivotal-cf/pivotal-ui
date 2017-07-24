import File from 'vinyl';
import fs from 'fs';
import gulp from 'gulp';
import path from 'path';
import through from 'through2';

const plugins = require('gulp-load-plugins')();

export function license(components, distFolder) {
  return function() {
    var licenseFile = path.resolve(__dirname, '..', '..', 'templates', 'MIT_LICENSE');
    var licenseContent = fs.createReadStream(licenseFile, 'utf8');
    licenseContent.setMaxListeners(100);

    return gulp.src(components)
    .pipe(plugins.plumber())
    .pipe(through.obj(function(folder, encoding, callback) {
      var name = path.basename(folder.path);
      var file = new File({contents: licenseContent, path: path.join(name, 'LICENSE')});
      callback(null, file);
    })).pipe(gulp.dest(distFolder));
  };
}

export function packageJson(components, distFolder, packageTemplate) {
  return function() {
    return gulp.src(components)
    .pipe(plugins.plumber())
    .pipe(through.obj(function(folder, encoding, callback) {
      var name = path.basename(folder.path);

      fs.readFile(path.resolve(folder.path, 'package.json'), 'utf8', function(err, packageJsonOverrides) {
        if (err) packageJsonOverrides = {};

        var finalContents = packageTemplate(name, JSON.parse(packageJsonOverrides));
        var file = new File({contents: new Buffer(finalContents), path: path.join(name, 'package.json')});
        callback(null, file);
      });
    }))
    .pipe(gulp.dest(distFolder));
  };
}
