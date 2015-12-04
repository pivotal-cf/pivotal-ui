/*doc
---
title: Search Inputs
name: form_search_input_react
parent: form_react
---


<code class="pam">
<i class="fa fa-download" alt="Install the Component">
npm install pui-react-search-input --save
</i>
</code>

Require the subcomponent:

```
var SearchInput = require('pui-react-search-input').SearchInput;
```

A `SearchInput` component can be used on its own as an input. It accepts standard
text input properties (such as `placeholder`).

```react_example
<SearchInput placeholder="Search..."/>
```

To demonstrate how to use a SearchInput in a more complex example, let's say
we want to filter a list based on the user's input. We can accomplish this
by creating a stateful component which is composed of the SearchInput and the
list to filter.

```jsx_example
var FilteringSearchExample = React.createClass({
  getInitialState: function () {
    return {
      filter: "",
      items: ['Apple', 'Banana', 'Orange']
    }
  },

  updateFilter: function (event) {
    this.setState({ filter: event.target.value });
  },

  render: function () {
    var filterRegex = new RegExp(this.state.filter, "i");
    var listItems = this.state.items.map(function (item) {
      return item.match(filterRegex) && <li key={item}>{item}</li>;
    });

    return (
      <div>
        <SearchInput placeholder='Filter by...' onChange={this.updateFilter}/>
        <ul>
          {listItems}
        </ul>
      </div>
    )
  }
});
```

```react_example
<FilteringSearchExample />
```

*/
