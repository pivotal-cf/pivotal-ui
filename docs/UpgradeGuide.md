# PUI 11.0 Release

## Goals

The goals of the 11.0 release are:

- Introduce new Form component

## The Big Changes

### Removed
- Label component 
- `.form-group` class has been removed.

### Input, Toggle
- Moved some functionality (e.g. labels, tooltips, help text) out of these components
and into the Form component.

### TextFilter
- Introduced the TextFilter component

### Forms
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
#### Form Unit

- it's a layered cake
  - top is for labels (green)
  - middle is for content (blue)
  - the bottom is for messages/help text/ error text (red)
- the goal is to make it easy to build rhythmic 8pt grid conforming forms

## Conversion Guide

### Input, Toggle
- Use the new Form component to obtain functionality such as field labels, tooltips, and help text.

### Select
- The `onChange` callback will now receive the new `value` as a second argument, instead of putting it on `event.target.value`.

# PUI 10.0 Release

## Goals

The goals of the 10.0 release are:

- Upgrade to React 16.

## The Big Changes

### React
- Upgraded to React 16.

### Positioning
- Added new positioning and display classes. See the `Positioning` page in the docs.

### Iconography, SVG
- Fixed the path to custom SVGs

## Conversion Guide

### React
- Run `npm i react@^16.0.0` or `yarn upgrade react@^16.0.0` to install React 16. Other changes
may be required.

# PUI 9.0 Release

## Goals

The goals of the 9.0 release are:

- Update components to use the 8 point grid
- Adding some new components (Flyout, Wizard)
- Overhaul the existing Table component to make it easier to contribute new features

## The Big Changes

### Packaging
- All react and css components are now in the `pivotal-ui` package

### Deprecated
- The CopyToClipboardButton component has been deprecated
- The Label component has been deprecated

### Button Groups
- Can now be large or small

### Button Groups, Draggable List, Left-Tabs, Progress Bar, Tabs
- Updates to use the 8 point grid system

### CopyToClipboard
- Can now be large or small
- No longer uses the CopyToClipboardButton component

### Flex Grid
- `col-fixed` now uses `flex: 0 1 auto` so that it works in IE11

### Flyout
- Added component that allows a modal to slide in from the right side of the page

### Links
- Added new underline css classes

### Notifications
- CSS refactor

### Pagination
- Can now be large or small
- Uses the Button Group component to render its page elements

### Select
- The `onChange` callback will now pass the underlying click event as its first argument, instead of the selected value

### Table
- Re-architected the Table component to make it easier to contribute new features
  - SortableTable: rows can be sorted ascending or descending by a chosen column.
  - FlexTable: uses `div` tags to compose a table rather than traditional HTML tags.
  - SortableFlexTable: a SortableTable that is composed of `div` tags.
  - AdvancedTable: offers many additional features for advanced customization.
- The base Table is no longer sortable. Use SortableTable for this purpose.
- Added a plugin system, see the Table component documentation for details.

### Wizard
- Added component that allows a user to click through a series of wizard pages

## Conversion Guide

### Packaging
- In `package.json`, add `pivotal-ui` as a dependency, and remove all old `pui-css-{component}` and `pui-react-{component}` dependencies. (CAUTION: make sure you only remove PUI components)
- Update all files that required/imported PUI components to import from the new `pivotal-ui` package.
  - React example: import {DefaultButton} from 'pivotal-ui/react/buttons';
  - CSS example: import 'pivotal-ui/css/buttons';

### Button Group, Draggable List, Left-Tabs, Notifications, Pagination, Progress Bar, Tabs
- Positioning changes may be required as a result of underlying CSS changes

### Select
- `onChange` callbacks should be updated to uses the new `event` object as the first argument

### Table
- Use `SortableTable` if sorting behavior is required.
- Use `AdvancedTable` if advanced `FlexTable` features are needed

# PUI 8.0 Release

## Goals

The goals of the 8.0 release are:

