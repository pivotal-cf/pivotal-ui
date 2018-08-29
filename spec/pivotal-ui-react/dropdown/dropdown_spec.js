import '../spec_helper';
import {Dropdown} from '../../../src/react/dropdowns';

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

    subject = shallow(<Dropdown {...props}>
      <a {...{href: 'test'}}>Item #1</a>
    </Dropdown>);
  });

  it('passes through className, style, and id to the dropdown', () => {
    expect(subject.find('.dropdown').hasClass('test-class')).toBeTruthy();
    expect(subject.find('.dropdown').prop('style')).toEqual({opacity: '0.5'});
    expect(subject.find('.dropdown').prop('id')).toBe('test-id');
  });

  it('correctly styles the dropdown-toggle, and adds a chevron icon', () => {
    expect(subject.find('.dropdown button').text()).toBe('Dropping');
    expect(subject.find('.dropdown button').hasClass('test-btn-class')).toBeTruthy();
    expect(subject.find('.dropdown button').prop('aria-haspopup')).toBe('true');
    expect(subject.find('.dropdown button').prop('aria-label')).toBe('Nessun Dorma');

    expect(subject.find('.icon-chevron_down').exists()).toBeTruthy();
  });

  describe('split dropdown', () => {
    let onClickSpy;

    beforeEach(() => {
      onClickSpy = jest.fn();
      subject.setProps({split: true, onClick: onClickSpy, title: <div className="split-title"/>});
    });

    it('opens the dropdown when the dropdown button is clicked', () => {
      $('.dropdown-toggle').simulate('click');
      expect(onClickSpy.toHaveBeenCalled);
      expect(subject.state.open.exists()).toBeTruthy();
    });

    it('does not open the dropdown when the split text is clicked', () => {
      $('.split-title').simulate('click');
      expect(onClickSpy).not.toHaveBeenCalled();
      expect(subject.state.open).not.toExist();
    });
  });

  it('calls onClick when dropdown toggle is clicked', () => {
    const onClickSpy = jest.fn();
    subject.setProps({onClick: onClickSpy});
    $('.dropdown-toggle').simulate('click');
    expect(onClickSpy).toHaveBeenCalled();
  });

  it('calls onEntered when opening', () => {
    const onEnteredSpy = jest.fn();
    subject.setProps({onEntered: onEnteredSpy});
    $('.dropdown-toggle').simulate('click');
    expect(onEnteredSpy).toHaveBeenCalled();
  });

  it('calls onExited when closing', () => {
    const onExitedSpy = jest.fn();
    subject.setProps({onExited: onExitedSpy});

    $('.dropdown-toggle').simulate('click');
    expect(onExitedSpy).not.toHaveBeenCalled();

    $('.dropdown-toggle').simulate('click');
    expect(onExitedSpy).toHaveBeenCalled();
  });

  it('does not render a scrim when not open', () => {
    expect(subject.find('.scrim').exists()).toBeFalsy();
  });

  describe('dropdown menu', () => {
    it('shows the children on click', () => {
      expect(subject.find('.dropdown-open').exists()).toBeFalsy();
      $('.dropdown-toggle').simulate('click');

      expect(subject.find('.dropdown').hasClass('dropdown-open')).toBeTruthy();
      expect(subject.find('.dropdown-menu').exists()).toBeTruthy();
    });

    it('has an aria-label on the underlying ul', () => {
      $('.dropdown-toggle').simulate('click');
      expect(subject.find('.dropdown-menu ul').prop('aria-label')).toBe('submenu');
    });

    describe('when floatMenu is in the props', () => {
      it('renders a floating menu', () => {
        subject.setProps({floatMenu: true});
        expect(subject.find('.dropdown-menu').hasClass('dropdown-menu-float')).toBeTruthy();
      });
    });

    describe('hiding children', () => {
      it('hides when the toggle is clicked', () => {
        $('.dropdown-toggle').simulate('click');
        $('.dropdown-toggle').simulate('click');
        expect(subject.find('.dropdown-open').exists()).toBeFalsy();
      });

      it('hides when a menu item is selected', () => {
        $('.dropdown-toggle').simulate('click');
        $('.dropdown-menu li:eq(0)').simulate('click');
        expect(subject.find('.dropdown-open').exists()).toBeFalsy();
      });

      describe('when blockingScrim is true and disableScrim is false', () => {
        beforeEach(() => {
          subject.setProps({blockingScrim: true});
          $('.dropdown-toggle').simulate('click');
        });

        it('renders a blocking scrim', () => {
          expect(subject.find('.scrim').exists()).toBeTruthy();
        });

        describe('when clicking outside of the dropdown', () => {
          beforeEach(() => {
            $('body').click();
          });

          it('hides the dropdown menu', () => {
            expect(subject.find('.dropdown-open').exists()).toBeFalsy();
          });

          it('removes the scrim', () => {
            expect(subject.find('.scrim').exists()).toBeFalsy();
          });
        });
      });

      describe('when blockingScrim is false and disableScrim is false', () => {
        beforeEach(() => {
          $('.dropdown-toggle').simulate('click');
        });

        it('does not render a blocking scrim', () => {
          expect(subject.find('.scrim').exists()).toBeFalsy();
        });

        describe('when clicking outside of the dropdown', () => {
          beforeEach(() => {
            $('body').click();
          });

          it('hides the dropdown menu', () => {
            expect(subject.find('.dropdown-open').exists()).toBeFalsy();
          });

          it('does not render a blocking scrim', () => {
            expect(subject.find('.scrim').exists()).toBeFalsy();
          });
        });
      });

      describe('when blockingScrim is true and disableScrim is true', () => {
        beforeEach(() => {
          subject.setProps({blockingScrim: true, disableScrim: true});
          $('.dropdown-toggle').simulate('click');
        });

        it('does not render a blocking scrim', () => {
          expect(subject.find('.scrim').exists()).toBeFalsy();
        });

        describe('when clicking outside of the dropdown', () => {
          beforeEach(() => {
            $('body').click();
          });

          it('does not hide the dropdown menu', () => {
            expect(subject.find('.dropdown-open').exists()).toBeTruthy();
          });

          it('does not render a blocking scrim', () => {
            expect(subject.find('.scrim').exists()).toBeFalsy();
          });
        });
      });

      describe('when blockingScrim is false and disableScrim is true', () => {
        beforeEach(() => {
          subject.setProps({disableScrim: true});
          $('.dropdown-toggle').simulate('click');
        });

        it('does not render a blocking scrim', () => {
          expect(subject.find('.scrim').exists()).toBeFalsy();
        });

        describe('when clicking outside of the dropdown', () => {
          beforeEach(() => {
            $('body').click();
          });

          it('does not hide the dropdown menu', () => {
            expect(subject.find('.dropdown-open').exists()).toBeTruthy();
          });

          it('does not render a blocking scrim', () => {
            expect(subject.find('.scrim').exists()).toBeFalsy();
          });
        });
      });

      describe('when closeOnMenuClick is false', () => {
        it('does not close when the menu is clicked', () => {
          subject.setProps({closeOnMenuClick: false});
          $('.dropdown-toggle').simulate('click');
          $('.dropdown-menu li:eq(0)').simulate('click');
          expect(subject.find('.dropdown-open').exists()).toBeTruthy();
        });
      });

      describe('when scroll is true', () => {
        it('renders a scrollable menu', () => {
          subject.setProps({scroll: true});
          $('.dropdown-toggle').simulate('click');
          expect(subject.find('.dropdown-menu').hasClass('dropdown-menu-scroll')).toBeTruthy();
        });
      });
    });

    describe('when border is provided', () => {
      it('has the border class', () => {
        subject.setProps({border: true});
        $('.dropdown-toggle').simulate('click');
        expect(subject.find('.dropdown-menu').hasClass('dropdown-border')).toBeTruthy();
      });
    });

    describe('when menuAlign is provided', () => {
      it('can align right', () => {
        subject.setProps({menuAlign: 'right'});
        $('.dropdown-toggle').simulate('click');
        expect(subject.find('.dropdown-menu').hasClass('dropdown-menu-right')).toBeTruthy();
      });

      it('can align left', () => {
        subject.setProps({menuAlign: 'left'});
        $('.dropdown-toggle').simulate('click');
        expect(subject.find('.dropdown-menu').hasClass('dropdown-menu-left')).toBeTruthy();
      });

      it('can align none', () => {
        subject.setProps({menuAlign: 'none'});
        $('.dropdown-toggle').simulate('click');
        expect(subject.find('.dropdown-menu').hasClass('dropdown-menu-right')).toBeFalsy();
        expect(subject.find('.dropdown-menu').hasClass('dropdown-menu-left')).toBeFalsy();
      });
    });
  });

  describe('when title is provided', () => {
    describe('when split is false', () => {
      it('puts the title in the dropdown toggle', () => {
        subject.setProps({split: false, title: 'Dropping'});
        expect(subject.find('.dropdown-label').exists()).toBeFalsy();
        expect(subject.find('.dropdown-toggle').text()).toBe('Dropping');
      });
    });

    describe('when split is true', () => {
      it('puts the title in a grid alongside the dropdown toggle', () => {
        subject.setProps({split: true, title: 'Dropping'});
        expect('.dropdown .grid .col:eq(0)'.text()).toBe('Dropping');
        expect(subject.find('.dropdown .grid .col:eq(1) .dropdown-toggle').exists()).toBeTruthy();
        expect('.dropdown .grid .col:eq(1) .dropdown-toggle').not.toHaveText('Dropping');
      });
    });
  });

  describe('when title is not provided and split is false', () => {
    it('renders an icon-only dropdown', () => {
      subject.setProps({split: false, title: null});
      expect(subject.find('.dropdown-icon-only').exists()).toBeTruthy();
      expect(subject.find('.dropdown-menu').hasClass('dropdown-menu-float')).toBeTruthy();
    });
  });

  describe('when flat is set in the props', () => {
    it('renders the flat styled dropdown', () => {
      subject.setProps({flat: true});
      expect(subject.find('.dropdown').hasClass('dropdown-flat')).toBeTruthy();
    });
  });

  describe('when showIcon is false', () => {
    it('still renders an icon if there is not a title', () => {
      subject.setProps({showIcon: false, title: null});
      expect(subject.find('.icon-chevron_down').exists()).toBeTruthy();
    });

    it('still renders an icon if the dropdown is a split dropdown', () => {
      subject.setProps({showIcon: false, split: true});

      expect(subject.find('.icon-chevron_down').exists()).toBeTruthy();
    });

    it('does not render an icon otherwise', () => {
      subject.setProps({showIcon: false, title: 'List of Things'});

      expect(subject.find('.icon').exists()).toBeFalsy();
      expect(subject.find('.icon-chevron_down').exists()).toBeFalsy();
    });
  });

  describe('when link prop is true', () => {
    it('adds the dropdown-link class to make everything link colors', () => {
      subject.setProps({link: true});
      expect(subject.find('.dropdown').hasClass('dropdown-link')).toBeTruthy();
    });
  });

  describe('when size is provided', () => {
    it('can be large', () => {
      subject.setProps({size: 'large'});
      $('.dropdown-toggle').simulate('click');
      expect(subject.find('.dropdown-lg').exists()).toBeTruthy();
    });

    it('can be normal', () => {
      subject.setProps({size: 'normal'});
      $('.dropdown-toggle').simulate('click');

      expect(subject.find('.dropdown-sm').exists()).toBeFalsy();
      expect(subject.find('.dropdown-lg').exists()).toBeFalsy();
    });

    it('can be small', () => {
      subject.setProps({size: 'small'});
      $('.dropdown-toggle').simulate('click');

      expect(subject.find('.dropdown-sm').exists()).toBeTruthy();
    });
  });

  describe('when icon is provided', () => {
    it('renders the associated svg', () => {
      subject.setProps({icon: 'more_vert'});
      expect(subject.find('.icon-more_vert').exists()).toBeTruthy();
    });
  });

  describe('when given children', () => {
    beforeEach(() => {
      subject.setProps({
        children: [
          <a key="1" href="/link1">Link 1</a>,
          false,
          <a key="2" href="/link2">Link 2</a>
        ]
      });
    });

    it('wraps each child in an li tag', () => {
      expect('.dropdown li').toHaveLength(2);
      expect(subject.find('.dropdown li:eq(0) a').prop('href')).toBe('/link1');
      expect(subject.find('.dropdown li:eq(1) a').prop('href')).toBe('/link2');
    });
  });

  describe('when given an item class name', () => {
    beforeEach(() => {
      subject.setProps({
        itemClassName: 'custom-li-class',
        children: [
          <a key="1" href="/link1">Link 1</a>,
          false,
          <a key="2" href="/link2">Link 2</a>
        ]
      });
    });

    it('applies the class name to each li', () => {
      expect('.dropdown li').toHaveLength(2);
      expect(subject.find('.dropdown li:eq(0)').hasClass('custom-li-class')).toBeTruthy();
      expect(subject.find('.dropdown li:eq(1)').hasClass('custom-li-class')).toBeTruthy();
    });
  });
});
