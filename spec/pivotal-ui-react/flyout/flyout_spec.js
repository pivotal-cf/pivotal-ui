import '../spec_helper';
import {Flyout} from '../../../src/react/flyout';

describe('Flyout', () => {
  let close, children, header, subject;

  beforeEach(() => {
    close = jasmine.createSpy('close');
    children = (<div>some-flyout-body</div>);
    header = (<div>some-flyout-header</div>);
    subject = ReactDOM.render((
      <Flyout {...{close, children, header}}/>
    ), root);
  });

  it('renders the flyout', () => {
    expect('.flyout').toExist();
  });

  it('renders the flyout without the flyout-open class', () => {
    expect('.flyout').not.toHaveClass('flyout-open');
  });

  it('renders the children', () => {
    expect('.flyout .flyout-body').toHaveText('some-flyout-body');
  });

  describe('open prop', () => {
    beforeEach(() => {
      subject::setProps({open: true});
    });

    it('renders the flyout with the flyout-open class', () => {
      expect('.flyout').toHaveClass('flyout-open');
    });
  });

  describe('width prop (px)', () => {
    beforeEach(() => {
      subject::setProps({width: '100px'});
    });

    it('renders the flyout with the given width', () => {
      expect('.flyout .flyout-content').toHaveAttr('style', 'width: 100px; right: -80px;');
    });
  });

  describe('width prop (%)', () => {
    beforeEach(() => {
      subject::setProps({width: '50%'});
    });

    it('renders the flyout with the given width', () => {
      expect('.flyout .flyout-content').toHaveAttr('style', 'width: 50%; right: -40%;');
    });
  });

  describe('scrim', () => {
    beforeEach(() => {
      $('.flyout').simulate('click');
    });

    describe('clicking the scrim', () => {
      it('does not close the flyout', () => {
        expect(close).not.toHaveBeenCalled();
      });
    });
  });

  describe('header', () => {
    it('renders a close button', () => {
      expect('.flyout-header.grid > .col.col-fixed .pui-btn.pui-btn-default-flat.pui-btn-icon .icon.icon-middle .icon-close').toHaveText('');
    });

    describe('when clicking the close button', () => {
      beforeEach(() => {
        $('.flyout-close').simulate('click');
      });

      it('calls the close callback', () => {
        expect(close).toHaveBeenCalledWith();
      });
    });

    it('renders a header', () => {
      expect('.flyout-header .col:eq(1)').toHaveText('some-flyout-header');
    });

    describe('when an icon src is provided', () => {
      let iconSrc;
      beforeEach(() => {
        iconSrc = 'arrow_back';
        subject::setProps({iconSrc});
      });

      it('renders that icon instead of the close icon', () => {
        expect(`.flyout-header.grid > .col.col-fixed .pui-btn.pui-btn-default-flat.pui-btn-icon .icon.icon-middle .icon-${iconSrc}`).toHaveText('');
      });
    });
  });

  describe('when unmounting', () => {
    beforeEach(() => {
      ReactDOM.unmountComponentAtNode(root);
    });

    it('calls the close callback', () => {
      expect(close).toHaveBeenCalledWith();
    });
  });
});