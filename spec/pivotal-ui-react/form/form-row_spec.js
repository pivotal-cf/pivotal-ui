import '../spec_helper';
import {FormRow, FormCol} from '../../../src/react/forms';

describe('FormRow', () => {
  let subject, field1, field2;

  beforeEach(() => {
    spyOnRender(FormCol).and.callThrough();

    field1 = () => <div>hello</div>;
    field2 = () => <span>test</span>;

    subject = ReactDOM.render(<FormRow>
      <FormCol {...{children: field1}} />
      <FormCol {...{children: field2}} />
    </FormRow>, root);
  });

  it('renders a grid containing the children', () => {
    expect('#root > .grid .col').toHaveLength(2);
    expect('#root > .grid .col:eq(0)').toHaveText('hello');
    expect('#root > .grid .col:eq(1)').toHaveText('test');
  });

  describe('when given form props', () => {
    let formProps;

    beforeEach(() => {
      formProps = {
        state: {key: 'value'},
        setState: () => 'set state',
        canSubmit: () => 'can submit',
        onSubmit: () => 'on submit',
        canReset: () => 'can reset',
        reset: () => 'reset',
        onChange: () => () => 'on change',
        onBlur: () => 'on blur'
      };

      ReactDOM.render(<FormRow {...formProps}>
        <FormCol id="col1">{field1}</FormCol>
        <FormCol id="col2">{field2}</FormCol>
      </FormRow>, root);
    });

    it('passes the props down to each child', () => {
      expect(FormCol).toHaveBeenRenderedWithProps({
        id: 'col1',
        children: field1,
        ...formProps
      });

      expect(FormCol).toHaveBeenRenderedWithProps({
        id: 'col2',
        children: field2,
        ...formProps
      });
    });
  });

  describe('when given a wrapper', () => {
    beforeEach(() => {
      subject::setProps({wrapper: () => <div className="wrapper"/>});
    });

    it('wraps its children in the wrapper', () => {
      expect('#root > .grid .col').not.toExist();
      expect('#root > .wrapper .grid .col').toHaveLength(2);
      expect('#root > .wrapper .grid .col:eq(0)').toHaveText('hello');
      expect('#root > .wrapper .grid .col:eq(1)').toHaveText('test');
    });
  });

  describe('when given invalid children', () => {
    beforeEach(() => {
      spyOn(console, 'warn');
      class FakeFormCol extends FormCol {
        render() {
          return <div className="fake-col">fake col</div>;
        }
      }

      ReactDOM.render(<FormRow>
        <div className="invalid-element">Invalid element</div>
        <FakeFormCol />
      </FormRow>, root);
    });

    it('renders the fake form col', () => {
      expect('.fake-col').toExist();
    });

    it('does not render the invalid-element',() => {
      expect('.invalid-element').not.toExist();
    });

    it('shows a warning', () => {
      expect(console.warn).toHaveBeenCalledWith('Child of type "div" will not be rendered. A FormRow\'s children should be of type FormCol.');
    });
  });
});