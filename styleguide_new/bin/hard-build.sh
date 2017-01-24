#!/usr/bin/env bash

pushd ../library;
    rm -rf node_modules
    rm -rf dist
    npm install
    gulp build
popd;

rm -rf node_modules
npm install
./node_modules/.bin/webpack --progress