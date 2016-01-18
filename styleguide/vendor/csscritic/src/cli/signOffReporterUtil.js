csscriticLib.signOffReporterUtil = function (util, inlineresources, JsSHA) {
    "use strict";

    var module = {};

    var getFileUrl = function (address) {
        var fs;

        if (window.require) {
            fs = require("fs");

            return address.indexOf("://") === -1 ? "file://" + fs.absolute(address) : address;
        } else {
            return address;
        }
    };

    module.loadFullDocument = function (pageUrl) {
        var absolutePageUrl = getFileUrl(pageUrl),
            doc = window.document.implementation.createHTMLDocument("");

        return util.ajax(absolutePageUrl).then(function (content) {
            doc.documentElement.innerHTML = content;

            return inlineresources.inlineReferences(doc, {baseUrl: absolutePageUrl, cache: false}).then(function () {
                return '<html>' +
                    doc.documentElement.innerHTML +
                    '</html>';
            });
        });
    };

    module.loadFingerprintJson = function (url) {
        var absoluteUrl = getFileUrl(url);

        return util.ajax(absoluteUrl).then(function (content) {
            return JSON.parse(content);
        });
    };

    module.calculateFingerprint = function (content) {
        var shaObj = new JsSHA(content, "TEXT");

        return shaObj.getHash("SHA-224", "HEX");
    };

    return module;
};
