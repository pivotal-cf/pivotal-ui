import React from 'react';
import {UIButton} from 'pui-react-buttons';
import {GroupList, ListItem} from 'pui-react-lists';
import mixin from 'pui-react-mixins';
import Animation from 'pui-react-mixins/mixins/animation_mixin';

class StreamListNewItemsButton extends React.Component {
  static propTypes = {
    showNewItems: React.PropTypes.func.isRequired,
    singularNewItemText: React.PropTypes.string,
    pluralNewItemsText: React.PropTypes.string,
    numNewItems: React.PropTypes.number.isRequired
  };

  render() {
    return (
      <UIButton className="btn btn-default list-stream-new-items-btn"
                onClick={this.props.showNewItems}>
        {`${this.props.numNewItems} ${this.props.numNewItems === 1 ?
          this.props.singularNewItemText : this.props.pluralNewItemsText}`}
      </UIButton>
    );
  }
}

export class StreamList extends mixin(React.Component).with(Animation) {
  constructor(props, context) {
    super(props, context);
    this.state = {numRenderedItems: this.numTotalItems()};
  }

  static propTypes = {
    singularNewItemText: React.PropTypes.string.isRequired,
    pluralNewItemsText: React.PropTypes.string.isRequired
  };

  static defaultProps = {
    singularNewItemText: 'new item',
    pluralNewItemsText: 'new items'
  };

  numTotalItems = () => {
    return React.Children.count(this.props.children);
  };

  numNewItems = () => {
    return this.numTotalItems() - this.state.numRenderedItems;
  };

  showNewItems = () => {
    this.setState({numRenderedItems: this.numTotalItems()});
  };

  render() {
    const {children, singularNewItemText, pluralNewItemsText, ...others} = this.props;
    const updatedChildren = [];
    React.Children.forEach(children, child => {
      if (updatedChildren.length === this.state.numRenderedItems) return;
      updatedChildren.unshift(child);
    });
    let newItemsButton = null;
    let height = 0;
    if (this.numNewItems()) {
      const newItemsBtnProps = {
        showNewItems: this.showNewItems,
        singularNewItemText,
        pluralNewItemsText,
        numNewItems: this.numNewItems()
      };
      newItemsButton = <StreamListNewItemsButton {...newItemsBtnProps} />;
      height = this.animate(`list-stream-btn-key-${this.state.numRenderedItems}`, 45, 150, {startValue: 0});
      // animating using `numRenderedItems` makes a new animation every time the button appears
    }
    return (
      <div>
        <div className="list-stream-new-items-btn-wrapper" style={{height}}>{newItemsButton}</div>
        <GroupList {...others}>{updatedChildren}</GroupList>
      </div>
    );
  }
}

export const StreamListItem = ListItem;
