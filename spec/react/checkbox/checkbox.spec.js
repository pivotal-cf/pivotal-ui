import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {setProps} from '../../support/jest-helpers';
import {spyOnRender} from '../../support/jest_spy_on_render';
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

  it('does not render an indeterminate checkbox', () => {
    expect(subject.el.indeterminate).toBeFalsy();
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
      expect('.pui-checkbox').toHaveStyle({color: 'green', backgroundColor: 'red'});
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

  describe('indeterminate', () => {
    beforeEach(() => {
      subject::setProps({indeterminate: true});
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
      expect(subject.el.indeterminate).toBeTruthy();
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

  describe('noSelect', () => {
    beforeEach(() => {
      subject::setProps({noSelect: true});
    });

    it('adds the pui-no-select modifier class to the label', () => {
      expect('.pui-checkbox-label').toHaveClass('pui-no-select');
    });
  });
});