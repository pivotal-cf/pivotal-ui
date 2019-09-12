---
title: Siteframe
cssPath: pivotal-ui/css/siteframe
reactPath: pivotal-ui/react/siteframe
reactComponents:
- Siteframe
---


The `Siteframe` component provides a template for your app. It is meant to take up the whole page.

It is comprised of a `Header` and `Sidebar`, both of which are optional. To include a `Header` and `Sidebar`, pass in `headerProps` and `sidebarProps` respectively.

The sidebar is not meant to be scrollable. To make the content in the body scrollable, wrap it in a container that has `overflow: auto` (example below).

To mark a sidebar link as active (highlighted with a green left border), set `active: true` on the link object given in `primaryLinks` or `secondaryLinks`.

```jsx
//title=With Sidebar and scrollable content
<div style={{position: 'relative', height: '350px'}}>
  <Siteframe {...{
    headerProps: {
      logo: <div className="ptl pbl pll" style={{fontSize: '40px'}}><Icon src="pivotal_ui_inverted" style={{fill: 'currentColor'}}/></div>,
      companyName: 'Pivotal',
      productName: 'Cloud Foundry'
    },
    sidebarProps: {
      primaryLinks: [{text: 'Home', active: true}, {text: 'About us'}],
      secondaryLinks: [{text: 'Docs'}, {text: 'Contact us'}],
      renderLink: ({text}) => <a href="#">{text}</a>
    }
  }}>
    <div className="bg-light-gray pal" style={{height: '100%', overflow: 'auto'}}>
      <Panel {...{title: 'Domains'}}>
        These are the domains.
      </Panel>
      <Panel {...{title: 'Domains', className: 'mtxl'}}>
        These are the domains.
      </Panel>
      <Panel {...{title: 'Domains', className: 'mtxl'}}>
        These are the domains.
      </Panel>
      <Panel {...{title: 'Domains', className: 'mtxl'}}>
        These are the domains.
      </Panel>
      <Panel {...{title: 'Domains', className: 'mtxl'}}>
        These are the domains.
      </Panel>
    </div>
  </Siteframe>
</div>
```

```jsx
//title=With Header and Sidebar
<div style={{position: 'relative', height: '350px'}}>
  <Siteframe {...{
    headerProps: {
      logo: <div className="ptl pbl pll" style={{fontSize: '40px'}}><Icon src="pivotal_ui_inverted" style={{fill: 'currentColor'}}/></div>,
      companyName: 'Pivotal',
      productName: 'Cloud Foundry'
    },
    sidebarProps: {
      primaryLinks: [{text: 'Home'}, {text: 'About us'}],
      secondaryLinks: [{text: 'Docs'}, {text: 'Contact us'}],
      renderLink: ({text}) => <a href="#">{text}</a>
    }
  }}>
    <div className="bg-light-gray pal" style={{height: '100%'}}>
      <Panel {...{title: 'Domains'}}>
        These are the domains.
      </Panel>
    </div>
  </Siteframe>
</div>
```

```jsx
//title=Header with custom content
<div style={{position: 'relative', height: '350px'}}>
  <Siteframe {...{
    headerProps: {
      logo: <div className="ptl pbl pll" style={{fontSize: '40px'}}><Icon src="pivotal_ui_inverted" style={{fill: 'currentColor'}}/></div>,
      companyName: 'Pivotal',
      productName: 'Cloud Foundry',
      cols: [
        <FlexCol>
          <input placeholder="Search"/>
        </FlexCol>,
        <FlexCol fixed>
          <select>
            <option>Option one</option>
            <option>Option two</option>
          </select>
        </FlexCol>
      ]
    }
  }}>
    <div className="bg-light-gray pal" style={{height: '100%'}}>
      <Panel {...{title: 'Domains'}}>
        These are the domains.
      </Panel>
    </div>
  </Siteframe>
</div>
```

```jsx
//title=Header only
<div style={{position: 'relative', height: '350px'}}>
  <Siteframe {...{
    headerProps: {
      logo: <div className="ptl pbl pll" style={{fontSize: '40px'}}><Icon src="pivotal_ui_inverted" style={{fill: 'currentColor'}}/></div>,
      companyName: 'Pivotal',
      productName: 'Cloud Foundry'
    }
  }}>
    <div className="bg-light-gray pal" style={{height: '100%'}}>
      <Panel {...{title: 'Domains'}}>
        These are the domains.
      </Panel>
    </div>
  </Siteframe>
</div>
```

## Props

### Siteframe Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
`children` | no  | Any      | | The content to put inside the siteframe body
`headerProps` | no  | object   | | The props to pass into `Header`. If not provided, no `Header` will be rendered.
`sidebarProps` | no  | object   | | The props to pass into `Sidebar`. If not provided, no `Sidebar` will be rendered.

### Header Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
`className` | no  | String      | | Additional className, added alongside className `pui-siteframe-header`
`cols` | no  | Any      | `[]` | Array of `FlexCol`'s to include to the right of company/product name.
`companyName` | yes  | node   | | Name of company
`logo` | no  | node   | `null` | Content to the left of company name.
`productName` | yes  | node   | | Name of product. This will appear in bold.

### Sidebar Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
`className` | no  | String      | | Additional className, added alongside className `pui-siteframe-sidebar`
`primaryLinks` | yes  | Array      | | Array of objects (representing a link) to be passed into `renderLink` function. Appears at the top of the sidebar. If an object has property `active: true`, it will be styled as an active link.
`secondaryLinks` | no  | Array      | `[]` | Array of objects (representing a link) to be passed into `renderLink` function. Appears at the bottom of the sidebar. If an object has property `active: true`, it will be styled as an active link.
`renderLink` | yes  | Function      | | Function that will be called with each link object as an argument. Should return a node representing how to render that link.