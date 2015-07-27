If you add/change any gulp tasks, please document them here

# Development tasks

| Task            | Description                                                         | File found in  |
|-----------------|---------------------------------------------------------------------|----------------|
| `dev` (default) | Builds the styleguide + assets, starts a server, starts watchers    | `dev.js` |
| `monolith-serve` | Builds the styleguide + assets, starts a server. Uses port 8000, unless the env var STYLEGUIDE_PORT is set. (We set STYLEGUIDE_PORT when starting servers for CI/accessibility tests). | `monolith.js` |


## Less important development tasks

These live in `monolith.js`.

| Task                              | Description                |
|-----------------------------------|-----------------------------------------------------------------|
| `monolith`                        | Builds the styleguide + assets to the `build/` folder. |
| `monolith-hologram`               | Builds the styleguide html pages.           |
| `monolith-build-css-from-scratch` | Builds the css for the styleguide                 |
| `monolith-build-js`               | Builds the js for the non-react pages of the styleguide |
| `monolith-build-react-js` | " " "  " react pages " " "                              |
| `monolith-build-styleguide-css` | Builds styleguide (non-PUI) css |


# Test tasks

These live in `test.js`

| Task                              | Description                                                |
|-----------------------------------|------------------------------------------------------------|
| `ci`                              | All the things. Spins up all servers/built assets it needs |
| `lint`                            | Runs eslint                                                |
| `jasmine-task-helpers`            | Specs for the files in the `task/helpers` folder           |
| `rspec`                           | Don't use this task independently (expects server on port 9000). Use the `rspec` command to run feature tests by themselves (uses dev server on port 8000). |
| `css-critic`                      | Runs CSSCritic test                           |
| `jasmine-react`(`-ci`)            | Runs React component unit tests.                          |


# Tasks for accessibility

These live in `accessibility.js`.

**NB - Currently these tasks always exit 0. We'll need to change this when we're ready to make these tasks real CI tasks.**

| Task                              | Description                                                |
|-----------------------------------|------------------------------------------------------------|
| `accessibility-ci`         | All the accessibility things. Spins up all the servers/assets it needs. |
| `accessibility-react-a11y` | React A11Y tests. Can run against dev server (port 8000) or accessibility CI server. |
| `accessibility-a11y` | A11Y (ADT) tests. Can run against dev server or accessibility CI server. |


# Tasks for contributors

| Task            | Description                                                         | File found in  |
|-----------------|---------------------------------------------------------------------|----------------|
| `vendor-package` | Allows contributors to create a vendored version of a PUI component. Useful if the team has a PR in limbo. See [PR guidlines](https://github.com/pivotal-cf/pivotal-ui/blob/master/CONTRIBUTING.md#pull-requests) for usage.  | `vendor-package.js` |


# Tasks for publishing/releasing

| Task            | Description                                                         | File found in  |
|-----------------|---------------------------------------------------------------------|----------------|
| `css-build` | Builds all `pui-css-*` packages, ready for publishing. Packages live in the `dist/css` folder.  | `css-components.js` |
| `react-build` | Builds all `pui-react-*` packages, ready for publishing. " `dist/react` ".  | `react-components.js` |
| `release-prepare` | Generates a commit in preparation of the next commit. Updates package versions, generates the changelog, and generates a new release folder. See [core team docs](https://raw.githubusercontent.com/pivotal-cf/pivotal-ui/master/CORE_TEAM_DOCS.md) for more info. | `release-prepare.js` |
| `release-push` | Pushes/publishes new release. Some of this publishing is done by this task, and some is done by Travis CI. It generates a new tag, a github release, publishes new package version to NPM, and updates the production styleguide. See [core team docs](https://raw.githubusercontent.com/pivotal-cf/pivotal-ui/master/CORE_TEAM_DOCS.md) for more info. | `release-push.js` |

## Less important publishing tasks

| Task            | Description                                                         | File found in  |
|-----------------|---------------------------------------------------------------------|----------------|
| `release-zip` | Used by travis to create a release folder zip for the github release. | `release-travis.js` |
| `release-add-release-notes` | Used by travis to create release notes for the github release. | `release-travis.js` |
