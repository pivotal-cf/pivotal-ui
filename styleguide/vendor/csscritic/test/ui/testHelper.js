window.testHelper = (function () {
    "use strict";

    var testHelper = {};

    var mockImagediff = function () {
        window.imagediff = {
            diff: function (imageA, imageB) {
                var canvas = document.createElement("canvas"),
                    height = Math.max(imageA.height, imageB.height),
                    width = Math.max(imageA.width, imageB.width);
                return canvas.getContext("2d").createImageData(width, height);
            }
        };
    };

    var setUpMocks = function () {
        var mocks = {};

        var mockImageUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3AsECh0kn2LdqQAAAKlJREFUeNrt3bERADAIAzGT/XeGLQiFfgR0rql0OjrTcwIgAgJEQIAICBABASIgAgJEQIAICBABASIgAgJEQIAICBABASIgAgJEQIAICBABASIgAgJEQIAICBABASIgAgJEQIAICBABASIgAgJEQIAICBABAaJvlXcuFiIgQAQEiIAAERAgAiIgQAQEiIAAERAgAiIgQAQEiIAAERAgAiIgQAQEiIAA0U4DUeIDxDHtCI8AAAAASUVORK5CYII=";

        var heigherMockImageUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAACWCAYAAAAouC1GAAABSklEQVR4nO3OsQ3AMADDsJzez9vZFygoaMK7znm5Sh7AygNYeQArD2DlAaw8gJUHsPIAVh7AygNYeQArD2DlAaw8gJUHsPIAVh7AygNYeQArD2DlAaw8gJUHsPIAVh7AygNYeQArD2DlAaw8gJUHsPIAVh7AygNYeQArD2DlAaw8gJUHsPIAVh7AygNYeQArD2DlAaw8gJUHsPIAVh7AygNYeQArD2DlAaw8gJUHsPIAVh7AygNYeQArD2DlAaw8gJUHsPIAVh7AygNYeQArD2DlAaw8gJUHsPIAVh7AygNYeQArD2DlAaw8gJUHsPIAVh7AygNYeQArD2DlAaw8gJUHsPIAVh7AygNYeQArD2DlAaw8gJUHsPIA1nnP4xfdzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzM7If7AKXEFkl4JVdsAAAAAElFTkSuQmCC";

        mocks.image = function () {
            var image = window.document.createElement("img");
            image.src = mockImageUrl;
            // Work around image being loaded asynchronously and the reporter needing the size immediatelly
            image.height = 100;
            image.width = 100;
            return image;
        };

        mocks.heigherImage = function () {
            var image = window.document.createElement("img");
            image.src = heigherMockImageUrl;
            // Work around image being loaded asynchronously and the reporter needing the size immediatelly
            image.height = 150;
            image.width = 100;
            return image;
        };

        return mocks;
    };

    var cheapPromise = function () {
        var handler;
        return {
            promise: {
                then: function (func) {
                    handler = func;
                }
            },
            resolve: function (value) {
                handler(value);
            }
        };
    };

    testHelper.comparisonP = function (status, testCase, renderErrors, resizable) {
        var mocks = setUpMocks(),
            pageImage;

        testCase = testCase || {};
        testCase.url = testCase.url || "aPage.html";

        if (status === 'error') {
            pageImage = null;
        } else {
            pageImage = mocks.image();
        }

        var defer = cheapPromise();

        var comparison = aComparison(status, testCase, pageImage, renderErrors || [], resizable);

        if (status === 'error') {
            setTimeout(function () {
                defer.resolve(comparison);
            }, 1);
        } else {
            pageImage.onload = function() {
                defer.resolve(comparison);
            };
        }
        return defer.promise;
    };

    testHelper.comparisonWithLargerPageImage = function () {
        var mocks = setUpMocks(),
            pageImage = mocks.heigherImage(),
            defer = cheapPromise();

        pageImage.onload = function() {
            defer.resolve(aComparison('failed', {url: 'aPage.html'}, pageImage, [], false));
        };
        return defer.promise;
    };

    var aComparison = function (status, testCase, pageImage, renderErrors, resizable) {
        var dummyFunc = function () {},
            mocks = setUpMocks(),
            comparison;

        comparison = {
            status: status,
            testCase: testCase,
            renderErrors: renderErrors
        };

        comparison.pageImage = pageImage;

        if (status === 'failed' || status === 'passed') {
            comparison.referenceImage = mocks.image();
        }

        if (resizable !== false) {
            comparison.resizePageImage = dummyFunc;
        }
        comparison.acceptPage = dummyFunc;
        return comparison;
    };

    testHelper.startingComparison = function () {
        return {
            pageUrl: "aPage.html",
            testCase: {
                url: "aPage.html"
            }
        };
    };

    var mockCanvasReadSupport = function () {
        // Overwrite method to pass in PhantomJS
        CanvasRenderingContext2D.prototype.getImageData = function () {};

        HTMLCanvasElement.prototype.toDataURL = function () {};
    };

    var mockDateAutoIncreasing = function () {
        var date = 0;
        window.Date = {
            now: function () {
                date += 123;
                return date;
            }
        };
    };

    testHelper.passingTestSuite = function () {
        return {
            success: true
        };
    };

    testHelper.failingTestSuite = function () {
        return {
            success: false
        };
    };

    testHelper.setUp = function () {
        mockImagediff();
        mockCanvasReadSupport();
        mockDateAutoIncreasing();
    };

    var scrollEventListener;

    var fakeWindow = {
        scrollY: 0,
        addEventListener: function (event, handler) {
            if (event === 'scroll') {
                scrollEventListener = handler;
            }
        }
    };

    testHelper.scrollTo = function (scrollY) {
        fakeWindow.scrollY = scrollY;
        scrollEventListener();
    };

    testHelper.constructNiceReporter = function (hasTaintedCanvasBug) {
        var util = csscriticLib.util(),
            packageVersion = '0.1.42',
            pageNavigationHandlingFallback = csscriticLib.pageNavigationHandlingFallback({href: 'file://somepath'}),
            mockPromise = function (result) {
                return {then: function (callback) {
                    callback(result);
                    return mockPromise(result);
                }};
            },
            mockRasterizeHTML = {
                drawHTML: function () {
                    return mockPromise(!hasTaintedCanvasBug);
                }
            },
            niceReporter = csscriticLib.niceReporter(fakeWindow,
                                                     util,
                                                     {filterFor: function () {}},
                                                     pageNavigationHandlingFallback,
                                                     mockRasterizeHTML,
                                                     packageVersion);

        return niceReporter.NiceReporter();
    };

    return testHelper;
}());
