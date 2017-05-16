import '../spec_helper';

import {Toggle} from 'pui-react-toggle';
import {findByClass, findByTag} from '../spec_helper';

describe('Toggle', () => {
  const renderComponent = props => ReactTestUtils.renderIntoDocument(<Toggle {...props}/>);

  it('renders', () => {
    const result = renderComponent();
    expect(findByClass(result, 'toggle-switch')).toBeDefined();
  });

  it('calls the onChange callback on click', () => {
    const onChangeSpy = jasmine.createSpy('onChange');
    const result = renderComponent({onChange: onChangeSpy});
    const component = findByClass(result, 'toggle-switch');

    ReactTestUtils.Simulate.change(component);

    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('uses provided id attribute', () => {
    const result = renderComponent({id: 'foo'});
    const component = findByClass(result, 'toggle-switch');

    expect(component).toHaveAttr('id', 'foo');
  });

  it('uses provided checked attribute', () => {
    const result = renderComponent({defaultChecked: true});
    const component = findByClass(result, 'toggle-switch');

    expect(component).not.toHaveAttr('checked');

    ReactTestUtils.Simulate.change(component);

    expect(component).toHaveAttr('checked');
  });

  describe('when no id is provided', () => {
    it('generates a unique id', () => {
      const result1 = renderComponent();
      const component1 = findByClass(result1, 'toggle-switch');

      const result2 = renderComponent();
      const component2 = findByClass(result2, 'toggle-switch');

      expect(component1.id).toBeTruthy();
      expect(component2.id).toBeTruthy();
      expect(component1.id).not.toEqual(component2.id);
    });

    it('calls the onChange callback on click', () => {
      const onChangeSpy1 = jasmine.createSpy('onChange');
      const result1 = renderComponent({onChange: onChangeSpy1});
      const component1 = findByClass(result1, 'toggle-switch');

      const onChangeSpy2 = jasmine.createSpy('onChange');
      const result2 = renderComponent({onChange: onChangeSpy2});
      const component2 = findByClass(result2, 'toggle-switch');

      ReactTestUtils.Simulate.change(component1);
      ReactTestUtils.Simulate.change(component2);

      expect(onChangeSpy1).toHaveBeenCalledTimes(1);
      expect(onChangeSpy2).toHaveBeenCalledTimes(1);
    });
  });

  describe('size attribute', () => {
    it('renders with size=medium by default', () => {
      const result = renderComponent();
      const label = findByTag(result, 'label');
      expect(label).toHaveClass('medium');
    });

    it('respects size attribute', () => {
      let label = findByTag(renderComponent({size: 'small'}), 'label');
      expect(label).toHaveClass('small');

      label = findByTag(renderComponent({size: 'medium'}), 'label');
      expect(label).toHaveClass('medium');

      label = findByTag(renderComponent({size: 'large'}), 'label');
      expect(label).toHaveClass('large');
    });
  });
});
