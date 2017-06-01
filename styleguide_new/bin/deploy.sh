#!/usr/bin/env bash
set -ex

if [ -z "$1" ]; then
    echo "Usage: bin/deploy.sh <password-to-cf>"
    exit 1
fi

cf api api.run.pivotal.io
cf auth pivotal-ui@pivotal.io $1
cf target -o pivotal -s pivotal-ui-staging

yarn cache clean
yarn install --no-progress
./node_modules/.bin/webpack --config ./backend-webpack.config.babel.js --progress -p
./node_modules/.bin/webpack --config ./frontend-webpack.config.babel.js --progress -p
rm yarn.lock
cf push