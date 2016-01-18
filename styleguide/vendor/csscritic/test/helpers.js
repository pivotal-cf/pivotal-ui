"use strict";

var isWebkit = navigator.userAgent.indexOf("WebKit") >= 0,
    isPhantom = navigator.userAgent.indexOf("PhantomJS") >= 0;

window.ifNotInWebkitIt = function(text, functionHandle) {
    if (! isWebkit) {
        return it(text, functionHandle);
    } else {
        console.warn('Warning: "' + text + '" is disabled on this platform');
        return xit(text, functionHandle);
    }
};

window.ifNotInPhantomIt = function(text, functionHandle) {
    if (! isPhantom) {
        return it(text, functionHandle);
    } else {
        console.warn('Warning: "' + text + '" is disabled on this platform');
        return xit(text, functionHandle);
    }
};

window.imagediffForJasmine2 = {
    // work around imagediff only supporting jasmine 1.x
    toImageDiffEqual: function () {
        return {
            compare: function (actual, expected, tolerancePercentage) {
                var context = {actual: actual},
                    result = {};
                result.pass = imagediff.jasmine.toImageDiffEqual.call(context, expected, tolerancePercentage);
                return result;
            }
        };
    }
};

