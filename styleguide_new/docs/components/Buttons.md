# Buttons

## Installation & Usage

#### React
`npm install pui-react-buttons --save`

#### CSS Only
`npm install pui-css-buttons --save`

## Description
Use buttons as triggers for actions that are used in forms, toolbars, and as stand-alone action triggers. Try to avoid the usage of buttons for navigation. The main difference between actions and navigation is that **Actions** are operations performed on objects, while **Navigation** refers to elements on the screen or view that take you to another context in the application. For **Navigation** consider simply using links.

Import the subcomponents:

```
import {DefaultButton, PrimaryButton, DangerButton, BrandButton} from 'pui-react-buttons';
import {Icon} from 'pui-react-iconography';
```

Buttons use the button tag by default. If you'd like a link rather than a button, simply add an `href` attribute.
The aria-label attribute will be populated with the button text, unless an aria-label value is explicitly supplied.

## Examples

```jsx
::title=Link vs Button Example
<div>
<DefaultButton>
  Button
</DefaultButton>

<DefaultButton href="http://example.com">
  Link
</DefaultButton>
</div>
```

### Color and Treatment
There are 3 main button color schemes: Default, Primary, Danger. There is also Brand, but this should only be used for marketing. For each color scheme there is the default style, an alt style (with inverted colors and a transparent background) and a flat style (alt with transparent borders). To use the alt style, set the `alt`prop, to use the flat style, use the `flat` prop.

```jsx
::title=Default Button
<div>
    <DefaultButton>Default</DefaultButton>
    <DefaultButton alt>Default Alt</DefaultButton>
    <DefaultButton flat>Default Flat</DefaultButton>
</div>
```

```jsx
::title=Primary Button
<div>
    <PrimaryButton>Primary</PrimaryButton>
    <PrimaryButton alt>Primary Alt</PrimaryButton>
    <PrimaryButton flat>Primary Flat</PrimaryButton>
</div>
```

```jsx
::title=Danger Button
<div>
    <DangerButton>Danger</DangerButton>
    <DangerButton alt>Danger Alt</DangerButton>
    <DangerButton flat>Danger Flat</DangerButton>
</div>
```

```jsx
::title=Brand Button
<div>
    <BrandButton>Brand</BrandButton>
    <BrandButton alt>Brand Alt</BrandButton>
    <BrandButton flat>Brand Flat</BrandButton>
</div>
```

### Sizing
```jsx
::title=Large Button
::description=To make a button large, set the `large` property to true
<DefaultButton large>
  Big Button
</DefaultButton>
```

```jsx
::title=Default Button
<DefaultButton>
Default
</DefaultButton>
```

```jsx
::title=Small Button
::description=To make a button large, set the `small` property to true
<DefaultButton small>
  Small Button
</DefaultButton>
```

```jsx
::title=Full Width Button
::description=To make a button full width, set `fullWidth` to true
<DefaultButton fullWidth>
  Full Width Button
</DefaultButton>
```

### Disabling

Buttons can be disabled.
If given the disabled attribute, a button will be functionally disabled, but will look unchanged.
If given the disabled class, a button will be functionally disabled, and will also change visually.

```jsx
::title=Disabling
<div>
    <div>
        <button className="btn btn-default" disabled type="button" aria-label="button">
        Disabled Functionally
        </button>
    </div>
    <br/>
    <div>
        <button className="btn btn-default disabled" type="button" aria-label="button">
        Disabled Visually
        </button>
    </div>
    <br/>
    <div>
        <button className="btn btn-default-alt disabled" type="button" aria-label="button">
        Alt Disabled
        </button>
    </div>
    <br/>
    <div>
        <button className="btn disabled" type="button" aria-label="button">
        Flat Disabled
        </button>
    </div>
    <br/>
    <div>
        <button className="btn btn-primary disabled" type="button" aria-label="button">
        Primary Disabled
        </button>
    </div>
</div>
```

### Icons

```jsx
::title=Buttons can contain icons
<div>
<PrimaryButton icon={<Icon src="add"/>}>
 Some button
</PrimaryButton>

<DefaultButton alt icon={<Icon src="spinner-sm"/>}>
 Loading
</DefaultButton>
</div>
```

```jsx
::title=They can also be icon buttons
<DefaultButton alt iconOnly>
  <Icon src="add"/>
</DefaultButton>
```

### Side-by-Side Buttons

```jsx
::title=Side-by-Side
::description=Buttons side-by-side will be separated by a margin of `$base-unit`.
<div>
  <DefaultButton alt>
    Cancel
  </DefaultButton>
  <DefaultButton>
    Save
  </DefaultButton>
</div>
```

## Props

Property     | Required | Type    | Default | Description
-------------|----------|---------|---------|------------
alt          | no       | Boolean | false   | Whether to render as 'alternate' button
flat         | no       | Boolean | false   | Whether to render as a 'flat' button
href         | no       | String  |         | If specified, button clicks will redirect to this href
iconOnly     | no       | Boolean | false   | If specified, will render as an icon button
iconPosition | no       | String  |         | If specified, places the icon to the left or the right of the text and or children
large        | no       | Boolean | false   | Whether to render the button large
small        | no       | Boolean | false   | Whether to render the button small
fullWidth    | no       | Boolean | false   | Whether to render the button full width