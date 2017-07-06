# Getting Started with Pivotal UI

## Starter Project

We've created two starter projects to help transitioning to Pivotal UI and React.

- If you want to quickly try out some Pivotal UI components, try [PUI Starter Project](https://github.com/pivotal-cf/pui-starter-project).
- If you want to skip directly to building a full React application, try [React Starter](https://github.com/pivotal-cf/react-starter).

Once you've played around with some examples and feel comfortable integrating into your project, jump to the next step below.

## Using Pivotal UI on your project (with React)

If you're ready to try PUI with React, follow these instructions!

Using the React components is the recommended approach over CSS/HTML because:

- You have reusable, maintainable code that is more consistent. (compare the React Tabs element to HTML version)
- Meaningful variables for color mean that you remember why you used a particular color ("marketing-header1" vs "teal-23")
- Cross-browser and responsive issues are handled for you.
- It's the future.

**However, you'll need to know a few more technologies. Not enough to write a PHD thesis, but mostly in case things go wrong.
If you don't know what React, Babel or a transpiler is, follow the links below and then return**

- [React Overview](http://facebook.github.io/react/)
- [Babel](https://babeljs.io/)

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

### Install

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
    const React = require('react');
    const {DefaultButton} = require('pui-react-buttons');

    class MyTestPage extends React.Component {
      constructor(props, context) {
        super(props, context);
        this.state = {showMessage: false};
      }

      showMessage() {
        this.setState({showMessage: true});
      }

      render() {
        return (
          <div className="container">
            <DefaultButton onClick={this.showMessage.bind(this)}>Show Message</DefaultButton>
            { this.state.showMessage ? <h1>Hello world!</h1> : null }
          </div>
        );
      }
    }

    ReactDOM.render(<MyTestPage />, document.getElementById('root'));
    ```
    
    HTML:

    ```
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

## Using Pivotal UI on your project (without React)

React is the recommended approach (see reasons above), but some elements are available in HTML/CSS.
If you just want all of the Pivotal UI css right now, you can download
<a href=components.css download=components.css>components.css</a>.
Note that all assets (including fonts) are inlined into the css, creating a large file. This isn't 100% ideal, but is fine for most webistes.

The prefered way to consume Pivotal UI is through NPM, even for Rails
projects. Using NPM to install PUI will ensure proper dependency management on
your project.

1. Run `npm init` if you don't have a package.json file already.

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
    instructions below on [customizing your PUI build](#04_customize).

1. Install jQuery and bootstrap.js

    ```
   npm install --save-dev jquery
   npm install --save-dev bootstrap
    ```

    These installs must happen **after** you've installed the PUI module. This
    ensures you'll get the correct version of bootstrap js.

    **It's important that you install these modules with `--save-dev`,
    because we don't want Dr. Frankenstyle to pick up any CSS from these
    packages.**

1. Run Dr. Frankenstyle to compile your CSS to a folder (we use `./build/` but you can choose whatever makes sense for your project)

    ```
   dr-frankenstyle <path-to-your-asset-build-folder>
   # writes the compiled css to <path-to-your-asset-build-folder>/components.css
    ```

1. Add the css and javascript files to your html template. The css file is also available through our CDN, `http://d2bsvk2etkq8vr.cloudfront.net/pui-css/pui-components-8.1.0.css`

    ```
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

    ```
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

   **NB - You must rerun Dr. Frankenstyle after you update PUI (or add any
   additional CSS module).**
   
## Customizing your PUI build (without React)

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
    
## Including SCSS variables and mixins (optional)

If you are building CSS using Sass, you can get pivotal-ui variables and mixins
from the [pui-css-variables-and-mixins](https://www.npmjs.com/package/pui-css-variables-and-mixins)
node module.

```
npm install --save pui-css-variables-and-mixins
```

Import the file and use the variables:

```
@import '<path-to-your-projects-node-modules>/pui-css-variables-and-mixins/pui-variables.scss';
@import '<path-to-your-projects-node-modules>/pui-css-variables-and-mixins/mixins.scss';

.bg-special {
  background-color: $brand-1;
}
```