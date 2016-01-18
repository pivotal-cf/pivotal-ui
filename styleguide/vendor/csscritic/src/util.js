csscriticLib.util = function () {
    "use strict";

    var module = {};

    module.getDataURIForImage = function (image) {
        var canvas = window.document.createElement("canvas"),
            context = canvas.getContext("2d");

        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        context.drawImage(image, 0, 0);

        return canvas.toDataURL("image/png");
    };

    module.getImageForUrl = function (url) {
        var defer = ayepromise.defer(),
            image = new window.Image();

        image.onload = function () {
            defer.resolve(image);
        };
        image.onerror = function () {
            defer.reject();
        };
        image.src = url;

        return defer.promise;
    };

    var getUncachableURL = function (url) {
        var delimiter;
        if (url.indexOf("?") < 0) {
            delimiter = "?";
        } else {
            delimiter = "&";
        }
        return url + delimiter + "_=" + Date.now();
    };

    module.ajax = function (url) {
        var defer = ayepromise.defer(),
            xhr = new XMLHttpRequest();

        xhr.onload = function () {
            if (xhr.status === 200 || xhr.status === 0) {
                defer.resolve(xhr.response);
            } else {
                defer.reject();
            }
        };

        xhr.onerror = function () {
            defer.reject();
        };

        try {
            xhr.open('get', getUncachableURL(url), true);
            xhr.send();
        } catch (e) {
            defer.reject();
        }

        return defer.promise;
    };

    module.loadAsBlob = function (url) {
        var defer = ayepromise.defer(),
            xhr = new XMLHttpRequest();

        xhr.onload = function () {
            if (xhr.status === 200 || xhr.status === 0) {
                defer.resolve(xhr.response);
            } else {
                defer.reject();
            }
        };

        xhr.onerror = function () {
            defer.reject();
        };

        try {
            xhr.open('get', getUncachableURL(url), true);
            xhr.responseType = 'blob';
            xhr.send();
        } catch (e) {
            defer.reject();
        }

        return defer.promise;
    };

    module.loadBlobAsText = function (blob) {
        var defer = ayepromise.defer(),
            reader = new FileReader();

        reader.onload = function (e) {
            defer.resolve(e.target.result);
        };

        reader.onerror = function () {
            defer.reject();
        };

        reader.readAsText(blob);

        return defer.promise;
    };

    module.loadBlobAsDataURI = function (blob) {
        var defer = ayepromise.defer(),
            reader = new FileReader();

        reader.onload = function (e) {
            defer.resolve(e.target.result);
        };

        reader.onerror = function () {
            defer.reject();
        };

        reader.readAsDataURL(blob);

        return defer.promise;

    };

    // excludeKeys(theMap, excludeKey...)
    module.excludeKeys = function (theMap) {
        var excludeKeys = Array.prototype.slice.call(arguments, 1),
            newMap = {};

        Object.keys(theMap).forEach(function (key) {
            if (excludeKeys.indexOf(key) === -1) {
                newMap[key] = theMap[key];
            }
        });

        return newMap;
    };

    module.serializeMap = function (theMap) {
        var serializationEntries = [],
            keys = Object.keys(theMap);

        keys.sort();
        keys.forEach(function (key) {
            serializationEntries.push(key + '=' + theMap[key]);
        });
        return serializationEntries.join(',');
    };

    module.clone = function (object) {
        var theClone = {},
            i;
        for (i in object) {
            if (object.hasOwnProperty(i)) {
               theClone[i] = object[i];
            }
        }
        return theClone;
    };

    var successfulPromise = function (value) {
        var defer = ayepromise.defer();
        defer.resolve(value);
        return defer.promise;
    };

    module.workAroundTransparencyIssueInFirefox = function (image) {
        // Work around bug https://bugzilla.mozilla.org/show_bug.cgi?id=790468 where the content of a canvas
        //   drawn to another one will be slightly different if transparency is involved.
        // Here the reference image has been drawn to a canvas once (to serialize it to localStorage), while the
        //   image of the newly rendered page hasn't.  Solution: apply the same transformation to the second image, too.
        var dataUri;
        try {
            dataUri = module.getDataURIForImage(image);
        } catch (e) {
            // Fallback for Chrome & Safari
            return successfulPromise(image);
        }

        return module.getImageForUrl(dataUri);
    };

    module.hasTestSuitePassed = function (comparisons) {
        var nonPassingTestCases = comparisons.filter(function (comparison) {
                return comparison.status !== "passed";
            }),
            allPassed = nonPassingTestCases.length === 0,
            hasValidTestSetup = comparisons.length > 0;

        return hasValidTestSetup && allPassed;
    };

    module.all = function (functionReturnValues) {
        var defer = ayepromise.defer(),
            pendingFunctionCalls = functionReturnValues.length,
            resolvedValues = [];

        var functionCallResolved = function (value, idx) {
            pendingFunctionCalls -= 1;
            resolvedValues[idx] = value;

            if (pendingFunctionCalls === 0) {
                defer.resolve(resolvedValues);
            }
        };

        if (functionReturnValues.length === 0) {
            defer.resolve([]);
            return defer.promise;
        }

        functionReturnValues.forEach(function (returnValue, idx) {
            if (returnValue && returnValue.then) {
                returnValue.then(function (result) {
                    functionCallResolved(result, idx);
                }, function (e) {
                    defer.reject(e);
                });
            } else {
                functionCallResolved(returnValue, idx);
            }
        });
        return defer.promise;
    };

    return module;
};
