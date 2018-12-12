import '../spec_helper';
import {Radio} from '../../../src/react/radio';

describe('Radio', () => {
  beforeEach(() => {
    const props = {value: 'I am a button', defaultChecked: true, id: 'some-id'};
    ReactDOM.render(<Radio {...props}>One!!!</Radio>, root);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(root);
  });

  it('renders the radio button', () => {
    expect('div.pui-radio > input[type="radio"]').toExist();
    expect('div.pui-radio > input[type="radio"]').toHaveClass('pui-radio-input');
    expect('div.pui-radio > label').toHaveText('One!!!');
    expect('div.pui-radio > label').toHaveAttr('for', 'some-id');
    expect('div.pui-radio > label').toHaveClass('pui-radio-label');
    expect('div.pui-radio > label > span.pui-radio-circle').toExist();
  });

  it('passes through className and style to the radio, and id to the input', () => {
    const props = {value: 'bananas', id: 'npr', className: 'radio-class', style: {opacity: '0.5'}};
    ReactDOM.render(<Radio {...props}>One!!!</Radio>, root);

    expect(':radio').toHaveAttr('id', 'npr');
    expect(':radio').toHaveClass('pui-radio-input');
    expect('div.pui-radio').toHaveClass('radio-class');
    expect('div.pui-radio').toHaveCss({opacity: '0.5'});
  });

  describe('when the checked property is passed', () => {
    beforeEach(() => {
      ReactDOM.unmountComponentAtNode(root);
    });

    it('renders a checked radio', () => {
      const props = {
        value: 'bananas',
        id: 'npr',
        checked: true,
        onChange: () => {}
      };
      ReactDOM.render(<Radio {...props}>One!!!</Radio>, root);
      expect(':radio').toBeChecked();
    });
  });

  describe('when the defaultChecked property is passed', () => {
    beforeEach(() => {
      ReactDOM.unmountComponentAtNode(root);
    });

    it('renders a checked radio', () => {
      const props = {value: 'bananas', defaultChecked: true};
      ReactDOM.render(<Radio {...props} />, root);
      expect(':radio').toBeChecked();
    });
  });

  describe('changing the value of the radio button', () => {
    beforeEach(() => {
      ReactDOM.unmountComponentAtNode(root);
    });

    it('triggers the onChange callback', () => {
      const changeSpy = jasmine.createSpy('change');
      const props = {value: 'bananas', onChange: changeSpy};
      ReactDOM.render(<Radio {...props} />, root);
      $(':radio').simulate('change');

      expect(changeSpy).toHaveBeenCalled();
    });
  });

  describe('when disabled property is passed', () => {
    beforeEach(() => {
      ReactDOM.unmountComponentAtNode(root);
    });

    it('disables the radio button', () => {
      const props = {value: 'bananas', disabled: true};
      ReactDOM.render(<Radio {...props}>Testing</Radio>, root);

      expect(':radio').toBeDisabled();
      expect(':radio').toHaveAttr('aria-disabled', 'true');
    });
  });

  it('passes through labelClassName to the label', () => {
    const props = {value: 'bananas', labelClassName: 'label-radio-class'};
    ReactDOM.render(<Radio {...props}>One!!!</Radio>, root);

    expect('div.pui-radio > .label-radio-class').toExist();
  });

  describe('noSelect', () => {
    beforeEach(() => {
      ReactDOM.render(<Radio {...{value: 'bananas', noSelect: true}}>One!!!</Radio>, root);
    });

    it('puts the pui-no-select class on the inner label', () => {
      expect('.pui-radio-label').toHaveClass('pui-no-select');
    });
  });
});