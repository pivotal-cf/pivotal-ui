import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from './app';

window.React = React;
window.ReactDOM = ReactDOM;

ReactDOM.render(<App/>, document.getElementById('root'));

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept('./app', () => {
      const NextApp = require('./app');
      ReactDOM.render(<AppContainer><NextApp/></AppContainer>, document.getElementById('root'));
    });
  }
}