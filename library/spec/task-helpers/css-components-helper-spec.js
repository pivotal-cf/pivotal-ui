import {readArray, writeArray} from 'event-stream';
import gulp from 'gulp';
import path from 'path';
import File from 'vinyl';
import {packageJson, readme} from '../../tasks/helpers/css-components-helper';

describe('packageJson', () => {
  let result;

  function generatePackageJson(name, packageJsonOverrides, callback) {
    const readmeStream = readArray([new File({
      path: path.join(__dirname, '..', '..', 'src', 'pivotal-ui', 'components', name, 'package.json'),
      contents: new Buffer(JSON.stringify(packageJsonOverrides, null, 2))
    })]).pipe(packageJson());

    readmeStream.on('error', (error) => {
      console.error(error);
      callback();
    });

    readmeStream.pipe(writeArray((error, data) => {
      result = data;
      callback();
    }));
  }

  describe('with no overrides', function() {
    beforeEach(done => generatePackageJson('foo', {}, done));

    it('returns a package json file with default values', function() {
      expect(result[0].path).toEqual('foo/package.json');
      expect(JSON.parse(result[0].contents.toString())).toEqual(jasmine.objectContaining({
        name: 'pui-css-foo',
        style: 'foo.css',
        version: '0.0.1',
        description: 'foo css component for Pivotal UI based on Bootstrap',
        repository: {type: 'git', url: 'https://github.com/pivotal-cf/pivotal-ui.git'},
        keywords: ['bootstrap', 'pivotal ui', 'pivotal ui modularized', 'css'],
        author: 'Pivotal Software, Inc',
        license: 'MIT',
        bugs: {url: 'https://github.com/pivotal-cf/pivotal-ui/issues'},
        homepage: 'https://github.com/pivotal-cf/pivotal-ui'
      }));
    });
  });

  describe('with some overrides', function() {
    beforeEach(done => generatePackageJson('foo', {
      description: 'custom description',
      version: '1.2.3',
      dependencies: {
        'foo': '1.0.0',
        'bar': '2.0.0'
      }
    }, done));

    it('returns a package json file with the override values', function() {
      expect(JSON.parse(result[0].contents.toString())).toEqual(jasmine.objectContaining({
        description: 'custom description',
        version: '1.2.3',
        dependencies: {
          'foo': '1.0.0',
          'bar': '2.0.0'
        }
      }));
    });
  });

  describe('when the style tag is null', function() {
    beforeEach(done => generatePackageJson('foo', {style: null}, done));

    it('does not include a style tag', function() {
      const packageJsonContents = JSON.parse(result[0].contents.toString());
      expect(Object.keys(packageJsonContents)).not.toContain('style');
    });
  });
});

describe('readme', () => {
  let result;

  function generateReadme(components, callback) {
    const readmeStream = gulp.src(components)
      .pipe(readme());

    readmeStream.on('error', (error) => {
      console.error(error);
      callback();
    });

    readmeStream.pipe(writeArray((error, data) => {
      result = data;
      callback();
    }));
  }

  describe('general use case', () => {
    beforeEach(done => generateReadme([
      'src/pivotal-ui/components/bootstrap/',
      'src/pivotal-ui/components/alerts/',
      'src/pivotal-ui/components/code/'
    ], done));

    it('generates a readme for each supplied component', () => {
      expect(result.length).toEqual(3);

      expect(result[0].path).toEqual('bootstrap/README.md');
      expect(result[0].contents.toString()).toContain('pui-css-bootstrap');

      expect(result[1].path).toEqual('alerts/README.md');
      expect(result[1].contents.toString()).toContain('pui-css-alerts');

      expect(result[2].path).toEqual('code/README.md');
      expect(result[2].contents.toString()).toContain('pui-css-code');
    });
  });

  describe('when the component has no usage or additional intro', () => {
    beforeEach(done => generateReadme(['src/pivotal-ui/components/bootstrap/'], done));

    it('generates a readme with the supplied name, homepage, and description', () => {
      expect(result[0].contents.toString().trim()).toEqual(`
# pui-css-bootstrap

Custom build of Bootstrap for Pivotal UI



## Installation

To install the package, from the command line, type:

\`\`\`
npm install pui-css-bootstrap
\`\`\`


*****************************************

This is a component of Pivotal UI. It is a Pivotal specific implementation of Bootstrap.

[Styleguide](http://styleguide.pivotal.io)
[Github](https://github.com/pivotal-cf/pivotal-ui)

(c) Copyright 2015 Pivotal Software, Inc. All Rights Reserved.
      `.trim());
    });
  });

  describe('when the component has a usage section', () => {
    beforeEach(done => generateReadme(['src/pivotal-ui/components/alerts/'], done));

    it('includes a usage statement in the readme', () => {
      expect(result[0].contents.toString().trim()).toContain(`
\`\`\`
npm install pui-css-alerts
\`\`\`

## Usage

\`\`\`html
<div class="alert alert-success">
  <p class="em-high">Success</p>
</div>
\`\`\`


You can find more examples of the alerts component in the [pui style guide](http://styleguide.pivotal.io/)

*****************************************
      `.trim());
    });
  });

  describe('when the component has an additional intro', () => {
    beforeEach(done => generateReadme(['src/pivotal-ui/components/code/'], done));

    it('includes the additional intro in the readme', () => {
      expect(result[0].contents.toString().trim()).toContain(`
A CSS code component that can be installed via this npm package. The package provides all of the
CSS you need to use the component.

By default, code blocks will not have syntax highlighting.
To enable this, use the [PUI PrismJS](https://www.npmjs.com/package/pui-prismjs) package.
It is a wrapper around [Prism](http://prismjs.com).

\`\`\`sh
npm install pui-prismjs
\`\`\`

You will also need to include a Prism theme.

\`\`\`sh
npm install prismjs-default-theme
# or
npm install prismjs-okaidia-theme
\`\`\`


## Installation
      `.trim());
    });
  });
});
