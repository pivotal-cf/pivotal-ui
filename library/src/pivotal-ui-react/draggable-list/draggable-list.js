import React from 'react';
import classnames from 'classnames';
import move from './move_helper';
import {Icon} from 'pui-react-iconography';
import {mergeProps} from 'pui-react-helpers';
import 'pui-css-lists';

const types = React.PropTypes;

const childrenIndices = children => children.map((child, i) => i);

export class DraggableList extends React.Component {
  static propTypes = {
    onDragEnd: types.func,
    innerClassName: types.string
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      itemIndices: childrenIndices(props.children),
      draggingId: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.children) {
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
    } catch(err) {
      dataTransfer.setData('text', '');
    }
    setTimeout(() => this.setState({draggingId}), 0);
  }

  dragEnd = () => {
    this.setState({draggingId: null});
    this.props.onDragEnd && this.props.onDragEnd(this.state.itemIndices);
  }

  dragEnter = e => {
    const {draggingId, itemIndices} = this.state;
    const endDraggingId = Number(e.currentTarget.getAttribute('data-dragging-id'));
    if(draggingId === null || Number.isNaN(endDraggingId)) return;

    const startIndex = itemIndices.indexOf(draggingId);
    const endIndex = itemIndices.indexOf(endDraggingId);

    move(itemIndices, startIndex, endIndex);
    this.setState({itemIndices});
  }

  render() {
    const items = [];
    let grabbed;
    const {children, innerClassName, onDragEnd, ...others} = this.props;
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
    const sortedItems = this.state.itemIndices.map(i => items[i]);
    const props = mergeProps(others, {
      className: {
        'list-draggable': true,
        dragging: this.state.draggingId !== null
      }
    });
    return <ul {...props}>{sortedItems}</ul>;
  }
}

export class DraggableListItem extends React.Component {
  static propTypes = {
    draggingId: types.number,
    onMouseEnter: types.func,
    onMouseLeave: types.func,
    onDragStart: types.func,
    onDragEnter: types.func,
    onDragEnd: types.func,
    grabbed: types.bool,
    className: types.string
  }

  constructor(props, context) {
    super(props, context);
    this.state = {hover: false};
  }

  onMouseEnter = () => this.setState({hover: true})

  onMouseLeave = () => this.setState({hover: false})

  render() {
    const {hover} = this.state;
    const {grabbed, onDragStart, onDragEnd, onDragEnter, draggingId, children} = this.props;
    const {onMouseEnter, onMouseLeave} = this;
    const className = classnames({'pan': true, grabbed, hover});
    const innerClassName = classnames(this.props.className, 'draggable-item-content');
    const props = {
      className, onMouseEnter, onMouseLeave, onDragStart, onDragEnd, onDragEnter,
      onDragOver: e => e.preventDefault(),
      draggable: !grabbed,
      'data-dragging-id': draggingId
    };

    return (<li {...props} aria-dropeffect="move">
      <div className={innerClassName}>
        <div className="draggable-grip mhs" aria-grabbed={grabbed} role="button">
          <Icon src="grip"/>
          <span className="sr-only">Drag to reorder</span>
        </div>
        <span className="draggable-child">{children}</span>
      </div>
    </li>);
  }
}
