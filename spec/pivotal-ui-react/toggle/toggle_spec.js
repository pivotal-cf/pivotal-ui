import '../spec_helper';

import {Toggle} from '../../../src/react/toggle';
import {findByClass, findByTag} from '../spec_helper';

describe('Toggle', () => {
  let subject;
  const renderComponent = props => subject = shallow(<Toggle {...props}/>);

  it('renders', () => {
    const result = renderComponent();
    expect(result.find('.pui-toggle').exists()).toBeTruthy();
    expect(result.find('.toggle-switch').exists()).toBeTruthy();
  });

  it('calls the onChange callback on click', () => {
    const onChangeSpy = jest.fn();
    const result = renderComponent({onChange: onChangeSpy});
    const component = result.find('.toggle-switch');

    component.simulate('change');

    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('uses provided id attribute', () => {
    const result = renderComponent({id: 'foo'});
    const component = result.find('.toggle-switch');

    expect(component.prop('id')).toBe('foo');
  });

  it('uses provided checked attribute', () => {
    const result = renderComponent({defaultChecked: true});
    const component = result.find('.toggle-switch');

    expect(component.prop('defaultChecked')).toBe(true);
  });

  describe('when no id is provided', () => {
    it('generates a unique id', () => {
      const result1 = renderComponent();
      const component1 = result1.find('.toggle-switch');

      const result2 = renderComponent();
      const component2 = result2.find('.toggle-switch');

      expect(component1.prop('id')).toBeTruthy();
      expect(component2.prop('id')).toBeTruthy();
      expect(component1.prop('id')).not.toBe(component2.prop('id'));
    });

    it('calls the onChange callback on click', () => {
      const onChangeSpy = jest.fn();
      const result = renderComponent({onChange: onChangeSpy});
      const component = result.find('.toggle-switch');

      component.simulate('change');

      expect(onChangeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('size attribute', () => {
    it('renders with size=medium by default', () => {
      const result = renderComponent();
      const label = result.find('label');
      expect(label.hasClass('medium')).toBeTruthy();
    });

    it('respects size attribute', () => {
      let label = renderComponent({size: 'small'}).find('label');
      expect(label.hasClass('small')).toBeTruthy();

      label = renderComponent({size: 'medium'}).find('label');
      expect(label.hasClass('medium')).toBeTruthy();

      label = renderComponent({size: 'large'}).find('label');
      expect(label.hasClass('large')).toBeTruthy();
    });
  });

  describe('className', () => {
    beforeEach(() => {
      renderComponent({className: 'label-class-name'});
    });

    it('puts the given class name on the inner label', () => {
      expect(subject.find('label').hasClass('label-class-name')).toBeTruthy();
    });
  });
});
