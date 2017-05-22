#!/usr/bin/env bash

# RUN ME IN A DOCKER CONTAINER
# because font DPI is different in headless ubuntu from headed mac osx

PIVOTAL_UI_LOCATION=$1
GEMINI_COMMAND=$2

set -ex

service dbus restart
xvfb-run chromedriver --port=4444 --url-base=wd/hub &

cd $PIVOTAL_UI_LOCATION

pushd library
    rm -rf node_modules
    yarn install
    gulp build
popd

pushd styleguide_new
    rm -rf node_modules
    yarn install
    ./node_modules/.bin/webpack --config backend-webpack.config.babel.js
    ./node_modules/.bin/webpack --config frontend-webpack.config.babel.js
    npm run watch &

    sleep 30 # wait for compilation to happen
    ./node_modules/.bin/gemini $GEMINI_COMMAND --reporter flat --reporter html
popd

echo "Finished"