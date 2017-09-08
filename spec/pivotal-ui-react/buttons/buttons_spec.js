import '../spec_helper';
import {UIButton} from '../../../src/react/buttons';

import {Icon} from '../../../src/react/iconography';

describe('UIButton', () => {
  let subject;
  const renderComponent = props => ReactDOM.render(<UIButton {...props}>Click here</UIButton>, root);

  it('creates a button', () => {
    subject = renderComponent();
    const button = ReactTestUtils.findRenderedDOMComponentWithTag(subject, 'button');

    expect(button).toHaveClass('btn');
    expect(button).toHaveClass('btn-default');
    expect(button).toHaveText('Click here');
  });

  describe('when href attribute is set', () => {
    it('creates a link', () => {
      subject = renderComponent({href: 'http://example.com'});
      const button = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'btn');

      expect(button).toHaveAttr('href', 'http://example.com');
    });
  });

  describe('aria-label', () => {
    describe('when aria-label is specified', () => {
      it('uses the supplied value', () => {
        subject = renderComponent({'aria-label': 'my aria label'});
        const button = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'btn');

        expect(button).toHaveAttr('aria-label', 'my aria label');
      });
    });

    describe('when aria-label is NOT specified', () => {
      it('uses the button text for the aria-label value', () => {
        subject = renderComponent();
        const button = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'btn');

        expect(button).toHaveAttr('aria-label', 'Click here');
      });

      it('ignores icons with the button text', () => {
        subject = ReactDOM.render(<UIButton icon={<Icon src="add"/>}>Click<Icon src="more_vert"/>here</UIButton>, root);
        const button = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'btn');

        expect(button).toHaveAttr('aria-label', 'Click here');
      });

      it('has no aria-label attribute for icon-only buttons', () => {
        subject = renderComponent({iconOnly: true});
        const button = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'btn');

        expect(button).not.toHaveAttr('aria-label');
      });

      it('has no aria-label attribute for empty string buttons', () => {
        subject = ReactDOM.render(<UIButton/>, root);
        const button = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'btn');

        expect(button).not.toHaveAttr('aria-label');
      });
    });
  });

  describe('type', () => {
    describe('when type attribute is supplied', () => {
      it('passes that value to a link', () => {
        subject = renderComponent({href: 'http://example.com', type: 'text/html'});
        const button = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'btn');

        expect(button).toHaveAttr('type', 'text/html');
      });

      it('passes that value to a button', () => {
        subject = renderComponent({type: 'submit'});
        const button = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'btn');

        expect(button).toHaveAttr('type', 'submit');
      });
    });

    describe('when type attribute is not supplied', () => {
      describe('for a link', () => {
        it('has no type attribute', () => {
          subject = renderComponent({href: 'http://example.com'});
          const button = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'btn');

          expect(button).not.toHaveAttr('type');
        });
      });

      describe('for a button', () => {
        it('has type button', () => {
          subject = renderComponent();
          const button = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'btn');

          expect(button).toHaveAttr('type', 'button');
        });
      });
    });
  });

  describe('when kind attribute is set', () => {
    it('adds the type class to the button', () => {
      let button;
      ['default', 'danger', 'brand', 'primary'].forEach(kind => {
        subject = renderComponent({kind});
        button = ReactTestUtils.findRenderedDOMComponentWithTag(subject, 'button');

        expect(button.className).toEqual(`btn btn-${kind}`);
      });
    });
  });

  describe('when large is true', () => {
    it('adds the large button class', () => {
      subject = renderComponent({large: true});
      const button = ReactTestUtils.findRenderedDOMComponentWithTag(subject, 'button');

      expect(button).toHaveClass('btn-lg');
    });
  });

  describe('when full width is true', () => {
    it('adds the full width class', () => {
      subject = renderComponent({fullWidth: true});
      const button = ReactTestUtils.findRenderedDOMComponentWithTag(subject, 'button');

      expect(button).toHaveClass('btn-full');
    });
  });

  describe('when small is true', () => {
    it('adds the small button class', () => {
      subject = renderComponent({small: true});
      const button = ReactTestUtils.findRenderedDOMComponentWithTag(subject, 'button');

      expect(button).toHaveClass('btn-sm');
    });
  });

  describe('when iconOnly is true', () => {
    it('adds the btn-icon class', () => {
      subject = renderComponent({iconOnly: true});
      const button = ReactTestUtils.findRenderedDOMComponentWithTag(subject, 'button');

      expect(button).toHaveClass('btn-icon');
    });
  });

  describe('when alt is true', () => {
    it('adds the appropriate alt class', () => {
      let button;
      ['default', 'danger', 'brand', 'primary'].forEach(kind => {
        subject = renderComponent({kind, alt: true});
        button = ReactTestUtils.findRenderedDOMComponentWithTag(subject, 'button');

        expect(button).toHaveClass(`btn-${kind}-alt`);
      });
    });
  });

  describe('when flat is true', () => {
    it('adds the appropriate flat class', () => {
      let button;
      ['default', 'danger', 'brand', 'primary'].forEach(kind => {
        subject = renderComponent({kind, flat: true});
        button = ReactTestUtils.findRenderedDOMComponentWithTag(subject, 'button');

        expect(button).toHaveClass(`btn-${kind}-flat`);
      });
    });
  });

  it('passes custom classNames through', () => {
    subject = renderComponent({className: 'custom-class-1 custom-class-2'});
    const button = ReactTestUtils.findRenderedDOMComponentWithTag(subject, 'button');

    expect(button).toHaveClass('custom-class-1');
    expect(button).toHaveClass('custom-class-2');
  });

  it('passes through the data-attributes', () => {
    subject = renderComponent({'data-click': 'myFunction', 'data-foo': 'bar'});
    const button = ReactTestUtils.findRenderedDOMComponentWithTag(subject, 'button');

    expect(button).toHaveAttr('data-click', 'myFunction');
    expect(button).toHaveAttr('data-foo', 'bar');
  });

  describe('icon property', () => {
    it('renders with an icon child node if one is passed in', () => {
      subject = renderComponent({
        icon: <Icon src="add"/>
      });
      const icon = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'icon');
      expect(icon.parentNode.tagName).toEqual('SPAN');
      expect(icon.parentNode.parentNode.tagName).toEqual('BUTTON');
    });
  });

  describe('iconPosition', () => {
    describe('is not set', () => {
      it('renders the icon to the left', () => {
        subject = renderComponent({icon: <Icon src="spinner_icon"/>});
        const icon = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'icon');
        expect(icon.nextSibling.tagName).toEqual('SPAN');
      });
    });

    describe('is set to left', () => {
      it('renders the icon to the left', () => {
        subject = renderComponent({icon: <Icon src="spinner_icon"/>});
        const icon = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'icon');
        expect(icon.nextSibling.tagName).toEqual('SPAN');
      });
    });

    describe('is set right', () => {
      it('renders the icon to the right', () => {
        subject = renderComponent({icon: <Icon src="spinner_icon"/>, iconPosition: 'right'});
        const icon = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'icon');
        expect(icon.previousSibling.tagName).toEqual('SPAN');
      });
    });

  });
});
