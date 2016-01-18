/* jshint evil: true */
"use strict";

var webserverPort = 8000;

require.paths.push('../node_modules/ayepromise');

var fs = require("fs"),
    system = require("system"),
    ayepromise = require('ayepromise'),
    csscriticLoadingPage;

if (system.args.length !== 2) {
    console.log('Usage: smokeTest.js csscriticLoadingHtmlPage');
    phantom.exit(1);
}

csscriticLoadingPage = system.args[1];


var waitFor = function (truthyTest) {
    var maxPolls = 20,
        sleepDuration = 100,
        iterationCount = 0,
        defer = ayepromise.defer();

    var poll = function () {
        var successful = truthyTest();
        if (successful) {
            defer.resolve();
        } else if (iterationCount === maxPolls) {
            defer.reject(new Error("timed out waiting for condition to be true"));
        } else {
            iterationCount += 1;
            setTimeout(function () {
                poll();
            }, sleepDuration);
        }
    };

    setTimeout(function () {
        poll();
    }, 100);

    return defer.promise;
};

var loadPage = function (url) {
    var page = require('webpage').create(),
        defer = ayepromise.defer();

    // Provide some inspection
    page.onConsoleMessage = function (msg) {
        console.log(msg);
    };
    page.onError = function(message) {
        console.error(message);
    };
    // Open page
    page.viewportSize = {width: 400, height: 300};
    page.open(url, function (status) {
        if (status !== 'success') {
            defer.reject('Unable to load the address!');
        } else {
            defer.resolve(page);
        }
    });

    return defer.promise;
};

var startWebserver = function (port) {
    var fs = require('fs'),
        server = require('webserver').create();

    var launched = server.listen(port, function(request, response) {
        var localPath = '.' + request.url.replace(/\?.+$/, '');

        if (fs.isReadable(localPath)) {
            response.statusCode = 200;
            response.write(fs.read(localPath));
        } else {
            response.statusCode = 404;
            response.write("");
        }
        response.close();
    });

    if (!launched) {
        console.log("Error: Unable to start internal web server on port", port);
        phantom.exit(1);
    }
};

// user actions

var selectASingleTestCase = function () {
    document.querySelector('#pageThatDoesNotExist\\,component\\=some_component').parentElement.querySelector('.titleLink').click();
};

var getComparisonCount = function () {
    return document.querySelectorAll('.comparison').length;
};

var runAll = function () {
    document.querySelector('.runAll').click();
};

var jumpToLastComparison = function () {
    var progressElements = document.querySelectorAll('.progressBar li a'),
        lastElement = progressElements[progressElements.length - 1];
    lastElement.click();
};

var jumpBackInHistory = function () {
    window.history.back();
};

var getWindowScrollY = function () {
    return window.scrollY;
};


var regressionTestToExecute = function (page) {
    return function () {
        return page.evaluate(function () {
            return document.querySelector('.header.fail');
        });
    };
};

// poor man's asserts

var assertEquals = function (value, expectedValue, name) {
    var expectation = "Expecting " + name + " to equal '" + expectedValue + "'";
    if (value === expectedValue) {
        console.log(expectation + " ✓");
    } else {
        throw new Error(expectation + " but found '" + value +"'");
    }
};

var assertNotEquals = function (value, notExpectedValue, name) {
    var expectation = "Expecting " + name + " not to equal '" + notExpectedValue + "': '" + value + "'";
    if (value === notExpectedValue) {
        throw new Error(expectation);
    } else {
        console.log(expectation + " ✓");
    }
};

var assertMatches = function (value, regex, name) {
    var expectation = "Expecting " + name + " to match " + regex + ": '" + value + "'";
    if (regex.test(value)) {
        console.log(expectation + " ✓");
    } else {
        throw new Error(expectation);
    }
};


var runTestAgainst = function (pageUrl, options) {
    var withNavigationFallback = options.withNavigationFallback,
        page;

    console.log("Running test against " + pageUrl);

    return loadPage(pageUrl)
        .then(function (thePage) {
            page = thePage;

            console.log("Waiting for regression test to finish executing");
            return waitFor(regressionTestToExecute(page));
        })
        .then(function () {
            console.log("Jumping to last comparison");
            page.evaluate(jumpToLastComparison);

            return waitFor(function () {
                return page.evaluate(getWindowScrollY) > 0;
            });
        })
        .then(function () {
            var scrollY = page.evaluate(getWindowScrollY);

            assertNotEquals(scrollY, 0, "scrollY");
            if (withNavigationFallback) {
                assertEquals(page.url, pageUrl, "page url");
            } else {
                assertMatches(page.url, /#/, "page url");
            }
        })
        .then(function () {
            console.log("Jumping back");
            page.evaluate(jumpBackInHistory);
        })
        .then(function () {
            var scrollY = page.evaluate(getWindowScrollY);

            assertEquals(scrollY, 0, "scrollY");
            assertEquals(page.url, pageUrl, "page url");
        })
        .then(function () {
            console.log("Selecting first comparison");

            page.evaluate(selectASingleTestCase);
            return waitFor(regressionTestToExecute(page));
        })
        .then(function () {
            var comparisonCount = page.evaluate(getComparisonCount);

            assertEquals(comparisonCount, 1, "number of comparisons");
            if (withNavigationFallback) {
                assertEquals(page.url, pageUrl, "page url");
            } else {
                assertMatches(page.url, /\?filter/, "page url");
            }
        })
        .then(function () {
            console.log('Clicking "Run all"');

            page.evaluate(runAll);
            return waitFor(regressionTestToExecute(page));
        })
        .then(function () {
            var comparisonCount = page.evaluate(getComparisonCount);

            assertEquals(comparisonCount, 2, "number of comparisons");
            if (withNavigationFallback) {
                assertEquals(page.url, pageUrl, "page url");
            } else {
                assertMatches(page.url, /\?$/, "page url");
            }
        })
        .then(null, function (e) {
            page.render('smokeTestError.png');
            throw e;
        });
};

runTestAgainst('file://' + fs.absolute(csscriticLoadingPage), {withNavigationFallback: true})
    .then(function () {
        startWebserver(webserverPort);
        return runTestAgainst(
            'http://localhost:' + webserverPort + '/' + csscriticLoadingPage,
            {withNavigationFallback: false}
        );
    })
    .then(function () {
        console.log('Smoke test successful');
        phantom.exit();
    }, function (err) {
        console.error(err);
        phantom.exit(1);
    });
