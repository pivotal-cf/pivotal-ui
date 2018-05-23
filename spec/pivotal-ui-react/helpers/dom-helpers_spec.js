import DomHelpers from '../../../src/react/helpers/dom-helpers';

describe('DomHelpers', () => {
  describe('findTabbableElements', () => {
    let el;

    beforeEach(() => {
      el = jasmine.createSpyObj('el', ['querySelectorAll']);
      DomHelpers.findTabbableElements(el);
    });

    it('queries for tabbable elements', () => {
      expect(el.querySelectorAll).toHaveBeenCalledWith('[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])');
    });

    it('returns a falsy value when given a falsy value', () => {
      expect(DomHelpers.findTabbableElements(null)).toBeFalsy();
    });
  });

  describe('getScrollbarWidth', () => {
    let document, scrollbarWidth;

    describe('when the document is undefined', () => {
      beforeEach(() => {
        document = undefined;
        scrollbarWidth = DomHelpers.getScrollbarWidth(document);
      });

      it('returns 0', () => {
        expect(scrollbarWidth).toBe(0);
      });
    });

    describe('when there is a document', () => {
      beforeEach(() => {
        document = jasmine.createSpyObj('document', ['createElement']);
        document.body = jasmine.createSpyObj('body', ['appendChild', 'removeChild']);
        document.createElement.and.returnValue({offsetWidth: 100, clientWidth: 67, style: {}});
        scrollbarWidth = DomHelpers.getScrollbarWidth(document);
      });

      it('creates a div element', () => {
        expect(document.createElement).toHaveBeenCalledWith('div');
      });

      it('appends the styled div to the body', () => {
        expect(document.body.appendChild).toHaveBeenCalledWith({
          offsetWidth: 100,
          clientWidth: 67,
          style: {
            width: '100px',
            height: '100px',
            overflow: 'scroll',
            position: 'absolute',
            top: '-9999px'
          }
        });
      });

      it('removes the styled div from the body', () => {
        expect(document.body.removeChild).toHaveBeenCalledWith({
          offsetWidth: 100,
          clientWidth: 67,
          style: {
            width: '100px',
            height: '100px',
            overflow: 'scroll',
            position: 'absolute',
            top: '-9999px'
          }
        });
      });

      it('returns the difference between the offsetWidth and the clientWidth', () => {
        expect(scrollbarWidth).toBe(33);
      });
    });
  });

  describe('disableBodyScrolling', () => {
    let document, overflow, paddingRight, savedProperties;

    describe('when the document is undefined', () => {
      beforeEach(() => {
        document = undefined;
        savedProperties = DomHelpers.disableBodyScrolling(document);
      });

      it('returns an empty object', () => {
        expect(savedProperties).toEqual({});
      });
    });

    describe('when there is a document', () => {
      let computedStyle;

      beforeEach(() => {
        spyOn(DomHelpers, 'getScrollbarWidth').and.returnValue('16px');
        computedStyle = jasmine.createSpyObj('computedStyle', ['getPropertyValue']);
        computedStyle.getPropertyValue.and.returnValue('8px');
        spyOn(window, 'getComputedStyle').and.returnValue(computedStyle);

        document = {body: {style: {paddingRight: '24px', overflow: 'scroll'}}};
        ({overflow, paddingRight} = DomHelpers.disableBodyScrolling(document));
      });

      it('gets the scrollbar width', () => {
        expect(DomHelpers.getScrollbarWidth).toHaveBeenCalledWith(document);
      });

      it('gets the computed right padding of the body', () => {
        expect(window.getComputedStyle).toHaveBeenCalledWith(document.body, null);
        expect(computedStyle.getPropertyValue).toHaveBeenCalledWith('padding-right');
      });

      it('updates the body right padding and overflow', () => {
        expect(document.body.style.paddingRight).toBe('24px');
        expect(document.body.style.overflow).toBe('hidden');
      });

      it('returns the original right padding and overflow from the body', () => {
        expect(paddingRight).toBe('24px');
        expect(overflow).toBe('scroll');
      });
    });
  });

  describe('enableBodyScrolling', () => {
    let document, returnValue;

    describe('when the document is undefined', () => {
      beforeEach(() => {
        document = undefined;
        returnValue = DomHelpers.enableBodyScrolling({document});
      });

      it('returns undefined without trying to update document', () => {
        expect(returnValue).toBeUndefined();
      });
    });

    describe('when there is a document', () => {
      let paddingRight, overflow;

      beforeEach(() => {
        paddingRight = '16px';
        overflow = 'scroll';
        document = {body: {style: {paddingRight: '32px', overflow: 'hidden'}}};
        returnValue = DomHelpers.enableBodyScrolling({paddingRight, overflow, document});
      });

      it('restores the saved body right padding and overflow', () => {
        expect(document.body.style.paddingRight).toBe('16px');
        expect(document.body.style.overflow).toBe('scroll');
      });

      it('returns undefined', () => {
        expect(returnValue).toBeUndefined();
      });
    });
  });
});