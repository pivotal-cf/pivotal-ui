# Forms

## Installation & Usage

#### React
`npm install pui-react-forms --save`

#### CSS Only
`npm install pui-css-forms --save`

## Description

Individual form controls automatically receive some global styling.
All textual `<input>`, `<textarea>`, and `<select>` elements with
`.form-control` are set to `width: 100`%; by default. And `.form-group` will have a bottom margin of $base-unit.

Wrap labels and controls in `form-group` for optimum spacing.

## Examples

```html
::title=Basic Forms
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

```html
::title=Inline Forms
::description=Add `.form-inline` to your `.form-group` for left-aligned and inline-block controls.
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

### Inputs & Labels

```html
::title=Label top-aligned
::description=An input with the label top aligned (this is the default layout).
<form class="styleguide-form" role="form">
  <div class="form-group">
    <label for="exampleInputEmail7">Email address</label>
    <input aria-required="true" class="form-control" id="exampleInputEmail7" placeholder="Enter email" required="required" type="email">
  </div>
</form>
```

```html
::title=Label left-aligned
::description=An input with the label left aligned
<form class="styleguide-form grid grid-nogutter" role="form">
  <div class="form-group col">
    <label for="exampleInputEmail3">Email address</label>
  </div>
  <div class="form-group col col-grow-2">
    <input aria-required="true" class="form-control" id="exampleInputEmail3" placeholder="Enter email" required="required" type="email">
  </div>
</form>
```

```html
::title=Label top-aligned
::description=An input with the label right aligned (N.B., control-label class provides the right alignment):
<form class="styleguide-form grid grid-nogutter" role="form">
  <div class="form-group col txt-r">
    <label for="exampleInputEmail4">Email address</label>
  </div>
  <div class="form-group col col-grow-2">
    <input aria-required="true" class="form-control" id="exampleInputEmail4" placeholder="Enter email" required="required" type="email">
  </div>
</form>
```

### HTML5 Controls

Examples of standard form controls supported in an example form layout.

```html
::title=Inputs
::description=Most common form control, text-based input fields. Includes support for all HTML5 types: `text`, `password`, `datetime`, `datetime-local`, `date`, `month`, `time`, `week`, `number`, `email`, `url`, `search`, `tel`, and `color`. **Inputs will only be fully styled if their type is properly declared.**
<form class="styleguide-form" role="form">
  <label for="html5TextInput">Text Input</label>
  <input class="form-control" id="html5TextInput" placeholder="Text input" type="text">
</form>
```

```html
::title=Password field
<form class="styleguide-form" role="form">
  <div class="form-group">
    <label for="html5PasswordInput">Password Input</label>
    <input class="form-control" id="html5PasswordInput" placeholder="Password" type="password">
  </div>
</form>
```

```html
::title=Date
<form class="styleguide-form" role="form">
  <div class="form-group">
    <label for="html5DateInput">Date Input</label>
    <input class="form-control" id="html5DateInput" placeholder="Date" type="date">
  </div>
</form>
```

```html
::title=Number
<form class="styleguide-form" role="form">
  <div class="form-group">
    <label for="html5NumberInput">Number Input</label>
    <input class="form-control" id="html5NumberInput" placeholder="Number" type="number">
  </div>
</form>
```

```html
::title=With a min/max and default starting value
<form class="styleguide-form" role="form">
  <div class="form-group">
    <label for="html5MinMaxInput">Min/Max Input</label>
    <input class="form-control" id="html5MinMaxInput" placeholder="Number" type="number" min=0 max=2 value=1>
  </div>
</form>
```

```html
::title=With a different increment value
<form class="styleguide-form" role="form">
  <div class="form-group">
    <label for="html5StepInput">Step Input</label>
    <input class="form-control" id="html5StepInput" placeholder="Number" type="number" step=5>
  </div>
</form>
```

```html
::title=Email
::description=Use this with fields that require email addresses to pop up the correct keyboard on mobile
<form class="styleguide-form" role="form">
  <div class="form-group">
    <label for="html5EmailInput">Email Input</label>
    <input class="form-control" id="html5EmailInput" placeholder="Email" type="email">
  </div>
</form>
```

```html
::title=URL
::description=Use this with fields that require urls to pop up the correct keyboard on mobile
<form class="styleguide-form" role="form">
  <div class="form-group">
    <label for="html5URLInput">URL Input</label>
    <input class="form-control" id="html5URLInput" placeholder="URL" type="url">
  </div>
</form>
```

```html
::title=Telephone
::description=Use this with fields that require telephone numbers to pop up the dialpad on mobile
<form class="styleguide-form" role="form">
  <div class="form-group">
    <label for="html5PhoneInput">Phone Input</label>
    <input class="form-control" id="html5PhoneInput" placeholder="Telephone" type="tel">
  </div>
</form>
```

```html
::title=Read-Only Inputs
::description=Add the `readonly` boolean attribute on an input to prevent user input and style the input as disabled.
<div class="form-group">
 <label for="ReadOnlyInput">ReadOnly</label>
 <input class="form-control" type="text" id="ReadOnlyInput" placeholder="Readonly input here..." readonly>
</div>
```

```html
::title=Selects
::description=Selects are excellent to use because they will automatically behave as expected cross browser on different devices. Prefer them over a custom dropdown whenever possible.
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

```html
::title=Sizing
::description=Set heights using the form control classes `.input-lg` and `.input-sm`. Create larger or smaller form controls that match button sizes.
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

```html
::title=Text Areas
::description=Text areas are used for larger amounts of input.

<form class="styleguide-form" role="form">
  <div class="form-group">
    <label for="exampleTextAreaId">Description</label>
    <textarea class="form-control" id="exampleTextAreaId" rows="3"></textarea>
  </div>
</form>
```

