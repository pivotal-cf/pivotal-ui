import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Toggle} from '../../../src/react/toggle';

describe('Toggle', () => {
  const renderComponent = props => ReactDOM.render(<Toggle {...props}/>, root);

  it('renders', () => {
    renderComponent();
    expect($('.pui-toggle')).toBeDefined();
    expect($('.toggle-switch')).toBeDefined();
  });

  it('calls the onChange callback on click', () => {
    const onChangeSpy = jasmine.createSpy('onChange');
    renderComponent({onChange: onChangeSpy});
    const component = $('.toggle-switch');

    $(component).simulate('change');

    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('uses provided id attribute', () => {
    renderComponent({id: 'foo'});
    const component = $('.toggle-switch');

    expect(component).toHaveAttr('id', 'foo');
  });

  it('uses provided checked attribute', () => {
    renderComponent({defaultChecked: true});
    const component = $('.toggle-switch');

    expect(component).toHaveAttr('checked', '');

    $(component).simulate('change');

    expect(component).toHaveAttr('checked');
  });

  describe('when no id is provided', () => {
    it('generates a unique id', () => {
      renderComponent();
      const component1 = $('.toggle-switch')[0];

      ReactDOM.unmountComponentAtNode(root);

      renderComponent();
      const component2 = $('.toggle-switch')[0];

      expect(component1.id).toBeTruthy();
      expect(component2.id).toBeTruthy();
      expect(component1.id).not.toEqual(component2.id);
    });

    it('calls the onChange callback on click', () => {
      const onChangeSpy = jasmine.createSpy('onChange');
      renderComponent({onChange: onChangeSpy});
      const component = $('.toggle-switch');

      $(component).simulate('change');

      expect(onChangeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('size attribute', () => {
    it('renders with size=medium by default', () => {
      renderComponent();
      expect('label').toHaveClass('medium');
    });

    it('respects size attribute', () => {
      renderComponent({size: 'small'});
      expect('label').toHaveClass('small');

      renderComponent({size: 'medium'});
      expect('label').toHaveClass('medium');

      renderComponent({size: 'large'});
      expect('label').toHaveClass('large');
    });
  });

  describe('className', () => {
    beforeEach(() => {
      renderComponent({className: 'label-class-name'});
    });

    it('puts the given class name on the inner label', () => {
      expect('label').toHaveClass('label-class-name');
    });
  });
});
