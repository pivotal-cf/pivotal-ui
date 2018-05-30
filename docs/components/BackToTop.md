# Back to top

## Description

(The extra loaders are for the [Iconography](/icons) component.)

You can use this component to scroll to the top of a page.

The button will be fixed to the bottom right hand corner of the page.

You can place the link anywhere in your markup, but best practices are either towards the top or bottom of your markup.

## Examples

```jsx
::title=Always visible example (see bottom right corner of your screen)
<div>
<BackToTop alwaysVisible scrollableId="content" />
</div>
```

## Installation & Usage

#### React
`npm install babel-loader react-svg-loader --save-dev`

`npm install pivotal-ui --save`

`import {BackToTop} from 'pivotal-ui/react/back-to-top';`

#### CSS Only
`npm install pivotal-ui --save`

`import 'pivotal-ui/css/back-to-top';`


## Props

Property       | Required | Type   | Default | Description
---------------|----------|--------|---------|------------
alwaysVisible  | no       | Boolen | false   | If `alwaysVisible` is not set, the component will only appear after the window has been scrolled.
scrollableId   | no       | String |         | If `scrollableId` is set, the component will update this element's scrollTop property. Otherwise, document.body will be scrolled.
