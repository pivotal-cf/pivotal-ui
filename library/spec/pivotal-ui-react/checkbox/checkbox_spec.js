require('../spec_helper');

describe('Checkbox', function() {
  let subject;
  const id = 'id';
  const labelPath = '.checkbox label';
  const inputPath = '.checkbox input[type="checkbox"]';

  beforeEach(() => {
    const {Checkbox} = require('../../../src/pivotal-ui-react/checkbox/checkbox');
    subject = ReactDOM.render(<Checkbox label="labelText" id={id}/>, root);
  });

  it('renders an input type checkbox', () => {
    expect(inputPath).toExist();
  });

  it('renders a label', () => {
    expect(labelPath).toHaveText('labelText');
  });

  it('add more classes to the component', () => {
    subject::setProps({className: 'checkbox-extra'});
    expect('.form-group').toHaveClass('checkbox-extra');
  });

  it('passes properties through to the input', () => {
    ReactDOM.unmountComponentAtNode(root);
    subject::setProps({checked: true, onChange: () => {}});
    expect(inputPath).toBeChecked();
  });

  it('associates the label with the checkbox', () => {
    expect(labelPath).toHaveAttr('for', id);
    expect(inputPath).toHaveAttr('id', id);
  });

  it('applies css class to input checkbox and the label', () => {
    subject::setProps({inputClassName: 'input-class', labelClassName: 'label-class'});
    expect(labelPath).toHaveClass('label-class');
    expect(inputPath).toHaveClass('input-class');
  });

  it('add css class disabled when input checkbox is disabled', () => {
    subject::setProps({disabled: true});
    expect(labelPath).toHaveClass('disabled');
    expect(inputPath).toBeDisabled();
  });

  describe('errors', () => {
    it('display error message when display error is true', () => {
      subject::setProps({displayError: true, errorMessage: 'Error!'});
      expect('.form-group').toHaveClass('has-error');
      expect('.help-block').toContainText('Error!');
    });

    it('hide error element when display error is false', () => {
      subject::setProps({displayError: false, errorMessage: 'Error!'});
      expect('.form-group').not.toHaveClass('has-error');
      expect('.help-block').not.toExist();
    });
  });
});
