require('../spec_helper');
import {Dropdown, DropdownItem} from '../../../src/pivotal-ui-react/dropdowns/dropdowns';

describe('Dropdowns', () => {
  function dropdownTestFor(dropdownComponentName, dropdownClassName) {
    describe(dropdownComponentName, () => {
      beforeEach(() => {
        var DropdownClass = require('../../../src/pivotal-ui-react/dropdowns/dropdowns')[dropdownComponentName];
        ReactDOM.render(<DropdownClass title="Dropping" buttonClassName="test-btn-class"/>, root);
      });

      afterEach(() => {
        ReactDOM.unmountComponentAtNode(root);
      });

      it('creates a dropdown', () => {
        expect('button.dropdown-toggle').toContainText('Dropping');
      });

      it('adds the appropriate button classes (merging in buttonClassName) to the dropdown toggle', () => {
        expect('button.dropdown-toggle').toHaveClass(dropdownClassName);
        expect('button.dropdown-toggle').not.toHaveClass('btn-default');
        expect('.dropdown-toggle').toHaveClass('test-btn-class');
      });
    });
  }

  describe('Dropdown', () => {
    let subject;

    beforeEach(() => {
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
      expect('.dropdown-toggle').toHaveCss({opacity: '0.5'});
    });

    it('passes through id to the button', () => {
      expect('.dropdown-toggle#test-id').toExist();
    });

    it('creates a dropdown-toggle', () => {
      expect('.dropdown-toggle').toContainText('Dropping');
      expect('.dropdown-toggle').toHaveClass('test-btn-class');
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

    describe('dropdown menu', () => {
      it('shows the children on click', () => {
        expect('.open .dropdown-menu').not.toExist();
        $('.dropdown-toggle').simulate('click');
        expect('.open .dropdown-menu').toExist();
      });

      describe('hiding children', () => {
        it('hides when the toggle is clicked', () => {
          $('.dropdown-toggle').simulate('click');
          expect('.open .dropdown-menu').toExist();
          $('.dropdown-toggle').simulate('click');
          expect('.open .dropdown-menu').not.toExist();
        });

        it('hides when clicking outside the dropdown', () => {
          $('.dropdown-toggle').simulate('click');
          expect('.open .dropdown-menu').toExist();
          const evt = document.createEvent('HTMLEvents');
          evt.initEvent('click', true, true );
          document.documentElement.dispatchEvent(evt);
          expect('.open .dropdown-menu').not.toExist();
        });

        describe('when scrim is disabled', () => {
          it('does not hide the dropdown menu when clicking outside of the dropdown', () => {
            subject::setProps({disableScrim: true});

            $('.dropdown-toggle').simulate('click');
            expect('.open .dropdown-menu').toExist();
            const evt = document.createEvent('HTMLEvents');
            evt.initEvent('click', true, true );
            document.documentElement.dispatchEvent(evt);
            expect('.open .dropdown-menu').toExist();
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
        })
      })
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

          it('puts the title in the dropdown label', () => {
            expect('.dropdown-label').toHaveText('Dropping');
            expect('.dropdown-toggle').toHaveText('★');
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
  });

  dropdownTestFor('LinkDropdown', 'btn-link');

  dropdownTestFor('DefaultAltDropdown', 'btn-default-alt');

  dropdownTestFor('LowlightDropdown', 'btn-lowlight');

  dropdownTestFor('DangerDropdown', 'btn-danger');

  dropdownTestFor('HighlightDropdown', 'btn-highlight');

  dropdownTestFor('HighlightAltDropdown', 'btn-highlight-alt');
});
