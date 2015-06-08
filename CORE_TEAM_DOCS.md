# Core Team Docs

## Setting up your environment

See the [contribution guidelines](https://github.com/pivotal-cf/pivotal-ui/blob/master/CONTRIBUTING.md#setting-up-your-environment) for detailed instructions.

## CI

We use [Travis CI](https://travis-ci.org/pivotal-cf/pivotal-ui).

**Email:** labs-pivotal-ui@pivotal.io

## Deploying the styleguide

The styleguide deploys automatically when your changes are merged into master on github and all the tests go green on Travis CI.
So, you won't need to do anything here.

Travis will deploy to <http://styleguide.cfapps.io>.

### If you need to deploy manually (you most likely do not)

    $ cf push -f manifest.yml

## Creating a new release
1. Create a [github access token](https://help.github.com/articles/creating-an-access-token-for-command-line-use/).
(Be sure to copy it to your clipboard)

1. Make sure you are on master, and that you have no local changes.

1. Set the `RELEASE_TOKEN` environment variable to your github access token.
```
export RELEASE_TOKEN=<Your release token>
```

1. Run `gulp release`. This will:
  - Automatically determine the type of release (patch, major, minor)
  - Updates the version in `package.json`
  - Updates `CHANGELOG.md` with auto-generated release notes
  - Creates a tag for the new version
  - Pushes version bump and new tag to github
  - Creates `pui-vX.X.X.zip` in the root directory
  - Creates a draft github release with the auto-generated release notes
  - Uploads the `variables.scss` file to the release

1. In github, upload `pui-vX.X.X.zip` to the release.

1. Be sure to name the release an ice cream flavor.

1. When satisfied with the release notes, publish!

![](http://images2.fanpop.com/images/photos/3600000/Lucille-Animated-gif-arrested-development-3695222-275-155.gif)
