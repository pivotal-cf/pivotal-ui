# Core Team Docs

## Deploying the styleguide

The styleguide deploys automatically when your changes are merged into master on github and all the tests go green on [Cloudbees](https://pivotal.ci.cloudbees.com/job/pivotal-ui-styleguide/). So, you won't need to do anything here.

Cloudbees will deploy to <http://styleguide.cfapps.io>.

### If you need to deploy manually (you most likely do not)

    $ cf push -f manifest.yml