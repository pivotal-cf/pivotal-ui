/*global module:false, require: false*/
module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            deps: ['build/dependencies/*.js'],
            dist: ['build/*.js', 'dist/', 'packageVersion.js'],
            all: ['build', 'test/ui/*.html.json', 'example/*.html.json']
        },
        jasmine: {
            src: 'csscritic.js',
            options: {
                specs: ['test/specs/shared/*.js', 'test/specs/*.js', 'test/specs/browser/*.js'],
                helpers: [
                    'test/helpers.js',
                    'node_modules/jquery/dist/jquery.js',
                    'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
                    'test/testHelper.js'
                ],
                fixturesPath: './fixtures/',
                summary: true,
                display: 'short'
            }
        },
        shell: {
            runPhantomTests: {
                command: 'phantomjs test/run-phantomjs-tests.js'
            },
            // Use grep to fail the build as slimerjs does not understand exitcodes
            smokeTestLoader: {
                command: './node_modules/.bin/slimerjs test/smokeTest.js test/smokeTestLoader.html | grep "Smoke test successful"'
            },
            smokeTestBundle: {
                command: './node_modules/.bin/slimerjs test/smokeTest.js test/smokeTestBundled.html | grep "Smoke test successful"'
            }
        },
        exportVersion: {
            default: {
                template: 'packageVersion.js.template',
                target: 'packageVersion.js'
            }
        },
        concat: {
            phantomjs: {
                options: {
                    banner: '/*! PhantomJS regression runner for <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                        '* <%= pkg.homepage %>\n' +
                        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>, Copyright (c) 2012 ThoughtWorks, Inc.;' +
                        ' Licensed <%= pkg.license %> */' +
                        '\n/* Integrated dependencies:\n' +
                        ' * jsSHA.js (BSD License),\n' +
                        ' * ayepromise (BSD License & WTFPL),\n' +
                        ' * imagediff.js (MIT License),\n' +
                        ' * url (MIT License),\n' +
                        ' * CSSOM (MIT License),\n' +
                        ' * inlineresources (MIT License) */\n\n'
                },
                src: [
                    'node_modules/jssha/src/sha.js',
                    'node_modules/imagediff/imagediff.js',
                    'node_modules/ayepromise/ayepromise.js',
                    'build/dependencies/inlineresources.js',
                    'src/boot/scope.js',
                    'src/cli/*.js',
                    'src/*.js',
                    'src/boot/cli.js'
                ],
                dest: 'dist/<%= pkg.name %>-phantom.js'
            },
            one: {
                src: [
                    'src/boot/scope.js',
                    'src/*.js',
                    'src/browser/*.js',
                    'packageVersion.js',
                    'src/boot/browser.js',
                ],
                dest: 'build/<%= pkg.name %>.concat.js'
            }
        },
        umd: {
            all: {
                src: 'build/<%= pkg.name %>.concat.js',
                dest: 'build/<%= pkg.name %>.umd.js',
                objectToExport: 'csscritic',
                indent: '    ',
                deps: {
                    default: ['ayepromise', 'imagediff', 'rasterizeHTML'],
                    // HACK, use the css require to include css via cssify
                    cjs: ['ayepromise', 'imagediff', 'rasterizehtml', '../build/<%= pkg.name %>.concat.css']
                }
            }
        },
        browserify: {
            inlineresources: {
                src: 'node_modules/inlineresources/src/inline.js',
                dest: 'build/dependencies/inlineresources.js',
                options: {
                    browserifyOptions: {
                        standalone: 'inlineresources'
                    }
                }
            },
            allinone: {
                src: 'build/<%= pkg.name %>.umd.js',
                dest: 'dist/<%= pkg.name %>.allinone.js',
                options: {
                    browserifyOptions: {
                        standalone: 'csscritic',
                        debug: true
                    },
                    transform: ['cssify'],
                    plugin: [
                        ['minifyify', {map: '<%= pkg.name %>.allinone.js.map', output: 'dist/<%= pkg.name %>.allinone.js.map'}]
                    ],
                    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                        '* <%= pkg.homepage %>\n' +
                        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>, Copyright (c) 2012, 2013 ThoughtWorks, Inc.;' +
                        ' Licensed <%= pkg.license %> */' +
                        '\n/* Integrated dependencies:\n' +
                        ' * imagediff.js (MIT License),\n' +
                        ' * ayepromise (BSD License & WTFPL),\n' +
                        ' * url (MIT License),\n' +
                        ' * CSSOM (MIT License),\n' +
                        ' * xmlserializer (MIT License),\n' +
                        ' * css-font-face-src (BSD License),\n' +
                        ' * inlineresources (MIT License),\n' +
                        ' * rasterizeHTML.js (MIT License) */\n'
                }
            }
        },
        cssmin: {
            dist: {
                files: {
                    'build/<%= pkg.name %>.concat.css': ['src/browser/*.css']
                }
            }
        },
        csslint: {
            basichtmlreporter: {
                src: 'src/**/*.css',
                options: {
                    "ids": false,
                    "adjoining-classes": false,
                    "box-model": false,
                    "box-sizing": false,
                    "duplicate-background-images": false,
                    "compatible-vendor-prefixes": false,
                    "fallback-colors": false
                }
            }
        },
        watch: {
            files: [
                '*.js',
                'src/**/*.js',
                'test/**/*.js'
            ],
            tasks: ['test']
        },
        jshint: {
            all: ['src/**/*.js', 'test/**/*.js', '*.js'],
            options: {
                jshintrc: true
            }
        },
        "regex-check": {
            files: [
                '*.md',
                'src/*.js',
                'src/*/*.js',
                'test/*.js',
                'test/*.html',
                'test/*/*.js',
                'test/*/*.html',
                'test/*/*/*.js'
            ],
            options: {
                pattern : /FIXME/g
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-regex-check');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-umd');

    grunt.registerMultiTask('exportVersion', 'Exports the version to a given file', function() {
        var fs = require('fs'),
            ejs = require('ejs'),
            packageJson = require('./package.json');

        var template = this.data.template,
            target = this.data.target;

        var packageName = packageJson.name,
            packageVersion = packageJson.version;

        var templateContent = fs.readFileSync(template, {encoding: 'utf8'}),
            fileContent = ejs.render(templateContent, {'name': packageName, 'version': packageVersion});

        fs.writeFileSync(target, fileContent);
    });

    grunt.registerTask('dependencies', [
        'clean:deps',
        'browserify:inlineresources',
    ]);

    grunt.registerTask('test', [
        'jshint',
        'csslint',
        'jasmine',
        'shell:runPhantomTests'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'exportVersion',
        'concat',
        'umd',
        'cssmin',
        'browserify:allinone'
    ]);

    grunt.registerTask('default', [
        'dependencies',
        'test',
        'build',
        'shell:smokeTestLoader',
        'shell:smokeTestBundle',
        'regex-check'
    ]);

};
