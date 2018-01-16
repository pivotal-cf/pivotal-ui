#!/usr/bin/env bash

gulp update-changelog --trackerToken $(lpass show -G "/pui-tracker-token" --notes)