#!/usr/bin/env bash

set -ex

pushd styleguide
  eval $@
popd
