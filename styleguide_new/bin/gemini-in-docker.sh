#!/usr/bin/env bash

# RUN ME IN A DOCKER CONTAINER
# because font DPI is different in headless ubuntu from headed mac osx

set -ex

service dbus restart
xvfb-run chromedriver --port=4444 --url-base=wd/hub &

PIVOTAL_UI_LOCATION=$1
cd $PIVOTAL_UI_LOCATION

pushd library
    rm -rf node_modules
    npm i
    gulp build
popd

pushd styleguide_new
    rm -rf node_modules
    npm i
    ./node_modules/.bin/webpack --config backend-webpack.config.babel.js
    ./node_modules/.bin/webpack --config frontend-webpack.config.babel.js
    npm run watch &
    echo "About to sleep"
    sleep 30 # wait for compilation to happen
    echo "Sleep finished, testing"
    ./node_modules/.bin/gemini test --reporter flat --reporter html
    echo "Test finished"
popd