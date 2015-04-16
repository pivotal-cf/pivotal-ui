var argv = require('yargs').argv;
var gulp = require('gulp');
var npm = require('npm');
var path = require('path');

gulp.task('publish', function(){
  var component = argv.component;
  if(!component) {
    console.log('Usage: gulp publish --component=componentName');
    console.log('You must be logged in to npm');
    return;
  }
  console.log('Publishing', component);
  var packageDir = path.resolve(__dirname, '..', 'dist', component);
  npm.load({}, function(error) {
    if (error) {
      console.error(error);
      return;
    }

    npm.commands.publish([packageDir], function(error) {
      if (error) {
        console.error(error);
      }
      var owners = ['charleshansen', 'rdy', 'stubbornella', 'vinsonchuong'];
      (function next() {
        if (owners.length) {
          npm.commands.owner(['add', owners.pop(), `pui-css-${component}`], next);
        }
      })();
    });
  });
});