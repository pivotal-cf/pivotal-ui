var React = require('react');
var types = React.PropTypes;
import {mergeProps} from 'pui-react-helpers';

/**
 * @component SearchInput
 * @description A text input for inputting search queries
 *
 * @example ```js
 * var SearchInput = require('pui-react-search-input').SearchInput;
 * var MyComponent = React.createClass({
 *   render() {
 *     return <SearchInput name="query" placeholder="Search this site" />;
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#form_search_input_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/forms.html#04_form_search_input)
 */
var SearchInput = React.createClass({
  propTypes: {
    placeholder: types.string
  },

  render: function() {
    const props = mergeProps(this.props, {className: 'form-control', type: 'text', 'aria-label': this.props.placeholder});
    return (
      <div className="form-group form-group-search">
        <input {...props}/>
        <i className="fa fa-search"/>
      </div>
    );
  }
});

module.exports = {SearchInput};


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
