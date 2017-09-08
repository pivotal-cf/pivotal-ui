import React from 'react';
import PropTypes from 'prop-types';
import {DefaultButton} from '../buttons';
import {UnorderedList, ListItem} from '../lists';
import {default as mixin} from '../mixins';
import Animation from '../mixins/mixins/animation_mixin';

class StreamListNewItemsButton extends React.PureComponent {
  static propTypes = {
    showNewItems: PropTypes.func.isRequired,
    singularNewItemText: PropTypes.string,
    pluralNewItemsText: PropTypes.string,
    numNewItems: PropTypes.number.isRequired
  };

  render() {
    return (<DefaultButton flat className="list-stream-new-items-btn" onClick={this.props.showNewItems}>
      {`${this.props.numNewItems} ${this.props.numNewItems === 1 ?
        this.props.singularNewItemText : this.props.pluralNewItemsText}`}
    </DefaultButton>);
  }
}

export class StreamList extends mixin(React.Component).with(Animation) {
  constructor(props, context) {
    super(props, context);
    this.state = {numRenderedItems: this.numTotalItems(props)};
  }

  static propTypes = {
    singularNewItemText: PropTypes.string.isRequired,
    pluralNewItemsText: PropTypes.string.isRequired
  };

  static defaultProps = {
    singularNewItemText: 'new item',
    pluralNewItemsText: 'new items'
  };

  numTotalItems = props => React.Children.count(props.children);

  numNewItems = () => this.numTotalItems(this.props) - this.state.numRenderedItems;

  showNewItems = () => this.setState({numRenderedItems: this.numTotalItems(this.props)});

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
    return (<div>
      <div className="list-stream-new-items-btn-wrapper" style={{height}}>{newItemsButton}</div>
      <UnorderedList {...others}>{updatedChildren}</UnorderedList>
    </div>);
  }
}

export const StreamListItem = ListItem;
