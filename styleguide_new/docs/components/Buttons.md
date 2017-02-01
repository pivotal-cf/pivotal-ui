# Buttons
## Description
Use buttons as triggers for actions that are used in forms, toolbars, and as stand-alone action triggers. Try to avoid the usage of buttons for navigation. The main difference between actions and navigation is that **Actions** are operations performed on objects, while **Navigation** refers to elements on the screen or view that take you to another context in the application. For **Navigation** consider simply using links.

## Basic Usage
Import the subcomponents:

```
import {DefaultButton, PrimaryButton, DangerButton, BrandButton} from 'pui-react-buttons';
import {Icon} from 'pui-react-iconography';
```

Buttons use the button tag by default. If you'd like a link rather than a button, simply add an `href` attribute.

## Styles

### Color
There are 3 main button color schemes: Default, Primary, Danger. There is also Brand, but this should only be used for marketing.

### Alternate Treatment
For each color scheme there is the default style, an alt style (with inverted colors and a transparent background) and a flat style (alt with transparent borders). To use the alt style, set the `alt` prop, to use the flat style, use the `flat` prop.

### Sizing
To make a button large, set the `large` property to true, to make it small, set `small` to true.

```jsx
::title=Default Button
<DefaultButton>
  yo
</DefaultButton>
```

```jsx
::title=Primary Button
<PrimaryButton>
  hello world
</PrimaryButton>
```

```jsx
::title=Danger Button
<DangerButton>
  Danger
</DangerButton>
```

```jsx
::title=Brand Button
<BrandButton>
  Brand
</BrandButton>
```

## Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
alt   | no | Boolean                                        | false     | Whether to render as 'alternate' button
flat  | no | Boolean                                        | false     | Whether to render as a 'flat' button
href  | no | String                                         |           | If specified, button clicks will redirect to this href
large | no | Boolean                                        | false     | Whether to render the button large
small | no | Boolean                                        | false     | Whether to render teh button small
