csscriticLib.terminalReporter = function (console) {
    "use strict";

    var module = {};

    var ATTRIBUTES_TO_ANSI = {
            "off": 0,
            "bold": 1,
            "red": 31,
            "green": 32
        };

    var inColor = function (string, color) {
        var color_attributes = color && color.split("+"),
            ansi_string = "";

        if (!color_attributes) {
            return string;
        }

        color_attributes.forEach(function (colorAttr) {
            ansi_string += "\u001b[" + ATTRIBUTES_TO_ANSI[colorAttr] + "m";
        });
        ansi_string += string + "\u001b[" + ATTRIBUTES_TO_ANSI['off'] + "m";

        return ansi_string;
    };

    var statusColor = {
            passed: "green+bold",
            failed: "red+bold",
            error: "red+bold",
            referenceMissing: "red+bold"
        };

    var reportComparison = function (comparison, callback) {
        var color = statusColor[comparison.status] || "",
            statusStr = inColor(comparison.status, color);
        if (comparison.renderErrors && comparison.renderErrors.length) {
            console.log(inColor("Error(s) loading " + comparison.testCase.url + ":", "red"));
            comparison.renderErrors.forEach(function (msg) {
                console.log(inColor("  " + msg, "red+bold"));
            });
        }

        console.log("Testing " + comparison.testCase.url + "... " + statusStr);

        if (callback) {
            callback();
        }
    };

    module.TerminalReporter = function () {
        return {
            reportComparison: reportComparison
        };
    };

    return module;
};
