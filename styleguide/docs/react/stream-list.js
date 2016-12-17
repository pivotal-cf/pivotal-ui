/*doc
---
title: Stream List
name: 12_list_stream_react
parent: list_react
---

<code class="pam">
<img src="/styleguide/download.svg" width="16" height="16"/>
npm install pui-react-lists pui-react-stream-list pui-react-buttons --save
</code>

Import the subcomponents:

```js
import {StreamList, StreamListItem} from 'pui-react-stream-list';

// for the example
import {DefaultButton} from 'pui-react-buttons'
```

Use this component when you have streaming/polling data that you want to
display in a list. As items roll in (polling, streams, websockets - your choice), add the
items to the list. The user will see a "n new item(s)" button animate in
at the top of the list. When the user clicks the button, the new items
appear in the list.


```jsx_example
const counter = (() => {
  let i = 4;
  return () => i++;
})();

class StreamListExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: ['Event 1', 'Event 2', 'Event 3']};
  }

  simulateIncomingData() {
    const newData = this.state.data.concat(['Event ' + counter()]);
    this.setState({data: newData});
  }

  render() {
    return (
      <div>
        <DefaultButton onClick={this.simulateIncomingData.bind(this)}>
          Simulate Incoming Data
        </DefaultButton>
        <StreamList singularNewItemText="new thing" pluralNewItemsText="new things">
          {this.state.data.map((datum, i) => {
            return <StreamListItem key={i}>{datum}</StreamListItem>
          })}
        </StreamList>
      </div>
    );
  }
}
```

```react_example_table
<StreamListExample />
```
*/
