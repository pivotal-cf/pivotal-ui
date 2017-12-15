import '../spec_helper';
import {Checkbox} from '../../../src/react/checkbox';
import {Icon} from '../../../src/react/iconography';

describe('Checkbox', () => {
  let subject;

  beforeEach(() => {
    spyOnRender(Icon);
    subject = ReactDOM.render(<Checkbox/>, root);
  });

  it('renders a pui checkbox', () => {
    expect('.pui-checkbox').toExist();
  });

  it('renders a hidden checkbox', () => {
    expect('.pui-checkbox input').toHaveAttr('type', 'checkbox');
  });

  it('renders a label', () => {
    expect('.pui-checkbox label').toHaveText('');
  });

  it('renders an unchecked control', () => {
    expect('.pui-checkbox input').not.toBeChecked();
  });

  it('renders a check Icon', () => {
    expect(Icon).toHaveBeenRenderedWithProps({
      src: 'check',
      size: 'inherit',
      style: {},
      verticalAlign: 'middle'
    });
  });

  describe('when checked', () => {
    beforeEach(() => {
      ReactDOM.unmountComponentAtNode(root);
      subject = ReactDOM.render(<Checkbox checked onChange={() => null}/>, root);
    });

    it('renders an checked control', () => {
      expect('.pui-checkbox input').toBeChecked();
    });
  });

  describe('when clicked', () => {
    beforeEach(() => {
      $('.pui-checkbox input').click();
    });

    it('renders an checked control', () => {
      expect('.pui-checkbox input').toBeChecked();
    });
  });

  describe('children', () => {
    beforeEach(() => {
      subject::setProps({children: <div className="label-content">hello</div>});
    });

    it('renders the children inside the label', () => {
      expect('.pui-checkbox label .label-content').toHaveText('hello');
    });
  });

  describe('style', () => {
    beforeEach(() => {
      subject::setProps({style: {color: 'green', backgroundColor: 'red'}});
    });

    it('puts the style on the outer div', () => {
      expect('.pui-checkbox').toHaveAttr('style', 'color: green; background-color: red;');
    });
  });

  describe('labelClassName', () => {
    beforeEach(() => {
      subject::setProps({labelClassName: 'some-class'});
    });

    it('renders a label with the class name', () => {
      expect('.pui-checkbox label').toHaveClass('some-class');
    });
  });
});