# Checkbox

## Description

Import the subcomponent:

```
import {Checkbox} from 'pui-react-checkbox';
```

## Examples

```jsx
::title=Checkbox with Label
::description=A Checkbox component renders a checkbox with a label. It accepts standard checkbox input properties (such as `placeholder`).
<Checkbox label="Label"/>
```

```jsx
::title=Checkbox with Custom Error Message
::description=A Checkbox component displays a custom `errorMessage` when the `displayError` parameter is truthy.
<Checkbox label="Label!"
          labelClassName="hello"
          displayError={true}
          errorMessage="You must accept the terms and conditions!"
          inputClassName="hey" />
```

## Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
displayError   | no | Boolean | false | Displays the error message when true
errorMessage   | no | Node    |       | Message that gets displayed when displayError is true
inputClassName | no | String  |       | Classname of the inner input element
id             | no | String  |       | The inner label will specify htmlFor=id
label          | no | Node    |       | The content of this label
labelClassName | no | String  |       | Sets the wrapping label classname

# Validations

## Description

To show validation errors on a field, add `.has-error` to the field's form group.
This class can be used for all types of inputs.

## Examples

```html
::title=Basic Example
::description=Error messages should use the classes `.help-block.has-error`.
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

# Disabled Controls

## Description

Controls will occasionally need to be disabled.
You can do that by adding the `disabled` attribute.
Inputs, selects, checkboxes, fieldsets, buttons, and other form controls can all be disabled.

## Examples

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

# Static Controls

## Description

When you need to place plain text next to a form label within a form,
use the `.form-control-static` class on a `<p>`.

## Examples

```html
::title=Static Controls
::description=Here's an example in a horizontal form:
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

# Inputs

`Input` uses the [Iconography](/react_base_iconography.html) component for `search` and `success`.
If you use those props, you will need to add an svg loader:

<code class="pam">
<img src="/styleguide/download.svg" width="16" height="16"/>
npm install babel-loader react-svg-loader --save-dev
</code>

## Description

Import the subcomponent:

```
import {Input} from 'pui-react-inputs';
```

## Examples

```jsx
::title=Input with Label
::description=Input components can be used on their own as inputs. They accept standard text input properties (such as `placeholder`). Inputs will render a label if given `label`. If given `id`, clicking on the label will focus the input.
<Input label="Label" id="theInput" placeholder="Enter text here if you dare"/>
```

```jsx
::title=Input with Custom Error Message
::description=Inputs display a custom `errorMessage` when the `displayError` parameter is truthy.
<Input label="Label!"
       labelClassName="hello"
       displayError={true}
       errorMessage="Try Again, Fool"
       inputClassName="hey"
/>

```

```jsx
::title=Input with Checkmark
::description=Inputs display a checkmark when the `success` prop is true.
<Input success
       label="Great Label for a Great Job!"
       placeholder="YOU ARE SO COOL" />
```

```jsx
::title=Search Input
::description=Inputs have a magnifying glass when the `search` prop is true
<Input search
       label="Search For Answers"
       placeholder="Why does Pivotal UI..." />
```

```jsx
::title=Custom Icon Input
::description=Inputs have a custom svg icon when `leftIcon` is provided. The custom icon will override the `search` prop if both are provided.
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

```jsx
::title=Size Examples
::description=Input has a `size` attribute that takes three options: small, medium (default), and large.
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

```jsx
::title=Filtering Search Example
::description=To demonstrate how to use an Input in a more complex example, let's say we want to filter a list based on the user's input. We can accomplish this by creating a stateful component which is composed of the Input and the list to filter.
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

## Props

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

# Radio

## Description

For the example, you also need to install [Grids](#grid_react) and require `Col` from it.

Import the subcomponents:

```
import {RadioGroup, Radio} from 'pui-react-radio';
```

## Examples

```jsx
::title=Basic Example
::description=In this case, the `name` attached to `RadioGroup` will be applied to all of Radio children.
<RadioGroup name="field_name">
  <Radio value="firstValue">You could click this radio button</Radio>
  <Radio value="SecondValue" defaultChecked>This is also a radio button</Radio>
  <Radio value="ThirdValue" disabled>This is a disabled radio button</Radio>
</RadioGroup>
```

```jsx
::title=onChange
::description=Additionally, special behaviors can be added to the `onChange` event handler exposed by radio groups. In this example, additional form controls are displayed when the user selects the third radio button. Similar to the `name` property, the `onChange` handlers is passed down to all child components.
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
## Props

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

# Toggle

## Description

Import the subcomponent:

```
import {Toggle} from 'pui-react-toggle';
```

## Examples

```jsx
::title=Basic Example
::description=The Toggle component takes an `onChange` callback.
<Toggle onChange={() => console.log('I have been toggled!')}/>
```

```jsx
::title=Toggle Checked
::description=Toggles accept a `checked` prop that turns on the switch. Note that you must handle the addition and removal of the `checked` property yourself.
<Toggle checked onChange={() => console.log('I should handle check changes!')}/>
```

```jsx
::title=Toggle Size
::description=Toggle has a `size` attribute that takes three options: small, medium (default), and large.
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

```html
::title=Toggle Switches
::description=A toggle switch is a horizontally styled checkbox that represents true with blue and false with gray. Toggle size can be specified via class: large, medium, or small
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

## Props

Property | Required | Type                              | Default  | Description
---------|----------|-----------------------------------|----------|------------
id       | no       | String                            |          | The id of the element
onChange | no       | Function                          |          | Callback that gets fired when toggle occurs
size     | no       | oneOf('small', 'medium', 'large') | 'medium' | Size variations
