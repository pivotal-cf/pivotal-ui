csscriticLib.signOffReporter = function (signOffReporterUtil) {
    "use strict";

    var module = {};

    var calculateFingerprintForPage = function (pageUrl) {
        return signOffReporterUtil.loadFullDocument(pageUrl).then(function (content) {
            var actualFingerprint = signOffReporterUtil.calculateFingerprint(content);

            return actualFingerprint;
        }, function () {
            throw new Error("Error loading document for sign-off: " + pageUrl + ". For accessing URLs over HTTP you need CORS enabled on that server.");
        });
    };

    var findPage = function (pageUrl, signedOffPages) {
        var signedOffPage = null;

        signedOffPages.forEach(function (entry) {
            if (entry.pageUrl === pageUrl) {
                signedOffPage = entry;
            }
        });

        return signedOffPage;
    };

    var someComparisonIsNotRight = false,
        shouldBeComparisons = [];

    var acceptPageIfSignedOff = function (comparison, signedOffPageEntry) {
        return calculateFingerprintForPage(comparison.testCase.url).then(function (actualFingerprint) {
            shouldBeComparisons.push({
                pageUrl: comparison.testCase.url,
                fingerprint: actualFingerprint
            });

            if (signedOffPageEntry) {
                if (actualFingerprint === signedOffPageEntry.fingerprint) {
                    console.log("Generating reference image for " + comparison.testCase.url);
                    comparison.acceptPage();
                } else {
                    console.log("Fingerprint does not match for " + comparison.testCase.url + ", current fingerprint " + actualFingerprint);
                    someComparisonIsNotRight = true;
                }
            } else {
                console.log("No sign-off for " + comparison.testCase.url + ", current fingerprint " + actualFingerprint);
                someComparisonIsNotRight = true;
            }
        });
    };

    var acceptOpenTest = function (comparison, signedOffPages) {
        var signedOffPageEntry = findPage(comparison.testCase.url, signedOffPages);
        if (comparison.status === "failed" || comparison.status === "referenceMissing") {
            return acceptPageIfSignedOff(comparison, signedOffPageEntry);
        } else {
            shouldBeComparisons.push({
                pageUrl: comparison.testCase.url,
                fingerprint: signedOffPageEntry.fingerprint
            });
        }
    };

    module.SignOffReporter = function (signedOffPages) {
        return {
            reportComparison: function (comparison) {
                if (! Array.isArray(signedOffPages)) {
                    return signOffReporterUtil.loadFingerprintJson(signedOffPages).then(function (json) {
                        return acceptOpenTest(comparison, json);
                    });
                } else {
                    return acceptOpenTest(comparison, signedOffPages);
                }
            },
            reportTestSuite: function () {
                if (someComparisonIsNotRight) {
                    console.log("You might want to use this 'signedOff.json':");
                    console.log(JSON.stringify(shouldBeComparisons));
                }
            }
        };
    };

    return module;
};
