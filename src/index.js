import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from './app';
import Router from './router';

let renderedApp;
const root = document.getElementById('root');

const {navigate} = Router.init((route, routeContent) => {
  renderedApp.setState({route, routeContent});
});

renderedApp = ReactDOM.render(<App {...{navigate}}/>, root);

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept('./app', () => {
      const NextApp = require('./app');
      renderedApp = ReactDOM.render(<AppContainer><NextApp {...{navigate}}/></AppContainer>, root);
    });
  }
}