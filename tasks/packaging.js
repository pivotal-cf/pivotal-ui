var argv = require('yargs').argv;
var File = require('vinyl');
var fs = require('fs');
var gulp = require('gulp');
var npm = require('npm');
var path = require('path');
var plugins = require('gulp-load-plugins')();
var through = require('through2');

module.exports = {
  license: function(components, distFolder) {
    return function() {
      var licenseFile = path.resolve(__dirname, '..', 'templates', 'MIT_LICENSE');
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
  },

  packageJson: function(components, distFolder, packageTemplate) {
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
  },

  publish: function(type) {
    return function(done) {
        var component = argv.component;
        if(!component) {
          console.log('Usage: gulp publish --component=componentName');
          console.log('You must be logged in to npm');
          return;
        }
        console.log('Publishing', component);
        var packageDir = path.resolve(__dirname, '..', 'dist', type, component);
        npm.load({}, function(error) {
          if (error) {
            console.error(error);
            return;
          }

          npm.commands.publish([packageDir], function(error) {
            if (error) {
              console.error(error);
            }
            var owners = ['charleshansen', 'rdy', 'stubbornella', 'mattroyal', 'gpleiss'];
            (function next() {
              if (owners.length) {
                npm.commands.owner(['add', owners.pop(), `pui-${type}-${component}`], next);
              } else {
                done();
              }
            })();
          });
        });
    };
  }
};
