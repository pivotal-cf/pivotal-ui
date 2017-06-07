import '../spec_helper';
import {Dropdown, DropdownItem} from 'pui-react-dropdowns';

describe('Dropdown', () => {
  let subject;

  beforeEach(() => {
    const props = {
      className: 'test-class',
      id: 'test-id',
      style: {opacity: '0.5'},
      title: 'Dropping',
      buttonClassName: 'test-btn-class',
      buttonAriaLabel: 'Nessun Dorma'
    };

    const itemProps = {href: 'test'};
    subject = ReactDOM.render(<Dropdown {...props}>
      <DropdownItem {...itemProps}>Item #1</DropdownItem>
    </Dropdown>, root);
  });

  it('passes through className, style, and id to the dropdown', () => {
    expect('.dropdown').toHaveClass('test-class');
    expect('.dropdown').toHaveCss({opacity: '0.5'});
    expect('.dropdown').toHaveAttr('id', 'test-id');
  });

  it('correctly styles the dropdown-toggle, and adds a chevron icon', () => {
    expect('.dropdown-toggle').toHaveText('Dropping');
    expect('.dropdown-toggle').toHaveClass('test-btn-class');
    expect('.dropdown-toggle').toHaveAttr('aria-haspopup', 'true');
    expect('.dropdown-toggle').toHaveAttr('aria-label', 'Nessun Dorma');

    expect('.icon-chevron_down').toExist();
  });

  describe('split dropdown', () => {
    let onSelectSpy;
    beforeEach(() => {
      onSelectSpy = jasmine.createSpy('on select');
      subject::setProps({
        labelAriaLabel: 'Nessun Dorma',
        href: 'default',
        split: true,
        onSelect: onSelectSpy,
        splitClassName: 'split-class'
      });
    });

    it('renders the dropdown label as an anchor with the provided href', () => {
      expect('.dropdown-label').toHaveAttr('href', 'default');
      expect('a.dropdown-label').toExist();
    });

    it('sets the labelAriaLabel as the dropdown label aria-label', () => {
      expect('.dropdown-label').toHaveAttr('aria-label', 'Nessun Dorma');
    });

    it('calls the onSelect callback on selecting the default option', () => {
      $('.dropdown-label').simulate('click');
      expect(onSelectSpy).toHaveBeenCalled();
    });

    it('correctly styles the dropdown-label', () => {
      expect('.dropdown-label').toHaveClass('split-class');
    });

    describe('when there is no href provided', () => {
      let onClickSpy, onSplitClickSpy;
      beforeEach(() => {
        onClickSpy = jasmine.createSpy('on click');
        onSplitClickSpy = jasmine.createSpy('on split click');
        subject::setProps({href: null, onClick: onClickSpy, onSplitClick: onSplitClickSpy});
      });

      it('opens the dropdown when the dropdown button is clicked', () => {
        $('.dropdown-toggle').simulate('click');
        expect(onClickSpy.toHaveBeenCalled);
        expect(subject.state.open).toBeTruthy();
      });

      it('does not open the dropdown when the split text is clicked', () => {
        $('.dropdown-label').simulate('click');
        expect(onSplitClickSpy.toHaveBeenCalled);
        expect(subject.state.open).toBeFalsy();
      });
    });
  });

  it('calls onClick when dropdown toggle is clicked', () => {
    const onClickSpy = jasmine.createSpy('onClick');
    subject::setProps({onClick: onClickSpy});
    $('.dropdown-toggle').simulate('click');
    expect(onClickSpy).toHaveBeenCalled();
  });

  it('calls onEntered when opening', () => {
    const onEnteredSpy = jasmine.createSpy('onEntered');
    subject::setProps({onEntered: onEnteredSpy});
    $('.dropdown-toggle').simulate('click');
    expect(onEnteredSpy).toHaveBeenCalled();
  });

  it('calls onExited when closing', () => {
    const onExitedSpy = jasmine.createSpy('onExited');
    subject::setProps({onExited: onExitedSpy});

    $('.dropdown-toggle').simulate('click');
    expect(onExitedSpy).not.toHaveBeenCalled();

    $('.dropdown-toggle').simulate('click');
    expect(onExitedSpy).toHaveBeenCalled();
  });

  it('does not render a scrim when not open', () => {
    expect('.scrim').not.toExist();
  });

  describe('dropdown menu', () => {
    it('shows the children on click', () => {
      expect('.dropdown-open').not.toExist();
      $('.dropdown-toggle').simulate('click');

      expect('.dropdown').toHaveClass('dropdown-open');
      expect('.dropdown-menu').toExist();
    });

    it('has an aria-label on the underlying ul', () => {
      $('.dropdown-toggle').simulate('click');
      expect('.dropdown-menu ul').toHaveAttr('aria-label', 'submenu');
    });

    describe('when floatMenu is in the props', () => {
      it('renders a floating menu', () => {
        subject::setProps({floatMenu: true});
        expect('.dropdown-menu').toHaveClass('dropdown-menu-float');
      });
    });

    describe('hiding children', () => {
      it('hides when the toggle is clicked', () => {
        $('.dropdown-toggle').simulate('click');
        $('.dropdown-toggle').simulate('click');
        expect('.dropdown-open').not.toExist();
      });

      it('hides when clicking outside the dropdown', () => {
        $('.dropdown-toggle').simulate('click');
        expect('.dropdown-open').toExist();
        $('.scrim').simulate('click');
        expect('.dropdown-open').not.toExist();
        expect('.scrim').not.toExist();
      });

      it('hides when a menu item is selected', () => {
        $('.dropdown-toggle').simulate('click');
        $('.dropdown-menu li:eq(0)').simulate('click');
        expect('.dropdown-open').not.toExist();
      });

      describe('when scrim is disabled', () => {
        it('does not hide the dropdown menu when clicking outside of the dropdown', () => {
          subject::setProps({disableScrim: true});
          $('.dropdown-toggle').simulate('click');
          expect('.scrim').not.toExist();
          expect('.dropdown-open').toExist();
        });
      });

      describe('when closeOnMenuClick is false', () => {
        it('does not close when the menu is clicked', () => {
          subject::setProps({closeOnMenuClick: false});
          $('.dropdown-toggle').simulate('click');
          $('.dropdown-menu li:eq(0)').simulate('click');
          expect('.dropdown-open').toExist();
        });
      });

      describe('when scroll is true', () => {
        it('renders a scrollable menu', () => {
          subject::setProps({scroll: true});
          $('.dropdown-toggle').simulate('click');
          expect('.dropdown-menu').toHaveClass('dropdown-menu-scroll');
        });
      });
    });

    describe('when border is provided', () => {
      it('has the border class', () => {
        subject::setProps({border: true});
        $('.dropdown-toggle').simulate('click');
        expect('.dropdown-menu').toHaveClass('dropdown-border');
      });
    });

    describe('when menuAlign is provided', () => {
      it('can align right', () => {
        subject::setProps({menuAlign: 'right'});
        $('.dropdown-toggle').simulate('click');
        expect('.dropdown-menu').toHaveClass('dropdown-menu-right');
      });

      it('can align left', () => {
        subject::setProps({menuAlign: 'left'});
        $('.dropdown-toggle').simulate('click');
        expect('.dropdown-menu').toHaveClass('dropdown-menu-left');
      });

      it('can align none', () => {
        subject::setProps({menuAlign: 'none'});
        $('.dropdown-toggle').simulate('click');
        expect('.dropdown-menu').not.toHaveClass('dropdown-menu-right');
        expect('.dropdown-menu').not.toHaveClass('dropdown-menu-left');
      });
    });
  });

  describe('when title is provided', () => {
    describe('when split is false', () => {
      it('puts the title in the dropdown toggle', () => {
        subject::setProps({split: false, title: 'Dropping'});
        expect('.dropdown-label').not.toExist();
        expect('.dropdown-toggle').toHaveText('Dropping');
      });
    });

    describe('when split is true', () => {
      it('puts the title in the dropdown label', () => {
        subject::setProps({split: true, title: 'Dropping'});
        expect('.dropdown-label').toHaveText('Dropping');
      });
    });
  });

  describe('when title is not provided and split is false', () => {
    it('renders an icon-only dropdown', () => {
      subject::setProps({split: false, title: null});
      expect('.dropdown-icon-only').toExist();
      expect('.dropdown-menu').toHaveClass('dropdown-menu-float');
    });
  });

  describe('when flat is set in the props', () => {
    it('renders the flat styled dropdown', () => {
      subject::setProps({flat: true});
      expect('.dropdown').toHaveClass('dropdown-flat');
    });
  });

  describe('when showIcon is false', () => {
    it('still renders an icon if there is not a title', () => {
      subject::setProps({showIcon: false, title: null});
      expect('.icon-chevron_down').toExist();
    });

    it('still renders an icon if the dropdown is a split dropdown', () => {
      subject::setProps({showIcon: false, split: true});

      expect('.icon-chevron_down').toExist();
    });

    it('does not render an icon otherwise', () => {
      subject::setProps({showIcon: false, title: 'List of Things'});

      expect('.icon').not.toExist();
      expect('.icon-chevron_down').not.toExist();
    });
  });

  describe('when link prop is true', () => {
    it('adds the dropdown-link class to make everything link colors', () => {
      subject::setProps({link: true});
      expect('.dropdown').toHaveClass('dropdown-link');
    });
  });

  describe('when size is provided', () => {
    it('can be large', () => {
      subject::setProps({size: 'large'});
      $('.dropdown-toggle').simulate('click');
      expect('.dropdown-lg').toExist();
    });

    it('can be normal', () => {
      subject::setProps({size: 'normal'});
      $('.dropdown-toggle').simulate('click');

      expect('.dropdown-sm').not.toExist();
      expect('.dropdown-lg').not.toExist();
    });

    it('can be small', () => {
      subject::setProps({size: 'small'});
      $('.dropdown-toggle').simulate('click');

      expect('.dropdown-sm').toExist();
    });
  });

  describe('when icon is provided', () => {
    it('renders the associated svg', () => {
      subject::setProps({icon: 'more_vert'});
      expect('.icon-more_vert').toExist();
    });
  });
});
