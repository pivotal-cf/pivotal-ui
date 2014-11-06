// Karma configuration
// Generated on Fri Oct 17 2014 15:45:37 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({
    autoWatch: false,
    basePath: './',
    browserify: {
      transform: ['reactify']
    },
    browsers: ['Chrome', 'PhantomJS'],
    colors: true,
    files: [
      'test/spec/support/*.js',
      'test/spec/javascripts/**/*_spec.js'
    ],
    frameworks: ['jasmine', 'browserify'],
    logLevel: config.LOG_INFO,
    port: 9876,
    preprocessors: {
      'test/spec/javascripts/**/*_spec.js': ['browserify']
    },
    reporters: ['progress']
  });
};
