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
    yarn install --no-progress
    gulp build
popd

pushd styleguide_new
    yarn install --no-progress
    ./node_modules/.bin/webpack --config backend-webpack.config.babel.js
    ./node_modules/.bin/webpack --config frontend-webpack.config.babel.js
    npm run watch &

    sleep 30    # wait for compilation to happen
    ./node_modules/.bin/gemini $GEMINI_COMMAND --reporter flat --reporter html
popd

echo "Finished"