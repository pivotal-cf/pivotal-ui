---
title: Forms
menu: components
cssPath: pivotal-ui/css/forms
reactPath: pivotal-ui/react/forms
reactComponents:
  Form:
    onModified: Called on every state change. Called with `true` when current state is different from initial state. `false` when they are the same.
    onSubmit: Called with the state, `{initial, current}`. If this function is async, we will await it.
    onSubmitError: Called with any error that `onSubmit` throws. Should return object mapping from field `name` -> String.
    afterSubmit: Called with `{state, setState, response, reset}`. `response` is the return value of `onSubmit`.
    resetOnSubmit: If true, resets the form to its initial state after `onSubmit` succeeds.
    children: Should all be of type `FormRow`. Any children of other types will not be rendered.
  FormRow:
    wrapper: see [Row Wrappers](/forms/overview#row-wrappers)
    children: Should all be of type `FormCol`. Any children of other types will not be rendered.
    state: (undocumented)
    setState: (undocumented)
    canSubmit: (undocumented)
    onSubmit: (undocumented)
    canReset: (undocumented)
    reset: (undocumented)
    onChange: (undocumented)
    onBlur: (undocumented)
    onChangeCheckbox: (undocumented)
  FormCol:
    name: The key of field's value in the `Form`'s state.
    hidden: Whether or not the field is hidden
    fieldRowClassName: Passed directly to the inner `FormUnit`
    fixed: If true, attaches the `col-fixed` class to this [Flex Grid](/grids#flex-grids) column.
    inline: If `true` positions the label on the same line as the field.
    label: Text to use for field label
    labelFor: Value of the label's `for` attribute. If not provided, defaults to the field's `id`.
    labelPosition: If `after` and `inline=true` positions the label after the field.
    labelRowClassName: Passed directly to the inner `FormUnit`
    retainLabelHeight: For fields without a label, add an empty space above the field to preserve the space where the label would be.
    optional: If `true`, marks a field as optional and adds `optionalText` to label
    optionalText: Text to add to label when field is optional
    tooltip: Content to place on the tooltip
    tooltipSize: Size of tooltip
    tooltipPlacement: Placement of tooltip in relation to icon
    postLabel: Content to place in the top right of a non-inline `FormCol`, or a callback returning that content
    help: Help block shown underneath the field
    hideHelpRow: Hides the help/error block underneath the field, so it does not take up any space
    validator: If given, called with the current value of this field. Return truthy if the value is valid, or falsy otherwise.
    children: Field to wrap with label, or function that evaluates to a field. See [Dynamic FormCol Generation](#dynamic-formcol-generation)
    state: (undocumented)
    setState: (undocumented)
    canSubmit: (undocumented)
    onSubmit: (undocumented)
    canReset: (undocumented)
    reset: (undocumented)
    onChange: (undocumented)
    onBlur: (undocumented)
    onChangeCheckbox: (undocumented)
  FormUnit:
    field: Input field to decorate with label
    fieldRowClassName: Class name to attach to the inner `div` surrounding the field
    hasError: If `true`, renders input field borders and help text as red
    className: Class name to attach to top-level `div`
    inline: If `true` positions the label on the same line as the field.
    label: Text to use for field label
    labelClassName: Class name to attach to the inner `label` element
    labelFor: Value of the label's `for` attribute. If not provided, defaults to the field's `id`.
    labelPosition: If `after` and `inline=true` positions the label after the field.
    labelRowClassName: Class name to attach to the inner `div` surrounding the label
    retainLabelHeight: For fields without a label, add an empty space above the field to preserve the space where the label would be.
    optional: If `true`, marks a field as optional and adds `optionalText` to label
    optionalText: Text to add to label when field is optional
    tooltip: Content to place on the tooltip
    tooltipSize: Size of tooltip
    tooltipPlacement: Placement of tooltip in relation to icon
    postLabel: Content to place in the top right of a non-inline `FormUnit`, or a callback returning that content
    help: Help block shown underneath the field
    hideHelpRow: Hides the help/error block underneath the field, so it does not take up any space
    state: (undocumented)
    setState: (undocumented)
---

# Overview

A declarative abstraction that handles layout, state, validation and error handling.

Layout is based on the [Flex Grid](/grids) system.

```jsx
::title=Inline Form
<Toggle />
```

```jsx
::title=Inline Form
```