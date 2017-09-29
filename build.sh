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

mkdir -p dist

cp public/* dist/
cp -R static dist/