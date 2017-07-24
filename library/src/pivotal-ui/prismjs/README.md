# pui-prismjs

A default build of [Prism](http://prismjs.com) for Pivotal UI.
This includes Prism and some common addons.

If you don't need all of the included languages/plugins and you would like a
smaller footprint, you can not use this package and roll your own!

## Included languages

- Bash highlighting
- C-like highlighting
- CSS highlighting (w/ extras)
- CoffeeScript highlighting
- Go highlighting
- HTTP highlighting
- Java highlighting
- JavaScript highlighting
- Markup highlighting
- PHP highlighting (w/ extras)
- Python highlighting
- Ruby highlighting
- SCSS highlighting

## Included plugins

- Line highlighting
- Line numbers

## Installation

To install the package, from the command line, type:

```
npm install pui-prismjs
```

## Usage

```js
require('pui-prismjs');
```

## Rolling your own

Install PrismJS:

```sh
npm install prismjs
```

Include the languages/plugins you need:

```js
require('prismjs');
require('prismjs/components/prism-ruby');
require('prismjs/plugins/line-highlight/prism-line-highlight');
/* ... */
```

*****************************************

This is a component of Pivotal UI. It is a Pivotal specific implementation of Bootstrap.

[Styleguide](http://styleguide.pivotal.io)
[Github](https://github.com/pivotal-cf/pivotal-ui)

(c) Copyright 2015 Pivotal Software, Inc. All Rights Reserved.
