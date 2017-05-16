import '../spec_helper';
import {Checkbox} from 'pui-react-checkbox';

import {findByClass, findAllByClass, clickOn} from '../spec_helper';

describe('Checkbox', function() {
  let subject, checkbox;

  const renderComponent = props => ReactTestUtils.renderIntoDocument(<Checkbox {...props}/>);
  beforeEach(() => {
    subject = renderComponent({
      label: 'labelText',
      id: 'checkbox-id',
      className: 'group-class',
      inputClassName: 'input-class',
      labelClassName: 'label-class'
    });
    checkbox = findByClass(subject, 'checkbox');
  });

  it('renders an unchecked input type checkbox by default', () => {
    expect(checkbox.querySelector('input[type="checkbox"]')).not.toBeChecked();
  });

  it('renders a label', () => {
    expect(checkbox.querySelector('label')).toHaveText('labelText');
  });

  it('passes through id and inputClassName to the input', () => {
    const input = checkbox.querySelector('input[type="checkbox"]');

    expect(input).toHaveAttr('id', 'checkbox-id');
    expect(input).toHaveClass('input-class');
  });

  it('associates the label with the checkbox', () => {
    expect(checkbox.querySelector('label')).toHaveAttr('for', 'checkbox-id');
  });

  it('passes through classname to the form group (the checkbox parent)', () => {
    const formGroup = findByClass(subject, 'form-group');
    expect(formGroup).toHaveClass('group-class');
    expect(checkbox.parentNode).toEqual(formGroup);
  });

  it('renders checked if checked is true', () => {
    subject = renderComponent({checked: true, onChange: () => {}});
    expect(findByClass(subject, 'checkbox').querySelector('input[type="checkbox"]')).toBeChecked();
  });

  it('properly disables when disabled is true', () => {
    subject = renderComponent({disabled: true});
    checkbox = findByClass(subject, 'checkbox');
    expect(checkbox.querySelector('label')).toHaveClass('disabled');
    expect(checkbox.querySelector('input[type="checkbox"]')).toBeDisabled();
  });

  describe('errors', () => {
    it('display error message when display error is true', () => {
      subject = renderComponent({displayError: true, errorMessage: 'Error!'});
      expect(findByClass(subject, 'form-group')).toHaveClass('has-error');
      expect(findByClass(subject, 'help-block')).toContainText('Error!');
    });

    it('hide error element when display error is false', () => {
      subject = renderComponent({displayError: false, errorMessage: 'Error!'});
      expect(findByClass(subject, 'form-group')).not.toHaveClass('has-error');
      expect(findAllByClass(subject, 'help-block')).toHaveLength(0);
    });
  });
});
