import '../spec_helper'
import ReactTestUtils from 'react-addons-test-utils'
import {SuccessAlert, InfoAlert, WarningAlert, ErrorAlert} from '../../../src/pivotal-ui-react/alerts/alerts'

describe('Alert Component', () => {
  describe('Success Alert', () => {
    const renderComponent = props => ReactTestUtils.renderIntoDocument(
      <SuccessAlert {...props}>
        alert body
      </SuccessAlert>)

    it('renders', () => {
      const result = renderComponent()
      const component = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'alert')
      expect(component).not.toBeNull()
    })

    it('passes down the className, id, and style properties', () => {
      const result = renderComponent({className: 'foo', id: 'bar', style: {fontSize: '200px'}})
      const component = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'alert')

      expect(component.className).toContain('foo')
      expect(component.id).toEqual('bar')
      expect(component.style.fontSize).toEqual('200px')
    })

    it('renders a sr-only alert description', () => {
      const result = renderComponent({withIcon: true})
      const component = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'sr-only')
      expect(component.textContent).toEqual('success alert message,')
    })

    describe('when dismissable is set to true', () => {
      let result

      beforeEach(() => {
        result = renderComponent({dismissable: true})
      })

      it('adds the alert-dismissable class', () => {
        const component = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'alert')
        expect(component.className).toContain('alert-dismissable')
      })

      it('has a close button', () => {
        const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(result, 'button')
        expect(buttons.length).toEqual(2)
        expect(buttons[1].className).toContain('close')
      })

      it('has an sr-only close button', () => {
        const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(result, 'button')
        expect(buttons.length).toEqual(2)
        expect(buttons[0].hasAttribute('aria-hidden')).toBeFalsy()
        expect(buttons[0].textContent).toEqual('Close alert')
        expect(buttons[1].hasAttribute('aria-hidden')).toBeTruthy()
      })

      it('adds the closeLabel to the close button', () => {
        result = renderComponent({dismissable: true, closeLabel: 'click to close the alert'})
        const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(result, 'button')

        expect(buttons[0].textContent).toEqual('click to close the alert')
      })

      it('disappears when close button is clicked', () => {
        result = renderComponent({dismissable: true})
        const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(result, 'button')
        ReactTestUtils.Simulate.click(buttons[1])
        jasmine.clock().tick(1)

        const components = ReactTestUtils.scryRenderedDOMComponentsWithClass(result, 'alert')
        expect(components.length).toEqual(0)
      })

      describe('when onDismiss is given', () => {
        let onDismissSpy;

        beforeEach(() => {
          onDismissSpy = jasmine.createSpy('dismissable callback');
        });

        it('calls onDismiss when the close button is clicked', () => {
          result = renderComponent({dismissable: true, onDismiss: onDismissSpy})
          const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(result, 'button')
          ReactTestUtils.Simulate.click(buttons[1])
          jasmine.clock().tick(1)

          expect(onDismissSpy).toHaveBeenCalled();
        })
      })

      describe('when show is true', () => {
        it('renders the alert even after the close button is clicked', () => {
          result = renderComponent({dismissable: true, show: true})
          const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(result, 'button')
          ReactTestUtils.Simulate.click(buttons[1])
          jasmine.clock().tick(1)

          const components = ReactTestUtils.scryRenderedDOMComponentsWithClass(result, 'alert')
          expect(components.length).toEqual(1)
        })

        it('hides the alert when show is set to false', () => {
          result = renderComponent({dismissable: true, show: false})

          const components = ReactTestUtils.scryRenderedDOMComponentsWithClass(result, 'alert')
          expect(components.length).toEqual(0)
        })
      })
    })

    describe('when dismissable is not present', () => {
      it('does not have a close button', () => {
        const result = renderComponent()
        const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(result, 'button')
        expect(buttons.length).toEqual(0)
      })
    })

    describe('when withIcon is set to true', () => {
      let result

      beforeEach(() => {
        result = renderComponent({withIcon: true})
      })

      it('renders a success alert', () => {
        const component = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'alert')
        expect(component.className).toContain('alert-success')
      })

      it('renders an icon in the alert', () => {
        const component = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'svg')
        expect(component).not.toBeNull()
        expect(component.className.baseVal).toContain('icon-check_circle')
      })

      it('has a "success alert" label', () => {
        const component = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'sr-only')
        expect(component.textContent).toContain('success')
      })
    })
  })

  describe('InfoAlert with Icon', () => {
    const renderComponent = props => ReactTestUtils.renderIntoDocument(
      <InfoAlert {...props}>
        alert body
      </InfoAlert>)

    let result

    beforeEach(() => {
      result = renderComponent({withIcon: true})
    })

    it('renders an info alert', () => {
      const component = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'alert')
      expect(component.className).toContain('alert-info')
    });

    it('renders an icon in the alert', () => {
      const component = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'svg')
      expect(component).not.toBeNull()
      expect(component.className.baseVal).toContain('icon-info')
    })

    it('has a "info alert" label', () => {
      const component = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'sr-only')
      expect(component.textContent).toContain('info')
    })
  })

  describe('WarningAlert with Icon', () => {
    const renderComponent = props => ReactTestUtils.renderIntoDocument(
      <WarningAlert {...props}>
        alert body
      </WarningAlert>)

    let result

    beforeEach(() => {
      result = renderComponent({withIcon: true})
    })

    it('renders an warning alert', () => {
      const component = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'alert')
      expect(component.className).toContain('alert-warning')
    });

    it('renders an icon in the alert', () => {
      const component = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'svg')
      expect(component).not.toBeNull()
      expect(component.className.baseVal).toContain('icon-warning')
    })

    it('has a "warning alert" label', () => {
      const component = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'sr-only')
      expect(component.textContent).toContain('warning')
    })
  })

  describe('ErrorAlert with Icon', () => {
    const renderComponent = props => ReactTestUtils.renderIntoDocument(
      <ErrorAlert {...props}>
        alert body
      </ErrorAlert>)

    let result

    beforeEach(() => {
      result = renderComponent({withIcon: true})
    })

    it('renders an error alert', () => {
      const component = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'alert')
      expect(component.className).toContain('alert-danger')
    });

    it('renders an icon in the alert', () => {
      const component = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'svg')
      expect(component).not.toBeNull()
      expect(component.className.baseVal).toContain('icon-warning')
    })

    it('has a "error alert" label', () => {
      const component = ReactTestUtils.findRenderedDOMComponentWithClass(result, 'sr-only')
      expect(component.textContent).toContain('error')
    })
  })
})
