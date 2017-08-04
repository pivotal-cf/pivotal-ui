# Core Team Docs

## Environments

- Staging: [http://styleguide-staging.cfapps.io](http://styleguide-staging.cfapps.io) - org: pivotal, space: pivotal-ui-staging
- Production: [http://styleguide.pivotal.io](http://styleguide.pivotal.io) - org: pivotal, space: pivotal-ui

## New member checklist

- Add to GitHub, ADT CLA google group, tracker, Google drive folder, and calendar invites (IPM, retro, standup)
- Add new member's NPM login to the publish helper in `tasks/helpers/publish-helper.js`
- Add to ~/.gitauthors file on all team computers

## Setting up your environment

See the [contribution guidelines](https://github.com/pivotal-cf/pivotal-ui/blob/master/CONTRIBUTING.md#setting-up-your-environment)
for detailed instructions.

## CI

We use [Concourse](https://wings.concourse.ci/teams/pivotalui/pipelines/pivotal-ui)

## New Components

Once we merge in a PR, it is our responsibility to properly publish new components.

1. Ensure that all dependencies are listed in the component's `package.json`.
1. Ensure that there is an example in the styleguide.
1. It can be helpful to set the version number in the `package.json` files to `0.0.1`
   so there is room to fix any errors after first publishing the module.
1. [Publish the module to NPM](#publishing-new-modules).
1. Add the newly published component as a dependency in the top-level `package.json`.
1. Add new css modules as dependencies to the `all` css component.

### Publishing new modules

Our release helper will automatically update the versions of current modules.
If you create a new CSS or React component, you will have to publish the modules
to NPM manually.

First, make sure you are logged into NPM in the terminal:

```
npm login
```

Then, do one of the following:

```
gulp css-publish --component <COMPONENT-NAME>
gulp react-publish --component <COMPONENT-NAME>
```

where `<COMPONENT-NAME>` is the name of the folder in `src/pivotal-ui/components/`
or `src/pivotal-ui-react/`.

Once you do this initial publishing, you never have to worry about this module
again.

## Creating a new release

1. Switch to `master` branch

1. Run `yarn`
1. Run `gulp release-prepare`. This will:
    - Automatically determine the type of release (patch, major, minor)
    - Update the version in `package.json`
    - Update the version in `package.json` for all changed pui modules, and all
    of their dependents.
    - Update `CHANGELOG.md` with auto-generated release notes
    - Update `LATEST_CHANGES.md` with auto-generated release notes for the most
    recent change only
    
1. Look over `LATEST_CHANGES.md` and clean up. Make sure any API changes are in the `breaking changes` section. Use the good version of `LATEST_CHANGES.md` as the new addition to `CHANGELOG.md`
   
1. Run `./test.sh` - one final check!

1. Run `gulp release-commit` to commit the release.

1. Run `gulp release-push-packages`. This will:
    - Creates a tag for the new version
    - Pushes version bump and new tag to GitHub
    - Publishes all of the updated node packages to npm

1. Merge `master` back into `development`
