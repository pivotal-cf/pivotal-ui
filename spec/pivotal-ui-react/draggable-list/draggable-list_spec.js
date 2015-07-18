require('../spec_helper');
import {propagateAttributes} from '../spec_helper';

describe('DraggableList', function() {
  var DraggableList, DraggableListItem, subject, dropSpy, props;
  beforeEach(function() {
    DraggableList = require('../../../src/pivotal-ui-react/draggable-list/draggable-list').DraggableList;
    DraggableListItem = require('../../../src/pivotal-ui-react/draggable-list/draggable-list').DraggableListItem;

    dropSpy = jasmine.createSpy('drop');

    props = {
      className: 'test-class',
      id: 'test-id',
      style: {
        opacity: 1
      }
    };

    subject = React.render(
      <DraggableList onDrop={dropSpy} {...props} innerClassName='inner-test-class'>
        <DraggableListItem>
          Get me out of here!
        </DraggableListItem>
        <DraggableListItem>
          LOL
        </DraggableListItem>
        <DraggableListItem>
          Can't stop
        </DraggableListItem>
      </DraggableList>,
      root
    );
    propagateAttributes('.list-group', props);
  });

  afterEach(function() {
    React.unmountComponentAtNode(root);
  });


  it('passes through innerClassName to item content', function() {
    expect('.draggable-item-content:first').toHaveClass('inner-test-class');
  });


  function getListItemText() {
    return $('li.list-group-item .draggable-item-content').map(function() {
      return $('> span', this).text();
    }).toArray();
  }

  it('renders a list group of all items', function() {
    expect('ul.list-group').toHaveClass('list-draggable');
    expect('li.list-group-item .draggable-grip').toHaveLength(3);
    expect(getListItemText()).toEqual(['Get me out of here!', 'LOL', 'Can\'t stop']);
  });

  describe('when the children are changed', function() {
    beforeEach(function() {
      subject = React.render(
        <DraggableList>
          <DraggableListItem>
            Get me out of here!
          </DraggableListItem>
          <DraggableListItem>
            LOL
          </DraggableListItem>
          <DraggableListItem>
            Can't stop
          </DraggableListItem>
          <DraggableListItem>
            One more time
          </DraggableListItem>
        </DraggableList>,
        root
      );
    });

    it('updates the list of itemIndices', function() {
      expect(subject.state.itemIndices.length).toEqual(4);
    });

    it('renders the items', function() {
      expect(getListItemText()).toEqual(['Get me out of here!', 'LOL', 'Can\'t stop', 'One more time']);
    });
  });

  describe('when starting to drag an item', function() {
    var dataTransferSpy;
    beforeEach(function() {
      dataTransferSpy = jasmine.createSpyObj('dataTransfer', ['setData', 'getData']);
      $('li.list-group-item').eq(0).simulate('dragStart', {dataTransfer: dataTransferSpy});
      jasmine.clock().tick(1);
    });

    it('changes the aria-grabbed attribute to true', function() {
      expect('ul.list-group .draggable-grip:eq(0)').toHaveAttr('aria-grabbed', 'true');
    });

    it('calls setData with text/plain so firefox considers the drag to be valid', function() {
      expect(dataTransferSpy.setData).toHaveBeenCalledWith('text/plain', '');
    });

    it('hides the item', function() {
      expect('li.list-group-item:eq(0)').toHaveClass('grabbed');
    });

    it('is not draggable', function() {
      expect('li.list-group-item:eq(0)').toHaveAttr('draggable', 'false');
    });

    describe('when the children are changed', function() {
      beforeEach(function() {
        subject = React.render(
          <DraggableList>
            <DraggableListItem>
              Get me out of here!
            </DraggableListItem>
            <DraggableListItem>
              LOL
            </DraggableListItem>
            <DraggableListItem>
              Can't stop
            </DraggableListItem>
            <DraggableListItem>
              One more time
            </DraggableListItem>
          </DraggableList>,
          root
        );
      });

      it('cancels the drag', function() {
        expect(subject.state.draggingId).toBe(null);
      });

      describe('when the drag enter event is triggered', function() {
        it('does not change the list', function() {
          var itemIndices = Array.prototype.slice.call(subject.state.itemIndices);
          $('li.list-group-item:eq(1)').simulate('dragEnter', {dataTransfer: dataTransferSpy});
          expect(itemIndices).toEqual(subject.state.itemIndices);
        });
      });
    });

    describe('when drag enter event is triggered', function() {
      beforeEach(function() {
        $('li.list-group-item:eq(1)').simulate('dragEnter', {dataTransfer: dataTransferSpy});
      });

      it('reorders the list', function() {
        expect(getListItemText()).toEqual(['LOL', 'Get me out of here!', 'Can\'t stop']);
      });

      describe('when the drop event is triggered', function() {
        beforeEach(function() {
          $('li.list-group-item:eq(1)').simulate('drop', {dataTransfer: dataTransferSpy});
        });

        it('calls the drop callback', function() {
          expect(dropSpy).toHaveBeenCalledWith([1, 0, 2]);
        });
      });


      describe('when dragging enter event is triggered on the last list item', function() {
        beforeEach(function() {
          $('li.list-group-item:eq(2)').simulate('dragEnter', {dataTransfer: dataTransferSpy});
        });

        it('reorders the list', function() {
          var listItemsText = getListItemText();
          expect(listItemsText).toEqual(['LOL', 'Can\'t stop', 'Get me out of here!']);
        });

        describe('when the drag is ended', function() {
          beforeEach(function() {
            $('li.list-group-item:eq(2)').simulate('dragEnd', {dataTransfer: dataTransferSpy});
          });

          it('removes the grabbed class', function() {
            expect('.grabbed').not.toExist();
          });

          describe('when starting to drag another item', function() {
            beforeEach(function() {
              $('li.list-group-item:eq(2)').simulate('dragStart', {dataTransfer: dataTransferSpy});
              jasmine.clock().tick(1);
            });

            describe('when dragging enter event is triggered on the first list item', function() {
              beforeEach(function() {
                $('li.list-group-item:eq(0)').simulate('dragEnter', {dataTransfer: dataTransferSpy});
              });

              it('reorders the list', function() {
                expect(getListItemText()).toEqual(['Get me out of here!', 'LOL', 'Can\'t stop']);
              });
            });
          });
        });
      });
    });
  });

  describe('move_helper#move', function() {
    it('moves an item at an index in a collection to the specified index', function() {
      var move = require('../../../src/pivotal-ui-react/draggable-list/move_helper');
      expect(move(['a', 'b', 'c', 'd', 'e'], 0, 4)).toEqual(['b', 'c', 'd', 'e', 'a']);
      expect(move(['a', 'b', 'c', 'd', 'e'], 4, 0)).toEqual(['e', 'a', 'b', 'c', 'd']);
      expect(move(['a', 'b', 'c', 'd', 'e'], 0, 2)).toEqual(['b', 'c', 'a', 'd', 'e']);
      expect(move(['a', 'b', 'c', 'd', 'e'], 3, 1)).toEqual(['a', 'd', 'b', 'c', 'e']);
    });
  });
});
