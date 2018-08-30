import DomHelpers from '../../../src/react/helpers/dom-helpers';

describe('DomHelpers', () => {
  describe('findTabbableElements', () => {
    let el;

    beforeEach(() => {
      el = {
        querySelectorAll: jest.fn().mockName('querySelectorAll')
      };
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
        document = {
          createElement: jest.fn().mockName('createElement')
        };
        document.body = {
          appendChild: jest.fn().mockName('appendChild'),
          removeChild: jest.fn().mockName('removeChild')
        };
        document.createElement.mockReturnValue({offsetWidth: 100, clientWidth: 67, style: {}});
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
    let document, overflow, savedProperties;

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
      beforeEach(() => {
        document = {body: {style: {overflow: 'scroll'}}};
        overflow = DomHelpers.disableBodyScrolling(document);
      });

      it('updates the body overflow', () => {
        expect(document.body.style.overflow).toBe('hidden');
      });

      it('returns the original overflow from the body', () => {
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
      let overflow;

      beforeEach(() => {
        overflow = 'scroll';
        document = {body: {style: {overflow: 'hidden'}}};
        returnValue = DomHelpers.enableBodyScrolling({overflow, document});
      });

      it('restores the saved body overflow', () => {
        expect(document.body.style.overflow).toBe('scroll');
      });

      it('returns undefined', () => {
        expect(returnValue).toBeUndefined();
      });
    });
  });
});