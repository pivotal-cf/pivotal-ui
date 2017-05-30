#!/bin/bash -e

cd pivotal-ui/library
yarn
gulp build
gulp ci