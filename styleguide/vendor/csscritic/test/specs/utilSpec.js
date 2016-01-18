describe("Utility", function () {
    "use strict";

    var util = csscriticLib.util();

    describe("getImageForUrl", function () {
        it("should load an image", function (done) {
            var imgUrl = testHelper.fixture("green.png");

            util.getImageForUrl(imgUrl).then(function (image) {
                expect(image instanceof HTMLElement).toBeTruthy();
                expect(image.nodeName).toEqual("IMG");
                expect(image.src.substr(-imgUrl.length)).toEqual(imgUrl);

                done();
            });
        });

        it("should handle a missing image", function (done) {
            util.getImageForUrl("does_not_exist.png")
                .then(null, done);
        });
    });

    describe("getDataURIForImage", function () {
        it("should return the data URI for the given image", function (done) {
            var imageDataUri = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2P8DwQACgAD/il4QJ8AAAAASUVORK5CYII=";

            testHelper.loadImageFromUrl(imageDataUri, function (image) {
                var dataUri = util.getDataURIForImage(image);
                expect(dataUri).toContain(imageDataUri.substr(0, 10));

                done();
            });
        });

        it("should correctly encode image independently of rendered width and height", function (done) {
            var imageDataUri = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2P8DwQACgAD/il4QJ8AAAAASUVORK5CYII=";

            testHelper.loadImageFromUrl(imageDataUri, function (image) {
                image.width = 2;
                image.height = 3;
                var dataUri = util.getDataURIForImage(image);

                testHelper.loadImageFromUrl(dataUri, function (reConvertedImage) {
                    expect(reConvertedImage.width).toBe(1);
                    expect(reConvertedImage.height).toBe(1);
                    done();
                });
            });
        });
    });

    describe("ajax", function () {

        it("should load content from a URL", function (done) {
            util.ajax(testHelper.fixture("simple.js")).then(function (content) {
                expect(content).toEqual('var s = "hello";\n');

                done();
            });
        });

        it("should call error callback on fail", function (done) {
            util.ajax(testHelper.fixture("non_existing_url.html")).then(null, function () {
                done();
            });
        });

        it("should not cache repeated calls by default", function () {
            var dateNowSpy = spyOn(window.Date, 'now').and.returnValue(42),
                ajaxRequest = jasmine.createSpyObj("ajaxRequest", ["open", "addEventListener", "overrideMimeType", "send"]);

            spyOn(window, "XMLHttpRequest").and.returnValue(ajaxRequest);

            util.ajax("non_existing_url.html");

            expect(ajaxRequest.open.calls.mostRecent().args[1]).toEqual('non_existing_url.html?_=42');

            dateNowSpy.and.returnValue(43);
            util.ajax("non_existing_url.html");
            expect(ajaxRequest.open.calls.mostRecent().args[1]).toEqual('non_existing_url.html?_=43');
        });

        it("should not break existing query parameters", function () {
            var ajaxRequest = jasmine.createSpyObj("ajaxRequest", ["open", "addEventListener", "overrideMimeType", "send"]);
            spyOn(window.Date, 'now').and.returnValue(42);
            spyOn(window, "XMLHttpRequest").and.returnValue(ajaxRequest);

            util.ajax("non_existing_url?someParam=foo");

            expect(ajaxRequest.open.calls.mostRecent().args[1]).toEqual('non_existing_url?someParam=foo&_=42');
        });
    });

    describe("loadAsBlob", function () {
        var blob2Text = function (blob) {
            var defer = ayepromise.defer(),
                reader = new FileReader();

            reader.onload = function (e) {
                defer.resolve(e.target.result);
            };

            reader.readAsText(blob);

            return defer.promise;
        };

        var blob2Base64 = function (blob) {
            var defer = ayepromise.defer(),
                reader = new FileReader();

            reader.onload = function (e) {
                defer.resolve(btoa(e.target.result));
            };

            reader.readAsBinaryString(blob);

            return defer.promise;
        };

        ifNotInPhantomIt("should load content from a URL", function (done) {
            util.loadAsBlob(testHelper.fixture("simple.js"))
                .then(blob2Text)
                .then(function (blob) {
                    expect(blob).toEqual('var s = "hello";\n');

                    done();
                });
        });

        ifNotInPhantomIt("should load binary data", function (done) {
            util.loadAsBlob(testHelper.fixture("green.png"))
                .then(blob2Base64)
                .then(function (blob) {
                    expect(blob).toEqual("iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAABFElEQVR4nO3OMQ0AAAjAMPybhnsKxrHUQGc2r+iBkB4I6YGQHgjpgZAeCOmBkB4I6YGQHgjpgZAeCOmBkB4I6YGQHgjpgZAeCOmBkB4I6YGQHgjpgZAeCOmBkB4I6YGQHgjpgZAeCOmBkB4I6YGQHgjpgZAeCOmBkB4I6YGQHgjpgZAeCOmBkB4I6YGQHgjpgZAeCOmBkB4I6YGQHgjpgZAeCOmBkB4I6YGQHgjpgZAeCOmBkB4I6YGQHgjpgZAeCOmBkB4I6YGQHgjpgZAeCOmBkB4I6YGQHgjpgZAeCOmBkB4I6YGQHgjpgZAeCOmBkB4I6YGQHgjpgZAeCOmBkB4I6YGQHgjpgZAeCOmBkB4I6YHAAV821mT1w27RAAAAAElFTkSuQmCC");

                    done();
                });
        });

        it("should call error callback on fail", function (done) {
            util.loadAsBlob(testHelper.fixture("non_existing_url.html")).then(null, function () {
                done();
            });
        });

        it("should not cache repeated calls by default", function () {
            var dateNowSpy = spyOn(window.Date, 'now').and.returnValue(42),
                ajaxRequest = jasmine.createSpyObj("ajaxRequest", ["open", "addEventListener", "overrideMimeType", "send"]);

            spyOn(window, "XMLHttpRequest").and.returnValue(ajaxRequest);

            util.loadAsBlob("non_existing_url.html");

            expect(ajaxRequest.open.calls.mostRecent().args[1]).toEqual('non_existing_url.html?_=42');

            dateNowSpy.and.returnValue(43);
            util.loadAsBlob("non_existing_url.html");
            expect(ajaxRequest.open.calls.mostRecent().args[1]).toEqual('non_existing_url.html?_=43');
        });
    });

    describe("loadBlobAsText", function () {
        ifNotInPhantomIt("should return the text", function (done) {
             var blob = new Blob(['<strong>The Blob</strong>'], {type : 'text/html'});

             util.loadBlobAsText(blob)
                .then(function (text) {
                    expect(text).toEqual('<strong>The Blob</strong>');

                    done();
                });
        });
    });

    describe("loadBlobAsDataURI", function () {
        ifNotInPhantomIt("should return the text", function (done) {
             var base64EncodedImage = "R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                blob = new Blob([atob(base64EncodedImage)], {type : 'image/png'});

             util.loadBlobAsDataURI(blob)
                .then(function (dataUri) {
                    // TODO Why is the output base64 different??
                    expect(dataUri).toEqual('data:image/png;base64,R0lGODlhAQABAAAAACHDuQQBCgABACwAAAAAAQABAAACAkwBADs=');

                    done();
                });
        });
    });

    describe("excludeKeys", function () {
        it("should exclude a given key", function () {
            var result = util.excludeKeys({
                theKey: 'theValue',
                anotherKey: 'anotherValue'
            }, 'theKey');

            expect(result).toEqual({
                anotherKey: 'anotherValue'
            });
        });

        it("should exclude multiple keys", function () {
            var result = util.excludeKeys({
                firstKey: 'a value',
                secondKey: 'another value',
                andAnotherKey: 'yet another value'
            }, 'firstKey', 'secondKey');

            expect(result).toEqual({
                andAnotherKey: 'yet another value'
            });
        });

        it("should return an empty map if no key left", function () {
            var result = util.excludeKeys({
                theKey: 'theValue'
            }, 'theKey');

            expect(result).toEqual({});
        });

        it("should return unchanged copy if key is not found", function () {
            var result = util.excludeKeys({
                theKey: 'theValue'
            }, 'anotherKey');

            expect(result).toEqual({
                theKey: 'theValue'
            });
        });
    });

    describe("serializeMap", function () {
        it("should serialize a map with a single value", function () {
            var serialization = util.serializeMap({theKey: 'theValue'});
            expect(serialization).toEqual('theKey=theValue');
        });

        it("should serialize a map with a two values in alphabetic order", function () {
            var serialization = util.serializeMap({
                theKey: 'theValue',
                anotherKey: 'anotherValue'
            });
            expect(serialization).toEqual('anotherKey=anotherValue,theKey=theValue');
        });
    });

    describe("clone", function () {
        it("should create a copy of the given object", function () {
            var input = {anOption: '1', yetAnotherOption: '21'},
                output;

            output = util.clone(input);

            expect(input).toEqual(output);
            expect(input).not.toBe(output);
        });
    });

    describe("hasTestSuitePassed", function () {
        var aComparison = function (status) {
            return {
                status: status
            };
        };

        it("should return true on a passing comparison", function () {
            var passed = util.hasTestSuitePassed([
                aComparison('passed')
            ]);
            expect(passed).toBe(true);
        });

        it("should return false on a failing comparison", function () {
            var passed = util.hasTestSuitePassed([
                aComparison('failed')
            ]);
            expect(passed).toBe(false);
        });

        it("should return false on a comparison with missing reference", function () {
            var passed = util.hasTestSuitePassed([
                aComparison('referenceMissing')
            ]);
            expect(passed).toBe(false);
        });

        it("should return false on a comparison with error", function () {
            var passed = util.hasTestSuitePassed([
                aComparison('error')
            ]);
            expect(passed).toBe(false);
        });

        it("should return false on an empty list of test cases", function () {
            var passed = util.hasTestSuitePassed([]);
            expect(passed).toBe(false);
        });

        it("should return false on a comparison that is not passed", function () {
            var passed = util.hasTestSuitePassed([
                aComparison('passed'),
                aComparison('passed'),
                aComparison('failed')
            ]);
            expect(passed).toBe(false);
        });
    });

    describe("all", function () {
        it("should fulfill once a passed promise is fulfilled", function (done) {
            var defer = ayepromise.defer(),
                resolved = false;

            util.all([defer.promise])
                .then(function () {
                    expect(resolved).toBe(true);
                    done();
                });

            defer.resolve();

            resolved = true;
        });

        it("should fulfill without a promise returned", function (done) {
            util.all([undefined])
                .then(done);
        });

        it("should fulfill once multiple passed promises are fulfilled", function (done) {
            var deferOne = ayepromise.defer(),
                deferTwo = ayepromise.defer(),
                resolvedCount = 0;

            var incResolveCount = function () {
                resolvedCount += 1;
            };

            deferOne.promise.then(incResolveCount);
            deferTwo.promise.then(function () {
                setTimeout(incResolveCount, 1);
            });

            util.all([deferOne.promise, deferTwo.promise])
                .then(function () {
                    expect(resolvedCount).toBe(2);
                    done();
                });

            deferOne.resolve();
            deferTwo.resolve();
        });

        it("should return the promises value", function (done) {
            var defer = ayepromise.defer();

            util.all([defer.promise])
                .then(function (values) {
                    expect(values).toEqual([42]);
                    done();
                });

            defer.resolve(42);
        });

        it("should return a non-promise value", function (done) {
            util.all([21])
                .then(function (values) {
                    expect(values).toEqual([21]);
                    done();
                });
        });

        it("should return the promises' values", function (done) {
            var deferOne = ayepromise.defer(),
                deferTwo = ayepromise.defer();

            util.all([deferOne.promise, deferTwo.promise])
                .then(function (values) {
                    expect(values).toEqual(['12', '34']);
                    done();
                });

            setTimeout(function () {
                deferOne.resolve('12');

            }, 1);
            deferTwo.resolve('34');
        });

        it("should resolve for an empty input list", function (done) {
            util.all([])
                .then(function (values) {
                    expect(values).toEqual([]);

                    done();
                });
        });

        it("should fail if one of the promises fails", function (done) {
            var deferOne = ayepromise.defer(),
                deferTwo = ayepromise.defer(),
                error = new Error("fail");

            util.all([deferOne.promise, deferTwo.promise])
                .fail(function (e) {
                    expect(e).toBe(error);
                    done();
                });

            deferOne.resolve('1');
            deferTwo.reject(error);
        });
    });
});
