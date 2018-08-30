import '../spec_helper';
import {Tooltip} from '../../../src/react/tooltip';

describe('Tooltip Component', () => {
  let subject;
  const renderComponent = props => subject = shallow(<Tooltip {...props}>Some default
    tooltip</Tooltip>);

  it('renders', () => {
    const result = renderComponent();
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(result, 'tooltip-container').length).toEqual(1);
  });

  it('renders the tooltip content', () => {
    const result = renderComponent();
    const tooltip = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-content');

    expect(subject.find(tooltip).text()).toBe('Some default tooltip');
  });

  it('propagates classname, id, style to the wrapping tooltip', () => {
    const result = renderComponent({
      id: 'some-id',
      className: 'some-classname',
      style: {color: 'rgb(255, 0, 0)'}
    });
    const tooltip = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-container');

    expect(subject.find(tooltip).hasClass('some-classname')).toBeTruthy();
    expect(subject.find(tooltip).prop('id')).toBe('some-id');
    expect(subject.find(tooltip).prop('style')).toEqual({color: 'rgb(255, 0, 0)'});
  });

  describe('visible', () => {
    it('renders visible by default', () => {
      const result = renderComponent();
      const content = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-container');
      expect(subject.find(content).hasClass('tooltip-container-visible')).toBeTruthy();
    });

    it('hides when visible is set to false', () => {
      const result = renderComponent({visible: false});
      const content = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-container');
      expect(subject.find(content).hasClass('tooltip-container-hidden')).toBeTruthy();
    });
  });

  describe('size', () => {
    it('renders auto width by default', () => {
      const result = renderComponent();
      const content = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-container');
      expect(subject.find(content).hasClass('tooltip-container')).toBeTruthy();
      expect(subject.find(content).hasClass('tooltip-container-visible')).toBeTruthy();
    });

    it('renders a small tooltip when small size is specified', () => {
      const result = renderComponent({size: 'sm'});
      const content = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-container');
      expect(subject.find(content).hasClass('tooltip-sm')).toBeTruthy();
    });

    it('renders a medium tooltip when small size is specified', () => {
      const result = renderComponent({size: 'md'});
      const content = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-container');
      expect(subject.find(content).hasClass('tooltip-md')).toBeTruthy();
    });

    it('renders a large tooltip when small size is specified', () => {
      const result = renderComponent({size: 'lg'});
      const content = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-container');
      expect(subject.find(content).hasClass('tooltip-lg')).toBeTruthy();
    });
  });

  describe('sticky', () => {
    const renderComponent = props => subject = shallow(<Tooltip {...props}>Some default tooltip</Tooltip>);

    describe('is not set', () => {
      it('does not render with the hoverable class', () => {
        const result = renderComponent({isSticky: false});
        const content = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-container');
        expect(subject.find(content).hasClass('tooltip-hoverable')).toBeFalsy();
      });
    });

    describe('is set to false', () => {
      it('does not render with the hoverable class', () => {
        const result = renderComponent({isSticky: false});
        const content = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-container');
        expect(subject.find(content).hasClass('tooltip-hoverable')).toBeFalsy();
      });
    });

    describe('is set to true', () => {
      it('renders with the hoverable class', () => {
        const result = renderComponent({isSticky: true});
        const content = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-container');
        expect(subject.find(content).hasClass('tooltip-hoverable')).toBeTruthy();
      });
    });
  });
});