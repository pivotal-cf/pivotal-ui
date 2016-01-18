(function() {
  "use strict";

  phantom.injectJs("./node_modules/jasmine-core/lib/jasmine-core/jasmine.js");
  phantom.injectJs("./node_modules/jasmine-core/lib/console/console.js");

  function extend(destination, source) {
    for (var property in source) {
      destination[property] = source[property];
    }
    return destination;
  }

  window.jasmine = jasmineRequire.core(jasmineRequire);

  jasmineRequire.console(jasmineRequire, jasmine);

  var env = jasmine.getEnv();

  var jasmineInterface = {
    describe: env.describe,
    xdescribe: env.xdescribe,
    it: env.it,
    xit: env.xit,
    beforeEach: env.beforeEach,
    afterEach: env.afterEach,
    expect: env.expect,
    pending: env.pending,
    spyOn: env.spyOn
  };

  extend(window, jasmineInterface);

  jasmine.addCustomEqualityTester = function(tester) {
    env.addCustomEqualityTester(tester);
  };

  jasmine.addMatchers = function(matchers) {
    return env.addMatchers(matchers);
  };

  jasmine.clock = function() {
    return env.clock;
  };

  var system = require('system');

  var consoleReporter = new jasmine.ConsoleReporter({
    print: function (msg) { system.stdout.write(msg); },
    showColors: true,
    onComplete: function (success) {
        setTimeout(function () {
            phantom.exit(success ? 0 : 1);
        }, 10);
    }
  });

  env.addReporter(consoleReporter);


  window.executeJasmine = function() {
    env.execute();
  };

}());
