---
title: Getting started
weight: 10
---

Pivotal UI is Pivotal's design system. It aims to help Pivotal teams efficiently design and build apps and websites that look and feel consistent.

If you're brand new to Pivotal UI, start by reading the [FAQ](/about/faq) and the pages on [typography](/modifiers/typography), [colors](/modifiers/colors), the [8-point grid](/concepts/8-point-grid), and [accessibility](/concepts/accessibility). These will give an overview of the principles behind the design system.

The system is implemented as a Figma library, React components, and CSS styles that you can include in your project. To start using Pivotal UI, follow the steps below.

## For Designers 
###Using the Figma team library

If you're a designer looking to incorporate Pivotal UI into your designs, you can use the Figma team library by following the instructions in [this video](https://drive.google.com/open?id=1uTT_xn5t8L0w7CziG1vQA3rEoxvtpTSx). If you need access to the video, please reach out in the [#pivotal-ui Slack channel](https://pivotal.slack.com/messages/C055JEPQQ).

## For Developers 
###Installing from npm

The most common way to add Pivotal UI to your project is to use the [npm package](https://www.npmjs.com/package/pivotal-ui). The package includes all of Pivotal UI's CSS, Sass variables, and React components.

You will need to have Node installed. If you do not, [see here for instructions](https://docs.npmjs.com/getting-started/installing-node). Node comes with `npm` for managing dependencies, but you might prefer to use [Yarn](https://yarnpkg.com/). If you do not have an existing project, you can create one with `npm init` or `yarn init`.

We also assume that you are using a bundler like [Webpack](https://webpack.js.org/), which will allow you to import CSS directly into JavaScript files.

Once these are set up, install the `pivotal-ui` Node module in your project like this:

```bash
# if using npm:
npm install pivotal-ui

# if using yarn:
yarn add pivotal-ui
```

To use individual components, see the instructions on the pages for those components.


###Consuming CSS from a CDN

For projects that are not using npm or Webpack, like static sites built with [Hugo](https://gohugo.io/) or [Jekyll](https://jekyllrb.com/), our compiled CSS is made available via a CDN:

`http://d2bsvk2etkq8vr.cloudfront.net/pui-css/pui-components-<VERSION>.css`

For example, CSS for version 16.0.0 is available at http://d2bsvk2etkq8vr.cloudfront.net/pui-css/pui-components-16.0.0.css

These files can be included with a `<link>` tag in an HTML file like this:

```html
<link rel="stylesheet" href="http://d2bsvk2etkq8vr.cloudfront.net/pui-css/pui-components-16.0.0.css">
```