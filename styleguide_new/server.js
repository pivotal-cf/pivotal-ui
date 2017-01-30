const path = require('path')
  , express = require('express')
  , app = express()
  , React = require('react')
  , ReactDOMServer = require('react-dom/server')
  , SideBar = require('./src/components/Sidebar').default

app.get('/dist/:file', function(req, res) {
  const file = req.params['file']
  res.sendFile(path.join(`${__dirname}/dist/${file}`))
})

app.get('/', function(req, res) {
  res.send(renderPage())
})

app.get('/:whatever', function(req, res) {
  res.send(renderPage())
})

const port = process.env['PORT'] || '8000'
console.log(`listening on port ${port}`)
app.listen(port)

function renderPage() {
  const SideBarFactory = React.createFactory(SideBar)
  const sideBar = ReactDOMServer.renderToString(SideBarFactory())

  return  `
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
    `
}