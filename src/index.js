import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from './app';
import {BrowserRouter as Router} from 'react-router-dom';

window.React = React;
window.ReactDOM = ReactDOM;

const render = Component => <Router><Component {...{location}}/></Router>;

ReactDOM.render(render(App), document.getElementById('root'));

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept('./app', () => {
      const NextApp = require('./app');
      ReactDOM.render(<AppContainer>{render(NextApp)}</AppContainer>, document.getElementById('root'));
    });
  }
}