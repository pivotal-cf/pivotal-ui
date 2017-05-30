#!/bin/bash -e

cd pivotal-ui/library
yarn
gulp build

cd ../styleguide
bundle
yarn
gulp styleguide-build

gulp ci