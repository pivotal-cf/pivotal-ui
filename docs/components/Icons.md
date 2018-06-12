---
title: Icons
menu: components
cssPath: pivotal-ui/css/iconography
reactPath: pivotal-ui/react/iconography
reactComponents:
  Icon:
    src: The name if the icon
    style: Styles to apply
    verticalAlign: Vertical alignment
---

# Overview

We provide a set of SVG icons, visible at [http://pivotalicons.cfapps.io](http://pivotalicons.cfapps.io).

When styling the SVGs, remember to use the `fill` or `stroke` attributes instead of `color`.
Wrapping the SVG or img tag in the `.icon` class will allow you to size and align the icon easily as presented in the
example below.

# Examples

```jsx
::title=SVG example
::description=Using the `Icon` component with the `src` prop inserts an SVG icon. It can inherit the font size of the element above it, be sized by a type modifier class, or be passed a font size directly.
<h1>
  <Icon src="account_circle"/>
</h1>
```

```jsx
::title=Baseline
::description=Align SVG to baseline with the `verticalAlign` property, which adds the `.icon-baseline` modifier class.
<h1>
  This has an icon <Icon src="chat" verticalAlign="baseline" />
</h1>
```

```html
::title=Image Example
::description=Wrap an image tag with `.icon` to get the same sizing functionality.
<span>Example 1<div class="icon">
  <img src="static/cf-logo.png">
</div>.
</span>
<br>
<span>Example 2 with baseline
<div class="icon icon-baseline">
  <img src="static/cf-logo.png">
</div>.
</span>
```

```jsx
::title=Spinner
::description=Spinner behavior is determined by size. Note that the large spinner moves relatively slowly, whereas the small spinner moves more quickly and dramatically.  In all cases, the base height and width is 1em and is meant to be overwritten with a font-size attribute. The font sizes provided here are meant as suggestions.
<div className="grid txt-c">
  <div className="col col-top">
    <div className="mbl"><code>.spinner-lg</code></div>
    <Icon style={{'fontSize': '96px'}} src="spinner-lg" />
  </div>
  <div className="col col-top">
    <div className="mbl"><code>.spinner-md</code></div>
    <Icon style={{'fontSize': '48px'}} src="spinner-md" />
  </div>
  <div className="col col-top">
    <div className="mbl"><code>.spinner-sm</code></div>
    <Icon style={{'fontSize': '16px'}} src="spinner-sm" />
  </div>
</div>
```
