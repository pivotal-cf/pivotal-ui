# Styleguide

### First time setup

1. `./bin/hard-build.sh` (fresh reset of project)

### Running

1. `npm install`
1. `./node_modules/.bin/webpack --progress --watch`
1. `node server.js` (in a separate process)
1. Navigate to `localhost:8000`

### Deploying

1. `./bin/deploy.sh`

### Testing

1. `./node_modules/.bin/selenium-standalone install` (only needed first time)
1. `./node_modules/.bin/selenium-standalone start` (in a separate process)
1. `./node_modules/.bin/gemini --reporter flat test`

Legitimate change? Update gemini mocks with:

1. `./node_modules/.bin/gemini --reporter flat update`