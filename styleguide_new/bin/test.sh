#!/usr/bin/env bash

# LOCAL TEST SCRIPT

set -e

PIVOTAL_UI_LOCATION=/Users/pivotal/workspace/pivotal-ui
CONTAINER_NAME=pivotalui/concourse:v3
LOCAL_REPORT_LOCATION=/tmp/gemini-report
LOCAL_SCREENS_LOCATION=/tmp/gemini-updated-screens

## CLEANUP
function cleanup {
  RUNNING_CONTAINERS=`echo $(docker ps -a | grep $CONTAINER_NAME)`
  if [ -n "$RUNNING_CONTAINERS" ]; then
      echo "Stopping running containers $RUNNING_CONTAINERS"
      docker rm -f `docker ps -a | grep $CONTAINER_NAME | awk '{print $1}'`
  fi
}
trap cleanup EXIT

cleanup

## SETUP
echo "Starting container $CONTAINER_NAME"
docker run -d $CONTAINER_NAME tail -f /root/.bashrc 1>/dev/null # really hacky way to create a persistent container

CONTAINER_ID=`docker ps | grep $CONTAINER_NAME | awk '{print $1}'`
echo "Using container $CONTAINER_ID. You can manually attach with 'docker exec -it $CONTAINER_ID /bin/bash'"

## RUN
docker exec $CONTAINER_ID rm -rf /pivotal-ui
docker exec $CONTAINER_ID mkdir -p /pivotal-ui
docker cp $PIVOTAL_UI_LOCATION $CONTAINER_ID:/
echo `docker exec -it $CONTAINER_ID /pivotal-ui/styleguide_new/bin/gemini-in-docker.sh /pivotal-ui test`
docker cp $CONTAINER_ID:/pivotal-ui/styleguide_new/gemini-report $LOCAL_REPORT_LOCATION
echo "Your gemini report is located at $LOCAL_REPORT_LOCATION"
