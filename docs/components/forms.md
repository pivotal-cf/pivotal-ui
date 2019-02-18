---
title: Forms
reactPath: pivotal-ui/react/forms
cssPath: pivotal-ui/css/forms
reactComponents:
- Form
- FormUnit
---

Forms handle state, validation, and error handling so that the internal components don't have to worry about them.

The `Form` component works by building up its `fields`, where the field name, initial value, label, and rendered children
are defined. These `fields` can then be used within the `Form`

A `Form` will generally look like this:

```jsx
<Form {...{
  fields: {
    fieldName: {/*...*/}
  }
}}>
{({fields}) => {
  return (
    <div>
      {fields.fieldName}
    </div>
  );
}}
</Form>
```

### Basic Forms

We can set an `initialValue` to pre-fill each field. When the form is reset before submitting,
all fields will revert to their `initialValue`, if provided. In the Email Form below, the email field has been pre-filled to `my@me.com`.

```jsx
//title=Email Form
//description=We use the `Form`'s `canSubmit` function to control whether or not the "Subscribe" button is disabled. We attach the `Form`'s `reset` function to the "Reset" button to allow it to reset the form's state.
<Form {...{
  fields: {
    email: {
      label: 'Email',
      initialValue: 'my@me.com'
    }
  }
}}>
{({fields, canSubmit, reset}) => {
  return (
    <div>
      {fields.email}
      <Grid>
        <FlexCol/>
        <FlexCol fixed>
          <div>
            <PrimaryButton alt onClick={reset}>Reset</PrimaryButton>
            <PrimaryButton disabled={!canSubmit()} type="submit">Subscribe</PrimaryButton>
          </div>
        </FlexCol>
      </Grid>
    </div>
  );
}}
</Form>
```
#### Optional Fields

When you set `optional: true` on a field, it can affect both the appearance of the field and the behavior
of the form. The text "(Optional)" is added to the field label, and the field is no longer considered required.

To change the text that is added to the label, set the `optionalText` property within the field object. In the example below,
we have set `optional: true` and `optionalText: '(Opt)'` for the `Last Name` field.

### Inline Forms & Label Position

When you set the `inline` property to `true`, the label gets positioned next to the field instead
of above it. By default, the label will appear to the left of the field, but you can set `labelPosition: 'after'`
to place the label on the right.

```jsx
//title=Inline Form
<Form {...{
  fields: {
    firstName: {
      inline: true,
      label: 'First Name'
    },
    lastName: {
      inline: true,
      label: 'Last Name',
      optional: true,
      optionalText: '(Opt)'
    },
    accept: {
      inline: true,
      labelPosition: 'after',
      label: 'I accept the terms and conditions',
      children: <Checkbox/>
    },
    toggle: {
      inline: true,
      label: 'Actually read the terms',
      children: <Toggle/>
    }
  }
}}>
{({fields, canReset, reset}) => {
  return (
    <div>
      <Grid>
        <FlexCol>{fields.firstName}</FlexCol>
        <FlexCol>{fields.lastName}</FlexCol>
      </Grid>
      <Grid>
        <FlexCol>{fields.accept}</FlexCol>
        <FlexCol>{fields.toggle}</FlexCol>
        <FlexCol fixed><PrimaryButton alt disabled={!canReset()} onClick={reset}>Reset</PrimaryButton></FlexCol>
      </Grid>
    </div>
  );
}}
</Form>
```

### Tooltips

The `tooltip` prop makes an icon with a tooltip appear next to the label.
`tooltipSize` can be set to: `sm`, `md` or `lg` in order to control it's size. And it's placement can be controlled
via the `tooltipPlacement` prop with the following options: `left`, `right`, `bottom`, `top`.

```jsx
//title=Tooltips
<Form {...{
  fields: {
    accept1: {
      inline: true,
      label: ' This has a tooltip on the top',
      labelPosition: 'after',
      tooltip: 'This is a tooltip',
      tooltipSize: 'sm',
      children: <Checkbox/>
    },
    accept2: {
      inline: true,
      label: ' This has a large tooltip on the left',
      labelPosition: 'after',
      tooltip: 'This is a tooltip with lots of text. This is a tooltip with lots of text. This is a tooltip with lots of text.',
      tooltipSize: 'lg',
      tooltipPlacement: 'left',
      children: <Checkbox/>
    }
  }
}}>
{({fields}) => {
  return (
    <div>
      <Grid>
        <FlexCol>{fields.accept1}</FlexCol>
        <FlexCol>{fields.accept2}</FlexCol>
      </Grid>
    </div>
  );
}}
</Form>
```

### Accessing the Form state

The `Form`'s childen has access to its state to determine how it wants to render.

