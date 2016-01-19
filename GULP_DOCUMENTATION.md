If you add/change any gulp tasks, please document them here

# Library tasks

| Task            | Description                                                         |
|-----------------|---------------------------------------------------------------------|
| `dev` (default) | starts the development sandbox server    |
| `ci` | runs linter and tests |
| `build` | builds css and react packages for the styleguide |

## Publishing/Release tasks
| Task            | Description                                                         |
|-----------------|---------------------------------------------------------------------|
| `css-publish` | For publishing **ONLY** new components to NPM. Usage: `gulp css-publish --component <COMPONENT_NAME>`. See [core team docs](CORE_TEAM_DOCS.md) for more info. |
| `react-publish` | For publishing **ONLY** new components to NPM. Usage: `gulp react-publish --component <COMPONENT_NAME>`. See [core team docs](CORE_TEAM_DOCS.md) for more info. |
| `release-prepare` | Updates package versions, generates the changelog, and generates a new release folder. See [core team docs](CORE_TEAM_DOCS.md) for more info. |
| `release-commit` | Generates a release commit. See [core team docs](CORE_TEAM_DOCS.md) for more info. |
| `release-push` | Pushes/publishes new release. It generates a new tag, a github release and publishes new package version to NPM. See [core team docs](CORE_TEAM_DOCS.md) for more info. |

# Styleguide tasks
| Task            | Description                                                         |
|-----------------|---------------------------------------------------------------------|
| `dev` (default) | starts the development styleguide server    |
| `ci` | runs linter and tests |
| `css-critic`                      | Runs CSSCritic visual regression tests |

## Publishing/Release tasks
| Task            | Description                                                         |
|-----------------|---------------------------------------------------------------------|
| `push-styleguide` | Pushes production styleguide. |

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
| `vendor-package` | Allows contributors to create a vendored version of a PUI component. Useful if the team has a PR in limbo. See [PR guidlines](CONTRIBUTING.md#pull-requests) for usage.  | `vendor-package.js` |
