---
title: Panels
cssPath: pivotal-ui/css/panels
reactPath: pivotal-ui/react/panels
reactComponents:
- Panel
---

Use a `Panel` to contain content that has a logical grouping. Panels always have either a `header` or a `title`.

Set the `title` or `header` prop to give a name to the panel. Use whichever is more appropriate for your application.

```jsx
//title=Panel with title
<div className="bg-light-gray pal">
  <Panel {...{title: 'Domains'}}>
    These are the domains.
  </Panel>
</div>
```

```jsx
//title=Panel with header
<div className="bg-light-gray pal">
  <Panel {...{header: 'Domains'}}>
    These are the domains.
  </Panel>
</div>
```

Use the footer for information that does not belong in the panel body.

```jsx
//title=Panel with header and footer
<div className="bg-light-gray pal">
  <Panel {...{header: 'Domains', footer: <a href="#">Click here for more info</a>}}>
    These are the domains.
  </Panel>
</div>
```

When the panel has associated calls-to-action, set the `titleCols` or `headerCols` prop to include buttons to the right of the panel name.

Because the panel is built on the `Grid` component, these buttons should be wrapped in `FlexCol` components.

```jsx
//title=Panel with call-to-action in title
<div className="bg-light-gray pal">
  <Panel {...{
    title: 'Domains',
    titleCols: [<FlexCol fixed><PrimaryButton>Add Domain</PrimaryButton></FlexCol>]
  }}>
    These are the domains.
  </Panel>
</div>
```

When including a button in a panel header, make it small to keep the panel header size the same.

```jsx
//title=Panel with call-to-action in header
<div className="bg-light-gray pal">
  <Panel {...{
    header: 'Domains',
    headerCols: [<FlexCol fixed><PrimaryButton small>Add Domain</PrimaryButton></FlexCol>]
  }}>
    These are the domains.
  </Panel>
</div>
```

When the panel has content loading, set the `loading` prop to add a loading indicator to the top of the panel body.

```jsx
//title=Panel with loading animation
<div className="bg-light-gray pal">
  <Panel loading={true} title="Apps">
    Loading apps...
  </Panel>
</div>
```

When using multiple panels that are related, the first panel should have a title that names the grouping. Each panel header should name its subgroups.

```jsx
//title=Multiple related panels
<div className="bg-light-gray pal">
  <Panel {...{title: 'Zoo animals', header: 'Mammals'}}>
    monkey, mouse
  </Panel>
  <Panel {...{header: 'Reptiles', className: 'mtxxl'}}>
    alligator, snake
  </Panel>
</div>
```

## Props

Property           | Required | Type    | Default | Description
-------------------|----------|---------|---------|------------
`bodyClassName`    | no       | String  |         | Class(es) to apply to the body
`className`        | no       | String  |         | Class(es) to apply to the panel container
`footer`           | no       | Node    |         | Node to render in the footer
`footerClassName`  | no       | String  |         | Class(es) to apply to the footer
`header`           | no       | String  |         | String to render in the header
`headerClassName`  | no       | String  |         | Class(es) to apply to the header
`headerCols`       | no       | Array   | []      | An array of nodes to render on the header row, each element should be wrapped in a `FlexCol`
`loading`          | no       | Boolean |         | If true, will render a pulsing loading bar
`panelClassName`   | no       | String  |         | Class(es) to apply to the area containing the header, body and footer
`title`            | no       | String  |         | String to render in the title
`titleClassName`   | no       | String  |         | Class(es) to apply to the title
`titleCols`        | no       | Array   | []      | An array of nodes to render on the title row, each element should be wrapped in a `FlexCol`
