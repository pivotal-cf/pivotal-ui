#!/usr/bin/env bash -e

echo "git pulling with rebase"
git pull -r
gulp
git status

pushd styleguide
  yarn lint
  yarn test
popd

printf 'push commit(s)? [y/N]: '
read input
if [[ "$input" == "y" || "$input" == "Y" ]]; then
  git push
else
  echo "commit(s) not pushed"
fi
