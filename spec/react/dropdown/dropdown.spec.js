import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Dropdown} from '../../../src/react/dropdowns';
import {setProps} from '../../support/jest-helpers';

describe('Dropdown', () => {
  let subject;

  beforeEach(() => {
    const props = {
      className: 'test-class',
      id: 'test-id',
      style: {opacity: '0.5'},
      title: 'Dropping',
      buttonClassName: 'test-btn-class',
      buttonAriaLabel: 'Nessun Dorma',
      buttonId: 'dropdown-button'
    };

    subject = ReactDOM.render(<Dropdown {...props}>
      <a {...{href: 'test'}}>Item #1</a>
    </Dropdown>, root);
  });

  it('passes through className, style, and id to the dropdown', () => {
    expect('.dropdown').toHaveClass('test-class');
    expect('.dropdown').toHaveCss({opacity: '0.5'});
    expect('.dropdown').toHaveAttr('id', 'test-id');
  });

  it('correctly styles the dropdown-toggle, and adds a chevron icon', () => {
    expect('.dropdown button').toHaveText('Dropping');
    expect('.dropdown button').toHaveClass('test-btn-class');
    expect('.dropdown-toggle').toHaveAttr('aria-haspopup', 'true');
    expect('.dropdown button').toHaveAttr('aria-label', 'Nessun Dorma');

    expect('.icon-chevron_down').toExist();
  });

  describe('split dropdown', () => {
    let onClickSpy;

    beforeEach(() => {
      onClickSpy = jasmine.createSpy('on click');
      subject::setProps({split: true, onClick: onClickSpy, title: <div className="split-title"/>});
    });

    it('opens the dropdown when the dropdown button is clicked', () => {
      $('.dropdown-toggle').simulate('click');
      expect(onClickSpy.toHaveBeenCalled);
      expect(subject.state.open).toBeTruthy();
    });

    it('does not open the dropdown when the split text is clicked', () => {
      $('.split-title').simulate('click');
      expect(onClickSpy).not.toHaveBeenCalled();
      expect(subject.state.open).toBeFalsy();
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

    it('has an aria-label and role on the underlying ul', () => {
      $('.dropdown-toggle').simulate('click');
      expect('.dropdown ul').toHaveAttr('role', 'menu');
      expect('.dropdown-menu ul').toHaveAttr('aria-labelledby', 'dropdown-button');
      expect('.dropdown button').toHaveAttr('id', 'dropdown-button');
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

      it('hides when a menu item is selected', () => {
        $('.dropdown-toggle').simulate('click');
        $('.dropdown-menu li:eq(0)').simulate('click');
        expect('.dropdown-open').not.toExist();
      });

      describe('when blockingScrim is true and disableScrim is false', () => {
        beforeEach(() => {
          subject::setProps({blockingScrim: true});
          $('.dropdown-toggle').simulate('click');
        });

        it('renders a blocking scrim', () => {
          expect('.scrim').toExist();
        });

        describe('when clicking outside of the dropdown', () => {
          beforeEach(() => {
            $('body').click();
          });

          it('hides the dropdown menu', () => {
            expect('.dropdown-open').not.toExist();
          });

          it('removes the scrim', () => {
            expect('.scrim').not.toExist();
          });
        });
      });

      describe('when blockingScrim is false and disableScrim is false', () => {
        beforeEach(() => {
          $('.dropdown-toggle').simulate('click');
        });

        it('does not render a blocking scrim', () => {
          expect('.scrim').not.toExist();
        });

        describe('when clicking outside of the dropdown', () => {
          beforeEach(() => {
            $('body').click();
          });

          it('hides the dropdown menu', () => {
            expect('.dropdown-open').not.toExist();
          });

          it('does not render a blocking scrim', () => {
            expect('.scrim').not.toExist();
          });
        });
      });

      describe('when blockingScrim is true and disableScrim is true', () => {
        beforeEach(() => {
          subject::setProps({blockingScrim: true, disableScrim: true});
          $('.dropdown-toggle').simulate('click');
        });

        it('does not render a blocking scrim', () => {
          expect('.scrim').not.toExist();
        });

        describe('when clicking outside of the dropdown', () => {
          beforeEach(() => {
            $('body').simulate('click');
          });

          it('does not hide the dropdown menu', () => {
            expect('.dropdown-open').toExist();
          });

          it('does not render a blocking scrim', () => {
            expect('.scrim').not.toExist();
          });
        });
      });

      describe('when blockingScrim is false and disableScrim is true', () => {
        beforeEach(() => {
          subject::setProps({disableScrim: true});
          $('.dropdown-toggle').simulate('click');
        });

        it('does not render a blocking scrim', () => {
          expect('.scrim').not.toExist();
        });

        describe('when clicking outside of the dropdown', () => {
          beforeEach(() => {
            $('body').simulate('click');
          });

          it('does not hide the dropdown menu', () => {
            expect('.dropdown-open').toExist();
          });

          it('does not render a blocking scrim', () => {
            expect('.scrim').not.toExist();
          });
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
      it('puts the title in a grid alongside the dropdown toggle', () => {
        subject::setProps({split: true, title: 'Dropping'});
        expect('.dropdown .grid .col:eq(0)').toHaveText('Dropping');
        expect('.dropdown .grid .col:eq(1) .dropdown-toggle').toExist();
        expect('.dropdown .grid .col:eq(1) .dropdown-toggle').not.toHaveText('Dropping');
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

  describe('when given children', () => {
    beforeEach(() => {
      subject::setProps({
        children: [
          <a key="1" href="/link1">Link 1</a>,
          false,
          <a key="2" href="/link2">Link 2</a>
        ]
      });
    });

    it('wraps each child in an li tag', () => {
      expect('.dropdown li').toHaveLength(2);
      expect('.dropdown li:eq(0) a').toHaveAttr('href', '/link1');
      expect('.dropdown li:eq(1) a').toHaveAttr('href', '/link2');
      expect('.dropdown li:eq(0) a').toHaveAttr('role', 'menuitem');
      expect('.dropdown li:eq(1) a').toHaveAttr('role', 'menuitem');
      expect('.dropdown li:eq(0)').toHaveAttr('role', 'none');
      expect('.dropdown li:eq(1)').toHaveAttr('role', 'none');
    });
  });

  describe('when given an item class name', () => {
    beforeEach(() => {
      subject::setProps({
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
      expect('.dropdown li:eq(0)').toHaveClass('custom-li-class');
      expect('.dropdown li:eq(1)').toHaveClass('custom-li-class');
    });
  });

  describe('when given dropdown menu classname(s)', () => {
    beforeEach(() => {
      subject::setProps({dropdownMenuClassName: 'border'});
    });

    it('applies the class name to the dropdown menu', () => {
      expect('.dropdown .dropdown-menu').toHaveClass('border');
    });
  });

  describe('when given open as a prop', () => {
    beforeEach(() => {
      subject::setProps({open: true});
    });

    it('opens the dropdown menu', () => {
      expect('.dropdown').toHaveClass('dropdown-open');
    });
  });
});
