require('../spec_helper');

describe('MediaSize', () => {
  describe('.matches', () => {
    let MediaSize;

    beforeEach(() => {
      MediaSize = require('../../../src/pivotal-ui-react/tabs/media-size');

      spyOn(window, 'matchMedia');
    });

    it('returns the result of the media query', () => {
      window.matchMedia.and.returnValue({matches: true});
      expect(MediaSize.matches('sm')).toBe(true);

      window.matchMedia.and.returnValue({matches: false});
      expect(MediaSize.matches('sm')).toBe(false);
    });

    describe('screen sizes', () => {
      beforeEach(() => {
        window.matchMedia.and.returnValue({matches: true});
      });

      it('xs = min-width of 0', () => {
        MediaSize.matches('xs');
        expect(window.matchMedia).toHaveBeenCalledWith('(min-width: 0px)');
      });

      it('sm = min-width of 768', () => {
        MediaSize.matches('sm');
        expect(window.matchMedia).toHaveBeenCalledWith('(min-width: 768px)');
      });

      it('md = min-width of 992', () => {
        MediaSize.matches('md');
        expect(window.matchMedia).toHaveBeenCalledWith('(min-width: 992px)');
      });

      it('lg = min-width of 1200', () => {
        MediaSize.matches('lg');
        expect(window.matchMedia).toHaveBeenCalledWith('(min-width: 1200px)');
      });

      it('xl = min-width of 1800', () => {
        MediaSize.matches('xl');
        expect(window.matchMedia).toHaveBeenCalledWith('(min-width: 1800px)');
      });
    });
  });
});