For example, one field can determine whether to hide or show another field.
```jsx
//title=Hiding or showing another field
<Form {...{
  fields: {
    show: {
      label: 'Toggle to hide/show',
      inline: true,
      labelPosition: 'after',
      initialValue: false,
      children: <Toggle/>
    },
    employeeName: {
      label: 'Employee Name'
    }
  }
}}>
{({fields, state}) => {
  return (
    <div>
      {fields.show}
      <ExpanderContent {...{expanded: state.current.show, delay: 200}}>
        {fields.employeeName}
      </ExpanderContent>
    </div>
  );
}}
</Form>
```

Or use one field to determine the contents of another field.

```jsx
//title=Dynamic Field Generation
<Form {...{
  className: 'mbn',
  fields: {
    color: {
      label: 'Choose a color',
      initialValue: 'rgba(0,255,0,0.5)',
      children: (
        <select>`
          <option value="rgba(0,255,0,0.5)">green</option>
          <option value="rgba(255,0,0,0.5)">red</option>
        </select>
    )}
  }
}}>
  {({fields: {color}, state: {current}}) => (
    <div>
      <div>{color}</div>
      <div {...{style: {backgroundColor: current.color, textAlign: 'center'}}}>
        Styled dynamically from first field
      </div>
    </div>
  )}
