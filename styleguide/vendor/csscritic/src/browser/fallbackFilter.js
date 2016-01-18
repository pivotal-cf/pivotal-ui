csscriticLib.fallbackFilter = function (windowLocation) {
    "use strict";

    var module = {};

    var storageKey = 'csscriticFallbackFilter';

    var fullDescription = function (testCase) {
        return testCase.component ? testCase.component + ' ' + testCase.desc : testCase.desc;
    };

    module.isComparisonSelected = function (comparison) {
        var filter = sessionStorage.getItem(storageKey);

        if (!filter) {
            return true;
        }

        if (comparison.testCase.desc && fullDescription(comparison.testCase) === filter) {
            return true;
        }
        if (comparison.testCase.component && comparison.testCase.component === filter) {
            return true;
        }

        return !filter || comparison.testCase.url === filter;
    };

    module.filterFor = function (testCase) {
        var filter;

        if (testCase.desc) {
            filter = fullDescription(testCase);
        } else {
            filter = testCase.url;
        }
        sessionStorage.setItem(storageKey, filter);

        windowLocation.reload();
    };

    module.filterForComponent = function (componentLabel) {
        sessionStorage.setItem(storageKey, componentLabel);

        windowLocation.reload();
    };

    module.clearFilter = function () {
        sessionStorage.removeItem(storageKey);

        windowLocation.reload();
    };

    return module;
};
