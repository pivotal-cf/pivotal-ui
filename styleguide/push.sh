#!/usr/bin/env bash -e

yarn
echo "git pulling with rebase"
git pull -r
yarn lint
yarn test
git status
printf 'push commit(s)? [y/N]: '
read input
if [[ "$input" == "y" || "$input" == "Y" ]]; then
  git push
else
  echo "commit(s) not pushed"
fi
