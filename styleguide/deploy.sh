#!/usr/bin/env bash

set -e

STYLEGUIDE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
PUI_DIR="${STYLEGUIDE_DIR}/.."

pushd $PUI_DIR
  if [[ -n $(git status -s) ]]; then
    echo "uncommitted changes detected; bailing out"
    popd
    exit
  fi

  yarn

  pushd $STYLEGUIDE_DIR
    yarn
    yarn build --prefix-paths
  popd

  CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
  CURRENT_SHA="$(git rev-parse HEAD)"
  COMMIT_MSG="$(echo -e "build & deploy\n\nbranch: $CURRENT_BRANCH\nsha: $CURRENT_SHA")"

  git checkout gh-pages

  rm -rf docs
  mkdir -p docs

  mv styleguide/public/* docs
  git add -N docs
  git add docs

  git commit \
    --no-verify \
    --author "pivotal-ui-bot <pivotal-ui@pivotal.io>" \
    --message "${COMMIT_MSG}"

  git push

  git clean -df
  git checkout -
popd
