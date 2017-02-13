#!/usr/bin/env bash

# RUN ME IN A DOCKER CONTAINER
# because font DPI is different in headless ubuntu from headed mac osx

set -ex

service dbus restart
xvfb-run chromedriver --port=4444 --url-base=wd/hub &

../node_modules/.bin/gemini test --reporter flat --reporter html