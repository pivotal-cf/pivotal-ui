#!/bin/bash -e

cd pivotal-ui-development/library
yarn
gulp build
gulp ci