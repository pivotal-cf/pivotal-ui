import React from 'react';
import ReactDOM from 'react-dom';
import Sandbox from './sandbox';
import 'pivotal-ui/css/common/common.scss';
import 'pivotal-ui/css/typography/typography.scss';

const root = document.getElementById('root');

ReactDOM.render(<Sandbox/>, root);

if (module.hot) {
  module.hot.accept('./sandbox', () => {
    const NextSandbox = require('./sandbox').default;
    ReactDOM.render(<NextSandbox/>, root);
  })
}