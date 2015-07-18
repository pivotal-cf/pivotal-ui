# pivotal-ui
[![Build Status](https://travis-ci.org/pivotal-cf/pivotal-ui.svg)](https://travis-ci.org/pivotal-cf/pivotal-ui)


Pivotal UI includes Pivotal styles as well as Bootstrap CSS, OOCSS, FontAwesome icons fonts, and the Source Sans Pro Google Font in your project. This is everything you need to get started building UI at Pivotal.

To contribute, see the [contributing readme](CONTRIBUTING.md).

## Check it out!

[Visit the live styleguide](http://styleguide.pivotal.io)  


# Using Pivotal UI on your project (with React)

If you're ready to try PUI with React, follow these instructions!

***

**NB** - We're assuming that you have the following setup on your project:

  - **Browserify or Webpack** - Our React modules follow the CommonJS module
    pattern. You will need to use [Browserify](http://browserify.org/) or
    [Webpack](http://webpack.github.io/) to compile your javascript for use
    in the browser.

  - **A JSX transpiler** - It's easiest to write React code with [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html).
    You will need a transpiler to convert your JSX code into plain javascript
    for use in the browser. We recommend [Babel](https://babeljs.io/).

  - If these instructions don't make sense to you, don't worry! We're working
    on a sample project template that we'll publish soon :grin:

1. Make sure you have a package.json file. If you don't, run `npm init`, and
   select the default options.

1. Install [Dr. Frankenstyle](http://github.com/pivotal-cf/dr-frankenstyle).
   This tool looks at your dependencies (those added with --save, **NOT** 
   --save-dev), and compiles the CSS required by these packages.
   
   ```
   npm install --save-dev dr-frankenstyle
   ```

1. Install React, if you haven't already

   ```
   npm install --save-dev react
   ```

1. Install a PUI module for the components you need. No need to install
   additional CSS packages. Our React packages tell Dr. Frankenstyle what
   CSS is needed for each component.

   ```
   npm install --save pui-react-typography
   npm install --save pui-react-buttons
   ```

1. Run Dr. Frankenstyle to compile your CSS

   ```
   dr-frankenstyle <path-to-your-asset-build-folder>
   # writes to <path-to-your-asset-build-folder>/components.css
   ```

1. Add the compiled css to your html template

   ```html
   <!doctype html>
   <html>
     <head>
       <title>...</title>
       <script src="<path-to-your-project's-compiled-javascript-file>"></script>

       <link rel="stylesheet" href="<path-to-your-asset-build-folder>/components.css">

     </head>
     <body>
       <!-- ... -->
     </body>
   </html>
   ```

1. Write some React!

   Javascript:
   ```jsx
   var React = require('react');
   var DefaultH1 = require('pui-react-typography').DefaultH1;
   var PrimaryButton = require('pui-react-buttons').PrimaryButton;

   var MyTestPage = React.createClass({
     getInitialState: function() {
       return {showMessage: false};
     },
     
     showMessage: function() {
       this.setState({showMessage: true});
     },

     render: function() {
       return (
         <div className="container">
	   <PrimaryButton onClick={this.showMessage}>Show Message</PrimaryButton>
	   { this.state.showMessage ? <DefaultH1>Hello world!</DefaultH1> : null }
	 </div>
       );
     }
   });

   React.render(<MyTestPage />, document.getElementById('root'));
   ```

   HTML
   ```html
   <!-- ... -->
   <body>
     <div id="root"></div>
   </body>
   <!-- ... -->
   ```

1. Every time you install a new PUI React package, you will need to rerun
   Dr. Frankenstyle to update your compiled CSS.

   ```
   npm install --save pui-react-alerts
   dr-frankenstyle <path-to-your-asset-build-folder>
   ```

   If you're using gulp or grunt or some other task runner,
   look at the [Dr. Frankenstyle docs](http://github.com/pivotal-cf/dr-frankenstyle)
   for how to make this step part of your task workflow.

# Using Pivotal UI on your project (without React)

If you're not ready to try React, you can still use the HTML/CSS version of
Pivotal UI!

The prefered way to consume Pivotal UI is through NPM, even for Rails
projects. Using NPM to install PUI will ensure proper dependency management on
your project.

1. Make sure you have a package.json file. If you don't, run `npm init`, and
   select the default options.

1. Install [Dr. Frankenstyle](http://github.com/pivotal-cf/dr-frankenstyle).
   This tool looks at your dependencies (those added with --save, **NOT** 
   --save-dev), and compiles the CSS required by these packages.
   
   ```
   npm install --save-dev dr-frankenstyle
   ```

1. Install the Pivotal UI CSS modules

   ```
   npm install --save pui-css-all
   ```

   If you only want to include a few PUI components in your project, see the
   instructions below on [customizing your PUI build](#customizing-your-pui-build).

1. Install jQuery and bootstrap.js

   ```
   npm install --save-dev jquery
   npm install --save-dev bootstrap
   ```

   These installs must happen **after** you've installed the PUI module. This
   ensures you'll get the correct version of bootstrap js.

   **NB** - It's important that you install these modules with `--save-dev`,
   because we don't want Dr. Frankenstyle to pick up any CSS from these
   packages.

1. Run Dr. Frankenstyle to compile your CSS

   ```
   dr-frankenstyle <path-to-your-asset-build-folder>
   # writes to <path-to-your-asset-build-folder>/components.css
   ```

1. Add the css and javascript files to your html template

   ```html
   <!doctype html>
   <html>
     <head>
       <title>...</title>
       <link rel="stylesheet" href="<path-to-your-asset-build-folder>/components.css">
       <script src="<path-to-your-project's-root-folder>/node-modules/jquery/dist/jquery.js"></script>
       <script src="<path-to-your-project's-root-folder>/node-modules/bootstrap/dist/js/bootstrap.js"></script>
     </head>
     <body>
       <!-- ... -->
     </body>
   </html>
   ```

1. Write some CSS/HTML and enjoy!

   ```html
   <!-- ... -->
   <body>
     <div class="container">
       <h1 class="type-brand-1 em-high">Hello world!</h1>
     </div>
   </body>
   <!-- ... -->
   ```

1. Upgrade PUI frequently

   ```
   npm update pui-css-all
   dr-frankenstyle <path-to-your-asset-build-folder>
   ```

   **NB** - You must rerun Dr. Frankenstyle after you update PUI (or add any
   additional CSS module).

## Customizing your PUI build

If you don't want all of Pivotal UI, you can install only the modules you will
need. This will make your resultant CSS smaller! Let's say you're building an
app that only has typography and buttons.

1. Remove the `pui-css-all` module from your project.

   ```
   npm uninstall --save pui-css-all
   ```

1. Add the necessary PUI CSS modules. For this example

   ```
   npm install --save pui-css-typography
   npm install --save pui-css-buttons
   ```

   Use the styleguide to determine which modules you need to install. Each
   component contains module information at the beginning of its docs:

   ![Example of styleguide installation instructions](https://cloud.githubusercontent.com/assets/824157/8711815/22853a7a-2b0a-11e5-862a-a76488de81e8.png)

1. Rerun Dr. Frankenstyle

   ```
   dr-frankenstyle <path-to-your-asset-build-folder>
   ```

1. Every time you install a new PUI CSS package, you will need to rerun
   Dr. Frankenstyle.

   If you're using gulp or grunt or some other task runner,
   look at the [Dr. Frankenstyle docs](http://github.com/pivotal-cf/dr-frankenstyle)
   for how to make this step part of your task workflow.

# Legacy - Using PivotalUI on your project

If you really don't want to use NPM, you can use our compiled PUI monolith.
Be warned, you will have to manage updates and dependencies yourself.

1. [Download the latest release](https://github.com/pivotal-cf/pivotal-ui/releases).
1. Unzip the release archive and move the resulting directory into your project.
1. Link to the css file in your html template to include the styles.
1. Add a script tag to your html template to use the javascript.
1. Use the css classes (reference the [styleguide](https://github.com/pivotal-cf/pivotal-ui#styleguide) for examples and usage)

```html
<html>
  <head>
    <title>...</title>
    <link rel="stylesheet" href="/path/to/release/pivotal-ui.css">
    <script src="/path/to/release/pivotal-ui.js"></script>
  </head>
  <body>
    <p class='type-brand-1'>Hello, world!</p>
  </body>
</html>
```

You'll need to maintain the structure in the release directory to have fonts
and assets work properly. **Do not modify the release files directly**. If you
need a component and you cannot find it in the styleguide, write your own
styles and javascript separately. Doing so will make it easier to update to
newer versions.

# Using PivotalUI on your Rails project

If you're installing PivotalUI into a Rails project, you should unzip the
constituent files into a directory named `vendor/assets/pui-vX.X.X`.

In your `application.scss` file, add the line `@import "pivotal-ui-rails"`

In your `application.js` file, add the line `//= require pivotal-ui` as **the
very first** require declaration.

Lastly, in your application's `config/application.rb`, you'll need to add the
following to make sure all vendored files are properly compiled:

```
  config.assets.precompile << /\.(?:svg|eot|woff|ttf)\z/
```

# Including SCSS variables and mixins (optional, beta)

If you are building CSS using Sass, you can get pivotal-ui variables and mixins
from the [pui-css-variables-and-mixins](https://www.npmjs.com/package/pui-css-variables-and-mixins)
node module.

```
npm install --save pui-css-variables-and-mixins
```

Import the file and use the variables:

```scss
@import '<path-to-your-projects-node-modules>/pui-css-variables-and-mixins/pui-variables.scss';
@import '<path-to-your-projects-node-modules>/pui-css-variables-and-mixins/mixins.scss';

.bg-special {
  background-color: $brand-1;
}
```

# Contributing

If you want a feature added to Pivotal UI, or you've found a bug that needs fixing, please refer to our [contribution guidelines](https://github.com/pivotal-cf/pivotal-ui/blob/master/CONTRIBUTING.md).

## Highlights

When creating a pull request, make sure you rebase your branch against our code base (upstream).
Read our [Commit guidelines](https://github.com/pivotal-cf/pivotal-ui/blob/master/CONTRIBUTING.md#commit-guidelines)! We have a very specific syntax for our messages.

# Copyright Notice

Copyright 2015 Pivotal Software, Inc. All Rights Reserved.
