# Icons

***This component is limited to projects that use Webpack.***
***It requires the webpack loaders babel-loader and react-svg-loader.***

## Description

We use custom SVG icons, available at [http://pivotalicons.cfapps.io](http://pivotalicons.cfapps.io).
We recommend using the React Iconography component if you are using icons. We do provide all icons as SVGs
inside of the pui-css-iconography node module (inside `node_modules/pui-css-iconography/svgs/`).
If you are not using JavaScript and would like to use a Pivotal UI Icon,
you can copy these SVGs directly, either with an img tag or as inlined SVG.

When styling the SVGs, remember to use the `fill` or `stroke` attributes instead of `color`.
Wrapping the SVG or img tag in the `.icon` class will allow you to size and align the icon easily as presented in the
example below.

## Examples

```jsx
::title=SVG example
::description=An SVG wrapped with `.icon` can inherit the font size of the element above it, be sized by a type modifier class, or be passed a font size directly.
<div>
  <Icon src="help" />
</div>
```

```jsx
::title=Baseline
::description=Align SVG to baseline with `.icon-baseline` modifier class.
<h1>
  <div>
  Example
    <Icon src="help" verticalAlign="baseline" />
  </div>
</h1>
```

```html
::title=Image Example
::description=Wrap an image tag with `.icon` to get the same sizing functionality.
<span>Example 1<div class="icon">
  <img src="/static/cf-logo.png">
</div>.
</span>
<br>
<span>Example 2 with baseline
<div class="icon icon-baseline">
  <img src="/static/cf-logo.png">
</div>.
</span>
```

```jsx
::title=Spinner
::description=Spinner behavior is determined by size. Note that the large spinner moves relatively slowly, whereas the small spinner moves more quickly and dramatically.  In all cases, the base height and width is 1em and is meant to be overwritten with a font-size attribute. The font sizes provided here are meant as suggestions.
<div className="grid txt-c">
  <div className="col col-top">
    <div className="mbl"><code>.spinner-lg</code></div>
    <Icon style={{'font-size': '96px'}} src="spinner-lg" />
  </div>
  <div className="col col-top">
    <div className="mbl"><code>.spinner-md</code></div>
    <Icon style={{'font-size': '48px'}} src="spinner-md" />
  </div>
  <div className="col col-top">
    <div className="mbl"><code>.spinner-sm</code></div>
    <Icon style={{'font-size': '16px'}} src="spinner-sm" />
  </div>
</div>
```

## Installation & Usage

#### React
`npm install babel-loader react-svg-loader --save-dev`

`npm install pui-react-iconography --save`

#### CSS Only
`npm install pui-css-iconography --save`

## Props

Icon

Property           | Required | Type                               | Default  | Description
-------------------|----------|------------------------------------|----------|------------
src                | yes      | String                             |          | The name if the icon
style              | no       | Object                             |          | Styles to apply
verticalAlign      | no       | oneOf(['middle', 'baseline'])      | 'middle' | Vertical Alignment
