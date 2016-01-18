describe("Reporting", function () {
    "use strict";

    var rendererBackend, storageBackend, reporting;

    var util = csscriticLib.util();

    var pageImage, referenceImage, viewport;

    var setUpRenderedImage = function (image, errors) {
        errors = errors || [];
        rendererBackend.render.and.returnValue(testHelper.successfulPromise({
            image: image,
            errors: errors
        }));
    };

    var delayCall = function (func) {
        // 10 msecs is not long enough to fail some tests
        setTimeout(func, 100);
    };

    beforeEach(function () {
        pageImage = "the_html_image";
        referenceImage = "the_reference_image";
        viewport = {
            width: 42,
            height: 21
        };

        rendererBackend = jasmine.createSpyObj('renderer', ['render']);
        storageBackend = jasmine.createSpyObj('storageBackend', ['readReferenceImage', 'storeReferenceImage']);

        reporting = csscriticLib.reporting(rendererBackend, storageBackend, util);
    });

    describe("reportConfiguredComparison", function () {
        var reporter;

        beforeEach(function () {
            reporter = jasmine.createSpyObj("Reporter", [
                "reportComparisonStarting",
                "reportSelectedComparison",
                "reportDeselectedComparison"
            ]);
            reporting.addReporter(reporter);
        });

        it("should report a starting comparison", function () {
            reporting.doReportConfiguredComparison({
                testCase: {
                    url: "samplepage.html"
                }
            }, true);

            expect(reporter.reportSelectedComparison).toHaveBeenCalledWith({
                testCase: {
                    url: "samplepage.html"
                }
            });
        });

        it("should make method optional", function () {
            var startingComparison = "blah";

            var reporting = csscriticLib.reporting(rendererBackend, storageBackend, util);
            reporting.addReporter({});

            reporting.doReportConfiguredComparison(startingComparison, true);
        });

        it("should only fulfill once the reporter returned", function (done) {
            var startingComparison = "blah",
                defer = testHelper.deferFake(),
                reporterHasStarted = false,
                reporterHasFinished = false;

            reporter.reportSelectedComparison.and.callFake(function () {
                delayCall(function () {
                    expect(reporterHasStarted).toBe(true);

                    defer.resolve();
                    reporterHasFinished = true;
                });

                reporterHasStarted = true;
                return defer.promise;
            });

            reporting.doReportConfiguredComparison(startingComparison, true).then(function () {
                expect(reporterHasFinished).toBe(true);

                done();
            });
        });

        it("should report a deselected comparison", function () {
            reporting.doReportConfiguredComparison({
                testCase: {
                    url: "samplepage.html"
                }
            }, false);

            expect(reporter.reportDeselectedComparison).toHaveBeenCalledWith({
                testCase: {
                    url: "samplepage.html"
                }
            });
        });
    });

    describe("reportComparison", function () {
        var reporter, comparison;

        beforeEach(function () {
            reporter = jasmine.createSpyObj("Reporter", ["reportComparison"]);
            reporting.addReporter(reporter);

            comparison = {
                viewport: viewport
            };
        });

        it("should make method optional", function () {
            var emptyReporter = {};

            reporting.doReportComparison([emptyReporter], comparison);
        });

        it("should only fulfill once the reporter returned", function (done) {
            var defer = testHelper.deferFake(),
                reporterHasStarted = false,
                reporterHasFinished = false;

            reporter.reportComparison.and.callFake(function () {
                delayCall(function () {
                    expect(reporterHasStarted).toBe(true);

                    defer.resolve();
                    reporterHasFinished = true;
                });

                reporterHasStarted = true;
                return defer.promise;
            });

            reporting.doReportComparison(comparison).then(function () {
                expect(reporterHasFinished).toBe(true);

                done();
            });
        });

        it("should report a successful comparison", function () {
            reporting.doReportComparison({
                status: "passed",
                testCase: {
                    url: "differentpage.html"
                },
                pageImage: pageImage,
                referenceImage: referenceImage,
                renderErrors: [],
                viewport: viewport
            });

            expect(reporter.reportComparison).toHaveBeenCalledWith({
                status: "passed",
                testCase: {
                    url: "differentpage.html"
                },
                pageImage: pageImage,
                resizePageImage: jasmine.any(Function),
                acceptPage: jasmine.any(Function),
                referenceImage: referenceImage,
                viewport: viewport,
                renderErrors: []
            });
        });

        it("should report a failing comparison", function () {
            reporting.doReportComparison({
                status: "failed",
                testCase: {
                    url: "differentpage.html"
                },
                pageImage: pageImage,
                referenceImage: referenceImage,
                renderErrors: [],
                viewport: viewport
            });

            expect(reporter.reportComparison).toHaveBeenCalledWith(jasmine.objectContaining({
                status: "failed"
            }));
        });

        it("should report a missing reference image", function () {
            reporting.doReportComparison({
                status: "referenceMissing",
                testCase: {
                    url: "differentpage.html"
                },
                pageImage: pageImage,
                referenceImage: undefined,
                renderErrors: [],
                viewport: viewport
            });

            expect(reporter.reportComparison).toHaveBeenCalledWith({
                status: "referenceMissing",
                testCase: {
                    url: "differentpage.html"
                },
                pageImage: pageImage,
                referenceImage: undefined,
                viewport: viewport,
                resizePageImage: jasmine.any(Function),
                acceptPage: jasmine.any(Function),
                renderErrors: []
            });
        });

        it("should report an error if the page does not exist", function () {
            reporting.doReportComparison({
                status: "error",
                testCase: {
                    url: "differentpage.html"
                }
            });

            expect(reporter.reportComparison).toHaveBeenCalledWith({
                status: "error",
                testCase: {
                    url: "differentpage.html"
                }
            });
        });

        it("should provide a method to repaint the HTML given width and height", function (done) {
            var newpageImage = "newpageImage",
                result;

            reporting.doReportComparison({
                status: "referenceMissing",
                testCase: {
                    url: "differentpage.html"
                },
                pageImage: pageImage,
                referenceImage: undefined,
                renderErrors: [],
                viewport: viewport
            });

            setUpRenderedImage(newpageImage);

            result = reporter.reportComparison.calls.mostRecent().args[0];

            result.resizePageImage(16, 34).then(function () {
                expect(rendererBackend.render).toHaveBeenCalledWith(jasmine.objectContaining({
                    url: "differentpage.html",
                    width: 16,
                    height: 34
                }));
                expect(result.pageImage).toBe(newpageImage);

                done();
            });
        });

        it("should pass the test case's additional parameters on resize", function (done) {
            setUpRenderedImage(pageImage);

            reporting.doReportComparison({
                status: "referenceMissing",
                testCase: {
                    url: "differentpage.html",
                    hover: '.selector'
                },
                pageImage: pageImage,
                referenceImage: undefined,
                renderErrors: [],
                viewport: viewport
            });

            reporter.reportComparison.calls.mostRecent().args[0].resizePageImage(16, 34).then(function () {
                expect(rendererBackend.render).toHaveBeenCalledWith(
                    jasmine.objectContaining({hover: '.selector'})
                );

                done();
            });
        });

        it("should not pass resizing handle on a fixed height test case", function () {
            reporting.doReportComparison({
                status: "referenceMissing",
                testCase: {
                    url: "differentpage.html",
                    height: 21
                },
                pageImage: pageImage,
                referenceImage: undefined,
                renderErrors: [],
                viewport: viewport
            });

            expect(reporter.reportComparison).not.toHaveBeenCalledWith(jasmine.objectContaining({
                resizePageImage: jasmine.any(Function)
            }));
        });

        it("should not pass resizing handle on a fixed width test case", function () {
            reporting.doReportComparison({
                status: "referenceMissing",
                testCase: {
                    url: "differentpage.html",
                    width: 42
                },
                pageImage: pageImage,
                referenceImage: undefined,
                renderErrors: [],
                viewport: viewport
            });

            expect(reporter.reportComparison).not.toHaveBeenCalledWith(jasmine.objectContaining({
                resizePageImage: jasmine.any(Function)
            }));
        });

        it("should provide a method to accept the rendered page and store as new reference", function () {
            reporting.doReportComparison({
                status: "referenceMissing",
                testCase: {
                    url: "differentpage.html"
                },
                pageImage: pageImage,
                referenceImage: undefined,
                renderErrors: [],
                viewport: viewport
            });

            reporter.reportComparison.calls.mostRecent().args[0].acceptPage();

            expect(storageBackend.storeReferenceImage).toHaveBeenCalledWith({url: "differentpage.html"}, pageImage, jasmine.any(Object));
        });

        it("should store the viewport's size on accept", function () {
            reporting.doReportComparison({
                status: "referenceMissing",
                testCase: {
                    url: "differentpage.html"
                },
                pageImage: pageImage,
                referenceImage: undefined,
                renderErrors: [],
                viewport: viewport
            });

            reporter.reportComparison.calls.mostRecent().args[0].acceptPage();

            expect(storageBackend.storeReferenceImage).toHaveBeenCalledWith(jasmine.any(Object), pageImage, viewport);
        });

        it("should pass the test case's additional parameters on accept", function () {
            reporting.doReportComparison({
                status: "referenceMissing",
                testCase: {
                    url: "differentpage.html",
                    hover: '.selector'
                },
                pageImage: pageImage,
                referenceImage: undefined,
                renderErrors: [],
                viewport: viewport
            });

            reporter.reportComparison.calls.mostRecent().args[0].acceptPage();

            expect(storageBackend.storeReferenceImage).toHaveBeenCalledWith(
                jasmine.objectContaining({hover: '.selector'}),
                pageImage,
                jasmine.any(Object)
            );
        });

        it("should store the viewport's updated size on accept", function (done) {
            setUpRenderedImage(pageImage);

            reporting.doReportComparison({
                status: "referenceMissing",
                testCase: {
                    url: "differentpage.html",
                    hover: '.selector'
                },
                pageImage: pageImage,
                referenceImage: undefined,
                renderErrors: [],
                viewport: viewport
            });

            var result = reporter.reportComparison.calls.mostRecent().args[0];

            result.resizePageImage(16, 34).then(function () {
                result.acceptPage();

                expect(storageBackend.storeReferenceImage).toHaveBeenCalledWith(jasmine.any(Object), pageImage, {
                    width: 16,
                    height: 34
                });

                done();
            });
        });

        it("should report errors during rendering", function () {
            reporting.doReportComparison({
                status: "referenceMissing",
                testCase: {
                    url: "differentpage.html",
                    hover: '.selector'
                },
                pageImage: pageImage,
                referenceImage: undefined,
                renderErrors: ["oneUrl", "anotherUrl"],
                viewport: viewport
            });

            expect(reporter.reportComparison).toHaveBeenCalledWith(jasmine.objectContaining({
                renderErrors: ["oneUrl", "anotherUrl"],
            }));
        });
    });

    describe("reportTestSuite", function () {
        var reporter;

        beforeEach(function () {
            reporter = jasmine.createSpyObj("Reporter", ["reportTestSuite"]);
            reporting.addReporter(reporter);
        });

        it("should call final report with success", function () {
            reporting.doReportTestSuite(true);

            expect(reporter.reportTestSuite).toHaveBeenCalledWith({
                success: true
            });
        });

        it("should call final report with failure", function () {
            reporting.doReportTestSuite(false);

            expect(reporter.reportTestSuite).toHaveBeenCalledWith({
                success: false
            });
        });

        it("should make method optional", function () {
            var emptyReporter = {};
            reporting.doReportTestSuite([emptyReporter], true);
        });

        it("should only fulfill once the reporter returned", function (done) {
            var defer = testHelper.deferFake(),
                reporterHasStarted = false,
                reporterHasFinished = false;

            reporter.reportTestSuite.and.callFake(function () {
                delayCall(function () {
                    expect(reporterHasStarted).toBe(true);

                    defer.resolve();
                    reporterHasFinished = true;
                });

                reporterHasStarted = true;
                return defer.promise;
            });

            reporting.doReportTestSuite(true).then(function () {
                expect(reporterHasFinished).toBe(true);

                done();
            });
        });

    });
});
