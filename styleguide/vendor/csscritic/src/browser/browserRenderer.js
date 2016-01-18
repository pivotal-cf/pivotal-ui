csscriticLib.browserRenderer = function (util, jobQueue, rasterizeHTML) {
    "use strict";

    var module = {};

    var cache = {};

    var queue;

    var getOrCreateJobQueue = function () {
        if (!queue) {
            queue = jobQueue();
        }
        return queue;
    };

    var extractErrorMessages = function (errors) {
        return errors.map(function (error) {
            return error.msg;
        });
    };

    var logErrorToConsole = function (e) {
        console.error(e);

        throw e;
    };

    var doRenderHtml = function (parameters) {
        var drawOptions = {
                cache: 'repeated',
                cacheBucket: cache,
                width: parameters.width,
                height: parameters.height,
                executeJs: true,
                executeJsTimeout: 50,
                baseUrl: parameters.baseUrl
            };
        if (parameters.hover) {
            drawOptions.hover = parameters.hover;
        }
        if (parameters.active) {
            drawOptions.active = parameters.active;
        }

        return rasterizeHTML.drawHTML(parameters.html, drawOptions).then(function (result) {
            var renderErrors = extractErrorMessages(result.errors);

            return {
                image: result.image,
                errors: renderErrors
            };
        }, logErrorToConsole);
    };

    var renderHtmlFromBlob = function (blob, parameters) {
        return util.loadBlobAsText(blob).then(function (content) {
            return doRenderHtml({
                html: content,
                baseUrl: parameters.url,
                width: parameters.width,
                height: parameters.height,
                hover: parameters.hover,
                active: parameters.active
            });
        });
    };

    var loadImageFromBlob = function (blob, parameters) {
        return util.loadBlobAsDataURI(blob)
            .then(util.getImageForUrl)
            .then(function (image) {
                return {
                    image: image,
                    errors: []
                };
            }, function () {
                // It's not an image, so it must be a HTML page
                return renderHtmlFromBlob(blob, parameters);
            });
    };

    module.render = function (parameters) {
        // Execute render jobs one after another to stabilise rendering (especially JS execution).
        // Also provides a more fluid response. Performance seems not to be affected.
        return getOrCreateJobQueue().execute(function () {
            return util.loadAsBlob(parameters.url)
                .then(function (blob) {
                    return loadImageFromBlob(blob, parameters);
                });
        });
    };

    return module;
};