- 8 point grid system: Many components have been refactored to fit the grid system described in this [blog post](https://builttoadapt.io/intro-to-the-8-point-grid-system-d2573cde8632).
- Introduce a [Flex driven grid system](/grids) and a CSS table based on this system.

## The Big Changes

### Deprecated

- The following types of panels are deprecated: simple, basic alt, panel title, highlight panel, alternate, shadow, card, and clickable.
- The following types of tabs are deprecated: simple alt tabs and images tabs

#### Accordion/Collapse:

- Redesigned to 8 point standard. Replaced tag in panel heading with class `.panel-title`.

#### Buttons:

- Redesigned to 8 point standard.
- default `aria-label` for buttons is the button text, and type is set to button.
- The `.button` class has been replaced by the `.btn` class.

#### Copy to Clipboard:

- fix calls to window and document

#### Dropdown:

- Redesigned to 8 point standard. CSS solution is truly CSS-only. Added size option.
- CSS version has new structure and classes, see style guide.
- The small size has been removed.
- Added floatMenu option to React component to give explicit control over whether menu is floating.
- Aria support.
- support for dropdown items that contain icons .
- The following changes have been made to the React component:
	- The `pullRight` option has been replaced with the `menuAlign` option to accommodate the ability to pull left.
	- The `border` option has been removed.
 	- The `toggle` option has been replaced with by the icon option.
	- The `menuCaret` option has been renamed to `showIcon` for clarity.

#### Forms:

- Redesigned to 8 point standard.
- Custom icons fixed to 18px by 18px.
- The following classes have been removed: `.checkbox-inline`, `.radio-inline`, `.inline-labels`, and `.unstyled`.

#### Iconography:

- support for spinner.
- allow icon svgs to be sourced from app/svg directory.
- Wrapping element for Icons were changed from span to div.
- Added spinner SVGs in three different sizes: `sm`, `md`, `lg`.
- The spinners can be used in Icons. You can then attach a spinner icon in a button.
- The `.svgicon` class has been replaced by the `.icon` class. The `.svg-baseline` and `.svg-middle` classes have been replaced by `.icon-baseline` and `.icon-middle` classes respectively.

#### Input:

- autoFocus property

#### Links:

- Link animation speed changed from 300ms to 150ms.

#### Modal:

- Redesigned to 8 point standard.
- Replaced close image with SVG.
- Replaced modal body wrapping tag with `.modal-body` class.
- Removed bootstrap influence from modals styling.
- `acquireFocus` property

#### Panels:

- Redesigned to 8 point standard.

#### React:

- Remove deprecated propTypes usage to support React 15.5

#### SVG:

- Move from svg-react-loader to react-svg-loader to support React 15.5 (add69a9)


#### Table:

- Redesigned to 8 point standard.
- Added flex-grid-driven table in addition to standard HTML table (both React and CSS).
- Added border and hover modifier classes for CSS only tables.
- React table columns accept `cellClass`.
- The following CSS classes have been removed: `.table-data`, `.table-key-value`, `.table-striped`, and `.table-light`.
- The variously-sized scrollable tables classes have been removed: `.table-scrollable-sm`, `.table-scrollable-md`, and `.table-scrollable-lg`.
- Scrollable tables now have a default max height of 164px.

#### Tooltips:

- Redesigned to 8 point standard.
- The CSS version no longer relies on bootstrap. CSS version has new structure and classes, see style guide.
- CSS solution for tooltip is truly CSS-only.
	- Added three sizes to tooltips (`sm`, `md`, `lg`).
- Added a `TooltipTrigger` React component that uses a different rendering strategy from `OverlayTrigger`.
- Added dark and light themes to both `TooltipTrigger` and `OverlayTrigger`.
- render children instead of content property

#### Typography:

- Redesigned to 8 point standard.

## Conversion Guide

### Buttons

All buttons require the `.btn` class at a minimum to receive PUI styling.

### Dropdowns

- `pullRight` property replaced by `menuAlign` property to give explicit control over dropdown menu alignment.
- The toggle option has been removed.
- Users can no longer replace the dropdown icon with any element. It has been replaced by the icon option which takes a string specifying the name of the iconography icon that should be used by the dropdown.
- The menuCaret option has been replaced by the `showIcon` for clarity as setting `menuCaret` to `true` or `false` actually set the visibility of the icon prior to PUI 8.

### Forms

Inline checkboxes, radio buttons and labels have been removed. Unstyled inputs have also been removed.

### Iconography

The .svgicon, .svg-baseline and .svg-middle classes have been replaced by the .icon, .icon-baseline and .icon-middle classes respectively

### Tables

Data, key-value, striped, and light table styles have been removed. Variable sized scrollable tables have been removed. Scrollable tables are now all one size.


# PUI 7.0 Release

## Goals

The goals for the 7.0 release are:

- Update and consolidate Buttons and Dropdowns
- Replace Font Awesome Icons with SVGs
- Make it easier for people to use SVGs

## The Big Changes

- Buttons and Dropdowns are visually redesigned
- Button and Dropdown React Components are all new, see the conversion guide below
- Iconography React component now uses SVGs instead of Font Awesome
- Deprecated Gravatars, Checked Lists, and non-React Back To Top Component
- Deprecate current spinners component. New spinners are waiting to be prioritized.

Full list: [https://github.com/pivotal-cf/pivotal-ui/blob/master/CHANGELOG.md](https://github.com/pivotal-cf/pivotal-ui/blob/master/CHANGELOG.md)

## Conversion Guide

### Buttons

The buttons all have updated styles, and there are fewer of them.

- `DefaultAltButton` is removed. Use `DefaultButton` instead. You may want to set the `alt` prop to true. If you still want the shadows, use [box shadows](/box_shadows)
- `LowlightButton` is removed. It can be approximated with `DefaultButton` with `flat` set to true
- `HighlightButton` is renamed to `PrimaryButton`
- `HighlightAltButton` is removed, just use `PrimaryButton`. Marketing sites may want to use `BrandButton`. Web apps are discouraged from using `BrandButton`.


### Dropdowns

There are no longer 7 dropdown components (`LinkDropdown`, `DefaultDropdown`, `HighlightDropdown`, etc). There is only `Dropdown`.
The `Dropdown` component takes many React props. To recreate the old `LinkDropdown`, you can use `Dropdown` with `flat` and `link` props set to true.
Most of the other old dropdown styles have been removed. There are basically only three launcher styles now: default, flat, and split.

### React Iconography

- Use the `src` prop instead of the `name` prop
- The `Icon` component will inline SVGs instead of using Font Awesome. Many of the icons may have different names and different layout properties.
- Webpack svg-react-loader is now required for iconography. If you are using pui-react-tools, you will need to `npm install` the webpack loaders and upgrade pui-react-tools to version ^2.0.0.
- Icons no longer take the `size` prop. Instead, they are sized at the local font size.
If you want an icon with a different size, you can change the font size around that icon. For example, if you set the font size to 24px, the SVG should be 24px wide and 24px tall.
You can also provide a `style` prop with `width` and `height` if that is more appropriate.

### CSS Iconography

If you are using iconography, but not using React, it will be more difficult to use. All of the SVGs are inside of the `pui-css-iconography` node module.
If you would like to use an icon, you can use the SVGs directly from the node module.
If you do not mind black icons, you can serve up the SVGs and use them inside of `img` tags.
If you need to color your icons, you need to copy the content of the SVG and put it directly into your html. CSS can then be used for colors.

### CSS Alerts

Alerts look the same, but the css has changed from float to flexbox. If you have a multi-line alert, you may need to add an extra div directly inside of your alert wrapping your old contents.
Also, the close button is no longer float: right, so it needs to be at the end of your alert html.

### General

There are more breaking changes than usual in this release, it is possible we missed something. Please file issues on github or ask questions on the pivotal-ui slack channel.


# PUI 6.0 Release

## Goals

The goals for the 6.0 release are:

- Remove React Bootstrap Dependency
  - This should make it much easier for teams to choose their version of React without causing dependency conflicts.
  - This will also make it easier in the future to use non-Bootstrap designs.
- Add a couple new React Components

## The Big Changes

- Alert: The `dismissable` prop is now just a boolean. If you want a function that is called on dismissal, use the `onDimiss` prop.
- Modals: The `bsSize` prop has been renamed to `size`.
- React Bootstrap: Alerts, Grids, Modals and Tabs are now entirely different code paths. The goal was to replace all old functionality, but undocumented behavior may have changed.

Full list: [https://github.com/pivotal-cf/pivotal-ui/blob/master/CHANGELOG.md](https://github.com/pivotal-cf/pivotal-ui/blob/master/CHANGELOG.md)

## New Components

- `CopyToClipboard`
- `CopyToClipboardButton`
- `Svg`


# PUI 5.0 Release

- The 5.0 release is a bump from React 14 to React 15.
- If you have no warning messages in React 14, the React 15 upgrade should be simple.
- All of the newest features in Pivotal UI are in the 4.0 release.


# PUI 4.0 Release

## Goals

The goals for the 4.0 release are:

- Add and improve React components as needed by teams
- Consolidate similar React components
- Consolidate some styles
- Improved CSS building

## The Big Changes

- The `typography` React component has been removed in favor of native headers
- Header font weights default to normal
- base text color has been darkened to improve contrast
- `OverlayTrigger` now supports manual mode and does not use React Bootstrap
- `OverlayTrigger` `trigger` prop is now a string and not an array
- `Tooltip` is all new in order to work with new `OverlayTrigger`
- Some components have been renamed, see [conversion guide](#05_conversion)
- CSS scales, traffic lights, and fancy select have been removed
- React components are all ES6 classes for easier subclassing
- pui CSS node modules can be directly imported with Webpack loaders

Full list: [https://github.com/pivotal-cf/pivotal-ui/blob/master/CHANGELOG.md](https://github.com/pivotal-cf/pivotal-ui/blob/master/CHANGELOG.md)

## New Components

- `Checkbox`
- `Pagination`
- `Toggle`

## Conversion Guide

### Typography

pui-react-typography is no longer supported.
Replace `<DefaultH2>`, `<AlternateH2>` or `<MarketingH2>` with `<h2>`.
The headers will now be less bold. This is intended by the designers.
If your application wants headers to be bigger and bolder, add CSS in your own application.

### Renames

- `<BasicInput>` becomes `<Input>`
- `<SearchInput>` becomes `<Input search>`
- `<SimpleTabs>` becomes `<Tabs>`
- `<SimpleTabsAlt>` becomes `<Tabs tabType="simple-alt">`
- `<SortableTable>` becomes `<Table>`
- `<OverlayTrigger trigger={['hover']}>` becomes `<OverlayTrigger trigger="hover">`
- Use `TileLayoutItem` instead of `TileLayout.Item`
- Look for `RadioGroup` in `pui-react-radio`

### Other changes

- Stop using the `fancy-select` CSS class, just use regular selects.
If you want a fancy chooser, consider dropdowns.
- Provide a class to Input with the `inputClassName` prop instead of `className`.
- DropdownItem no longer automatically wraps content in an `a` tag unless an `href` prop is provided.
- The markup generated by tooltips is different. The classes are prefixed with 'pui-', like 'pui-overlay'.

### CSS Compiling

We would like to deprecate Dr Frankenstyle due to its performance issues and maintenance cost.
In PUI 4.0, you can use Webpack loaders instead.
The combination of `css-loader`, `file-loader` and `extract-text-webpack-plugin`
recreates the functionality of Dr Frankenstyle in much less time.

See the [Webpack Config](https://github.com/pivotal-cf/react-starter/blob/master/config/webpack.config.js) in React Starter.
In React Starter `NODE_ENV=production gulp assets` will output a `components.css` file
in addition to any fonts and images needed by that CSS into `public`.
