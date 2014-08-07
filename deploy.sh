#!/bin/sh

bundle install
npm install
grunt clean
grunt

wget 'https://cli.run.pivotal.io/stable?release=linux64-binary&source=github' -O cf-cli.tgz
tar -xvf ./cf-cli.tgz
chmod +x ./cf
./cf login -u $PWS_USERNAME -p $PWS_PASSWORD -a http://api.run.pivotal.io
./cf target -s pivotal-ui
./cf push -f manifest.yml
