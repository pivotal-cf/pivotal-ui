#!/usr/bin/env bash

rm -rf pui-dist
pushd ../pivotal-ui
  yarn install --no-progress
  gulp build
  mv dist ../pui-styleguide/pui-dist
popd

rm -rf node_modules
yarn cache clean
yarn --no-progress

rm -rf dist
./node_modules/.bin/webpack --config ./backend_webpack.config.babel.js --progress -p
./node_modules/.bin/webpack --config ./frontend_webpack.config.babel.js --progress -p

npm run watch