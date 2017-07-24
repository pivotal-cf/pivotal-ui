#!/usr/bin/env bash

pushd ../../pivotal-ui/library;
    rm -rf node_modules
    rm -rf dist
    yarn install --no-progress
    gulp build
popd;

rm -rf node_modules
yarn install --no-progress
./node_modules/.bin/webpack --progress