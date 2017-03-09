require('../spec_helper')
import ReactTestUtils from 'react-addons-test-utils'
import {Select} from 'pui-react-select'

describe('Select', () => {
  let subject, onChangeSpy, onEnteredSpy, onExitedSpy

  const renderComponent = props => ReactTestUtils.renderIntoDocument(<Select {...props}/>)

  describe('basic rendering and behavior', () => {
    beforeEach(() => {
      onChangeSpy = jasmine.createSpy('onChange')
      onEnteredSpy = jasmine.createSpy('onEntered')
      onExitedSpy = jasmine.createSpy('onExited')
      subject = renderComponent({
        className: 'myClassName',
        name: 'myName',
        style: {opacity: 0.5},
        id: 'test-id',
        defaultValue: 'defaultValue',
        onChange: onChangeSpy,
        onEntered: onEnteredSpy,
        onExited: onExitedSpy,
        options: ['defaultValue', 'one', 'two']
      })
    })

    it('renders a hidden input with the defaultValue', () => {
      const result = ReactTestUtils.findRenderedDOMComponentWithTag(subject, 'input')

      expect(result.type).toEqual('hidden')
      expect(result.name).toEqual('myName')
      expect(result.value).toEqual('defaultValue')
    })

    it('passes through className to the select', () => {
      const result = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'select')
      expect(result.classList).toContain('myClassName')
    })

    it('passes through style to the select', () => {
      const result = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'select')
      expect(result.style.opacity).toEqual('0.5')
    })

    it('passes through id to the select', () => {
      const result = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'select')
      expect(result.id).toEqual('test-id')
    })

    it('creates a select-toggle with a double arrow', () => {
      const result = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'icon-select_chevrons')
      expect(result.parentNode.parentNode.classList).toContain('select-toggle')
    })

    it('shows the default value in the toggle', () => {
      const result = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'select-toggle')
      expect(result.textContent).toEqual(' defaultValue')
    })

    it('shows the select menu on click', () => {
      const toggle = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'select-toggle')
      ReactTestUtils.Simulate.click(toggle)
      jasmine.clock().tick(1)

      const result = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'select-menu')
      expect(result.parentNode.classList).toContain('open')
    })

    it('hides the menu when clicking outside the select', () => {
      const toggle = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'select-toggle')
      ReactTestUtils.Simulate.click(toggle)
      jasmine.clock().tick(1)

      const evt = document.createEvent('HTMLEvents')
      evt.initEvent('click', true, true)
      document.documentElement.dispatchEvent(evt)

      const result = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'select-menu')
      expect(result.parentNode.classList).not.toContain('open')
    })

    it('hides the menu when clicking the select again', () => {
      const toggle = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'select-toggle')
      ReactTestUtils.Simulate.click(toggle)
      jasmine.clock().tick(1)

      ReactTestUtils.Simulate.click(toggle)
      jasmine.clock().tick(1)

      const result = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'select-menu')
      expect(result.parentNode.classList).not.toContain('open')
    })

    it('calls onEntered when opening', () => {
      expect(onEnteredSpy).not.toHaveBeenCalled()
      const toggle = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'select-toggle')
      ReactTestUtils.Simulate.click(toggle)
      jasmine.clock().tick(1)

      expect(onEnteredSpy).toHaveBeenCalled()
    })

    it('calls onExited when closing', () => {
      expect(onExitedSpy).not.toHaveBeenCalled()
      const toggle = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'select-toggle')
      ReactTestUtils.Simulate.click(toggle)
      jasmine.clock().tick(1)
      ReactTestUtils.Simulate.click(toggle)
      jasmine.clock().tick(1)
      expect(onExitedSpy).toHaveBeenCalled()
    })

    describe('when selecting an option', () => {
      beforeEach(() => {
        const toggle = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'select-toggle')
        ReactTestUtils.Simulate.click(toggle)
        jasmine.clock().tick(1)

        const optionOne = ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'option')[1]
        ReactTestUtils.Simulate.click(optionOne)
        jasmine.clock().tick(1)
      })

      it('calls then onChange callback', () => {
        expect(onChangeSpy).toHaveBeenCalledWith('one')
      })

      it('updates the selected value', () => {
        expect(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'select-toggle-label').textContent).toEqual('one')
        const input = ReactTestUtils.findRenderedDOMComponentWithTag(subject, 'input')
        expect(input.type).toEqual('hidden')
        expect(input.value).toEqual('one')
      })

      it('closes the menu', () => {
        const result = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'select-menu')
        expect(result.parentNode.classList).not.toContain('open')
      })
    })
  })

  describe('when the options array has objects', () => {
    beforeEach(() => {
      subject = renderComponent({
        defaultValue: 'defaultValue',
        options: [
          {label: 'the default', value: 'defaultValue'},
          {label: 'one', value: 1},
          {label: 'two', value: 2}]
      })
    })

    it('sets the value of the select and the label of the toggle', () => {
      ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'select-toggle'))
      jasmine.clock().tick(1)

      expect(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'select-toggle-label').textContent).toEqual('the default')
      const input = ReactTestUtils.findRenderedDOMComponentWithTag(subject, 'input')
      expect(input.type).toEqual('hidden')
      expect(input.value).toEqual('defaultValue')
    })

    it('renders the options', () => {
      const options = ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'option')
      expect(options[0].textContent).toEqual('the default')
      expect(options[1].textContent).toEqual('one')
      expect(options[2].textContent).toEqual('two')
    })
  })

  describe('when the select is given a value', () => {
    it('shows the value', () => {
      subject = renderComponent({value: 'my value', options: ['anOption']})

      expect(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'select-toggle-label').textContent).toEqual('my value')
    })
  })
})
