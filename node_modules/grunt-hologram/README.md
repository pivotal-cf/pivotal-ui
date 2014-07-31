# grunt-hologram

> Generate Hologram style guides with Grunt

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-hologram --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-hologram');
```

## The "hologram" task

### Overview
In your project's Gruntfile, add a section named `hologram` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  hologram: {
    options: {
      config: 'path/to/hologram/config.yml'
    }
  },
})
```

### Options

#### options.config
Type: `String`
*Required*

The path to your hologram config file.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2014 James Childers. Licensed under the MIT license.
