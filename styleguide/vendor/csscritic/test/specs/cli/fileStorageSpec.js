describe("Phantom storage support for reference images", function () {
    "use strict";

    var fs = require("fs"),
        tempPath;

    var util = csscriticLib.util();

    var constructStorage = function (utilDependency) {
        var filestorage = csscriticLib.filestorage(utilDependency);
        filestorage.options.basePath = tempPath;
        return filestorage;
    };

    beforeEach(function () {
        tempPath = testHelper.createTempPath();
    });

    var readStoredReferenceImage = function (key) {
        var defer = ayepromise.defer();
        defer.resolve(fs.read(tempPath + key + ".json"));
        return defer.promise;
    };

    var storeMockReferenceImage = function (key, stringData) {
        var defer = ayepromise.defer();
        fs.write(tempPath + key + ".json", stringData, 'w');
        defer.resolve();
        return defer.promise;
    };

    loadStoragePluginSpecs(constructStorage, readStoredReferenceImage, storeMockReferenceImage);

    it("should call error handler if the content's JSON is invalid", function (done) {
        var storage = constructStorage(util);
        storeMockReferenceImage("somePage.html", ';');
        storage.readReferenceImage({url: "somePage.html"}).then(null, done);
    });
});
