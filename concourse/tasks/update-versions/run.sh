#!/bin/bash
set -ex

function update_versions() {
  pushd pivotal-ui/styleguide > /dev/null
    pushd docs > /dev/null

      # remove ` (latest)` string
      line_number=`grep -nr "latest" other-versions.scss  | cut -d':' -f 1`
      modified_file=/tmp/modified-versions.scss
      sed 's/ (latest)//g' other-versions.scss > $modified_file
      latest_version_number=`sed ${line_number}'!d' $modified_file | grep -Eo '([0-9]+)'`

      # replace `"/"` with `"/$latest_version_number"`
      sed "s/\"\/\"/\"\/"$latest_version_number"\"/g" $modified_file > /tmp/tmp-top

      head -n $line_number /tmp/tmp-top > /tmp/top
      cat <<EOF > /tmp/bottom
</ul>
*/
EOF

     next_version_number=$((latest_version_number+1))
     echo "  <li><a href=\"/\">Version ${next_version_number} (latest)</a></li>" > /tmp/text_to_insert
     cat /tmp/top /tmp/text_to_insert /tmp/bottom > $modified_file

     mv $modified_file other-versions.scss
    popd > /dev/null
  popd > /dev/null
}

function add_and_commit() {
  version=`cat semver/version`
  pushd pivotal-ui > /dev/null
    git add styleguide/docs/other-versions.scss
    git config --global user.email "cf-apps-manager@pivotal.io"
    git config --global user.name "apps-manager"

    git commit -m "Update other-versions.scss with major bump to v${version}"
  popd > /dev/null
}

function move_pivotal_ui_to_output() {
  cp -r pivotal-ui updated-pivotal-ui
}

function main() {
  update_versions
  add_and_commit
  move_pivotal_ui_to_output
}

main