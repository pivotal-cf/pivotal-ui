import '../spec_helper';
import {GridForm, FormRow, FormCol} from '../../../src/react/forms';
import {Input} from '../../../src/react/inputs';
import {DefaultButton} from '../../../src/react/buttons';
import {Checkbox} from '../../../src/react/checkbox';
import React from 'react';
import PropTypes from 'prop-types';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {renderCol: false};
  }

  render() {
    const {renderCol} = this.state;

    return (
      <div>
        <GridForm ref={el => this.gridForm = el}>
          <FormRow>
            <FormCol {...{name: 'name'}}>
              <Input/>
            </FormCol>
            {renderCol && <FormCol {...{name: 'password'}}>
              <Input/>
            </FormCol>}
            <FormCol {...{name: 'other'}}>
              <Input/>
            </FormCol>
          </FormRow>
        </GridForm>
        <Checkbox className="col-toggle" onChange={() => this.setState({renderCol: !renderCol})}/>
      </div>
    );
  }
}

describe('GridForm', () => {
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
        <GridForm {...{className: 'some-form', afterSubmit}}>
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
        </GridForm>, root);
    });

    it('uses the form classname', () => {
      expect('form').toHaveClass('some-form');
    });

    it('does not disable the top-level fieldset', () => {
      expect('form > fieldset').not.toBeDisabled();
    });

    it('renders an input with a default value', () => {
      expect('.form-row:eq(0) .form-col:eq(0) input').toHaveAttr('value', 'some-name');
    });

    it('renders Buttons with submitting=false', () => {
      expect(Buttons).toHaveBeenCalledWith({
        canSubmit: subject.form.canSubmit,
        canReset: subject.form.canReset,
        reset: subject.form.reset,
        onSubmit: subject.form.onSubmit,
        submitting: false,
        setState: subject.form.setState,
        state: subject.form.state
      });
    });

    it('renders disabled buttons in a col-fixed col', () => {
      expect('.form-row:eq(0) .form-col:eq(1)').toHaveClass('col-fixed');
      expect('.form-row:eq(0) .form-col:eq(1) .save').toHaveAttr('type', 'submit');
      expect('.form-row:eq(0) .form-col:eq(1) .save').toHaveText('Save');
      expect('.form-row:eq(0) .form-col:eq(1) .save').toBeDisabled();
      expect('.form-row:eq(0) .form-col:eq(1) .cancel').toHaveText('Cancel');
      expect('.form-row:eq(0) .form-col:eq(1) .cancel').toBeDisabled();
    });

    describe('when deleting the name', () => {
      beforeEach(() => {
        $('.form-row:eq(0) .form-col:eq(0) input').val('').simulate('change');
      });

      it('allows the name to change', () => {
        expect('.form-row:eq(0) .form-col:eq(0) input').toHaveAttr('value', '');
      });

      it('renders buttons ', () => {
        expect('.form-row:eq(0) .form-col:eq(1)').toHaveClass('col-fixed');
        expect('.form-row:eq(0) .form-col:eq(1) .save').toBeDisabled();
        expect('.form-row:eq(0) .form-col:eq(1) .cancel').not.toBeDisabled();
      });

      describe('when clicking the cancel button', () => {
        beforeEach(() => {
          $('.form-row:eq(0) .form-col:eq(1) .cancel').simulate('click');
        });

        it('resets the name', () => {
          expect('.form-row:eq(0) .form-col:eq(0) input').toHaveAttr('value', 'some-name');
        });
      });
    });

    describe('when changing the name', () => {
      beforeEach(() => {
        $('.form-row:eq(0) .form-col:eq(0) input').val('some-other-name').simulate('change');
      });

      it('allows the name to change', () => {
        expect('.form-row:eq(0) .form-col:eq(0) input').toHaveAttr('value', 'some-other-name');
      });

      it('renders enabled buttons ', () => {
        expect('.form-row:eq(0) .form-col:eq(1)').toHaveClass('col-fixed');
        expect('.form-row:eq(0) .form-col:eq(1) .save').not.toBeDisabled();
        expect('.form-row:eq(0) .form-col:eq(1) .cancel').not.toBeDisabled();
      });

      describe('when clicking the cancel button', () => {
        beforeEach(() => {
          $('.form-row:eq(0) .form-col:eq(1) .cancel').simulate('click');
        });

        it('resets the name', () => {
          expect('.form-row:eq(0) .form-col:eq(0) input').toHaveAttr('value', 'some-name');
        });
      });

      describe('when clicking the update button', () => {
        let error, errors, onSubmitError, onSubmit, resolve, reject;

        beforeEach(() => {
          Promise.onPossiblyUnhandledRejection(jasmine.createSpy('reject'));
          error = new Error('invalid');
          errors = {name: 'invalid'};
          onSubmitError = jasmine.createSpy('onSubmitError').and.returnValue(errors);
          onSubmit = jasmine.createSpy('onSubmit');
          onSubmit.and.callFake(() => new Promise((res, rej) => {
            resolve = res;
            reject = rej;
          }));
          Buttons.calls.reset();
          subject::setProps({onSubmitError, onSubmit});
          $('.form-row:eq(0) .form-col:eq(1) .save').simulate('submit');
        });

        it('calls onSubmit', () => {
          expect(onSubmit).toHaveBeenCalledWith({initial: {name: 'some-name'}, current: {name: 'some-other-name'}});
        });

        it('disables the top-level fieldset', () => {
          expect('form > fieldset').toBeDisabled();
        });

        it('disables the buttons', () => {
          expect('.form-row:eq(0) .form-col:eq(1) .save').toBeDisabled();
          expect('.form-row:eq(0) .form-col:eq(1) .cancel').toBeDisabled();
        });

        it('renders Buttons with submitting=true', () => {
          expect(Buttons).toHaveBeenCalledWith({
            canSubmit: subject.form.canSubmit,
            canReset: subject.form.canReset,
            reset: subject.form.reset,
            onSubmit: subject.form.onSubmit,
            submitting: true,
            setState: subject.form.setState,
            state: subject.form.state
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

          it('renders Buttons with submitting=false', () => {
            expect(Buttons).toHaveBeenCalledWith({
              canSubmit: subject.form.canSubmit,
              canReset: subject.form.canReset,
              reset: subject.form.reset,
              onSubmit: subject.form.onSubmit,
              submitting: false,
              setState: subject.form.setState,
              state: subject.form.state
            });
          });

          it('makes both buttons disabled', () => {
            expect('.form-row:eq(0) .form-col:eq(1) .save').toBeDisabled();
            expect('.form-row:eq(0) .form-col:eq(1) .cancel').toBeDisabled();
          });

          it('resets the initial state', () => {
            expect(subject.form.state.initial).toEqual({name: 'some-other-name'});
          });

          it('retains the current state', () => {
            expect(subject.form.state.current).toEqual({name: 'some-other-name'});
          });

          it('calls the afterSubmit callback', () => {
            MockPromises.tick();
            expect(afterSubmit).toHaveBeenCalledWith({
              state: subject.form.state,
              setState: subject.form.setState,
              response: {result: 'success'},
              reset: subject.form.reset
            });
          });
        });

        describe('when the submit promise rejects', () => {
          beforeEach(() => {
            reject(error);
            MockPromises.tick(2);
          });

          it('enables the top-level fieldset', () => {
            expect('form > fieldset').not.toBeDisabled();
          });

          it('renders Buttons with submitting=false', () => {
            expect(Buttons).toHaveBeenCalledWith({
              canSubmit: subject.form.canSubmit,
              canReset: subject.form.canReset,
              reset: subject.form.reset,
              onSubmit: subject.form.onSubmit,
              submitting: false,
              setState: subject.form.setState,
              state: subject.form.state
            });
          });

          it('re-enables both buttons disabled', () => {
            expect('.form-row:eq(0) .form-col:eq(1) .save').not.toBeDisabled();
            expect('.form-row:eq(0) .form-col:eq(1) .cancel').not.toBeDisabled();
          });

          it('retains the initial state', () => {
            expect(subject.form.state.initial).toEqual({name: 'some-name'});
          });

          it('retains the current state', () => {
            expect(subject.form.state.current).toEqual({name: 'some-other-name'});
          });

          it('calls the onSubmitError', () => {
            expect(onSubmitError).toHaveBeenCalledWith(error);
          });

          it('sets the errors on the state', () => {
            expect(subject.form.state.errors).toBe(errors);
          });

          describe('when clicking the cancel button', () => {
            beforeEach(() => {
              $('.form-row:eq(0) .form-col:eq(1) .cancel').simulate('click');
            });

            it('resets the name', () => {
              expect('.form-row:eq(0) .form-col:eq(0) input').toHaveAttr('value', 'some-name');
            });

            it('clears the errors', () => {
              expect(subject.form.state.errors).toEqual({});
            });
          });

          describe('when clicking the save button and the submit action resolves', () => {
            beforeEach(() => {
              onSubmit.and.returnValue(Promise.resolve());
              $('.form-row:eq(0) .form-col:eq(1) .save').simulate('submit');
              MockPromises.tick(1);
            });

            it('clears the errors', () => {
              expect(subject.form.state.errors).toEqual({});
            });
          });
        });

        describe('when onSubmit throws an error', () => {
          let caught;

          beforeEach(() => {
            onSubmit.and.throwError(error);
            subject::setProps({onSubmit});
            try {
              subject.form.onSubmit();
            } catch (e) {
              caught = e;
            }
          });

          it('calls the onSubmitError', () => {
            expect(onSubmitError).toHaveBeenCalledWith(error);
          });

          it('sets the errors on the state', () => {
            expect(subject.form.state.errors).toBe(errors);
          });

          it('re-throws the error', () => {
            expect(caught).toBe(error);
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
          $('.form-row:eq(0) .form-col:eq(0) input').val('invalid value').simulate('change');
          $('.form-row:eq(0) .form-col:eq(0) input').simulate('blur');
        });

        it('calls the validator', () => {
          expect(validator).toHaveBeenCalledWith('invalid value');
        });

        it('renders the error text', () => {
          expect('.form-row:eq(0) .form-col:eq(0) .form-unit').toHaveClass('has-error');
          expect('.form-row:eq(0) .form-col:eq(0) .help-row').toHaveText('some-error');
        });

        it('disables the submit button', () => {
          expect('.save').toBeDisabled();
        });

        describe('when the validation error is corrected', () => {
          beforeEach(() => {
            validator.and.returnValue(undefined);
            $('.form-row:eq(0) .form-col:eq(0) input').val('valid value').simulate('change');
          });

          it('calls the validator', () => {
            expect(validator).toHaveBeenCalledWith('valid value');
          });

          it('removes the error text', () => {
            expect('.form-row:eq(0) .form-col:eq(0) .form-unit').not.toHaveClass('has-error');
            expect('.form-row:eq(0) .form-col:eq(0) .help-row').toHaveText('');
          });

          it('enables the submit button', () => {
            expect('.save').not.toBeDisabled();
          });
        });
      });

      describe('when the validator returns nothing', () => {
        beforeEach(() => {
          $('.form-row:eq(0) .form-col:eq(0) input').simulate('blur');
        });

        it('calls the validator', () => {
          expect(validator).toHaveBeenCalledWith('some-name');
        });

        it('does not render error text', () => {
          expect('.form-row:eq(0) .form-col:eq(0) .form-unit').not.toHaveClass('has-error');
          expect('.form-row:eq(0) .form-col:eq(0) .help-row').toHaveText('');
        });
      });
    });
  });

  describe('with two required fields', () => {
    beforeEach(() => {
      subject = ReactDOM.render(
        <GridForm {...{className: 'some-form', afterSubmit}}>
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
        </GridForm>, root);
    });

    it('renders inputs without values', () => {
      expect('.form-row:eq(0) .form-col:eq(0) input').toHaveAttr('value', undefined);
      expect('.form-row:eq(0) .form-col:eq(1) input').toHaveAttr('value', undefined);
    });

    it('renders disabled buttons in a col-fixed col', () => {
      expect('.form-row:eq(0) .form-col:eq(2)').toHaveClass('col-fixed');
      expect('.form-row:eq(0) .form-col:eq(2) .save').toHaveAttr('type', 'submit');
      expect('.form-row:eq(0) .form-col:eq(2) .save').toHaveText('Save');
      expect('.form-row:eq(0) .form-col:eq(2) .save').toBeDisabled();
      expect('.form-row:eq(0) .form-col:eq(2) .cancel').toHaveText('Cancel');
      expect('.form-row:eq(0) .form-col:eq(2) .cancel').toBeDisabled();
    });

    describe('when setting the name', () => {
      beforeEach(() => {
        $('.form-row:eq(0) .form-col:eq(0) input').val('some-other-name').simulate('change');
      });

      it('allows the name to change', () => {
        expect('.form-row:eq(0) .form-col:eq(0) input').toHaveAttr('value', 'some-other-name');
      });

      it('renders buttons ', () => {
        expect('.form-row:eq(0) .form-col:eq(2)').toHaveClass('col-fixed');
        expect('.form-row:eq(0) .form-col:eq(2) .save').toBeDisabled();
        expect('.form-row:eq(0) .form-col:eq(2) .cancel').not.toBeDisabled();
      });

      describe('when setting the password', () => {
        beforeEach(() => {
          $('.form-row:eq(0) .form-col:eq(1) input').val('some-password').simulate('change');
        });

        it('renders enabled buttons ', () => {
          expect('.form-row:eq(0) .form-col:eq(2)').toHaveClass('col-fixed');
          expect('.form-row:eq(0) .form-col:eq(2) .save').not.toBeDisabled();
          expect('.form-row:eq(0) .form-col:eq(2) .cancel').not.toBeDisabled();
        });
      });
    });
  });

  describe('with one optional field', () => {
    beforeEach(() => {
      subject = ReactDOM.render(
        <GridForm {...{className: 'some-form', afterSubmit}}>
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
        </GridForm>, root);
    });

    it('renders an optional text for the input', () => {
      expect('.form-row:eq(0) .form-col:eq(0) .label-row').toHaveText('Some label(Optional)');
    });

    it('renders disabled buttons in a col-fixed col', () => {
      expect('.form-row .form-col:eq(1)').toHaveClass('col-fixed');
      expect('.form-row .form-col:eq(1) .save').toHaveAttr('type', 'submit');
      expect('.form-row .form-col:eq(1) .save').toHaveText('Save');
      expect('.form-row .form-col:eq(1) .save').toBeDisabled();
      expect('.form-row .form-col:eq(1) .cancel').toHaveText('Cancel');
      expect('.form-row .form-col:eq(1) .cancel').toBeDisabled();
    });

    describe('when changing the optional field', () => {
      beforeEach(() => {
        $('.form-row:eq(0) .form-col:eq(0) input').val('some-other-name').simulate('change');
      });

      it('renders enabled buttons in a col-fixed col', () => {
        expect('.form-row:eq(0) .form-col:eq(1) .save').not.toBeDisabled();
        expect('.form-row:eq(0) .form-col:eq(1) .cancel').not.toBeDisabled();
      });
    });

    describe('when deleting the optional field', () => {
      beforeEach(() => {
        $('.form-row:eq(0) .form-col:eq(0) input').val('').simulate('change');
      });

      it('renders enabled buttons in a col-fixed col', () => {
        expect('.form-row:eq(0) .form-col:eq(1) .save').not.toBeDisabled();
        expect('.form-row:eq(0) .form-col:eq(1) .cancel').not.toBeDisabled();
      });
    });
  });

  describe('with one required and one optional field', () => {
    beforeEach(() => {
      subject = ReactDOM.render(
        <GridForm {...{className: 'some-form', afterSubmit}}>
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
        </GridForm>, root);
    });

    it('renders disabled buttons in a col-fixed col', () => {
      expect('.form-row:eq(0) .form-col:eq(2)').toHaveClass('col-fixed');
      expect('.form-row:eq(0) .form-col:eq(2) .save').toHaveAttr('type', 'submit');
      expect('.form-row:eq(0) .form-col:eq(2) .save').toHaveText('Save');
      expect('.form-row:eq(0) .form-col:eq(2) .save').toBeDisabled();
      expect('.form-row:eq(0) .form-col:eq(2) .cancel').toHaveText('Cancel');
      expect('.form-row:eq(0) .form-col:eq(2) .cancel').toBeDisabled();
    });

    describe('when changing the optional field', () => {
      beforeEach(() => {
        $('.form-row:eq(0) .form-col:eq(1) input').val('some-other-password').simulate('change');
      });

      it('renders enabled buttons in a col-fixed col', () => {
        expect('.form-row:eq(0) .form-col:eq(2) .save').not.toBeDisabled();
        expect('.form-row:eq(0) .form-col:eq(2) .cancel').not.toBeDisabled();
      });
    });

    describe('when deleting the optional field', () => {
      beforeEach(() => {
        $('.form-row:eq(0) .form-col:eq(1) input').val('').simulate('change');
      });

      it('renders enabled buttons in a col-fixed col', () => {
        expect('.form-row:eq(0) .form-col:eq(2) .save').not.toBeDisabled();
        expect('.form-row:eq(0) .form-col:eq(2) .cancel').not.toBeDisabled();
      });
    });

    describe('when changing the required field', () => {
      beforeEach(() => {
        $('.form-row:eq(0) .form-col:eq(0) input').val('some-other-name').simulate('change');
      });

      it('renders enabled buttons in a col-fixed col', () => {
        expect('.form-row:eq(0) .form-col:eq(2) .save').not.toBeDisabled();
        expect('.form-row:eq(0) .form-col:eq(2) .cancel').not.toBeDisabled();
      });
    });

    describe('when deleting the required field', () => {
      beforeEach(() => {
        $('.form-row:eq(0) .form-col:eq(0) input').val('').simulate('change');
      });

      it('renders buttons in a col-fixed col', () => {
        expect('.form-row:eq(0) .form-col:eq(2) .save').toBeDisabled();
        expect('.form-row:eq(0) .form-col:eq(2) .cancel').not.toBeDisabled();
      });
    });
  });

  describe('with two checkbox fields', () => {
    beforeEach(() => {
      subject = ReactDOM.render(
        <GridForm>
          <FormRow>
            <FormCol {...{
              name: 'check1',
              initialValue: false
            }}>
              <input type="checkbox"/>
            </FormCol>
            <FormCol {...{
              name: 'check2'
            }}>
              <input type="checkbox"/>
            </FormCol>
          </FormRow>
        </GridForm>, root);
    });

    it('sets the initial state correctly', () => {
      expect(subject.form.state.initial).toEqual({
        check1: false,
        check2: ''
      });
    });

    it('sets the current state correctly', () => {
      expect(subject.form.state.current).toEqual({
        check1: false,
        check2: ''
      });
    });
  });

  describe('with two nameless fields', () => {
    let onChange;

    beforeEach(() => {
      onChange = jasmine.createSpy('onChange');

      subject = ReactDOM.render(
        <GridForm {...{className: 'some-form', afterSubmit}}>
          <FormRow>
            <FormCol>
              <Input className="field1" onChange={onChange}/>
            </FormCol>
            <FormCol>
              <Input className="field2"/>
            </FormCol>
          </FormRow>
        </GridForm>, root);
    });

    it('does not store their values in the state', () => {
      expect(subject.form.state.initial).toEqual({});
    });

    describe('when one field is updated', () => {
      beforeEach(() => {
        $('.field1').val('hello').simulate('change');
      });

      it('does not update the state', () => {
        expect(subject.form.state.initial).toEqual({});
      });

      it('does not update the other', () => {
        expect($('.field2').val()).toEqual('');
      });

      it('retains the value in the input', () => {
        expect($('.field1').val()).toEqual('hello');
      });

      it('calls the given onChange callback', () => {
        expect(onChange).toHaveBeenCalledWith(jasmine.any(Object));
      });
    });
  });

  describe('with a hidden field', () => {
    beforeEach(() => {
      subject = ReactDOM.render(
        <GridForm {...{className: 'some-form'}}>
          <FormRow>
            <FormCol {...{
              name: 'name',
              hidden: true,
              initialValue: 'some-name'
            }}>
              <Input/>
            </FormCol>
          </FormRow>
        </GridForm>, root);
    });

    it('renders the col with the hidden attribute', () => {
      expect('.form-row:eq(0) .form-col:eq(0)').toHaveAttr('hidden');
    });
  });

  describe('with a row wrapper', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = jasmine.createSpy('wrapper').and.returnValue(<div className="wrapper"/>);
      subject = ReactDOM.render(
        <GridForm {...{className: 'some-form'}}>
          <FormRow {...{wrapper}}>
            <FormCol {...{
              initialValue: 'some-name'
            }}>
              <Input className="some-input"/>
            </FormCol>
          </FormRow>
        </GridForm>, root);
    });

    it('calls the wrapper with the form state', () => {
      expect(wrapper).toHaveBeenCalledWith(subject.form.state);
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
        <GridForm>
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
        </GridForm>, root);
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
        <GridForm {...{className: 'some-form', afterSubmit, onModified}}>
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
        </GridForm>, root);
    });

    describe('when modifying', () => {
      beforeEach(() => {
        $('.form-row:eq(0) .form-col:eq(0) input').val('some-other-name').simulate('change');
      });

      it('calls the onModified callback with true', () => {
        expect(onModified).toHaveBeenCalledWith(true);
        expect(onModified).not.toHaveBeenCalledWith(false);
      });

      describe('when resetting manually', () => {
        beforeEach(() => {
          onModified.calls.reset();
          $('.form-row:eq(0) .form-col:eq(0) input').val('some-name').simulate('change');
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

  describe('resetOnSubmit', () => {
    beforeEach(() => {
      ReactDOM.render(
        <GridForm {...{className: 'some-form', resetOnSubmit: true}}>
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
        </GridForm>, root);
      $('.form-row:eq(0) .form-col:eq(0) input').val('some-other-name').simulate('change');
      $('.form-row:eq(0) .form-col:eq(1) .save').simulate('submit');
    });

    it('resets the form to its initial state', () => {
      MockPromises.tick();
      expect($('.form-row:eq(0) .form-col:eq(0) input').val()).toEqual('some-name');
    });
  });

  describe('when passed extra props', () => {
    beforeEach(() => {
      ReactDOM.render(
        <GridForm {...{className: 'some-form', id: 'some-id', name: 'some-name', method: 'some-method'}} />, root);
    });

    it('passes them to the form tag', () => {
      expect('.some-form').toHaveAttr('id', 'some-id');
      expect('.some-form').toHaveAttr('name', 'some-name');
      expect('.some-form').toHaveAttr('method', 'some-method');
    });
  });

  describe('when rendering a Page component', () => {
    beforeEach(() => {
      subject = ReactDOM.render(<Page/>, root);
      $('.form-row:eq(0) .form-col:eq(0) input').val('some-name').simulate('change');
    });

    it('renders inputs without values', () => {
      expect('.form-row:eq(0) .form-col').toHaveLength(2);
      expect('.form-row:eq(0) .form-col:eq(0) input').toHaveAttr('value', 'some-name');
      expect('.form-row:eq(0) .form-col:eq(1) input').toHaveAttr('value', undefined);
    });

    it('sets the form state', () => {
      expect(subject.gridForm.form.state).toEqual({
        submitting: false,
        errors: {},
        initial: {name: '', other: ''},
        current: {name: 'some-name', other: ''},
        requiredFields: ['name', 'other']
      });
    });

    describe('when adding a new col', () => {
      beforeEach(() => {
        $('.col-toggle input').click();
      });

      it('renders the new col', () => {
        expect('.form-row:eq(0) .form-col').toHaveLength(3);
        expect('.form-row:eq(0) .form-col:eq(0) input').toHaveAttr('value', 'some-name');
        expect('.form-row:eq(0) .form-col:eq(1) input').toHaveAttr('value', undefined);
        expect('.form-row:eq(0) .form-col:eq(2) input').toHaveAttr('value', undefined);
      });

      it('updates the form state', () => {
        expect(subject.gridForm.form.state).toEqual({
          submitting: false,
          errors: {},
          initial: {name: '', password: '', other: ''},
          current: {name: 'some-name', password: '', other: ''},
          requiredFields: ['name', 'password', 'other']
        });
      });
    });
  });

  describe('when passing the onChange', () => {
    let subject;

    describe('when passed an event', () => {
      beforeEach(() => {
        subject = ReactDOM.render(
          <GridForm><FormRow><FormCol {...{name: 'title'}}><input/></FormCol></FormRow></GridForm>, root);
        $('.form input').val('mytitle').simulate('change');
      });

      it('parses the value from the event', () => {
        expect(subject.form.state.current).toEqual({title: 'mytitle'});
      });
    });

    describe('when passed a value', () => {
      beforeEach(() => {
        const Component = ({onChange}) => <input {...{onChange: () => onChange('some-title')}}/>;
        Component.propTypes = {onChange: PropTypes.func};
        subject = ReactDOM.render(
          <GridForm><FormRow><FormCol {...{name: 'title'}}><Component/></FormCol></FormRow></GridForm>, root);
        $('.form input').val('').simulate('change');
      });

      it('uses the value', () => {
        expect(subject.form.state.current).toEqual({title: 'some-title'});
      });
    });
  });
});