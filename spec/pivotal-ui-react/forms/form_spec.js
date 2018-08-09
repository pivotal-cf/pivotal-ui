import '../spec_helper';
import {Grid, FlexCol} from '../../../src/react/flex-grids';
import {Form} from '../../../src/react/forms';
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
        <Form {...{ref: el => this.form = el, fields: {name: {}, password: renderCol && {}, other: {}}}}>
          {({fields: {name, password, other}}) => (
            <Grid>
              <FlexCol>{name}</FlexCol>
              {renderCol && <FlexCol>{password}</FlexCol>}
              <FlexCol>{other}</FlexCol>
            </Grid>
          )}
        </Form>
        <Checkbox className="col-toggle" onChange={() => this.setState({renderCol: !renderCol})}/>
      </div>
    );
  }
}

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
        <Form {...{className: 'some-form', afterSubmit, fields: {name: {initialValue: 'some-name'}}}}>
          {({fields: {name}, ...rest}) => (
            <Grid>
              <FlexCol>{name}</FlexCol>
              <FlexCol fixed>{Buttons({...rest})}</FlexCol>
            </Grid>
          )}
        </Form>, root);
    });

    it('uses the form classname', () => {
      expect('form').toHaveClass('some-form');
    });

    it('does not disable the top-level fieldset', () => {
      expect('form > fieldset').not.toBeDisabled();
    });

    it('renders an input with a default value', () => {
      expect('fieldset > .grid:eq(0) > .col:eq(0) input').toHaveValue('some-name');
    });

    it('renders Buttons', () => {
      expect(Buttons).toHaveBeenCalledWith({
        canSubmit: subject.canSubmit,
        canReset: subject.canReset,
        reset: subject.reset,
        onSubmit: subject.onSubmit,
        setState: subject.setState,
        state: subject.state,
        onChange: subject.onChange,
        onBlur: subject.onBlur,
        onChangeCheckbox: subject.onChangeCheckbox
      });
    });

    it('renders disabled buttons in a col-fixed col', () => {
      expect('fieldset > .grid:eq(0) > .col:eq(1)').toHaveClass('col-fixed');
      expect('fieldset > .grid:eq(0) > .col:eq(1) .save').toHaveAttr('type', 'submit');
      expect('fieldset > .grid:eq(0) > .col:eq(1) .save').toHaveText('Save');
      expect('fieldset > .grid:eq(0) > .col:eq(1) .save').toBeDisabled();
      expect('fieldset > .grid:eq(0) > .col:eq(1) .cancel').toHaveText('Cancel');
      expect('fieldset > .grid:eq(0) > .col:eq(1) .cancel').toBeDisabled();
    });

    describe('when deleting the name', () => {
      beforeEach(() => {
        $('fieldset > .grid:eq(0) > .col:eq(0) input').val('').simulate('change');
      });

      it('allows the name to change', () => {
        expect('fieldset > .grid:eq(0) > .col:eq(0) input').toHaveValue('');
      });

      it('renders buttons ', () => {
        expect('fieldset > .grid:eq(0) > .col:eq(1)').toHaveClass('col-fixed');
        expect('fieldset > .grid:eq(0) > .col:eq(1) .save').toBeDisabled();
        expect('fieldset > .grid:eq(0) > .col:eq(1) .cancel').not.toBeDisabled();
      });

      describe('when clicking the cancel button', () => {
        beforeEach(() => {
          $('fieldset > .grid:eq(0) > .col:eq(1) .cancel').simulate('click');
        });

        it('resets the name', () => {
          expect('fieldset > .grid:eq(0) > .col:eq(0) input').toHaveValue('some-name');
        });
      });
    });

    describe('when changing the name', () => {
      beforeEach(() => {
        $('fieldset > .grid:eq(0) > .col:eq(0) input').val('some-other-name').simulate('change');
      });

      it('allows the name to change', () => {
        expect('fieldset > .grid:eq(0) > .col:eq(0) input').toHaveValue('some-other-name');
      });

      it('renders enabled buttons ', () => {
        expect('fieldset > .grid:eq(0) > .col:eq(1)').toHaveClass('col-fixed');
        expect('fieldset > .grid:eq(0) > .col:eq(1) .save').not.toBeDisabled();
        expect('fieldset > .grid:eq(0) > .col:eq(1) .cancel').not.toBeDisabled();
      });

      describe('when clicking the cancel button', () => {
        beforeEach(() => {
          $('fieldset > .grid:eq(0) > .col:eq(1) .cancel').simulate('click');
        });

        it('resets the name', () => {
          expect('fieldset > .grid:eq(0) > .col:eq(0) input').toHaveValue('some-name');
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
          $('fieldset > .grid:eq(0) > .col:eq(1) .save').simulate('submit');
        });

        it('calls onSubmit', () => {
          expect(onSubmit).toHaveBeenCalledWith({initial: {name: 'some-name'}, current: {name: 'some-other-name'}});
        });

        it('disables the top-level fieldset', () => {
          expect('form > fieldset').toBeDisabled();
        });

        it('disables the buttons', () => {
          expect('fieldset > .grid:eq(0) > .col:eq(1) .save').toBeDisabled();
          expect('fieldset > .grid:eq(0) > .col:eq(1) .cancel').toBeDisabled();
        });

        it('renders Buttons', () => {
          expect(Buttons).toHaveBeenCalledWith({
            canSubmit: subject.canSubmit,
            canReset: subject.canReset,
            reset: subject.reset,
            onSubmit: subject.onSubmit,
            setState: subject.setState,
            state: subject.state,
            onChange: subject.onChange,
            onBlur: subject.onBlur,
            onChangeCheckbox: subject.onChangeCheckbox
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

          it('renders Buttons', () => {
            expect(Buttons).toHaveBeenCalledWith({
              canSubmit: subject.canSubmit,
              canReset: subject.canReset,
              reset: subject.reset,
              onSubmit: subject.onSubmit,
              setState: subject.setState,
              state: subject.state,
              onChange: subject.onChange,
              onBlur: subject.onBlur,
              onChangeCheckbox: subject.onChangeCheckbox
            });
          });

          it('makes both buttons disabled', () => {
            expect('fieldset > .grid:eq(0) > .col:eq(1) .save').toBeDisabled();
            expect('fieldset > .grid:eq(0) > .col:eq(1) .cancel').toBeDisabled();
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
          beforeEach(() => {
            reject(error);
            MockPromises.tick(2);
          });

          it('enables the top-level fieldset', () => {
            expect('form > fieldset').not.toBeDisabled();
          });

          it('renders Buttons', () => {
            expect(Buttons).toHaveBeenCalledWith({
              canSubmit: subject.canSubmit,
              canReset: subject.canReset,
              reset: subject.reset,
              onSubmit: subject.onSubmit,
              setState: subject.setState,
              state: subject.state,
              onChange: subject.onChange,
              onBlur: subject.onBlur,
              onChangeCheckbox: subject.onChangeCheckbox
            });
          });

          it('re-enables both buttons disabled', () => {
            expect('fieldset > .grid:eq(0) > .col:eq(1) .save').not.toBeDisabled();
            expect('fieldset > .grid:eq(0) > .col:eq(1) .cancel').not.toBeDisabled();
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
              $('fieldset > .grid:eq(0) > .col:eq(1) .cancel').simulate('click');
            });

            it('resets the name', () => {
              expect('fieldset > .grid:eq(0) > .col:eq(0) input').toHaveValue('some-name');
            });

            it('clears the errors', () => {
              expect(subject.state.errors).toEqual({});
            });
          });

          describe('when clicking the save button and the submit action resolves', () => {
            beforeEach(() => {
              onSubmit.and.returnValue(Promise.resolve());
              $('fieldset > .grid:eq(0) > .col:eq(1) .save').simulate('submit');
              MockPromises.tick(1);
            });

            it('clears the errors', () => {
              expect(subject.state.errors).toEqual({});
            });
          });
        });

        describe('when onSubmit throws an error', () => {
          let caught;

          beforeEach(() => {
            onSubmit.and.throwError(error);
            subject::setProps({onSubmit});
            try {
              subject.onSubmit();
            } catch (e) {
              caught = e;
            }
          });

          it('calls the onSubmitError', () => {
            expect(onSubmitError).toHaveBeenCalledWith(error);
          });

          it('sets the errors on the state', () => {
            expect(subject.state.errors).toBe(errors);
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
        const children = ({fields: {name}, ...rest}) => (
          <Grid>
            <FlexCol>{name}</FlexCol>
            <FlexCol fixed>{Buttons({...rest})}</FlexCol>
          </Grid>
        );
        children.propTypes = {fields: PropTypes.object};
        subject::setProps({fields: {name: {initialValue: 'some-name', validator}}, children});
      });

      describe('when the validator returns an error', () => {
        beforeEach(() => {
          validator.and.returnValue('some-error');
          $('fieldset > .grid:eq(0) > .col:eq(0) input').val('invalid value').simulate('change');
          $('fieldset > .grid:eq(0) > .col:eq(0) input').simulate('blur');
        });

        it('calls the validator', () => {
          expect(validator).toHaveBeenCalledWith('invalid value');
        });

        it('renders the error text', () => {
          expect('fieldset > .grid:eq(0) > .col:eq(0) .form-unit').toHaveClass('has-error');
          expect('fieldset > .grid:eq(0) > .col:eq(0) .help-row').toHaveText('some-error');
        });

        it('disables the submit button', () => {
          expect('.save').toBeDisabled();
        });

        describe('when the validation error is corrected', () => {
          beforeEach(() => {
            validator.and.returnValue(undefined);
            $('fieldset > .grid:eq(0) > .col:eq(0) input').val('valid value').simulate('change');
          });

          it('calls the validator', () => {
            expect(validator).toHaveBeenCalledWith('valid value');
          });

          it('removes the error text', () => {
            expect('fieldset > .grid:eq(0) > .col:eq(0) .form-unit').not.toHaveClass('has-error');
            expect('fieldset > .grid:eq(0) > .col:eq(0) .help-row').toHaveText('');
          });

          it('enables the submit button', () => {
            expect('.save').not.toBeDisabled();
          });
        });
      });

      describe('when the validator returns nothing', () => {
        beforeEach(() => {
          $('fieldset > .grid:eq(0) > .col:eq(0) input').simulate('blur');
        });

        it('calls the validator', () => {
          expect(validator).toHaveBeenCalledWith('some-name');
        });

        it('does not render error text', () => {
          expect('fieldset > .grid:eq(0) > .col:eq(0) .form-unit').not.toHaveClass('has-error');
          expect('fieldset > .grid:eq(0) > .col:eq(0) .help-row').toHaveText('');
        });
      });
    });
  });

  describe('with two required fields', () => {
    beforeEach(() => {
      subject = ReactDOM.render(
        <Form {...{className: 'some-form', afterSubmit, fields: {name: {}, password: {}}}}>
          {({fields: {name, password}, ...rest}) => (
            <Grid>
              <FlexCol>{name}</FlexCol>
              <FlexCol>{password}</FlexCol>
              <FlexCol fixed>{Buttons({...rest})}</FlexCol>
            </Grid>
          )}
        </Form>, root);
    });

    it('renders inputs without values', () => {
      expect('fieldset > .grid:eq(0) > .col:eq(0) input').toHaveValue('');
      expect('fieldset > .grid:eq(0) > .col:eq(1) input').toHaveValue('');
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
        $('fieldset > .grid:eq(0) > .col:eq(0) input').val('some-other-name').simulate('change');
      });

      it('allows the name to change', () => {
        expect('fieldset > .grid:eq(0) > .col:eq(0) input').toHaveValue('some-other-name');
      });

      it('renders buttons ', () => {
        expect('.grid:eq(0) .col:eq(2)').toHaveClass('col-fixed');
        expect('.grid:eq(0) .col:eq(2) .save').toBeDisabled();
        expect('.grid:eq(0) .col:eq(2) .cancel').not.toBeDisabled();
      });

      describe('when setting the password', () => {
        beforeEach(() => {
          $('fieldset > .grid:eq(0) > .col:eq(1) input').val('some-password').simulate('change');
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
        <Form {...{
          className: 'some-form',
          afterSubmit,
          fields: {name: {initialValue: 'some-name', label: 'Some label', optional: true}}
        }}>
          {({fields: {name}, ...rest}) => (
            <Grid>
              <FlexCol>{name}</FlexCol>
              <FlexCol fixed>{Buttons({...rest})}</FlexCol>
            </Grid>
          )}
        </Form>, root);
    });

    it('renders an optional text for the input', () => {
      expect('fieldset > .grid:eq(0) > .col:eq(0) .label-row').toHaveText('Some label(Optional)');
    });

    it('renders disabled buttons in a col-fixed col', () => {
      expect('fieldset > .grid:eq(0) > .col:eq(1)').toHaveClass('col-fixed');
      expect('fieldset > .grid:eq(0) > .col:eq(1) .save').toHaveAttr('type', 'submit');
      expect('fieldset > .grid:eq(0) > .col:eq(1) .save').toHaveText('Save');
      expect('fieldset > .grid:eq(0) > .col:eq(1) .save').toBeDisabled();
      expect('fieldset > .grid:eq(0) > .col:eq(1) .cancel').toHaveText('Cancel');
      expect('fieldset > .grid:eq(0) > .col:eq(1) .cancel').toBeDisabled();
    });

    describe('when changing the optional field', () => {
      beforeEach(() => {
        $('fieldset > .grid:eq(0) > .col:eq(0) input').val('some-other-name').simulate('change');
      });

      it('renders enabled buttons in a col-fixed col', () => {
        expect('fieldset > .grid:eq(0) > .col:eq(1) .save').not.toBeDisabled();
        expect('fieldset > .grid:eq(0) > .col:eq(1) .cancel').not.toBeDisabled();
      });
    });

    describe('when deleting the optional field', () => {
      beforeEach(() => {
        $('fieldset > .grid:eq(0) > .col:eq(0) input').val('').simulate('change');
      });

      it('renders enabled buttons in a col-fixed col', () => {
        expect('fieldset > .grid:eq(0) > .col:eq(1) .save').not.toBeDisabled();
        expect('fieldset > .grid:eq(0) > .col:eq(1) .cancel').not.toBeDisabled();
      });
    });
  });

  describe('with one required and one optional field', () => {
    beforeEach(() => {
      subject = ReactDOM.render(
        <Form {...{
          className: 'some-form',
          afterSubmit,
          fields: {name: {initialValue: 'some-name'}, password: {initialValue: 'some-password', optional: true}}
        }}>
          {({fields: {name, password}, ...rest}) => (
            <Grid>
              <FlexCol>{name}</FlexCol>
              <FlexCol>{password}</FlexCol>
              <FlexCol fixed>{Buttons({...rest})}</FlexCol>
            </Grid>
          )}
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
        $('fieldset > .grid:eq(0) > .col:eq(1) input').val('some-other-password').simulate('change');
      });

      it('renders enabled buttons in a col-fixed col', () => {
        expect('.grid:eq(0) .col:eq(2) .save').not.toBeDisabled();
        expect('.grid:eq(0) .col:eq(2) .cancel').not.toBeDisabled();
      });
    });

    describe('when deleting the optional field', () => {
      beforeEach(() => {
        $('fieldset > .grid:eq(0) > .col:eq(1) input').val('').simulate('change');
      });

      it('renders enabled buttons in a col-fixed col', () => {
        expect('.grid:eq(0) .col:eq(2) .save').not.toBeDisabled();
        expect('.grid:eq(0) .col:eq(2) .cancel').not.toBeDisabled();
      });
    });

    describe('when changing the required field', () => {
      beforeEach(() => {
        $('fieldset > .grid:eq(0) > .col:eq(0) input').val('some-other-name').simulate('change');
      });

      it('renders enabled buttons in a col-fixed col', () => {
        expect('.grid:eq(0) .col:eq(2) .save').not.toBeDisabled();
        expect('.grid:eq(0) .col:eq(2) .cancel').not.toBeDisabled();
      });
    });

    describe('when deleting the required field', () => {
      beforeEach(() => {
        $('fieldset > .grid:eq(0) > .col:eq(0) input').val('').simulate('change');
      });

      it('renders buttons in a col-fixed col', () => {
        expect('.grid:eq(0) .col:eq(2) .save').toBeDisabled();
        expect('.grid:eq(0) .col:eq(2) .cancel').not.toBeDisabled();
      });
    });
  });

  describe('with two checkbox fields', () => {
    beforeEach(() => {
      const children = () => <input type="checkbox"/>;
      subject = ReactDOM.render(
        <Form {...{fields: {check1: {initialValue: false, children}, check2: {children}}}}>
          {({fields: {check1, check2}, ...rest}) => (
            <Grid>
              <FlexCol>{check1}</FlexCol>
              <FlexCol>{check2}</FlexCol>
              <FlexCol fixed>{Buttons({...rest})}</FlexCol>
            </Grid>
          )}
        </Form>, root);
    });

    it('sets the initial state correctly', () => {
      expect(subject.state.initial).toEqual({check1: false, check2: ''});
    });

    it('sets the current state correctly', () => {
      expect(subject.state.current).toEqual({check1: false, check2: ''});
    });
  });

  describe('with two nameless fields', () => {
    let onChange;

    beforeEach(() => {
      onChange = jasmine.createSpy('onChange');

      subject = ReactDOM.render(
        <Form {...{className: 'some-form', afterSubmit, fields: {}}}>
          {() => (
            <Grid>
              <FlexCol>
                <Input className="field1" onChange={onChange}/>
              </FlexCol>
              <FlexCol>
                <Input className="field2"/>
              </FlexCol>
            </Grid>
          )}
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
        expect(onChange).toHaveBeenCalledWith(jasmine.any(Object));
      });
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
        <Form {...{className: 'some-form', afterSubmit, fields: {name: {}}}}>
          {({fields: {name}, ...rest}) => (
            <Grid>
              <FlexCol>{name}</FlexCol>
              <FlexCol fixed>{Buttons({...rest})}</FlexCol>
            </Grid>
          )}
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
        <Form {...{className: 'some-form', afterSubmit, onModified, fields: {name: {initialValue: 'some-name'}}}}>
          {({fields: {name}, ...rest}) => (
            <Grid>
              <FlexCol>{name}</FlexCol>
              <FlexCol fixed>{Buttons({...rest})}</FlexCol>
            </Grid>
          )}
        </Form>, root);
    });

    describe('when modifying', () => {
      beforeEach(() => {
        $('fieldset > .grid:eq(0) > .col:eq(0) input').val('some-other-name').simulate('change');
      });

      it('calls the onModified callback with true', () => {
        expect(onModified).toHaveBeenCalledWith(true);
        expect(onModified).not.toHaveBeenCalledWith(false);
      });

      describe('when resetting manually', () => {
        beforeEach(() => {
          onModified.calls.reset();
          $('fieldset > .grid:eq(0) > .col:eq(0) input').val('some-name').simulate('change');
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
        <Form {...{className: 'some-form', resetOnSubmit: true, fields: {name: {initialValue: 'some-name'}}}}>
          {({fields: {name}, ...rest}) => (
            <Grid>
              <FlexCol>{name}</FlexCol>
              <FlexCol fixed>{Buttons({...rest})}</FlexCol>
            </Grid>
          )}
        </Form>, root);
      $('fieldset > .grid:eq(0) > .col:eq(0) input').val('some-other-name').simulate('change');
      $('fieldset > .grid:eq(0) > .col:eq(1) .save').simulate('submit');
    });

    it('resets the form to its initial state', () => {
      MockPromises.tick();
      expect($('fieldset > .grid:eq(0) > .col:eq(0) input').val()).toEqual('some-name');
    });
  });

  describe('when passed extra props', () => {
    beforeEach(() => {
      ReactDOM.render(
        <Form {...{className: 'some-form', id: 'some-id', name: 'some-name', method: 'some-method'}} />, root);
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
      $('fieldset > .grid:eq(0) > .col:eq(0) input').val('some-name').simulate('change');
    });

    it('renders inputs without values', () => {
      expect('.grid:eq(0) .col').toHaveLength(2);
      expect('fieldset > .grid:eq(0) > .col:eq(0) input').toHaveValue('some-name');
      expect('fieldset > .grid:eq(0) > .col:eq(1) input').toHaveValue('');
    });

    it('sets the form state', () => {
      expect(subject.form.state).toEqual({
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
        expect('.grid:eq(0) .col').toHaveLength(3);
        expect('fieldset > .grid:eq(0) > .col:eq(0) input').toHaveValue('some-name');
        expect('fieldset > .grid:eq(0) > .col:eq(1) input').toHaveValue('');
        expect('fieldset > .grid:eq(0) > .col:eq(2) input').toHaveValue('');
      });

      it('updates the form state', () => {
        expect(subject.form.state).toEqual({
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
          <Form {...{fields: {title: {}}}}>
            {({fields: {title}}) => <Grid><FlexCol>{title}</FlexCol></Grid>}
          </Form>, root);
        $('.form input').val('mytitle').simulate('change');
      });

      it('parses the value from the event', () => {
        expect(subject.state.current).toEqual({title: 'mytitle'});
      });
    });

    describe('when passed a value', () => {
      beforeEach(() => {
        const Component = ({onChange}) => <input {...{onChange: () => onChange('some-title')}}/>;
        Component.propTypes = {onChange: PropTypes.func};
        subject = ReactDOM.render(
          <Form {...{fields: {title: {children: <Component/>}}}}>
            {({fields: {title}}) => <Grid><FlexCol>{title}</FlexCol></Grid>}
          </Form>, root);
        $('.form input').val('').simulate('change');
      });

      it('uses the value', () => {
        expect(subject.state.current).toEqual({title: 'some-title'});
      });
    });
  });
});