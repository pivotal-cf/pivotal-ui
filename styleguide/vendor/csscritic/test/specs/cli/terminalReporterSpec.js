describe("TerminalReporter", function () {
    "use strict";

    var reporter,
        htmlImage, referenceImage, differenceImageCanvas,
        consoleLogSpy,
        paramsOnPassingTest;

    beforeEach(function () {
        var terminalReporter = csscriticLib.terminalReporter(window.console);
        reporter = terminalReporter.TerminalReporter();

        htmlImage = window.document.createElement("img");
        referenceImage = new window.Image();
        differenceImageCanvas = window.document.createElement("canvas");

        consoleLogSpy = spyOn(window.console, "log");

        paramsOnPassingTest = {
            status: "passed",
            testCase: {
                url: "page_url"
            },
            pageImage: htmlImage,
            referenceImage: referenceImage
        };
    });

    it("should log successful status to output", function () {
        reporter.reportComparison(paramsOnPassingTest);

        expect(consoleLogSpy).toHaveBeenCalledWith("Testing page_url... \u001b[32m\u001b[1mpassed\u001b[0m");
    });

    it("should call the callback when finished reporting", function () {
        var callback = jasmine.createSpy("callback");

        reporter.reportComparison(paramsOnPassingTest, callback);

        expect(callback).toHaveBeenCalled();
    });

    it("should log failing status to output", function () {
        reporter.reportComparison({
            status: "failed",
            testCase: {
                url: "the_page_url"
            },
            pageImage: htmlImage,
            resizePageImage: function () {},
            acceptPage: function () {},
            referenceImage: referenceImage
        });

        expect(consoleLogSpy).toHaveBeenCalledWith("Testing the_page_url... \u001b[31m\u001b[1mfailed\u001b[0m");
    });

    it("should log referenceMissing status to output", function () {
        reporter.reportComparison({
            status: "referenceMissing",
            testCase: {
                url: "the_page_url"
            },
            pageImage: htmlImage,
            resizePageImage: function () {},
            acceptPage: function () {}
        });

        expect(consoleLogSpy).toHaveBeenCalledWith("Testing the_page_url... \u001b[31m\u001b[1mreferenceMissing\u001b[0m");
    });

    it("should log error status to output", function () {
        reporter.reportComparison({
            status: "error",
            testCase: {
                url: "page_url"
            },
            pageImage: null
        });

        expect(consoleLogSpy).toHaveBeenCalledWith("Testing page_url... \u001b[31m\u001b[1merror\u001b[0m");
    });

    it("should log render errors to output", function () {
        reporter.reportComparison({
            status: "passed",
            testCase: {
                url: "page_url"
            },
            pageImage: htmlImage,
            referenceImage: referenceImage,
            renderErrors: ["aBrokenURL"]
        });

        expect(consoleLogSpy).toHaveBeenCalledWith("\u001b[31mError(s) loading page_url:\u001b[0m");
        expect(consoleLogSpy).toHaveBeenCalledWith("\u001b[31m\u001b[1m  aBrokenURL\u001b[0m");
    });
});
