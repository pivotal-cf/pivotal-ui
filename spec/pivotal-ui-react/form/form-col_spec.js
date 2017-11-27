import '../spec_helper';
import {FormCol, FormUnit} from '../../../src/react/forms';
import crypto from 'crypto';

class TestInput extends React.Component {
  render() {
    return <input />;
  }
}

describe('FormCol', () => {
  let element, onChange;

  beforeEach(() => {
    spyOn(React, 'cloneElement').and.callThrough();
    spyOn(crypto, 'randomBytes').and.returnValue('some-unique-string');
    onChange = jasmine.createSpy('onChange');
  });

  describe('simple case', () => {
    beforeEach(() => {
      ReactDOM.render(<FormCol>
        <div>hello</div>
      </FormCol>, root);
    });

    it('renders a form unit', () => {
      expect('.col > .form-unit').toExist();
      expect('.col > .form-unit').toHaveText('hello');
    });
  });

  describe('fixed props', () => {
    beforeEach(() => {
      ReactDOM.render(<FormCol fixed>
        <div>hello</div>
      </FormCol>, root);
    });

    it('renders a col-fixed class', () => {
      expect('.col').toHaveClass('col-fixed');
    });
  });

  describe('when the element is a checkbox', () => {
    let state, onChangeCheckbox, innerOnChange, checkbox;

    beforeEach(() => {
      checkbox = <input type="checkbox"/>;
      state = {current: {checkboxName: true}};
      innerOnChange = () => 'changed';
      onChangeCheckbox = jasmine.createSpy('onChangeCheckbox').and.returnValue(innerOnChange);

      ReactDOM.render(<FormCol name="checkboxName" state={state} onChangeCheckbox={onChangeCheckbox}>
        {checkbox}
      </FormCol>, root);
    });

    it('passes in the correct props to the cloned element', () => {
      expect(React.cloneElement).toHaveBeenCalledWith(checkbox, {
        name: 'checkboxName',
        id: 'some-unique-string',
        checked: true,
        onChange: innerOnChange
      });
    });
  });

  describe('clones the element with extra props', () => {
    beforeEach(() => {
      element = <input onChange={onChange} value="some-value"/>;
      ReactDOM.render(<FormCol name="some-name-set-on-the-col">
        {element}
      </FormCol>, root);
    });

    it('passes in the props to the cloned element', () => {
      expect(React.cloneElement).toHaveBeenCalledWith(element, {
        onChange,
        name: 'some-name-set-on-the-col',
        value: 'some-value',
        id: 'some-unique-string'
      });
    });

    describe('when given children as a function', () => {
      let childrenSpy, props, formProps, formOnChange;

      beforeEach(() => {
        formOnChange = jasmine.createSpy('formOnChange');
        element = <input/>;
        childrenSpy = jasmine.createSpy('children').and.returnValue(element);
        formProps = {
          canSubmit: () => 'can submit',
          canReset: () => 'can reset',
          reset: () => 'reset',
          onSubmit: () => 'on submit',
          setState: () => 'set state',
          state: {
            key: 'value',
            current: {'some-name-set-on-the-col': 'current-value'},
            saving: true
          },
          onChange: () => formOnChange
        };

        props = {
          ...formProps,
          name: 'some-name-set-on-the-col',
          onBlur: () => 'on blur'
        };

        ReactDOM.render(<FormCol {...props}>
          {childrenSpy}
        </FormCol>, root);
      });

      it('calls the children callback', () => {
        expect(childrenSpy).toHaveBeenCalledWith({
          ...formProps,
          saving: true,
          onChange: formOnChange
        });
      });

      it('clones element with the form props', () => {
        expect(React.cloneElement).toHaveBeenCalledWith(element, jasmine.objectContaining({
          id: 'some-unique-string',
          onChange: formOnChange,
          name: 'some-name-set-on-the-col',
          value: 'current-value'
        }));
      });
    });
  });

  describe('when there are multiple children', () => {
    beforeEach(() => {
      ReactDOM.render(<FormCol>
        <input className="element1"/>
        <input className="element2"/>
      </FormCol>, root);
    });

    it('renders all children', () => {
      expect('.element1').toExist();
      expect('.element2').toExist();
    });
  });

  describe('when onChange', () => {
    describe('is set on the element', () => {
      beforeEach(() => {
        element = <input onChange={onChange}/>;
        ReactDOM.render(<FormCol name="someName">
          {element}
        </FormCol>, root);
      });

      it('uses the passed onChange', () => {
        expect(React.cloneElement).toHaveBeenCalledWith(element, jasmine.objectContaining({
          onChange
        }));
      });
    });

    describe('is not set on the element', () => {
      let validator, onBlur, formUnitOnChange;

      beforeEach(() => {
        formUnitOnChange = jasmine.createSpy('formUnitOnChange').and.returnValue('some-callback');
      });

      describe('and when there is a default onChange function', () => {
        beforeEach(() => {
          spyOnRender(TestInput);
          validator = jasmine.createSpy('validator');
          onBlur = jasmine.createSpy('onBlur');
          element = <TestInput />;

          ReactDOM.render(<FormCol {...{
            onChange: formUnitOnChange,
            onBlur,
            validator,
            name: 'some-col'
          }}>
            {element}
          </FormCol>, root);
        });

        it('uses the FormUnit onChange', () => {
          expect(formUnitOnChange).toHaveBeenCalledWith('some-col', validator);
          expect(React.cloneElement).toHaveBeenCalledWith(element, jasmine.objectContaining({
            onChange: 'some-callback'
          }));
        });
      });

      describe('and when there is no default onChange function', () => {
        beforeEach(() => {
          onChange.calls.reset();
          formUnitOnChange.calls.reset();
          element = <input />;
          ReactDOM.render(<FormCol onChange={null} name="someName">
            {element}
          </FormCol>, root);
          $('input').val('new-value').simulate('change');
        });

        it('defaults to an empty function', () => {
          expect(onChange).not.toHaveBeenCalled();
          expect(formUnitOnChange).not.toHaveBeenCalled();

          expect(React.cloneElement).toHaveBeenCalledWith(element, jasmine.objectContaining({
            onChange: jasmine.any(Function),
            name: 'someName',
            id: 'some-unique-string',
            value: undefined
          }));
        });
      });
    });
  });

  describe('when value', () => {
    describe('is set on the element', () => {
      beforeEach(() => {
        element = <input value="my-value"/>;
        ReactDOM.render(<FormCol name="someName">
          {element}
        </FormCol>, root);
      });

      it('uses the passed value', () => {
        expect(React.cloneElement).toHaveBeenCalledWith(element, jasmine.objectContaining({
          value: 'my-value'
        }));
      });
    });

    describe('is not set on the element', () => {
      let state;

      beforeEach(() => {
        state = {current: {someField: 'current-value'}};
        element = <input />;
        ReactDOM.render(<FormCol name="someField" state={state}>
          {element}
        </FormCol>, root);
      });

      it('uses the value stored in the state', () => {
        expect(React.cloneElement).toHaveBeenCalledWith(element, jasmine.objectContaining({
          value: 'current-value'
        }));
      });
    });
  });

  describe('when id', () => {
    describe('is set on the element', () => {
      beforeEach(() => {
        element = <input id="some-id"/>;
        ReactDOM.render(<FormCol>
          {element}
        </FormCol>, root);
      });

      it('uses the given id on the element', () => {
        expect(React.cloneElement).toHaveBeenCalledWith(element, jasmine.objectContaining({
          id: 'some-id'
        }));
      });
    });

    describe('is not set on the element', () => {
      beforeEach(() => {
        element = <input />;

        ReactDOM.render(<FormCol>
          {element}
        </FormCol>, root);
      });

      it('generates a random id for the element', () => {
        expect(React.cloneElement).toHaveBeenCalledWith(element, jasmine.objectContaining({
          id: 'some-unique-string'
        }));
      });
    });
  });

  describe('when labelFor', () => {
    beforeEach(() => {
      spyOnRender(FormUnit).and.callThrough();
    });

    describe('is given as a prop', () => {
      let subject;
      beforeEach(() => {
        element = <input />;
        subject = ReactDOM.render(<FormCol {...{
          labelFor: 'some-label',
          retainLabelHeight: true,
          help: 'Some help text'
        }}>
          {element}
        </FormCol>, root);
      });

      it('uses the given the labelFor', () => {
        expect(FormUnit).toHaveBeenRenderedWithProps(jasmine.objectContaining({
          labelFor: 'some-label',
          retainLabelHeight: true,
          help: 'Some help text'
        }));
      });
    });

    describe('is not given as a prop', () => {
      beforeEach(() => {
        element = <input id="my-alter-id"/>;
        ReactDOM.render(<FormCol>
          {element}
        </FormCol>, root);
      });

      it('uses the id from the element', () => {
        expect(FormUnit).toHaveBeenRenderedWithProps(jasmine.objectContaining({
          labelFor: 'my-alter-id'
        }));
      });
    });
  });
});