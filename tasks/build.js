var autoprefixerCore = require('autoprefixer-core');
var extend = require('lodash').extend;
var fs = require('fs');
var gulp = require('gulp');
var mkdirp = require('mkdirp');
var nodeSass = require('node-sass');
var path = require('path');
var plugins = require('gulp-load-plugins')();
var through = require('through2');

var packageTemplate = function(overrides) {
  return JSON.stringify(extend({
    name: 'pui-css-COMPONENT',
    style: 'COMPONENT.css',
    version: '0.0.1',
    description: '',
    repository: {
      type: 'git',
      url: 'https://github.com/pivotal-cf/pivotal-ui.git'
    },
    keywords: [
      'bootstrap',
      'pivotal ui',
      'pivotal ui modularized',
      'css'
    ],
    author: 'Pivotal Software, Inc',
    license: 'MIT',
    bugs: {
      url: "https://github.com/pivotal-cf/pivotal-ui/issues"
    },
    homepage: "https://github.com/pivotal-cf/pivotal-ui"
  }, overrides), null, 2);
};

gulp.task('assets-package-json', function(){
  return gulp.src(['src/pivotal-ui/components/*', '!src/**/*.scss'])
    .pipe(plugins.plumber())
    .pipe(through.obj(function(folder, encoding, callback) {
      var name = path.basename(folder.path);
      var outputDir = path.resolve(__dirname, '..', 'dist', name);
      var jsonContents = {};
      try {
        jsonContents = JSON.parse(fs.readFileSync(path.resolve(folder.path, 'package.json'), 'utf8'));
      } catch(e) {}

      var nameFields = {
        name: 'pui-css-' + name,
        description: name + ' css component for Pivotal UI based on Bootstrap',
        style: name + '.css'
      };

      var overrides = extend({}, nameFields, jsonContents);
      mkdirp.sync(outputDir);
      fs.writeFileSync(path.resolve(outputDir, 'package.json'), packageTemplate(overrides));
      callback();
    }));
});

gulp.task('assets-license', function(){
  return gulp.src(['src/pivotal-ui/components/*', '!src/**/*.scss'])
    .pipe(plugins.plumber())
    .pipe(through.obj(function(folder, encoding, callback) {
      var name = path.basename(folder.path);
      var outputDir = path.resolve(__dirname, '..', 'dist', name);
      mkdirp.sync(outputDir);
      var licenseFile = path.resolve(__dirname, '..', 'templates', 'MIT_LICENSE');
      fs.writeFileSync(path.resolve(outputDir, 'LICENSE'), fs.readFileSync(licenseFile, 'utf8'));
      callback();
    }));
});

var readme_template = function(name, packageJson) {
  return `# ${name}

A CSS ${name} component that can be installed via this npm package. The package provides all of the
CSS you need to use the component.

## Installation

To install the package, from the command line, type:

\`\`\`
npm install pui-css-${name}
\`\`\`

## Usage

${fs.readFileSync(path.resolve(__dirname, '..', 'src', 'pivotal-ui', 'components', name, 'README.md'), 'utf8')}
You can find more examples of the ${name} component in the [pui style guide](${packageJson.homepage})
  `;
};

gulp.task('assets-readme', function(){
  var readme_footer = fs.readFileSync(path.resolve(__dirname, '..', 'templates', 'css_readme_footer.md'));
  return gulp.src(['src/pivotal-ui/components/*', '!src/**/*.scss'])
    .pipe(plugins.plumber())
    .pipe(through.obj(function(folder, encoding, callback) {
      var name = path.basename(folder.path);
      var packageJson = JSON.parse(fs.readFileSync(path.resolve(folder.path, 'package.json'), 'utf8'));

      var readme = readme_template(name, packageJson);
      readme = readme + readme_footer;

      var outputDir = path.resolve(__dirname, '..', 'dist', name);
      mkdirp.sync(outputDir);
      fs.writeFileSync(path.resolve(outputDir, 'README.md'), readme);
      callback();
    }));
});

gulp.task('assets-sass', function(){
  return gulp.src(['src/pivotal-ui/components/**/*.scss'])
    .pipe(through.obj(function(file, encoding, callback) {
      var componentName = path.basename(file.path, '.scss');
      var outputDir = path.resolve(__dirname, '..', 'dist', componentName);

      if(componentName !== "mixins" && componentName !== "pui-variables") {
        var css = nodeSass.renderSync({
          outputStyle: 'compressed',
          file: file.path
        }).css;
        css = autoprefixerCore.process(css).css;

        mkdirp.sync(outputDir);
        fs.writeFileSync(path.resolve(outputDir, componentName+'.css'), css);

      }
      callback();
    }));
});

gulp.task('assets-other', function() {
  return gulp.src('src/pivotal-ui/components/*/**/!(package.json|README.md|*.scss)')
    .pipe(gulp.dest('dist'));
});

gulp.task('build-bootstrap', function() {
  return gulp.src('src/bootstrap/*.scss')
    .pipe(through.obj(function(file, encoding, callback) {
      var componentName = 'bootstrap';
      var outputDir = path.resolve(__dirname, '..', 'dist', componentName);

        var css = nodeSass.renderSync({
          outputStyle: 'compressed',
          file: file.path
        }).css;
        css = autoprefixerCore.process(css).css;

        mkdirp.sync(outputDir);
        fs.writeFileSync(path.resolve(outputDir, componentName+'.css'), css);
        fs.writeFileSync(path.resolve(outputDir, 'package.json'),
          fs.readFileSync(path.resolve(file.base, 'package.json')));
        fs.writeFileSync(path.resolve(outputDir, 'README.md'),
          fs.readFileSync(path.resolve(file.base, 'README.md')));

      callback();
    }));
});

gulp.task('assets-packaging', ['assets-package-json', 'assets-readme', 'assets-license']);

gulp.task('_buildComponents', ['assets-sass', 'assets-packaging', 'assets-other', 'build-bootstrap']);
