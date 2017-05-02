import '../spec_helper'

import {Pagination} from 'pui-react-pagination'

describe('Pagination', () => {
  let subject
  const renderComponent = props => ReactTestUtils.renderIntoDocument(<Pagination {...props}/>)

  it('renders a pagination component', () => {
    subject = renderComponent()
    expect(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'pagination')).toBeDefined()
  })

  describe('props', () => {
    it('renders the number of buttons specified in items, plus next and prev buttons', () => {
      subject = renderComponent({items: 5})
      const pagination = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'pagination')
      const paginationButtons = pagination.getElementsByTagName('li')

      expect(paginationButtons[0]).toHaveText('‹')
      expect(paginationButtons[6]).toHaveText('›')
      expect(paginationButtons[1]).toHaveText('1')
      expect(paginationButtons[5]).toHaveText('5')
      expect(paginationButtons).toHaveLength(7)
    })

    it('renders 1 button when no items are specified',() => {
      subject = renderComponent()
      const pagination = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'pagination')
      const paginationButtons = pagination.getElementsByTagName('li')

      expect(paginationButtons).toHaveLength(3)
      expect(paginationButtons[0]).toHaveText('‹')
      expect(paginationButtons[1]).toHaveText('1')
      expect(paginationButtons[2]).toHaveText('›')
    })

    it('does not render next when next is false',() => {
      subject = renderComponent({next: false})
      const pagination = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'pagination')
      const paginationButtons = pagination.getElementsByTagName('li')

      expect(paginationButtons).toHaveLength(2)
      expect(paginationButtons[0]).toHaveText('‹')
      expect(paginationButtons[1]).toHaveText('1')
    })

    it('does not render prev when prev is false',() => {
      subject = renderComponent({prev: false})
      const pagination = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'pagination')
      const paginationButtons = pagination.getElementsByTagName('li')

      expect(paginationButtons).toHaveLength(2)
      expect(paginationButtons[0]).toHaveText('1')
      expect(paginationButtons[1]).toHaveText('›')
    })

    it('renders an active button when activePage number is specified', () => {
      subject = renderComponent({activePage: 1})
      const pagination = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'pagination')
      expect(pagination.getElementsByClassName('active')).toHaveLength(1)
    })

    describe('onSelect', () => {
      let onSelectSpy
      beforeEach(() => {
        onSelectSpy = jasmine.createSpy('onSelect')
        subject = renderComponent({onSelect: onSelectSpy, items: 5})
      })

      it('calls on button click', () => {
        const firstButton = ReactTestUtils.scryRenderedDOMComponentsWithTag(subject, 'li')[4]
        ReactTestUtils.Simulate.click(firstButton)

        expect(onSelectSpy).toHaveBeenCalledWith(jasmine.any(Object), {eventKey: 4})
      })

      it('calls on prev click', () => {
        const prevButton = ReactTestUtils.scryRenderedDOMComponentsWithTag(subject, 'li')[0]
        ReactTestUtils.Simulate.click(prevButton)

        expect(onSelectSpy).toHaveBeenCalledWith(jasmine.any(Object), {eventKey: 'prev'})
      })

      it('calls on next click', () => {
        const nextButton = ReactTestUtils.scryRenderedDOMComponentsWithTag(subject, 'li')[6]
        ReactTestUtils.Simulate.click(nextButton)

        expect(onSelectSpy).toHaveBeenCalledWith(jasmine.any(Object), {eventKey: 'next'})
      })
    })
  })
})
