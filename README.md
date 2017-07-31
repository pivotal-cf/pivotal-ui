# Welcome to Pivotal UI

[Build pipeline](https://wings.concourse.ci/teams/pivotalui/pipelines/pivotal-ui)

Pivotal UI is a collection of React components that are styled for the Pivotal brand. [Visit the live styleguide here.](http://styleguide.pivotal.io)

# Starting with Pivotal UI 

We've created two starter projects to help transitioning to Pivotal UI and React.

- If you want to quickly try out some Pivotal UI components, try [pivotal-cf/pui-starter-project](https://github.com/pivotal-cf/pui-starter-project)
- If you want to skip directly to building a full React application, try [pivotal-cf/react-starter](https://github.com/pivotal-cf/react-starter)

# Using Pivotal UI - React Components

### Environment

We assume your project has the following:

 - [node/npm](https://nodejs.org/en/)
 - A module loader such as [Webpack](http://webpack.github.io/) or [Browserify](http://browserify.org/) - Pivotal UI modules follow the CommonJS pattern
 - A JSX transpiler such as [Babel](https://babeljs.io/) - Pivotal UI components are written in JSX 
 - [React](https://facebook.github.io/react/) - Pivotal UI components are React components

### Install

1. `cd /path/to/your/web/assets`
1. `npm init`
1. `npm install --save pui-react-buttons`

### Usage

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

HTML:

```html
<html>
<body>
    <div id="root"></div>
    <script src="<path-to-your-project's-compiled-javascript-file>"></script>
</body>
</html>
```

# Using Pivotal UI - CSS Components

React is the recommended approach, but some elements are available in HTML/CSS:

1. `curl http://styleguide.pivotal.io/components.css> <path-to-your-asset-build-folder>/components.css`
1. Add the css and javascript files to your html template

    ```html
    <!doctype html>
    <html>
    <head>
        <link rel="stylesheet" href="<path-to-your-asset-build-folder>/components.css">
        <script src="<path-to-your-project's-root-folder>/node-modules/jquery/dist/jquery.js"></script>
        <script src="<path-to-your-project's-root-folder>/node-modules/bootstrap/dist/js/bootstrap.js"></script>
    </head>
    <body>
        <div class="container">
            <h1 class="type-brand-1 em-high">Hello world!</h1>
        </div>
    </body>
    </html>
    ```

# Using Pivotal UI - SCSS variables and mixins

If you are building CSS using Sass, you can get pivotal-ui variables and mixins
from the [pui-css-variables-and-mixins](https://www.npmjs.com/package/pui-css-variables-and-mixins)
node module:

1. `npm install --save pui-css-variables-and-mixins`
1. Use in your `.scss` files

    ```scss
    @import '<path-to-your-projects-node-modules>/pui-css-variables-and-mixins/pui-variables.scss';
    @import '<path-to-your-projects-node-modules>/pui-css-variables-and-mixins/mixins.scss';

    .bg-special {
      background-color: $brand-1;
    }
    ```

# Contributing

Please refer to our [contribution guidelines](https://github.com/pivotal-cf/pivotal-ui/blob/master/CONTRIBUTING.md)

# Copyright Notice

Copyright 2016 Pivotal Software, Inc. All Rights Reserved.
