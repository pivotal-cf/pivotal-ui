#!/usr/bin/env bash

set -ex

pushd library
  gulp build
popd

pushd styleguide
  rm -rf node_modules/pui-*
  npm i --no-progress
popd

