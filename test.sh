#!/usr/bin/env bash

set -ex

cd library
gulp ci
cd ../styleguide
gulp ci
