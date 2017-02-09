# Concourse

[pipeline](https://p-concourse.wings.cf-app.com/teams/system-team-pivotalui-pivui-d6f4/pipelines/pivotal-ui)

## Set pipeline

1. Install the [lastpass cli](https://github.com/lastpass/lastpass-cli)
1. Download fly from [concourse](https://p-concourse.wings.cf-app.com/teams/system-team-pivotalui-pivui-d6f4/pipelines/pivotal-ui)
1. `lpass login`
1. `fly -t wings login -c https://p-concourse.wings.cf-app.com -n system-team-pivotalui-pivui-d6f4`
1. `fly -t wings set-pipeline -c ./pipeline.yml -p pivotal-ui --load-vars-from <(lpass show --notes "Shared-Pivotal UI/concourse/credentials.yml")`

## Build dockerfile


##### Build

1. [Start docker machine](https://docs.docker.com/machine/)
1. `eval $(docker-machine env default)`
1. `docker build . -t pivotalui/concourse:v<NEXT_NUMBER>`

##### Run tests on docker image

```
docker run -it pivotalui/concourse /bin/bash
git clone https://github.com/pivotal-cf/pivotal-ui /pivotal-ui
cd /pivotal-ui/library
npm i
gulp build
gulp ci
cd ../styleguide
npm i
gulp styleguide-build
cd ../styleguide_new
npm i
./node_modules/.bin/webpack --config backend-webpack.config.babel.js --progress
./node_modules/.bin/webpack --config frontend-webpack.config.babel.js --progress
./node_modules/.bin/selenium-standalone install
./node_modules/.bin/selenium-standalone start &
./node_modules/.bin/gemini --reporter flat test
```

##### Publish

1. `docker login` (credentials are in lastpass)
1. `docker push pivotalui/concourse:v<SOME_NUMBER>`



