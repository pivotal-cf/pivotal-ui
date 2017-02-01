# Autocomplete

## Description
Autocomplete provides the user the ability to search for known entities with the task of retrieval or navigation. For more exploratory search and complex information seeking tasks consider a multi-step workflow or filtering options.

## Do's
- Use Autocompete to facilitate accurate and efficient data entry
- Use Autocompete to select from a finite list of names, objects or symbols

## Don'ts
- Use Autocomplete when the user needs to explore a dataset

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

## Props
