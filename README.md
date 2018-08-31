[![NPM](https://nodei.co/npm/pivotal-ui.png?compact=true)](https://npmjs.org/package/pivotal-ui)

# Welcome to Pivotal UI

Pivotal UI is a collection of React components that are styled for the Pivotal brand. [Visit the live styleguide here.](http://styleguide.pivotal.io)

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

```jsx harmony
import React from 'react';
import {DefaultButton} from 'pivotal-ui/react/buttons';

class MyTestPage extends React.Component {
 constructor(props) {
   super(props);
   this.state = {showMessage: false};
 }

 showMessage() {
   this.setState({showMessage: true});
 }

 render() {
   return (
     <div className="container">
       <DefaultButton onClick={this.showMessage}>Show Message</DefaultButton>
       {this.state.showMessage ? <h1>Hello world!</h1> : null}
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

Please refer to our [contribution guidelines](https://styleguide.pivotal.io/contribute/index).

# Copyright Notice

Copyright 2018 Pivotal Software, Inc. All Rights Reserved.   
