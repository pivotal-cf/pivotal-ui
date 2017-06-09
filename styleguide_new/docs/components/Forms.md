# Forms

## Description

Individual form controls automatically receive some global styling.
All textual `<input>`, `<textarea>`, and `<select>` elements with
`.form-control` are set to `width: 100`%; by default. And `.form-group` will have a bottom margin of $base-unit.

Wrap labels and controls in `form-group` for optimum spacing.

## Basic Forms

```html
<form role="form">
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>
  <div class="form-group">
   <div class="checkbox">
     <label>
       <input type="checkbox"> Check me out
     </label>
   </div>
  </div>
  <button type="submit" class="btn btn-default">Submit</button>
</form>
```

## Inline Forms

Add `.form-inline` to your `.form-group` for left-aligned and inline-block controls.

```html
<form class="styleguide-form">
  <div class="form-group form-inline">
    <label for="exampleInputEmail5">
     Email
    </label>
    <input class="form-control" id="exampleInputEmail5" placeholder="Enter email" type="email">
  </div>
  <div class="form-group form-inline">
    <label for="exampleInputPassword2">
     Password
    </label>
    <input class="form-control" id="exampleInputPassword2" placeholder="Password" type="password">
  </div>
  <div class="form-group form-inline">
    <label>
      <input type="checkbox">
      Remember me
    </label>
  </div>
  <div class="form-group form-inline">
    <button class="btn btn-default" type="submit">Sign in</button>
  </div>
</form>
```

## Inputs & Labels

An input with the label top aligned (this is the default layout).

```html
<form class="styleguide-form" role="form">
  <div class="form-group">
    <label for="exampleInputEmail7">Email address</label>
    <input aria-required="true" class="form-control" id="exampleInputEmail7" placeholder="Enter email" required="required" type="email">
  </div>
</form>
```

An input with the label left aligned

```html
<form class="styleguide-form grid grid-nogutter" role="form">
  <div class="form-group col">
    <label for="exampleInputEmail3">Email address</label>
  </div>
  <div class="form-group col col-grow-2">
    <input aria-required="true" class="form-control" id="exampleInputEmail3" placeholder="Enter email" required="required" type="email">
  </div>
</form>
```

An input with the label right aligned (N.B., control-label class provides the right alignment):

```html
<form class="styleguide-form grid grid-nogutter" role="form">
  <div class="form-group col txt-r">
    <label for="exampleInputEmail4">Email address</label>
  </div>
  <div class="form-group col col-grow-2">
    <input aria-required="true" class="form-control" id="exampleInputEmail4" placeholder="Enter email" required="required" type="email">
  </div>
</form>
```

## HTML5 Controls

Examples of standard form controls supported in an example form layout.

Inputs
Most common form control, text-based input fields. Includes support for
all HTML5 types: `text`, `password`, `datetime`, `datetime-local`,
`date`, `month`, `time`, `week`, `number`, `email`, `url`, `search`,
`tel`, and `color`.

<div class="alert alert-warning">
  <p class="em-high">
    Inputs will only be fully styled if their type is properly declared.
  </p>
</div>

```html
<form class="styleguide-form" role="form">
  <label for="html5TextInput">Text Input</label>
  <input class="form-control" id="html5TextInput" placeholder="Text input" type="text">
</form>
```

Password field

```html
<form class="styleguide-form" role="form">
  <div class="form-group">
    <label for="html5PasswordInput">Password Input</label>
    <input class="form-control" id="html5PasswordInput" placeholder="Password" type="password">
  </div>
</form>
```

Date

```html
<form class="styleguide-form" role="form">
  <div class="form-group">
    <label for="html5DateInput">Date Input</label>
    <input class="form-control" id="html5DateInput" placeholder="Date" type="date">
  </div>
</form>
```

Number

```html
<form class="styleguide-form" role="form">
  <div class="form-group">
    <label for="html5NumberInput">Number Input</label>
    <input class="form-control" id="html5NumberInput" placeholder="Number" type="number">
  </div>
</form>
```

With a min/max and default starting value

```html
<form class="styleguide-form" role="form">
  <div class="form-group">
    <label for="html5MinMaxInput">Min/Max Input</label>
    <input class="form-control" id="html5MinMaxInput" placeholder="Number" type="number" min=0 max=2 value=1>
  </div>
</form>
```

With a different increment value

```html
<form class="styleguide-form" role="form">
  <div class="form-group">
    <label for="html5StepInput">Step Input</label>
    <input class="form-control" id="html5StepInput" placeholder="Number" type="number" step=5>
  </div>
</form>
```

Email

Use this with fields that require email addresses to pop up the correct keyboard on mobile

```html
<form class="styleguide-form" role="form">
  <div class="form-group">
    <label for="html5EmailInput">Email Input</label>
    <input class="form-control" id="html5EmailInput" placeholder="Email" type="email">
  </div>
</form>
```

URL

Use this with fields that require urls to pop up the correct keyboard on mobile

```html
<form class="styleguide-form" role="form">
  <div class="form-group">
    <label for="html5URLInput">URL Input</label>
    <input class="form-control" id="html5URLInput" placeholder="URL" type="url">
  </div>
</form>
```

Telephone

Use this with fields that require telephone numbers to pop up the dialpad on mobile

