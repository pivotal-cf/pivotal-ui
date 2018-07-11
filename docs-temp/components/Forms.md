---
title: Forms
menu: components
cssPath: pivotal-ui/css/forms
reactPath: pivotal-ui/react/forms
reactComponents:
  - Form
  - FormRow
  - FormCol
  - FormUnit
---

# Overview

A declarative abstraction that handles layout, state, validation and error handling.

Layout is based on the [Flex Grid](/grids) system.

# Examples

The `Form` component works by building up a series of `FormRow` components, each containing one or more `FormCol`
components. You can use these to lay out the fields in your form, and to control your form state.

A `Form` will generally look like this:

```jsx harmony
::nonInteractive
<Form>
    <FormRow>
        <FormCol name="username">
            <Input/>
        </FormCol>
        {/*...some more cols...*/}
    </FormRow>
    {/*...some more rows...*/}
</Form>
```

### Basic Forms

Each `FormCol` should be given a unique `name` prop, which will be how its value is stored in the form state.

We can set an `initialValue` on each field. When the form is reset before submitting,
all fields will revert to their `initialValue`, if provided.

```jsx harmony
::title=Address Form
::description=The last `FormRow` contains a `FormCol` that has a children function. We use the `Form`'s `canSubmit` function to control whether or not the "Submit" button is disabled, and we attach the `Form`'s `reset` function to the "Reset" button, to allow it to reset the form's state.
<Form name="example02">
    <FormRow>
        <FormCol label="First Name" name="firstName" initialValue="John">
            <Input type="text" />
        </FormCol>
        <FormCol fixed label="M" optional optionalText="(Opt)" name="middle">
            <Input type="text" />
        </FormCol>
        <FormCol label="Last Name" name="lastName" initialValue="Doe">
            <Input type="text" />
        </FormCol>
    </FormRow>
    <FormRow>
        <FormCol label="Street Address" name="streetAddress">
            <Input type="text" />
        </FormCol>
    </FormRow>
    <FormRow>
        <FormCol label="City" name="city">
            <Input type="text" />
        </FormCol>
        <FormCol fixed label="State" name="state">
            <select>
                <option value="">[choose one]</option>
                <option value="NY">NY</option>
                <option value="CA">CA</option>
            </select>
        </FormCol>
        <FormCol fixed label="Zip Code" name="zip">
            <Input type="text" />
        </FormCol>
    </FormRow>
    <FormRow>
        <FormCol/>
        <FormCol fixed>{({canSubmit, reset}) =>
            <div>
                <PrimaryButton alt onClick={reset}>Reset</PrimaryButton>
                <PrimaryButton disabled={!canSubmit()}>Submit</PrimaryButton>
            </div>
        }</FormCol>
    </FormRow>
</Form>
```
#### Optional Fields

When you set `optional={true}` on a `FormCol`, it can affect both the appearance of the field and the behavior
of the form. The text "(Optional)" is added to the field label, and the field is no longer considered required.

To change the text that is added to the label, set the `optionalText` prop on the `FormCol`. In the example above,
we have set `optional={true}` and `optionalText="(Opt)"` for the `M` field.

#### Field `id`s & label `for`s

All fields require an `id`. If you do not provide one, a unique `id` will be generated for you. It is used to
set the `for` attribute on the corresponding `<label>` tag, so that the label is semantically connected to the
input.

### Inline Forms & Label Position

When you set the `inline` prop on a `FormCol` to `true`, the label gets positioned next to the field instead
of above it. By default, the label will appear to the left of the field, but you can set `labelPosition="after"`
to place the label on the right.

```jsx harmony
::title=Inline Form
<Form name="inline-example">
    <FormRow>
        <FormCol inline label="First Name" name="firstName">
            <Input type="text" />
        </FormCol>
        <FormCol inline={true} label="Last Name" name="lastName" tooltip="This should be a last name" tooltipSize="sm">
            <Input type="text" />
        </FormCol>
    </FormRow>
    <FormRow>
        <FormCol inline labelPosition="after" label="I accept the terms and conditions" name="accept">
            <Checkbox/>
        </FormCol>
        <FormCol inline label="Actually read the terms" name="toggle">
            <Toggle />
        </FormCol>
        <FormCol fixed>
            {({canReset, reset}) => <PrimaryButton alt disabled={!canReset()} onClick={reset}>Reset</PrimaryButton>}
        </FormCol>
    </FormRow>
</Form>
```

