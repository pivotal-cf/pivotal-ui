var Autocomplete = require('./autocomplete');
var AutocompleteList = require('./autocomplete-list');
var AutocompleteInput = require('./autocomplete-input');

module.exports = {
  /**
   * @component Autocomplete
   * @description An autocomplete that comes with a dropdown list
   *
   * @property disabled {Bool} Greys out and turns off event handlers.
   * @property input {React Component} Use if you want to override the default AutocompleteInput.
   * @property maxItems {Number} Cap the number of items that can appear in the dropdown list.
   * @property onClick {Function} Event handler for click on the input (e.g. to automatically select value text).
   * @property onFilter {Function} Optionally filter list items (other than by the input value).
   * @property onFocus {Function} Event handler for focus on the input (e.g. to automatically show the list).
   * @property onInitializeItems {Function} Your one chance to populate the list.
   * @property onPick {Function} Event handler for choosing an item in the list.
   * @property onSearch {Function} Override default search algorithm called whenever input value changes.
   * @property placeholder {String} Placeholder text for the input.
   * @property selectedSuggestion {Any} Matcher for the item in the list that is currently selected.
   * @property value {String} The value of the input.
   *
   * @example ```js
   * var Autocomplete = require('pui-react-autocomplete').Autocomplete;
   * var initialItems = ['Pivotal Labs', 'Cloud Foundry', 'Data Services'];
   * var onInitializeItems = function(callback) { callback(initialItems) };
   * var onPick = function(value) { console.log(value); };
   * var MyComponent = React.createClass({
   *   render() {
   *     return <Autocomplete {onInitializeItems, onPick}/>
   *   }
   * });
   * ```
   *
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#autocomplete_react)
   */
  Autocomplete,

  AutocompleteInput,

  AutocompleteList
};
