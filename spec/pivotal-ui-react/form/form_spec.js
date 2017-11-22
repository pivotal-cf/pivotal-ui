import '../spec_helper';
import {Form, FormRow, FormCol} from '../../../src/react/forms';
import {Input} from '../../../src/react/inputs';
import {DefaultButton} from '../../../src/react/buttons';

describe('Form', () => {
  let Buttons, subject, afterSubmit;

  beforeEach(() => {
    afterSubmit = jasmine.createSpy('afterSubmit');
    Buttons = jasmine.createSpy('Buttons');
    Buttons.and.callFake(({canSubmit, canReset, reset}) => (
      <div>
        <DefaultButton {...{className: 'save', type: 'submit', disabled: !canSubmit()}}>Save</DefaultButton>
        <DefaultButton {...{className: 'cancel', disabled: !canReset(), onClick: reset}}>Cancel</DefaultButton>
      </div>
    ));
  });

  describe('with one required field', () => {
    beforeEach(() => {
      subject = ReactDOM.render(
        <Form {...{className: 'some-form', afterSubmit}}>
          <FormRow>
            <FormCol {...{
              name: 'name',
              initialValue: 'some-name'
            }}>
              <Input/>
            </FormCol>
            <FormCol {...{
              className: 'col-fixed',
              children: Buttons
            }}/>
          </FormRow>
        </Form>, root);
    });

    it('uses the form classname', () => {
      expect('form').toHaveClass('some-form');
    });

    it('does not disable the top-level fieldset', () => {
      expect('form > fieldset').not.toBeDisabled();
    });

    it('renders an input with a default value', () => {
      expect('.grid:eq(0) .col:eq(0) input').toHaveAttr('value', 'some-name');
    });

    it('renders Buttons with saving=false', () => {
      expect(Buttons).toHaveBeenCalledWith({
        canSubmit: subject.canSubmit,
        canReset: subject.canReset,
        reset: subject.reset,
        onSubmit: subject.onSubmit,
        saving: false,
        setState: subject.setState,
        state: subject.state,
        onChange: jasmine.any(Function)
      });
    });

    it('renders disabled buttons in a col-fixed col', () => {
      expect('.grid:eq(0) .col:eq(1)').toHaveClass('col-fixed');
      expect('.grid:eq(0) .col:eq(1) .save').toHaveAttr('type', 'submit');
      expect('.grid:eq(0) .col:eq(1) .save').toHaveText('Save');
      expect('.grid:eq(0) .col:eq(1) .save').toBeDisabled();
      expect('.grid:eq(0) .col:eq(1) .cancel').toHaveText('Cancel');
      expect('.grid:eq(0) .col:eq(1) .cancel').toBeDisabled();
    });

    describe('when deleting the name', () => {
      beforeEach(() => {
        $('.grid:eq(0) .col:eq(0) input').val('').simulate('change');
      });

      it('allows the name to change', () => {
        expect('.grid:eq(0) .col:eq(0) input').toHaveAttr('value', '');
      });

      it('renders buttons ', () => {
        expect('.grid:eq(0) .col:eq(1)').toHaveClass('col-fixed');
        expect('.grid:eq(0) .col:eq(1) .save').toBeDisabled();
        expect('.grid:eq(0) .col:eq(1) .cancel').not.toBeDisabled();
      });

      describe('when clicking the cancel button', () => {
        beforeEach(() => {
          $('.grid:eq(0) .col:eq(1) .cancel').simulate('click');
        });

        it('resets the name', () => {
          expect('.grid:eq(0) .col:eq(0) input').toHaveAttr('value', 'some-name');
        });
      });
    });

    describe('when changing the name', () => {
      beforeEach(() => {
        $('.grid:eq(0) .col:eq(0) input').val('some-other-name').simulate('change');
      });

      it('allows the name to change', () => {
        expect('.grid:eq(0) .col:eq(0) input').toHaveAttr('value', 'some-other-name');
      });

      it('renders enabled buttons ', () => {
        expect('.grid:eq(0) .col:eq(1)').toHaveClass('col-fixed');
        expect('.grid:eq(0) .col:eq(1) .save').not.toBeDisabled();
        expect('.grid:eq(0) .col:eq(1) .cancel').not.toBeDisabled();
      });

      describe('when clicking the cancel button', () => {
        beforeEach(() => {
          $('.grid:eq(0) .col:eq(1) .cancel').simulate('click');
        });

        it('resets the name', () => {
          expect('.grid:eq(0) .col:eq(0) input').toHaveAttr('value', 'some-name');
        });
      });

      describe('when clicking the update button', () => {
        let error, onSubmitError, onSubmit, resolve, reject;

        beforeEach(() => {
          Promise.onPossiblyUnhandledRejection(jasmine.createSpy('reject'));
          error = new Error('invalid');
          onSubmitError = jasmine.createSpy('onSubmitError');
          subject::setProps({onSubmitError});
          onSubmit = jasmine.createSpy('onSubmit');
          onSubmit.and.callFake(() => new Promise((res, rej) => {
            resolve = res;
            reject = rej;
          }));
          subject::setProps({onSubmit});
          $('.grid:eq(0) .col:eq(1) .save').simulate('submit');
        });

        it('calls onSubmit', () => {
          expect(onSubmit).toHaveBeenCalledWith({initial: {name: 'some-name'}, current: {name: 'some-other-name'}});
        });

        it('disables the top-level fieldset', () => {
          expect('form > fieldset').toBeDisabled();
        });

        it('disables the buttons', () => {
          expect('.grid:eq(0) .col:eq(1) .save').toBeDisabled();
          expect('.grid:eq(0) .col:eq(1) .cancel').toBeDisabled();
        });

        it('renders Buttons with saving=true', () => {
          expect(Buttons).toHaveBeenCalledWith({
            canSubmit: subject.canSubmit,
            canReset: subject.canReset,
            reset: subject.reset,
            onSubmit: subject.onSubmit,
            saving: true,
            setState: subject.setState,
            state: subject.state,
            onChange: jasmine.any(Function)
          });
        });

        describe('when the submit promise resolves', () => {
          beforeEach(() => {
            resolve({result: 'success'});
            MockPromises.tick(1);
          });

          it('enables the top-level fieldset', () => {
            expect('form > fieldset').not.toBeDisabled();
          });

          it('renders Buttons with saving=false', () => {
            expect(Buttons).toHaveBeenCalledWith({
              canSubmit: subject.canSubmit,
              canReset: subject.canReset,
              reset: subject.reset,
              onSubmit: subject.onSubmit,
              saving: false,
              setState: subject.setState,
              state: subject.state,
              onChange: jasmine.any(Function)
            });
          });

          it('makes both buttons disabled', () => {
            expect('.grid:eq(0) .col:eq(1) .save').toBeDisabled();
            expect('.grid:eq(0) .col:eq(1) .cancel').toBeDisabled();
          });

          it('resets the initial state', () => {
            expect(subject.state.initial).toEqual({name: 'some-other-name'});
          });

          it('retains the current state', () => {
            expect(subject.state.current).toEqual({name: 'some-other-name'});
          });

          it('calls the afterSubmit callback', () => {
            MockPromises.tick();
            expect(afterSubmit).toHaveBeenCalledWith({
              state: subject.state,
              setState: subject.setState,
              response: {result: 'success'},
              reset: subject.reset
            });
          });
        });

        describe('when the submit promise rejects', () => {
          let errors;

          beforeEach(() => {
            Promise.onPossiblyUnhandledRejection(jasmine.createSpy('reject'));
            errors = {name: 'invalid'};
            onSubmitError.and.returnValue(errors);
            reject(error);
            MockPromises.tick(1);
          });

          it('enables the top-level fieldset', () => {
            expect('form > fieldset').not.toBeDisabled();
          });

          it('renders Buttons with saving=false', () => {
            expect(Buttons).toHaveBeenCalledWith({
              canSubmit: subject.canSubmit,
              canReset: subject.canReset,
              reset: subject.reset,
              onSubmit: subject.onSubmit,
              saving: false,
              setState: subject.setState,
              state: subject.state,
              onChange: jasmine.any(Function)
            });
          });

          it('re-enables both buttons disabled', () => {
            expect('.grid:eq(0) .col:eq(1) .save').not.toBeDisabled();
            expect('.grid:eq(0) .col:eq(1) .cancel').not.toBeDisabled();
          });

          it('retains the initial state', () => {
            expect(subject.state.initial).toEqual({name: 'some-name'});
          });

          it('retains the current state', () => {
            expect(subject.state.current).toEqual({name: 'some-other-name'});
          });

          it('calls the onSubmitError', () => {
            expect(onSubmitError).toHaveBeenCalledWith(error);
          });

          it('sets the errors on the state', () => {
            expect(subject.state.errors).toBe(errors);
          });

          describe('when clicking the cancel button', () => {
            beforeEach(() => {
              $('.grid:eq(0) .col:eq(1) .cancel').simulate('click');
            });

            it('resets the name', () => {
              expect('.grid:eq(0) .col:eq(0) input').toHaveAttr('value', 'some-name');
            });

            it('clears the errors', () => {
              expect(subject.state.errors).toEqual({});
            });
          });

          describe('when clicking the save button and the submit action resolves', () => {
            beforeEach(() => {
              onSubmit.and.returnValue(Promise.resolve());
              $('.grid:eq(0) .col:eq(1) .save').simulate('submit');
              MockPromises.tick(1);
            });

            it('clears the errors', () => {
              expect(subject.state.errors).toEqual({});
            });
          });
        });
      });
    });

    describe('when the field has a validator', () => {
      let validator;

      beforeEach(() => {
        validator = jasmine.createSpy('validator');
        subject::setProps({
          children: (
            <FormRow>
              <FormCol {...{
                name: 'name',
                initialValue: 'some-name',
                validator
              }}>
                <Input/>
              </FormCol>
              <FormCol {...{
                className: 'col-fixed',
                children: Buttons
              }}/>
            </FormRow>
          )
        });
      });

      describe('when the validator returns an error', () => {
        beforeEach(() => {
          validator.and.returnValue('some-error');
          $('.grid:eq(0) .col:eq(0) input').val('invalid value').simulate('change');
          $('.grid:eq(0) .col:eq(0) input').simulate('blur');
        });

        it('calls the validator', () => {
          expect(validator).toHaveBeenCalledWith('invalid value');
        });

        it('renders the error text', () => {
          expect('.grid:eq(0) .col:eq(0) .form-unit').toHaveClass('has-error');
          expect('.grid:eq(0) .col:eq(0) .row-help').toHaveText('some-error');
        });

        it('disables the submit button', () => {
          expect('.save').toBeDisabled();
        });

        describe('when the validation error is corrected', () => {
          beforeEach(() => {
            validator.and.returnValue(undefined);
            $('.grid:eq(0) .col:eq(0) input').val('valid value').simulate('change');
          });

          it('calls the validator', () => {
            expect(validator).toHaveBeenCalledWith('valid value');
          });

          it('removes the error text', () => {
            expect('.grid:eq(0) .col:eq(0) .form-unit').not.toHaveClass('has-error');
            expect('.grid:eq(0) .col:eq(0) .row-help').toHaveText('');
          });

          it('enables the submit button', () => {
            expect('.save').not.toBeDisabled();
          });
        });
      });

      describe('when the validator returns nothing', () => {
        beforeEach(() => {
          $('.grid:eq(0) .col:eq(0) input').simulate('blur');
        });

        it('calls the validator', () => {
          expect(validator).toHaveBeenCalledWith('some-name');
        });

        it('does not render error text', () => {
          expect('.grid:eq(0) .col:eq(0) .form-unit').not.toHaveClass('has-error');
          expect('.grid:eq(0) .col:eq(0) .row-help').toHaveText('');
        });
      });
    });
  });

  describe('with two required fields', () => {
    beforeEach(() => {
      subject = ReactDOM.render(
        <Form {...{className: 'some-form', afterSubmit}}>
          <FormRow>
            <FormCol {...{name: 'name'}}>
              <Input/>
            </FormCol>
            <FormCol {...{name: 'password'}}>
              <Input/>
            </FormCol>
            <FormCol {...{className: 'col-fixed'}}>
              {Buttons}
            </FormCol>
          </FormRow>
        </Form>, root);
    });

    it('renders inputs without values', () => {
      expect('.grid:eq(0) .col:eq(0) input').toHaveAttr('value', undefined);
      expect('.grid:eq(0) .col:eq(1) input').toHaveAttr('value', undefined);
    });

    it('renders disabled buttons in a col-fixed col', () => {
      expect('.grid:eq(0) .col:eq(2)').toHaveClass('col-fixed');
      expect('.grid:eq(0) .col:eq(2) .save').toHaveAttr('type', 'submit');
      expect('.grid:eq(0) .col:eq(2) .save').toHaveText('Save');
      expect('.grid:eq(0) .col:eq(2) .save').toBeDisabled();
      expect('.grid:eq(0) .col:eq(2) .cancel').toHaveText('Cancel');
      expect('.grid:eq(0) .col:eq(2) .cancel').toBeDisabled();
    });

    describe('when setting the name', () => {
      beforeEach(() => {
        $('.grid:eq(0) .col:eq(0) input').val('some-other-name').simulate('change');
      });

      it('allows the name to change', () => {
        expect('.grid:eq(0) .col:eq(0) input').toHaveAttr('value', 'some-other-name');
      });

      it('renders buttons ', () => {
        expect('.grid:eq(0) .col:eq(2)').toHaveClass('col-fixed');
        expect('.grid:eq(0) .col:eq(2) .save').toBeDisabled();
        expect('.grid:eq(0) .col:eq(2) .cancel').not.toBeDisabled();
      });

      describe('when setting the password', () => {
        beforeEach(() => {
          $('.grid:eq(0) .col:eq(1) input').val('some-password').simulate('change');
        });

        it('renders enabled buttons ', () => {
          expect('.grid:eq(0) .col:eq(2)').toHaveClass('col-fixed');
          expect('.grid:eq(0) .col:eq(2) .save').not.toBeDisabled();
          expect('.grid:eq(0) .col:eq(2) .cancel').not.toBeDisabled();
        });
      });
    });
  });

  describe('with one optional field', () => {
    beforeEach(() => {
      subject = ReactDOM.render(
        <Form {...{className: 'some-form', afterSubmit}}>
          <FormRow>
            <FormCol {...{
              name: 'name',
              initialValue: 'some-name',
              label: 'Some label',
              optional: true
            }}>
              <Input/>
            </FormCol>
            <FormCol {...{className: 'col-fixed'}}>
              {Buttons}
            </FormCol>
          </FormRow>
        </Form>, root);
    });

    it('renders an optional text for the input', () => {
      expect('.grid:eq(0) .col:eq(0) .row-label').toHaveText('Some label(Optional)');
    });

    it('renders disabled buttons in a col-fixed col', () => {
      expect('.grid:eq(0) .col:eq(1)').toHaveClass('col-fixed');
      expect('.grid:eq(0) .col:eq(1) .save').toHaveAttr('type', 'submit');
      expect('.grid:eq(0) .col:eq(1) .save').toHaveText('Save');
      expect('.grid:eq(0) .col:eq(1) .save').toBeDisabled();
      expect('.grid:eq(0) .col:eq(1) .cancel').toHaveText('Cancel');
      expect('.grid:eq(0) .col:eq(1) .cancel').toBeDisabled();
    });

    describe('when changing the optional field', () => {
      beforeEach(() => {
        $('.grid:eq(0) .col:eq(0) input').val('some-other-name').simulate('change');
      });

      it('renders enabled buttons in a col-fixed col', () => {
        expect('.grid:eq(0) .col:eq(1) .save').not.toBeDisabled();
        expect('.grid:eq(0) .col:eq(1) .cancel').not.toBeDisabled();
      });
    });

    describe('when deleting the optional field', () => {
      beforeEach(() => {
        $('.grid:eq(0) .col:eq(0) input').val('').simulate('change');
      });

      it('renders enabled buttons in a col-fixed col', () => {
        expect('.grid:eq(0) .col:eq(1) .save').not.toBeDisabled();
        expect('.grid:eq(0) .col:eq(1) .cancel').not.toBeDisabled();
      });
    });
  });

  describe('with one required and one optional field', () => {
    beforeEach(() => {
      subject = ReactDOM.render(
        <Form {...{className: 'some-form', afterSubmit}}>
          <FormRow>
            <FormCol {...{
              name: 'name',
              initialValue: 'some-name'
            }}>
              <Input/>
            </FormCol>
            <FormCol {...{
              name: 'password',
              initialValue: 'some-password',
              optional: true
            }}>
              <Input/>
            </FormCol>
            <FormCol {...{
              className: 'col-fixed'
            }}>{Buttons}</FormCol>
          </FormRow>
        </Form>, root);
    });

    it('renders disabled buttons in a col-fixed col', () => {
      expect('.grid:eq(0) .col:eq(2)').toHaveClass('col-fixed');
      expect('.grid:eq(0) .col:eq(2) .save').toHaveAttr('type', 'submit');
      expect('.grid:eq(0) .col:eq(2) .save').toHaveText('Save');
      expect('.grid:eq(0) .col:eq(2) .save').toBeDisabled();
      expect('.grid:eq(0) .col:eq(2) .cancel').toHaveText('Cancel');
      expect('.grid:eq(0) .col:eq(2) .cancel').toBeDisabled();
    });

    describe('when changing the optional field', () => {
      beforeEach(() => {
        $('.grid:eq(0) .col:eq(1) input').val('some-other-password').simulate('change');
      });

      it('renders enabled buttons in a col-fixed col', () => {
        expect('.grid:eq(0) .col:eq(2) .save').not.toBeDisabled();
        expect('.grid:eq(0) .col:eq(2) .cancel').not.toBeDisabled();
      });
    });

    describe('when deleting the optional field', () => {
      beforeEach(() => {
        $('.grid:eq(0) .col:eq(1) input').val('').simulate('change');
      });

      it('renders enabled buttons in a col-fixed col', () => {
        expect('.grid:eq(0) .col:eq(2) .save').not.toBeDisabled();
        expect('.grid:eq(0) .col:eq(2) .cancel').not.toBeDisabled();
      });
    });

    describe('when changing the required field', () => {
      beforeEach(() => {
        $('.grid:eq(0) .col:eq(0) input').val('some-other-name').simulate('change');
      });

      it('renders enabled buttons in a col-fixed col', () => {
        expect('.grid:eq(0) .col:eq(2) .save').not.toBeDisabled();
        expect('.grid:eq(0) .col:eq(2) .cancel').not.toBeDisabled();
      });
    });

    describe('when deleting the required field', () => {
      beforeEach(() => {
        $('.grid:eq(0) .col:eq(0) input').val('').simulate('change');
      });

      it('renders buttons in a col-fixed col', () => {
        expect('.grid:eq(0) .col:eq(2) .save').toBeDisabled();
        expect('.grid:eq(0) .col:eq(2) .cancel').not.toBeDisabled();
      });
    });
  });

  describe('with two nameless fields', () => {
    let onChange;

    beforeEach(() => {
      onChange = jasmine.createSpy('onChange');

      subject = ReactDOM.render(
        <Form {...{className: 'some-form', afterSubmit}}>
          <FormRow>
            <FormCol>
              <Input className="field1" onChange={onChange}/>
            </FormCol>
            <FormCol>
              <Input className="field2"/>
            </FormCol>
          </FormRow>
        </Form>, root);
    });

    it('does not store their values in the state', () => {
      expect(subject.state.initial).toEqual({});
    });

    describe('when one field is updated', () => {
      beforeEach(() => {
        $('.field1').val('hello').simulate('change');
      });

      it('does not update the state', () => {
        expect(subject.state.initial).toEqual({});
      });

      it('does not update the other', () => {
        expect($('.field2').val()).toEqual('');
      });

      it('retains the value in the input', () => {
        expect($('.field1').val()).toEqual('hello');
      });

      it('calls the given onChange callback', () => {
        expect(onChange).toHaveBeenCalled();
      });
    });
  });

  describe('with a hidden field', () => {
    beforeEach(() => {
      subject = ReactDOM.render(
        <Form {...{className: 'some-form'}}>
          <FormRow>
            <FormCol {...{
              name: 'name',
              hidden: true,
              initialValue: 'some-name'
            }}>
              <Input/>
            </FormCol>
          </FormRow>
        </Form>, root);
    });

    it('renders the col with the hidden attribute', () => {
      expect('.grid:eq(0) .col:eq(0)').toHaveAttr('hidden');
    });
  });

  describe('with a row wrapper', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = jasmine.createSpy('wrapper').and.returnValue(<div className="wrapper"/>);
      subject = ReactDOM.render(
        <Form {...{className: 'some-form'}}>
          <FormRow {...{wrapper}}>
            <FormCol {...{
              initialValue: 'some-name'
            }}>
              <Input className="some-input"/>
            </FormCol>
          </FormRow>
        </Form>, root);
    });

    it('calls the wrapper with the form state', () => {
      expect(wrapper).toHaveBeenCalledWith(subject.state);
    });

    it('renders the row grid within the wrapper', () => {
      expect('.some-form > fieldset > .wrapper > .grid > .col input').toHaveClass('some-input');
    });
  });

  describe('canSubmit with a custom checkRequiredFields callback ', () => {
    let checkRequiredFields;

    beforeEach(() => {
      checkRequiredFields = jasmine.createSpy('checkRequiredFields');
      Buttons.and.callFake(({canSubmit}) => (
        <DefaultButton {...{
          className: 'save',
          type: 'submit',
          disabled: !canSubmit({checkRequiredFields})
        }}>Save</DefaultButton>
      ));

      subject = ReactDOM.render(
        <Form>
          <FormRow>
            <FormCol {...{
              name: 'name'
            }} >
              <Input/>
            </FormCol>
            <FormCol>
              {Buttons}
            </FormCol>
          </FormRow>
        </Form>, root);
      $('input').val('some-name').simulate('change');
    });

    describe('when checking required fields returns true', () => {
      beforeEach(() => {
        checkRequiredFields.and.returnValue(true);
        subject.forceUpdate();
      });

      it('renders an enabled save button', () => {
        expect('.save').not.toBeDisabled();
      });
    });

    describe('when checking required fields returns false', () => {
      beforeEach(() => {
        checkRequiredFields.and.returnValue(false);
        subject.forceUpdate();
      });

      it('renders a disabled save button', () => {
        expect('.save').toBeDisabled();
      });
    });
  });

  describe('onModified', () => {
    let onModified;

    beforeEach(() => {
      onModified = jasmine.createSpy('onModified');

      subject = ReactDOM.render(
        <Form {...{className: 'some-form', afterSubmit, onModified}}>
          <FormRow>
            <FormCol {...{
              name: 'name',
              initialValue: 'some-name'
            }}>
              <Input/>
            </FormCol>
            <FormCol {...{
              className: 'col-fixed'
            }}>
              {Buttons}
            </FormCol>
          </FormRow>
        </Form>, root);
    });

    describe('when modifying', () => {
      beforeEach(() => {
        $('.grid:eq(0) .col:eq(0) input').val('some-other-name').simulate('change');
      });

      it('calls the onModified callback with true', () => {
        expect(onModified).toHaveBeenCalledWith(true);
        expect(onModified).not.toHaveBeenCalledWith(false);
      });

      describe('when resetting manually', () => {
        beforeEach(() => {
          onModified.calls.reset();
          $('.grid:eq(0) .col:eq(0) input').val('some-name').simulate('change');
        });

        it('calls the onModified callback with false', () => {
          expect(onModified).toHaveBeenCalledWith(false);
          expect(onModified).not.toHaveBeenCalledWith(true);
        });
      });

      describe('when resetting with the reset callback', () => {
        beforeEach(() => {
          onModified.calls.reset();
          $('.cancel').click();
        });

        it('calls the onModified callback with false', () => {
          expect(onModified).toHaveBeenCalledWith(false);
          expect(onModified).not.toHaveBeenCalledWith(true);
        });
      });

      describe('when submitting', () => {
        beforeEach(() => {
          onModified.calls.reset();
          $('.save').click();
          MockPromises.tick();
        });

        it('calls the onModified callback with false', () => {
          expect(onModified).toHaveBeenCalledWith(false);
          expect(onModified).not.toHaveBeenCalledWith(true);
        });
      });

      describe('when unmounting', () => {
        beforeEach(() => {
          onModified.calls.reset();
          ReactDOM.unmountComponentAtNode(root);
        });

        it('calls the onModified callback with false', () => {
          expect(onModified).toHaveBeenCalledWith(false);
          expect(onModified).not.toHaveBeenCalledWith(true);
        });
      });
    });
  });

  describe('when given invalid children', () => {
    beforeEach(() => {
      spyOn(console, 'warn');

      class FakeRow extends FormRow {
        render() {
          return <div className="extended-form-row">fake row</div>;
        }
      }

      ReactDOM.render(<Form>
        <div className="evil-do-not-render">evil</div>
        <FakeRow />
      </Form>, root);
    });

    it('renders the extended form row', () => {
      expect('.extended-form-row').toExist();
    });

    it('does not render invalid nodes', () => {
      expect('.evil-do-not-render').not.toExist();
    });

    it('logs an error about invalid children types', () => {
      expect(console.warn).toHaveBeenCalledWith('Child of type "div" will not be rendered. A Form\'s children should be of type FormRow.');
    });
  });
});