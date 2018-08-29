import '../spec_helper';
import {UIButton} from '../../../src/react/buttons';
import {Icon} from '../../../src/react/iconography';

describe('UIButton', () => {
  let subject;

  beforeEach(() => {
    subject = shallow(<UIButton>Click here</UIButton>);
  });

  it('creates a button', () => {
    expect(subject.find('button').hasClass('pui-btn')).toBeTruthy();
    expect(subject.find('button').hasClass('pui-btn-default')).toBeTruthy();
    expect(subject.find('button').text()).toBe('Click here');
  });

  describe('when href attribute is set', () => {
    beforeEach(() => {
      subject.setProps({href: 'http://example.com'});
    });

    it('creates a link', () => {
      expect(subject.find('a.pui-btn').prop('href')).toBe('http://example.com');
    });
  });

  describe('aria-label', () => {
    it('uses the button text for the aria-label value by default', () => {
      expect(subject.find('.pui-btn').prop('aria-label')).toBe('Click here');
    });

    describe('when the button contains icons', () => {
      beforeEach(() => {
        subject = shallow(<UIButton icon={<Icon src="add"/>}>Click<Icon src="more_vert"/>here</UIButton>);
      });

      it('ignores icons with the button text', () => {
        expect(subject.find('.pui-btn').prop('aria-label')).toBe('Click here');
      });
    });

    describe('when aria-label is specified', () => {
      beforeEach(() => {
        subject.setProps({'aria-label': 'my aria label'});
      });

      it('uses the supplied value', () => {
        expect(subject.find('.pui-btn').prop('aria-label')).toBe('my aria label');
      });
    });

    describe('when icon-only', () => {
      beforeEach(() => {
        subject.setProps({iconOnly: true});
      });

      it('has no aria-label attribute for icon-only buttons', () => {
        expect('.pui-btn').not.toHaveAttr('aria-label');
      });
    });

    describe('when no button content', () => {
      beforeEach(() => {
        subject = shallow(<UIButton/>);
      });

      it('has no aria-label attribute', () => {
        expect('.pui-btn').not.toHaveAttr('aria-label');
      });
    });
  });

  describe('type', () => {
    describe('for a link', () => {
      beforeEach(() => {
        subject.setProps({href: 'http://example.com'});
      });

      it('has no type attribute by default', () => {
        expect('a.pui-btn').not.toHaveAttr('type');
      });
    });

    describe('for a button', () => {
      it('has type button by default', () => {
        expect(subject.find('button.pui-btn').prop('type')).toBe('button');
      });
    });

    describe('when type attribute is supplied', () => {
      describe('for a link', () => {
        beforeEach(() => {
          subject.setProps({href: 'http://example.com', type: 'text/html'});
        });

        it('passes that value to the link', () => {
          expect(subject.find('a.pui-btn').prop('type')).toBe('text/html');
        });
      });

      describe('for a button', () => {
        beforeEach(() => {
          subject.setProps({type: 'submit'});
        });

        it('passes that value to the button', () => {
          expect(subject.find('button.pui-btn').prop('type')).toBe('submit');
        });
      });
    });
  });

  describe('when kind is default', () => {
    beforeEach(() => {
      subject.setProps({kind: 'default'});
    });

    it('adds the kind class to the button', () => {
      expect(subject.find('button.pui-btn').hasClass('pui-btn-default')).toBeTruthy();
    });
  });

  describe('when kind is danger', () => {
    beforeEach(() => {
      subject.setProps({kind: 'danger'});
    });

    it('adds the kind class to the button', () => {
      expect(subject.find('button.pui-btn').hasClass('pui-btn-danger')).toBeTruthy();
    });
  });

  describe('when kind is brand', () => {
    beforeEach(() => {
      subject.setProps({kind: 'brand'});
    });

    it('adds the kind class to the button', () => {
      expect(subject.find('button.pui-btn').hasClass('pui-btn-brand')).toBeTruthy();
    });
  });

  describe('when kind is primary', () => {
    beforeEach(() => {
      subject.setProps({kind: 'primary'});
    });

    it('adds the kind class to the button', () => {
      expect(subject.find('button.pui-btn').hasClass('pui-btn-primary')).toBeTruthy();
    });
  });

  describe('when large is true', () => {
    beforeEach(() => {
      subject.setProps({large: true});
    });

    it('adds the large button class', () => {
      expect(subject.find('button.pui-btn').hasClass('pui-btn-lg')).toBeTruthy();
    });
  });

  describe('when full width is true', () => {
    beforeEach(() => {
      subject.setProps({fullWidth: true});
    });

    it('adds the large button class', () => {
      expect(subject.find('button.pui-btn').hasClass('pui-btn-full')).toBeTruthy();
    });
  });

  describe('when small is true', () => {
    beforeEach(() => {
      subject.setProps({small: true});
    });

    it('adds the large button class', () => {
      expect(subject.find('button.pui-btn').hasClass('pui-btn-sm')).toBeTruthy();
    });
  });

  describe('when iconOnly is true', () => {
    beforeEach(() => {
      subject.setProps({iconOnly: true});
    });

    it('adds the large button class', () => {
      expect(subject.find('button.pui-btn').hasClass('pui-btn-icon')).toBeTruthy();
    });
  });

  describe('when alt is true', () => {
    beforeEach(() => {
      subject.setProps({alt: true});
    });

    describe('when kind is default', () => {
      beforeEach(() => {
        subject.setProps({kind: 'default'});
      });

      it('adds appropriate alt class to the button', () => {
        expect(subject.find('button.pui-btn').hasClass('pui-btn-default-alt')).toBeTruthy();
      });
    });

    describe('when kind is danger', () => {
      beforeEach(() => {
        subject.setProps({kind: 'danger'});
      });

      it('adds appropriate alt class to the button', () => {
        expect(subject.find('button.pui-btn').hasClass('pui-btn-danger-alt')).toBeTruthy();
      });
    });

    describe('when kind is brand', () => {
      beforeEach(() => {
        subject.setProps({kind: 'brand'});
      });

      it('adds appropriate alt class to the button', () => {
        expect(subject.find('button.pui-btn').hasClass('pui-btn-brand-alt')).toBeTruthy();
      });
    });

    describe('when kind is primary', () => {
      beforeEach(() => {
        subject.setProps({kind: 'primary'});
      });

      it('adds appropriate alt class to the button', () => {
        expect(subject.find('button.pui-btn').hasClass('pui-btn-primary-alt')).toBeTruthy();
      });
    });
  });

  describe('when flat is true', () => {
    beforeEach(() => {
      subject.setProps({flat: true});
    });

    describe('when kind is default', () => {
      beforeEach(() => {
        subject.setProps({kind: 'default'});
      });

      it('adds appropriate flat class to the button', () => {
        expect(subject.find('button.pui-btn').hasClass('pui-btn-default-flat')).toBeTruthy();
      });
    });

    describe('when kind is danger', () => {
      beforeEach(() => {
        subject.setProps({kind: 'danger'});
      });

      it('adds appropriate flat class to the button', () => {
        expect(subject.find('button.pui-btn').hasClass('pui-btn-danger-flat')).toBeTruthy();
      });
    });

    describe('when kind is brand', () => {
      beforeEach(() => {
        subject.setProps({kind: 'brand'});
      });

      it('adds appropriate flat class to the button', () => {
        expect(subject.find('button.pui-btn').hasClass('pui-btn-brand-flat')).toBeTruthy();
      });
    });

    describe('when kind is primary', () => {
      beforeEach(() => {
        subject.setProps({kind: 'primary'});
      });

      it('adds appropriate flat class to the button', () => {
        expect(subject.find('button.pui-btn').hasClass('pui-btn-primary-flat')).toBeTruthy();
      });
    });
  });

  describe('when given a className', () => {
    beforeEach(() => {
      subject.setProps({className: 'custom-class-1 custom-class-2'});
    });

    it('passes custom classNames through', () => {
      expect(subject.find('button').hasClass('custom-class-1')).toBeTruthy();
      expect(subject.find('button').hasClass('custom-class-2')).toBeTruthy();
    });
  });

  describe('when given data attributes', () => {
    beforeEach(() => {
      subject.setProps({'data-click': 'myFunction', 'data-foo': 'bar'});
    });

    it('passes through the data-attributes', () => {
      expect(subject.find('button').prop('data-click')).toBe('myFunction');
      expect(subject.find('button').prop('data-foo')).toBe('bar');
    });
  });

  describe('icon property', () => {
    beforeEach(() => {
      subject.setProps({icon: <Icon src="add"/>});
    });

    it('renders with an icon child node if one is passed in', () => {
      expect(subject.find('button.pui-btn span .icon').exists()).toBeTruthy();
    });
  });

  describe('iconPosition', () => {
    beforeEach(() => {
      subject.setProps({icon: <Icon src="spinner-sm"/>});
    });

    it('renders the icon to the left by default', () => {
      expect($('.icon').next().prop('tagName')).toEqual('SPAN');
    });

    describe('is set to left', () => {
      beforeEach(() => {
        subject.setProps({iconPosition: 'left'});
      });

      it('renders the icon to the left', () => {
        expect($('.icon').next().prop('tagName')).toEqual('SPAN');
      });
    });

    describe('is set right', () => {
      beforeEach(() => {
        subject.setProps({iconPosition: 'right'});
      });

      it('renders the icon to the right', () => {
        expect($('.icon').prev().prop('tagName')).toEqual('SPAN');
      });
    });
  });
});
