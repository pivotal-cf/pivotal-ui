import '../spec_helper'
import {DraggableList, DraggableListItem} from 'pui-react-draggable-list'

import move from 'pui-react-draggable-list/move_helper'

describe('DraggableList', function() {
  const renderComponent = props => ReactTestUtils.renderIntoDocument(
    <DraggableList {...props}>
      <DraggableListItem>Foo</DraggableListItem>
      <DraggableListItem>Bar</DraggableListItem>
      <DraggableListItem>Gaz</DraggableListItem>
    </DraggableList>
  )

  it('renders', () => {
    const result = renderComponent()
    const component = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'ul')
    expect(component.className).toEqual('list-draggable')
  })

  it('passes through innerClassName to item content', () => {
    const result = renderComponent({innerClassName: 'inner-test-class'})
    const contentItem = ReactTestUtils.scryRenderedDOMComponentsWithClass(result, 'draggable-item-content')[0]
    expect(contentItem).toHaveClass('inner-test-class')
  })

  describe('dragging an item', () => {
    let dataTransferStub = {
      setData: () => {
      }
    }
    let dragEndSpy
    let setDataSpy

    let renderedComponent
    let draggableList
    let draggableContentItem
    let draggableGrip

    beforeEach(() => {
      setDataSpy = jasmine.createSpy('setData')
      dataTransferStub.setData = setDataSpy

      dragEndSpy = jasmine.createSpy('dragEnd')
      renderedComponent = renderComponent({onDragEnd: dragEndSpy})
      draggableList = ReactTestUtils.findRenderedDOMComponentWithTag(renderedComponent, 'ul')

      expect(draggableList).not.toHaveClass('dragging')

      draggableGrip = ReactTestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'draggable-grip')[1]
      draggableContentItem = ReactTestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'draggable-item-content')[1]
    })

    describe('dragStart', () => {
      beforeEach(() => {
        ReactTestUtils.Simulate.dragStart(draggableContentItem, {dataTransfer: dataTransferStub})
        jasmine.clock().tick(1)
      })

      it('adds the dragging class', () => {
        expect(draggableList).toHaveClass('dragging')
      })

      it('adds the aria-grabbed attribute', () => {
        expect(draggableGrip.hasAttribute('aria-grabbed')).toBe(true)
        expect(draggableGrip.getAttribute('aria-grabbed')).toEqual('true')
      })

      it('calls setData with text/plain so firefox considers the drag to be valid', () => {
        expect(dataTransferStub.setData).toHaveBeenCalledWith('text/plain', '')
      })
    })

    describe('dragEnter', () => {
      beforeEach(() => {
        const dragOverContentItem = ReactTestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'draggable-grip')[0]

        ReactTestUtils.Simulate.dragStart(draggableContentItem, {dataTransfer: dataTransferStub})
        jasmine.clock().tick(1)

        ReactTestUtils.Simulate.dragEnter(dragOverContentItem, {dataTransfer: dataTransferStub})
        jasmine.clock().tick(1)
      })

      it('reorders the list', () => {
        const itemText = ReactTestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'draggable-child')
          .map(i => i.textContent)
        expect(itemText).toEqual(['Bar', 'Foo', 'Gaz'])
      })
    })

    describe('dragEnd', () => {
      beforeEach(() => {
        const dragOverContentItem = ReactTestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'draggable-grip')[0]

        ReactTestUtils.Simulate.dragStart(draggableContentItem, {dataTransfer: dataTransferStub})
        jasmine.clock().tick(1)

        ReactTestUtils.Simulate.dragEnter(dragOverContentItem, {dataTransfer: dataTransferStub})
        jasmine.clock().tick(1)

        ReactTestUtils.Simulate.dragEnd(dragOverContentItem, {dataTransfer: dataTransferStub})
        jasmine.clock().tick(1)
      })

      it('calls the callback only once', () => {
        expect(dragEndSpy).toHaveBeenCalledWith([1, 0, 2])
        expect(dragEndSpy.calls.count()).toEqual(1)
      })

      it('removes the grabbed class', () => {
        expect(draggableList).not.toHaveClass('dragging')
      })
    })
  })

  describe('move_helper#move', () => {
    it('moves an item at an index in a collection to the specified index', () => {
      expect(move(['a', 'b', 'c', 'd', 'e'], 0, 4)).toEqual(['b', 'c', 'd', 'e', 'a'])
      expect(move(['a', 'b', 'c', 'd', 'e'], 4, 0)).toEqual(['e', 'a', 'b', 'c', 'd'])
      expect(move(['a', 'b', 'c', 'd', 'e'], 0, 2)).toEqual(['b', 'c', 'a', 'd', 'e'])
      expect(move(['a', 'b', 'c', 'd', 'e'], 3, 1)).toEqual(['a', 'd', 'b', 'c', 'e'])
    })
  })
})
