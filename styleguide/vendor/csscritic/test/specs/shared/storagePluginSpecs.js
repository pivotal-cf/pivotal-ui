var loadStoragePluginSpecs = function (constructStorage, readStoredReferenceImage, storeMockReferenceImage) {
    "use strict";

    var imgUri = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAKUlEQVQ4jWNYt27df2Lwo0ePiMIMowaOGjgsDSRWIbEWjxo4auCwNBAAenk4PB4atggAAAAASUVORK5CYII=",
        img = null,
        storage;

    var util = csscriticLib.util();

    var setUpImageReturnedForUrl = function (image) {
        util.getImageForUrl.and.returnValue(testHelper.successfulPromise(image));
    };

    var setUpImageForUrlToFail = function (e) {
        util.getImageForUrl.and.returnValue(testHelper.failedPromise(e));
    };

    beforeEach(function (done) {
        spyOn(util, 'getImageForUrl');

        storage = constructStorage(util);

        jasmine.addMatchers(imagediffForJasmine2);

        testHelper.loadImageFromUrl(imgUri, function (image) {
            img = image;

            done();
        });
    });

    it("should store a the rendered page", function (done) {
        var value;

        storage.storeReferenceImage({url: "somePage.html"}, img, {
            width: 47,
            height: 11
        }).then(function () {
            readStoredReferenceImage("somePage.html").then(function (stringValue) {
                expect(stringValue).not.toBeNull();

                value = JSON.parse(stringValue);
                testHelper.loadImageFromUrl(value.referenceImageUri, function (image) {
                    expect(image).toImageDiffEqual(img);

                    done();
                });
            });
        });
    });

    it("should store the viewport's size", function (done) {
        var image = "the image",
            storedValue;

        spyOn(util, 'getDataURIForImage');

        storage.storeReferenceImage({url: "somePage.html"}, image, {
            width: 47,
            height: 11
        }).then(function () {
            readStoredReferenceImage("somePage.html").then(function (stringValue) {
                storedValue = JSON.parse(stringValue);

                expect(storedValue.viewport.width).toEqual(47);
                expect(storedValue.viewport.height).toEqual(11);

                done();
            });
        });
    });

    it("should honour test case parameters when storing", function (done) {
        storage.storeReferenceImage({
                url: 'somePage.html',
                hover: 'aValue',
                active: 'anotherValue'
            },
            img,
            {}
        ).then(function () {
            readStoredReferenceImage("somePage.html,active=anotherValue,hover=aValue").then(function (stringValue) {
                expect(stringValue).not.toBeNull();

                done();
            });
        });
    });

    it("should read in a reference image", function (done) {
        setUpImageReturnedForUrl(img);

        storeMockReferenceImage("somePage.html", JSON.stringify({
            referenceImageUri: imgUri
        })).then(function () {
            storage.readReferenceImage({url: "somePage.html"}).then(function (result) {
                expect(util.getImageForUrl).toHaveBeenCalledWith(imgUri);
                expect(result.image).toBe(img);

                done();
            });
        });
    });

    it("should return the viewport's size with viewport", function (done) {
        setUpImageReturnedForUrl(img);

        storeMockReferenceImage("somePage.html", JSON.stringify({
            referenceImageUri: imgUri,
            viewport: {
                width: 19,
                height: 84
            }
        })).then(function () {
            storage.readReferenceImage({url: "somePage.html"}).then(function (result) {
                expect(result.viewport.width).toEqual(19);
                expect(result.viewport.height).toEqual(84);

                done();
            });
        });
    });

    it("should return the viewport's size and fallback to the image's size", function (done) {
        img.height = 34;
        img.width = 12;
        setUpImageReturnedForUrl(img);

        storeMockReferenceImage("somePage.html", JSON.stringify({
            referenceImageUri: imgUri
        }));

        storage.readReferenceImage({url: "somePage.html"}).then(function (result) {
            expect(result.viewport.width).toEqual(12);
            expect(result.viewport.height).toEqual(34);

            done();
        });
    });

    it("should call error handler if no reference image has been stored", function (done) {
        storage.readReferenceImage({url: "somePage.html"}).then(null, done);
    });

    it("should call error handler if the image is missing", function (done) {
        storeMockReferenceImage("somePage.html", JSON.stringify({}));

        storage.readReferenceImage({url: "somePage.html"}).then(null, done);
    });

    it("should call error handler if read reference image is invalid", function (done) {
        setUpImageForUrlToFail();

        storeMockReferenceImage( "somePage.html", JSON.stringify({
            referenceImageUri: "broken uri"
        }));
        storage.readReferenceImage({url: "somePage.html"}).then(null, done);
    });

    it("should honour test case parameters when reading", function (done) {
        setUpImageReturnedForUrl(img);

        storeMockReferenceImage("somePage.html,active=anotherValue,hover=aValue", JSON.stringify({
            referenceImageUri: imgUri
        }));

        storage.readReferenceImage({
                url: 'somePage.html',
                hover: 'aValue',
                active: 'anotherValue'
            })
            .then(function (img) {
                expect(img).not.toBeNull();

                done();
            });
    });

    it("should find the matching test case for multiple tests of the same url", function (done) {
        setUpImageReturnedForUrl(img);

        storeMockReferenceImage("somePage.html", JSON.stringify({
            referenceImageUri: "some image uri"
        }));
        storeMockReferenceImage("somePage.html,width=42", JSON.stringify({
            referenceImageUri: "some image uri matching the width"
        }));

        storage.readReferenceImage({
            url: 'somePage.html',
            width: 42
        }).then(function () {
            expect(util.getImageForUrl).toHaveBeenCalledWith("some image uri matching the width");

            done();
        });
    });
};
