describe("Browser renderer", function () {
    "use strict";

    var util = csscriticLib.util(),
        browserRenderer;

    beforeEach(function () {
        var jobQueue = jasmine.createSpy('jobQueue').and.returnValue({
            execute: function (func) {
                return func();
            }
        });

        browserRenderer = csscriticLib.browserRenderer(util, jobQueue, rasterizeHTML);
    });

    ifNotInPhantomIt("should draw an image directly", function (done) {
        spyOn(rasterizeHTML, "drawHTML");

        browserRenderer.render({
            url: testHelper.fixture('green.png'),
            width: 42,
            height: 7
        }).then(function (result) {
            expect(result.image.src).toContain('iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAAB');

            expect(rasterizeHTML.drawHTML).not.toHaveBeenCalled();

            done();
        });
    });

    it("should call the error handler if a page does not exist", function (done) {
        browserRenderer.render({
            url: "url_that_doesnt_exist",
            width: 42,
            height: 7
        }).then(null, done);
    });

    describe("HTML page rendering", function () {
        var setUpRasterizeHtmlToBeSuccessful = function () {
            spyOn(rasterizeHTML, "drawHTML").and.returnValue(testHelper.successfulPromise({
                image: "the image",
                errors: []
            }));
        };

        var setUpRasterizeHtmlToFail = function () {
            spyOn(rasterizeHTML, "drawHTML").and.returnValue(testHelper.failedPromise());
        };

        ifNotInPhantomIt("should draw the html page if url is not an image, disable caching and execute JavaScript", function (done) {
            var theUrl = "the url",
                theHtml = "some html";

            setUpRasterizeHtmlToBeSuccessful();

            spyOn(util, 'loadAsBlob').and.callFake(function () {
                return testHelper.successfulPromise(new Blob([theHtml], {type: 'text/html'}));
            });

            browserRenderer.render({
                url: theUrl,
                width: 42,
                height: 7
            }).then(function (result) {
                expect(result.image).toBe("the image");
                expect(rasterizeHTML.drawHTML).toHaveBeenCalledWith(theHtml, {
                    cache: 'repeated',
                    cacheBucket: jasmine.any(Object),
                    width: 42,
                    height: 7,
                    executeJs: true,
                    executeJsTimeout: 50,
                    baseUrl: theUrl
                });

                done();
            });
        });

        ifNotInPhantomIt("should call the error handler if a page could not be rendered", function (done) {
            setUpRasterizeHtmlToFail();

            browserRenderer.render({
                url: testHelper.fixture("pageUnderTest.html"),
                width: 42,
                height: 7
            }).then(null, done);
        });

        ifNotInPhantomIt("should report errors from rendering", function (done) {
            browserRenderer.render({
                url: testHelper.fixture("brokenPage.html"),
                width: 42,
                height: 7
            }).then(function (result) {
                expect(result.errors).not.toBeNull();
                expect(result.errors.length).toBe(3);
                result.errors.sort();
                expect(result.errors).toEqual([
                    "Unable to load background-image " + testHelper.fixture("background_image_does_not_exist.jpg"),
                    "Unable to load image " + testHelper.fixture("image_does_not_exist.png"),
                    "Unable to load stylesheet " + testHelper.fixture("css_does_not_exist.css")
                ]);

                done();
            });
        });

        ifNotInPhantomIt("should render with hover effect", function (done) {
            setUpRasterizeHtmlToBeSuccessful();

            browserRenderer.render({
                url: testHelper.fixture("pageUnderTest.html"),
                width: 42,
                height: 7,
                hover: ".someSelector"
            }).then(function () {
                expect(rasterizeHTML.drawHTML).toHaveBeenCalledWith(
                    jasmine.any(String),
                    jasmine.objectContaining({hover: ".someSelector"})
                );
                done();
            });
        });

        ifNotInPhantomIt("should render with active effect", function (done) {
            setUpRasterizeHtmlToBeSuccessful();

            browserRenderer.render({
                url: testHelper.fixture("pageUnderTest.html"),
                width: 42,
                height: 7,
                active: ".someSelector"
            }).then(function () {
                expect(rasterizeHTML.drawHTML).toHaveBeenCalledWith(
                    jasmine.any(String),
                    jasmine.objectContaining({active: ".someSelector"})
                );
                done();
            });
        });

        ifNotInPhantomIt("should properly render Unicode", function (done) {
            setUpRasterizeHtmlToBeSuccessful();

            browserRenderer.render({
                url: testHelper.fixture('unicode.html')
            }).then(function () {
                expect(rasterizeHTML.drawHTML).toHaveBeenCalledWith("<html><body>€</body></html>\n", jasmine.any(Object));

                done();
            });
        });
    });

});
