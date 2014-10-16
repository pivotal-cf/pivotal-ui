#!/bin/sh

gem install bundle
bundle install
npm install
node_modules/gulp/bin/gulp.js ci --fatal

wget 'https://cli.run.pivotal.io/stable?release=linux64-binary&source=github' -O cf-cli.tgz
tar -xvf ./cf-cli.tgz
chmod +x ./cf
./cf login -u $PWS_USERNAME -p $PWS_PASSWORD -a https://api.run.pivotal.io -o pivotal -s pivotal-ui
./cf push -f manifest.yml
