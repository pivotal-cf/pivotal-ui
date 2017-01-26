export const githubRepo = 'https://github.com/pivotal-cf/pivotal-ui'
export const githubBranch = "styleguide_new"

export const issueUrl = name => {
  return `${githubRepo}/issues/new?title=fix(${name})%3A%20description&body=**Steps%20to%20Reproduce**%0A%0A**Expected**%0A${name}%20should%20do%20this%0A%0A**Result**%0A${name}%20do%20not%20do%20this`
}