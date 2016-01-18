describe("Nice reporter", function () {
    "use strict";

    var reporter, selectionFilter;

    var util = csscriticLib.util();

    var originalTitle;

    beforeEach(function () {
        originalTitle = document.title;
    });

    afterEach(function () {
        document.title = originalTitle;
    });

    var anImage;

    beforeEach(function (done) {
        anImage = document.createElement('img');
        anImage.onload = done;
        anImage.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2P8DwQACgAD/il4QJ8AAAAASUVORK5CYII=";
    });

    var aPassedTest = function (testCase) {
        testCase = testCase || {
            url: "aPage.html"
        };
        return {
            status: "passed",
            testCase: testCase,
            pageImage: anImage,
            referenceImage: anImage,
            renderErrors: []
        };
    };

    var aFailedTest = function (pageImage, referenceImage) {
        return {
            status: 'failed',
            testCase: {
                url: 'aPage.html'
            },
            pageImage: pageImage,
            referenceImage: referenceImage,
            acceptPage: function () {},
            renderErrors: []
        };
    };

    var aFailedTestWithAccept = function (acceptPage) {
        return {
            status: 'failed',
            testCase: {
                url: 'aPage.html'
            },
            pageImage: anImage,
            referenceImage: anImage,
            acceptPage: acceptPage,
            renderErrors: []
        };
    };

    var aMissingReferenceTestWithAccept = function (acceptPage) {
        return {
            status: 'referenceMissing',
            testCase: {
                url: 'aPage.html'
            },
            pageImage: anImage,
            acceptPage: acceptPage,
            renderErrors: []
        };
    };

    var imageData = function () {
        var canvas = document.createElement("canvas");
        return canvas.getContext("2d").createImageData(1, 1);
    };

    var fakeWindow, scrollEventListener;

    var scrollTo = function (scrollY) {
        fakeWindow.scrollY = scrollY;
        scrollEventListener();
    };

    var $fixture;

    beforeEach(function () {
        var packageVersion = '1.2.3';
        selectionFilter = jasmine.createSpyObj('selectionFilter', ['filterFor', 'filterUrlFor', 'filterForComponent', 'filterUrlForComponent', 'clearFilter', 'clearFilterUrl']);
        var pageNavigationHandlingFallback = csscriticLib.pageNavigationHandlingFallback({href: 'file://somepath'});

        $fixture = setFixtures();

        fakeWindow = {
            scrollY: 0,
            addEventListener: function (event, handler) {
                if (event === 'scroll') {
                    scrollEventListener = handler;
                }
            }
        };

        reporter = csscriticLib.niceReporter(
            fakeWindow,
            util,
            selectionFilter,
            pageNavigationHandlingFallback,
            rasterizeHTML,
            packageVersion
        ).NiceReporter($fixture.get(0));

        jasmine.addMatchers(imagediffForJasmine2);
    });

    describe("progress bar", function () {
        it("should link to comparison in progress bar", function () {
            var test = aPassedTest();
            reporter.reportSelectedComparison(test);
            reporter.reportComparison(test);

            expect($fixture.find('.progressBar a').attr('href')).toEqual('#aPage.html');
            expect($fixture.find('.fixedHeaderAnchorTarget').attr('id')).toEqual('aPage.html');
        });

        it("should link to comparison in progress bar with extended test case", function () {
            var test = aPassedTest({url: 'aTest.html', width: 42});
            reporter.reportSelectedComparison(test);
            reporter.reportComparison(test);

            expect($fixture.find('.progressBar a').attr('href')).toEqual('#aTest.html,width=42');
            expect($fixture.find('.fixedHeaderAnchorTarget').attr('id')).toEqual('aTest.html,width=42');
        });

        it("should link to comparison in progress bar and escape ids", function () {
            var test = aPassedTest({url: 'aTest.html', description: 'a description'});
            reporter.reportSelectedComparison(test);
            reporter.reportComparison(test);

            expect($fixture.find('.progressBar a').attr('href')).toEqual('#aTest.html,description=a_description');
            expect($fixture.find('.fixedHeaderAnchorTarget').attr('id')).toEqual('aTest.html,description=a_description');
        });

        it("should escape ids with multiple matches", function () {
            var test = aPassedTest({url: 'aTest.html', description: 'a description with more whitespace'});
            reporter.reportSelectedComparison(test);
            reporter.reportComparison(test);

            expect($fixture.find('.progressBar a').attr('href')).toEqual('#aTest.html,description=a_description_with_more_whitespace');
        });

        it("should expose a title for each blip", function () {
            var test = aPassedTest({url: 'aTest.html', width: 42});
            reporter.reportSelectedComparison(test);
            reporter.reportComparison(test);

            expect($fixture.find('.progressBar a').attr('title')).toEqual('aTest.html,width=42');
        });

        it("should expose a title for each blip with the description if present", function () {
            var test = aPassedTest({url: 'aTest.html', width: 42, desc: 'the description'});
            reporter.reportSelectedComparison(test);
            reporter.reportComparison(test);

            expect($fixture.find('.progressBar a').attr('title')).toEqual('the description');
        });

        it("should expose a title for each blip with the full description if present", function () {
            var test = aPassedTest({url: 'aTest.html', width: 42, desc: 'the description', component: 'something'});
            reporter.reportSelectedComparison(test);
            reporter.reportComparison(test);

            expect($fixture.find('.progressBar a').attr('title')).toEqual('something the description');
        });
    });

    it("should link to the test case's href", function () {
        var test = aPassedTest();
        reporter.reportSelectedComparison(test);
        reporter.reportComparison(test);

        expect($fixture.find('.comparison .title .externalLink').attr('href')).toEqual('aPage.html');
    });

    it("should show a difference canvas on a failed comparison", function (done) {
        testHelper.loadImageFromUrl(testHelper.fixture("blue.png"), function (expectedDiffImage) {
            testHelper.loadImageFromUrl(testHelper.fixture("green.png"), function (pageImage) {
                testHelper.loadImageFromUrl(testHelper.fixture("redWithLetter.png"), function (referenceImage) {
                    var test = aFailedTest(pageImage, referenceImage);
                    reporter.reportSelectedComparison(test);
                    reporter.reportComparison(test);

                    expect($fixture.find('canvas').get(0)).toImageDiffEqual(expectedDiffImage);
                    done();
                });
            });
        });
    });

    it("should allow the user to accept the rendered page on a failing test", function () {
        var acceptSpy = jasmine.createSpy('accept'),
            test = aFailedTestWithAccept(acceptSpy);

        spyOn(imagediff, 'diff').and.returnValue(imageData());

        reporter.reportSelectedComparison(test);
        reporter.reportComparison(test);

        $fixture.find('.failed.comparison button').click();

        expect(acceptSpy).toHaveBeenCalled();
    });

    it("should allow the user to accept the rendered page for a missing reference image", function () {
        var acceptSpy = jasmine.createSpy('accept'),
            test = aMissingReferenceTestWithAccept(acceptSpy);

        spyOn(imagediff, 'diff').and.returnValue(imageData());

        reporter.reportSelectedComparison(test);
        reporter.reportComparison(test);

        $fixture.find('.referenceMissing.comparison button').click();

        expect(acceptSpy).toHaveBeenCalled();
    });

    it("should allow the user to accept all comparisons", function () {
        var firstAccept = jasmine.createSpy('firstAccept'),
            secondAccept = jasmine.createSpy('secondAccept'),
            thirdAccept = jasmine.createSpy('thirdAccept'),
            firstFailingTest = aFailedTestWithAccept(firstAccept),
            secondFailingTest = aFailedTestWithAccept(secondAccept),
            aMissingReferenceTest = aMissingReferenceTestWithAccept(thirdAccept);

        [firstFailingTest, secondFailingTest, aMissingReferenceTest].map(function (comparison) {
            reporter.reportSelectedComparison(comparison);
            reporter.reportComparison(comparison);
        });

        reporter.reportTestSuite({success: false});

        // when
        $fixture.find('.acceptAll').click();

        // then
        expect(firstAccept).toHaveBeenCalled();
        expect(secondAccept).toHaveBeenCalled();
        expect(thirdAccept).toHaveBeenCalled();
    });

    describe("real view", function () {

        it("should load the page in an iframe for a passing test when clicking on toggle view", function () {
            var test = aPassedTest();

            reporter.reportSelectedComparison(test);
            reporter.reportComparison(test);

            // when
            $fixture.find('.toggleView').click();

            // then
            var $iframe = $fixture.find('.pageImageContainer iframe');
            expect($iframe.length).toBe(1);
            expect($iframe[0].width).toBe('' + anImage.width);
            expect($iframe[0].height).toBe('' + anImage.height);
            expect($iframe[0].src).toMatch(test.testCase.url);
        });

        it("should load the page in an iframe for a failing test when clicking on toggle view", function () {
            var test = aFailedTest(anImage, anImage);

            reporter.reportSelectedComparison(test);
            reporter.reportComparison(test);

            // when
            $fixture.find('.toggleView').click();

            // then
            var $iframe = $fixture.find('.pageImageContainer iframe');
            expect($iframe.length).toBe(1);
            expect($iframe[0].width).toBe('' + anImage.width);
            expect($iframe[0].height).toBe('' + anImage.height);
            expect($iframe[0].src).toMatch(test.testCase.url);
        });

        it("should load the page in an iframe for missing reference when clicking on toggle view", function () {
            var test = aMissingReferenceTestWithAccept();

            reporter.reportSelectedComparison(test);
            reporter.reportComparison(test);

            // when
            $fixture.find('.toggleView').click();

            // then
            var $iframe = $fixture.find('.pageImageContainer iframe');
            expect($iframe.length).toBe(1);
            expect($iframe[0].width).toBe('' + anImage.width);
            expect($iframe[0].height).toBe('' + anImage.height);
            expect($iframe[0].src).toMatch(test.testCase.url);
        });

        it("should hide scrollbars so the exact breakpoint is triggered", function () {
            var test = aPassedTest();

            reporter.reportSelectedComparison(test);
            reporter.reportComparison(test);

            // when
            $fixture.find('.toggleView').click();

            // then
            var $iframe = $fixture.find('.pageImageContainer iframe');
            expect($iframe.attr('scrolling')).toBe('no');
        });

        it("should switch back to screenshot on second click", function () {
            var test = aPassedTest();

            reporter.reportSelectedComparison(test);
            reporter.reportComparison(test);

            // when
            $fixture.find('.toggleView').click();
            $fixture.find('.toggleView').click();

            // then
            expect($fixture.find('.pageImageContainer iframe')).not.toExist();
            expect($fixture.find('.pageImageContainer .imageWrapper canvas')).toExist();
        });

        it("should deactivate the accept button when clicking on toggle view", function () {
            var test = aFailedTest(anImage, anImage);

            reporter.reportSelectedComparison(test);
            reporter.reportComparison(test);

            // when
            $fixture.find('.toggleView').click();

            // then
            expect($fixture.find('.outerPageImageContainer .accept').prop('disabled')).toBe(true);
        });

        it("should re-activate the accept button when toggling back", function () {
            var test = aFailedTest(anImage, anImage);

            reporter.reportSelectedComparison(test);
            reporter.reportComparison(test);

            // when
            $fixture.find('.toggleView').click();
            $fixture.find('.toggleView').click();

            // then
            expect($fixture.find('.outerPageImageContainer .accept').prop('disabled')).toBe(false);
        });

        it("should not re-activate the accept button when toggling back if already accepted", function () {
            var test = aFailedTest(anImage, anImage);

            reporter.reportSelectedComparison(test);
            reporter.reportComparison(test);

            // when
            $fixture.find('.accept').click();

            $fixture.find('.toggleView').click();
            $fixture.find('.toggleView').click();

            // then
            expect($fixture.find('.outerPageImageContainer .accept').prop('disabled')).toBe(true);
        });
    });

    describe("selection", function () {

        it("should select tests by url (fallback)", function () {
            var firstPassedTest = aPassedTest({url: "firstTest.html"}),
                secondPassedTest = aPassedTest({url: "secondTest.html"});

            reporter.reportSelectedComparison(firstPassedTest);
            reporter.reportSelectedComparison(secondPassedTest);

            reporter.reportComparison(firstPassedTest);
            reporter.reportComparison(secondPassedTest);

            reporter.reportTestSuite({success: true});

            // when
            $fixture.find('#secondTest\\.html').parent().find('.titleLink').click();

            // then
            expect(selectionFilter.filterFor).toHaveBeenCalledWith({url: 'secondTest.html'});
        });

        it("should include test selection url", function () {
            var aTest = aPassedTest({url: "aTest"});

            selectionFilter.filterUrlFor.and.returnValue('the_filter_link');

            reporter.reportSelectedComparison(aTest);
            reporter.reportComparison(aTest);

            expect($fixture.find('.titleLink').attr('href')).toEqual('the_filter_link');
        });

        it("should fallback to hash when selection url is not provided", function () {
            var aTest = aPassedTest({url: "aTest"});

            selectionFilter.filterUrlFor = undefined;

            reporter.reportSelectedComparison(aTest);
            reporter.reportComparison(aTest);

            expect($fixture.find('.titleLink').attr('href')).toEqual('#');
        });

        it("should link from the component headline", function () {
            var aTest = aPassedTest({desc: 'a description', component: 'some component'});
            selectionFilter.filterUrlForComponent.and.returnValue('the_component_filter_link');

            reporter.reportSelectedComparison(aTest);
            reporter.reportComparison(aTest);

            expect($fixture.find('.componentLabel a').attr('href')).toEqual('the_component_filter_link');
        });

        it("should fallback to hash when component selection url is not provided", function () {
            var aTest = aPassedTest({desc: 'a description', component: 'some component'});
            selectionFilter.filterUrlForComponent = undefined;

            reporter.reportSelectedComparison(aTest);
            reporter.reportComparison(aTest);

            expect($fixture.find('.componentLabel a').attr('href')).toEqual('#');
        });

        it("should filter by component headline (fallback)", function () {
            var aTest = aPassedTest({desc: 'a description', component: 'some component'});

            reporter.reportSelectedComparison(aTest);
            reporter.reportComparison(aTest);

            $fixture.find('.componentLabel a').click();

            expect(selectionFilter.filterForComponent).toHaveBeenCalled();
        });

        it("should 'run all'", function () {
            var firstPassedTest = aPassedTest({url: "firstTest.html"}),
                secondPassedTest = aPassedTest({url: "secondTest.html"});

            selectionFilter.clearFilterUrl.and.returnValue('the_clear_url');

            reporter.reportDeselectedComparison(firstPassedTest);
            reporter.reportSelectedComparison(secondPassedTest);

            reporter.reportComparison(secondPassedTest);

            reporter.reportTestSuite({success: true});

            $fixture.find('.runAll').click();

            expect(selectionFilter.clearFilter).toHaveBeenCalled();
        });

        it("should include 'run all' link", function () {
            var firstPassedTest = aPassedTest({url: "firstTest.html"}),
                secondPassedTest = aPassedTest({url: "secondTest.html"});

            selectionFilter.clearFilterUrl.and.returnValue('the_clear_url');

            reporter.reportDeselectedComparison(firstPassedTest);
            reporter.reportSelectedComparison(secondPassedTest);

            reporter.reportComparison(secondPassedTest);

            reporter.reportTestSuite({success: true});

            expect($fixture.find('.runAll').attr('href')).toEqual('the_clear_url');
        });

        it("should fallback to hash on 'run all' link", function () {
            var firstPassedTest = aPassedTest({url: "firstTest.html"}),
                secondPassedTest = aPassedTest({url: "secondTest.html"});

            selectionFilter.clearFilterUrl = undefined;

            reporter.reportDeselectedComparison(firstPassedTest);
            reporter.reportSelectedComparison(secondPassedTest);

            reporter.reportComparison(secondPassedTest);

            reporter.reportTestSuite({success: true});

            expect($fixture.find('.runAll').attr('href')).toEqual('#');
        });
    });

    describe("Document title progress counter", function () {
        it("should show a pending comparison", function () {
            document.title = "a test title";

            reporter.reportSelectedComparison(aPassedTest());

            expect(document.title).toEqual("(0/1) a test title");
        });

        it("should show two pending comparisons", function () {
            document.title = "a test title";

            reporter.reportSelectedComparison(aPassedTest());
            reporter.reportSelectedComparison(aFailedTest());

            expect(document.title).toEqual("(0/2) a test title");
        });

        it("should show one finished comparison", function () {
            var passedTest = aPassedTest();
            document.title = "a test title";

            reporter.reportSelectedComparison(passedTest);
            reporter.reportSelectedComparison(aFailedTest());

            reporter.reportComparison(passedTest);

            expect(document.title).toEqual("(1/2) a test title");
        });

        it("should show one finished comparison", function () {
            var passedTest = aPassedTest(),
                failedTest = aFailedTest(anImage, anImage);
            document.title = "a test title";

            reporter.reportSelectedComparison(passedTest);
            reporter.reportSelectedComparison(failedTest);

            reporter.reportComparison(passedTest);
            reporter.reportComparison(failedTest);

            expect(document.title).toEqual("(2/2) a test title");
        });

        it("should show an empty setup", function () {
            document.title = "a test title";

            reporter.reportTestSuite({success: false});

            expect(document.title).toEqual("(0/0) a test title");
        });
    });

    describe("Fixed header", function () {
        it("should fix header on scroll", function () {
            reporter.reportSelectedComparison(aPassedTest());

            scrollTo(42);

            var header = $fixture.find('header')[0];

            expect(header.style.position).toBe('fixed');
            expect(header.style.top).not.toBe('');
            expect(header.style.left).not.toBe('');
            expect(header.style.right).not.toBe('');
        });

        it("should reset header on scroll back", function () {
            reporter.reportSelectedComparison(aPassedTest());

            scrollTo(100);
            scrollTo(0);

            var header = $fixture.find('header')[0];

            expect(header.style.position).toBe('');
            expect(header.style.top).toBe('');
            expect(header.style.left).toBe('');
            expect(header.style.right).toBe('');
        });

        it("should not fix header initially", function () {
            reporter.reportSelectedComparison(aPassedTest());

            expect($fixture.find('header')[0].style.position).toBe('');
        });

        it("should place a pseudo header as height placeholder", function () {
            reporter.reportSelectedComparison(aPassedTest());

            scrollTo(42);

            var header = $fixture.find('header')[0];
            expect(header.previousElementSibling).not.toBe(null);
            expect(header.previousElementSibling.style.height).not.toBe('');
        });

        it("should remove pseudo header on scroll back", function () {
            reporter.reportSelectedComparison(aPassedTest());

            scrollTo(100);
            scrollTo(0);

            var header = $fixture.find('header')[0];
            expect(header.previousElementSibling).toBe(null);
        });

        it("should set a className", function () {
            reporter.reportSelectedComparison(aPassedTest());

            scrollTo(42);

            var header = $fixture.find('header')[0];
            expect(header.classList.contains('scrolling')).toBe(true);
        });

        it("should remove className on scroll back", function () {
            reporter.reportSelectedComparison(aPassedTest());

            scrollTo(100);
            scrollTo(0);

            var header = $fixture.find('header')[0];
            expect(header.classList.contains('scrolling')).toBe(false);
        });

        it("should switch to small header after given threshold", function () {
            reporter.reportSelectedComparison(aPassedTest());

            scrollTo(51);

            var header = $fixture.find('header')[0];
            expect(header.classList.contains('small')).toBe(true);
        });

        it("should switch back to large header below given threshold", function () {
            reporter.reportSelectedComparison(aPassedTest());

            scrollTo(200);
            scrollTo(50);

            var header = $fixture.find('header')[0];
            expect(header.classList.contains('small')).toBe(false);
        });

        it("should switch back to large header on scroll back", function () {
            reporter.reportSelectedComparison(aPassedTest());

            scrollTo(200);
            scrollTo(0);

            var header = $fixture.find('header')[0];
            expect(header.classList.contains('small')).toBe(false);
        });
    });

    describe("TOC", function () {
        it("should show a ToC", function () {
            var aTest = aPassedTest({desc: 'a description', component: 'some component'});

            reporter.reportSelectedComparison(aTest);
            reporter.reportComparison(aTest);

            expect($fixture.find('.toc')).toExist();
        });

        it("should link to selected component", function () {
            var aTest = aPassedTest({url: 'targetUrl.html', desc: 'a description', component: 'some component'});

            reporter.reportSelectedComparison(aTest);
            reporter.reportComparison(aTest);

            expect($fixture.find('.tocEntry a').attr('href')).toEqual('#targetUrl.html,component=some_component,desc=a_description');
        });
    });

    describe("Browser compatibility warning", function () {
        var fakeCanvas;

        beforeEach(function () {
            fakeCanvas = jasmine.createSpyObj('canvas', ['getContext', 'toDataURL']);
            var fakeContext = jasmine.createSpyObj('context', ['drawImage']);
            fakeCanvas.getContext.and.returnValue(fakeContext);

            var origCreateElement = document.createElement;

            spyOn(document, 'createElement').and.callFake(function (tagName) {
                if (tagName === 'canvas') {
                    return fakeCanvas;
                } else {
                    return origCreateElement.call(document, tagName);
                }
            });
        });

        it("should show a warning if the browser is not supported", function (done) {
            fakeCanvas.toDataURL.and.throwError(new Error('poof'));

            reporter.reportSelectedComparison(aPassedTest());

            testHelper.waitsFor(function () {
                return $(".browserWarning").length > 0;
            }).then(function () {
                expect($(".browserWarning")).toExist();
                done();
            });
        });

        ifNotInPhantomIt("should not show a warning if the browser is supported", function (done) {
            reporter.reportSelectedComparison(aPassedTest());

            // Wait for the opposite until timeout
            testHelper.waitsFor(function () {
                return $(".browserWarning").length > 0;
            }).then(null, function () {
                expect($(".browserWarning")).not.toExist();
                done();
            });
        });
    });
});
