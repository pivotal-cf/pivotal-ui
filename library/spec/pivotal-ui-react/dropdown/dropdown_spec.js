require('../spec_helper');

describe('Dropdowns', () => {
  describe('Dropdown', () => {
    let subject, Dropdown, DropdownItem;

    beforeEach(() => {
      Dropdown = require('../../../src/pivotal-ui-react/dropdowns/dropdowns').Dropdown;
      DropdownItem = require('../../../src/pivotal-ui-react/dropdowns/dropdowns').DropdownItem;

      const props = {
        className: 'test-class',
        id: 'test-id',
        style: {
          opacity: '0.5'
        }
      };

      subject = ReactDOM.render(
        <Dropdown title="Dropping" {...props} buttonClassName="test-btn-class">
          <DropdownItem href="test">Item #1</DropdownItem>
        </Dropdown>, root);
    });

    afterEach(() => {
      ReactDOM.unmountComponentAtNode(root);
    });

    it('passes through className to the dropdown', () => {
      expect('.dropdown').toHaveClass('test-class');
    });

    it('passes through style to the button', () => {
      expect('.dropdown').toHaveCss({opacity: '0.5'});
    });

    it('passes through id to the button', () => {
      expect('.dropdown#test-id').toExist();
    });

    it('creates a dropdown-toggle with a caret', () => {
      expect('.dropdown-toggle').toContainText('Dropping');
      expect('.dropdown-toggle').toHaveClass('test-btn-class');
      expect('.dropdown-toggle .icon-chevron_down').toExist();
    });

    describe('when onClick is provided', () => {
      let onClickSpy;
      beforeEach(() => {
        onClickSpy = jasmine.createSpy('onClick');
        subject = ReactDOM.render(
          <Dropdown onClick={onClickSpy} title="Dropping" buttonClassName="test-btn-class">
            <DropdownItem href="test">Item #1</DropdownItem>
          </Dropdown>, root);
      });

      it('gets called when dropdown toggle is clicked', () => {
        const event = {
          type: 'click',
          other_event_stuff: 'wat'
        };
        $('.dropdown-toggle').simulate('click', event);
        expect(onClickSpy).toHaveBeenCalledWith(jasmine.objectContaining(event));
      });
    });

    it('calls onEntered when opening', () => {
      const onEnteredSpy = jasmine.createSpy('onEnter');
      subject::setProps({onEntered: onEnteredSpy});
      $('.dropdown-toggle').simulate('click');

      expect(onEnteredSpy).toHaveBeenCalled();
    });

    it('calls onExited when closing', () => {
      const onExitedSpy = jasmine.createSpy('onExit');
      subject::setProps({onExited: onExitedSpy});
      $('.dropdown-toggle').simulate('click').simulate('click');
      expect(onExitedSpy).toHaveBeenCalled();
    });
    
    describe('dropdown menu', () => {
      it('shows the children on click', () => {
        expect('.dropdown-menu-open').not.toExist();
        $('.dropdown-toggle').simulate('click');
        expect('.dropdown-menu-open').toExist();
      });

      describe('when the menuCaret is in the props', () => {
        beforeEach(() => {
          subject::setProps({menuCaret: true});
        });

        it('renders the caret in the menu', () => {
          expect('.dropdown-menu').toHaveClass('dropdown-menu-caret');
        });
      });

      describe('hiding children', () => {
        it('hides when the toggle is clicked', () => {
          $('.dropdown-toggle').simulate('click');
          expect('.dropdown-menu-open').toExist();
          $('.dropdown-toggle').simulate('click');
          expect('.dropdown-menu-open').not.toExist();
        });

        it('hides when clicking outside the dropdown', () => {
          $('.dropdown-toggle').simulate('click');
          expect('.dropdown-menu-open').toExist();
          const evt = document.createEvent('HTMLEvents');
          evt.initEvent('click', true, true );
          document.documentElement.dispatchEvent(evt);
          expect('.dropdown-menu-open').not.toExist();
        });

        it('hides when a menu item is selected', () => {
          $('.dropdown-toggle').simulate('click');
          expect('.dropdown-menu-open').toExist();
          $('li:contains(Item #1)').simulate('click');
          expect('.dropdown-menu-open').not.toExist();
        });

        describe('when scrim is disabled', () => {
          it('does not hide the dropdown menu when clicking outside of the dropdown', () => {
            subject::setProps({disableScrim: true});

            $('.dropdown-toggle').simulate('click');
            expect('.dropdown-menu-open').toExist();
            const evt = document.createEvent('HTMLEvents');
            evt.initEvent('click', true, true );
            document.documentElement.dispatchEvent(evt);
            expect('.dropdown-menu-open').toExist();
          });
        });

        describe('when closeOnMenuClick is false', () => {
          beforeEach(() => {
            subject::setProps({closeOnMenuClick: false});
          });

          it('does not close when the menu is clicked', () => {
            $('.dropdown-toggle').simulate('click');
            expect('.dropdown-menu-open').toExist();
            $('li:contains(Item #1)').simulate('click');
            expect('.dropdown-menu-open').toExist();
          });
        });
      });

      describe('when border is provided', () => {
        it('has the border class', () => {
          subject::setProps({border: true});
          $('.dropdown-toggle').simulate('click');
          expect('.dropdown-menu.dropdown-border').toExist();
        });
      });

      describe('when pullRight is provided', () => {
        it('has the pull right class', () => {
          subject::setProps({pullRight: true});
          $('.dropdown-toggle').simulate('click');
          expect('.dropdown-menu.dropdown-menu-right').toExist();
        });
      });
    });

    describe('when title is provided', () => {
      beforeEach(() => {
        subject = ReactDOM.render(
          <Dropdown title="Dropping" buttonClassName="test-btn-class">
            <DropdownItem href="test">Item #1</DropdownItem>
          </Dropdown>, root);
      });

      describe('when toggle is not set', () => {
        describe('when split is false', () => {
          it('puts the title in the dropdown toggle', () => {
            expect('.dropdown-label').not.toExist();
            expect('.dropdown-toggle').toHaveText('Dropping');
          });
        });

        describe('when split is true', () => {
          beforeEach(() => {
            subject::setProps({split: true});
          });

          it('puts the title in the dropdown label', () => {
            expect('.dropdown-label').toHaveText('Dropping');
            expect('.dropdown-toggle').not.toHaveText('Dropping');
          });
        });
      });

      describe('when toggle is set', () => {
        beforeEach(() => {
          subject::setProps({toggle: <div className="foo">★</div>});
        });

        describe('when split is false', () => {
          it('puts the title in the dropdown toggle', () => {
            expect('.dropdown-label').not.toExist();
            expect('.dropdown-toggle').toHaveText('Dropping★');
          });
        });

        describe('when split is true', () => {
          beforeEach(() => {
            subject::setProps({split: true});
          });

          it('puts the title in an appropriate place', () => {
            expect('.dropdown-label').toHaveText('Dropping');
            expect('.dropdown-toggle + div').toHaveText('★');
          });
        });
      });
    });

    describe('when title is not provided', () => {
      beforeEach(() => {
        subject = ReactDOM.render(
          <Dropdown buttonClassName="test-btn-class">
            <DropdownItem href="test">Item #1</DropdownItem>
          </Dropdown>, root
        );
      });

      describe('when toggle is not set', () => {
        describe('when split is false', () => {
          it('renders the default toggle with no label', () => {
            expect('.dropdown-label').not.toExist();
            expect('.dropdown-toggle').toExist();
          });
        });
      });

      describe('when toggle is set', () => {
        beforeEach(() => {
          subject::setProps({toggle: <div className="foo">★</div>});
        });
        describe('when split is false', () => {
          it('renders the custom toggle with no label', () => {
            expect('.dropdown-label').not.toExist();
            expect('.dropdown-toggle .foo').toHaveText('★');
          });
        });
      });
    });

    describe('when flat is set in the props', () => {
      beforeEach(() => {
        subject::setProps({flat: true});
      });

      it('renders the link styled dropdown', () => {
        expect('.dropdown').toHaveClass('dropdown-flat');
      });
    });

    describe('when dropCaret is false', () => {
      beforeEach(() => {
        subject::setProps({dropCaret: false});
      });

      it('does not render the drop caret', () => {
        expect('.dropdown-toggle .icon-chevron_down').not.toExist();
      });
    });

    describe('when link prop is true', () => {
      beforeEach(() => {
        subject::setProps({link: true});
      });

      it('adds the dropdown-link class to make everything link colors', () => {
        expect('.dropdown').toHaveClass('dropdown-link');
      });
    });
  });
});
