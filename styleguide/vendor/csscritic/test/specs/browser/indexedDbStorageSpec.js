describe("IndexedDB storage", function () {
    "use strict";

    var util = csscriticLib.util();

    var constructStorage = function (util) {
        return csscriticLib.indexeddbstorage(util);
    };

    afterEach(function (done) {
        var request = indexedDB.deleteDatabase('csscritic');
        request.onsuccess = done;
    });

    var getDb = function () {
        var defer = ayepromise.defer();

        var request = indexedDB.open('csscritic', 1);
        request.onsuccess = function (event) {
            var db = event.target.result;
            defer.resolve(db);
        };
        return defer.promise;
    };

    var readStoredReferenceImage = function (key) {
        var defer = ayepromise.defer();

        getDb().then(function (db) {
            var request = db.transaction(['references'])
                .objectStore('references')
                .get(key);

            request.onsuccess = function () {
                db.close();
                // TODO stop using JSON string as interface in test
                defer.resolve(JSON.stringify({
                    referenceImageUri: request.result.reference.imageUri,
                    viewport: request.result.reference.viewport
                }));
            };
        });
        return defer.promise;
    };

    var storeReferenceImage = function (key, stringData) {
        var defer = ayepromise.defer();
        // TODO move away from JSON encoded test input, doesn't match internals of this module
        var data = JSON.parse(stringData),
            dataObj = {};
        if (data.referenceImageUri) {
            dataObj.imageUri = data.referenceImageUri;
        }
        if (data.viewport) {
            dataObj.viewport = data.viewport;
        }
        getDb().then(function (db) {
            var request = db.transaction(['references'], 'readwrite')
                .objectStore('references')
                .add({testCase: key, reference: dataObj});

            request.onsuccess = function () {
                db.close();
                defer.resolve();
            };
        });
        return defer.promise;
    };

    describe("with existing database", function () {
        beforeEach(function (done) {
            var request = indexedDB.open('csscritic', 1);
            request.onsuccess = function (event) {
                var db = event.target.result;
                db.close();
                done();
            };
            request.onupgradeneeded = function(event) {
                var db = event.target.result;
                db.createObjectStore('references', { keyPath: "testCase" });
            };
        });

        if (!isPhantom) {
            loadStoragePluginSpecs(constructStorage, readStoredReferenceImage, storeReferenceImage);
        }
    });

    ifNotInPhantomIt("should initally create a database", function (done) {
        var storage = constructStorage(util);
        spyOn(util, 'getDataURIForImage').and.returnValue('uri');
        storage.storeReferenceImage({url: 'somePage.html'}, 'the_image', 47, 11).then(function () {
            readStoredReferenceImage('somePage.html').then(function (result) {
                expect(result).not.toBe(undefined);
                done();
            });
        });
    });
});
