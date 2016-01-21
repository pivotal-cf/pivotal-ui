import React from 'react';
import ReactDom from 'react-dom';

let Sandbox = () => <h1>Create pivotal-ui/library/sandbox/sandbox.js</h1>;
try {
  Sandbox = require('./sandbox');
} catch (e) {

}

ReactDom.render(<Sandbox />, document.getElementById('root'));
