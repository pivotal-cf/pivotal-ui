import '../spec_helper';
import {Grid, FlexCol} from '../../../src/react/flex-grids';
import {Form} from '../../../src/react/forms';
import {Input} from '../../../src/react/inputs';
import {DefaultButton} from '../../../src/react/buttons';
import {Checkbox} from '../../../src/react/checkbox';
import React from 'react';
import PropTypes from 'prop-types';

describe('Form', () => {
  let Buttons, subject, afterSubmit;

  beforeEach(() => {
    afterSubmit = jest.fn().mockName('afterSubmit');
    Buttons = jest.fn().mockName('Buttons');
    Buttons.mockImplementation(({canSubmit, canReset, reset}) => (
      <div>
        <DefaultButton {...{className: 'save', type: 'submit', disabled: !canSubmit()}}>Save</DefaultButton>
        <DefaultButton {...{className: 'cancel', disabled: !canReset(), onClick: reset}}>Cancel</DefaultButton>
      </div>
    ));
  });

  describe('with one required field', () => {
    let fields;

    beforeEach(() => {
      fields = {name: {initialValue: 'some-name'}};
      subject = shallow(<Form {...{className: 'some-form', afterSubmit, fields}}>
        {({fields: {name}, ...rest}) => (
          <Grid>
            <FlexCol>{name}</FlexCol>
            <FlexCol fixed>{Buttons({...rest})}</FlexCol>
          </Grid>
        )}
      </Form>);
    });

    it('uses the form classname', () => {
      expect(subject.find('form').hasClass('some-form')).toBeTruthy();
    });

    it('does not disable the top-level fieldset', () => {
      expect(subject.find('form > fieldset').prop('disabled')).toBeFalsy();
    });

    it('renders an input with a default value', () => {
      expect(subject.find('fieldset > .grid').at(0).find('> .col').at(0).find('input').prop('value')).toBe('some-name');
    });

    it('renders Buttons', () => {
      expect(Buttons).toHaveBeenCalledWith({
        canSubmit: subject.canSubmit,
        canReset: subject.canReset,
        reset: subject.reset,
        onSubmit: subject.onSubmit,
        state: subject.state,
        onBlur: subject.onBlur,
        setValues: subject.setValues,
        submitting: false
      });
    });

    it('renders disabled buttons in a col-fixed col', () => {
      expect(subject.find('fieldset > .grid').at(0).find('> .col').at(1).hasClass('col-fixed')).toBeTruthy();
      expect(subject.find('fieldset > .grid').at(0).find('> .col').at(1).find('.save').prop('type')).toBe('submit');
      expect(subject.find('fieldset > .grid').at(0).find('> .col').at(1).find('.save').text()).toBe('Save');
      expect(subject.find('fieldset > .grid').at(0).find('> .col').at(1).find('.save').prop('disabled')).toBeTruthy();
      expect(subject.find('fieldset > .grid').at(0).find('> .col').at(1).find('.cancel').text()).toBe('Cancel');
      expect(subject.find('fieldset > .grid').at(0).find('> .col').at(1).find('.cancel').prop('disabled')).toBeTruthy();
    });

    describe('when adding a field', () => {
      beforeEach(() => {
        fields.age = {initialValue: '0'};
        subject.setProps({fields});
      });

      it('updates the state', () => {
        expect(subject.state.initial.age).toBe('0');
        expect(subject.state.current.age).toBe('0');
      });
    });

    describe('when deleting the name', () => {
      beforeEach(() => {
        subject.find('fieldset > .grid').at(0).find('> .col').at(0).find('input').simulate('change', {
          target: {
            value: ''
          }
        });
      });

      it('allows the name to change', () => {
        expect(subject.find('fieldset > .grid').at(0).find('> .col').at(0).find('input').prop('value')).toBe('');
      });

      it('renders buttons ', () => {
        expect(subject.find('fieldset > .grid').at(0).find('> .col').at(1).hasClass('col-fixed')).toBeTruthy();
        expect(subject.find('fieldset > .grid').at(0).find('> .col').at(1).find('.save').prop('disabled')).toBeTruthy();
        expect(subject.find('fieldset > .grid').at(0).find('> .col').at(1).find('.cancel').prop('disabled')).toBeFalsy();
      });

      describe('when clicking the cancel button', () => {
        beforeEach(() => {
          subject.find('fieldset > .grid').at(0).find('> .col').at(1).find('.cancel').simulate('click');
        });

        it('resets the name', () => {
          expect(subject.find('fieldset > .grid').at(0).find('> .col').at(0).find('input').prop('value')).toBe('some-name');
        });
      });
    });

    describe('when changing the name', () => {
      beforeEach(() => {
        subject.find('fieldset > .grid').at(0).find('> .col').at(0).find('input').simulate('change', {
          target: {
            value: 'some-other-name'
          }
        });
      });

      it('allows the name to change', () => {
        expect(subject.find('fieldset > .grid').at(0).find('> .col').at(0).find('input').prop('value')).toBe('some-other-name');
      });

      it('renders enabled buttons ', () => {
        expect(subject.find('fieldset > .grid').at(0).find('> .col').at(1).hasClass('col-fixed')).toBeTruthy();
        expect(subject.find('fieldset > .grid').at(0).find('> .col').at(1).find('.save').prop('disabled')).toBeFalsy();
        expect(subject.find('fieldset > .grid').at(0).find('> .col').at(1).find('.cancel').prop('disabled')).toBeFalsy();
      });

      describe('when clicking the cancel button', () => {
        beforeEach(() => {
          subject.find('fieldset > .grid').at(0).find('> .col').at(1).find('.cancel').simulate('click');
        });

        it('resets the name', () => {
          expect(subject.find('fieldset > .grid').at(0).find('> .col').at(0).find('input').prop('value')).toBe('some-name');
        });
      });

      describe('when clicking the update button', () => {
        let error, errors, onSubmitError, onSubmit, resolve, reject;

        beforeEach(() => {
          Promise.onPossiblyUnhandledRejection(jest.fn().mockName('reject'));
          error = new Error('invalid');
          errors = {name: 'invalid'};
          onSubmitError = jest.fn().mockName('onSubmitError').mockReturnValue(errors);
          onSubmit = jest.fn().mockName('onSubmit');
          onSubmit.mockImplementation(() => new Promise((res, rej) => {
            resolve = res;
            reject = rej;
          }));
          Buttons.mockReset();
          subject.setProps({onSubmitError, onSubmit});
          subject.find('fieldset > .grid').at(0).find('> .col').at(1).find('.save').simulate('submit');
        });

        it('calls onSubmit', () => {
          expect(onSubmit).toHaveBeenCalledWith({initial: {name: 'some-name'}, current: {name: 'some-other-name'}});
        });

        it('disables the top-level fieldset', () => {
          expect(subject.find('form > fieldset').prop('disabled')).toBeTruthy();
        });

        it('disables the buttons', () => {
          expect(subject.find('fieldset > .grid').at(0).find('> .col').at(1).find('.save').prop('disabled')).toBeTruthy();
          expect(subject.find('fieldset > .grid').at(0).find('> .col').at(1).find('.cancel').prop('disabled')).toBeTruthy();
        });

        it('renders Buttons', () => {
          expect(Buttons).toHaveBeenCalledWith({
            canSubmit: subject.canSubmit,
            canReset: subject.canReset,
            reset: subject.reset,
            onSubmit: subject.onSubmit,
            state: subject.state,
            onBlur: subject.onBlur,
            setValues: subject.setValues,
            submitting: true
          });
        });

        describe('when the submit promise resolves', () => {
          beforeEach(() => {
            resolve({result: 'success'});
            MockPromises.tick(1);
          });

          it('enables the top-level fieldset', () => {
            expect(subject.find('form > fieldset').prop('disabled')).toBeFalsy();
          });

          it('renders Buttons', () => {
            expect(Buttons).toHaveBeenCalledWith({
              canSubmit: subject.canSubmit,
              canReset: subject.canReset,
              reset: subject.reset,
              onSubmit: subject.onSubmit,
              state: subject.state,
              onBlur: subject.onBlur,
              setValues: subject.setValues,
              submitting: false
            });
          });

          it('makes both buttons disabled', () => {
            expect(subject.find('fieldset > .grid').at(0).find('> .col').at(1).find('.save').prop('disabled')).toBeTruthy();
            expect(subject.find('fieldset > .grid').at(0).find('> .col').at(1).find('.cancel').prop('disabled')).toBeTruthy();
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
            expect(subject.find('form > fieldset').prop('disabled')).toBeFalsy();
          });

          it('renders Buttons', () => {
            expect(Buttons).toHaveBeenCalledWith({
              canSubmit: subject.canSubmit,
              canReset: subject.canReset,
              reset: subject.reset,
              onSubmit: subject.onSubmit,
              state: subject.state,
              onBlur: subject.onBlur,
              setValues: subject.setValues,
              submitting: false
            });
          });

          it('re-enables both buttons disabled', () => {
            expect(subject.find('fieldset > .grid').at(0).find('> .col').at(1).find('.save').prop('disabled')).toBeFalsy();
            expect(subject.find('fieldset > .grid').at(0).find('> .col').at(1).find('.cancel').prop('disabled')).toBeFalsy();
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
              subject.find('fieldset > .grid').at(0).find('> .col').at(1).find('.cancel').simulate('click');
            });

            it('resets the name', () => {
              expect(subject.find('fieldset > .grid').at(0).find('> .col').at(0).find('input').prop('value')).toBe('some-name');
            });

            it('clears the errors', () => {
              expect(subject.state.errors).toEqual({});
            });
          });

          describe('when clicking the save button and the submit action resolves', () => {
            beforeEach(() => {
              onSubmit.mockReturnValue(Promise.resolve());
              subject.find('fieldset > .grid').at(0).find('> .col').at(1).find('.save').simulate('submit');
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
            subject.setProps({onSubmit});
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
        validator = jest.fn().mockName('validator');
        const children = ({fields: {name}, ...rest}) => (
          <Grid>
            <FlexCol>{name}</FlexCol>
            <FlexCol fixed>{Buttons({...rest})}</FlexCol>
          </Grid>
        );
        children.propTypes = {fields: PropTypes.object};
        subject.setProps({fields: {name: {initialValue: 'some-name', validator}, age: false}, children});
      });

      describe('when the validator returns an error', () => {
        beforeEach(() => {
          validator.mockReturnValue('some-error');
          subject.find('fieldset > .grid').at(0).find('> .col').at(0).find('input').simulate('change', {
            target: {
              value: 'invalid value'
            }
          });
          subject.find('fieldset > .grid').at(0).find('> .col').at(0).find('input').simulate('blur');
        });

        it('calls the validator', () => {
          expect(validator).toHaveBeenCalledWith('invalid value');
        });

        it('renders the error text', () => {
          expect(subject.find('fieldset > .grid').at(0).find('> .col').at(0).find('.form-unit').hasClass('has-error')).toBeTruthy();
          expect(subject.find('fieldset > .grid').at(0).find('> .col').at(0).find('.help-row').text()).toBe('some-error');
        });

        it('disables the submit button', () => {
          expect(subject.find('.save').prop('disabled')).toBeTruthy();
        });

        describe('when the validation error is corrected', () => {
          beforeEach(() => {
            validator.mockReturnValue(undefined);
            subject.find('fieldset > .grid').at(0).find('> .col').at(0).find('input').simulate('change', {
              target: {
                value: 'valid value'
              }
            });
          });

          it('calls the validator', () => {
            expect(validator).toHaveBeenCalledWith('valid value');
          });

          it('removes the error text', () => {
            expect(subject.find('fieldset > .grid').at(0).find('> .col').at(0).find('.form-unit').hasClass('has-error')).toBeFalsy();
            expect(subject.find('fieldset > .grid').at(0).find('> .col').at(0).find('.help-row').text()).toBe('');
          });

          it('enables the submit button', () => {
            expect(subject.find('.save').prop('disabled')).toBeFalsy();
          });
        });
      });

      describe('when the validator returns nothing', () => {
        beforeEach(() => {
          subject.find('fieldset > .grid').at(0).find('> .col').at(0).find('input').simulate('blur');
        });

        it('calls the validator', () => {
          expect(validator).toHaveBeenCalledWith('some-name');
        });

        it('does not render error text', () => {
          expect(subject.find('fieldset > .grid').at(0).find('> .col').at(0).find('.form-unit').hasClass('has-error')).toBeFalsy();
          expect(subject.find('fieldset > .grid').at(0).find('> .col').at(0).find('.help-row').text()).toBe('');
        });
      });
    });
  });

  describe('with one required field where initialValue is empty string', () => {
    let fields;

    beforeEach(() => {
      fields = {name: {initialValue: ''}};
      subject = shallow(<Form {...{className: 'some-form', afterSubmit, fields}}>
        {({fields: {name}, ...rest}) => (
          <Grid>
            <FlexCol>{name}</FlexCol>
            <FlexCol fixed>{Buttons({...rest})}</FlexCol>
          </Grid>
        )}
      </Form>);
    });

    it('stores empty string in the state', () => {
      expect(subject.state.initial.name).toBe('');
      expect(subject.state.current.name).toBe('');
    });
  });

  describe('with one required field where initialValue is undefined', () => {
    let fields;

    beforeEach(() => {
      fields = {name: {initialValue: undefined}};
      subject = shallow(<Form {...{className: 'some-form', afterSubmit, fields}}>
        {({fields: {name}, ...rest}) => (
          <Grid>
            <FlexCol>{name}</FlexCol>
            <FlexCol fixed>{Buttons({...rest})}</FlexCol>
          </Grid>
        )}
      </Form>);
    });

    it('stores empty string in the state', () => {
      expect(subject.state.initial.name).toBe('');
      expect(subject.state.current.name).toBe('');
    });
  });

  describe('with one required field where initialValue is null', () => {
    let fields;

    beforeEach(() => {
      fields = {name: {initialValue: null}};
      subject = shallow(<Form {...{className: 'some-form', afterSubmit, fields}}>
        {({fields: {name}, ...rest}) => (
          <Grid>
            <FlexCol>{name}</FlexCol>
            <FlexCol fixed>{Buttons({...rest})}</FlexCol>
          </Grid>
        )}
      </Form>);
    });

    it('stores empty string in the state', () => {
      expect(subject.state.initial.name).toBe('');
      expect(subject.state.current.name).toBe('');
    });
  });

  describe('with one required field where initialValue is false', () => {
    let fields;

    beforeEach(() => {
      fields = {name: {initialValue: false}};
      subject = shallow(<Form {...{className: 'some-form', afterSubmit, fields}}>
        {({fields: {name}, ...rest}) => (
          <Grid>
            <FlexCol>{name}</FlexCol>
            <FlexCol fixed>{Buttons({...rest})}</FlexCol>
          </Grid>
        )}
      </Form>);
    });

    it('stores empty string in the state', () => {
      expect(subject.state.initial.name).toBe(false);
      expect(subject.state.current.name).toBe(false);
    });
  });

  describe('with one required field where initialValue is zero', () => {
    let fields;

    beforeEach(() => {
      fields = {name: {initialValue: 0}};
      subject = shallow(<Form {...{className: 'some-form', afterSubmit, fields}}>
        {({fields: {name}, ...rest}) => (
          <Grid>
            <FlexCol>{name}</FlexCol>
            <FlexCol fixed>{Buttons({...rest})}</FlexCol>
          </Grid>
        )}
      </Form>);
    });

    it('stores empty string in the state', () => {
      expect(subject.state.initial.name).toBe(0);
      expect(subject.state.current.name).toBe(0);
    });
  });

  describe('with two required fields', () => {
    beforeEach(() => {
      subject = shallow(<Form {...{className: 'some-form', afterSubmit, fields: {name: {}, password: {}}}}>
        {({fields: {name, password}, ...rest}) => (
          <Grid>
            <FlexCol>{name}</FlexCol>
            <FlexCol>{password}</FlexCol>
            <FlexCol fixed>{Buttons({...rest})}</FlexCol>
          </Grid>
        )}
      </Form>);
    });

    it('renders inputs without values', () => {
      expect(subject.find('fieldset > .grid').at(0).find('> .col').at(0).find('input').prop('value')).toBe('');
      expect(subject.find('fieldset > .grid').at(0).find('> .col').at(1).find('input').prop('value')).toBe('');
    });

    it('renders disabled buttons in a col-fixed col', () => {
      expect(subject.find('.grid').at(0).find('.col').at(2).hasClass('col-fixed')).toBeTruthy();
      expect(subject.find('.grid').at(0).find('.col').at(2).find('.save').prop('type')).toBe('submit');
      expect(subject.find('.grid').at(0).find('.col').at(2).find('.save').text()).toBe('Save');
      expect(subject.find('.grid').at(0).find('.col').at(2).find('.save').prop('disabled')).toBeTruthy();
      expect(subject.find('.grid').at(0).find('.col').at(2).find('.cancel').text()).toBe('Cancel');
      expect(subject.find('.grid').at(0).find('.col').at(2).find('.cancel').prop('disabled')).toBeTruthy();
    });

    describe('when setting the name', () => {
      beforeEach(() => {
        subject.find('fieldset > .grid').at(0).find('> .col').at(0).find('input').simulate('change', {
          target: {
            value: 'some-other-name'
          }
        });
      });

      it('allows the name to change', () => {
        expect(subject.find('fieldset > .grid').at(0).find('> .col').at(0).find('input').prop('value')).toBe('some-other-name');
      });

      it('renders buttons ', () => {
        expect(subject.find('.grid').at(0).find('.col').at(2).hasClass('col-fixed')).toBeTruthy();
        expect(subject.find('.grid').at(0).find('.col').at(2).find('.save').prop('disabled')).toBeTruthy();
        expect(subject.find('.grid').at(0).find('.col').at(2).find('.cancel').prop('disabled')).toBeFalsy();
      });

      describe('when setting the password', () => {
        beforeEach(() => {
          subject.find('fieldset > .grid').at(0).find('> .col').at(1).find('input').simulate('change', {
            target: {
              value: 'some-password'
            }
          });
        });

        it('renders enabled buttons ', () => {
          expect(subject.find('.grid').at(0).find('.col').at(2).hasClass('col-fixed')).toBeTruthy();
          expect(subject.find('.grid').at(0).find('.col').at(2).find('.save').prop('disabled')).toBeFalsy();
          expect(subject.find('.grid').at(0).find('.col').at(2).find('.cancel').prop('disabled')).toBeFalsy();
        });
      });
    });
  });

  describe('with two required fields, one required based on optional callback', () => {
    let optional;

    beforeEach(() => {
      optional = jest.fn().mockName('optional');
      subject = shallow(<Form {...{className: 'some-form', afterSubmit, fields: {name: {}, password: {optional}}}}>
        {({fields: {name, password}, ...rest}) => (
          <Grid>
            <FlexCol>{name}</FlexCol>
            <FlexCol>{password}</FlexCol>
            <FlexCol fixed>{Buttons({...rest})}</FlexCol>
          </Grid>
        )}
      </Form>);
    });

    it('renders inputs without values', () => {
      expect(subject.find('fieldset > .grid').at(0).find('> .col').at(0).find('input').prop('value')).toBe('');
      expect(subject.find('fieldset > .grid').at(0).find('> .col').at(1).find('input').prop('value')).toBe('');
    });

    it('renders disabled buttons in a col-fixed col', () => {
      expect(subject.find('.grid').at(0).find('.col').at(2).hasClass('col-fixed')).toBeTruthy();
      expect(subject.find('.grid').at(0).find('.col').at(2).find('.save').prop('type')).toBe('submit');
      expect(subject.find('.grid').at(0).find('.col').at(2).find('.save').text()).toBe('Save');
      expect(subject.find('.grid').at(0).find('.col').at(2).find('.save').prop('disabled')).toBeTruthy();
      expect(subject.find('.grid').at(0).find('.col').at(2).find('.cancel').text()).toBe('Cancel');
      expect(subject.find('.grid').at(0).find('.col').at(2).find('.cancel').prop('disabled')).toBeTruthy();
    });

    describe('when setting the name', () => {
      beforeEach(() => {
        subject.find('fieldset > .grid').at(0).find('> .col').at(0).find('input').simulate('change', {
          target: {
            value: 'some-other-name'
          }
        });
      });

      it('allows the name to change', () => {
        expect(subject.find('fieldset > .grid').at(0).find('> .col').at(0).find('input').prop('value')).toBe('some-other-name');
      });

      it('renders buttons ', () => {
        expect(subject.find('.grid').at(0).find('.col').at(2).hasClass('col-fixed')).toBeTruthy();
        expect(subject.find('.grid').at(0).find('.col').at(2).find('.save').prop('disabled')).toBeTruthy();
        expect(subject.find('.grid').at(0).find('.col').at(2).find('.cancel').prop('disabled')).toBeFalsy();
      });
    });
  });

  describe('with one optional field', () => {
    beforeEach(() => {
      subject = shallow(<Form {...{
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
      </Form>);
    });

    it('renders an optional text for the input', () => {
      expect(subject.find('fieldset > .grid').at(0).find('> .col').at(0).find('.label-row').text()).toBe('Some label(Optional)');
    });

    it('renders disabled buttons in a col-fixed col', () => {
      expect(subject.find('fieldset > .grid').at(0).find('> .col').at(1).hasClass('col-fixed')).toBeTruthy();
      expect(subject.find('fieldset > .grid').at(0).find('> .col').at(1).find('.save').prop('type')).toBe('submit');
      expect(subject.find('fieldset > .grid').at(0).find('> .col').at(1).find('.save').text()).toBe('Save');
      expect(subject.find('fieldset > .grid').at(0).find('> .col').at(1).find('.save').prop('disabled')).toBeTruthy();
      expect(subject.find('fieldset > .grid').at(0).find('> .col').at(1).find('.cancel').text()).toBe('Cancel');
      expect(subject.find('fieldset > .grid').at(0).find('> .col').at(1).find('.cancel').prop('disabled')).toBeTruthy();
    });

    describe('when changing the optional field', () => {
      beforeEach(() => {
        subject.find('fieldset > .grid').at(0).find('> .col').at(0).find('input').simulate('change', {
          target: {
            value: 'some-other-name'
          }
        });
      });

      it('renders enabled buttons in a col-fixed col', () => {
        expect(subject.find('fieldset > .grid').at(0).find('> .col').at(1).find('.save').prop('disabled')).toBeFalsy();
        expect(subject.find('fieldset > .grid').at(0).find('> .col').at(1).find('.cancel').prop('disabled')).toBeFalsy();
      });
    });

    describe('when deleting the optional field', () => {
      beforeEach(() => {
        subject.find('fieldset > .grid').at(0).find('> .col').at(0).find('input').simulate('change', {
          target: {
            value: ''
          }
        });
      });

      it('renders enabled buttons in a col-fixed col', () => {
        expect(subject.find('fieldset > .grid').at(0).find('> .col').at(1).find('.save').prop('disabled')).toBeFalsy();
        expect(subject.find('fieldset > .grid').at(0).find('> .col').at(1).find('.cancel').prop('disabled')).toBeFalsy();
      });
    });
  });

  describe('with one required and one optional field', () => {
    beforeEach(() => {
      subject = shallow(<Form {...{
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
      </Form>);
    });

    it('renders disabled buttons in a col-fixed col', () => {
      expect(subject.find('.grid').at(0).find('.col').at(2).hasClass('col-fixed')).toBeTruthy();
      expect(subject.find('.grid').at(0).find('.col').at(2).find('.save').prop('type')).toBe('submit');
      expect(subject.find('.grid').at(0).find('.col').at(2).find('.save').text()).toBe('Save');
      expect(subject.find('.grid').at(0).find('.col').at(2).find('.save').prop('disabled')).toBeTruthy();
      expect(subject.find('.grid').at(0).find('.col').at(2).find('.cancel').text()).toBe('Cancel');
      expect(subject.find('.grid').at(0).find('.col').at(2).find('.cancel').prop('disabled')).toBeTruthy();
    });

    describe('when changing the optional field', () => {
      beforeEach(() => {
        subject.find('fieldset > .grid').at(0).find('> .col').at(1).find('input').simulate('change', {
          target: {
            value: 'some-other-password'
          }
        });
      });

      it('renders enabled buttons in a col-fixed col', () => {
        expect(subject.find('.grid').at(0).find('.col').at(2).find('.save').prop('disabled')).toBeFalsy();
        expect(subject.find('.grid').at(0).find('.col').at(2).find('.cancel').prop('disabled')).toBeFalsy();
      });
    });

    describe('when deleting the optional field', () => {
      beforeEach(() => {
        subject.find('fieldset > .grid').at(0).find('> .col').at(1).find('input').simulate('change', {
          target: {
            value: ''
          }
        });
      });

      it('renders enabled buttons in a col-fixed col', () => {
        expect(subject.find('.grid').at(0).find('.col').at(2).find('.save').prop('disabled')).toBeFalsy();
        expect(subject.find('.grid').at(0).find('.col').at(2).find('.cancel').prop('disabled')).toBeFalsy();
      });
    });

    describe('when changing the required field', () => {
      beforeEach(() => {
        subject.find('fieldset > .grid').at(0).find('> .col').at(0).find('input').simulate('change', {
          target: {
            value: 'some-other-name'
          }
        });
      });

      it('renders enabled buttons in a col-fixed col', () => {
        expect(subject.find('.grid').at(0).find('.col').at(2).find('.save').prop('disabled')).toBeFalsy();
        expect(subject.find('.grid').at(0).find('.col').at(2).find('.cancel').prop('disabled')).toBeFalsy();
      });
    });

    describe('when deleting the required field', () => {
      beforeEach(() => {
        subject.find('fieldset > .grid').at(0).find('> .col').at(0).find('input').simulate('change', {
          target: {
            value: ''
          }
        });
      });

      it('renders buttons in a col-fixed col', () => {
        expect(subject.find('.grid').at(0).find('.col').at(2).find('.save').prop('disabled')).toBeTruthy();
        expect(subject.find('.grid').at(0).find('.col').at(2).find('.cancel').prop('disabled')).toBeFalsy();
      });
    });
  });

  describe('with two checkbox fields', () => {
    beforeEach(() => {
      const children = () => <input type="checkbox"/>;
      subject = shallow(<Form {...{fields: {check1: {initialValue: false, children}, check2: {children}}}}>
        {({fields: {check1, check2}, ...rest}) => (
          <Grid>
            <FlexCol>{check1}</FlexCol>
            <FlexCol>{check2}</FlexCol>
            <FlexCol fixed>{Buttons({...rest})}</FlexCol>
          </Grid>
        )}
      </Form>);
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
      onChange = jest.fn().mockName('onChange');

      subject = shallow(<Form {...{className: 'some-form', afterSubmit, fields: {}}}>
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
      </Form>);
    });

    it('does not store their values in the state', () => {
      expect(subject.state.initial).toEqual({});
    });

    describe('when one field is updated', () => {
      beforeEach(() => {
        subject.find('.field1').simulate('change', {
          target: {
            value: 'hello'
          }
        });
      });

      it('does not update the state', () => {
        expect(subject.state.initial).toEqual({});
      });

      it('does not update the other', () => {
        expect(subject.find('.field2').val()).toEqual('');
      });

      it('retains the value in the input', () => {
        expect(subject.find('.field1').val()).toEqual('hello');
      });

      it('calls the given onChange callback', () => {
        expect(onChange).toHaveBeenCalledWith(expect.any(Object));
      });
    });
  });

  describe('canSubmit with a custom checkRequiredFields callback ', () => {
    let checkRequiredFields;

    beforeEach(() => {
      checkRequiredFields = jest.fn().mockName('checkRequiredFields');
      Buttons.mockImplementation(({canSubmit}) => (
        <DefaultButton {...{
          className: 'save',
          type: 'submit',
          disabled: !canSubmit({checkRequiredFields})
        }}>Save</DefaultButton>
      ));

      subject = shallow(<Form {...{className: 'some-form', afterSubmit, fields: {name: {}}}}>
        {({fields: {name}, ...rest}) => (
          <Grid>
            <FlexCol>{name}</FlexCol>
            <FlexCol fixed>{Buttons({...rest})}</FlexCol>
          </Grid>
        )}
      </Form>);
      subject.find('input').simulate('change', {
        target: {
          value: 'some-name'
        }
      });
    });

    describe('when checking required fields returns true', () => {
      beforeEach(() => {
        checkRequiredFields.mockReturnValue(true);
        subject.update();
      });

      it('renders an enabled save button', () => {
        expect(subject.find('.save').prop('disabled')).toBeFalsy();
      });
    });

    describe('when checking required fields returns false', () => {
      beforeEach(() => {
        checkRequiredFields.mockReturnValue(false);
        subject.update();
      });

      it('renders a disabled save button', () => {
        expect(subject.find('.save').prop('disabled')).toBeTruthy();
      });
    });
  });

  describe('onModified', () => {
    let onModified;

    beforeEach(() => {
      onModified = jest.fn().mockName('onModified');

      subject = shallow(
        <Form {...{className: 'some-form', afterSubmit, onModified, fields: {name: {initialValue: 'some-name'}}}}>
          {({fields: {name}, ...rest}) => (
            <Grid>
              <FlexCol>{name}</FlexCol>
              <FlexCol fixed>{Buttons({...rest})}</FlexCol>
            </Grid>
          )}
        </Form>
      );
    });

    describe('when modifying', () => {
      beforeEach(() => {
        subject.find('fieldset > .grid').at(0).find('> .col').at(0).find('input').simulate('change', {
          target: {
            value: 'some-other-name'
          }
        });
      });

      it('calls the onModified callback with true', () => {
        expect(onModified).toHaveBeenCalledWith(true);
        expect(onModified).not.toHaveBeenCalledWith(false);
      });

      describe('when resetting manually', () => {
        beforeEach(() => {
          onModified.mockReset();
          subject.find('fieldset > .grid').at(0).find('> .col').at(0).find('input').simulate('change', {
            target: {
              value: 'some-name'
            }
          });
        });

        it('calls the onModified callback with false', () => {
          expect(onModified).toHaveBeenCalledWith(false);
          expect(onModified).not.toHaveBeenCalledWith(true);
        });
      });

      describe('when resetting with the reset callback', () => {
        beforeEach(() => {
          onModified.mockReset();
          subject.find('.cancel').simulate('click');
        });

        it('calls the onModified callback with false', () => {
          expect(onModified).toHaveBeenCalledWith(false);
          expect(onModified).not.toHaveBeenCalledWith(true);
        });
      });

      describe('when submitting', () => {
        beforeEach(() => {
          onModified.mockReset();
          subject.find('.save').simulate('click');
          MockPromises.tick();
        });

        it('calls the onModified callback with false', () => {
          expect(onModified).toHaveBeenCalledWith(false);
          expect(onModified).not.toHaveBeenCalledWith(true);
        });
      });

      describe('when unmounting', () => {
        beforeEach(() => {
          onModified.mockReset();
          // ReactDOM.unmountComponentAtNode(root); // TODO: remove?
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
      subject = shallow(
        <Form {...{className: 'some-form', resetOnSubmit: true, fields: {name: {initialValue: 'some-name'}}}}>
          {({fields: {name}, ...rest}) => (
            <Grid>
              <FlexCol>{name}</FlexCol>
              <FlexCol fixed>{Buttons({...rest})}</FlexCol>
            </Grid>
          )}
        </Form>
      );
      subject.find('fieldset > .grid').at(0).find('> .col').at(0).find('input').simulate('change', {
        target: {
          value: 'some-other-name'
        }
      });
      subject.find('fieldset > .grid').at(0).find('> .col').at(1).find('.save').simulate('submit');
    });

    it('resets the form to its initial state', () => {
      MockPromises.tick();
      expect(subject.find('fieldset > .grid').at(0).find('> .col').at(0).find('input').val()).toEqual('some-name');
    });
  });

  describe('when passed extra props', () => {
    beforeEach(() => {
      subject = shallow(<Form {...{className: 'some-form', id: 'some-id', name: 'some-name', method: 'some-method'}}/>);
    });

    it('passes them to the form tag', () => {
      expect(subject.find('.some-form').prop('id')).toBe('some-id');
      expect(subject.find('.some-form').prop('name')).toBe('some-name');
      expect(subject.find('.some-form').prop('method')).toBe('some-method');
    });
  });

  describe('when rendering a Page component', () => {
    beforeEach(() => {
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

      subject = shallow(<Page/>);
      subject.find('fieldset > .grid').at(0).find('> .col').at(0).find('input').simulate('change', {
        target: {
          value: 'some-name'
        }
      });
    });

    it('renders inputs without values', () => {
      expect('.grid:eq(0) .col').toHaveLength(2);
      expect(subject.find('fieldset > .grid').at(0).find('> .col').at(0).find('input').prop('value')).toBe('some-name');
      expect(subject.find('fieldset > .grid').at(0).find('> .col').at(1).find('input').prop('value')).toBe('');
    });

    it('sets the form state', () => {
      expect(subject.form.state).toEqual({
        submitting: false,
        errors: {},
        initial: {name: '', other: ''},
        current: {name: 'some-name', other: ''},
        ids: {
          name: expect.any(String),
          other: expect.any(String)
        }
      });
    });

    describe('when adding a new col', () => {
      beforeEach(() => {
        subject.find('.col-toggle input').simulate('click');
      });

      it('renders the new col', () => {
        expect('.grid:eq(0) .col').toHaveLength(3);
        expect(subject.find('fieldset > .grid').at(0).find('> .col').at(0).find('input').prop('value')).toBe('some-name');
        expect(subject.find('fieldset > .grid').at(0).find('> .col').at(1).find('input').prop('value')).toBe('');
        expect(subject.find('fieldset > .grid').at(0).find('> .col').at(2).find('input').prop('value')).toBe('');
      });

      it('updates the form state', () => {
        expect(subject.form.state).toEqual({
          submitting: false,
          errors: {},
          initial: {name: '', password: '', other: ''},
          current: {name: 'some-name', password: '', other: ''},
          ids: {
            name: expect.any(String),
            password: expect.any(String),
            other: expect.any(String)
          }
        });
      });
    });
  });

  describe('when passing values to built-in onChange', () => {
    let subject;

    describe('when passed an event', () => {
      beforeEach(() => {
        subject = shallow(<Form {...{fields: {title: {}}}}>
          {({fields: {title}}) => <Grid><FlexCol>{title}</FlexCol></Grid>}
        </Form>);
        subject.find('.form input').simulate('change', {
          target: {
            value: 'mytitle'
          }
        });
      });

      it('parses the value from the event', () => {
        expect(subject.state.current).toEqual({title: 'mytitle'});
      });
    });

    describe('when not passed an event', () => {
      beforeEach(() => {
        const Component = ({onChange}) => <input {...{onChange}}/>;
        Component.propTypes = {onChange: PropTypes.func};
        subject = shallow(<Form {...{fields: {title: {children: <Component/>}}}}>
          {({fields: {title}}) => <Grid><FlexCol>{title}</FlexCol></Grid>}
        </Form>);
        subject.find('.form input').simulate('change', {
          target: {
            value: 'some-title'
          }
        });
      });

      it('uses the value', () => {
        expect(subject.state.current).toEqual({title: 'some-title'});
      });
    });
  });

  describe('when a field has a custom onChange', () => {
    let persist;

    beforeEach(() => {
      persist = jest.fn().mockName('persist');
      subject = shallow(<Form {...{
        fields: {
          title: {
            children: ({setValues}) => <input {...{onChange: () => setValues({name: 'Jane'})}}/>
          }, name: {initialValue: 'John'}
        }
      }}>
        {({fields: {title}}) => <Grid><FlexCol>{title}</FlexCol></Grid>}
      </Form>);
      subject.find('.form input').simulate('change', {
        target: {
          value: 'some-title'
        }
      });
    });

    it('persists the event', () => {
      expect(persist).toHaveBeenCalledWith();
    });

    it('updates the current state', () => {
      expect(subject.state.current).toEqual({title: 'some-title', name: 'Jane'});
    });
  });

  describe('when a checkbox field has a custom onChange', () => {
    beforeEach(() => {
      subject = shallow(<Form {...{
        fields: {
          title: {
            children: ({setValues}) => <Checkbox {...{onChange: () => setValues({name: 'Jane'})}}/>
          }, name: {initialValue: 'John'}
        }
      }}>
        {({fields: {title}}) => <Grid><FlexCol>{title}</FlexCol></Grid>}
      </Form>);
      subject.find('.form input').simulate('click');
    });

    it('updates the current state', () => {
      expect(subject.state.current).toEqual({title: true, name: 'Jane'});
    });
  });

  describe('when updating current values programmatically', () => {
    beforeEach(() => {
      subject = shallow(<Form {...{
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
      </Form>);

      subject.setValues({name: 'new-name'});
    });

    it('changes the form state without updating un-passed values', () => {
      expect(subject.state.current).toEqual({name: 'new-name', password: 'some-password'});
    });
  });

  describe('composite field with a custom input', () => {
    beforeEach(() => {
      class CustomInput extends React.Component {
        static propTypes = {value: PropTypes.string, onChange: PropTypes.func};
        static defaultProps = {value: 'some-default-value'};

        render() {
          return <input {...this.props}/>;
        }
      }

      subject = shallow(<Form {...{
        fields: {input: {initialValue: CustomInput.defaultProps.value, children: <CustomInput/>}}
      }}>{({fields: {input}}) => input}</Form>);
    });

    it('renders the initial value', () => {
      expect(subject.find('input').prop('value')).toBe('some-default-value');
    });

    describe('when changing the input value', () => {
      beforeEach(() => {
        subject.find('input').simulate('change', {
          target: {
            value: 'some-new-value'
          }
        });
      });

      it('renders the new value', () => {
        expect(subject.find('input').prop('value')).toBe('some-new-value');
      });
    });
  });

  describe('composite field with a custom checkbox', () => {
    beforeEach(() => {
      class CustomCheckbox extends React.Component {
        static propTypes = {checked: PropTypes.bool, onChange: PropTypes.func, type: PropTypes.string};
        static defaultProps = {checked: true, type: 'checkbox'};

        render() {
          return <input {...this.props}/>;
        }
      }

      subject = shallow(<Form {...{
        fields: {checkbox: {initialValue: CustomCheckbox.defaultProps.checked, children: <CustomCheckbox/>}}
      }}>{({fields: {checkbox}}) => checkbox}</Form>);
    });

    it('renders the initial value', () => {
      expect(subject.find('input').prop('checked')).toBeTruthy();
    });

    describe('when changing the input value', () => {
      beforeEach(() => {
        subject.find('input').simulate('click');
      });

      it('renders the new value', () => {
        expect(subject.find('input').prop('checked')).toBeFalsy();
      });
    });
  });

  describe('when initial value changes', () => {
    let fields;

    beforeEach(() => {
      fields = {name: {initialValue: 'some-name'}};
      subject = shallow(<Form {...{fields}}>{({fields: {name}}) => name}</Form>);
      fields = {name: {initialValue: 'some-other-name'}};
      subject.setProps({fields});
    });

    it('changes the state', () => {
      expect(subject.state.initial).toEqual({name: 'some-other-name'});
      expect(subject.state.current).toEqual({name: 'some-other-name'});
    });
  });
});