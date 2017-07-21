import Express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import expressStaticGzip from 'express-static-gzip';

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

app.get('/', function(req, res) {
  res.redirect('getstarted');
});

app.get('/:versionID(\\d?)', function(req, res) {
  const url = `/static/versions/${req.params.versionID}`;
  res.redirect(url);
});

app.get('/:whatever', function(req, res) {
  res.send(renderPage());
});

const port = process.env['PORT'] || '8000';
console.log(`listening on port ${port}`);
app.listen(port);

function renderPage() {
  return ReactDOMServer.renderToString(
    <html>
      <head>
          <link href="./dist/app.css" type="text/css" rel="stylesheet"/>
          <script src="https://maps.googleapis.com/maps/api/js?libraries=places"/>
      </head>
      <body>
        <div id="root"/>
        <script src="./dist/bundle.js"></script>
      </body>
    </html>
  );
}