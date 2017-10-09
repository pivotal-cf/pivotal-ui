# Getting Started with Pivotal UI

## Starter Project

We've created two starter projects to help transitioning to Pivotal UI and React.

- If you want to quickly try out some Pivotal UI components, try [PUI Starter Project](https://github.com/pivotal-cf/pui-starter-project).
- If you want to skip directly to building a full React application, try [React Starter](https://github.com/pivotal-cf/react-starter).

Once you've played around with some examples and feel comfortable integrating into your project, jump to the next step below.

## Using Pivotal UI on your project (with React)

Using the React components is the recommended approach over CSS/HTML.

- Reusable, maintainable code that is more consistent.
- Variables for color provide meaning and context ("marketing-header1" vs "teal-23")
- Cross-browser and responsive issues are handled.

**However, you'll need to know a few more technologies.
If you don't know what React, Babel or a transpiler is, review the links below.**

- [React Overview](http://facebook.github.io/react/)
- [Babel](https://babeljs.io/)

Ensure that the following is set up on your project:

 - **node**

    ```
    brew install node
    ```
 - **node package manager**

    npm will be installed as part of node

 - **Webpack or Browserify** - Our React modules follow the CommonJS module
    pattern. Use [Webpack](http://webpack.github.io/) (recommended) or
    [Browserify](http://browserify.org/) to compile your javascript for use
    in the browser.

    We use [Gulp](http://gulpjs.com/) and [Webpack Stream](https://github.com/shama/webpack-stream).

 - **A JSX transpiler** - It's easiest to write React code with [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html).
    You will need a transpiler to convert your JSX code into plain javascript
    for use in the browser.

    We recommend [Babel](https://babeljs.io/).
    If you are using Webpack, you will also want [Babel Loader](https://github.com/babel/babel-loader)

    Getting Babel working can be complicated. To see a sample project with Babel integrated,
    look at [React Starter](https://github.com/pivotal-cf/react-starter) or [PUI Starter Project](https://github.com/pivotal-cf/pui-starter-project)

 - **React**
 
    ```
    npm install react react-dom --save-dev
    ```


Need help? Pair with an engineer on the Apps Manager/Pivotal UI team on how to set up Pivotal UI for use in your project.

### Install

1. Create a package.json file that will include the PUI modules you'll be using
    `npm init`

1. Install [PUI React Tools](http://github.com/pivotal-cf/pui-react-tools).
   This set of tools includes an asset pipeline for including css and svg assets in your JavaScript.
   Usage is somewhat complicated, [React Starter](http://github.com/pivotal-cf/react-starter) is a sample project with everything set up.

1. Install Pivotal UI:

    ```
    npm install --save pivotal-ui
    ```

1. Write some React!

    Javascript:
    
    ```
    import React from 'react';
    import {DefaultButton} from 'pivotal-ui/react/buttons';

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
    import 'pivotal-ui/css/alignment';
    import 'pivotal-ui/css/whitespace';
    ```

    These will be included in the built css artifact, in addition to any css internally required by your PUI React Components.

1. Use the asset pipeline from pui-react-tools.

In development mode, this will inject PUI css directly into your page.
In production mode, it will create a file called `components.css` as well as any fonts or images required by the css.
If you are using react-starter, you will need to add `components.css` to your `scripts` key in `application.json`.