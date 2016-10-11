const React = require('react');
const types = React.PropTypes;
const classnames = require('classnames');
const move = require('./move_helper');
const {Icon} = require('pui-react-iconography');
import {mergeProps} from 'pui-react-helpers';
require('pui-css-lists');

function preventDefault(e) {
  e.preventDefault();
}

function childrenIndices(children) {
  return children.map((child, i) => i);
}

class DraggableList extends React.Component{
  constructor(props, context) {
    super(props, context);
    this.state = {
      itemIndices: childrenIndices(props.children),
      draggingId: null
    }
  }

  static propTypes = {
    onDragEnd: types.func,
    innerClassName: types.string
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.children) {
      this.setState({
        itemIndices: childrenIndices(nextProps.children),
        draggingId: null
      });
    }
  }

  dragStart = (draggingId, {dataTransfer}) => {
    dataTransfer.effectAllowed = 'move';
    try {
      dataTransfer.dropEffect = 'move';
      dataTransfer.setData('text/plain', '');
    } catch (err) {
      dataTransfer.setData('text', '');
    }
    setTimeout(() => this.setState({draggingId}), 0);
  };

  dragEnd = () => {
    this.setState({draggingId: null});
    this.props.onDragEnd && this.props.onDragEnd(this.state.itemIndices);
  };

  dragEnter = (e) => {
    var {draggingId, itemIndices} = this.state;
    var endDraggingId = Number(e.currentTarget.getAttribute('data-dragging-id'));
    if (draggingId === null || Number.isNaN(endDraggingId)) return;

    var startIndex = itemIndices.indexOf(draggingId);
    var endIndex = itemIndices.indexOf(endDraggingId);

    move(itemIndices, startIndex, endIndex);
    this.setState({itemIndices});
  };

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
}

class DraggableListItem extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {hover: false};
  }

  static propTypes = {
    draggingId: types.number,
    onMouseEnter: types.func,
    onMouseLeave: types.func,
    onDragStart: types.func,
    onDragEnter: types.func,
    onDragEnd: types.func,
    grabbed: types.bool,
    className: types.string
  };

  onMouseEnter = () => {
    this.setState({hover: true});
  };

  onMouseLeave = () => {
    this.setState({hover: false});
  };

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
          <div className="draggable-grip mhs" aria-grabbed={grabbed} role="button">
            <Icon src="grip"/>
            <span className="sr-only">Drag to reorder</span>
          </div>
          <span>{this.props.children}</span>
        </div>
      </li>
    );
  }
}

module.exports = {DraggableList, DraggableListItem};
