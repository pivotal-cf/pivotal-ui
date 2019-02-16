#!/usr/bin/env bash -e

echo "git pulling with rebase"
git pull -r
gulp
yarn test
yarn lint

git status

pushd styleguide
  yarn test
popd

printf 'push commit(s)? [y/N]: '
read input
if [[ "$input" == "y" || "$input" == "Y" ]]; then
  git push
else
  echo "commit(s) not pushed"
fi
