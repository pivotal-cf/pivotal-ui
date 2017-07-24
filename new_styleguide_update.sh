#!/usr/bin/env bash

set -ex

pushd library
  rm -rf node_modules
  #yarn cache clean
  yarn install --no-progress
  gulp build
popd

pushd styleguide_new
  rm -rf node_modules
  #yarn cache clean
  yarn install --no-progress
  ./node_modules/.bin/webpack --config ./backend_webpack.config.babel.js --progress -p
  ./node_modules/.bin/webpack --config ./frontend_webpack.config.babel.js --progress -p
popd
