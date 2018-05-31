---
title: Buttons
cssPath: pivotal-ui/css/buttons
reactPath: pivotal-ui/react/buttons
reactComponents:
  - DefaultButton
  - PrimaryButton
  - DangerButton
  - BrandButton
---

## Description
Use buttons as triggers for actions that are used in forms, toolbars, and as stand-alone action triggers. Try to avoid the usage of buttons for navigation. The main difference between actions and navigation is that **Actions** are operations performed on objects, while **Navigation** refers to elements on the screen or view that take you to another context in the application. For **Navigation** consider simply using links.


The aria-label attribute will be populated with the button text, unless an aria-label value is explicitly supplied. Buttons side-by-side will be separated by a margin of `$base-unit`.

## Examples

### Color and Treatment
There are 3 main button color schemes: Default, Primary, Danger. There is also Brand, but this should only be used for marketing. For each color scheme there is the default style, an alt style (with inverted colors and a transparent background) and a flat style (alt with transparent borders). To use the alt style, set the `alt` prop, to use the flat style, use the `flat` prop.

```jsx
::title=Default button
<div>
    <DefaultButton>Default</DefaultButton>
    <DefaultButton alt>Default Alt</DefaultButton>
    <DefaultButton flat>Default Flat</DefaultButton>
</div>
```

```jsx
::title=Primary button
<div>
    <PrimaryButton>Primary</PrimaryButton>
    <PrimaryButton alt>Primary Alt</PrimaryButton>
    <PrimaryButton flat>Primary Flat</PrimaryButton>
</div>
```

```jsx
::title=Danger button
<div>
    <DangerButton>Danger</DangerButton>
    <DangerButton alt>Danger Alt</DangerButton>
    <DangerButton flat>Danger Flat</DangerButton>
</div>
```

```jsx
::title=Brand button
::description=This button color is only for marketing purposes. Pivotal products should refrain from using this button.
<div>
    <BrandButton>Brand</BrandButton>
    <BrandButton alt>Brand Alt</BrandButton>
    <BrandButton flat>Brand Flat</BrandButton>
</div>
```

```jsx
::title=Link vs button
::description=Buttons use the button tag by default. If you'd like a link rather than a button, simply add an `href` attribute.
<div>
  <DefaultButton>
    Button
  </DefaultButton>

  <DefaultButton href="http://example.com">
    Link
  </DefaultButton>
</div>
```


```jsx
::title=Sizing
::description=To change the size of the button, use the `large` or `small` property.
<div>
  <DefaultButton large>
    Big Button
  </DefaultButton>
  <DefaultButton>
  Default
  </DefaultButton>
  <DefaultButton small>
    Small Button
  </DefaultButton>
</div>
```

```jsx
::title=Full width button
::description=To make a button full width, set `fullWidth` to true
<DefaultButton fullWidth>
  Full Width Button
</DefaultButton>
```

```jsx
::title=Disabled
::description=If given the disabled attribute, a button will be functionally disabled, but will look unchanged. If given the disabled class, a button will be functionally disabled, and will also change visually.
<div>
  <DefaultButton disabled>
    Disabled Functionally
  </DefaultButton>

  <DefaultButton className="disabled">
    Disabled Visually
  </DefaultButton>

  <DefaultButton alt className="disabled">
    Alt Disabled
  </DefaultButton>

  <DefaultButton flat className="disabled">
    Flat Disabled
  </DefaultButton>

  <PrimaryButton className="disabled">
    Primary Disabled
  </PrimaryButton>
</div>
```

```jsx
::title=Icons
::description=Buttons can contain an icon with text or just an icon. `import {Icon} from 'pivotal-ui/react/iconography';`
<div>
  <PrimaryButton icon={<Icon src="add"/>}>
   Some button
  </PrimaryButton>
  <DefaultButton alt icon={<Icon src="spinner-sm"/>}>
   Loading
  </DefaultButton>
  <DefaultButton alt iconOnly>
    <Icon src="add"/>
  </DefaultButton>
</div>

```

## Installation & Usage

#### React
`npm install pivotal-ui --save`

`import {DefaultButton, PrimaryButton, DangerButton, BrandButton} from 'pivotal-ui/react/buttons';`

`import {Icon} from 'pivotal-ui/react/iconography';`

#### CSS Only
`npm install pivotal-ui --save`

`import 'pivotal-ui/css/buttons';`


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
