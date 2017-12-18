[![NPM](https://nodei.co/npm/pivotal-ui.png?compact=true)](https://npmjs.org/package/pivotal-ui)

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
1. `npm install --save pivotal-ui`

### Usage

Javascript:

```
import React from 'react';
import {DefaultButton} from 'pivotal-ui/react/buttons';

class MyTestPage extends React.Component {
 getInitialState() {
   return {showMessage: false};
 }

 showMessage() {
   this.setState({showMessage: true});
 }

 render() {
   return (
     <div className="container">
       <DefaultButton onClick={this.showMessage}>Show Message</DefaultButton>
       { this.state.showMessage ? <h1>Hello world!</h1> : null }
     </div>
   );
 }
}

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

# Maintainers

See [MAINTAINERS.md](MAINTAINERS.md).

# Contributing

Please refer to our [contribution guidelines](https://github.com/pivotal-cf/pivotal-ui/blob/master/CONTRIBUTING.md)

# Copyright Notice

Copyright 2017 Pivotal Software, Inc. All Rights Reserved.
