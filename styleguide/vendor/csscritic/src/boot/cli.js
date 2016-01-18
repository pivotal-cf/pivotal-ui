(function () {
    "use strict";

    var util = csscriticLib.util(),
        phantomRenderer = csscriticLib.phantomjsRenderer(),
        filestorage = csscriticLib.filestorage(util),
        reporting = csscriticLib.reporting(phantomRenderer, filestorage, util),
        regression = csscriticLib.regression(phantomRenderer, util, imagediff);

    var main = csscriticLib.main(
        regression,
        reporting,
        util,
        filestorage
    );

    // Export convenience constructors
    var signOffReporterUtil = csscriticLib.signOffReporterUtil(util, inlineresources, jsSHA),
        signOffReporter = csscriticLib.signOffReporter(signOffReporterUtil),
        htmlFileReporter = csscriticLib.htmlFileReporter(util),
        terminalReporter = csscriticLib.terminalReporter(window.console);

    var csscritic = {
        add: main.add,
        execute: main.execute,

        addReporter: reporting.addReporter,

        HtmlFileReporter: htmlFileReporter.HtmlFileReporter,
        SignOffReporter: signOffReporter.SignOffReporter,
        TerminalReporter: terminalReporter.TerminalReporter
    };

    var runner = csscriticLib.phantomjsRunner(csscritic);
    runner.main();
}());
