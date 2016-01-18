describe("Regression testing", function () {
    "use strict";

    var regression, rendererBackend, imagediff;

    var util = csscriticLib.util();

    var pageImage, referenceImage, viewport;

    var setUpRenderedImage = function (image, errors) {
        errors = errors || [];
        rendererBackend.render.and.returnValue(testHelper.successfulPromise({
            image: image,
            errors: errors
        }));
    };

    var setUpImageEqualityToBe = function (equal) {
        imagediff.equal.and.returnValue(equal);
    };

    var testCaseWithReferenceImage = function (testCase) {
        return {
            testCase: testCase,
            referenceImage: referenceImage,
            viewport: viewport
        };
    };

    var testCaseWithMissingReferenceImage = function (testCase) {
        return {
            testCase: testCase
        };
    };

    beforeEach(function () {
        pageImage = jasmine.createSpy('pageImage');
        referenceImage = {
            width: 42,
            height: 7
        };
        viewport = {
            width: 98,
            height: 76
        };

        spyOn(util, 'workAroundTransparencyIssueInFirefox').and.callFake(function (image) {
            return testHelper.successfulPromise(image);
        });

        rendererBackend = jasmine.createSpyObj('renderer', ['render']);
        imagediff = jasmine.createSpyObj('imagediff', ['diff', 'equal']);

        regression = csscriticLib.regression(rendererBackend, util, imagediff);
    });

    describe("comparison", function () {
        beforeEach(function () {
            setUpRenderedImage(pageImage);
            setUpImageEqualityToBe(true);
        });

        it("should compare the rendered page against the reference image", function (done) {
            regression.compare(testCaseWithReferenceImage({
                url: "differentpage.html"
            })).then(function () {
                expect(imagediff.equal).toHaveBeenCalledWith(pageImage, referenceImage, 1);

                done();
            });
        });

        it("should render page using the viewport's size", function (done) {
            regression.compare(testCaseWithReferenceImage({
                url: "samplepage.html"
            })).then(function () {
                expect(rendererBackend.render).toHaveBeenCalledWith(jasmine.objectContaining({
                    url: "samplepage.html",
                    width: 98,
                    height: 76
                }));

                done();
            });
        });

        it("should pass test case parameters to the renderer", function (done) {
            regression.compare(testCaseWithReferenceImage({
                url: 'samplepage.html',
                hover: '.a.selector',
                active: '.another.selector'
            })).then(function () {
                expect(rendererBackend.render).toHaveBeenCalledWith({
                    url: "samplepage.html",
                    hover: '.a.selector',
                    active: '.another.selector',
                    width: 98,
                    height: 76
                });

                done();
            });
        });
    });

    describe("on a passing comparison", function () {
        beforeEach(function () {
            setUpRenderedImage(pageImage);
            setUpImageEqualityToBe(true);
        });

        it("should report the comparison", function (done) {
            regression.compare(testCaseWithReferenceImage({
                url: "differentpage.html"
            })).then(function (comparison) {
                expect(comparison).toEqual({
                    status: "passed",
                    testCase: {
                        url: "differentpage.html"
                    },
                    pageImage: pageImage,
                    referenceImage: referenceImage,
                    renderErrors: [],
                    viewport: viewport
                });

                done();
            });
        });

        it("should report a list of errors during rendering", function (done) {
            setUpRenderedImage(pageImage, ["oneUrl", "anotherUrl"]);

            regression.compare(testCaseWithReferenceImage({
                url: "differentpage.html"
            })).then(function (comparison) {
                expect(comparison).toEqual(jasmine.objectContaining({
                    renderErrors: ["oneUrl", "anotherUrl"],
                }));

                done();
            });
        });
    });

    describe("on a failing comparison", function () {
        beforeEach(function () {
            setUpRenderedImage(pageImage);
            setUpImageEqualityToBe(false);
        });

        it("should report the comparison", function (done) {
            regression.compare(testCaseWithReferenceImage({
                url: "differentpage.html"
            })).then(function (comparison) {
                expect(comparison).toEqual({
                    status: "failed",
                    testCase: {
                        url: "differentpage.html"
                    },
                    pageImage: pageImage,
                    referenceImage: referenceImage,
                    renderErrors: [],
                    viewport: viewport
                });

                done();
            });
        });
    });

    describe("on a reference missing", function () {
        beforeEach(function () {
            setUpRenderedImage(pageImage);
        });

        it("should report the comparison", function (done) {
            regression.compare(testCaseWithMissingReferenceImage({
                url: "differentpage.html"
            })).then(function (comparison) {
                expect(comparison).toEqual({
                    status: "referenceMissing",
                    testCase: {
                        url: "differentpage.html"
                    },
                    pageImage: pageImage,
                    renderErrors: [],
                    viewport: jasmine.any(Object)
                });

                done();
            });
        });

        it("should provide a appropriately sized page rendering", function (done) {
            regression.compare(testCaseWithMissingReferenceImage({
                url: "differentpage.html"
            })).then(function () {
                expect(rendererBackend.render).toHaveBeenCalledWith(jasmine.objectContaining({
                    url: "differentpage.html",
                    width: 800,
                    height: 100
                }));

                done();
            });
        });

        it("should use the specified width", function (done) {
            regression.compare(testCaseWithMissingReferenceImage({
                url: "differentpage.html",
                width: 42
            })).then(function () {
                expect(rendererBackend.render).toHaveBeenCalledWith(jasmine.objectContaining({
                    url: "differentpage.html",
                    width: 42,
                    height: 100
                }));

                done();
            });
        });

        it("should use the specified height", function (done) {
            regression.compare(testCaseWithMissingReferenceImage({
                url: "differentpage.html",
                height: 21
            })).then(function () {
                expect(rendererBackend.render).toHaveBeenCalledWith(jasmine.objectContaining({
                    url: "differentpage.html",
                    width: 800,
                    height: 21
                }));

                done();
            });
        });

        it("should report a list of errors during rendering", function (done) {
            setUpRenderedImage(pageImage, ["oneUrl", "anotherUrl"]);

            regression.compare(testCaseWithMissingReferenceImage({
                url: "differentpage.html"
            })).then(function (comparison) {
                expect(comparison).toEqual(jasmine.objectContaining({
                    renderErrors: ["oneUrl", "anotherUrl"],
                }));

                done();
            });
        });
    });

    describe("on error", function () {
        beforeEach(function () {
            rendererBackend.render.and.returnValue(testHelper.failedPromise());
        });

        it("should report the comparison", function (done) {
            regression.compare(testCaseWithMissingReferenceImage({
                url: "differentpage.html"
            })).then(function (comparison) {
                expect(comparison).toEqual(jasmine.objectContaining({
                    status: "error",
                    testCase: {
                        url: "differentpage.html"
                    }
                }));

                done();
            });
        });

        it("should report the default viewport", function (done) {
            regression.compare(testCaseWithMissingReferenceImage({
                url: "differentpage.html"
            })).then(function (comparison) {
                expect(comparison).toEqual(jasmine.objectContaining({
                    viewport: {
                        width: 800,
                        height: 100
                    }
                }));

                done();
            });
        });

        it("should report an empty render error list", function (done) {
            regression.compare(testCaseWithMissingReferenceImage({
                url: "differentpage.html"
            })).then(function (comparison) {
                expect(comparison).toEqual(jasmine.objectContaining({
                    renderErrors: []
                }));

                done();
            });
        });
    });
});
