import '../spec_helper'
import ReactTestUtils from 'react-addons-test-utils'
import {CopyToClipboard, CopyToClipboardButton} from '../../../src/pivotal-ui-react/copy-to-clipboard/copy-to-clipboard'

describe('CopyToClipboard', () => {
  function render(Component, props) {
    return ReactTestUtils.renderIntoDocument(<Component {...props}/>)
  }

  const text = 'some copy text'
  let onClick, getWindow, window, document, range, selection;
  beforeEach(() => {
    onClick = jasmine.createSpy('onClick')

    range = jasmine.createSpyObj('range', ['selectNode']);
    selection = jasmine.createSpyObj('selection', ['removeAllRanges', 'addRange']);
    window = jasmine.createSpyObj('window', ['getSelection']);
    getWindow = jasmine.createSpy('getWindow').and.returnValue(window);
    document = jasmine.createSpyObj('document', ['createRange', 'execCommand']);

    document.createRange.and.returnValue(range);
    window.document = document
    window.getSelection.and.returnValue(selection);
  })

  describe('CopyToClipboard (basic)', () => {
    it('renders the text', () => {
      const result = render(CopyToClipboard, {text, onClick, className: 'test-class', id: 'test-id', style: {opacity: '0.5'}})
      const component = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'sr-only')
      expect(component).toHaveText(text)
    })

    it('propagates attributes', () => {
      const result = render(CopyToClipboard, {text, onClick, className: 'test-class', id: 'test-id', style: {opacity: '0.5'}})
      const component = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'copy-to-clipboard')

      expect(component).toHaveClass('test-class')
      expect(component).toHaveAttr('id', 'test-id')
      expect(component).toHaveCss({opacity: '0.5'})
    })

    it('click copies text to clipboard and calls provided callback', () => {
      const result = render(CopyToClipboard, {getWindow, text, onClick, className: 'test-class', id: 'test-id', style: {opacity: '0.5'}})
      const component = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'copy-to-clipboard')

      ReactTestUtils.Simulate.click(component)

      expect(document.execCommand).toHaveBeenCalledWith('copy')
      expect(onClick).toHaveBeenCalled()
    })
  })

  describe('CopyToClipboardButton', () => {
    it('propagates attributes', () => {
      const result = render(CopyToClipboardButton, {text, onClick, className: 'test-class', id: 'test-id', style: {opacity: '0.5'}})
      const component = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'copy-to-clipboard')

      expect(component).toHaveClass('test-class')
      expect(component).toHaveAttr('id', 'test-id')
      expect(component).toHaveCss({opacity: '0.5'})
    })

    describe('clicking on the button', () => {
      it('renders a tooltip that says "Copied"', () => {
        const result = render(CopyToClipboardButton, {getWindow, text, onClick, className: 'test-class', id: 'test-id', style: {opacity: '0.5'}})
        const component = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'clipboard-button')
        const tooltipContainer = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-container')
        const tooltip = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-content')

        ReactTestUtils.Simulate.click(component)

        expect(tooltipContainer).toHaveClass('tooltip-container-visible')
        expect(tooltip).toHaveText('Copied')
      })

      it('hides tooltip after 1 seconds', () => {
        const result = render(CopyToClipboardButton, {getWindow, text, onClick, className: 'test-class', id: 'test-id', style: {opacity: '0.5'}})
        const component = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'copy-to-clipboard')
        const tooltipContainer = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'tooltip-container')

        ReactTestUtils.Simulate.click(component)
        jasmine.clock().tick(2000)

        expect(tooltipContainer).not.toHaveClass('tooltip-container-visible')
      })

      it('copies the text to the clipboard', () => {
        const result = render(CopyToClipboardButton, {getWindow, text, onClick, className: 'test-class', id: 'test-id', style: {opacity: '0.5'}})
        const component = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'copy-to-clipboard')

        ReactTestUtils.Simulate.click(component)

        expect(document.execCommand).toHaveBeenCalledWith('copy')
      })

      it('calls the provided callback', () => {
        const result = render(CopyToClipboardButton, {getWindow, text, onClick, className: 'test-class', id: 'test-id', style: {opacity: '0.5'}})
        const component = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'copy-to-clipboard')

        ReactTestUtils.Simulate.click(component)

        expect(onClick).toHaveBeenCalled()
      })
    })
  })
})