</Form>
```

### Client-side Validation

In this next example, we do two kinds of client-side validation.

First, we define a `validator` prop on the first field to make sure that the password's length is 8 or
more characters. `validator` functions take in the current value of the field that they are validating and
return either an error message (if there is a validation error) or a falsy value (if there is no error).

Next, to construct the "Save Password" button, we look at the current form state and render the button as
disabled when `state.current.password1` and `state.current.password2` do not match.

The field is validated as the user enters a value. When the value is invalid, the `canSubmit` function will return `false`. The value will only be shown to be invalid after that field loses focus. As soon as the the value becomes valid again, `canSubmit` will return `true`, and the value will be shown to be valid again.

Due to the above behavior, we recommend against using a validator on the final field of a `Form`. The experience can be jarring when a user wants to click the Submit button, but is unable due to a validation error that will only be shown after the field loses focus.

```jsx
//title=Validated Fields Form
<Form {...{
  fields: {
    password1: {
      label: 'Enter your password',
      validator: currentValue => currentValue.length < 8 ? 'Password must be 8+ characters' : null,
      children: <Input type="password" placeholder="Password"/>
    },
    password2: {
      help: 'Enter a matching password (button will remain disabled unless they match)',
      retainLabelHeight: true,
      children: <Input type="password" placeholder="Re-enter password"/>
    }
  }
}}>
{({fields, state, canSubmit}) => {
  const passwIsValid = state.current.password1 !== '' && state.current.password1 === state.current.password2;
  return (
    <div>
      <Grid>
        <FlexCol>{fields.password1}</FlexCol>
        <FlexCol>{fields.password2}</FlexCol>
      </Grid>
      <Grid>
      <FlexCol/>
      <FlexCol fixed><PrimaryButton {...{
        disabled: !passwIsValid || !canSubmit(),
        type: 'submit'
      }}>Save Password</PrimaryButton></FlexCol>
      </Grid>
    </div>
  );
}}
</Form>
```

### Field `id`s & label `for`s

All fields require an `id`. If you do not provide one, a unique `id` will be generated for you. It is used to
set the `for` attribute on the corresponding `<label>` tag, so that the label is semantically connected to a specific
input.

```jsx
//description=The id of the Host field is automatically generated by the `Form` component. A custom id is provided for the Path field. In both cases, when clicking the label, the associated input field is selected.
<Form {...{
  fields: {
    host: {label: 'Host'},
    path: {label: 'Path', children: <Input id="the-path"/>}
  }
}}>
{({fields}) => (
  <div>
    {fields.host}
    {fields.path}
  </div>
)}
</Form>
```

### Composite fields

When the state of a field is best represented by a collection (e.g. an array or an object), use a composite field.

An initial value must be provided in order for the `Reset` button to work properly.

#### onChange
An `onChange` callback needs to be provided for each input element. This callback should use the `Form`'s `onChange` function to update its value. In the example below, both inputs have their own `onChange` callback.

Use `stopPropagation` within `onChange` to stop the `Form` from overriding its composite value.

```jsx
<Form {...{
  id: 'composite-fields-example',
  fields: {
    url: {
      label: 'URL',
      labelFor: 'host-input',
      initialValue: {host: '', path: ''},
      children: ({state: {current: {url: {host, path}}}, onChange}) => (
        <Grid>
          <FlexCol fixed>https://</FlexCol>
          <FlexCol>
            <Input id="host-input" value={host} onChange={e => {
              e.stopPropagation();
              onChange({host: e.target.value, path});
            }}/>
          </FlexCol>
          <FlexCol fixed>/</FlexCol>
          <FlexCol>
            <Input value={path} onChange={e => {
              e.stopPropagation();
              onChange({host, path: e.target.value});
            }}/>
          </FlexCol>
        </Grid>
      )
    }
  }
}}>
{({fields, state: {current}, reset}) => (
  <div>
    {fields.url}
    State:
    <pre>{JSON.stringify(current.url, null, 2)}</pre>
    <Grid>
    <FlexCol/>
    <FlexCol fixed><PrimaryButton onClick={reset}>Reset</PrimaryButton></FlexCol>
    </Grid>
  </div>
)}
</Form>
```

### Form submission
Define an `onSubmit` prop on a `Form` to do something with the state values on submission.
The `onSubmit` method is passed `{state: {initial, current}}`.

The `canSubmit` function is available to help determine whether a form is ready for submission.
It returns `true` if all required fields are filled and if all fields are different from their initial value.

By default, a button within the `Form` that has `type="submit"` will trigger submission. This behavior can also be attached to another field that takes in the `onSubmit`, as shown below.

```jsx
//title=Form submission
<Form {...{
  onSubmit: ({initial, current}) => alert(`You changed your name from ${initial.firstName} ${initial.lastName} to ${current.firstName} ${current.lastName}`),
  fields: {
    firstName: {
      initialValue: 'John',
      label: 'First Name'
    },
    lastName: {
      initialValue: 'Doe',
      label: 'Last Name'
    }
  }
}}>
{({fields, canSubmit, onSubmit}) => {
  return (
    <div>
      <Grid>
        <FlexCol>{fields.firstName}</FlexCol>
        <FlexCol>{fields.lastName}</FlexCol>
      </Grid>
      <Grid>
        <FlexCol/>
        <FlexCol className="mtxxxl" fixed><a onClick={() => canSubmit() && onSubmit()} href={'#form-submission'}>This can also submit</a></FlexCol>
        <FlexCol className="mtxxxl" fixed><PrimaryButton type="submit" disabled={!canSubmit()}>Submit</PrimaryButton></FlexCol>
      </Grid>
    </div>
  );
}}
</Form>
```

### Form error handling

Define a `onSubmitError` handler to map error messages to a specific field. Return an object keyed by the field's `name` to determine where the error is shown.

```jsx
//title=Form submission
//description=The error is attached to the first name field.
<Form {...{
  onSubmit: ({current}) => {
      if (current.firstName.startsWith('F')) throw new Error(`First name ${current.firstName} begins with 'F'`);
  },
  onSubmitError: error => error.message.indexOf('First name') > -1 ? {firstName: error.message} : null,
  fields: {
      firstName: {
        initialValue: 'John',
        label: 'First Name',
        help: 'First names beginning with "F" will have errors shown here'
      },
      lastName: {
        initialValue: 'Doe',
        label: 'Last Name'
      }
    }
}}>
{({fields, canSubmit}) => {
  return (
    <Grid>
      <FlexCol>{fields.firstName}</FlexCol>
      <FlexCol>{fields.lastName}</FlexCol>
      <FlexCol className="mtxxxl" fixed><PrimaryButton type="submit" disabled={!canSubmit()}>Submit</PrimaryButton></FlexCol>
    </Grid>
  );
}}
</Form>
```

## Using the FormUnit

To lay out a single form field without using a whole `Form` component, you can use the `FormUnit`
component. The `FormUnit` component can decorate a field with a label, a tooltip, an "optional" indicator, and help text.

Note that state management and other `Form` features are not handled by the `FormUnit`.

### Examples

```jsx
//title=Basic form unit
<FormUnit {...{
    label: 'Optional field',
    labelFor: 'basic-input',
    optional: true,
    tooltip: 'This is a basic form unit example',
    tooltipSize: 'sm',
    tooltipPlacement: 'right',
    help: <span>Enter a value in the field above</span>
}}>
  <Input id="basic-input" type="text"/>
</FormUnit>
```

```jsx
//title=Inline form unit
//description=When `inline` is `true`, the label will be placed on the same line as the field.
<div>
    <FormUnit {...{
        inline: true,
        label: 'Inline field',
        labelFor: 'select-input',
        tooltip: 'This is an inline form unit example',
        tooltipSize: 'sm',
        tooltipPlacement: 'top'
    }}>
      <select id="select-input">
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
      </select>
    </FormUnit>
    <FormUnit {...{
        inline: true,
        label: 'An inline checkbox with labelPosition="after"',
        labelPosition: 'after',
        labelFor: 'checkbox-input',
        tooltip: 'This is an inline form unit example',
        tooltipSize: 'sm',
        tooltipPlacement: 'top'
    }}>
      <Checkbox id="checkbox-input"/>
    </FormUnit>
