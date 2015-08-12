# Core Team Docs

## Environments

- Staging: [http://styleguide-staging.cfapps.io](http://styleguide-staging.cfapps.io) - org: pivotal, space: pivotal-ui-staging
- Production: [http://styleguide.pivotal.io](http://styleguide.pivotal.io) - org: pivotal, space: pivotal-ui
- Playground (environment where we can push whatever we want): [http://styleguide-tacos.cfapps.io](http://styleguide-tacos.cfapps.io) - org: pivotal, space: pivotal-ui-playground

## External PR Signature

In order to clearly communicate that we are all on the same team with the same needs for pui projects, use the following signature (updated with the current team, alphabetized):

The Pivotal UI Team  
@atomanyih @ctaymor @d-reinhold @kennyw12 @matt-royal @nicw @stubbornella

## External PR Flow
When this happens | Do these
------------------|-----------------------
Start story       | Tag story with the name of the external project
Pull request made | Finish story, add a link to PR, and move story to the external PR section of PivotalTracker
Pull request merged in by external team | Rebase dist branch against upstream master, switch package dependency to dist branch, create chore to check for package publichation, deliver story
Package published | Switch package dependency away from dist to newest published version, mark chore complete

## Internal PR Flow

![](http://i.imgur.com/qXhdAPn.png)

## New member checklist

- Add to github, google group, tracker, etc.
- Add new member's NPM login to the publish helper in `tasks/helpers/publish-helper.js`

## Setting up your environment

See the [contribution guidelines](https://github.com/pivotal-cf/pivotal-ui/blob/master/CONTRIBUTING.md#setting-up-your-environment)
for detailed instructions.

## CI

We use [Travis CI](https://travis-ci.org/pivotal-cf/pivotal-ui).

## Deploying the styleguide

The staging styleguide deploys automatically when your changes are merged into
master on github and all the tests go green on Travis CI.  The production
styleguide deploys as part of the release process (see below).

## New components

Contributors will write new components to the `alpha` folder. Once we merge in the
PRs, it is our responsibility to properly package the new components.

1. Ensure that there is an appropriate example in the README, and that all
   dependencies are listed in the component's `package.json`
3. Ensure that there is an example in the styleguide
10. Move files from the `alpha` folder into a new folder. The folder and the
    main content file should have the same name. I.e., if the team created a
    Tacos component, make the scss file `tacos/tacos.scss` and the js file
    `tacos/tacos.js`.
1. It can be helpful to set the version number in the `package.json` files to `0.0.1`
   so there is room to fix any errors after first publishing the module
6. Publish the module to NPM (see below)
-1. Add the newly published component as a dependency in the top-level `package.json`.
q. Add new css modules as dependencies to the `all` css component.
8. Require/export any new react components in `src/pivotal-ui/javascripts/components.js`.

### Publishing new modules

Our release helper will automatically update the versions of current modules.
If you create a new CSS or React component, you will have to publish the modules
to NPM manually.

First, make sure you are logged into NPM in the terminal

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

## Setting up a new pairing station:

If your machine was imaged for you on Mavericks, you need to start from the beginning, even though you might not think so.
A machine that starts on Mavericks and upgrades to Yosemite is likely to have installation problems (e.g. You cannot install Nokogiri).

### Verify that your machine is connected to the cloud foundry wired network.
  1. To check, go system preferences -> network and check if your IP falls in 10.80.-.-
    1. If not, send an ask ticket requesting that your machine be put on the Cloud Foundry wired network. They will want machine name and MAC address.

### Boot into network drive
  1. Start up machine while holding down the 'option' key, there should be a network drive available. You may have to wait a little for it to show up.

### Image your machine
  1. Select the pristine Yosemite image (even if it says only for Abhi and Kam) and begin imaging process.
  2. Wait for a while, play some ping pong. It will restart a few times.

### Run Sprout-Wrap
  1. Follow the Readme instructions at https://github.com/pivotal-cf/sprout-wrap
    1. You will need to install xcode, and open it up to accept the agreement
      1. This requires an Apple account. You can get the account ID from an existing computer in the App Store under the 'account' quick link. The password is the 8th oldest Pivotal pairing station password but with the first letter capatilized. If this is not helpful enough send an ask ticket requesting the credentials for apple account access.
    2. In step 4 of the Readme, there is no private key under Volumes. You need to 'ssh-keygen' and then add the new key to your github account
    3. After you have added the ssh-key, you will need to clone something from github (any repo) to confirm github as a host.
    4. In step 6, cd into the 'cf-jarvice-ui' folder in sprout-wrap and run 'soloist'
  2. You will run soloist multiple times. Just keep running it unless you get the same error message twice in a row. You will need to run soloist about 5 times most likely.

### Configure Webstorm
  1. Go to Preferences -> Editor -> Colors and Fonts -> Font and change the font size to 16.
  2. Go to Preferences -> Editor -> Code Style and change tab/indent/continuation indent sizes to 2 for JavaScript/css/scss/html/JSON, and anything else that is needed.
  3. Go to Preferences -> Languages & Frameworks -> JavaScript and set the javascript language version to JSX Harmony.
  4. Copy https://github.com/pivotal/pivotal_ide_prefs/blob/master/pref_sources/RubyMine/templates/jasmine.xml    into     ~/Library/Preferences/WebStorm10/templates/jasmine.xml
    This will give you Jasmine live templates after you restart Webstorm.
  5. Adding a hot key for swapping between test and implementation code
    1. git clone xray
    2. roughly follow the directions from http://pivotallabs.com/swapping-javascript-spec-implementation-rubymine/
      1. Use the script xray/scripts/open_spec_or_impl.sh instead of step 1 in the blog post
      2. Use Webstorm instead of Rubymine
      3. After going to RubyMine -> Preferences -> External Tools -> + in step 2 of the blog post, set 'Working Directory' to $ProjectFileDir$ and uncheck the 'open console' box.
