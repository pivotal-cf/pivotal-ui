/* exported csscritic */
var csscritic = (function () {
    "use strict";

    var installCallChain = function (func, self) {
        return function chainableProxy() {
            func.apply(null, arguments);
            return self;
        };
    };

    var startsWith = function (str, prefix) {
        // PhantomJS has no startsWith
        return str.substr(0, prefix.length) === prefix;
    };

    // Work around https://bugzilla.mozilla.org/show_bug.cgi?id=1005634
    var needsFallback = function () {
        return startsWith(window.location.href, 'file://');
    };

    var packageVersion = csscriticLib.packageVersion || 'dev',
        util = csscriticLib.util();

    var indexedDbStorage = csscriticLib.indexeddbstorage(util);

    var browserRenderer = csscriticLib.browserRenderer(util, csscriticLib.jobQueue, rasterizeHTML),
        reporting = csscriticLib.reporting(browserRenderer, indexedDbStorage, util),
        regression = csscriticLib.regression(browserRenderer, util, imagediff),
        queryFilter = csscriticLib.urlQueryFilter(window.location),
        fallbackFilter = csscriticLib.fallbackFilter(window.location);

    var filter = needsFallback() ? fallbackFilter : queryFilter;

    var main = csscriticLib.main(
        regression,
        reporting,
        util,
        indexedDbStorage,
        filter
    );

    var pageNavigationHandlingFallback = csscriticLib.pageNavigationHandlingFallback(window.location),
        niceReporter = csscriticLib.niceReporter(
            window,
            util,
            filter,
            needsFallback() ? pageNavigationHandlingFallback : undefined,
            rasterizeHTML,
            packageVersion
        );


    var self = {};

    self.add = installCallChain(main.add, self);
    self.component = installCallChain(main.component, self);
    self.execute = main.execute;

    self.addReporter = installCallChain(reporting.addReporter, self);

    self.NiceReporter = niceReporter.NiceReporter;

    return self;
}());
