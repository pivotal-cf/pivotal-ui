/*doc
---
title: Inputs
name: 00_form_input_react
parent: form_react
---

<code class="pam">
<img src="/styleguide/download.svg" width="16" height="16"/>
npm install pui-react-inputs --save
</code>

`Input` uses the [Iconography](/react_base_iconography.html) component for `search` and `success`.
If you use those props, you will need to add an svg loader:

<code class="pam">
<img src="/styleguide/download.svg" width="16" height="16"/>
npm install babel-loader svg-react-loader --save-dev
</code>

## Props

Property       | Required | Type                   | Default | Description
---------------|----------|------------------------|---------|------------
autoFocus      | no       | Boolean                | false   | Focus the inner input element on mount
displayError   | no       | Boolean                | false   | Displays the error message when true
errorMessage   | no       | Node                   |         | Message that gets displayed when displayError is true
inputClassName | no       | String                 |         | Classname of the inner input element
id             | no       | String                 |         | The inner label will specify htmlFor=id
label          | no       | Node                   |         | The content of this label
labelClassName | no       | String                 |         | Sets the wrapping label classname
leftIcon       | no       | oneOf(String, Element) |         | Inputs have a custom svg icon when leftIcon is provided
placeholder    | no       | String                 |         | Input placeholder
search         | no       | Boolean                | false   | Inputs have a magnifying glass when the search prop is true
success        | no       | Boolean                | false   | Inputs display a checkmark when the success prop is true

## Basic usage

Import the subcomponent:

```
import {Input} from 'pui-react-inputs';
```

Input components can be used on their own as inputs. They accept standard
text input properties (such as `placeholder`).

Inputs will render a label if given `label`. If given `id`, clicking on the label
will focus the input.

```react_example
<Input label="Label" id="theInput" placeholder="Enter text here if you dare"/>
```

Inputs display a custom `errorMessage` when the `displayError` parameter is truthy.

```react_example
<Input label="Label!"
       labelClassName="hello"
       displayError={true}
       errorMessage="Try Again, Fool"
       inputClassName="hey"
/>

```
Inputs display a checkmark when the `success` prop is true.

```react_example
<Input success
       label="Great Label for a Great Job!"
       placeholder="YOU ARE SO COOL" />
```

Inputs have a magnifying glass when the `search` prop is true

```react_example
<Input search
       label="Search For Answers"
       placeholder="Why does Pivotal UI..." />
```

Inputs have a custom svg icon when `leftIcon` is provided. The custom icon will override the `search` prop if both are provided.

```react_example
<Input leftIcon="add"
       label="Add something here"
       placeholder="Why does Pivotal UI..." />
```

```react_example
<Input leftIcon={<img src="/styleguide/add_circle.svg" width="16" height="16"/>}
       label="This has an custom icon"
       placeholder="Why does Pivotal UI..." />
```

To demonstrate how to use an Input in a more complex example, let's say
we want to filter a list based on the user's input. We can accomplish this
by creating a stateful component which is composed of the Input and the
list to filter.

```jsx_example
class FilteringSearchExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      items: ['Apple', 'Banana', 'Orange']
    };
  }

  render() {
    const filterRegex = new RegExp(this.state.filter, "i");
    const listItems = this.state.items
      .map(item => item.match(filterRegex) && <li key={item}>{item}</li>);

    return (
      <div>
        <Input search placeholder="Filter by..." onChange={event => this.setState({ filter: event.target.value })}/>
        <ul>
          {listItems}
        </ul>
      </div>
    );
  }
}
```

```react_example
<FilteringSearchExample />
```
*/
