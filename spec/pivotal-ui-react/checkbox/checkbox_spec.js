import '../spec_helper';
import {Checkbox} from '../../../src/react/checkbox';
import {Icon} from '../../../src/react/iconography';

describe('Checkbox', () => {
  let subject;

  beforeEach(() => {
    subject = shallow(<Checkbox/>);
  });

  it('renders a pui checkbox', () => {
    expect(subject.find('.pui-checkbox').exists()).toBeTruthy();
  });

  it('renders a hidden checkbox', () => {
    expect(subject.find('.pui-checkbox input').prop('type')).toBe('checkbox');
  });

  it('renders a label', () => {
    expect(subject.find('.pui-checkbox label').text()).toBe('');
  });

  it('renders an unchecked control', () => {
    expect(subject.find('.pui-checkbox input').prop('checked')).toBeFalsy();
  });

  it('renders a check Icon', () => {
    expect(subject.find(Icon).props()).toEqual({
      src: 'check',
      size: 'inherit',
      style: {},
      verticalAlign: 'middle'
    });
  });

  it('does not render an indeterminate checkbox', () => {
    expect(subject.el.indeterminate).toBeFalsy();
  });

  describe('when checked', () => {
    beforeEach(() => {
      // ReactDOM.unmountComponentAtNode(root); // TODO: remove?
      subject = shallow(<Checkbox checked onChange={() => null}/>);
    });

    it('renders an checked control', () => {
      expect(subject.find('.pui-checkbox input').prop('checked')).toBeTruthy();
    });
  });

  describe('when clicked', () => {
    beforeEach(() => {
      subject.find('.pui-checkbox input').simulate('click');
    });

    it('renders an checked control', () => {
      expect(subject.find('.pui-checkbox input').prop('checked')).toBeTruthy();
    });

    describe('when clicked again', () => {
      beforeEach(() => {
        subject.find('.pui-checkbox input').simulate('click');
      });

      it('renders an unchecked control', () => {
        expect(subject.find('.pui-checkbox input').prop('checked')).toBeFalsy();
      });
    });
  });

  describe('children', () => {
    beforeEach(() => {
      subject.setProps({children: <div className="label-content">hello</div>});
    });

    it('renders the children inside the label', () => {
      expect(subject.find('.pui-checkbox label .label-content').text()).toBe('hello');
    });
  });

  describe('style', () => {
    beforeEach(() => {
      subject.setProps({style: {color: 'green', backgroundColor: 'red'}});
    });

    it('puts the style on the outer div', () => {
      expect(subject.find('.pui-checkbox').prop('style')).toEqual({color: 'green', backgroundColor: 'red'});
    });
  });

  describe('labelClassName', () => {
    beforeEach(() => {
      subject.setProps({labelClassName: 'some-class'});
    });

    it('renders a label with the class name', () => {
      expect(subject.find('.pui-checkbox label').hasClass('some-class')).toBeTruthy();
    });
  });

  describe('indeterminate', () => {
    beforeEach(() => {
      subject.setProps({indeterminate: true});
    });

    it('renders a remove Icon', () => {
      expect(subject.find(Icon).props()).toEqual({
        src: 'remove',
        size: 'inherit',
        style: {},
        verticalAlign: 'middle'
      });
    });

    it('renders an indeterminate checkbox', () => {
      expect(subject.el.indeterminate).toBeTruthy();
    });

    describe('when clicked', () => {
      beforeEach(() => {
        subject.find('.pui-checkbox input').simulate('click');
      });

      it('renders an checked control', () => {
        expect(subject.find('.pui-checkbox input').prop('checked')).toBeTruthy();
      });
    });
  });
});