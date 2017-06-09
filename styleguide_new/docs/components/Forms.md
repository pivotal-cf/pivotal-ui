# Forms

## Description
Some description.

## Checkbox

### Basic Usage

Import the subcomponent:

```
import {Checkbox} from 'pui-react-checkbox';
```

A Checkbox component renders a checkbox with a label. It accepts standard
checkbox input properties (such as `placeholder`).

```jsx
::title=Checkbox with Label
<Checkbox label="Label"/>
```

A Checkbox component displays a custom `errorMessage` when the `displayError` parameter is truthy.

```jsx
::title=Checkbox with Custom Error Message
<Checkbox label="Label!"
          labelClassName="hello"
          displayError={true}
          errorMessage="You must accept the terms and conditions!"
          inputClassName="hey" />
```

### Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
displayError   | no | Boolean | false | Displays the error message when true
errorMessage   | no | Node    |       | Message that gets displayed when displayError is true
inputClassName | no | String  |       | Classname of the inner input element
id             | no | String  |       | The inner label will specify htmlFor=id
label          | no | Node    |       | The content of this label
labelClassName | no | String  |       | Sets the wrapping label classname


## Inputs

`Input` uses the [Iconography](/react_base_iconography.html) component for `search` and `success`.
If you use those props, you will need to add an svg loader:

<code class="pam">
<img src="/styleguide/download.svg" width="16" height="16"/>
npm install babel-loader react-svg-loader --save-dev
</code>

### Basic Usage

Import the subcomponent:

```
import {Input} from 'pui-react-inputs';
```

Input components can be used on their own as inputs. They accept standard
text input properties (such as `placeholder`).

Inputs will render a label if given `label`. If given `id`, clicking on the label
will focus the input.

```jsx
::title=Input with Label
<Input label="Label" id="theInput" placeholder="Enter text here if you dare"/>
```

Inputs display a custom `errorMessage` when the `displayError` parameter is truthy.

```jsx
::title=Input with Custom Error Message
<Input label="Label!"
       labelClassName="hello"
       displayError={true}
       errorMessage="Try Again, Fool"
       inputClassName="hey"
/>

```
Inputs display a checkmark when the `success` prop is true.

```jsx
::title=Input with Checkmark
<Input success
       label="Great Label for a Great Job!"
       placeholder="YOU ARE SO COOL" />
```

Inputs have a magnifying glass when the `search` prop is true

```jsx
::title=Search Input
<Input search
       label="Search For Answers"
       placeholder="Why does Pivotal UI..." />
```

Inputs have a custom svg icon when `leftIcon` is provided. The custom icon will override the `search` prop if both are provided.

```jsx
::title=Custom Icon Input
<Input leftIcon="add"
       label="Add something here"
       placeholder="Why does Pivotal UI..." />
```

```jsx
::title=Custom Icon Input 2
<Input leftIcon={<img src="/styleguide/add_circle.svg" width="16" height="16"/>}
       label="This has an custom icon"
       placeholder="Why does Pivotal UI..." />
```

Input has a `size` attribute that takes three options: small, medium (default), and large.

```jsx
::title=Size Examples
<div className="grid">
  <div className="col col-top form-group">
    <Input size="large" label="Large" placeholder="Why does Pivotal UI..."/>
  </div>
  <div className="col col-top form-group">
    <Input size="medium" label="Medium" placeholder="Why does Pivotal UI..."/>
  </div>
  <div className="col col-top form-group">
    <Input size="small" label="Small" placeholder="Why does Pivotal UI..."/>
  </div>
</div>
```

To demonstrate how to use an Input in a more complex example, let's say
we want to filter a list based on the user's input. We can accomplish this
by creating a stateful component which is composed of the Input and the
list to filter.

```jsx
::title=Filtering Search Example
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

<div>
  <FilteringSearchExample />
</div>
```
### Props

