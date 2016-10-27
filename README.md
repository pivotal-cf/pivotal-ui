# Welcome to Pivotal UI
[![Build Status](https://snap-ci.com/pivotal-cf/pivotal-ui/branch/development/build_image)](https://snap-ci.com/pivotal-cf/pivotal-ui/branch/development)

Pivotal UI is a collection of React components that are styled for the Pivotal brand. Built on
top of Bootstrap and React, this library contains everything you need to get
started building UI at Pivotal.

# Table of Contents

- [Check it out!](#check-it-out)
- [Using Pivotal UI on your project (with React)](#using-pivotal-ui-on-your-project-with-react)
- [Using Pivotal UI on your project (without React)](#using-pivotal-ui-on-your-project-without-react)
- [Customizing your PUI build](#customizing-your-pui-build)
- [Including SCSS variables and mixins (optional)](#including-scss-variables-and-mixins-optional)
- [Contributing](#contributing)
- [Copyright Notice](#copyright-notice)

# Show me what it looks like!

[Visit the live styleguide](http://styleguide.pivotal.io)  

# Starting with Pivotal UI 

We've created two starter projects to help transitioning to Pivotal UI and React.

- If you want to quickly try out some Pivotal UI components, try [PUI Starter Project](https://github.com/pivotal-cf/pui-starter-project).
- If you want to skip directly to building a full React application, try [React Starter](https://github.com/pivotal-cf/react-starter).

Once you've played around with some examples and feel comfortable integrating into your project, jump to the next step below.


# Using Pivotal UI on your project (with React)

If you're ready to try PUI with React, follow these instructions!

Using the React components is the recommended approach over CSS/HTML because:

- You have reusable, maintainable code that is more consistent. (compare the React Tabs element to HTML version)
- Meaningful variables for color mean that you remember why you used a particular color ("marketing-header1" vs "teal-23")
- Cross-browser and responsive issues are handled for you.
- It's the future.

** However, you'll need to know a few more technologies. Not enough to write a PHD thesis, but mostly in case things go wrong.
If you don't know what React, Bootstrap, babel or a transpiler is, follow the links below and then return **

- [React Overview](http://facebook.github.io/react/) 
- [Bootstrap Overview](http://getbootstrap.com/)
- [Overall workflow](http://www.jayway.com/2015/03/04/using-react-with-ecmascript-6/)

Ready? We're assuming that you have the following setup on your project:

 - **node**

    ```
    brew install node
    ```
 - **node package manager**

    npm will be installed as part of node

 - **Webpack or Browserify** - Our React modules follow the CommonJS module
    pattern. You will need to use [Webpack](http://webpack.github.io/) (recommended) or
    [Browserify](http://browserify.org/) to compile your javascript for use
    in the browser.

    We use [Gulp](http://gulpjs.com/) and [Webpack Stream](https://github.com/shama/webpack-stream).

 - **A JSX transpiler** - It's easiest to write React code with [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html).
    You will need a transpiler to convert your JSX code into plain javascript
    for use in the browser. We recommend [Babel](https://babeljs.io/).
    If you are using Webpack, you will also want [Babel Loader](https://github.com/babel/babel-loader)

    Getting Babel working can be complicated. To see a sample project with Babel integrated,
    look at [React Starter](https://github.com/pivotal-cf/react-starter) or [PUI Starter Project](https://github.com/pivotal-cf/pui-starter-project)

 - **React**
 
    ```
    npm install react react-dom --save-dev
    ```

Seem overwhelming? It's time to talk with a front-end dev on the Pivotal team on how to hook this into your project.

##Install##

1. Create a package.json file that will include the PUI modules you'll be using
    `npm init`

1. Install [PUI React Tools](http://github.com/pivotal-cf/pui-react-tools).
   This set of tools includes an asset pipeline for including css and svg assets in your JavaScript.
   Usage is somewhat complicated, [React Starter](http://github.com/pivotal-cf/react-starter) is a sample project with everything set up.

1. Install a PUI module for the components you need. No need to install
   additional CSS packages for React components.

    For example, to create a button:

    ```
npm install --save pui-react-buttons
    ```

1. Write some React!

    Javascript:


    ```
    var React = require('react');
    var DefaultButton = require('pui-react-buttons').DefaultButton;

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
           <DefaultButton onClick={this.showMessage}>Show Message</DefaultButton>
           { this.state.showMessage ? <h1>Hello world!</h1> : null }
         </div>
       );
     }
    });

    ReactDOM.render(<MyTestPage />, document.getElementById('root'));
    ```

    HTML


    ```html
     <!-- ... -->
     <body>
       <div id="root"></div>

       <!-- Script tag should be below all DOM elements -->
       <script src="<path-to-your-project's-compiled-javascript-file>"></script>
     </body>
     <!-- ... -->
    ```

1. Require any css-only components in your javascript

```
require('pui-css-alignment');
require('pui-css-whitespace');
```

These will be included in the built css artifact, in addition to any css internally required by your PUI React Components.


1. Use the asset pipeline from pui-react-tools.

In development mode, this will inject PUI css directly into your page.
In production mode, it will create a file called `components.css` as well as any fonts or images required by the css.
If you are using react-starter, you will need to add `components.css` to your `scripts` key in `application.json`.



# Using Pivotal UI on your project (without React)

React is the recommended approach (see reasons above), but some elements are available in HTML/CSS

The prefered way to consume Pivotal UI is through NPM, even for Rails
projects. Using NPM to install PUI will ensure proper dependency management on
your project.

1. `npm install --save pui-css-all jquery bootstrap`
1. `cat node_modules/pui*/*.css > <path-to-your-asset-build-folder>/components.css`
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

# Including SCSS variables and mixins (optional)

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

If you want a feature added to Pivotal UI, or you've found a bug that needs
fixing, please refer to our [contribution
guidelines](https://github.com/pivotal-cf/pivotal-ui/blob/master/CONTRIBUTING.md).

## Highlights

When creating a pull request, make sure you rebase your branch against our code
base (upstream).  Read our [Commit
guidelines](https://github.com/pivotal-cf/pivotal-ui/blob/master/CONTRIBUTING.md#commit-guidelines)!
We have a very specific syntax for our messages.

# Copyright Notice

Copyright 2016 Pivotal Software, Inc. All Rights Reserved.
