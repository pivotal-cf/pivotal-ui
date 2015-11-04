var React = require('react');
var types = React.PropTypes;
var classnames = require('classnames');
var move = require('./move_helper');
import {mergeProps} from 'pui-react-helpers';

var HoverMixin = {
  getInitialState() {
    return {hover: false};
  },

  onMouseEnter() {
    this.setState({hover: true});
  },

  onMouseLeave() {
    this.setState({hover: false});
  }
};

function preventDefault(e) {
  e.preventDefault();
}

function childrenIndices(children) {
  return children.map((child, i) => i);
}

/**
 * @component DraggableList
 * @description A list that can be re-ordered via drag-drop
 *
 * @property onDrop {Function} A callback called when the user re-orders list items
 *
 * @example ```js
 * var DraggableList = require('pui-react-draggable-list').DraggableList;
 * var DraggableListItem = require('pui-react-draggable-list').DraggableListItem;
 * var MyComponent = React.createClass({
 *   render() {
 *     return (
 *       <DraggableList onDrop={draggableListDropCallback}>
 *         <DraggableListItem>Get me out of here!</DraggableListItem>
 *         <DraggableListItem>LOL</DraggableListItem>
 *         <DraggableListItem>Can't stop</DraggableListItem>
 *       </DraggableList>
 *     );
 *   }
 * });
 * ```
 *
 */
var DraggableList = React.createClass({
  propTypes: {
    onDragEnd: types.func,
    innerClassName: types.string
  },

  getInitialState() {
    return {
      itemIndices: childrenIndices(this.props.children),
      draggingId: null
    };
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.children) {
      this.setState({
        itemIndices: childrenIndices(nextProps.children),
        draggingId: null
      });
    }
  },

  dragStart(draggingId, {dataTransfer}) {
    dataTransfer.effectAllowed = 'move';
    dataTransfer.dropEffect = 'move';
    dataTransfer.setData('text/plain', '');
    setTimeout(function() { this.setState({draggingId}); }.bind(this), 0);
  },

  dragEnd() {
    this.setState({draggingId: null});
    this.props.onDragEnd && this.props.onDragEnd(this.state.itemIndices);
  },

  dragEnter(e) {
    var {draggingId, itemIndices} = this.state;
    var endDraggingId = Number(e.currentTarget.dataset.draggingId);
    if (draggingId === null || Number.isNaN(endDraggingId)) return;

    var startIndex = itemIndices.indexOf(draggingId);
    var endIndex = itemIndices.indexOf(endDraggingId);

    move(itemIndices, startIndex, endIndex);
    this.setState({itemIndices});
  },

  render() {
    var grabbed, items = [];
    var {children, innerClassName, onDragEnd, ...others} = this.props;
    React.Children.forEach(children, function(child, draggingId) {
      grabbed = this.state.draggingId === draggingId;
      items.push(React.cloneElement(child, {
        grabbed,
        onDragStart: this.dragStart.bind(this, draggingId),
        onDragEnd: this.dragEnd,
        onDragEnter: this.dragEnter,
        draggingId,
        key: draggingId,
        className: innerClassName
      }));
    }, this);
    var sortedItems = this.state.itemIndices.map(i => items[i]);
    var props = mergeProps(others, {className: {'list-group list-draggable': true, dragging: this.state.draggingId !== null}});
    return (
      <ul {...props}>
        {sortedItems}
      </ul>
    );
  }
});

/**
 * @component DraggableListItem
 * @description Denotes list items of a DraggableList
 *
 */
var DraggableListItem = React.createClass({
  mixins: [HoverMixin],

  propTypes: {
    draggingId: types.number,
    onMouseEnter: types.func,
    onMouseLeave: types.func,
    onDragStart: types.func,
    onDragEnter: types.func,
    onDragEnd: types.func,
    grabbed: types.bool,
    className: types.string
  },

  render() {
    var {hover} = this.state;
    var {grabbed, onDragStart, onDragEnd, onDragEnter, draggingId} = this.props;
    var {onMouseEnter, onMouseLeave} = this;
    var className = classnames({'list-group-item pan': true, grabbed, hover});
    var innerClassName = classnames(this.props.className, 'draggable-item-content');
    var props = {
      className, onMouseEnter, onMouseLeave, onDragStart, onDragEnd, onDragEnter,
      onDragOver: preventDefault,
      draggable: !grabbed,
      'data-dragging-id': draggingId
    };
    return (
      <li {...props} aria-dropeffect="move">
        <div className={innerClassName}>
          <div className="draggable-grip mhl" aria-grabbed={grabbed} role="button">
            <i className="fa fa-ellipsis-v mrs"/>
            <i className="fa fa-ellipsis-v"/>
            <span className="sr-only">Drag to reorder</span>
          </div>
          <span>{this.props.children}</span>
        </div>
      </li>
    );
  }
});

module.exports = {DraggableList, DraggableListItem};


/*doc
---
title: Draggable
name: 05_list_draggable_react
parent: list_react
---

<code class="pam">
<i class="fa fa-download" alt="Install the Component">
npm install pui-react-draggable-list --save
</i>
</code>

Require the subcomponents:

```
var DraggableList = require('pui-react-draggable-list').DraggableList;
var DraggableListItem = require('pui-react-draggable-list').DraggableListItem;
```
Creates a draggable list.

The property `onDragEnd` is a callback when a drag event has completed. Use this
if you need to make an API call to update the order of some elements.

```jsx_example
var dragEndCallback = function(data) {
  alert('New item indices order: ' + data);
};
```

```react_example
<DraggableList onDragEnd={dragEndCallback} className="my-list-class" innerClassName="my-item-class">
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
   Get me out of here!
  </DraggableListItem>

  <DraggableListItem>
   LOL
  </DraggableListItem>

  <DraggableListItem>
   Can't stop
  </DraggableListItem>
</DraggableList>
```
*/
