/*doc
---
title: Buttons
name: button_react
categories:
 - react_base_buttons
 - react_all
---

<code class="pam">
<img src="/styleguide/download.svg" width="16" height="16"/>
npm install pui-react-buttons --save
</code>

Import the subcomponents:

```
import {DefaultButton, PrimaryButton, DangerButton, BrandButton} from 'pui-react-buttons';
```

Buttons use the button tag by default. If you'd like a link rather than a button, simply add an `href` attribute.

```react_example_table
<DefaultButton>
  Button
</DefaultButton>

<DefaultButton href="http://example.com">
  Link
</DefaultButton>
```

## Styles

There are 3 main button color schemes: Default, Primary, Danger. There is also Brand, but this should only be used for marketing.

```react_example_table
<DefaultButton>
  Default
</DefaultButton>

<PrimaryButton>
  Primary
</PrimaryButton>

<DangerButton>
  Danger
</DangerButton>

<BrandButton>
  Brand
</BrandButton>
```

For each color scheme there is the default style, an alt style (with inverted colors and a transparent background) and a flat style (alt with transparent borders).
To use the alt style, set the `alt` prop, to use the flat style, use the `flat` prop

```react_example_table
<DefaultButton alt>
  Alt
</DefaultButton>

<DefaultButton flat>
  Flat
</DefaultButton>

<PrimaryButton alt>
  Primary Alt
</PrimaryButton>
```

## Sizing

To make a button large, set the `large` property to true, to make it small, set `small` to true.

```react_example_table
<PrimaryButton large>
  Big Button
</PrimaryButton>

<PrimaryButton small>
  Small Button
</PrimaryButton>
```
*/
