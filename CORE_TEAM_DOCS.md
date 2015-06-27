# Core Team Docs

## Environments

- Staging: [http://styleguide-staging.cfapps.io](http://styleguide-staging.cfapps.io) - org: pivotal, space: pivotal-ui-staging
- Production: [http://styleguide.pivotal.io](http://styleguide.pivotal.io) - org: pivotal, space: pivotal-ui

## Setting up your environment

See the [contribution guidelines](https://github.com/pivotal-cf/pivotal-ui/blob/master/CONTRIBUTING.md#setting-up-your-environment)
for detailed instructions.

## CI

We use [Travis CI](https://travis-ci.org/pivotal-cf/pivotal-ui).

## Deploying the styleguide

The staging styleguide deploys automatically when your changes are merged into
master on github and all the tests go green on Travis CI.  The production
styleguide deploys as part of the release process (see below).

## Creating a new release

1. Run `gulp release-prepare`. This will:
  - Automatically determine the type of release (patch, major, minor)
  - Updates the version in `package.json`
  - Updates the version in `package.json` for all changed pui modules, and all
    of their dependents.
  - Updates `CHANGELOG.md` with auto-generated release notes
  - Updates `LATEST_CHANGES.md` with auto-generated release notes for the most
    recent change only
  - Creates the `release/pui-vX.X.X` folder
  - Creates a commit with all these changes


1. If you want to bump the versions of all components, not just changed
   packages, run `gulp release-prepare --update-all` instead of the step above.

1. If you want to make any changes (e.g. add more docs to the changelog, modify
   a version number, etc.), do that now and make a new commit.

1. Run `gulp ci` - one final check!

1. Run `gulp release-push`. This will:
  - Creates a tag for the new version
  - Pushes version bump and new tag to github
  - Creates a draft github release with the auto-generated release notes
  - Publishes all of the updated node packages to npm

1. Be sure to name the release an ice cream flavor.

![](http://images2.fanpop.com/images/photos/3600000/Lucille-Animated-gif-arrested-development-3695222-275-155.gif)
