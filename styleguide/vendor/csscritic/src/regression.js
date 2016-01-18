csscriticLib.regression = function (renderer, util, imagediff) {
    "use strict";

    var module = {};

    var toleranceToWorkAroundFirefoxRenderingAFewPixelsIndeterministicallyOnLinux = 1;

    var workAroundFirefoxResourcesSporadicallyMissing = function (htmlImage, referenceImage) {
        if (referenceImage) {
            // This does nothing meaningful for us, but seems to trigger Firefox to load any missing resources.
            imagediff.diff(htmlImage, referenceImage);
        }
    };

    var workAroundBrowserIssues = function (pageImage, referenceImage) {
        workAroundFirefoxResourcesSporadicallyMissing(pageImage, referenceImage);

        return util.workAroundTransparencyIssueInFirefox(pageImage);
    };

    var compareRenderingAndReference = function (pageImage, referenceImage) {
        var isEqual;

        return workAroundBrowserIssues(pageImage, referenceImage).then(function (adaptedHtmlImage) {
            if (referenceImage) {
                isEqual = imagediff.equal(
                    adaptedHtmlImage,
                    referenceImage,
                    toleranceToWorkAroundFirefoxRenderingAFewPixelsIndeterministicallyOnLinux
                );
                return isEqual ? "passed" : "failed";
            } else {
                return "referenceMissing";
            }
        });
    };

    var comparisonResult = function (textualStatus, testCase, viewport, renderErrors, pageImage, referenceImage) {
        var result = {
            status: textualStatus,
            testCase: testCase,
            viewport: util.clone(viewport),
            renderErrors: renderErrors
        };

        if (pageImage) {
            result.pageImage = pageImage;
        }
        if (referenceImage) {
            result.referenceImage = referenceImage;
        }
        return result;
    };

    var loadPageAndCompare = function (testCase, viewport, referenceImage) {
        return renderer.render({
            url: testCase.url,
            hover: testCase.hover,
            active: testCase.active,
            width: viewport.width,
            height: viewport.height
        }).then(function (renderResult) {
            return compareRenderingAndReference(renderResult.image, referenceImage).then(function (textualStatus) {
                return comparisonResult(textualStatus,
                                        testCase,
                                        viewport,
                                        renderResult.errors,
                                        renderResult.image,
                                        referenceImage);
            });
        }, function () {
            return comparisonResult("error",
                                    testCase,
                                    viewport,
                                    []);
        });
    };

    var viewportFallback = function (testCase) {
        var fallbackWidth = 800,
            fallbackHeight = 100;
        return {
            width: testCase.width || fallbackWidth,
            height: testCase.height || fallbackHeight
        };
    };

    module.compare = function (startingComparison) {
        var viewport = startingComparison.viewport;

        if (startingComparison.referenceImage === undefined) {
            viewport = viewportFallback(startingComparison.testCase);
        }

        return loadPageAndCompare(startingComparison.testCase, viewport, startingComparison.referenceImage);
    };

    return module;
};
