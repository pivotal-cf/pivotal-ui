import React from 'react';
import ReactDOM from 'react-dom';
import routes from './routes';

const cssRequireContext = require.context('pivotal-ui/css/', true, /\.scss/);
cssRequireContext.keys().map(cssRequireContext);

window.React = React;
window.ReactDOM = ReactDOM;
Object.values(routes).forEach(({pageMetadata}) => {
  if (!pageMetadata || !pageMetadata.reactPath) return;
  const componentPath = pageMetadata.reactPath.split('/').pop();
  const exported = require(`pivotal-ui/react/${componentPath}`);
  Object.entries(exported).forEach(([key, value]) => window[key] = value);
});