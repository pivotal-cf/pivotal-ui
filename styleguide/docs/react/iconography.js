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

## Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
src           | no | String                      |          | Name of the svg to load
style         | no | Object                      |          | React Style Object
verticalAlign | no | oneOf('middle', 'baseline') | 'middle' | Alignment of icon

## Basic usage

Import the subcomponent:

```
import {Icon} from 'pui-react-iconography';
```

Svgs do not render on the styleguide because it does a lot of work client-side.
In a normal application, this code would work.

```react_example_table
<Icon src="add"/>

<Icon src="check"/>
```

 Icons by default will be sized based on the local font size. You can override the size of the icon by changing the
 font-size in the style prop:

```react_example
 <Icon src="add" style={{fontSize: 100}}/>
```

Icons by default are vertically aligned 'middle'.
This should align with most html elements except for text.
Text in html has different alignment, so the default Icon alignment will look wrong.
To align an Icon with text, set `verticalAlign` to 'baseline'

```react_example
<div style={{fontSize: 24}}>
  <div><Icon src="add"/><div className="example-square"/><Icon src="check"/><div className="example-square"/> Icons with the default (middle) alignment next to divs</div>
  <div><Icon src="add"/>some text<Icon src="check"/> with with the default (middle) icon alignment</div>
  <div><Icon src="add" verticalAlign="baseline"/>some text<Icon src="check" verticalAlign="baseline"/> with baseline icon alignment</div>
</div>
```

Note that for the spinner icons (`spinner`, `spinner-md`, `spinner-sm`) we recommend:

- Spinner used for the 80px+ range. Loading a page front and center, nothing else displayed
- Spinner-md used for the 80px-25px range. Loading a panel or larger component
- Spinner-sm used for the 24px-10px range. Loading inside a button or form element

For a full list of available icons, go to [http://pivotalicons.cfapps.io](http://pivotalicons.cfapps.io).
*/
