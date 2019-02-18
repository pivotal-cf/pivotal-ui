---
title: Icons
reactPath: pivotal-ui/react/iconography
cssPath: pivotal-ui/css/iconography
reactComponents:
- Icon
---

Use the `Icon` component to insert one of Pivotal UI's SVG icons. The full list of icons that Pivotal UI provides, along with their names, can be found [here](/components/icons/icon_list).

To use an icon, specify the name of the icon as the `src` prop.

```jsx
//title=Icon examples
<div>
  <Icon src="react"/>
  <Icon src="account_circle"/>
  <Icon src="add_circle"/>
</div>
```

By default, the icons are quite small. They inherit the font size of their parent. This means they can be resized by, for example, wrapping them in an `<h1>` or explicitly setting a font size on the parent.

```jsx
//title=Larger icon examples
<div style={{fontSize: '48px'}}>
  <Icon src="react"/>
  <Icon src="account_circle"/>
  <Icon src="add_circle"/>
</div>
```

When styling the SVGs, use the `fill` or `stroke` attributes instead of `color`. These can be set directly on the `Icon` as a `style` prop or via CSS. A useful trick is to set `fill` to `currentColor`, so that the fill color is inherited from the text color of the icon's container.

```jsx
//title=Color icon examples
<div style={{fontSize: '48px', color: 'green'}}>
  <Icon src="react" style={{stroke: 'red'}}/>
  <Icon src="account_circle" style={{fill: 'currentColor'}}/>
  <Icon src="add_circle" style={{fill: 'blue'}}/>
</div>
```

Set the `verticalAlign` prop to `"baseline"` to align the icon to the text baseline.

```jsx
//title=Alignment with text
<h1>Exit <Icon src="exit_to_app" verticalAlign="baseline"/></h1>
```

Images can be used like icons by wrapping them in a container with the `icon` class.

```html
//title=Images as icons
<span class="h3">The following image is wrapped as an icon <div class="icon icon-baseline">
  <img src="/static/cf-logo.png">
</div>.
</span>
```

Pivotal UI provides three variations on the spinner icon, differing in their speed.

`spinner-lg` is the slowest, `spinner-md` is the default, and `spinner-sm` is the fastest. Use `spinner-md` in most cases.

```jsx
//title=Spinner icons
<div className="grid txt-c">
  <div className="col col-top">
    <div className="mbl"><code>spinner-lg</code></div>
    <Icon style={{'fontSize': '96px'}} src="spinner-lg"/>
  </div>
  <div className="col col-top">
    <div className="mbl"><code>spinner-md</code></div>
    <Icon style={{'fontSize': '48px'}} src="spinner-md"/>
  </div>
  <div className="col col-top">
    <div className="mbl"><code>spinner-sm</code></div>
    <Icon style={{'fontSize': '16px'}} src="spinner-sm"/>
  </div>
</div>
```

To use icons in buttons, see the [Buttons](/components/buttons/usage) page.

## Icon List

```jsx
//noToolbar
<TextFilter {...{
  className: 'mhl',
  filterPlaceholderText: 'Search icons...',
  data: Object.keys(Icons),
  emptyState: (
    <Grid className="border mtxl txt-c">
      <FlexCol className="paxl">No matching icons</FlexCol>
    </Grid>
  ),
  filter: (iconNames, filterText) => iconNames.filter(iconName => iconName.indexOf(filterText.toLowerCase()) > -1),
  renderFilteredData: iconNames => (
    <Grid className="border mtxl">
      {iconNames.map(iconName => {
        return (
          <FlexCol key={iconName} className="txt-c mvxxl" col={6} breakpoint="md">
            <Icon src={iconName} style={{fontSize: '48px'}}/>
            <pre className="pre-unstyled mtl">{iconName}</pre>
          </FlexCol>
        );
      })}
    </Grid>
  )
}}/>
```

## Props

Property           | Required | Type                               | Default  | Description
-------------------|----------|------------------------------------|----------|------------
`src`              | yes      | String                             |          | The name of the icon
`style`            | no       | Object                             |          | Styles to apply
`verticalAlign`    | no       | oneOf(['middle', 'baseline'])      | 'middle' | Vertical alignment
