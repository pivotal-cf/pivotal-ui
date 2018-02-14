#!/usr/bin/env bash

gulp update-changelog --trackerToken $(lpass show -G "Shared-frontend/pui-tracker-token" --notes)