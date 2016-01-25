#!/usr/bin/env bash

set -ex

source ./update_styleguide.sh

pushd styleguide
  gulp
popd

