describe("SignOffReporter", function () {
    "use strict";

    var util = csscriticLib.util(),
        signOffReporterUtil = csscriticLib.signOffReporterUtil(util, inlineresources, jsSHA),
        signOffReporter;

    var htmlImage = "html image",
        referenceImage = "reference image",
        acceptPageSpy, loadFullDocumentSpy, calculateFingerprintSpy;

    beforeEach(function () {
        signOffReporter = csscriticLib.signOffReporter(signOffReporterUtil);

        acceptPageSpy = jasmine.createSpy("acceptPage");
        loadFullDocumentSpy = spyOn(signOffReporterUtil, 'loadFullDocument').and.returnValue(testHelper.successfulPromise("some content"));
        calculateFingerprintSpy = spyOn(signOffReporterUtil, 'calculateFingerprint').and.returnValue("fIngRPrinT");
    });

    it("should auto-accept a signed off version on a failing test", function (done) {
        var pageUrl = testHelper.fixture('pageUnderTest.html');

        var reporter = signOffReporter.SignOffReporter([{
            pageUrl: pageUrl,
            fingerprint: "fIngRPrinT"
        }]);

        reporter.reportComparison({
            status: "failed",
            testCase: {
                url: pageUrl
            },
            pageImage: htmlImage,
            resizePageImage: function () {},
            acceptPage: acceptPageSpy,
            referenceImage: referenceImage
        }).then(function () {
            expect(acceptPageSpy).toHaveBeenCalled();

            expect(loadFullDocumentSpy).toHaveBeenCalledWith(pageUrl);
            expect(calculateFingerprintSpy).toHaveBeenCalledWith("some content");

            done();
        });
    });

    it("should auto-accept a signed off version on a test with a missing reference", function (done) {
        var pageUrl = testHelper.fixture('pageUnderTest.html');

        var reporter = signOffReporter.SignOffReporter([{
            pageUrl: pageUrl,
            fingerprint: "fIngRPrinT"
        }]);

        reporter.reportComparison({
            status: "referenceMissing",
            testCase: {
                url: pageUrl
            },
            pageImage: htmlImage,
            resizePageImage: function () {},
            acceptPage: acceptPageSpy
        }).then(function () {
            expect(acceptPageSpy).toHaveBeenCalled();

            expect(loadFullDocumentSpy).toHaveBeenCalledWith(pageUrl);
            expect(calculateFingerprintSpy).toHaveBeenCalledWith("some content");

            done();
        });
    });

    it("should take fingerprints from a file", function (done) {
        var pageUrl = testHelper.fixture('pageUnderTest.html');

        var reporter = signOffReporter.SignOffReporter('fingerprints.json');

        spyOn(signOffReporterUtil, 'loadFingerprintJson').and.returnValue(testHelper.successfulPromise([{
            pageUrl: pageUrl,
            fingerprint: "fIngRPrinT"
        }]));

        reporter.reportComparison({
            status: "failed",
            testCase: {
                url: pageUrl
            },
            pageImage: htmlImage,
            resizePageImage: function () {},
            acceptPage: acceptPageSpy,
            referenceImage: referenceImage
        }).then(function () {
            expect(acceptPageSpy).toHaveBeenCalled();

            done();
        });
    });
});
