import '../spec_helper'
import ReactTestUtils from 'react-addons-test-utils'
import {CopyToClipboard, CopyToClipboardButton} from '../../../src/pivotal-ui-react/copy-to-clipboard/copy-to-clipboard'

describe('CopyToClipboard', () => {
  const text = 'some copy text'
  let onClick, window, range, selection;
  beforeEach(() => {
    onClick = jasmine.createSpy('onClick')
    spyOn(document, 'execCommand')

    range = jasmine.createSpyObj('range', ['selectNode']);
    selection = jasmine.createSpyObj('selection', ['removeAllRanges', 'addRange']);
    window = jasmine.createSpyObj('window', ['getSelection']);
    window.getSelection.and.returnValue(selection);
  })

  describe('CopyToClipboard (basic)', () => {
    const renderComponent = (props) => {
      return ReactTestUtils.renderIntoDocument(<CopyToClipboard copyWindow={window} {...props}/>)
    }

    it('renders the text', () => {
      const result = renderComponent({text, onClick, className: 'test-class', id: 'test-id', style: {opacity: '0.5'}})
      const component = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'sr-only')
      expect(component.textContent).toContain(text)
    })

    it('propagates attributes', () => {
      const result = renderComponent({text, onClick, className: 'test-class', id: 'test-id', style: {opacity: '0.5'}})
      const component = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'copy-to-clipboard')

      expect(component.className).toContain('test-class')
      expect(component.id).toEqual('test-id')
      expect(component.style.opacity).toEqual('0.5')
    })

    it('click copies text to clipboard and calls provided callback', () => {
      const result = renderComponent({text, onClick, className: 'test-class', id: 'test-id', style: {opacity: '0.5'}})
      const component = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'copy-to-clipboard')

      ReactTestUtils.Simulate.click(component)
      jasmine.clock().tick(1)

      expect(document.execCommand).toHaveBeenCalledWith('copy')
      expect(onClick).toHaveBeenCalled()
    })
  })

  describe('CopyToClipboardButton', () => {
    const renderComponent = (props) => {
      return ReactTestUtils.renderIntoDocument(<CopyToClipboardButton copyWindow={window} {...props}/>)
    }

    it('propagates attributes', () => {
      const result = renderComponent({text, onClick, className: 'test-class', id: 'test-id', style: {opacity: '0.5'}})
      const component = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'copy-to-clipboard')

      expect(component.className).toContain('test-class')
      expect(component.id).toEqual('test-id')
      expect(component.style.opacity).toEqual('0.5')
    })

    describe('clicking on the button', () => {
      it('renders a tooltip that says "Copied"', () => {
        const result = renderComponent({text, onClick, className: 'test-class', id: 'test-id', style: {opacity: '0.5'}})
        const component = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'clipboard-button')
        const tooltipContainer = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-container')
        const tooltip = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-content')

        ReactTestUtils.Simulate.click(component)
        jasmine.clock().tick(10)

        expect(tooltipContainer.className).toContain('tooltip-container-visible')
        expect(tooltip.textContent).toContain('Copied')
      })

      it('hides tooltip after 1 seconds', () => {
        const result = renderComponent({text, onClick, className: 'test-class', id: 'test-id', style: {opacity: '0.5'}})
        const component = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'copy-to-clipboard')
        const tooltipContainer = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-container')

        ReactTestUtils.Simulate.click(component)
        jasmine.clock().tick(2000)

        expect(tooltipContainer.className).not.toContain('tooltip-container-visible')
      })

      it('copies the text to the clipboard', () => {
        const result = renderComponent({text, onClick, className: 'test-class', id: 'test-id', style: {opacity: '0.5'}})
        const component = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'copy-to-clipboard')

        ReactTestUtils.Simulate.click(component)
        jasmine.clock().tick(1)

        expect(document.execCommand).toHaveBeenCalledWith('copy')
      })

      it('calls the provided callback', () => {
        const result = renderComponent({text, onClick, className: 'test-class', id: 'test-id', style: {opacity: '0.5'}})
        const component = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'copy-to-clipboard')

        ReactTestUtils.Simulate.click(component)
        jasmine.clock().tick(1)

        expect(onClick).toHaveBeenCalled()
      })
    })
  })
})