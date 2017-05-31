#!/usr/bin/env bash

set -ex

pushd library
  gulp build
popd

pushd styleguide_new
  rm -rf node_modules
  yarn cache clean
  yarn install --no-progress
  ./node_modules/.bin/webpack --config ./backend-webpack.config.babel.js --progress -p
  ./node_modules/.bin/webpack --config ./frontend-webpack.config.babel.js --progress -p
popd
