import '../spec_helper';
import {BackToTop} from '../../../src/react/back-to-top';
import ScrollTop from '../../../src/react/back-to-top/scroll-top';

describe('BackToTop', () => {
  let scrollTop;

  const triggerScroll = () => {
    const event = document.createEvent('Event');
    event.initEvent('scroll', false, false);
    window.dispatchEvent(event);
  };

  beforeEach(() => {
    scrollTop = 0;
    spyOn(ScrollTop, 'getScrollTop').and.callFake(() => scrollTop || 0);
    spyOn(ScrollTop, 'setScrollTop').and.callFake(value => scrollTop = value);
  });

  describe('without scrollableId', () => {
    let subject;

    beforeEach(done => {
      spyOn(window, 'addEventListener').and.callThrough();
      spyOn(window, 'removeEventListener').and.callThrough();
      subject = ReactDOM.render(<BackToTop className="foo" id="bar" style={{fontSize: '200px'}}/>, root);

      jasmine.clock().uninstall();
      setTimeout(() => {
        jasmine.clock().install();
        ScrollTop.setScrollTop(500);
        triggerScroll();
        done();
      }, 0);
    });

    it('adds an event listener to the window', () => {
      expect(window.addEventListener).toHaveBeenCalledWith('scroll', subject.updateScroll);
    });

    it('passes down the className, id, and style properties', () => {
      expect('.pui-back-to-top').toHaveClass('foo');
      expect('.pui-back-to-top').toHaveProp('id', 'bar');
      expect('.pui-back-to-top').toHaveCss({'font-size': '200px'});
    });

    it('renders a back to top link that is visible', () => {
      expect('.pui-back-to-top').toExist();
    });

    it('renders a arrow upward icon', () => {
      expect('svg.icon-arrow_upward').toExist();
    });

    it('fades in the button', () => {
      expect('.pui-back-to-top').toHaveStyle({display: 'inline', opacity: 0, 'font-size': '200px'});
      MockNow.tick(BackToTop.FADE_DURATION / 2);
      MockRaf.next();
      expect('.pui-back-to-top').toHaveStyle({display: 'inline', opacity: 0.5, 'font-size': '200px'});
      MockNow.tick(BackToTop.FADE_DURATION / 2);
      MockRaf.next();
      expect('.pui-back-to-top').toHaveStyle({display: 'inline', opacity: 1, 'font-size': '200px'});
    });

    it('removes an event listener from the window', () => {
      ReactDOM.unmountComponentAtNode(root);
      expect(window.removeEventListener).toHaveBeenCalledWith('scroll', subject.updateScroll);
    });

    describe('when the scroll top is less than 400', () => {
      beforeEach(() => {
        MockNow.tick(BackToTop.FADE_DURATION);
        MockRaf.next();
        expect('.pui-back-to-top').toHaveStyle({display: 'inline', opacity: 1, 'font-size': '200px'});

        ScrollTop.setScrollTop(0);
        triggerScroll();
      });

      it('fades out the button', () => {
        expect('.pui-back-to-top').toHaveStyle({display: 'inline', opacity: 1, 'font-size': '200px'});
        MockNow.tick(BackToTop.FADE_DURATION / 2);
        MockRaf.next();
        expect('.pui-back-to-top').toHaveStyle({display: 'inline', opacity: 0.5, 'font-size': '200px'});
        MockNow.tick(BackToTop.FADE_DURATION / 2);
        MockRaf.next();
        expect('.pui-back-to-top').toHaveStyle({display: 'inline', opacity: 0, 'font-size': '200px'});
      });
    });

    describe('when the back to top link is clicked', () => {
      beforeEach(() => {
        $('.pui-back-to-top').simulate('click');
      });

      it('animates the body scroll to the top', () => {
        expect(ScrollTop.getScrollTop()).toEqual(500);
        MockNow.tick(BackToTop.SCROLL_DURATION / 2);
        MockRaf.next();
        expect(ScrollTop.getScrollTop()).toEqual(62.5);
        MockNow.tick(BackToTop.SCROLL_DURATION / 2);
        MockRaf.next();
        expect(ScrollTop.getScrollTop()).toEqual(0);
      });

      it('calls getScrollTop', () => {
        expect(ScrollTop.getScrollTop).toHaveBeenCalledWith(undefined, document);
      });

      it('calls setScrollTop', () => {
        expect(ScrollTop.setScrollTop).toHaveBeenCalledWith(500, undefined, document);
        MockNow.tick(BackToTop.SCROLL_DURATION / 2);
        MockRaf.next();
        expect(ScrollTop.setScrollTop).toHaveBeenCalledWith(62.5, undefined, document);
        MockNow.tick(BackToTop.SCROLL_DURATION / 2);
        MockRaf.next();
        expect(ScrollTop.setScrollTop).toHaveBeenCalledWith(0, undefined, document);
      });
    });
  });

  describe('with a scrollableId', () => {
    let scrollableId, element, updateScroll;

    beforeEach(done => {
      scrollableId = 'scrollable';
      element = jasmine.createSpyObj('element', ['addEventListener', 'removeEventListener']);
      spyOn(document, 'getElementById').and.returnValue(element);
      ReactDOM.render(<div id={scrollableId} style={{height: '100px', maxHeight: '100px', overflowY: 'scroll'}}>
        <div {...{height: '500px'}}/>
        <BackToTop {...{
          ref: el => {
            if (el) updateScroll = el.updateScroll;
          },
          className: 'foo',
          id: 'bar',
          style: {fontSize: '500px'}, scrollableId
        }}/>
      </div>, root);

      jasmine.clock().uninstall();
      setTimeout(() => {
        jasmine.clock().install();
        ScrollTop.setScrollTop(100, scrollableId);
        triggerScroll();
        done();
      }, 0);
    });

    it('adds an event listener to the element', () => {
      expect(element.addEventListener).toHaveBeenCalledWith('scroll', updateScroll);
    });

    it('removes an event listener from the window', () => {
      ReactDOM.unmountComponentAtNode(root);
      expect(element.removeEventListener).toHaveBeenCalledWith('scroll', updateScroll);
    });

    describe('when the back to top link is clicked', () => {
      beforeEach(() => {
        $('.pui-back-to-top').simulate('click');
      });

      it('calls getScrollTop', () => {
        expect(ScrollTop.getScrollTop).toHaveBeenCalledWith(element, document);
      });

      it('calls setScrollTop', () => {
        expect(ScrollTop.setScrollTop).toHaveBeenCalledWith(100, element, document);
        MockNow.tick(BackToTop.SCROLL_DURATION / 2);
        MockRaf.next();
        expect(ScrollTop.setScrollTop).toHaveBeenCalledWith(12.5, element, document);
        MockNow.tick(BackToTop.SCROLL_DURATION / 2);
        MockRaf.next();
        expect(ScrollTop.setScrollTop).toHaveBeenCalledWith(0, element, document);
      });

      it('animates the body scroll to the top', () => {
        expect(scrollTop).toEqual(100);
        MockNow.tick(BackToTop.SCROLL_DURATION / 2);
        MockRaf.next();
        expect(scrollTop).toEqual(12.5);
        MockNow.tick(BackToTop.SCROLL_DURATION / 2);
        MockRaf.next();
        expect(scrollTop).toEqual(0);
      });
    });
  });
});