### Tooltips

The `tooltip` prop on a `FormCol` makes an icon with a tooltip appear next to the label.
`tooltipSize` can be set to: `sm`, `md` or `lg` in order to control it's size. And it's placement can be controlled
via the `tooltipPlacement` prop with the following options: `left`, `right`, `bottom`, `top`.

```jsx harmony
::title=Tooltips
<Form name="inline-example">
    <FormRow>
        <FormCol inline
                 labelPosition="after"
                 label="This has a tooltip on the top"
                 name="accept1"
                 tooltip="This is a tooltip on a FormCol."
                 tooltipSize="sm">
            <Checkbox/>
        </FormCol>
        <FormCol inline
                 labelPosition="after"
                 label="This has a large tooltip on the right"
                 name="accept2"
                 tooltip="This is a tooltip on a FormCol. This is a tooltip on a FormCol. This is a tooltip on a FormCol. This is a tooltip on a FormCol."
                 tooltipSize="lg"
                 tooltipPlacement="right">
            <Checkbox/>
        </FormCol>
    </FormRow>
    <FormRow>
        <FormCol inline
                 labelPosition="after"
                 label="This has a small tooltip on the bottom"
                 name="accept3"
                 tooltip="This is a tooltip on a FormCol."
                 tooltipSize="sm"
                 tooltipPlacement="bottom">
            <Checkbox/>
        </FormCol>
        <FormCol inline
                 labelPosition="after"
                 label="This has a small tooltip on the left"
                 name="accept4"
                 tooltip="This is a tooltip on a FormCol."
                 tooltipSize="sm"
                 tooltipPlacement="left">
            <Checkbox/>
        </FormCol>
    </FormRow>
</Form>
```

### Row Wrappers

If you define a `wrapper` prop on a `FormRow`, the `FormRow` will be wrapped in whatever JSX node you specify.
You might use this with the `ExpanderContent` component to toggle the hiding and showing of rows.

```jsx harmony
::title=Row Wrapper Example
<Form name="example03">
    <FormRow>
        <FormCol name="field1" label="I am an always visible inline label" inline={true}>
            <input type="text" placeholder="a visible field" />
        </FormCol>
    </FormRow>
    <FormRow wrapper={({showField}) => <ExpanderContent {...{expanded: showField, delay: 200}}/>}>
        <FormCol label="I am sometimes visible" inline={true}>
            <Input type="text" placeholder="Some hidden field" />
        </FormCol>
    </FormRow>
    <FormRow>
        <FormCol fixed>{({setState, state: {showField}}) =>
            <DefaultButton
                onClick={() => setState({showField: !showField})}>
                Hide/Show Field
            </DefaultButton>
        }</FormCol>
    </FormRow>
</Form>
```

### Client-side Validation

In this next example, we do two kinds of client-side validation.

First, we define a `validator` prop on the first `FormCol` to make sure that the password's length is 8 or
more characters. `validator` functions take in the current value of the field that they are validating and
return either an error message (if there is a validation error) or a falsy value (if there is no error).

Next, to construct the "Save Password" button, we look at the current form state and render the button as
disabled when `state.current.password1` and `state.current.password2` do not match.

```jsx harmony
::title=Validated Fields Form
<Form name="example01">
    <FormRow>
        <FormCol {...{
            name: 'password1',
            label: 'Enter your password',
            validator: currentValue => currentValue.length < 8 ? 'Password must be 8+ characters' : null
        }}>
            <Input type="password" placeholder="Password" />
        </FormCol>
        <FormCol retainLabelHeight name="password2" help="Enter a matching password">
            <Input type="password" placeholder="Re-enter password" />
        </FormCol>
    </FormRow>
    <FormRow>
        <FormCol/>
        <FormCol fixed>
            {({canSubmit, state}) => {
                const passwIsValid = state.current.password1 !== "" && state.current.password1 === state.current.password2;
                return <DefaultButton alt disabled={!(canSubmit() && passwIsValid)}>Save Password</DefaultButton>
            }}
        </FormCol>
    </FormRow>
</Form>
```

