describe("PhantomJS renderer", function () {
    "use strict";

    var phantomjsRenderer;

    var oldRequire = window.require,
        webpageModuleMock, pageMock, testPageUrl, theReferenceImageUri;

    var setupPageMock = function () {
        pageMock = jasmine.createSpyObj("page", ["open", "renderBase64"]);

        webpageModuleMock = jasmine.createSpyObj("webpage", ["create"]);
        webpageModuleMock.create.and.returnValue(pageMock);

        window.require = jasmine.createSpy("require").and.callFake(function (moduleName) {
            if (moduleName === "webpage") {
                return webpageModuleMock;
            } else {
                return oldRequire(moduleName);
            }
        });
    };

    var getFileUrl = function (address) {
        var fs = require("fs");

        return address.indexOf("://") === -1 ? "file://" + fs.absolute(address) : address;
    };

    beforeEach(function () {
        phantomjsRenderer = csscriticLib.phantomjsRenderer();

        testPageUrl = testHelper.fixture("pageUnderTest.html");

        theReferenceImageUri = "data:image/png;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAAUoAAACXCAYAAABz/hJAAAADR0lEQVR4nO3UsRECQB" +
            "DEMJdO51DAJ2S3gTTjFty3vtqpj6aCqusxyCing8ooxzofg4yS1/UYZJTTQWWUY52P" +
            "QUbJ63oMMsrpoDLKsc7HIKPkdT0GGeV0UBnlWOdjkFHyuh6DjHI6qIxyrPMxyCh5XY" +
            "9BRjkdVEY51vkYZJS8rscgo5wOKqMc63wMMkpe12OQUU4HlVGOdT4GGSWv6zHIKKeD" +
            "yijHOh+DjJLX9RhklNNBZZRjnY9BRsnregwyyumgMsqxzscgo+R1PQYZ5XRQGeVY52" +
            "OQUfK6HoOMcjqojHKs8zHIKHldj0FGOR1URjnW+RhklLyuxyCjnA4qoxzrfAwySl7X" +
            "Y5BRTgeVUY51PgYZJa/rMcgop4PKKMc6H4OMktf1GGSU00FllGOdj0FGyet6DDLK6a" +
            "AyyrHOxyCj5HU9BhnldFAZ5VjnY5BR8roeg4xyOqiMcqzzMcgoeV2PQUY5HVRGOdb5" +
            "GGSUvK7HIKOcDiqjHOt8DDJKXtdjkFFOB5VRjnU+Bhklr+sxyCing8ooxzofg4yS1/" +
            "UYZJTTQWWUY52PQUbJ63oMMsrpoDLKsc7HIKPkdT0GGeV0UBnlWOdjkFHyuh6DjHI6" +
            "qIxyrPMxyCh5XY9BRjkdVEY51vkYZJS8rscgo5wOKqMc63wMMkpe12OQUU4HlVGOdT" +
            "4GGSWv6zHIKKeDyijHOh+DjJLX9RhklNNBZZRjnY9BRsnregwyyumgMsqxzscgo+R1" +
            "PQYZ5XRQGeVY52OQUfK6HoOMcjqojHKs8zHIKHldj0FGOR1URjnW+RhklLyuxyCjnA" +
            "4qoxzrfAwySl7XY5BRTgeVUY51PgYZJa/rMcgop4PKKMc6H4OMktf1GGSU00FllGOd" +
            "j0FGyet6DDLK6aAyyrHOxyCj5HU9BhnldFAZ5VjnY5BR8roeg4xyOqiMcqzzMcgoeV" +
            "2PQUY5HVRGOdb5GGSUvK7HIKOcDiqjHOt8DDJKXtdjkFFOB5VRjnU+Bhklr+sxyCin" +
            "g8ooxzofg4yS1/UYZJTTAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//gBHqVKyVhKimUAAAAASUVO" +
            "RK5CYII=";

        jasmine.addMatchers(imagediffForJasmine2);
    });

    afterEach(function () {
        window.require = oldRequire;
    });

    it("should draw the url to the given canvas", function (done) {
        phantomjsRenderer.render({
            url: testPageUrl,
            width: 330,
            height: 151
        }).then(function (result) {
            testHelper.loadImageFromUrl(theReferenceImageUri, function (referenceImage) {
                expect(result.image).toImageDiffEqual(referenceImage);
                done();
            });
        });
    });

    it("should call the error handler if a page does not exist", function (done) {
        phantomjsRenderer.render({
            url: "the_url_that_doesnt_exist",
            width: 42,
            height: 7
        }).then(null, done);
    });

    it("should call the error handler if a resulting image is erroneous", function (done) {
        setupPageMock();

        pageMock.renderBase64.and.returnValue("broken_img");
        pageMock.open.and.callFake(function (url, callback) {
            callback("success");
        });

        phantomjsRenderer.render({
            url: testPageUrl,
            width: 330,
            height: 151
        }).then(null, done);
    });

    it("should report errors from rendering", function (done) {
        var pageUrl = testHelper.fixture("brokenPage.html");

        phantomjsRenderer.render({
            url: pageUrl,
            width: 42,
            height: 7
        }).then(function (result) {
            var errors = result.errors;
            expect(errors).not.toBeNull();
            errors.sort();
            expect(errors).toEqual([
                "Unable to load resource " + getFileUrl(testHelper.fixture("background_image_does_not_exist.jpg")),
                "Unable to load resource " + getFileUrl(testHelper.fixture("css_does_not_exist.css")),
                "Unable to load resource " + getFileUrl(testHelper.fixture("image_does_not_exist.png"))
            ]);

            done();
        });
    });

    it("should report errors from rendering with http urls", function (done) {
        var servedUrl = function (path) {
                return localserver + "/" + path;
            },
            pageUrl = servedUrl(testHelper.fixture("brokenPage.html"));

        phantomjsRenderer.render({
            url: pageUrl,
            width: 42,
            height: 7
        }).then(function (result) {
            var errors = result.errors;
            expect(errors).not.toBeNull();
            errors.sort();
            expect(errors).toEqual([
                "Unable to load resource " + servedUrl(testHelper.fixture("background_image_does_not_exist.jpg")),
                "Unable to load resource " + servedUrl(testHelper.fixture("css_does_not_exist.css")),
                "Unable to load resource " + servedUrl(testHelper.fixture("image_does_not_exist.png"))
            ]);

            done();
        });
    });

    it("should report errors from script execution", function (done) {
        var pageUrl = testHelper.fixture("erroneousJs.html");

        phantomjsRenderer.render({
            url: pageUrl,
            width: 42,
            height: 7
        }).then(function (result) {
            console.log(result.errors);
            expect(result.errors).not.toBeNull();
            expect(result.errors).toEqual(["ReferenceError: Can't find variable: undefinedVar"]);

            done();
        });
    });

});
