import ScrollTop from '../../../src/react/back-to-top/scroll_top';

describe('ScrollTop', () => {
  describe('getScrollTop', () => {
    let result;

    describe('with an element', () => {
      let element;

      beforeEach(() => {
        element = {scrollTop: 1234};
        result = ScrollTop.getScrollTop(element, document);
      });

      it('returns the scrollTop of the element', () => {
        expect(result).toBe(1234);
      });
    });

    describe('without an element, with document.documentElement.scrollTop', () => {
      let document;

      beforeEach(() => {
        document = {body: {}, documentElement: {scrollTop: 7777}};
        result = ScrollTop.getScrollTop(null, document);
      });

      it('returns the scrollTop of the documentElement', () => {
        expect(result).toBe(7777);
      });
    });

    describe('without an element, with document.body.scrollTop', () => {
      let document;

      beforeEach(() => {
        document = {body: {scrollTop: 5555}, documentElement: {}};
        result = ScrollTop.getScrollTop(null, document);
      });

      it('returns the scrollTop of the body', () => {
        expect(result).toBe(5555);
      });
    });
  });

  describe('setScrollTop', () => {
    describe('with an element', () => {
      let element;

      beforeEach(() => {
        element = {scrollTop: 0};
        ScrollTop.setScrollTop(100, element, document);
      });

      it('sets the scrollTop of the element', () => {
        expect(element.scrollTop).toBe(100);
      });
    });

    describe('without an element', () => {
      let document;

      beforeEach(() => {
        document = {body: {scrollTop: 0}, documentElement: {scrollTop: 0}};
        ScrollTop.setScrollTop(200, null, document);
      });

      it('sets the scrollTop of the documentElement and body', () => {
        expect(document.body.scrollTop).toBe(200);
        expect(document.documentElement.scrollTop).toBe(200);
      });
    });
  });
});