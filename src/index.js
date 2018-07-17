import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from './app';
import {BrowserRouter as Router} from 'react-router-dom';
import unified from 'unified';
import reactRenderer from 'remark-react';
import HeadingRenderer from './components/renderers/heading_renderer';
import PreRenderer from './components/renderers/pre_renderer';
import TableRenderer from './components/renderers/table_renderer';
import ImageRenderer from './components/renderers/image_renderer';
import LinkRenderer from './components/renderers/link_renderer';
import {getRoutes} from './helpers/routes_helper';

const processor = unified().use(reactRenderer, {
  sanitize: false,
  remarkReactComponents: {
    h1: HeadingRenderer(1),
    h2: HeadingRenderer(2),
    h3: HeadingRenderer(3),
    h4: HeadingRenderer(4),
    h5: HeadingRenderer(5),
    h6: HeadingRenderer(6),
    pre: PreRenderer,
    table: TableRenderer,
    img: ImageRenderer,
    a: LinkRenderer
  }
});

const requireFunc = require.context('../docs', true, /\.md$/);
const routes = getRoutes({processor, requireFunc});

window.React = React;
window.ReactDOM = ReactDOM;

const render = Component => <Router><Component {...{routes, location}}/></Router>;

ReactDOM.render(render(App), document.getElementById('root'));

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept('./app', () => {
      const NextApp = require('./app');
      ReactDOM.render(<AppContainer>{render(NextApp)}</AppContainer>, document.getElementById('root'));
    });
  }
}