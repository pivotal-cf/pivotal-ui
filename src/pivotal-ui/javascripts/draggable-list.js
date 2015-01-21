'use strict';
var React = require('react/addons');
var _ = require('lodash');
var cx = React.addons.classSet;
var {move} = require('./utils');
var HoverMixin = require('./mixins/hover-mixin');

function preventDefault(e) {
  e.preventDefault();
}

var DraggableList = React.createClass({
  propTypes: {
    onDrop: React.PropTypes.func
  },

  getInitialProps: function() {
    return {
      onDrop: _.noop
    };
  },

  getInitialState: function() {
    return {
      itemIndices: _.times(this.props.children.length),
      draggingId: null
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.children) {
      this.setState({
        itemIndices: _.times(nextProps.children.length),
        draggingId: null
      });
    }
  },

  dragStart: function(draggingId, e) {
    e.dataTransfer.effectAllowed  = 'move';
    e.dataTransfer.dropEffect = 'move';
    e.dataTransfer.setData('text/plain', '');
    setTimeout(function() { this.setState({draggingId}); }.bind(this), 0);
  },

  dragEnd: function() {
    this.setState({draggingId: null});
  },

  dragEnter: function(e) {
    var {draggingId, itemIndices} = this.state;
    var endDraggingId = parseInt(e.currentTarget.dataset.draggingId, 10);
    if (draggingId === null || _.isNaN(endDraggingId)) {
      return;
    }

    var startIndex = itemIndices.indexOf(draggingId);
    var endIndex = itemIndices.indexOf(endDraggingId);

    move(itemIndices, startIndex, endIndex);
    this.setState({itemIndices});
  },

  drop: function() {
    this.props.onDrop(this.state.itemIndices);
  },

  render: function() {
    var grabbed, items = [];
    React.Children.forEach(this.props.children, function(child, draggingId) {
      grabbed = this.state.draggingId === draggingId;
      items.push(React.addons.cloneWithProps(child, {grabbed, onDragStart: _.bind(this.dragStart, this, draggingId), onDragEnd: this.dragEnd, onDragEnter: this.dragEnter, onDrop: this.drop, draggingId, key: draggingId}));
    }, this);
    var sortedItems = _.map(this.state.itemIndices, i => items[i]);
    return (
      <ul className={cx({'list-group list-draggable': true, dragging: this.state.draggingId !== null})}>
        {sortedItems}
      </ul>
    );
  }
});

var DraggableListItem = React.createClass({
  mixins: [HoverMixin],

  propTypes: {
    draggingId: React.PropTypes.number,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    onDragStart: React.PropTypes.func,
    onDragEnter: React.PropTypes.func,
    onDragEnd: React.PropTypes.func,
    onDrop: React.PropTypes.func
  },

  render: function() {
    var {hover} = this.state;
    var {grabbed, onDragStart, onDragEnd, onDragEnter, onDrop, draggingId} = this.props;
    var {onMouseEnter, onMouseLeave} = this;
    var className = cx({'list-group-item pln': true, grabbed, hover});
    var props = {
      className, onMouseEnter, onMouseLeave, onDragStart, onDragEnd, onDragEnter, onDrop,
      onDragOver: preventDefault,
      draggable: !grabbed,
      'data-dragging-id': draggingId
    };
    return (
      <li {...props} aria-dropeffect="move">
        <div className='draggable-grip mhl' aria-grabbed={grabbed} role='button'>
          <i className='fa fa-ellipsis-v mrs'/>
          <i className='fa fa-ellipsis-v'/>
          <span className='sr-only'>Drag to reorder</span>
        </div>
        <span>
          {this.props.children}
        </span>
      </li>
    );
  }
});

module.exports = {
  DraggableList,
  DraggableListItem
};