### Dynamic FormCol Generation

The children of a FormCol can also be a function that takes in an object with the following form properties and methods.
This allows for form generation depending on these properties:

Name         | Type     | Description
-------------|----------|------------
`canSubmit`  | function | Returns true if the all required fields are provided, and if all defined validators are passing.
`canReset`   | function | Returns true if the form's current state is different from the form's initial state
`reset`      | function | Resets the form to its initial state
`onSubmit`   | function | Function that is executed when a button of type `submit` is clicked.
`submitting` | boolean  | True if the form is currently executing the `onSubmit` function
`setState`   | function | Sets the state of the `Form`
`state`      | object   | State of the `Form`. Current state is `state.current`, and initial state is `state.initial`.
`onChange`   | function | Change handler for the given field. Use this to override the default behavior of the `Form`. By default, a `onChange` handler to each field that controls the entry in the `Form` state corresponding to the field's `name`.

```jsx harmony
::title=Dynamic Field Generation
<Form name="example01">
    <FormRow>
        <FormCol {...{
            name: 'color',
            label: 'Choose a color',
            initialValue: 'rgba(0,255,0,0.5)'
        }}>
            <select>
                <option value="rgba(0,255,0,0.5)">green</option>
                <option value="rgba(255,0,0,0.5)">red</option>
            </select>
        </FormCol>
        <FormCol retainLabelHeight>
            {({state: {current: {color}}}) => <div {...{style: {backgroundColor: color, width: "100%", textAlign: "center"}}}>Styled dynamically from first field</div>}
        </FormCol>
    </FormRow>
</Form>
```
### Form submission
Define an `onSubmit` prop on a `Form` to do something with the state values on submission.
The `onSubmit` method is passed `{state: {initial, current}}`.

By default, a button within the `Form` that has `type="submit"` will trigger submission.

```jsx harmony
::title=Form submission
<Form {...{
    onSubmit: ({initial, current}) => alert(`You changed your name from ${initial.firstName} ${initial.lastName} to ${current.firstName} ${current.lastName}`)
}}>
    <FormRow>
        <FormCol label="First Name" name="firstName" initialValue="John">
            <Input type="text" />
        </FormCol>
        <FormCol label="Last Name" name="lastName" initialValue="Doe">
            <Input type="text" />
        </FormCol>
        <FormCol fixed retainLabelHeight>
            {({canSubmit}) => <PrimaryButton type="submit" disabled={!canSubmit()}>Submit</PrimaryButton>}
        </FormCol>
    </FormRow>
</Form>
```

You can also attach this behavior to another field that takes in the `onSubmit`, as shown below.

```jsx harmony
::title=Form submission without a submit button
<Form {...{
    onSubmit: ({initial, current}) => alert(`You changed your name from ${initial.firstName} ${initial.lastName} to ${current.firstName} ${current.lastName}`)
}}>
    <FormRow>
        <FormCol label="First Name" name="firstName" initialValue="John">
            <Input type="text" />
        </FormCol>
        <FormCol label="Last Name" name="lastName" initialValue="Doe">
            <Input type="text" />
        </FormCol>
        <FormCol fixed retainLabelHeight className="col-middle">
            {({onSubmit}) => <a onClick={onSubmit} href="#">Click to submit</a>}
        </FormCol>
    </FormRow>
</Form>
```

### Form error handling

Define a `onSubmitError` handler to map error messages to a specific field. Return an object keyed by the field's `name` to determine where the error is shown.

```jsx harmony
::title=Form submission
::description=The error is attached to the first name field.
<Form {...{
    onSubmit: ({initial, current}) => {
        if (current.firstName.startsWith('F')) throw new Error(`First name ${current.firstName} begins with 'F'`)
    },
    onSubmitError: error => error.message.indexOf('First name') > -1 ? {firstName: error.message} : null
}}>
    <FormRow>
        <FormCol label="First Name" name="firstName" initialValue="John" help="First names beginning with 'F' will have errors shown here">
            <Input type="text" />
        </FormCol>
        <FormCol label="Last Name" name="lastName" initialValue="Doe">
            <Input type="text" />
        </FormCol>
        <FormCol fixed retainLabelHeight>
            {({canSubmit}) => <PrimaryButton type="submit" disabled={!canSubmit()}>Submit</PrimaryButton>}
        </FormCol>
    </FormRow>
</Form>
```

