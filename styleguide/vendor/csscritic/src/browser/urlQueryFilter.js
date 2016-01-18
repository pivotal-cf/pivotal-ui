csscriticLib.urlQueryFilter = function (windowLocation) {
    "use strict";

    var module = {};

    var filterParam = 'filter';

    var parseUrlSearch = function (search) {
        var paramString = search.replace(/^\?/, '');
        if (!paramString) {
            return [];
        }
        return paramString
            .split('&')
            .map(function (keyValue) {
                var equalsIdx = keyValue.indexOf('='),
                    key, value;

                if (equalsIdx >= 0) {
                    key = keyValue.substr(0, equalsIdx);
                    value = keyValue.substr(equalsIdx + 1);
                } else {
                    key = keyValue;
                }
                return {
                    key: key,
                    value: value
                };
            });
    };

    var serializeKeyValuePair = function (pair) {
        if (pair.value) {
            return pair.key + '=' + pair.value;
        }
        return pair.key;
    };

    var getFilterValue = function () {
        var filterKeyValue = parseUrlSearch(windowLocation.search)
                .filter(function (entryPair) {
                    return entryPair.key === filterParam;
                })
                .pop();

        if (filterKeyValue) {
            return decodeURIComponent(filterKeyValue.value);
        }
    };

    var fullDescription = function (testCase) {
        return testCase.component ? testCase.component + ' ' + testCase.desc : testCase.desc;
    };

    var filter = getFilterValue(),
        existingQueryParams = parseUrlSearch(windowLocation.search);

    // interface towards main.js

    module.isComparisonSelected = function (comparison) {
        if (!filter) {
            return true;
        }

        if (comparison.testCase.desc && fullDescription(comparison.testCase) === filter) {
            return true;
        }
        if (comparison.testCase.component && comparison.testCase.component === filter) {
            return true;
        }
        return comparison.testCase.url === filter;
    };

    // interface towards browser reporters

    var queryPart = function (selection) {
        var queryParams = existingQueryParams
                .filter(function (pair) {
                    return pair.key !== filterParam;
                });
        if (selection) {
            queryParams.push({
                key: filterParam,
                value: encodeURIComponent(selection)
            });
        }

        return '?' + queryParams.map(serializeKeyValuePair).join('&');
    };

    module.filterUrlForComponent = function (componentLabel) {
        return queryPart(componentLabel);
    };

    module.filterUrlFor = function (testCase) {
        if (testCase.desc) {
            return queryPart(fullDescription(testCase));
        }
        return queryPart(testCase.url);
    };

    module.clearFilterUrl = function () {
        return queryPart();
    };

    return module;
};
