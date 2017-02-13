#!/usr/bin/env bash

# RUN ME IN A DOCKER CONTAINER
# because font DPI is different in headless ubuntu from headed mac osx

set -ex

service dbus restart
xvfb-run chromedriver --port=4444 --url-base=wd/hub &

cd /pivotal-ui

pushd library
    rm -rf node_modules
    npm i
    gulp build
popd

pushd styleguide_new
    rm -rf node_modules
    npm i
    npm run watch &
    sleep 30 # wait for compilation to happen
    ./node_modules/.bin/gemini test --reporter flat --reporter html
popd