const path = require('path')
const express = require('express')
const app = express()

app.get('/dist/:file', function(req, res) {
  const file = req.params['file']
  res.sendFile(path.join(`${__dirname}/dist/${file}`))
})

app.get('/', function(req, res) {
  res.sendFile(path.join(`${__dirname}/index.html`))
})

app.get('/:whatever', function(req, res) {
  res.sendFile(path.join(`${__dirname}/index.html`))
})

const port = process.env['PORT'] || '8000'
console.log(`listening on port ${port}`)
app.listen(port)