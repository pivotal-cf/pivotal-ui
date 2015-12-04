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
var DefaultAltButton = require('pui-react-buttons').DefaultAltButton;
var LowlightButton = require('pui-react-buttons').LowlightButton;
var DangerButton = require('pui-react-buttons').DangerButton;
var HighlightButton = require('pui-react-buttons').HighlightButton;
var HighlightAltButton = require('pui-react-buttons').HighlightAltButton;
var UIButton = require('pui-react-buttons').UIButton;
```


Buttons use the button tag by default. If you'd like a link rather than a button, simply add an `href` attribute.

```react_example_table
<DefaultButton href="http://example.com">
  Default
</DefaultButton>
```

To make a button large, set the `large` property to true.

```react_example_table
<HighlightButton large={true}>
  Big Button
</HighlightButton>
```

To make a button full-width, set the `block` property to true.

```react_example
<DangerButton block={true} >
  Danger Zone
</DangerButton>
```

Specific button types.

```react_example_table
<DefaultButton>
  Default
</DefaultButton>

<DefaultAltButton>
  Default alternate
</DefaultAltButton>

<LowlightButton>
  Lowlight
</LowlightButton>

<DangerButton>
  Danger
</DangerButton>

<HighlightButton>
  Highlight
</HighlightButton>

<HighlightAltButton>
  Highlight alternate
</HighlightAltButton>
```

The base button renderer. You won't really interact with this directly.

```react_example_table
<UIButton>
  I'm a button
</UIButton>
```
*/
