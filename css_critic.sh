#!/usr/bin/env bash

set -ex

# check firefox is installed - comment out if you're not on Mac
ls /Applications/Firefox.app

source ./update_styleguide.sh

pushd styleguide
  ./node_modules/.bin/gulp css-critic
popd
