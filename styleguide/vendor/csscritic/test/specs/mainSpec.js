describe("Main", function () {
    "use strict";

    var csscritic, regression, reporting, storage, selectionFilter;

    var util = csscriticLib.util();

    var setUpComparison = function (comparison) {
        regression.compare.and.returnValue(testHelper.successfulPromise(comparison));
    };

    var setUpReferenceImage = function (image, viewport) {
        storage.readReferenceImage.and.returnValue(testHelper.successfulPromise({
            image: image,
            viewport: viewport
        }));
    };

    var setUpReferenceImageMissing = function () {
        storage.readReferenceImage.and.returnValue(testHelper.failedPromise());
    };

    beforeEach(function () {
        reporting = jasmine.createSpyObj('reporting', ['doReportConfiguredComparison', 'doReportComparison', 'doReportTestSuite']);
        reporting.doReportConfiguredComparison.and.returnValue(testHelper.successfulPromise());
        reporting.doReportComparison.and.returnValue(testHelper.successfulPromise());
        reporting.doReportTestSuite.and.returnValue(testHelper.successfulPromise());

        regression = jasmine.createSpyObj('regression', ['compare']);
        storage = jasmine.createSpyObj('storage', ['readReferenceImage']);
        selectionFilter = jasmine.createSpyObj('selectionFilter', ['isComparisonSelected']);
        selectionFilter.isComparisonSelected.and.returnValue(true);

        csscritic = csscriticLib.main(
            regression,
            reporting,
            util,
            storage,
            selectionFilter);
    });

    describe("adding & executing", function () {
        var comparison;

        beforeEach(function () {
            comparison = "the_comparison";
            setUpComparison(comparison);
            setUpReferenceImage('the image', 'the viewport');
        });

        it("should execute regression test", function (done) {
            setUpComparison("the_comparison");

            csscritic.add("test_case");
            csscritic.execute().then(function () {
                expect(regression.compare).toHaveBeenCalledWith({
                    testCase: {
                        url: "test_case"
                    },
                    referenceImage: 'the image',
                    viewport: 'the viewport'
                });

                done();
            });
        });

        it("should result in success", function (done) {
            spyOn(util, 'hasTestSuitePassed').and.returnValue(true);
            csscritic.add("samplepage.html");

            csscritic.execute().then(function (success) {
                expect(success).toBeTruthy();
                expect(util.hasTestSuitePassed).toHaveBeenCalledWith([comparison]);

                done();
            });
        });

        it("should report overall success in the test suite", function (done) {
            spyOn(util, 'hasTestSuitePassed').and.returnValue(true);

            csscritic.add("samplepage.html");
            csscritic.execute().then(function () {
                expect(reporting.doReportTestSuite).toHaveBeenCalledWith(true);

                done();
            });
        });

        it("should result in failure", function (done) {
            spyOn(util, 'hasTestSuitePassed').and.returnValue(false);
            csscritic.add("samplepage.html");

            csscritic.execute().then(function (success) {
                expect(success).toBeFalsy();
                expect(util.hasTestSuitePassed).toHaveBeenCalledWith([comparison]);

                done();
            });
        });

        it("should report a failure in the test suite", function (done) {
            spyOn(util, 'hasTestSuitePassed').and.returnValue(false);

            csscritic.add("samplepage.html");
            csscritic.execute().then(function () {
                expect(reporting.doReportTestSuite).toHaveBeenCalledWith(false);

                done();
            });
        });

        it("should augment the test case with the component's label for a test short specification form", function (done) {
            setUpComparison("the_comparison");

            csscritic.component('the component');
            csscritic.add("test_case");
            csscritic.execute().then(function () {
                expect(regression.compare).toHaveBeenCalledWith(jasmine.objectContaining({
                    testCase: {
                        url: "test_case",
                        component: 'the component'
                    }
                }));

                done();
            });
        });

        it("should augment the test case with the component's label for a test long specification form", function (done) {
            setUpComparison("the_comparison");

            csscritic.component('the component');
            csscritic.add({
                url: "test_case"
            });
            csscritic.execute().then(function () {
                expect(regression.compare).toHaveBeenCalledWith(jasmine.objectContaining({
                    testCase: {
                        url: "test_case",
                        component: 'the component'
                    }
                }));

                done();
            });
        });

        it("should augment the test case with the latest component's label", function (done) {
            setUpComparison("the_comparison");

            csscritic.component('the component');
            csscritic.add({
                url: "test_case"
            });
            csscritic.component('another component');
            csscritic.add({
                url: "another_test_case"
            });
            csscritic.execute().then(function () {
                expect(regression.compare).toHaveBeenCalledWith(jasmine.objectContaining({
                    testCase: {
                        url: "another_test_case",
                        component: 'another component'
                    }
                }));

                done();
            });
        });

        it("should not replace existing component's label", function (done) {
            setUpComparison("the_comparison");

            csscritic.component('the component');
            csscritic.add({
                url: "test_case",
                component: 'pre-existing component'
            });
            csscritic.execute().then(function () {
                expect(regression.compare).toHaveBeenCalledWith(jasmine.objectContaining({
                    testCase: {
                        url: "test_case",
                        component: 'pre-existing component'
                    }
                }));

                done();
            });
        });
    });

    describe("Reporting", function () {
        var triggerDelayedPromise = function () {
            jasmine.clock().tick(100);
        };

        beforeEach(function () {
            jasmine.clock().install();
        });

        afterEach(function() {
            jasmine.clock().uninstall();
        });

        it("should report a starting comparison with reference image", function () {
            setUpReferenceImage('the image', 'the viewport');

            csscritic.add("samplepage.html");
            csscritic.execute();

            triggerDelayedPromise();
            expect(reporting.doReportConfiguredComparison).toHaveBeenCalledWith({
                testCase: {
                    url: "samplepage.html"
                },
                referenceImage: 'the image',
                viewport: 'the viewport'
            }, true);
        });

        it("should report a starting comparison without reference image", function () {
            setUpReferenceImageMissing();

            csscritic.add("samplepage.html");
            csscritic.execute();

            triggerDelayedPromise();
            expect(reporting.doReportConfiguredComparison).toHaveBeenCalledWith({
                testCase: {
                    url: "samplepage.html"
                }
            }, true);
        });

        it("should wait for reporting on starting comparison to finish", function () {
            var defer = ayepromise.defer(),
                callback = jasmine.createSpy('callback');

            setUpReferenceImageMissing();
            setUpComparison({testCase: {url: "something"}});
            csscritic.add("something");

            reporting.doReportConfiguredComparison.and.returnValue(defer.promise);
            csscritic.execute().then(callback);

            triggerDelayedPromise();
            expect(callback).not.toHaveBeenCalled();

            defer.resolve();

            triggerDelayedPromise();
            expect(callback).toHaveBeenCalled();
        });

        it("should call final report on empty test case list and report as failed", function (done) {
            csscritic.execute().then(function () {
                expect(reporting.doReportTestSuite).toHaveBeenCalledWith(false);

                done();
            });

            triggerDelayedPromise();
        });

        it("should wait for reporting on comparison to finish", function () {
            var defer = ayepromise.defer(),
                callback = jasmine.createSpy('callback');

            setUpReferenceImage('the image', 'the viewport');
            setUpComparison({
                status: "success"
            });

            reporting.doReportComparison.and.returnValue(defer.promise);
            csscritic.add('a_test');
            csscritic.execute().then(callback);

            triggerDelayedPromise();
            expect(callback).not.toHaveBeenCalled();

            defer.resolve();

            triggerDelayedPromise();
            expect(callback).toHaveBeenCalled();
        });

        it("should wait for reporting on final report to finish", function () {
            var defer = ayepromise.defer(),
                callback = jasmine.createSpy('callback');

            reporting.doReportTestSuite.and.returnValue(defer.promise);
            csscritic.execute().then(callback);

            triggerDelayedPromise();
            expect(callback).not.toHaveBeenCalled();

            defer.resolve();

            triggerDelayedPromise();
            expect(callback).toHaveBeenCalled();
        });

    });

    describe("Filtering", function () {
        beforeEach(function () {
            var comparison = "the_comparison";
            setUpComparison(comparison);
        });

        it("should exclude a filtered comparison", function (done) {
            setUpReferenceImageMissing();
            selectionFilter.isComparisonSelected.and.returnValue(false);

            csscritic.add({url: "somePage"});
            csscritic.execute().then(function () {
                expect(regression.compare).not.toHaveBeenCalled();

                done();
            });
        });

        it("should include a selected comparison", function (done) {
            setUpReferenceImageMissing();
            selectionFilter.isComparisonSelected.and.returnValue(true);

            csscritic.add({url: "somePage"});
            csscritic.execute().then(function () {
                expect(regression.compare).toHaveBeenCalled();

                done();
            });
        });

        it("should report a selected comparison", function (done) {
            var comparison = {url: "somePage"};
            setUpReferenceImageMissing();
            selectionFilter.isComparisonSelected.and.returnValue(true);

            csscritic.add(comparison);
            csscritic.execute().then(function () {
                expect(reporting.doReportConfiguredComparison)
                    .toHaveBeenCalledWith({testCase: comparison}, true);

                done();
            });
        });

        it("should report a deselected comparison", function (done) {
            var comparison = {url: "somePage"};
            setUpReferenceImageMissing();
            selectionFilter.isComparisonSelected.and.returnValue(false);

            csscritic.add(comparison);
            csscritic.execute().then(function () {
                expect(reporting.doReportConfiguredComparison)
                    .toHaveBeenCalledWith({testCase: comparison}, false);

                done();
            });
        });

        it("should report a deselected comparison as compared", function (done) {
            setUpReferenceImage('theimage', 'theviewport');
            selectionFilter.isComparisonSelected.and.returnValue(true);

            csscritic.add({url: "somePage"});
            csscritic.execute().then(function () {
                expect(reporting.doReportComparison).toHaveBeenCalled();

                done();
            });
        });

        it("should not report a deselected comparison as compared", function (done) {
            setUpReferenceImage('theimage', 'theviewport');
            selectionFilter.isComparisonSelected.and.returnValue(false);

            csscritic.add({url: "somePage"});
            csscritic.execute().then(function () {
                expect(reporting.doReportComparison).not.toHaveBeenCalled();

                done();
            });
        });

        it("should make filtering optional", function (done) {
            var main = csscriticLib.main(
                regression,
                reporting,
                util,
                storage);

            setUpReferenceImage('theimage', 'theviewport');

            main.add({url: "somePage"});
            main.execute().then(function () {
                expect(reporting.doReportComparison).toHaveBeenCalled();
                done();
            });
        });
    });
});
