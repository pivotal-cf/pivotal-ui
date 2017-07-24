# Styleguide

### First time setup

1. install node `v7.10.0` or higher (through `nvm` or other means)
1. `brew install libpng`
1. `./bin/hard-build.sh` (fresh reset of project)

### Running

1. `yarn install`
1. `npm run watch`
1. Navigate to `localhost:8000`

### Deploying

1. `./bin/deploy.sh`

### Testing

1. install docker
1. run `./bin/test.sh`

or 

1. `./node_modules/.bin/selenium-standalone install` (only needed first time)
1. `./node_modules/.bin/selenium-standalone start` (in a separate process)
1. `./node_modules/.bin/gemini --reporter flat test`

Legitimate change? Update gemini mocks with:

1. `./node_modules/.bin/gemini --reporter flat update`