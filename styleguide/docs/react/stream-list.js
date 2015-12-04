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
var StreamList = require('pui-react-stream-list').StreamList;
var StreamListItem = require('pui-react-stream-list').StreamListItem;
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
