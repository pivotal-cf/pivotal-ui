import React from 'react/addons';
import {UIButton} from 'pui-react-buttons';
import {GroupList, ListItem} from 'pui-react-lists';
import AnimationMixin from 'pui-react-animation';

/**
 * @component StreamList
 * @description A dynamically growing list
 *
 * @property singularNewItemText {string} Text to be displayed when there is one new list item available
 * @property pluralNewItemsText {string} Text to be displayed when there are multiple new list items available
 *
 * @example ```jsx
 *  var DefaultButton = require('pui-react-buttons').DefaultButton;
 *  var ListItem = require('pui-react-lists').ListItem;
 *  var StreamList = require('pui-react-stream-list').StreamList;
 *
 *  var counter = (function() {
 *  var i = 4;
 *    return function() {
 *      return i++;
 *    }
 *  })();
 *
 *  var StreamListExample = React.createClass({
 *    simulateIncomingData: function() {
 *      var newData = this.state.data.concat(['Event ' + counter()]);
 *      this.setState({data: newData});
 *    },
 *
 *    getInitialState: function() {
 *      return {data: ['Event 1', 'Event 2', 'Event 3']};
 *    },
 *
 *    render: function() {
 *      return (
 *        <div>
 *          <DefaultButton onClick={this.simulateIncomingData}>Simulate Incoming Data</DefaultButton>
 *          <StreamList singularNewItemText="new thing" pluralNewItemsText="new things">
 *            {this.state.data.map(function(datum) {
 *              return <ListItem>{datum}</ListItem>
 *            })}
 *          </StreamList>
 *         </div>
 *      );
 *    }
 *  });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#list_draggable_react)
 */

/**
 * @component DraggableListItem
 * @description Denotes list items of a DraggableList
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#list_draggable_react)
 */

const StreamListNewItemsButton = React.createClass({
  propTypes: {
    showNewItems: React.PropTypes.func.isRequired,
    singularNewItemText: React.PropTypes.string,
    pluralNewItemsText: React.PropTypes.string,
    numNewItems: React.PropTypes.number.isRequired
  },

  render() {
    return (
      <UIButton className="btn btn-default list-stream-new-items-btn"
                onClick={this.props.showNewItems}>
        {`${this.props.numNewItems} ${this.props.numNewItems === 1 ?
          this.props.singularNewItemText : this.props.pluralNewItemsText}`}
      </UIButton>
    );
  }
});

export const StreamList = React.createClass({
  mixins: [AnimationMixin],

  propTypes: {
    singularNewItemText: React.PropTypes.string.isRequired,
    pluralNewItemsText: React.PropTypes.string.isRequired
  },

  getDefaultProps() {
    return {
      singularNewItemText: 'new item',
      pluralNewItemsText: 'new items'
    };
  },

  getInitialState() {
    return {numRenderedItems: this.numTotalItems()};
  },

  numTotalItems() {
    return React.Children.count(this.props.children);
  },

  numNewItems() {
    return this.numTotalItems() - this.state.numRenderedItems;
  },

  showNewItems() {
    this.setState({numRenderedItems: this.numTotalItems()});
  },

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
});

export const StreamListItem = ListItem;

/*doc
---
title: Stream List
name: 12_list_stream_react
parent: list_react
---

<code class="pam">
<i class="fa fa-download" alt="Install the Component">
npm install pui-react-lists pui-react-stream-list pui-react-buttons --save
</i>
</code>

For the example, you also need to install [Buttons](#button_react) and require `DefaultButton` from it.

Require the subcomponents:

```js
import { StreamList, StreamListItem } from 'pui-react-stream-list';
```

Use this component when you have streaming/polling data that you want to
display in a list. As items roll in (polling, streams, websockets - your choice), add the
items to the list. The user will see a "n new item(s)" button animate in
at the top of the list. When the user clicks the button, the new items
appear in the list.


```jsx_example
var counter = (function() {
  var i = 4;
  return function() {
    return i++;
  }
})();

var StreamListExample = React.createClass({
  simulateIncomingData: function() {
    var newData = this.state.data.concat(['Event ' + counter()]);
    this.setState({data: newData});
  },

  getInitialState: function() {
    return {data: ['Event 1', 'Event 2', 'Event 3']};
  },

  render: function() {
    return (
      <div>
        <DefaultButton className="btn btn-default" onClick={this.simulateIncomingData}>
          Simulate Incoming Data
        </DefaultButton>
        <StreamList singularNewItemText="new thing" pluralNewItemsText="new things">
          {this.state.data.map(function(datum, i) {
            return <StreamListItem key={i}>{datum}</StreamListItem>
          })}
        </StreamList>
      </div>
    );
  }
});
```

```react_example_table
<StreamListExample />
```

*/