```html
<form class="styleguide-form" role="form">
  <div class="form-group">
    <label for="html5PhoneInput">Phone Input</label>
    <input class="form-control" id="html5PhoneInput" placeholder="Telephone" type="tel">
  </div>
</form>
```

### Read-Only Inputs

Add the `readonly` boolean attribute on an input to prevent user input and style the input as disabled.

```html
<div class="form-group">
 <label for="ReadOnlyInput">ReadOnly</label>
 <input class="form-control" type="text" id="ReadOnlyInput" placeholder="Readonly input here..." readonly>
</div>
```

## Selects

Selects are excellent to use because they will automatically
behave as expected cross browser on different devices. Prefer
them over a custom dropdown whenever possible.

```html
<form class="styleguide-form" role="form">
  <div class="form-group">
    <select class="form-control">
      <option>default option</option>
      <option>an option</option>
      <option>another option</option>
    </select>
  </div>
</form>
```

### Sizing

Set heights using the form control classes `.input-lg` and `.input-sm`.
Create larger or smaller form controls that match button sizes.

```html
<div class="form-group">
  <select class="form-control input-lg">
    <option>Option 1</option>
    <option>Option 2</option>
  </select>
</div>

<div class="form-group">
  <select class="form-control">
    <option>Option 1</option>
    <option>Option 2</option>
  </select>
</div>

<div class="form-group">
  <select class="form-control input-sm">
    <option>Option 1</option>
    <option>Option 2</option>
  </select>
</div>
```

## Text Areas

Text areas are used for larger amounts of input.

```html
<form class="styleguide-form" role="form">
  <div class="form-group">
    <label for="exampleTextAreaId">Description</label>
    <textarea class="form-control" id="exampleTextAreaId" rows="3"></textarea>
  </div>
</form>
```

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

## Validations

To show validation errors on a field, add `.has-error` to the field's form group.
This class can be used for all types of inputs.

Error messages should use the classes `.help-block.has-error`.

```html
<form class="styleguide-form" role="form">
  <div class="form-group has-error">
    <label class="control-label" for="inputError">
      Input with error
    </label>
    <input id="inputError" class="form-control" type="text">
    <span class="help-block">
      Error help text
    </span>
  </div>
</form>

<form class="styleguide-form" role="form">
  <div class="form-group has-error">
    <div class="checkbox">
      <label class="control-label">
        <input type="checkbox" value="">
        Checkbox which needs to be checked
      </label>
      <span class="help-block">
        Error help text
      </span>
    </div>
  </div>
</form>
```

## Disabled Controls

Controls will occasionally need to be disabled.
You can do that by adding the `disabled` attribute.
Inputs, selects, checkboxes, fieldsets, buttons, and other form controls can all be disabled.

```html
<input class="form-control" type="text" placeholder="Disabled input here" disabled>

<div class="form-group">
  <select class="form-control" disabled>
    <option>Option 1</option>
    <option>Option 2</option>
  </select>
  <div class="icon">
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path d="M24,5,12,17l2.83,2.83L24,10.66l9.17,9.17L36,17Z"></path><path d="M33.17,28.17,24,37.34l-9.17-9.17L12,31,24,43,36,31Z"></path></svg>
  </div>
</div>

<label>
  <input type="checkbox" disabled>
  I'm disabled!
</label>
```

## Static Controls

When you need to place plain text next to a form label within a form,
use the `.form-control-static` class on a `<p>`.

Here's an example in a horizontal form:

```html
<form class="styleguide-form" role="form">
  <div class="row form-group">
    <label class="col-md-4 control-label">Email</label>
    <div class="col-sm-10">
      <p class="form-control-static">email@example.com</p>
    </div>
  </div>
  <div class="row form-group">
    <label class="col-md-4 control-label" for="inputPassword">Password</label>
    <div class="col-sm-10">
      <input class="form-control" id="inputPassword" placeholder="Password" type="password">
    </div>
  </div>
</form>
```

Here's an example in a vertical form:

```html
<form class="styleguide-form" role="form">
  <div class="form-group">
    <label class="control-label">Email</label>
    <p class="form-control-static">someguy@test.com</p>
  </div>
  <div class="form-group">
    <label class="control-label" for="name">Name</label>
    <input class="form-control" id="name" placeholder="name">
  </div>
</form>
```

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

### Toggle Switches

A toggle switch is a horizontally styled checkbox that represents true with blue and false with gray.
Toggle size can be specified via class: large, medium, or small

```html
<div class="grid">
  <div class="col col-top form-group">
    <label>Large</label>
    <input type="checkbox" class="toggle-switch" id="toggle-large" value="on" />
    <label for="toggle-large" class="large"></label>
  </div>
  <div class="col col-top form-group">
    <label>Medium</label>
    <input type="checkbox" class="toggle-switch" id="toggle-medium" value="on" />
    <label for="toggle-medium" class="medium"></label>
  </div>
  <div class="col col-top form-group">
    <label>Small</label>
    <input type="checkbox" class="toggle-switch" id="toggle-small" value="on" />
    <label for="toggle-small" class="small"></label>
  </div>
</div>
```

### Props

Property | Required | Type                              | Default  | Description
---------|----------|-----------------------------------|----------|------------
id       | no       | String                            |          | The id of the element
onChange | no       | Function                          |          | Callback that gets fired when toggle occurs
size     | no       | oneOf('small', 'medium', 'large') | 'medium' | Size variations
