#!/usr/bin/expect

spawn fly -t wings login -c https://wings.concourse.ci -n pivotalui

expect {
    -re "fly_local_port=(\[0-9]+)" {
        set fly_local_port $expect_out(1,string)
    }
}

set url "https://wings.concourse.ci/auth/github?team_name=pivotalui&fly_local_port=$fly_local_port"
exec open "$url"

interact

spawn fly -t wings sync
