import '../spec_helper'
import ReactTestUtils from 'react-addons-test-utils'
import {CopyToClipboard, CopyToClipboardButton} from 'pui-react-copy-to-clipboard'

describe('CopyToClipboard', () => {

  const text = 'some copy text'
  let onClick, getWindow, window, document, range, selection, subject
  beforeEach(() => {
    onClick = jasmine.createSpy('onClick')

    range = jasmine.createSpyObj('range', ['selectNode'])
    selection = jasmine.createSpyObj('selection', ['removeAllRanges', 'addRange'])
    window = jasmine.createSpyObj('window', ['getSelection'])
    getWindow = jasmine.createSpy('getWindow').and.returnValue(window)
    document = jasmine.createSpyObj('document', ['createRange', 'execCommand'])

    document.createRange.and.returnValue(range)
    window.document = document
    window.getSelection.and.returnValue(selection)
  })

  describe('CopyToClipboard (basic)', () => {
    const renderComponent = props => ReactTestUtils.renderIntoDocument(<CopyToClipboard {...props}/>)

    it('renders the text', () => {
      subject = renderComponent({text, onClick, className: 'test-class', id: 'test-id', style: {opacity: '0.5'}})
      const component = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'sr-only')
      expect(component).toHaveText(text)
    })

    it('propagates attributes', () => {
      subject = renderComponent({text, onClick, className: 'test-class', id: 'test-id', style: {opacity: '0.5'}})
      const component = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'copy-to-clipboard')

      expect(component).toHaveClass('test-class')
      expect(component).toHaveAttr('id', 'test-id')
      expect(component).toHaveCss({opacity: '0.5'})
    })

    it('click copies text to clipboard and calls provided callback', () => {
      subject = renderComponent({getWindow, text, onClick, className: 'test-class', id: 'test-id', style: {opacity: '0.5'}})
      const component = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'copy-to-clipboard')

      ReactTestUtils.Simulate.click(component)

      expect(document.execCommand).toHaveBeenCalledWith('copy')
      expect(onClick).toHaveBeenCalled()
    })
  })

  describe('CopyToClipboardButton', () => {
    const renderComponent = props => ReactTestUtils.renderIntoDocument(<CopyToClipboardButton {...props}/>)

    it('propagates attributes', () => {
      subject = renderComponent({text, onClick, className: 'test-class', id: 'test-id', style: {opacity: '0.5'}})
      const component = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'copy-to-clipboard')

      expect(component).toHaveClass('test-class')
      expect(component).toHaveAttr('id', 'test-id')
      expect(component).toHaveCss({opacity: '0.5'})
    })

    describe('clicking on the button', () => {
      it('renders a tooltip that says "Copied"', () => {
        subject = renderComponent({getWindow, text, onClick, className: 'test-class', id: 'test-id', style: {opacity: '0.5'}})
        const component = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'clipboard-button')
        const tooltipContainer = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'tooltip-container')
        const tooltip = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'tooltip-content')

        ReactTestUtils.Simulate.click(component)

        expect(tooltipContainer).toHaveClass('tooltip-container-visible')
        expect(tooltip).toHaveText('Copied')
      })

      it('hides tooltip after 1 seconds', () => {
        subject = renderComponent({getWindow, text, onClick, className: 'test-class', id: 'test-id', style: {opacity: '0.5'}})
        const component = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'copy-to-clipboard')
        const tooltipContainer = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'tooltip-container')

        ReactTestUtils.Simulate.click(component)
        jasmine.clock().tick(2000)

        expect(tooltipContainer).not.toHaveClass('tooltip-container-visible')
      })

      it('copies the text to the clipboard', () => {
        subject = renderComponent({getWindow, text, onClick, className: 'test-class', id: 'test-id', style: {opacity: '0.5'}})
        const component = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'copy-to-clipboard')

        ReactTestUtils.Simulate.click(component)

        expect(document.execCommand).toHaveBeenCalledWith('copy')
      })

      it('calls the provided callback', () => {
        subject = renderComponent({getWindow, text, onClick, className: 'test-class', id: 'test-id', style: {opacity: '0.5'}})
        const component = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'copy-to-clipboard')

        ReactTestUtils.Simulate.click(component)

        expect(onClick).toHaveBeenCalled()
      })
    })
  })
})