const React = require('react');
const ReactDom = require('react-dom');

let Sandbox = () => <h1>Create pivotal-ui/library/sandbox/sandbox.js</h1>;
try {
  Sandbox = require('./sandbox');
} catch (e) {
  console.log('The sandbox could not be loaded', e);
}

ReactDom.render(<Sandbox />, document.getElementById('root'));