# Form Unit

## Description

To lay out a single form field without using a whole `Form` component, you can use the `FormUnit`
component. The `FormUnit` component can decorate a field with a label, a tooltip, an "optional" indicator, and help text.

Note that state management and other `Form` features are not handled by the `FormUnit`.

## Examples

```jsx harmony
::title=Basic form unit
<FormUnit {...{
    label: 'Optional field',
    labelFor: 'basic-input',
    optional: true,
    tooltip: 'This is a basic form unit example',
    tooltipSize: 'sm',
    tooltipPlacement: 'right',
    help: <span>Enter a value in the field above</span>,
    field: <Input id="basic-input" type="text"/>
}}/>
```

```jsx harmony
::title=Inline form unit
::description=When `inline` is `true`, the label will be placed on the same line as the field.
<div>
    <FormUnit {...{
        inline: true,
        label: 'Inline field',
        labelFor: 'select-input',
        tooltip: 'This is an inline form unit example',
        tooltipSize: 'sm',
        tooltipPlacement: 'top',
        field: (
            <select id="select-input">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
            </select>
        )
    }}/>
    <FormUnit {...{
        inline: true,
        label: 'An inline checkbox with labelPosition="after"',
        labelPosition: 'after',
        labelFor: 'checkbox-input',
        tooltip: 'This is an inline form unit example',
        tooltipSize: 'sm',
        tooltipPlacement: 'top',
        field: <Checkbox id="checkbox-input"/>
    }}/>
</div>
```

```jsx harmony
::title=Form unit with error
::description=When `hasError` is `true`, the field border and help text become red to indicate an error.
<FormUnit {...{
    label: 'Username',
    labelFor: 'username-input',
    field: <Input id="username-input" type="text"/>,
    help: 'Username must be more than 8 characters',
    hasError: true
}}/>
```

```jsx harmony
::title=Form unit with postLabel
::description=The `postLabel` can contain any node and will be positioned in the top-right corner of a non-inline form unit.
<FormUnit {...{
    label: 'Username',
    labelFor: 'username-input2',
    postLabel: <a href="#username-input2" onClick={() => alert('Thanks for clicking me!')}>I am a postLabel!</a>,
    field: <Input id="username-input2" type="text"/>,
    help: 'Username must be more than 8 characters'
}}/>
```

```jsx harmony
::title=Form unit with composite field
<FormUnit {...{
    label: 'Table field',
    field: <Table data={[
        {name: 'One', enabled: <Checkbox/>},
        {name: 'Two', enabled: <Checkbox/>},
        {name: 'Three', enabled: <Checkbox/>}
    ]}/>
}}/>
```

# Props

## Form	props

Property        | Required | Type     | Default   | Description
----------------|----------|----------|-----------|------------
`onModified`    | no       | function | () => {}  | Called on every state change. Called with `true` when current state is different from initial state. `false` when they are the same.
`onSubmit`      | no       | function | () => {}  | Called with the state, `{initial, current}`. If this function is async, we will await it.
`onSubmitError` | no       | function | () => {}  | Called with any error that `onSubmit` throws. Should return object mapping from field `name` -> String.
`afterSubmit`   | no       | function | () => {}  | Called with `{state, setState, response, reset}`. `response` is the return value of `onSubmit`.
`resetOnSubmit` | no       | bool     |           | If true, resets the form to its initial state after `onSubmit` succeeds.
`children`      | no       | node     |           | Should all be of type `FormRow`. Any children of other types will not be rendered.

## FormRow props