Property       | Required | Type                              | Default  | Description
---------------|----------|-----------------------------------|----------|------------
autoFocus      | no       | Boolean                           | false    | Focus the inner input element on mount
displayError   | no       | Boolean                           | false    | Displays the error message when true
errorMessage   | no       | Node                              |          | Message that gets displayed when displayError is true
inputClassName | no       | String                            |          | Classname of the inner input element
id             | no       | String                            |          | The inner label will specify htmlFor=id
label          | no       | Node                              |          | The content of this label
labelClassName | no       | String                            |          | Sets the wrapping label classname
leftIcon       | no       | oneOf(String, Element)            |          | Inputs have a custom svg icon when leftIcon is provided
placeholder    | no       | String                            |          | Input placeholder
search         | no       | Boolean                           | false    | Inputs have a magnifying glass when the search prop is true
size           | no       | oneOf('small', 'medium', 'large') | 'medium' | Size variations
success        | no       | Boolean                           | false    | Inputs display a checkmark when the success prop is true

## Radio

### Basic Usage

For the example, you also need to install [Grids](#grid_react) and require `Col` from it.

Import the subcomponents:

```
import {RadioGroup, Radio} from 'pui-react-radio';
```

Using React radio buttons in a form is fairly straightforward.

```jsx
::title=Basic Example
<RadioGroup name="field_name">
  <Radio value="firstValue">You could click this radio button</Radio>
  <Radio value="SecondValue" defaultChecked>This is also a radio button</Radio>
  <Radio value="ThirdValue" disabled>This is a disabled radio button</Radio>
</RadioGroup>
```

In this case, the `name` attached to `RadioGroup` will be applied to all of Radio children.

Additionally, special behaviors can be added to the `onChange` event handler
exposed by radio groups. In this example, additional form controls are displayed
when the user selects the third radio button.

Similar to the `name` property, the `onChange` handlers is passed down to all child components.

```jsx
::title=onChange Example
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selection: null};
  }

  render() {
    return (
      <form role="form" className="form-horizontal">
        <div className="form-group">
          <Row>
            <Col md={3}>
              <label>Options</label>
            </Col>
            <Col md={21}>
              <RadioGroup name="stuff" onChange={event => this.setState({selection: event.target.value})}>
                <Radio value="others">Others</Radio>
                <Radio value="others1" defaultChecked>More others</Radio>
                <Radio value="special">Click for more!</Radio>
              </RadioGroup>
            </Col>
          </Row>
        </div>
        {this.state.selection === 'special' && (
          <div className="form-group">
            <Row>
              <Col md={3}>
                <label>Stuff that appears</label>
              </Col>
              <Col md={21}>
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
              </Col>
            </Row>
          </div>
        )}
      </form>
    );
  }
}

<div>
  <MyComponent />
</div>
```
### Props

RadioGroup

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
id       | no  | String   | | The id of the element
name     | yes | String   | | This name is passed to all children, so you don't have to specify name manually each time
onChange | no  | Function | | Callback that fires each time selection is changed

Radio

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
defaultChecked | no  | Boolean  | false | Whether this element is default checked
value          | yes | String   |       | Value of the radio element
onChange       | no  | Function |       | Callback that fires when this element selection is changed
id             | no  | String   |       | The id of the element
className      | no  | String   |       | The classname of the element
style          | no  | Object   |       | Individual styling of the element
disabled       | no  | Boolean  | false | Whether the radio is disabled

## Toggle

### Basic Usage

Import the subcomponent:

```
import {Toggle} from 'pui-react-toggle';
```

The Toggle component takes an `onChange` callback.

```jsx
::title=Basic Example
<Toggle onChange={() => console.log('I have been toggled!')}/>
```

Toggles accept a `checked` prop that turns on the switch.
Note that you must handle the addition and removal of the `checked` property yourself.

```jsx
::title=Toggle Checked Example
<Toggle checked onChange={() => console.log('I should handle check changes!')}/>
```

Toggle has a `size` attribute that takes three options: small, medium (default), and large.

```react_example
<div className="grid">
  <div className="col col-top form-group">
    <label className="label-lg">Large</label>
    <Toggle size="large"/>
  </div>
  <div className="col col-top form-group">
    <label>Medium</label>
    <Toggle size="medium"/>
  </div>
  <div className="col col-top form-group">
    <label className="label-sm">Small</label>
    <Toggle size="small"/>
  </div>
</div>
```

### Props

Property | Required | Type                              | Default  | Description
---------|----------|-----------------------------------|----------|------------
id       | no       | String                            |          | The id of the element
onChange | no       | Function                          |          | Callback that gets fired when toggle occurs
size     | no       | oneOf('small', 'medium', 'large') | 'medium' | Size variations
