#!/usr/bin/env bash -e

echo "git pulling with rebase"
git pull -r
gulp
git status
printf 'push commit(s)? [Y/n]: '
read input
if [[ "$input" == "n" || "$input" == "N" ]]; then
  echo "commit(s) not pushed"
  exit
fi
git push