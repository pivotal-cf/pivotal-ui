#!/bin/bash

function build_styleguide() {
  local major_version
  major_version=$1

  pushd pivotal-ui/styleguide > /dev/null
    bundle install
    npm install node-sass
    gulp styleguide-build

    rm -rf old_styleguides/${major_version}
    find build/  -type d -maxdepth 1 -mindepth 1 | grep 'build/[0-9]*$' | while read line; do rm -rf  $line ; done
    cp -r build/ older_styleguides/${major_version}
  popd > /dev/null
}

build_styleguide