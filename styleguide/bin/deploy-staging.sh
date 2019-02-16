#!/usr/bin/env bash
set -ex

if [ -z "$1" ]; then
    echo "Usage: bin/deploy.sh <password-to-cf> [appName]"
    exit 1
fi

appName=$2

if [ -z "$2" ]; then
    appName='styleguide-staging'
fi

cf api api.run.pivotal.io
cf auth pivotal-ui@pivotal.io $1
cf target -o pivotal -s pivotal-ui-staging

yarn install --no-progress
./node_modules/.bin/webpack --config ./backend_webpack.config.babel.js --progress -p
./node_modules/.bin/webpack --config ./frontend_webpack.config.babel.js --progress -p

cf push $appName
