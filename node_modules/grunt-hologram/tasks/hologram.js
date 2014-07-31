/*
* grunt-hologram
*
*
* Copyright (c) 2014 James Childers
* Licensed under the MIT license.
*/

'use strict';
var spawn = require('win-spawn');
var which = require('which');

module.exports = function (grunt) {

  grunt.registerMultiTask('hologram', 'Generate Hologram style guides with Grunt', function () {

    var options = this.options();
    var configPath;

    try {
      which.sync('hologram');
    } catch (err) {
      return grunt.warn(
        '\nYou need to have Hologram installed and in your PATH for this task to work.\n' +
          '\nsudo gem install hologram\n'
      );
    }

    // Null check config option
    if (options.config) {
      configPath = options.config;
    } else {
      return grunt.warn(
        '\nYou must provide a path to your hologram config file.\n'
      );
    }

    // Make sure config file exists
    if (!grunt.file.exists(configPath)) {
      return grunt.warn('Config file "' + configPath + '" not found.');
    }

    // Run hologram
    var cp = spawn('hologram', [configPath], {stdio: 'inherit'});

    cp.on('error', function (err) {
      grunt.warn(err);
    });

    cp.on('close', function (code) {
      if (code > 0) {
        return grunt.warn('Exited with error code ' + code);
      }
    });

  });

};
