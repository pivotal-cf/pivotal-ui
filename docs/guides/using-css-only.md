---
title: Using CSS only
---

For non-React projects, Pivotal UI's styles can be included in two different ways.

## With Webpack

For projects that are using Webpack and the [css-loader](https://github.com/webpack-contrib/css-loader), the CSS for each component can be imported directly into JavaScript files like this:

```jsx
import 'pivotal-ui/css/alerts';
```

See the documentation of individual components for how to import each one.

## With a link tag

For projects that are not using Webpack, our compiled CSS is made available via a CDN:

`http://d2bsvk2etkq8vr.cloudfront.net/pui-css/pui-components-<VERSION>.css`

For example, CSS for version 16.0.0 is available at http://d2bsvk2etkq8vr.cloudfront.net/pui-css/pui-components-16.0.0.css

These files can be included with a `<link>` tag in an HTML file like this:

```html
<link rel="stylesheet" href="http://d2bsvk2etkq8vr.cloudfront.net/pui-css/pui-components-16.0.0.css">
```

## Implementing components with only CSS

When only using CSS you'll have to re-create the DOM structure of our components and apply CSS classes to the correct elements.

Click "Show HTML" to to see how the React components render. Use this as a guide to re-create the structure.

```jsx
//title=Primary button
<PrimaryButton>Create Thing</PrimaryButton>
```
