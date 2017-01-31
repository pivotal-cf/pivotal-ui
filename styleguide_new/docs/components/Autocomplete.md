# Autocomplete

## Description

## Props

## Basic Usage

```jsx
::title=Basic Example
const onPick = item => alert('You selected ' + item.value);
const onInitializeItems = callback => callback(['foo', 'food', 'bar']);
const AutocompleteExample = () => <Autocomplete onInitializeItems={onInitializeItems} onPick={onPick}/>;

<div>
    <AutocompleteExample/>
</div>
```