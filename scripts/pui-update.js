#! /usr/bin/env node

var fs = require('fs');
var exec = require('child_process').execSync;

var packageJson = JSON.parse(fs.readFileSync('./package.json'));
var allDependencies = Array.prototype.concat.call(
  Object.keys(packageJson.dependencies),
  Object.keys(packageJson.devDependencies)
);
var puiDependencies = allDependencies.filter(function(dependency) {
  return (dependency.match(/pui-css-/) || dependency.match(/pui-react-/));
});

puiDependencies.forEach(function(dependency) {
  console.log('Updating ' + dependency + '...');
  exec('npm update ' + dependency);
});

console.log('Done!');
