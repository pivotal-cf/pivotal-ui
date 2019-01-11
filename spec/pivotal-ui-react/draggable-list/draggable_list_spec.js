import '../spec_helper';
import {DraggableList, DraggableListItem} from '../../../src/react/draggable-list';
import move from '../../../src/react/draggable-list/move_helper';

describe('DraggableList', () => {
  let subject;

  beforeEach(() => {
    subject = ReactDOM.render(
      <DraggableList>
        <DraggableListItem>Foo</DraggableListItem>
        <DraggableListItem>Bar</DraggableListItem>
        <DraggableListItem>Gaz</DraggableListItem>
      </DraggableList>,
      root
    );
  });

  it('renders', () => {
    expect('#root ul').toHaveClass('list-draggable');
  });

  describe('when given an innerClassName', () => {
    beforeEach(() => {
      subject::setProps({innerClassName: 'inner-test-class'});
    });

    it('passes through innerClassName to item content', () => {
      expect('.draggable-item-content:eq(0)').toHaveClass('inner-test-class');
    });
  });

  describe('dragging an item', () => {
    let dataTransferStub, dragEndSpy, setDataSpy;

    beforeEach(() => {
      dataTransferStub = {};
      setDataSpy = jasmine.createSpy('setData');
      dataTransferStub.setData = setDataSpy;
      dragEndSpy = jasmine.createSpy('dragEnd');

      subject::setProps({onDragEnd: dragEndSpy});
    });

    it('does not apply dragging class to ul by default', () => {
      expect('#root ul').not.toHaveClass('dragging');
    });

    describe('dragStart', () => {
      beforeEach(() => {
        $('.draggable-item-content:eq(1)').simulateNative('dragStart', {dataTransfer: dataTransferStub});
        jasmine.clock().tick(1);
      });

      it('adds the dragging class', () => {
        expect('#root ul').toHaveClass('dragging');
      });

      it('adds the aria-grabbed attribute', () => {
        expect('.draggable-grip:eq(1)').toHaveAttr('aria-grabbed', 'true');
      });

      it('calls setData with text/plain so firefox considers the drag to be valid', () => {
        expect(dataTransferStub.setData).toHaveBeenCalledWith('text/plain', '');
      });
    });

    describe('dragEnter', () => {
      beforeEach(() => {
        $('.draggable-item-content:eq(1)').simulateNative('dragStart', {dataTransfer: dataTransferStub});
        jasmine.clock().tick(1);
        $('.draggable-grip:eq(0)').simulateNative('dragEnter', {dataTransfer: dataTransferStub});
        jasmine.clock().tick(1);
      });

      it('reorders the list', () => {
        expect('.draggable-child:eq(0)').toHaveText('Bar');
        expect('.draggable-child:eq(1)').toHaveText('Foo');
        expect('.draggable-child:eq(2)').toHaveText('Gaz');
      });
    });

    describe('dragEnd', () => {
      beforeEach(() => {
        $('.draggable-item-content:eq(1)').simulateNative('dragStart', {dataTransfer: dataTransferStub});
        jasmine.clock().tick(1);
        $('.draggable-grip:eq(0)').simulateNative('dragEnter', {dataTransfer: dataTransferStub});
        jasmine.clock().tick(1);
        $('.draggable-grip:eq(0)').simulateNative('dragEnd', {dataTransfer: dataTransferStub});
        jasmine.clock().tick(1);
      });

      it('calls the callback only once', () => {
        expect(dragEndSpy).toHaveBeenCalledWith([1, 0, 2]);
        expect(dragEndSpy.calls.count()).toEqual(1);
      });

      it('removes the grabbed class', () => {
        expect('#root ul').not.toHaveClass('dragging');
      });
    });
  });

  describe('move_helper#move', () => {
    it('moves an item at an index in a collection to the specified index', () => {
      expect(move(['a', 'b', 'c', 'd', 'e'], 0, 4)).toEqual(['b', 'c', 'd', 'e', 'a']);
      expect(move(['a', 'b', 'c', 'd', 'e'], 4, 0)).toEqual(['e', 'a', 'b', 'c', 'd']);
      expect(move(['a', 'b', 'c', 'd', 'e'], 0, 2)).toEqual(['b', 'c', 'a', 'd', 'e']);
      expect(move(['a', 'b', 'c', 'd', 'e'], 3, 1)).toEqual(['a', 'd', 'b', 'c', 'e']);
    });
  });
});