Property   | Required | Type     | Default   | Description
-----------|----------|----------|-----------|------------
`wrapper`  | no       | function | undefined | See [Row Wrappers](#row-wrappers)
`children` | no       | node     | undefined | Should all be of type `FormCol`. Any children of other types will not be rendered.

## FormCol props

Property            | Required | Type                                    | Default      | Description
--------------------|----------|-----------------------------------------|--------------|------------
`name`              | no       | string                                  |              | The key of field's value in the `Form`'s state.
`hidden`            | no       | boolean                                 | false        | Whether or not the field is hidden
`fieldRowClassName` | no       | string                                  |              | Passed directly to the inner `FormUnit`
`fixed`             | no       | boolean                                 | false        | If true, attaches the `col-fixed` class to this [Flex Grid](/grids#flex-grids) column.
`inline`            | no       | boolean                                 | false        | If `true` positions the label on the same line as the field.
`label`             | no       | string                                  |              | Text to use for field label
`labelFor`          | no       | string                                  |              | Value of the label's `for` attribute. If not provided, defaults to the field's `id`.
`labelPosition`     | no       | oneOf(['after'])                        |              | If `after` and `inline=true` positions the label after the field.
`labelRowClassName` | no       | string                                  |              | Passed directly to the inner `FormUnit`
`retainLabelHeight` | no       | boolean                                 | false        | For fields without a label, add an empty space above the field to preserve the space where the label would be.
`optional`          | no       | boolean                                 | false        | If `true`, marks a field as optional and adds `optionalText` to label
`optionalText`      | no       | string                                  | '(Optional)' | Text to add to label when field is optional
`tooltip`           | no       | node                                    |              | Content to place on the tooltip
`tooltipSize`       | no       | oneOf(['sm', 'md', 'lg'])               | 'md'         | Size of tooltip
`tooltipPlacement`  | no       | oneOf('top', 'bottom', 'left', 'right') | 'top'        | Placement of tooltip in relation to icon
`postLabel`         | no       | oneOf(node, function)                   |              | Content to place in the top right of a non-inline `FormCol`, or a callback returning that content
`help`              | no       | node                                    |              | Help block shown underneath the field
`hideHelpRow`       | no       | boolean                                 | false        | Hides the help/error block underneath the field, so it does not take up any space
`validator`         | no       | function                                |              | If given, called with the current value of this field. Return truthy if the value is valid, or falsy otherwise.
`children`          | no       | oneOf(node, function)                   |              | Field to wrap with label, or function that evaluates to a field. See [Dynamic FormCol Generation](#dynamic-formcol-generation)

## FormUnit props

Property            | Required | Type                                    | Default      | Description
--------------------|----------|-----------------------------------------|--------------|------------
`field`             | no       | node                                    |              | Input field to decorate with label
`fieldRowClassName` | no       | string                                  |              | Class name to attach to the inner `div` surrounding the field
`className`         | no       | string                                  |              | Class name to attach to top-level `div`
`inline`            | no       | boolean                                 | false        | If `true` positions the label on the same line as the field.
`label`             | no       | string                                  |              | Text to use for field label
`labelClassName`    | no       | string                                  |              | Class name to attach to the inner `label` element
`labelFor`          | no       | string                                  |              | Value of the label's `for` attribute. If not provided, defaults to the field's `id`.
`labelPosition`     | no       | oneOf(['after'])                        |              | If `after` and `inline=true` positions the label after the field.
`labelRowClassName` | no       | string                                  |              | Class name to attach to the inner `div` surrounding the label
`retainLabelHeight` | no       | boolean                                 | false        | For fields without a label, add an empty space above the field to preserve the space where the label would be.
`optional`          | no       | boolean                                 | false        | If `true`, marks a field as optional and adds `optionalText` to label
`optionalText`      | no       | string                                  | '(Optional)' | Text to add to label when field is optional
`tooltip`           | no       | node                                    |              | Content to place on the tooltip
`tooltipSize`       | no       | oneOf(['sm', 'md', 'lg'])               | 'md'         | Size of tooltip
`tooltipPlacement`  | no       | oneOf('top', 'bottom', 'left', 'right') | 'top'        | Placement of tooltip in relation to icon
`postLabel`         | no       | oneOf(node, function)                   |              | Content to place in the top right of a non-inline `FormUnit`, or a callback returning that content
`help`              | no       | node                                    |              | Help block shown underneath the field
`hideHelpRow`       | no       | boolean                                 | false        | Hides the help/error block underneath the field, so it does not take up any space