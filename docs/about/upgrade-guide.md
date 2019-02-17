---
title: Upgrade guide
---

Pivotal UI follows [semantic versioning](https://semver.org/). Major version bumps (e.g. 10.x.x -> 11.0.0) may contain major new features and breaking changes, which will be documented below. Minor version bumps (e.g. 10.5.x -> 10.6.0) may contain additive, non-breaking new features. Bug fixes will be released in patch versions (e.g. 10.5.1 -> 10.5.2).

Below are the upgrade guides for recent major versions of Pivotal UI. For more details about minor and patch releases, see the [changelog](https://github.com/pivotal-cf/pivotal-ui/blob/master/CHANGELOG.md) on the branch in question (e.g. `v17` for version 17).

## v17

### Goals

The goals of the 17.0 release are:

- Rewrite `Form` component to decouple state management from layout. Now, the placement of fields is completely customizable.
- Improve `RadioGroup` component to take a `value` prop, allowing it to be used more easily within a `Form`.
- Improve accessibility of alert components (`SuccessAlert`, `ErrorAlert`, `InfoAlert`, `WarningAlert`).
- Deprecate the `Select` React component.
- Deprecate the `CellRenderer` `Table` plugin.
- Introduce the [`renderThChildren`](/components/tables/using_plugins) `Table` plugin.

### Big Changes

#### Backgrounds

* We removed the `bg-cloud`, `bg-glow`, and `bg-full-bleed` modifier classes and the background images `aboutus-hero.jpg` and `gray-cloud.png`.

#### Form

##### Fields
* The `Form` component now supports adding and removing fields after the initial render.
* The `Form` now requires a new `fields` object prop. They keys of this object are the unique field names that will be used in the `Form`. The values are mostly what was used to be props on the `FormCol`. See the Migration Guide below for examples.
* When an individual `field` has no `children` specified, it will default to a text [`Input`](/components/inputs/usage).

##### onChange
* When composite `Form` fields call `onChange`, the first argument should now be either the new value or the associated event (previously this had to be the second argument).
* When specifying a custom `onChange` on a `Form` field, the controlled value will always be updated by the `Form`, it is no longer required for the custom `onChange` to carry out this behavior.

##### optional
* `Form` fields can now become optional after the initial render.
* Whether a field is optional can be determined via callback at render time.

##### Custom layout
* The `children` of the `Form` must be a function that will receive the form fields, state, and various form helper methods. Use this to layout the fields however desired. See the Migration Guide below for examples.
* `FormRow` and `FormCol` have been removed, because layout is now achieved with the `children` function.

##### Setting state
* The `Form` no longer provides direct access to its `setState` method. If the `Form` internal state was being used to hold custom state, this should now be held in state outside of the `Form`.
* To update the current `Form` field values from within the `Form`, use the new `setValues` method that is passed to the `children` of the `Form`, and to the `children` of a `Form` field (if the field's `children` is a function).

##### FormUnit
* The `FormUnit` prop `field` has been renamed to `children`.

### Migration Guide

#### Maintain old Form Layout

In order to use the old `Form`, add these files to your project:

* [GridForm](https://gist.github.com/apps-manager/2036514f03cdfe4da3bcdbd06ac78353)
* [FormRow](https://gist.github.com/apps-manager/5858b5783a72384b9ea00c6996117c2e)
* [FormCol](https://gist.github.com/apps-manager/6c1a24d65ad06c7b651a7a44fc478d11)

Then replace all usages of `Form` with `GridForm`. These files are not maintained and there is no guarantee on feature parity. We recommend using the new `Form` layout.

#### Using new Form Layout

1. Here is the old Form:
  ```jsx
  //nonInteractive
  <Form>
    <FormRow wrapper={() => <Collapsible {...{expanded: this.state.expanded}}/>}>
      <FormCol name="firstName" initialValue="John" label="First Name">
        <Input type="text"/>
      </FormCol>
    </FormRow>
    <FormRow>
      <FormCol name="lastName" initialValue="Doe" label="Last Name">
        <Input type="text"/>
      </FormCol>
    </FormRow>
    <FormRow>
      <FormCol/>
      <FormCol fixed>
        {({canSubmit}) => (
          <PrimaryButton type="submit" disabled={!canSubmit()}>Submit</PrimaryButton>
        )}
      </FormCol>
    </FormRow>
  </Form>;
  ```

1. Create a new `fields` prop:
  ```jsx
  //nonInteractive
  <Form {...{
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
    {/* ... */}
  </Form>;
  ```
1. Create a callback for the `Form` child:
  ```jsx
  //nonInteractive
  <Form>
    {() => ( // new callback
      <Fragment>
        <FormRow wrapper={() => <Collapsible {...{expanded: this.state.expanded}}/>}>
          <FormCol name="firstName" initialValue="John" label="First Name">
            <Input type="text"/>
          </FormCol>
        </FormRow>
        <FormRow>
          <FormCol name="lastName" initialValue="Doe" label="Last Name">
            <Input type="text"/>
          </FormCol>
        </FormRow>
        <FormRow>
          <FormCol/>
          <FormCol fixed>
            {({canSubmit}) => (
              <PrimaryButton type="submit" disabled={!canSubmit()}>Submit</PrimaryButton>
            )}
          </FormCol>
        </FormRow>
      </Fragment>
    )}
  </Form>;
  ```

1. Extract `FormRow` wrappers into the layout:
  ```jsx
  //nonInteractive
  <Form>
    {() => ( // new callback
      <Fragment>
        <Collapsible {...{expanded: this.state.expanded}}> // previously a prop to the FormRow
          <FormRow>
            <FormCol name="firstName" initialValue="John" label="First Name">
              <Input type="text"/>
            </FormCol>
          </FormRow>
        </Collapsible>
        <FormRow>
          <FormCol name="lastName" initialValue="Doe" label="Last Name">
            <Input type="text"/>
          </FormCol>
        </FormRow>
        <FormRow>
          <FormCol/>
          <FormCol fixed>
            {({canSubmit}) => (
              <PrimaryButton type="submit" disabled={!canSubmit()}>Submit</PrimaryButton>
            )}
          </FormCol>
        </FormRow>
      </Fragment>
    )}
  </Form>;
  ```

1. Replace `FormRow` with `Grid` and `FormCol` with `FlexCol`, and remove unnecessary props from the FlexCols:
  ```jsx
  //nonInteractive
  <Form>
    {() => (
      <Fragment>
        <Collapsible {...{expanded: this.state.expanded}}>
          <Grid>
            <FlexCol>
              <Input type="text"/> // remove "name", "initialValue", "label", etc.
            </FlexCol>
          </Grid>
        </Collapsible>
        <Grid>
          <FlexCol>
            <Input type="text"/>
          </FlexCol>
        </Grid>
        <Grid>
          <FlexCol/>
          <FlexCol fixed> // keep the "fixed" prop
            {({canSubmit}) => (
              <PrimaryButton type="submit" disabled={!canSubmit()}>Submit</PrimaryButton>
            )}
          </FlexCol>
        </Grid>
      </Fragment>
    )}
  </Form>;
  ```

1. Remove all that `FormCol` child callbacks, and use the `Form` methods provided by the `Form` child callback instead:
  ```jsx
  //nonInteractive
  <Form>
    {({canSubmit}) => ( // get "canSubmit" from the Form child callback
      <Fragment>
        {/* ... */}
        <Grid>
          <FlexCol/>
          <FlexCol fixed> // removed the FlexCol callback
            <PrimaryButton type="submit" disabled={!canSubmit()}>Submit</PrimaryButton>
          </FlexCol>
        </Grid>
      </Fragment>
    )}
  </Form>;
  ```

1. Place the fields in the layout:
  ```jsx
  //nonInteractive
  <Form>
    {({canSubmit, fields}) => ( // obtain the fields from the Form child callback
      <Fragment>
        <Collapsible {...{expanded: this.state.expanded}}>
          <Grid>
            <FlexCol>
              {fields.firstName} // use the firstName field
            </FlexCol>
          </Grid>
        </Collapsible>
        <Grid>
          <FlexCol>
            {fields.lastName} // use the lastName field
          </FlexCol>
        </Grid>
        <Grid>
          <FlexCol/>
          <FlexCol fixed>
            <PrimaryButton type="submit" disabled={!canSubmit()}>Submit</PrimaryButton>
          </FlexCol>
        </Grid>
      </Fragment>
    )}
  </Form>;
  ```

1. Consider removing Grids and FlexCols for fields that are alone on a row:
  ```jsx
  //nonInteractive
  <Form>
    {({canSubmit, fields}) => ( // obtain the fields from the Form child callback
      <Fragment>
        <Collapsible {...{expanded: this.state.expanded}}>
          {fields.firstName} // Grid is not necessary here
        </Collapsible>
        {fields.lastName} // Grid is also not necessary here
        <Grid>
          <FlexCol/>
          <FlexCol fixed>
            <PrimaryButton type="submit" disabled={!canSubmit()}>Submit</PrimaryButton>
          </FlexCol>
        </Grid>
      </Fragment>
    )}
  </Form>;
  ```

## v16

### Goals

The goals of the 16.0 release are:

- Introduce new `ProgressBar` component

- Rewrite `Modal` and `Flyout` components to be more accessible and configurable

- `Checkbox` now has an indeterminate state

### Big Changes

#### ProgressBar

Previously progress bars was solely a CSS implementation. See the [ProgressBars](/progress-bars) page for details on new React component.

* ProgressBar CSS moved from `pivotal-ui/css/progress-bars` to `pivotal-ui/css/progress-bar`

#### Modal

We rewrote the `Modal` component (formerly `BaseModal`) from the ground-up to be more usable and accessible.

##### Improvements

* Keyboard navigation is now preserved within the modal when it's open to prevent users from being able to tab onto and interact with background elements while the modal is open.

* Uses efficient CSS transitions instead of JavaScript-based animations to animate the modal opening/closing. This means the animation will be much smoother across all browsers (and especially in IE/Edge).

* Now possible to specify the duration of the open/close animation via the `animationDuration` prop (and still possible to disable animation entirely, if desired, if `animationDuration` is `0`).

* Easier to specify the width of the modal via the improved `size` prop.

* More reliably prevents scrolling of background elements while the modal is open.

##### Breaking Changes

* Modal component moved from `pivotal-ui/react/modals` to `pivotal-ui/react/modal`

* Modal CSS moved from `pivotal-ui/css/modals` to `pivotal-ui/css/modal`

* Renamed `BaseModal` component to `Modal`.

* The `ModalBody` and `ModalFooter` components have been removed. Now, to specify a modal body, just use the `children` prop on
the `Modal`. To specify a modal footer, use the `footer` prop.

* Some minor prop changes:

  - The `size` prop, when given a value of `small`/`sm`, now gives the modal a width of `300px`, as originally intended. This value used to be the same as the default width (`744px`).

  - The old `animation` prop, which allowed disabling animation and which defaulted to `true`, has been removed. Now, use `animationDuration={0}` to disable animation.

  - The old `keyboard` prop, which allowed disabling pressing escape to close the modal, has been removed. Pressing escape now always closes the modal.

  - The old `acquireFocus` prop, which allowed disabling moving focus inside the modal when it opens, has been removed. Focus is now always moved inside the modal when it opens, and cycles between elements of the modal until the modal is closed.

  - The old `onEntered` and `onExited` props, which allowed providing callbacks that are called when the modal starts opening and finishes closing, have been removed.

* New CSS class names for each part of the modal:

  - `pui-modal-dialog-backdrop` is the background element that takes up the full screen when the modal is open

  - `pui-modal-dialog` is the wrapper element for the visible part of the modal (the box that appears in the center of the window)

  - `pui-modal-header` is the element within the dialog that wraps the title

  - `pui-modal-title` is the `h3` tag within the header that contains the title

  - `pui-modal-close-btn` is the close button within the dialog

  - `pui-modal-body` is the class name that wraps the `children` given to the modal

  - `pui-modal-footer` is the class name that wraps the `footer` given to the modal

#### Flyout

We rewrote the `Flyout` component from the ground-up to be more usable and accessible.

##### Improvements

* Keyboard navigation is now preserved within the flyout when it's open to prevent users from being able to tab onto and interact with background elements while the flyout is open.

* Uses efficient CSS transitions instead of JavaScript-based animations to animate the flyout opening/closing. This means the animation will be much smoother across all browsers (and especially in IE/Edge).

* Now possible to specify the duration of the open/close animation via the `animationDuration` prop (and now possible to disable animation entirely with `animationDuration={0}`).

* More reliably prevents scrolling of background elements while the flyout is open.

* Now possible to change the icon in the flyout header via the `iconSrc` prop (which defaults to `"close"`, to render a close button by default).

##### Breaking Changes

* Some minor prop changes:

  - The old `open` prop is now called `show`, to be more consistent with the `Modal`.

  - The old `close` prop is now called `onHide`, to be more consistent with the `Modal`.

* New CSS class names for each part of the modal:

  - `pui-flyout-dialog-backdrop` is the background element that takes up the full container width/height when the flyout is open

  - `pui-flyout-dialog` is the wrapper element for the visible part of the flyout (the box that appears on the right side of the window)

  - `pui-flyout-header` is the element within the dialog that wraps the header and icon button

  - `pui-flyout-icon-btn` is the icon button within the flyout header

  - `pui-flyout-body` is the class name that wraps the `children` given to the flyout

#### Table

* New table plugin: `withRenderTdChildren`. This allows you to more efficiently control the rendering of table cell contents via a `renderTdChildren` prop on table columns. The older `withCellRenderer` plugin is still available, but is no longer recommended when passing an inline function. The documentation has been updated to reflect this change. This plugin is also included by default on `AdvancedTable`.

#### Checkbox

* New `indeterminate` enables putting the `Checkbox` in an indeterminate state (neither checked nor unchecked).

#### Misc

* All animations/transitions in PUI now default to 200ms (0.2s). Previously, most things used 200ms, but some used 150ms or 300ms.

* Removed deprecated and unused `tab-highlight` and `tabs-images` CSS classes.

## v15

### Goals

The goals of the 15.0 release are:

- Rewrite & redesign Pagination component
- Rewrite Dropdown component to be less opinionated on its contents
- Make Autocomplete component easier to use
- Make font rendering crisper

### The Big Changes

#### Pagination
We rewrote the Pagination component from the ground up, but its API has remained, mostly, the same.

Details:
- New design (rewritten CSS)
- Show up to 5 pages, always including the first and last, with ellipses in between if necessary.
- `onSelect` callback gets called with an object containing `newActivePage`,
the page number of the newly selected page (either the number that was clicked, `activePage + 1` if next button was clicked,
or `activePage - 1` if previous button was clicked).
- Removed `large` and `small` props.

#### Dropdown
The changes to the Dropdown make it less opinionated about its children. Previously, it was necessary to have all children
of a Dropdown be DropdownItems, and the Dropdown would handle `onClick`-like events on these items. Now, any child node
can be passed as a child, and if a child needs an `onClick`, it should be set on that child directly.

Details:
- Removed DropdownItem component entirely
- Removed props: `href`, `labelAriaLabel`, `onSelect`, `onSplitClick`, `splitClassName`
- Added prop: `itemClassName` which provides a class to the `li` element that wraps each child of the dropdown

#### Autocomplete
The changes to Autocomplete are meant to make it easier to control when and how the data in the list gets updated
from the outside.

Details:
- Add a new public method `updateList`, which updates the list of search results without showing the list. To see how this
this might be used, see the [Autocomplete](/autocomplete) page.
- Change the callback that is passed in to `onInitializeItems` to return a Promise, so that it can be awaited from
the outside if desired. This means that an outer component can wait for the inner trie data structure to be built
before calling `updateList` to update the list.

#### Font Rendering
We removed CSS in PUI that was disabling subpixel antialising (see [here](http://usabilitypost.com/2011/02/08/please-stop-disabling-subpixel-rendering/) for more information).
The effect of this is that fonts appear crisper, brighter, and more vibrant.

## v14

### Goals

The goals of the 14.0 release are:

- Remove dependency on Bootstrap from all PUI components
- Remove all Bootstrap files from PUI

### The Big Changes

#### Code component

All CSS from Bootstrap that styled `code`, `kbd`, `pre`, and `samp` elements has been moved to `pivotal-ui/css/code`. If these tags are no longer styled as expected, add `import 'pivotal-ui/css/code'` alongside your other CSS.

#### Grids component

This component was based on Bootstrap Grids, and has been removed. Use our Flex Grids component and/or CSS classes instead. Here are some examples of the changes required to migrate from the older, Bootstrap-based component:

##### React

Deprecated Bootstrap-based Grid:

```jsx
//nonInteractive
<Row>
  <Col md={8}>...</Col>
  <Col md={16}>...</Col>
</Row>;
```

FlexGrid:

```jsx
<Grid>
  <FlexCol>...</FlexCol>
  <FlexCol grow={2}>...</FlexCol>
</Grid>;
```

##### CSS-only

Deprecated Bootstrap-based Grid:

```html
//nonInteractive
<div class="row">
  <div class="col-md-8">...</div>
  <div class="col-md-16">...</div>
</div>
```

FlexGrid:

```html
//nonInteractive
<div class="grid">
  <div class="col">...</div>
  <div class="col col-grow-2">...</div>
</div>
```

#### Other Bootstrap CSS/utility classes

Any Bootstrap CSS that was not a part of any PUI component, but which was included by PUI, will no longer work. Install Bootstrap CSS separately if needed.

#### Removed

The following components were deprecated several releases ago, and are no longer documented. They have now been removed:
- Bootstrap Grids component (`pivotal-ui/react/grids` and `pivotal-ui/css/grids`)
- Google Maps component (`pivotal-ui/css/google-maps`)
- Avatars component (`pivotal-ui/css/avatars`)

## v13

### Goals

The goals of the 13.0 release are:

- New interface and design of Panels
- Redesign of Dropdown and CheckboxDropdown

### The Big Changes

#### Panels

- Panels have been redesigned to have a title, header, body, and footer section. You can insert components in the title and header sections. See the [Panels](/panels#examples) examples.
  - The panel title appears outside the rounded box
  - The panel header appears within the rounded box, separated from the content by a border
  - The panel body appears within the rounded box, below the header (if any)
  - The panel footer appears at the bottom of the rounded box.
- The panel body now has rounded corners and a box shadow by default.
- Previously, the panel `header` prop took a `Node`. Now, it takes a `string`, which it will place in the top left corner of the panel. This is intended to make panel headers more consistent by default. To get the old behavior back, do not pass a `header`, and use `headerCols={[<FlexCol key="some-key">{someNode}</FlexCol>]}`.
- Panel CSS classes are now prefixed with `pui-`.
- The classes `panel`, `panel-body`, `panel-header` and `panel-footer` have been removed. You can either:
   - update your CSS by prepending `pui-` OR
   - you can pass those classes in via the  `bodyClassName`, `headerClassName`, or `footerClassName` props.

```jsx
//nonInteractive
<Panel {...{
  className: 'panel',
  bodyClassName: 'panel-body',
  headerClassName: 'panel-header',
  footerClassName: 'panel-footer'
}}/>;
```

#### Dropdown/CheckboxDropdown

- Icon no longer positioned absolutely

### v12

### Goals

The goals of the 12.0 release are:

- Fix Form alignment issues
- Namespace the CSS of new components with `pui-`
- Redesign the Checkbox and Radio component
- Fix the `Icon` component to be `create-react-app` compatible
- Enhance the Table component to determine column headers from the data

### The Big Changes

#### Table
- When no `columns` prop is given, the table will automatically determine the columns and column headers based on the keys of `data`.
- See the [Tables](/tables#examples) example

#### Checkbox
- CSS selectors prefixed with `pui-`, eg. `pui-checkbox`
- Update the styling
- Remove props related to forms: `displayError`, `errorMessage` and `label`.

#### Radio
- CSS selectors prefixed with `pui-`, eg. `pui-radio`
- Update the styling

### Conversion Guide

#### Checkbox
- Use the new [Form](forms) component to obtain functionality such as field labels, tooltips, and help text.

## v11

### Goals

The goals of the 11.0 release are:

- Introduce new Form component

### The Big Changes

#### Removed
- Label component
- `.form-group` class has been removed.

#### Input, Toggle
- Moved some functionality (e.g. labels, tooltips, help text) out of these components
and into the Form component.

#### TextFilter
- Introduced the TextFilter component

#### Forms

```jsx
//nonInteractive
<Form className="example-form">
  <FormRow className="mbxl">
    <FormCol {...{
      name: 'orgName',
      label: 'Label Layer',
      help: 'Error or Help text Layer'
    }}>
      <Input {...{placeholder: 'I am in the content layer'}}/>
    </FormCol>
    <FormCol {...{
      name: 'other',
      retainLabelHeight: true
    }}>
      <Input {...{placeholder: 'No label or help text, but still lines up!'}}/>
    </FormCol>
  </FormRow>
  <FormRow>
    <FormCol {...{
      name: 'other',
      label: 'Inline Label',
      inline: true
    }}>
      <Input {...{placeholder: 'The field and the label lines up when inline'}}/>
    </FormCol>
  </FormRow>
</Form>;
```

##### Form Unit

- it's a layered cake
  - top is for labels (green)
  - middle is for content (blue)
  - the bottom is for messages/help text/ error text (red)
- the goal is to make it easy to build rhythmic 8pt grid conforming forms

### Conversion Guide

#### Input, Toggle
- Use the new Form component to obtain functionality such as field labels, tooltips, and help text.

#### Select
- The `onChange` callback will now receive the new `value` as a second argument, instead of putting it on `event.target.value`.

## v10

### Goals

The goals of the 10.0 release are:

- Upgrade to React 16.

### The Big Changes

#### React
- Upgraded to React 16.

#### Positioning
- Added new positioning and display classes. See the `Positioning` page in the docs.

#### Iconography, SVG
- Fixed the path to custom SVGs

### Conversion Guide

#### React
- Run `npm i react@^16.0.0` or `yarn upgrade react@^16.0.0` to install React 16. Other changes
may be required.

## v9

### Goals

The goals of the 9.0 release are:

- Update components to use the 8 point grid
- Adding some new components (Flyout, Wizard)
- Overhaul the existing Table component to make it easier to contribute new features

### The Big Changes

#### Packaging
- All react and CSS components are now in the `pivotal-ui` package

#### Deprecated
- The CopyToClipboardButton component has been deprecated
- The Label component has been deprecated

#### Button Groups
- Can now be large or small

#### Button Groups, Draggable List, Left-Tabs, Progress Bar, Tabs
- Updates to use the 8 point grid system

#### CopyToClipboard
- Can now be large or small
- No longer uses the CopyToClipboardButton component

#### Flex Grid
- `col-fixed` now uses `flex: 0 1 auto` so that it works in IE11

#### Flyout
- Added component that allows a modal to slide in from the right side of the page

#### Links
- Added new underline CSS classes

#### Notifications
- CSS refactor

#### Pagination
- Can now be large or small
- Uses the Button Group component to render its page elements

#### Select
- The `onChange` callback will now pass the underlying click event as its first argument, instead of the selected value

#### Table
- Re-architected the Table component to make it easier to contribute new features
  - SortableTable: rows can be sorted ascending or descending by a chosen column.
  - FlexTable: uses `div` tags to compose a table rather than traditional HTML tags.
  - SortableFlexTable: a SortableTable that is composed of `div` tags.
  - AdvancedTable: offers many additional features for advanced customization.
- The base Table is no longer sortable. Use SortableTable for this purpose.
- Added a plugin system, see the Table component documentation for details.

#### Wizard
- Added component that allows a user to click through a series of wizard pages

### Conversion Guide

#### Packaging
- In `package.json`, add `pivotal-ui` as a dependency, and remove all old `pui-css-{component}` and `pui-react-{component}` dependencies. (CAUTION: make sure you only remove PUI components)
- Update all files that required/imported PUI components to import from the new `pivotal-ui` package.
  - React example: import {DefaultButton} from 'pivotal-ui/react/buttons';
  - CSS example: import 'pivotal-ui/css/buttons';

#### Button Group, Draggable List, Left-Tabs, Notifications, Pagination, Progress Bar, Tabs
- Positioning changes may be required as a result of underlying CSS changes

#### Select
- `onChange` callbacks should be updated to uses the new `event` object as the first argument

#### Table
- Use `SortableTable` if sorting behavior is required.
- Use `AdvancedTable` if advanced `FlexTable` features are needed