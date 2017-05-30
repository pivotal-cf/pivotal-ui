#!/usr/bin/env bash

set -ex

pushd library
  ./node_modules/.bin/gulp build
popd

pushd styleguide
  bundle
  yarn cache clean
  yarn --force
popd

