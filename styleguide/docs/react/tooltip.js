/*doc
---
title: Tooltips
name: tooltips_react
categories:
- react_base_tooltips
- react_all
---

<code class="pam">
<img src="/styleguide/download.svg" width="16" height="16"/>
npm install pui-react-tooltip --save
</code>

## Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
content        | yes | Element *                                 |          | Content
tooltipContent | yes | Node                                      |          | Tooltip content
position       | no  | oneOf(['left', 'right', 'bottom', 'top']) | top      | Tooltip position relative to content
trigger        | no  | oneOf(['hover', 'click'])                 | hover    | What to trigger on
clickHideDelay | no  | Number                                    | 1000     | How long (in milliseconds) to wait before hiding after click
onEnter        | no  | Func                                      | () => {} | Callback fired when tooltip is shown
onExit         | no  | Func                                      | () => {} | Callback fired when tooltip is hidden
theme          | no  | oneOf(['light', 'dark'])                  | dark     | Theme of tooltip background and text
size           | no  | oneOf(['auto', 'sm', 'md', 'lg'])         | auto     | Size of the tooltip

* See [React proptype definitions here](https://facebook.github.io/react/docs/typechecking-with-proptypes.html)

## Basic usage

Import the subcomponents:

```
import {Tooltip} from 'pui-react-tooltip';
```

Tooltips are used to display extra information on hover.

```react_example
<div>
  <Tooltip content={<button>Hover over me</button>} tooltipContent="Some tooltip" />
  <Tooltip content={<button>Click me</button>} tooltipContent="Some tooltip" trigger="click" />
</div>
```

*/
