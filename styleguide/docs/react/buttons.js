/*doc
---
title: Buttons
name: button_react
categories:
 - react_base_buttons
 - react_all
---

<code class="pam">
<i class="fa fa-download" alt="Install the Component">
npm install pui-react-buttons --save
</i>
</code>

Require the subcomponents:

```
var DefaultButton = require('pui-react-buttons').DefaultButton;
var HighlightButton = require('pui-react-buttons').HighlightButton;
var DangerButton = require('pui-react-buttons').DangerButton;
var SuccessButton = require('pui-react-buttons').SuccessButton;
var BrandButton = require('pui-react-buttons').Brand;
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

There are 4 main button color schemes: Default, Highlight, Danger, and Success. There is also Brand, but this should only be used for marketing.

```react_example_table
<DefaultButton>
  Default
</DefaultButton>

<HighlightButton>
  Highlight
</HighlightButton>

<DangerButton>
  Danger
</DangerButton>

<SuccessButton>
  Success
</SuccessButton>

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

<HighlightButton alt>
  Highlight Alt
</HighlightButton>

<SuccessButton flat>
  Success Flat
</SuccessButton>
```


## Sizing

To make a button large, set the `large` property to true, to make it small, set `small` to true.

```react_example_table
<HighlightButton large>
  Big Button
</HighlightButton>

<HighlightButton small>
  Small Button
</HighlightButton>
```

*/
