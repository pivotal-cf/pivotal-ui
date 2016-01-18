describe("HtmlFileReporter", function () {
    "use strict";

    var reporter,
        htmlImage, referenceImage, differenceImageCanvas,
        reporterOutputPath;

    var util = csscriticLib.util();

    beforeEach(function (done) {

        htmlImage = null;
        referenceImage = null;
        differenceImageCanvas = window.document.createElement("canvas");

        jasmine.addMatchers(imagediffForJasmine2);

        testHelper.loadImageFromUrl(testHelper.getFileUrl(testHelper.fixture("green.png")), function (image) {
            htmlImage = image;

            testHelper.loadImageFromUrl(testHelper.getFileUrl(testHelper.fixture("greenWithTransparency.png")), function (image) {
                referenceImage = image;

                done();
            });
        });

        reporterOutputPath = testHelper.createTempPath();

        var htmlFileReporter = csscriticLib.htmlFileReporter(util);
        reporter = htmlFileReporter.HtmlFileReporter(reporterOutputPath);
    });

    describe("on status passed", function () {
        var testResult;

        beforeEach(function () {
            testResult = {
                status: "passed",
                testCase: {
                    url: "page_url"
                },
                pageImage: htmlImage,
                referenceImage: referenceImage
            };
        });

        it("should save the rendered page", function (done) {
            reporter.reportComparison(testResult).then(function () {
                testHelper.loadImageFromUrl(testHelper.getFileUrl(reporterOutputPath + "page_url.png"), function (image) {
                    expect(image).toImageDiffEqual(htmlImage);

                    done();
                });

            });
        });
    });

    describe("on status failed", function () {
        var testResult,
            diffImage = null;

        beforeEach(function (done) {
            testResult = {
                status: "failed",
                testCase: {
                    url: "page_url"
                },
                pageImage: htmlImage,
                referenceImage: referenceImage
            };

            testHelper.loadImageFromUrl(testHelper.getFileUrl(testHelper.fixture("greenWithTransparencyDiff.png")), function (image) {
                diffImage = image;

                done();
            });
        });

        it("should save the reference image", function (done) {
            reporter.reportComparison(testResult).then(function () {
                testHelper.loadImageFromUrl(testHelper.getFileUrl(reporterOutputPath + "page_url.reference.png"), function (image) {
                    expect(image).toImageDiffEqual(referenceImage);

                    done();
                });
            });
        });

        it("should save a difference image", function (done) {
            reporter.reportComparison(testResult).then(function () {
                testHelper.loadImageFromUrl(testHelper.getFileUrl(reporterOutputPath + "page_url.diff.png"), function (image) {
                    expect(image).toImageDiffEqual(diffImage);

                    done();
                });
            });
        });
    });

    describe("on status error", function () {
        var testResult;

        beforeEach(function () {
            testResult = {
                status: "error",
                testCase: {
                    url: "erroneous_page_url"
                },
                pageImage: null
            };
        });

        it("should not save a page image", function (done) {
            reporter.reportComparison(testResult).then(function () {
                testHelper.testImageUrl(testHelper.getFileUrl(reporterOutputPath + "erroneous_page_url.reference.png"), function (result) {
                    expect(result).toBeFalsy();

                    done();
                });
            });
        });
    });

    describe("'s page output", function () {
        it("should save a HTML result page", function () {
            reporter.reportTestSuite({
                success: true
            });

            var content = require("fs").read(reporterOutputPath + "index.html");

            expect(content).toMatch(/Passed/);
        });

        it("should mark a failed run", function () {
            reporter.reportTestSuite({
                success: false
            });

            var content = require("fs").read(reporterOutputPath + "index.html");

            expect(content).toMatch(/Failed/);
        });
    });

});
