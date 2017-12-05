import '../spec_helper';

import {Toggle} from '../../../src/react/toggle';
import {findByClass, findByTag} from '../spec_helper';

describe('Toggle', () => {
  const renderComponent = props => ReactDOM.render(<Toggle {...props}/>, root);

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

      ReactDOM.unmountComponentAtNode(root);

      const result2 = renderComponent();
      const component2 = findByClass(result2, 'toggle-switch');

      expect(component1.id).toBeTruthy();
      expect(component2.id).toBeTruthy();
      expect(component1.id).not.toEqual(component2.id);
    });

    it('calls the onChange callback on click', () => {
      const onChangeSpy = jasmine.createSpy('onChange');
      const result = renderComponent({onChange: onChangeSpy});
      const component = findByClass(result, 'toggle-switch');

      ReactTestUtils.Simulate.change(component);

      expect(onChangeSpy).toHaveBeenCalledTimes(1);
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

  describe('className', () => {
    beforeEach(() => {
      renderComponent({className: 'label-class-name'});
    });

    it('puts the given class name on the inner label', () => {
      expect('label').toHaveClass('label-class-name');
    });
  });
});
