csscriticLib.htmlFileReporter = function (util) {
    "use strict";

    var module = {};

    var reportComparison = function (comparison, basePath) {
        var imagesToWrite = [];

        if (comparison.status !== "error") {
            imagesToWrite.push({
                imageUrl: comparison.pageImage.src,
                width: comparison.pageImage.width,
                height: comparison.pageImage.height,
                target: basePath + getTargetBaseName(comparison.testCase.url) + ".png"
            });
        }
        if (comparison.status === "failed") {
            imagesToWrite.push({
                imageUrl: comparison.referenceImage.src,
                width: comparison.referenceImage.width,
                height: comparison.referenceImage.height,
                target: basePath + getTargetBaseName(comparison.testCase.url) + ".reference.png"
            });
            imagesToWrite.push({
                imageUrl: getDifferenceCanvas(comparison.pageImage, comparison.referenceImage).toDataURL('image/png'),
                width: comparison.referenceImage.width,
                height: comparison.referenceImage.height,
                target: basePath + getTargetBaseName(comparison.testCase.url) + ".diff.png"
            });
        }

        return renderUrlsToFile(imagesToWrite);
    };

    var compileReport = function (results, basePath) {
        var fs = require("fs"),
            content = results.success ? "Passed" : "Failed",
            document = "<html><body>" + content + "</body></html>";

        fs.write(basePath + "index.html", document, "w");
    };

    var getTargetBaseName = function (filePath) {
        var fileName = filePath.substr(filePath.lastIndexOf("/")+1),
            stripEnding = ".html";

        if (fileName.substr(fileName.length - stripEnding.length) === stripEnding) {
            fileName = fileName.substr(0, fileName.length - stripEnding.length);
        }
        return fileName;
    };

    var renderUrlsToFile = function (entrys) {
        return util.all(entrys.map(function (entry) {
            return renderUrlToFile(entry.imageUrl, entry.target, entry.width, entry.height);
        }));
    };

    var renderUrlToFile = function (url, filePath, width, height) {
        var webpage = require("webpage"),
            page = webpage.create(),
            defer = ayepromise.defer();

        page.viewportSize = {
            width: width,
            height: height
        };

        page.open(url, function () {
            page.render(filePath);

            defer.resolve();
        });

        return defer.promise;
    };

    var getDifferenceCanvas = function (imageA, imageB) {
        var differenceImageData = imagediff.diff(imageA, imageB),
            canvas = document.createElement("canvas"),
            context;

        canvas.height = differenceImageData.height;
        canvas.width  = differenceImageData.width;

        context = canvas.getContext("2d");
        context.putImageData(differenceImageData, 0, 0);

        return canvas;
    };

    module.HtmlFileReporter = function (basePath) {
        basePath = basePath || "./";

        if (basePath[basePath.length - 1] !== '/') {
            basePath += '/';
        }

        return {
            reportComparison: function (result) {
                return reportComparison(result, basePath);
            },
            reportTestSuite: function (results) {
                compileReport(results, basePath);
            }
        };
    };

    return module;
};
