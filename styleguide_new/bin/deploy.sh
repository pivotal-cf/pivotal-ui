#!/usr/bin/env bash
set -ex

if [ -z "$1" ]; then
    echo "Usage: bin/deploy.sh <password-to-cf>"
    exit 1
fi

TMP_DEPLOY_DIR=/tmp/deploy_styleguide

rm -rf $TMP_DEPLOY_DIR || true

cf api api.run.pivotal.io
cf auth pivotal-ui@pivotal.io $1
cf target -o pivotal -s pivotal-ui-staging
npm install
npm prune
./node_modules/.bin/webpack --progress -p

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