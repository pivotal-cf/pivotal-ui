// Karma configuration
// Generated on Fri Oct 17 2014 15:45:37 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({
    autoWatch: false,
    basePath: './',
    browserNoActivityTimeout: 60000,
    browserify: {
      transform: [
        ['reactify', {es6: true}]
      ],
      debug: true
    },
    browsers: ['Chrome', 'PhantomJS'],
    colors: true,
    files: [
      'test/javascripts/support/*.js',
      'test/javascripts/**/*_spec.js',
      'test/javascripts/**/*_spec.jsx'
    ],
    frameworks: ['jasmine-jquery', 'jasmine', 'browserify'],
    logLevel: config.LOG_INFO,
    port: 9876,
    preprocessors: {
      'test/javascripts/**/*_spec.js': ['browserify'],
      'test/javascripts/**/*_spec.jsx': ['browserify']
    },
    reporters: ['progress']
  });
};
