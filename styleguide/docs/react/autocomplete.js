/*doc
---
title: Autocomplete
name: autocomplete_react
categories:
- react_components_autocomplete
- react_all
---

<code class="pam">
<img src="/styleguide/download.svg" width="16" height="16"/>
npm install pui-react-autocomplete --save
</code>

## Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
className         | no | String   |    | `className` to add to autocomplete
disabled          | no | Boolean  |    | whether the input is disabled
input             | no | Object   |    | overrides the input for autocomplete
maxItems          | no | Number   | 50 | the maximum number of items in the autocomplete list
onClick           | no | Function |    | `onClick` to add to the input
onFilter          | no | Function |    | lets you apply an additional filter to the autocomplete list
onFocus           | no | Function |    | `onFocus` to add to the input
onInitializeItems | no | Function |    | returns the values to initially populate the autocomplete list
onPick            | no | Function |    | callback when something is picked from the list
onSearch          | no | Function |    | To override the default search algorithm, pass your custom function to the autocomplete as the prop onSearch.
placeholder       | no | String   |    | placeholder text for the input
trieOptions       | no | Object   |    | Options for the default TrieSearch algorithm (e.g. `ignoreCase`: a boolean is set to true by default, `splitOnRegEx`: a RegEx)
value             | no | String   |    | used when the input is a controlled input

## Basic usage

```
import {Autocomplete} from 'pui-react-autocomplete';
```

```jsx_example
const onPick = item => alert('You selected ' + item.value);
const onInitializeItems = callback => callback(['foo', 'food', 'bar']);
const AutocompleteExample = () => <Autocomplete onInitializeItems={onInitializeItems} onPick={onPick}/>;
```

```react_example_table
<AutocompleteExample/>
```

## onInitializeItems

The callback passed to this function should return the values to initially populate the list of items.

It's designed to be able to be used asynchronously:

```js
const onInitializeItems = callback => {
  $.get('example.com/autocomplete_items').then(items => callback(items));
};
```

But it can also just be used synchronously:

```js
const onInitializeItems = callback => callback(['foo', 'food', 'bar']);
```

## onPick

By default, when a user selects a list item, nothing happens except hiding the list.

```js
const onPick = value => {
  $.post('example.com/add_to_cart?thing=' + value);
};
```

## onSearch

To override the default search algorithm, pass your custom function to the Autocomplete as the prop onSearch.

onSearch is given the current value of the input and a callback.

The callback should return the items that should be shown in the list given that input value.

The list should be an array of objects with the `value` key e.g.
`[{value: 'foo'}, {value: 'food'}, {value: 'foe'}]`

It's designed to be able to be used asynchronously:

```js
const onSearch = (value, callback) => {
  $.get('example.com/autocomplete_results?value=' + value).then(results => callback(results));
};
```

But it can also just be used synchronously:

```js
const onSearch = (value, callback) => {
  callback(myCustomList.filter(entry => entry.includes('foo-' + value + '-bar'));
};
```
*/
