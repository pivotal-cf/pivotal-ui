csscriticLib.phantomjsRunner = function (csscritic) {
    "use strict";

    var system = require("system");

    var module = {};

    var parseArguments = function (args) {
        var i = 0,
            arg, value,
            parsedArguments = {
                opts: {},
                args: []
            };

        var getFollowingValue = function (args, i) {
            if (i + 1 >= args.length) {
                throw new Error("Invalid arguments");
            }
            return args[i+1];
        };

        while(i < args.length) {
            if (args[i].substr(0, 2) === "--") {
                if (args[i].indexOf('=') >= 0) {
                    arg = args[i].substring(0, args[i].indexOf('='));
                    value = args[i].substring(args[i].indexOf('=') + 1, args[i].length);
                } else {
                    arg = args[i];
                    value = getFollowingValue(args, i);

                    i += 1;
                }

                parsedArguments.opts[arg] = value;
            } else if (args[i][0] === "-") {
                arg = args[i];
                parsedArguments.opts[arg] = getFollowingValue(args, i);

                i += 1;
            } else {
                arg = args[i];
                parsedArguments.args.push(arg);
            }
            i += 1;
        }

        return parsedArguments;
    };

    var runCompare = function (testDocuments, signedOffPages, logToPath, doneHandler) {
        signedOffPages = signedOffPages || [];

        csscritic.addReporter(csscritic.SignOffReporter(signedOffPages));
        csscritic.addReporter(csscritic.TerminalReporter());
        if (logToPath) {
            csscritic.addReporter(csscritic.HtmlFileReporter(logToPath));
        }

        testDocuments.forEach(function (testDocument) {
            csscritic.add(testDocument);
        });

        csscritic.execute().then(doneHandler);
    };

    module.main = function () {
        var parsedArguments = parseArguments(system.args.slice(1)),
            signedOffPages = parsedArguments.opts['-f'],
            logToPath = parsedArguments.opts['--log'];

        if (parsedArguments.args.length < 1) {
            console.log("CSS critic regression runner for PhantomJS");
            console.log("Usage: phantomjs-regressionrunner.js [-f SIGNED_OFF.json] [--log PATH] A_DOCUMENT.html [ANOTHER_DOCUMENT.html ...]");
            phantom.exit(2);
        } else {
            runCompare(parsedArguments.args, signedOffPages, logToPath, function (passed) {
                var ret = passed ? 0 : 1;

                phantom.exit(ret);
            });
        }
    };

    return module;
};
