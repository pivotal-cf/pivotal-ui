---
title: Upgrade guide
---

Pivotal UI follows [semantic versioning](https://semver.org/). Major version bumps (e.g. 10.x.x -> 11.0.0) may contain major new features and breaking changes, which will be documented below. Minor version bumps (e.g. 10.5.x -> 10.6.0) may contain additive, non-breaking new features. Bug fixes will be released in patch versions (e.g. 10.5.1 -> 10.5.2).

Below are the upgrade guides for recent major versions of Pivotal UI. For more details about minor and patch releases, see the [changelog](https://github.com/pivotal-cf/pivotal-ui/blob/master/CHANGELOG.md) on the branch in question (e.g. `v17` for version 17).


## v19 Table-Flippers (╯°□°)╯︵ ┻━┻

### Goals

The goal of the 19.0 release is to increase accessibility of tables within applications using Pivotal UI.

### Big Changes

#### New Table Component Structure

- Pivotal UI tables are now based on building block components (e.g. `<Table/>`, `<Tbody/>`, etc.) rather than a single component
- Tables also no longer support the concept of "plugins"

### Migration Guide

#### Tables

##### Plugin Conversions

Follow the directions below to replace previously supported table plugins for Pivotal UI table functionality.

| If you're using... | Switch to...    |
|--------------------|--------------------|
| withCellClassName | Cell class names can now be passed directly to the `<Td>` and `<Th>` tags, e.g. `<Td className="my-cell-class" />` |
| withCellEllipsis | Pass `className="type-ellipsis"` to `<Td>` or `<Th>` tags |
| withCellOnClick | Wrap cell children in a `<button type="button" onClick={yourOnClickCallback}>` tag |
| withCellTooltip | Render a `<TooltipTrigger>` component inside the `<Td>` or `<Th>` tag |
| withCellWidth | Assign a className to the `<Th>` tag and add a css `width` property. Assigning the width to a `<Th>` will affect the entire column. |
| withFlex | Flex columns are no longer supported due to accessibility constraints. However, by default the Pivotal UI table cells should accommodate the size of their contents. |
| withFooterRow | Use a `<Tfoot>` component with `<Tr>`'s inside of it as the last row(s) of your table |
| withRenderTdChildren | This functionality has been replaced by deconstructing the table. You should now be able to render whatever `<Td>` and `<Th>` tags you would like inside a given row. |
| withRenderThChildren | See above. |
| withRowClassName | Row class names can now be passed directly to the `<Tr>` tag, e.g. `<Tr className="my-row-class" />` |
| withRowDrawer | The `<TrWithRowDrawer>` component enables this functionality. See the Tables page for more information. |
| withRowLink | Due to accessibility constraints table rows can no longer be links. However, you can wrap components within a table cell in links. |
| withScrollableTbody | Pass the `scrollable` prop to the `<Tbody>` component. |
| withSorting | See detailed sortable table example on the Tables page. |

##### Accessibility Considerations for Tables

When building a table, the following attributes are important to include in order to ensure the accessibility of your table for assistive technology:

- Include a `<Caption>` as a descriptive title for your table
- Use `<Th>` tags to indicate headers, and add property `scope="row"` if the `<Th>` is a header for a row rather than a column
- For sortable tables, provide the `aria-sort` property, with value `ascending`, `descending`, or `none`

###### More Resources:
https://www.w3.org/WAI/tutorials/tables/
https://inclusive-components.design/data-tables/

## v18 Taste The Rainbow 🌈

### Goals

The goals of the 18.0 release are:

- Increase accessibility of applications using Pivotal UI
- Reduce the number of colors available to make it easier for users to know when to use each color

### Big Changes

#### React version

- Pivotal UI now specifies React 16.8 as a dependency, and it is recommended that users upgrade to this version

#### New Color Palette

- We have revamped and simplified our color palette. For details on how our new palette was designed, [see this article by Raquel Breternitz](https://medium.com/@raquel/a11y-color-contrast-button-triads-and-the-new-pivotal-ui-color-palette-63bb25122bdd).
- We have introduced the concept of light and dark backgrounds to our color conventions. For buttons and hover states, we have corresponding colors that ensure accessibility.
- Now, the set of encouraged background colors is much smaller: backgrounds should be white, light-gray, dark-gray, or (in rare cases) black. White and light-gray are considered "light" backgrounds, while dark-gray and black are considered "dark" backgrounds. This is important for "on-light"/"on-dark" styles (see below).
- Our components had their colors updated to use the new color palette. This is most noticeable on components like `Alert`s, `Button`s, and `Pagination`. These changes are intentional – they are not meant to look exactly the same!

### Migration Guide

#### Colors

- It should be a simple find-and-replace to convert from our old colors to the new color selection. This conversion applies to Sass variables (e.g. `$neutral-1` to `$black`), background color modifier classes (e.g. `bg-neutral-1` to `bg-black`), and text color modifier classes (e.g. `type-neutral-1` to `type-black`). Here is the mapping of colors to new:

| If you're using... | Switch to...    |
|--------------------|--------------------|
| neutral-1 | black |
| neutral-2 | dark-gray |
| neutral-3, neutral-4 | gray |
| neutral-5, neutral-6, neutral-7 | accent-gray |
| neutral-8, neutral-9 | light-gray|
| neutral-10, neutral-11 | white |
| dark-1 | black |
| dark-2, dark-3 | dark-gray |
| dark-4, dark-5, dark-6 | gray |
| dark-7, dark-8 | accent-gray |
| dark-9 | light-gray |
| dark-10, dark-11 | white |
| brand-1, brand-2 | black |
| brand-3, brand-4, brand-5, brand-6, brand-7 | teal |
| brand-8, brand-9, brand-10 | accent-teal |
| brand-11 | light-teal |
| accent-1, accent-2 | dark-blue |
| accent-3, accent-4 | blue |
| accent-5 | accent-blue |
| accent-6 | light-blue |
| error-1, error-2, error-3 | dark-red |
| error-4, error-5 | red |
| error-6 | light-red|
| warn-1, warn-2 | black |
| warn-3, warn-4, warn-5 | decorative-yellow |
| warn-6 | light-yellow |
| success-1, success-2 | green |
| success-3, success-4, success-5 | accent-green |
| success-6 | light-green | 

After this conversion, look over your app to make sure things still look okay. Some change is intended, but you might need to use different colors in some places. For places where you were previously using light shades of gray (like hover states), they may now be white and not show up over white backgrounds.

For hover states that appear over light backgrounds, use the `$hover--onLite` color variable or the `bg-hover--onLite` background modifier class. For hover states over dark backgrounds, use the `$hover--onDark` variable or the `bg-hover--onDark` background modifier class.

#### ThemeProvider

- We have introduced a new component called `ThemeProvider` which will tell components anywhere inside the ThemeProvider use the associated theme
- Note that as of now this functionality is currently limited to `Button`s

#### Buttons

Our button components (`DefaultButton`, `PrimaryButton`, etc.) were revamped to clean up the code and use the new color palette. The breaking changes are as follows:

- The `span` with class name `pui-btn-inner-content` inside the `Button` component was removed to simplify markup
- Class names used by these components that did not have a `pui-` prefix have been removed (e.g. `btn`, `btn-sm`).
- The remaining class names (prefixed with `pui-`) were slightly renamed to follow [BEM](http://getbem.com/) conventions. Here are the changes:

| Old class name | New class name |
|----------------|----------------|
| `pui-btn-full` | `pui-btn--full` |
| `pui-btn-icon` | `pui-btn--icon-only` |
| `pui-btn-icon-right` | `pui-btn--icon-right` |
| `pui-btn-lg` | `pui-btn--lg` |
| `pui-btn-sm` | `pui-btn--sm` |
| `pui-btn-sm` | `pui-btn--sm` |
| N/A (new feature) | `pui-btn--on-dark` |

We have also split out the class names that correlate to the type of button.

| Old class name | New class name |
|----------------|----------------|
| `pui-btn-primary` | `pui-btn--primary` |
| `pui-btn-primary-alt` | `pui-btn--primary pui-btn--alt` |
| `pui-btn-primary-flat` | `pui-btn--primary pui-btn--flat` |
| `pui-btn-default` | `pui-btn--default` |
| `pui-btn-default-alt` | `pui-btn--default pui-btn--alt` |
| `pui-btn-default-flat` | `pui-btn--default pui-btn--flat` |
| `pui-btn-danger` | `pui-btn--danger` |
| `pui-btn-danger-alt` | `pui-btn--danger pui-btn--alt` |
| `pui-btn-danger-flat` | `pui-btn--danger pui-btn--flat` |
| `pui-btn-brand` | `pui-btn--brand` |
| `pui-btn-brand-alt` | `pui-btn--brand pui-btn--alt` |
| `pui-btn-brand-flat` | `pui-btn--brand pui-btn--flat` |


These changes will only be breaking if you had tests that asserted on these class names, or if you have custom CSS overrides that applied to these class names.

In an effort to ensure accessibility, when using a `Button` with the `iconOnly` prop set to true, if the `Button` does not have an associated `aria-label` a console warning will show in development

#### RadioGroup

- The `RadioGroup` component sets `readOnly` to `true` on radio inputs when no `onChange` is provided.

#### Alerts

- Colors of the `Alert`s have been changed to align with the new color palette, and to increase the contrast ratio in order to improve accessibility
- Status prefixes (i.e. "Success:", "Warning:") have been added to the alert content
- Non-namespaced CSS classes were removed as follows:

| Old class name | New class name |
|----------------|----------------|
| `alert` | `pui-alert` |
| `alert-link` | `pui-alert-link` |
| `alert-dismissable` | `pui-alert-dismissable` |
| `close` | `pui-close` |
| `alert-success` | `pui-alert-success` |
| `alert-info` | `pui-alert-info` |
| `alert-warning` | `pui-alert-warning` |
| `alert-danger` | `pui-alert-danger` |
| `alert-error` | `pui-alert-error` |

#### Deletions

- The `Svg` component has been removed. It is recommended that uses are replaced with the [SVG Loader for Webpack](https://github.com/webpack-contrib/svg-inline-loader).
- The `ButtonGroup` component has been removed. If you still need the components, the CSS is still available in older versions of Pivotal UI, and can be brought into your codebase
- The `Select` component has been removed. It is recommended that uses are replaced with the HTML `select` tag
- We removed non-namespaced CSS classes from the following components:

######`BackToTop`

| Old class name | New class name |
|----------------|----------------|
| `back-to-top` | `pui-back-to-top` |

######`Collapse` and `Collapsible`

| Old class name | New class name |
|----------------|----------------|
| `panel` | `pui-collapse` |
| `panel-body` | `pui-collapse-panel-body` |
| `panel-collapse` | `pui-collapse-panel` |
| `panel-divider` | `pui-collapse-divider` |
| `panel-heading` | `pui-collapse-panel-heading` |
| `panel-title` | `pui-collapse-panel-title` |
| `collapse` | `pui-collapsible` |
| `collapse-icon` | `pui-collapse-icon` |
| `collapse-shield` | `pui-collapsible-shield` |
| `collapse-title` | `pui-collapse-title` |
| `collapse-trigger` | `pui-collapse-trigger` |

######`CopyToClipboard`

| Old class name | New class name |
|----------------|----------------|
| `copy-to-clipboard` | `pui-copy-to-clipboard` |

######`Toggle`

| Old class name | New class name |
|----------------|----------------|
| `toggle-switch` | `pui-toggle-switch` |

## v17

### Goals

The goals of the 17.0 release are:

- Rewrite `Form` component to decouple state management from layout. Now, the placement of fields is completely customizable.
- Improve `RadioGroup` component to take a `value` prop, allowing it to be used more easily within a `Form`.
- Improve accessibility of alert components (`SuccessAlert`, `ErrorAlert`, `InfoAlert`, `WarningAlert`).
- Deprecate the `Select` React component.
- Deprecate the `CellRenderer` `Table` plugin.
- Introduce the [`renderThChildren`](/components/tables/#using-plugins) `Table` plugin.

### Big Changes

#### Backgrounds

* We removed the `bg-cloud`, `bg-glow`, and `bg-full-bleed` modifier classes and the background images `aboutus-hero.jpg` and `gray-cloud.png`.

#### Form

##### Fields
* The `Form` component now supports adding and removing fields after the initial render.
* The `Form` now requires a new `fields` object prop. They keys of this object are the unique field names that will be used in the `Form`. The values are mostly what was used to be props on the `FormCol`. See the Migration Guide below for examples.
* When an individual `field` has no `children` specified, it will default to a text [`Input`](/components/inputs).

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
  </Form>
  ```

1. Create a new `fields` prop:
  ```jsx
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
  </Form>
  ```
1. Create a callback for the `Form` child:
  ```jsx
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
  </Form>
  ```

1. Extract `FormRow` wrappers into the layout:
  ```jsx
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
  </Form>
  ```

1. Replace `FormRow` with `Grid` and `FormCol` with `FlexCol`, and remove unnecessary props from the FlexCols:
  ```jsx
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
  </Form>
  ```

1. Remove all that `FormCol` child callbacks, and use the `Form` methods provided by the `Form` child callback instead:
  ```jsx
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
  </Form>
  ```

1. Place the fields in the layout:
  ```jsx
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
  </Form>
  ```

1. Consider removing Grids and FlexCols for fields that are alone on a row:
  ```jsx
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
  </Form>
  ```

## v16

### Goals

The goals of the 16.0 release are:

- Introduce new `ProgressBar` component

- Rewrite `Modal` and `Flyout` components to be more accessible and configurable

- `Checkbox` now has an indeterminate state

### Big Changes

#### ProgressBar

Previously progress bars was solely a CSS implementation. See the [ProgressBars](/components/progress-bars) page for details on new React component.

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
this might be used, see the [Autocomplete](/components/autocomplete) page.
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
<Row>
  <Col md={8}>...</Col>
  <Col md={16}>...</Col>
</Row>
```

FlexGrid:

```jsx
<Grid>
  <FlexCol>...</FlexCol>
  <FlexCol grow={2}>...</FlexCol>
</Grid>
```

##### CSS-only

Deprecated Bootstrap-based Grid:

```html
<div class="row">
  <div class="col-md-8">...</div>
  <div class="col-md-16">...</div>
</div>
```

FlexGrid:

```html
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

- Panels have been redesigned to have a title, header, body, and footer section. You can insert components in the title and header sections. See the [Panels](/components/panels) examples.
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
<Panel {...{
  className: 'panel',
  bodyClassName: 'panel-body',
  headerClassName: 'panel-header',
  footerClassName: 'panel-footer'
}}/>
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
- See the [Tables](/components/tables) example

#### Checkbox
- CSS selectors prefixed with `pui-`, eg. `pui-checkbox`
- Update the styling
- Remove props related to forms: `displayError`, `errorMessage` and `label`.

#### Radio
- CSS selectors prefixed with `pui-`, eg. `pui-radio`
- Update the styling

### Conversion Guide

#### Checkbox
- Use the new [Form](/components/forms) component to obtain functionality such as field labels, tooltips, and help text.

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
</Form>
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