import React from 'react';
import {Checkbox} from '../../../src/react/checkbox';
import {Icon} from '../../../src/react/iconography';

describe.only('Checkbox', () => {
  let subject;

  beforeEach(() => {
    spyOnRender(Icon);
    subject = testRender(<Checkbox/>);
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

  it('does not render an indeterminate checkbox', () => {
    expect(subject.instance().el.indeterminate).toBeFalsy();
  });

  describe('when checked', () => {
    beforeEach(() => {
      subject = testRender(<Checkbox checked onChange={() => null}/>);
    });

    it('renders an checked control', () => {
      expect('.pui-checkbox input').toBeChecked();
    });
  });

  describe('when clicked', () => {
    beforeEach(() => {
      subject = testRender(<Checkbox onChange={() => console.log('onChange')} onClick={() => console.log('onClick')}/>);
      $('.pui-checkbox input').click();
    });

    it('renders an checked control', () => {
      console.log(subject.debug());
      expect('.pui-checkbox input').toBeChecked();
    });

    describe('when clicked again', () => {
      beforeEach(() => {
        $('.pui-checkbox input').click();
      });

      it('renders an unchecked control', () => {
        expect('.pui-checkbox input').not.toBeChecked();
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
      expect('.pui-checkbox').toHaveStyle({color: 'green', backgroundColor: 'red'});
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
      expect(Icon).toHaveBeenRenderedWithProps({
        src: 'remove',
        size: 'inherit',
        style: {},
        verticalAlign: 'middle'
      });
    });

    it('renders an indeterminate checkbox', () => {
      expect(subject.el.indeterminate.exists()).toBeTruthy();
    });

    describe('when clicked', () => {
      beforeEach(() => {
        $('.pui-checkbox input').click();
      });

      it('renders an checked control', () => {
        expect('.pui-checkbox input').toBeChecked();
      });
    });
  });
});