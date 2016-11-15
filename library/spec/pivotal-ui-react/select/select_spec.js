require('../spec_helper');

describe('Selects', () => {
  describe('Select', () => {
    const className = 'select-me';
    const defaultValue = 'default here';
    const name = 'name';
    let subject, Select, props, onChangeSpy;

    beforeEach(() => {
      Select = require('../../../src/pivotal-ui-react/select/select').Select;
      onChangeSpy = jasmine.createSpy('onChange');
      props = {
        className,
        name,
        style: {opacity: 0.5},
        id: 'test-id',
        defaultValue,
        onChange: onChangeSpy,
        options: [defaultValue, 'one', 'two']
      };

      subject = ReactDOM.render(<Select {...props}/>, root);
    });
    
    it('renders a hidden input with the defaultValue', () => {
      expect('input[type=hidden]').toHaveValue(defaultValue);
      expect('input[type=hidden]').toHaveAttr('name', name);
    });

    it('renders a hidden list with all the options so that select is as wide as the largest option', () => {
      expect('.select-toggle + ul').toExist();
      expect($('.select-toggle + ul li').map(function() { return $(this).text(); }).toArray()).toEqual([
        defaultValue, 'one', 'two'
      ]);
    });

    it('passes through className to the select', () => {
      expect('.select').toHaveClass(className);
    });

    it('passes through style to the button', () => {
      expect('.select').toHaveCss({opacity: '0.5'});
    });

    it('passes through id to the button', () => {
      expect('.select#test-id').toExist();
    });

    it('creates a select-toggle with a double arrow', () => {
      expect('.select-toggle').toExist();
      expect('.select-toggle .icon-select_chevrons').toExist();
    });

    it('shows the default value', () => {
      expect('.select-toggle').toHaveText(defaultValue);
    });

    it('hides when clicking outside the select', () => {
      $('.select-toggle').simulate('click');
      expect('.open .select-menu').toExist();
      const evt = document.createEvent('HTMLEvents');
      evt.initEvent('click', true, true );
      document.documentElement.dispatchEvent(evt);
      expect('.open .select-menu').not.toExist();
    });

    it('calls onEntered when opening', () => {
      const onEnteredSpy = jasmine.createSpy('onEnter');
      subject::setProps({onEntered: onEnteredSpy});
      $('.select-toggle').simulate('click');

      expect(onEnteredSpy).toHaveBeenCalled();
    });

    it('calls onExited when closing', () => {
      const onExitedSpy = jasmine.createSpy('onExit');
      subject::setProps({onExited: onExitedSpy});
      $('.select-toggle').simulate('click').simulate('click');
      expect(onExitedSpy).toHaveBeenCalled();
    });

    describe('when the options array has objects', () => {
      beforeEach(() => {
        subject::setProps({options: [{label: 'the default', value: defaultValue}, {label: 'one', value: 1}, {label: 'two', value: 2}]});
        $('.select-toggle').simulate('click');
      });

      it('sets the value of the select and the label of the toggle', () => {
        expect('.select-toggle-label').toHaveText('the default');
        expect('input[type=hidden]').toHaveValue(defaultValue);
      });

      it('renders the options', () => {
        expect('.option:eq(0)').toHaveText('the default');
        expect('.option:eq(1)').toHaveText('one');
        expect('.option:eq(2)').toHaveText('two');
      });
    });

    describe('when the options array includes blank', () => {
      beforeEach(() => {
        subject::setProps({value: '', options: [{label: 'Please select an item', value: ''}, {label: 'one', value: 1}, {label: 'two', value: 2}]});
        $('.select-toggle').simulate('click');
      });

      it('sets the value of the select and the label of the toggle', () => {
        expect('.select-toggle-label').toHaveText('Please select an item');
        expect('input[type=hidden]').toHaveValue('');
      });

      it('renders the options', () => {
        expect('.option:eq(0)').toHaveText('Please select an item');
        expect('.option:eq(1)').toHaveText('one');
        expect('.option:eq(2)').toHaveText('two');
      });
    });

    describe('when the select is controlled', () => {
      const value = 'controlled here';

      beforeEach(() => {
        subject::setProps({value});
      });

      it('show the value', () => {
        expect('.select-toggle-label').toHaveText(value);
      });

      describe('when the value changes', () => {
        const value = 'new controlled value';

        beforeEach(() => {
          subject::setProps({value});
        });

        it('shows the new value', () => {
          expect('.select-toggle-label').toHaveText(value);
        });
      });

      describe('when clicking on the select toggle', () => {
        beforeEach(() => {
          $('.select-toggle').simulate('click');
        });

        describe('selecting an option', () => {
          beforeEach(() => {
            onChangeSpy.and.callFake(value => subject::setProps({value}));
            $('.option:eq(1)').simulate('click');
          });

          it('calls then onChange callback', () => {
            expect(onChangeSpy).toHaveBeenCalledWith('one');
          });

          it('updates the selected value', () => {
            expect('.select-toggle-label').toHaveText('one');
            expect('input[type=hidden]').toHaveValue('one');
          });

          it('closes the menu', () => {
            expect('.select').not.toHaveClass('open');
          });
        });
      });
    });

    describe('when clicking on the select toggle', () => {
      beforeEach(() => {
        $('.select-toggle').simulate('click');
      });

      it('display the selected option', () => {
        expect('.select-menu .selected').toHaveText(defaultValue);
      });

      it('adds the open class to the select', () => {
        expect('.select').toHaveClass('open');
      });

      it('renders the options', () => {
        expect('.option:eq(0)').toHaveText(defaultValue);
        expect('.option:eq(1)').toHaveText('one');
        expect('.option:eq(2)').toHaveText('two');
      });

      describe('when clicking on the select toggle again', () => {
        beforeEach(() => {
          $('.select-toggle').simulate('click');
        });

        it('removes the open class from the select', () => {
          expect('.select').not.toHaveClass('open');
        });
      });

      describe('selecting an option', () => {
        beforeEach(() => {
          $('.option:eq(1)').simulate('click');
        });

        it('calls then onChange callback', () => {
          expect(onChangeSpy).toHaveBeenCalledWith('one');
        });

        it('updates the selected value', () => {
          expect('.select-toggle-label').toHaveText('one');
          expect('input[type=hidden]').toHaveValue('one');
        });

        it('closes the menu', () => {
          expect('.select').not.toHaveClass('open');
        });
      });
    });
  });
});
