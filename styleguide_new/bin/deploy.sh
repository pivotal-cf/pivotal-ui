#!/usr/bin/env bash
set -ex

TMP_DEPLOY_DIR=/tmp/deploy_styleguide

rm -rf $TMP_DEPLOY_DIR || true

cf login -a api.run.pivotal.io -o pivotal -s pivotal-ui-staging -u pivotal-ui@pivotal.io
npm install
npm prune
./node_modules/.bin/webpack --progress

mkdir -p $TMP_DEPLOY_DIR

for thing in package.json index.html manifest.yml dist server.js; do
    cp -R $thing $TMP_DEPLOY_DIR/$thing
done

pushd $TMP_DEPLOY_DIR
    sed "/file:/d" package.json > package.json2
    mv package.json2 package.json
    cf push
popd

rm -rf $TMP_DEPLOY_DIR