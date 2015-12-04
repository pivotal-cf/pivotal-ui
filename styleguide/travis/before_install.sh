#!/bin/sh

travis_retry bundle install
export DISPLAY=:99.0
sh -e /etc/init.d/xvfb start
