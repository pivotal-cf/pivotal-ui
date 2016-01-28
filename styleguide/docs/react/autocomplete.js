/*doc
 ---
 title: Autocomplete
 name: autocomplete_react
 categories:
 - react_components_autocomplete
 - react_all
 ---

 <code class="pam">
 <i class="fa fa-download" alt="Install the Component">
 npm install pui-react-autocomplete --save
 </i>
 </code>

 Require the subcomponent:

 ```
 var Autocomplete = require('pui-react-autocomplete').Autocomplete;
 ```

 ```jsx_example
var AutocompleteExample = React.createClass({
  onInitializeItems: function(callback) {
    callback(['foo', 'food', 'bar']);
  },
  onPick: function(item) {
    alert('You selected ' + item.value);
  },
  render: function() {
    return (
      <Autocomplete onInitializeItems={this.onInitializeItems} onPick={this.onPick}/>
    );
  }
});

 ```

 ```react_example_table
 <AutocompleteExample/>
 ```

 */

/*doc
 ---
 title: onInitializeItems
 name: autocomplete_oninitializeitems
 parent: autocomplete_react
 ---

 The callback passed to this function should return the values to initially populate the list of items.

 It's designed to be able to be used asynchronously:

 ```js
function onInitializeItems(callback) {
  $.get('example.com/autocomplete_items').then(function(items) {
    callback(items);
  });
};
 ```

 But it can also just be used synchronously:

 ```js
function onInitializeItems(callback) {
  callback(['foo', 'food', 'bar']);
};
 ```

 */

/*doc
 ---
 title: onPick
 name: autocomplete_onpick
 parent: autocomplete_react
 ---

 By default, when a user selects a list item, nothing happens except hiding the list.

 ```js
function onPick(value) {
  $.post('example.com/add_to_cart?thing=' + value);
};
 ```

 */

/*doc
 ---
 title: onSearch
 name: autocomplete_onsearch
 parent: autocomplete_react
 ---

 To override the default search algorithm, pass your custom function to the Autocomplete as the prop onSearch.

 onSearch is given the current value of the input and a callback.

 The callback should return the items that should be shown in the list given that input value.

 The list should be an array of objects with the `value` key e.g.
 `[{value: 'foo'}, {value: 'food'}, {value: 'foe'}]`

 It's designed to be able to be used asynchronously:

 ```js
function onSearch(value, callback) {
  $.get('example.com/autocomplete_results?value=' + value).then(function(results) {
    callback(results);
  });
};
 ```

 But it can also just be used synchronously:

 ```js
function onSearch(value, callback) {
  callback(myCustomList.filter(function(entry) {
    return entry.includes('foo-' + value + '-bar');
  }));
};
 ```

 */
