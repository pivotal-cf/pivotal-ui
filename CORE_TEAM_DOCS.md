# Core Team Docs

## Setting up your environment

See the [contribution guidelines](https://github.com/pivotal-cf/pivotal-ui/blob/master/CONTRIBUTING.md#setting-up-your-environment) for detailed instructions.

## CI

We use [CloudBees](https://pivotal.ci.cloudbees.com/job/pivotal-ui-styleguide/) for CI.

![](http://media.giphy.com/media/ktZJlSaABbSOk/giphy.gif)

**Email:** labs-pivotal-ui@pivotal.io

## Deploying the styleguide

The styleguide deploys automatically when your changes are merged into master on github and all the tests go green on [Cloudbees](https://pivotal.ci.cloudbees.com/job/pivotal-ui-styleguide/). So, you won't need to do anything here.

Cloudbees will deploy to <http://styleguide.cfapps.io>.

### If you need to deploy manually (you most likely do not)

    $ cf push -f manifest.yml
