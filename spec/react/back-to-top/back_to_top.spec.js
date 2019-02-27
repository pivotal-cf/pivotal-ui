import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {BackToTop} from '../../../src/react/back-to-top';
import ScrollTop from '../../../src/react/back-to-top/scroll_top';

const mockGetScrollTop = jest.fn(() => 0);
const mockGetOpacity = jest.fn(() => 0);

jest.mock('../../../src/react/mixins/mixins/animation_mixin',
  () => ParentClass => class MockAnimation extends ParentClass {
    animate(property) {
      if (property === 'opacity') return mockGetOpacity();
      return mockGetScrollTop();
    }
  }
);

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

    beforeEach(() => {
      spyOn(window, 'addEventListener').and.callThrough();
      spyOn(window, 'removeEventListener').and.callThrough();
      subject = ReactDOM.render(<BackToTop className="foo" id="bar" style={{fontSize: '200px'}}/>, root);

      ScrollTop.setScrollTop(500);
      triggerScroll();
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

      mockGetOpacity.mockReturnValue(0.5);
      subject.forceUpdate();

      expect('.pui-back-to-top').toHaveStyle({display: 'inline', opacity: 0.5, 'font-size': '200px'});

      mockGetOpacity.mockReturnValue(1);
      subject.forceUpdate();

      expect('.pui-back-to-top').toHaveStyle({display: 'inline', opacity: 1, 'font-size': '200px'});
    });

    it('removes an event listener from the window', () => {
      ReactDOM.unmountComponentAtNode(root);
      expect(window.removeEventListener).toHaveBeenCalledWith('scroll', subject.updateScroll);
    });

    describe('when the scroll top is less than 400', () => {
      beforeEach(() => {
        expect('.pui-back-to-top').toHaveStyle({display: 'inline', opacity: 1, 'font-size': '200px'});

        ScrollTop.setScrollTop(0);
        triggerScroll();
      });

      it('fades out the button', () => {
        expect('.pui-back-to-top').toHaveStyle({display: 'inline', opacity: 1, 'font-size': '200px'});

        mockGetOpacity.mockReturnValue(0.5);
        subject.forceUpdate();

        expect('.pui-back-to-top').toHaveStyle({display: 'inline', opacity: 0.5, 'font-size': '200px'});

        mockGetOpacity.mockReturnValue(0);
        subject.forceUpdate();

        expect('.pui-back-to-top').toHaveStyle({display: 'inline', opacity: 0, 'font-size': '200px'});
      });
    });

    describe('when the back to top link is clicked', () => {
      beforeEach(() => {
        mockGetScrollTop.mockReturnValue(500);
        $('.pui-back-to-top').simulate('click');
      });

      it('animates the body scroll to the top', () => {
        expect(ScrollTop.getScrollTop()).toEqual(500);

        mockGetScrollTop.mockReturnValue(62.5);
        subject.forceUpdate();

        expect(ScrollTop.getScrollTop()).toEqual(62.5);

        mockGetScrollTop.mockReturnValue(0);
        subject.forceUpdate();

        expect(ScrollTop.getScrollTop()).toEqual(0);
      });

      it('calls getScrollTop', () => {
        expect(ScrollTop.getScrollTop).toHaveBeenCalledWith(undefined, document);
      });

      it('calls setScrollTop', () => {
        expect(ScrollTop.setScrollTop).toHaveBeenCalledWith(500, undefined, document);

        mockGetScrollTop.mockReturnValue(62.5);
        subject.forceUpdate();

        expect(ScrollTop.setScrollTop).toHaveBeenCalledWith(62.5, undefined, document);

        mockGetScrollTop.mockReturnValue(0);
        subject.forceUpdate();

        expect(ScrollTop.setScrollTop).toHaveBeenCalledWith(0, undefined, document);
      });
    });
  });

  describe('with a scrollableId', () => {
    let scrollableId, element, updateScroll, subject;

    beforeEach(() => {
      scrollableId = 'scrollable';
      element = {addEventListener: jest.fn(), removeEventListener: jest.fn()};
      spyOn(document, 'getElementById').and.returnValue(element);
      ReactDOM.render(<div id={scrollableId} style={{height: '100px', maxHeight: '100px', overflowY: 'scroll'}}>
        <div {...{height: '500px'}}/>
        <BackToTop {...{
          ref: el => {
            subject = el;
            if (el) updateScroll = el.updateScroll;
          },
          className: 'foo',
          id: 'bar',
          style: {fontSize: '500px'}, scrollableId
        }}/>
      </div>, root);

      ScrollTop.setScrollTop(100, scrollableId);
      triggerScroll();
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
        mockGetScrollTop.mockReturnValue(100);
        $('.pui-back-to-top').simulate('click');
      });

      it('calls getScrollTop', () => {
        expect(ScrollTop.getScrollTop).toHaveBeenCalledWith(element, document);
      });

      it('calls setScrollTop', () => {
        expect(ScrollTop.setScrollTop).toHaveBeenCalledWith(100, element, document);

        mockGetScrollTop.mockReturnValue(12.5);
        subject.forceUpdate();

        expect(ScrollTop.setScrollTop).toHaveBeenCalledWith(12.5, element, document);

        mockGetScrollTop.mockReturnValue(0);
        subject.forceUpdate();

        expect(ScrollTop.setScrollTop).toHaveBeenCalledWith(0, element, document);
      });

      it('animates the body scroll to the top', () => {
        expect(scrollTop).toEqual(100);

        mockGetScrollTop.mockReturnValue(12.5);
        subject.forceUpdate();

        expect(scrollTop).toEqual(12.5);

        mockGetScrollTop.mockReturnValue(0);
        subject.forceUpdate();

        expect(scrollTop).toEqual(0);
      });
    });
  });
});
