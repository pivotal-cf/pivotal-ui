/*doc
---
title: Iconography
name: iconography_react
categories:
 - react_base_iconography
 - react_all
---

***This component is limited to projects that use Webpack.***
***It requires the webpack loaders babel-loader and svg-react-loader.***

<code class="pam">
<img src="/styleguide/download.svg" width="16" height="16"/>
npm install pui-react-iconography --save

<img src="/styleguide/download.svg" width="16" height="16"/>
npm install babel-loader svg-react-loader --save-dev
</code>

Require the subcomponent:

```
var Icon = require('pui-react-iconography').Icon;
```

Svgs do not render on the styleguide because it does a lot of work client-side. In a normal application, this code would work.

```react_example_table
<Icon src="add"/>

<Icon src="check"/>
```

Icons by default will be sized based on the local font size. You can override the size of the icon with the style prop

```react_example
<Icon src="add" style={{width: 100, height: 100}}/>
```

Note that for the spinner icons (`spinner`, `spinner-md`, `spinner-sm`) we recommend:

- Spinner used for the 80px+ range. Loading a page front and center, nothing else displayed
- Spinner-md used for the 80px-25px range. Loading a panel or larger component
- Spinner-sm used for the 24px-10px range. Loading inside a button or form element

 Property           |  Type         | Description
 -------------      | --------------| --------------------------------------------------------------------------
 `src`       | String  | Name of the svg to load
 `style` | Object | React Style Object
 `verticalAlign` | Optional enum | Alignment of icon. Options: ['middle', 'baseline']. Defaults to 'middle' if nothing provided

For a full list of available icons, go to [http://pivotalicons.cfapps.io](http://pivotalicons.cfapps.io).

*/
