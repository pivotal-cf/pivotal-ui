import '../spec_helper';
import {Tooltip} from '../../../src/react/tooltip';

describe('Tooltip Component', () => {
  const renderComponent = props => ReactDOM.render(<Tooltip {...props}>Some default
    tooltip</Tooltip>, root);

  it('renders', () => {
    const result = renderComponent();
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(result, 'pui-tooltip-container').length).toEqual(1);
  });

  it('renders the tooltip content', () => {
    const result = renderComponent();
    const tooltip = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'pui-tooltip-content');

    expect(tooltip).toHaveText('Some default tooltip');
  });

  it('propagates classname, id, style to the wrapping tooltip', () => {
    const result = renderComponent({
      id: 'some-id',
      className: 'some-classname',
      style: {color: 'rgb(255, 0, 0)'}
    });
    const tooltip = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'pui-tooltip-container');

    expect(tooltip).toHaveClass('some-classname');
    expect(tooltip).toHaveAttr('id', 'some-id');
    expect(tooltip).toHaveCss({color: 'rgb(255, 0, 0)'});
  });

  describe('visible', () => {
    it('renders visible by default', () => {
      const result = renderComponent();
      const content = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'pui-tooltip-container');
      expect(content).toHaveClass('pui-tooltip-container-visible');
    });

    it('hides when visible is set to false', () => {
      const result = renderComponent({visible: false});
      const content = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'pui-tooltip-container');
      expect(content).toHaveClass('pui-tooltip-container-hidden');
    });
  });

  describe('size', () => {
    it('renders auto width by default', () => {
      const result = renderComponent();
      const content = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'pui-tooltip-container');
      expect(content).toHaveClass('pui-tooltip-container');
      expect(content).toHaveClass('pui-tooltip-container-visible');
    });

    it('renders a small tooltip when small size is specified', () => {
      const result = renderComponent({size: 'sm'});
      const content = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'pui-tooltip-container');
      expect(content).toHaveClass('pui-tooltip-sm');
    });

    it('renders a medium tooltip when small size is specified', () => {
      const result = renderComponent({size: 'md'});
      const content = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'pui-tooltip-container');
      expect(content).toHaveClass('pui-tooltip-md');
    });

    it('renders a large tooltip when small size is specified', () => {
      const result = renderComponent({size: 'lg'});
      const content = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'pui-tooltip-container');
      expect(content).toHaveClass('pui-tooltip-lg');
    });
  });

  describe('sticky', () => {
    const renderComponent = props => ReactDOM.render(<Tooltip {...props}>Some default tooltip</Tooltip>, root);

    describe('is not set', () => {
      it('does not render with the hoverable class', () => {
        const result = renderComponent({isSticky: false});
        const content = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'pui-tooltip-container');
        expect(content).not.toHaveClass('pui-tooltip-hoverable');
      });
    });

    describe('is set to false', () => {
      it('does not render with the hoverable class', () => {
        const result = renderComponent({isSticky: false});
        const content = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'pui-tooltip-container');
        expect(content).not.toHaveClass('pui-tooltip-hoverable');
      });
    });

    describe('is set to true', () => {
      it('renders with the hoverable class', () => {
        const result = renderComponent({isSticky: true});
        const content = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'pui-tooltip-container');
        expect(content).toHaveClass('pui-tooltip-hoverable');
      });
    });
  });
});