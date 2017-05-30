#!/usr/bin/env bash

pushd ../library;
    rm -rf node_modules
    rm -rf dist
    yarn install
    gulp build
popd;

rm -rf node_modules
yarn install
./node_modules/.bin/webpack --progress