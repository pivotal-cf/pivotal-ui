import React from 'react';
import ReactDOM from 'react-dom';
import Sandbox from './sandbox';

const req = require.context('pivotal-ui/css', true, /\.scss$/);
req.keys().forEach(req);

const root = document.getElementById('root');

ReactDOM.render(<Sandbox/>, root);

if (module.hot) {
  module.hot.accept('./sandbox', () => {
    const NextSandbox = require('./sandbox').default;
    ReactDOM.render(<NextSandbox/>, root);
  })
}