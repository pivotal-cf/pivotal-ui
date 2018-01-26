#!/usr/bin/env bash

gulp update-changelog --trackerToken $(lpass show -G "Shared-Pivotal UI/pui-tracker-token" --notes)