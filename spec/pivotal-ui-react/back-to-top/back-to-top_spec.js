require('../spec_helper');
var ScrollTop = require('../../../src/pivotal-ui-react/back-to-top/scroll-top');

describe('BackToTop', function() {
  var BackToTop;
  var originalGetScrollTop, originalSetScrollTop;
  var scrollTop;

  function triggerScroll() {
    var event = document.createEvent('Event');
    event.initEvent('scroll', false, false);
    window.dispatchEvent(event);
  }

  beforeEach(function() {
    scrollTop = 0;
    originalGetScrollTop = ScrollTop.getScrollTop;
    originalSetScrollTop = ScrollTop.setScrollTop;
    ScrollTop.getScrollTop = () => scrollTop || 0;
    ScrollTop.setScrollTop = (value) => scrollTop = value;
  });

  afterEach(function() {
    ScrollTop.getScrollTop = originalGetScrollTop;
    ScrollTop.setScrollTop = originalSetScrollTop;
  });

  beforeEach(function(done) {
    BackToTop = require('../../../src/pivotal-ui-react/back-to-top/back-to-top').BackToTop;
    ReactDOM.render(<BackToTop className="foo" id="bar" style={{fontSize: '200px'}}/>, root);

    jasmine.clock().uninstall();
    setTimeout(function() {
      jasmine.clock().install();
      ScrollTop.setScrollTop(500);
      triggerScroll();
      done();
    }, 0);
  });

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(root);
  });

  it('passes down the className, id, and style properties', () => {
    expect('.back-to-top').toHaveClass('foo');
    expect('.back-to-top').toHaveProp('id', 'bar');
    expect('.back-to-top').toHaveCss({'font-size': '200px'});
  });

  it('renders a back to top link that is visible', function() {
    expect('.back-to-top').toExist();
  });

  it('fades in the button', function() {
    expect('.back-to-top').toHaveCss({opacity: '0'});
    MockNow.tick(BackToTop.FADE_DURATION / 2);
    MockRaf.next();
    expect('.back-to-top').toHaveCss({opacity: '0.5'});
    MockNow.tick(BackToTop.FADE_DURATION / 2);
    MockRaf.next();
    expect('.back-to-top').toHaveCss({opacity: '1'});
  });

  describe('when the scroll top is less than 400', function() {
    beforeEach(function() {
      MockNow.tick(BackToTop.FADE_DURATION);
      MockRaf.next();
      expect('.back-to-top').toHaveCss({opacity: '1'});

      ScrollTop.setScrollTop(0);
      triggerScroll();
    });

    it('fades out the button', function() {
      expect('.back-to-top').toHaveCss({opacity: '1'});
      MockNow.tick(BackToTop.FADE_DURATION / 2);
      MockRaf.next();
      expect('.back-to-top').toHaveCss({opacity: '0.5'});
      MockNow.tick(BackToTop.FADE_DURATION / 2);
      MockRaf.next();
      expect('.back-to-top').toHaveCss({opacity: '0'});
    });
  });

  describe('when the back to top link is clicked', function() {
    beforeEach(function() {
      $('.back-to-top').simulate('click');
    });

    it('animates the body scroll to the top', function() {
      expect(ScrollTop.getScrollTop()).toEqual(500);
      MockNow.tick(BackToTop.SCROLL_DURATION / 2);
      MockRaf.next();
      expect(ScrollTop.getScrollTop()).toEqual(250);
      MockNow.tick(BackToTop.SCROLL_DURATION / 2);
      MockRaf.next();
      expect(ScrollTop.getScrollTop()).toEqual(0);
    });
  });
});
