---
title: Getting Started with Pivotal UI
---

To get started using Pivotal UI with Create React App (CRA), follow these steps:

1. Install the latest version of Node LTS. [See here for instructions.](https://docs.npmjs.com/getting-started/installing-node)

2. Create a new CRA project with this command:
```
npx create-react-app some-directory
```

At this point, you'll be able to start up the default CRA app locally:
```
cd some-directory
yarn start
```

For more information on Create React App, see the [CRA readme](https://github.com/facebook/create-react-app).

3. Install the `pivotal-ui` node module:

```
yarn add pivotal-ui
```

4. Open `src/App.js` and replace the contents with:

```
import React, { Component } from 'react';
import {DefaultButton} from 'pivotal-ui/react/buttons';

export default class App extends Component {
  render() {
    return <DefaultButton>Click Me</DefaultButton>;
  }
}
```

## Using Pivotal UI CSS only

Our compiled css is available at `http://d2bsvk2etkq8vr.cloudfront.net/pui-css/pui-components-<VERSION>.css`.

For example, styles for `14.0.0` is available at http://d2bsvk2etkq8vr.cloudfront.net/pui-css/pui-components-14.0.0.css

## Unit testing with Jasmine

- Install pui-react-tools, `yarn add --dev pui-react-tools`

- Install gulp@next (Make sure its version is ^4.0.0), `yarn add --dev gulp@next`

- Install babel-core and babel-polyfill, `yarn add --dev babel-core babel-polyfill`

- Install puppeteer, `yarn add --dev puppeteer`

- Install jquery, `yarn add --dev jquery`

- Install spy-on-render, `yarn add --dev spy-on-render`

- Install jasmine_dom_matchers, `yarn add --dev jasmine_dom_matchers`

- Create a `.babelrc` file in your project root
```
{
  "presets": [["es2015", {"loose": true}], "react"]
}
```

- Create gulpfile.babel.js to install the jasmine task with a webpack config

```
import {Jasmine} from 'pui-react-tools';
import 'babel-polyfill';

Jasmine.install({
  webpack: {
    test: () => {
      return {
        devtool: 'cheap-module-source-map',
        module: {
          rules: [
            {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader', query: {presets: ['react']}},
            {test: /css$/, loader: 'css-loader'},
            {test: /svg$/, loader: 'file-loader'}
          ]
        },
        output: {filename: '[name].js'},
        watch: true
      }
    }
  },
  appGlobs: ['src/*.test.js'],
  headlessServerOptions: {
    includeStackTrace: true,
    random: false,
    isVerbose: false,
    port: 8888,
    driver: 'chrome'
  },
  headlessSpecRunnerOptions: {profile: true},
});
```

- Create a `spec_helper.js` that imports necessary dependencies and sets up tests
```
import $ from 'jquery';
import 'jasmine_dom_matchers';
import ReactDOM from 'react-dom';
import 'spy-on-render';

Object.assign(global, {
  $,
  jQuery: $,
  ReactDOM
});

beforeEach(() => {
  $('body').find('#root').remove().end().append('<main id="root"/>');
});

afterEach(() => {
  ReactDOM.unmountComponentAtNode(root);
});
```

- Import `spec_helper.js` in your test file. Render into root and assert against jquery selectors.

```
import React from 'react';
import App from './App';
import 'path/to/spec_helper';

describe('app', () => {
  beforeEach(() => {
    spyOnRender(App).and.callThrough();
    ReactDOM.render(<App/>, root);
  });

  it('renders without crashing', () => {
    expect('.App').toExist();
    expect(App).toHaveBeenRenderedWithProps({});
  });
});
```

- Run `gulp jasmine` and go to localhost:8888

## Linting

- Install pui-react-tools, `yarn add --dev pui-react-tools`

- Install gulp@next (Make sure its version is ^4.0.0), `yarn add --dev gulp@next`

- Create a `.babelrc` file in your project root
```
{
  "presets": [["es2015", {"loose": true}], "react"]
}
```

- Create gulpfile.babel.js to install the link task

```
import {Jasmine} from 'pui-react-tools';
Lint.install({globs: ['src/**/*.js']});
```

- Create an .eslintrc file, see the [pivotal-ui example](https://github.com/pivotal-cf/pivotal-ui/blob/master/.eslintrc)

## Sass

Please refer to the [create-react-app docs](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-css-preprocessor-sass-less-etc)
