import '../spec_helper';

import {Toggle} from '../../../src/react/toggle';
import {findByClass, findByTag} from '../spec_helper';

describe('Toggle', () => {
  let subject;
  const renderComponent = props => subject = shallow(<Toggle {...props}/>);

  it('renders', () => {
    const result = renderComponent();
    expect(result.find('.pui-toggle')).toBeDefined();
    expect(result.find('.toggle-switch')).toBeDefined();
  });

  it('calls the onChange callback on click', () => {
    const onChangeSpy = jest.fn().mockName('onChange');
    const result = renderComponent({onChange: onChangeSpy});
    const component = result.find('.toggle-switch');

    ReactTestUtils.Simulate.change(component);

    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('uses provided id attribute', () => {
    const result = renderComponent({id: 'foo'});
    const component = result.find('.toggle-switch');

    expect(subject.find(component).prop('id')).toBe('foo');
  });

  it('uses provided checked attribute', () => {
    const result = renderComponent({defaultChecked: true});
    const component = result.find('.toggle-switch');

    expect(subject.find(component).prop('checked')).toBeFalsy();

    ReactTestUtils.Simulate.change(component);

    expect(subject.find(component).prop('checked')).toBeTruthy();
  });

  describe('when no id is provided', () => {
    it('generates a unique id', () => {
      const result1 = renderComponent();
      const component1 = result1.find('.toggle-switch');

      // // // ReactDOM.unmountComponentAtNode(root); // TODO: remove? // TODO: remove? // TODO: remove?

      const result2 = renderComponent();
      const component2 = result2.find('.toggle-switch');

      expect(component1.id).toBeTruthy();
      expect(component2.id).toBeTruthy();
      expect(component1.id).not.toEqual(component2.id);
    });

    it('calls the onChange callback on click', () => {
      const onChangeSpy = jest.fn().mockName('onChange');
      const result = renderComponent({onChange: onChangeSpy});
      const component = result.find('.toggle-switch');

      ReactTestUtils.Simulate.change(component);

      expect(onChangeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('size attribute', () => {
    it('renders with size=medium by default', () => {
      const result = renderComponent();
      const label = result.find('label');
      expect(subject.find(label).hasClass('medium')).toBeTruthy();
    });

    it('respects size attribute', () => {
      let label = renderComponent({size: 'small'}).find('label');
      expect(subject.find(label).hasClass('small')).toBeTruthy();

      label = renderComponent({size: 'medium'}).find('label');
      expect(subject.find(label).hasClass('medium')).toBeTruthy();

      label = renderComponent({size: 'large'}).find('label');
      expect(subject.find(label).hasClass('large')).toBeTruthy();
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
