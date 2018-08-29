import '../spec_helper';
import {DraggableList, DraggableListItem} from '../../../src/react/draggable-list';
import move from '../../../src/react/draggable-list/move_helper';

describe('DraggableList', () => {
  let subject;

  beforeEach(() => {
    subject = shallow(
      <DraggableList>
        <DraggableListItem>Foo</DraggableListItem>
        <DraggableListItem>Bar</DraggableListItem>
        <DraggableListItem>Gaz</DraggableListItem>
      </DraggableList>,
      root
    );
  });

  it('renders', () => {
    expect(subject.find('#root ul').hasClass('list-draggable')).toBeTruthy();
  });

  describe('when given an innerClassName', () => {
    beforeEach(() => {
      subject.setProps({innerClassName: 'inner-test-class'});
    });

    it('passes through innerClassName to item content', () => {
      expect(subject.find('.draggable-item-content:eq(0)').hasClass('inner-test-class')).toBeTruthy();
    });
  });

  describe('dragging an item', () => {
    let dataTransferStub, dragEndSpy, setDataSpy;

    beforeEach(() => {
      dataTransferStub = {};
      setDataSpy = jest.fn();
      dataTransferStub.setData = setDataSpy;
      dragEndSpy = jest.fn();

      subject.setProps({onDragEnd: dragEndSpy});
    });

    it('does not apply dragging class to ul by default', () => {
      expect(subject.find('#root ul').hasClass('dragging')).toBeFalsy();
    });

    describe('dragStart', () => {
      beforeEach(() => {
        $('.draggable-item-content:eq(1)').simulateNative('dragStart', {dataTransfer: dataTransferStub});
        jasmine.clock().tick(1);
      });

      it('adds the dragging class', () => {
        expect(subject.find('#root ul').hasClass('dragging')).toBeTruthy();
      });

      it('adds the aria-grabbed attribute', () => {
        expect(subject.find('.draggable-grip:eq(1)').prop('aria-grabbed')).toBe('true');
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
        expect('.draggable-child:eq(0)'.text()).toBe('Bar');
        expect('.draggable-child:eq(1)'.text()).toBe('Foo');
        expect('.draggable-child:eq(2)'.text()).toBe('Gaz');
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
        expect(subject.find('#root ul').hasClass('dragging')).toBeFalsy();
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
