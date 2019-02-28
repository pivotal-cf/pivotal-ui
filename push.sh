#!/usr/bin/env bash -e

echo "git pulling with rebase"
git pull -r

yarn
pushd styleguide
  yarn
popd

yarn test
yarn lint

git status

printf 'push commit(s)? [y/N]: '
read input
if [[ "$input" == "y" || "$input" == "Y" ]]; then
  git push
else
  echo "commit(s) not pushed"
fi
