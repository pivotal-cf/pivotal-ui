import Express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import expressStaticGzip from 'express-static-gzip';

import routes from './src/helpers/content';

const app = Express();

app.use((req, res, next) => {
  const isDev = process.env.NODE_ENV === 'development';
  const isHttps = req.headers['x-forwarded-proto'] === 'https';

  if (isDev || isHttps) return next();

  res.writeHead(301, {location: `https://${req.headers.host}${req.url}`});
  res.end();
});

app.use("/dist", expressStaticGzip(`${process.cwd()}/dist`));

app.use("/static", expressStaticGzip(`${process.cwd()}/static`));

app.use('/robots.txt', (req, res) => res.send('Sitemap: https://styleguide.pivotal.io/sitemap.txt'));

app.use('/sitemap.txt', (req, res) => {
  res.type('text');
  res.send(Object.keys(routes).map(key => `https://styleguide.pivotal.io${key}`).join('\n'));
});

app.get('/', (req, res) => {
  res.redirect('getstarted');
});

app.get('/:versionID(\\d?)', (req, res) => {
  const url = `/static/versions/${req.params.versionID}`;
  res.redirect(url);
});

app.get('/:whatever', (req, res) => {
  res.send(renderPage());
});

const port = process.env['PORT'] || '8000';
console.log(`listening on port ${port}`);
app.listen(port);

function renderPage() {
  return ReactDOMServer.renderToString(
    <html>
      <head>
        <link rel='shortcut icon' type='image/x-icon' href='/static/favicon.ico' />
        <link href="./dist/app.css" type="text/css" rel="stylesheet"/>
      </head>
      <body>
        <div id="root"/>
        <script src="./dist/bundle.js"/>
      </body>
    </html>
  );
}