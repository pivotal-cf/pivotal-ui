import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from './app';
import routes from './routes';

window.React = React;
window.ReactDOM = ReactDOM;

const cssRequireContext = require.context('pivotal-ui/css/', true, /\.scss/);
cssRequireContext.keys().map(cssRequireContext);

Object.values(routes).forEach(({pageMetadata}) => {
  if (!pageMetadata || !pageMetadata.reactPath) return;
  const componentPath = pageMetadata.reactPath.split('/').pop();
  const exported = require(`pivotal-ui/react/${componentPath}`);
  Object.entries(exported).forEach(([key, value]) => window[key] = value);
});

ReactDOM.render(<App/>, document.getElementById('root'));

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept('./app', () => {
      const NextApp = require('./app');
      ReactDOM.render(<AppContainer><NextApp/></AppContainer>, document.getElementById('root'));
    });
  }
}