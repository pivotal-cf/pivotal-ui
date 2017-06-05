import Express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

import SideBar from './src/components/sidebar'

const app = Express();

app.get('/dist/:file', function(req, res) {
  const file = req.params['file'];
  const filepath = `${process.cwd()}/dist/${file}`;

  console.log(`Routing request ${file} to ${filepath}`);

  res.sendFile(filepath);
});

app.get('/', function(req, res) {
  res.send(renderPage());
});

app.get('/:whatever', function(req, res) {
  res.send(renderPage());
});

const port = process.env['PORT'] || '8000';
console.log(`listening on port ${port}`);
app.listen(port);

function renderPage() {
  const SideBarFactory = React.createFactory(SideBar);
  const sideBar = ReactDOMServer.renderToString(SideBarFactory());

  return `
    <html>
      <head>
          <link href="./dist/app.css" type="text/css" rel="stylesheet"/>
      </head>
      <body>
        <div id="root">
          <div id="app">${sideBar}</div>
        </div>
        <script src="./dist/bundle.js"></script>
      </body>
    </html>
  `;
}