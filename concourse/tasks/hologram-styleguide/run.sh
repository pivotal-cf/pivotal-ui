#!/bin/bash -e

cd pivotal-ui-development/library
yarn
gulp build

cd ../styleguide
bundle
yarn
gulp styleguide-build

gulp ci