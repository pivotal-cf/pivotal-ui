#!/usr/bin/env bash

set -ex

pushd library
    ./node_modules/.bin/gulp ci
popd
