describe("Fallback Filter", function () {
    "use strict";

    var fallbackFilter, windowLocation;

    var aComparison = function (url) {
        return {
            testCase: {
                url: url
            }
        };
    };

    var aComparisonWithDescription = function (description, component) {
        return {
            testCase: {
                desc: description,
                component: component
            }
        };
    };

    beforeEach(function () {
        windowLocation = jasmine.createSpyObj('window.location', ['reload']);

        fallbackFilter = csscriticLib.fallbackFilter(windowLocation);
    });

    afterEach(function () {
        sessionStorage.clear();
    });

    it("should store the selection in the sessionStorage", function () {
        fallbackFilter.filterFor({url: 'the_selection'});

        expect(sessionStorage.getItem('csscriticFallbackFilter')).toEqual('the_selection');
    });

    it("should reload the runner on filter", function () {
        fallbackFilter.filterFor({url: 'the_selection'});

        expect(windowLocation.reload).toHaveBeenCalled();
    });

    it("should filter by desc if given", function () {
        fallbackFilter.filterFor({desc: 'a description'});

        expect(sessionStorage.getItem('csscriticFallbackFilter')).toEqual('a description');
    });

    it("should filter by desc and component if given", function () {
        fallbackFilter.filterFor({desc: 'a description', component: 'some component'});

        expect(sessionStorage.getItem('csscriticFallbackFilter')).toEqual('some component a description');
    });

    it("should filter for component only", function () {
        fallbackFilter.filterForComponent('the component');
        expect(sessionStorage.getItem('csscriticFallbackFilter')).toEqual('the component');
    });

    it("should reload when filtering for component only", function () {
        fallbackFilter.filterForComponent('the component');
        expect(windowLocation.reload).toHaveBeenCalled();
    });

    it("should clear the stored selection", function () {
        sessionStorage.setItem('csscriticFallbackFilter', 'some_selection');

        fallbackFilter.clearFilter();

        expect(sessionStorage.getItem('csscriticFallbackFilter')).toBe(null);
    });

    it("should reload the runner on clear", function () {
        fallbackFilter.clearFilter();

        expect(windowLocation.reload).toHaveBeenCalled();
    });

    it("should filter matching selection", function () {
        sessionStorage.setItem('csscriticFallbackFilter', 'someUrl');

        expect(fallbackFilter.isComparisonSelected(aComparison('someUrl'))).toBe(true);
    });

    it("should filter out a comparison if URL does not match", function () {
        sessionStorage.setItem('csscriticFallbackFilter', 'someUrl');

        expect(fallbackFilter.isComparisonSelected(aComparison('someNotMatchingUrl'))).toBe(false);
    });

    it("should not filter if no selection stored", function () {
        expect(fallbackFilter.isComparisonSelected(aComparison('someUrl'))).toBe(true);
    });

    it("should filter selection matching by description", function () {
        sessionStorage.setItem('csscriticFallbackFilter', 'some description');

        expect(fallbackFilter.isComparisonSelected(aComparisonWithDescription('some description'))).toBe(true);
    });

    it("should filter selection matching by description and component", function () {
        sessionStorage.setItem('csscriticFallbackFilter', 'some component some description');

        expect(fallbackFilter.isComparisonSelected(aComparisonWithDescription('some description', 'some component'))).toBe(true);
    });

    it("should filter selection matching component only", function () {
        sessionStorage.setItem('csscriticFallbackFilter', 'some component');

        expect(fallbackFilter.isComparisonSelected(aComparisonWithDescription('some description', 'some component'))).toBe(true);
    });
});
