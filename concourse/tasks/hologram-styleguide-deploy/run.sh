cd pivotal-ui-development/library
yarn
gulp build
cd ../styleguide

yarn
bundle
gulp styleguide-build
cf api api.run.pivotal.io
cf auth pivotal-ui@pivotal.io $CF_PASSWORD
cf target -o pivotal -s pivotal-ui-staging
cf push