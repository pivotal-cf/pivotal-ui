'use strict';
require('./spec_helper');
var $ = require('jquery');
var React = require('react/addons');

function getListItemText() {
  return $('#container li.list-group-item').map(function() {
    return $('> span', this).text();
  }).toArray();
}

var {DraggableList, DraggableListItem} = require('../../../src/pivotal-ui/javascripts/draggable-list');

describe("DraggableList", function() {
  var subject, dropSpy;

  beforeEach(function() {
    jasmine.clock().install();
    $('<div id="container"></div>').appendTo('body');

    dropSpy = jasmine.createSpy('drop');
    subject = React.render(
      <DraggableList onDrop={dropSpy}>
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
      container
    );
  });

  afterEach(function() {
    React.unmountComponentAtNode(container);
    document.body.removeChild(container);
  });

  it("renders a list group of all items", function() {
    expect($('#container ul.list-group')).toHaveClass('list-draggable');

    expect($('#container li.list-group-item .draggable-grip')).toHaveLength(3);
    expect(getListItemText()).toEqual(['Get me out of here!', 'LOL', 'Can\'t stop']);
  });

  describe("when the children are changed", function() {
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
        container
      );
    });

    it("updates the list of itemIndices", function() {
      expect(subject.state.itemIndices.length).toEqual(4);
    });

    it("renders the items", function() {
      expect(getListItemText()).toEqual(['Get me out of here!', 'LOL', 'Can\'t stop', 'One more time']);
    });
  });

  describe("when starting to drag an item", function() {
    var dataTransferSpy;
    beforeEach(function() {
      dataTransferSpy = jasmine.createSpyObj('dataTransfer', ['setData', 'getData']);
      $('#container li.list-group-item').eq(0).simulate('dragStart', {dataTransfer: dataTransferSpy});
      jasmine.clock().tick(1);
    });

    it("changes the aria-grabbed attribute to true", function() {
      expect($('#container ul.list-group .draggable-grip').eq(0)).toHaveAttr('aria-grabbed', 'true');
    });

    it("calls setData with text/plain so firefox considers the drag to be valid", function() {
      expect(dataTransferSpy.setData).toHaveBeenCalledWith('text/plain', '');
    });

    it("hides the item", function() {
      expect($('#container li.list-group-item').eq(0)).toHaveClass('grabbed');
    });

    it("is not draggable", function() {
      expect($('#container li.list-group-item').eq(0)).toHaveAttr('draggable', 'false');
    });

    describe("when the children are changed", function() {
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
          container
        );
      });

      it("cancels the drag", function() {
        expect(subject.state.draggingId).toBe(null);
      });

      describe("when the drag enter event is triggered", function() {
        it("does not change the list", function() {
          var itemIndices = Array.prototype.slice.call(subject.state.itemIndices);
          $('#container li.list-group-item').eq(1).simulate('dragEnter', {dataTransfer: dataTransferSpy});
          expect(itemIndices).toEqual(subject.state.itemIndices);
        });
      });
    });

    describe("when drag enter event is triggered", function() {
      beforeEach(function() {
        $('#container li.list-group-item').eq(1).simulate('dragEnter', {dataTransfer: dataTransferSpy});
      });

      it("reorders the list", function() {
        expect(getListItemText()).toEqual(['LOL', 'Get me out of here!', 'Can\'t stop']);
      });

      describe("when the drop event is triggered", function() {
        beforeEach(function() {
          $('#container li.list-group-item').eq(1).simulate('drop', {dataTransfer: dataTransferSpy});
        });

        it("calls the drop callback", function() {
          expect(dropSpy).toHaveBeenCalledWith([1, 0, 2]);
        });
      });


      describe("when dragging enter event is triggered on the last list item", function() {
        beforeEach(function() {
          $('#container li.list-group-item').eq(2).simulate('dragEnter', {dataTransfer: dataTransferSpy});
        });

        it("reorders the list", function() {
          var listItemsText = getListItemText();
          expect(listItemsText).toEqual(['LOL', 'Can\'t stop', 'Get me out of here!']);
        });

        describe("when the drag is ended", function() {
          beforeEach(function() {
            $('#container li.list-group-item').eq(2).simulate('dragEnd', {dataTransfer: dataTransferSpy});
          });

          it("removes the grabbed class", function() {
            expect($('#container .grabbed')).not.toExist();
          });

          describe("when starting to drag another item", function() {
            beforeEach(function() {
              $('#container li.list-group-item').eq(2).simulate('dragStart', {dataTransfer: dataTransferSpy});
              jasmine.clock().tick(1);
            });

            describe("when dragging enter event is triggered on the first list item", function() {
              beforeEach(function() {
                $('#container li.list-group-item').eq(0).simulate('dragEnter', {dataTransfer: dataTransferSpy});
              });

              it("reorders the list", function() {
                expect(getListItemText()).toEqual(['Get me out of here!', 'LOL', 'Can\'t stop']);
              });
            });
          });
        });
      });
    });
  });
});