</div>
```

```jsx
//title=Form unit with error
//description=When `hasError` is `true`, the field border and help text become red to indicate an error.
<FormUnit {...{
    label: 'Username',
    labelFor: 'username-input',
    help: 'Username must be more than 8 characters',
    hasError: true
}}>
  <Input id="username-input" type="text"/>
</FormUnit>
```

```jsx
//title=Form unit with postLabel
//description=The `postLabel` can contain any node and will be positioned in the top-right corner of a non-inline form unit.
<FormUnit {...{
    label: 'Username',
    labelFor: 'username-input2',
    postLabel: <a href="#username-input2" onClick={() => alert('Thanks for clicking me!')}>I am a postLabel!</a>,
    help: 'Username must be more than 8 characters'
}}>
  <Input id="username-input2" type="text"/>
</FormUnit>
```

```jsx
//title=Form unit with composite field
<FormUnit {...{
    label: 'Table field'
}}>
  <Table data={[
      {name: 'One', enabled: <Checkbox/>},
      {name: 'Two', enabled: <Checkbox/>},
      {name: 'Three', enabled: <Checkbox/>}
  ]}/>
</FormUnit>
```

## Props

### Form	props

Property        | Required | Type     | Default   | Description
----------------|----------|----------|-----------|------------
`afterSubmit`   | no       | function | () => {}  | Called with `{state, setState, response, reset}`. `response` is the return value of `onSubmit`.
`children`      | no       | node or function   | | Called with `{fields, canSubmit, canReset, reset, onSubmit, setState, state, onChange, onBlur, onChangeCheckbox}`
`fields`        | no       | object   | | A collection of the inputs to track.
`onModified`    | no       | function | () => {}  | Called on every state change. Called with `true` when current state is different from initial state. `false` when they are the same.
`onSubmit`      | no       | function | () => {}  | Called with the state, `{initial, current}`. If this function is async, we will await it.
`onSubmitError` | no       | function | () => {}  | Called with any error that `onSubmit` throws. Should return object mapping from field `name` -> String.
`resetOnSubmit` | no       | bool     |           | If true, resets the form to its initial state after `onSubmit` succeeds.

### FormUnit props

Property            | Required | Type                                    | Default      | Description
--------------------|----------|-----------------------------------------|--------------|------------
`children`          | no       | node                                    |              | Input field to decorate with label
`className`         | no       | string                                  |              | Class name to attach to top-level `div`
`fieldRowClassName` | no       | string                                  |              | Class name to attach to the inner `div` surrounding the field
`hasError`          | no       | boolean                                 |              | If true, applies error CSS. Turns border and help text red.
`help`              | no       | node                                    |              | Help block shown underneath the field
`hideHelpRow`       | no       | boolean                                 | false        | Hides the help/error block underneath the field, so it does not take up any space
`inline`            | no       | boolean                                 | false        | If `true` positions the label on the same line as the field.
`label`             | no       | string                                  |              | Text to use for field label
`labelClassName`    | no       | string                                  |              | Class name to attach to the inner `label` element
`labelFor`          | no       | string                                  |              | Value of the label's `for` attribute. If not provided, defaults to the field's `id`.
`labelPosition`     | no       | oneOf(['after'])                        |              | If `after` and `inline=true` positions the label after the field.
`labelRowClassName` | no       | string                                  |              | Class name to attach to the inner `div` surrounding the label
`optional`          | no       | boolean                                 | false        | If `true`, marks a field as optional and adds `optionalText` to label
`optionalText`      | no       | string                                  | '(Optional)' | Text to add to label when field is optional
`postLabel`         | no       | oneOf(node, function)                   |              | Content to place in the top right of a non-inline `FormUnit`, or a callback, called with `{state, setValues}`, returning that content
`retainLabelHeight` | no       | boolean                                 | false        | For fields without a label, add an empty space above the field to preserve the space where the label would be.
`setValues`         | no       | function                                |              | Function passed to postLabel callback
`state`             | no       | object                                  |              | Object passed to postLabel callback
`tooltip`           | no       | node                                    |              | Content to place on the tooltip
`tooltipPlacement`  | no       | oneOf('top', 'bottom', 'left', 'right') | 'top'        | Placement of tooltip in relation to icon
`tooltipSize`       | no       | oneOf(['sm', 'md', 'lg'])               | 'md'         | Size of tooltip
