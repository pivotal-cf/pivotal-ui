require('../spec_helper');

describe('BackToTop', function() {
  var BackToTop;
  beforeEach(function(done) {
    BackToTop = require('../../../src/pivotal-ui-react/back-to-top/back-to-top').BackToTop;
    React.render(<BackToTop/>, root);
    $(root).css({paddingBottom: '2000px'});

    jasmine.clock().uninstall();
    setTimeout(function() {
      jasmine.clock().install();
      $('body').scrollTop(500);
      window.dispatchEvent(new Event('scroll'));
      done();
    }, 0);
  });

  afterEach(function() {
    $('body').scrollTop(0);
  });

  afterEach(function() {
    React.unmountComponentAtNode(root);
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

      $('body').scrollTop(0);
      window.dispatchEvent(new Event('scroll'));
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
      expect(document.body.scrollTop).toEqual(500);
      MockNow.tick(BackToTop.SCROLL_DURATION / 2);
      MockRaf.next();
      expect(document.body.scrollTop).toEqual(250);
      MockNow.tick(BackToTop.SCROLL_DURATION / 2);
      MockRaf.next();
      expect(document.body.scrollTop).toEqual(0);
    });
  });
});

describe('BackToTopJquery', function() {
  beforeEach(function(done) {
    $.fx.off = true;
    require('../../../src/pivotal-ui-react/back-to-top/jquery-plugin');
    $(root).css({paddingBottom: '2000px'});

    $(root).append(
      $(`<a class="back-to-top" href="#"
            data-position="back-to-top"
            style="display: none"></a>`
      ));
    expect('.back-to-top').toHaveCss({display: 'none'});

    jasmine.clock().uninstall();
    setTimeout(function() {
      jasmine.clock().install();
      document.body.scrollTop = 500;
      $(window).scroll();
      done();
    }, 0);
  });

  afterEach(function() {
    $('body').scrollTop(0);
  });

  it('fades in the button when scrolling down', function() {
    expect('.back-to-top').toHaveCss({display: 'inline'});
  });

  describe('when the link is clicked', function() {
    beforeEach(function() {
      $('.back-to-top').click();
      //jasmine.clock().tick(5000);
    });

    it('scrolls to the top', function() {
      expect($(window).scrollTop()).toBe(0);
    });
  });
});
