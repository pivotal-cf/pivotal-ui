import '../spec_helper';
import Anchor from '../../src/components/anchor';
import Router from '../../src/helpers/router';

describe('Anchor', () => {
  let href, className, id, target, preventDefault, subject;

  beforeEach(() => {
    href = '/alerts/examples';
    className = 'test-anchor';
    id = 'test-anchor-id';
    target = '_blank';
    spyOn(Router, 'navigate');
    preventDefault = jasmine.createSpy('preventDefault');
    subject = ReactDOM.render(
      <Anchor {...{href, id, target, className}}>link text</Anchor>,
      root
    );
  });

  it('renders an anchor tag', () => {
    expect('a.test-anchor').toHaveAttr('href', '/alerts/examples');
    expect('a.test-anchor').toHaveAttr('id', 'test-anchor-id');
    expect('a.test-anchor').toHaveAttr('target', '_blank');
    expect('a.test-anchor').toHaveText('link text');
  });

  describe('when clicked', () => {
    beforeEach(() => {
      $('a.test-anchor').simulate('click', {preventDefault});
    });

    it('prevents default on click event', () => {
      expect(preventDefault).toHaveBeenCalledWith();
    });

    it('navigates with router', () => {
      expect(Router.navigate).toHaveBeenCalledWith('/alerts/examples');
    });
  });

  describe('when the link is external', () => {
    beforeEach(() => {
      subject::setProps({href: 'https://example.com'});
    });

    it('renders an anchor tag', () => {
      expect('a.test-anchor').toHaveAttr('href', 'https://example.com');
      expect('a.test-anchor').toHaveAttr('id', 'test-anchor-id');
      expect('a.test-anchor').toHaveAttr('target', '_blank');
      expect('a.test-anchor').toHaveText('link text');
    });

    describe('when clicked', () => {
      beforeEach(() => {
        $('a.test-anchor').simulate('click', {preventDefault});
      });

      it('does not prevent default on click event', () => {
        expect(preventDefault).not.toHaveBeenCalled();
      });

      it('does not navigate with router', () => {
        expect(Router.navigate).not.toHaveBeenCalled();
      });
    });
  });

  describe('when the link is to /static', () => {
    beforeEach(() => {
      subject::setProps({href: '/static/versions/12'});
    });

    it('renders an anchor tag', () => {
      expect('a.test-anchor').toHaveAttr('href', '/static/versions/12');
      expect('a.test-anchor').toHaveAttr('id', 'test-anchor-id');
      expect('a.test-anchor').toHaveAttr('target', '_blank');
      expect('a.test-anchor').toHaveText('link text');
    });

    describe('when clicked', () => {
      beforeEach(() => {
        $('a.test-anchor').simulate('click', {preventDefault});
      });

      it('does not prevent default on click event', () => {
        expect(preventDefault).not.toHaveBeenCalled();
      });

      it('does not navigate with router', () => {
        expect(Router.navigate).not.toHaveBeenCalled();
      });
    });
  });
});