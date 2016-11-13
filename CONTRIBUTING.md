# Contributing

## I'd like to help, what can I do?

You can [report bugs](#bug-reports), work on [issues](https://github.com/pivotal-cf/pivotal-ui/issues), update existing
components, or create new ones. Feel free to [email us](mailto:pivotal-ui@pivotal.io) if you have further questions.

## Setting up your environment

1. Fork the project
1. Install tools
    1. ruby 2.1.2 (e.g. `rbenv install 2.1.2`)
    1. bundler (`gem install bundler`)
    1. node 4+ ([install instructions](https://nodejs.org/en/))
    1. gulp (`npm install gulp -g`)

## Build the projects

Pivotal UI is split into two projects:

- Library: components that are published to `npm`

    ```
    cd library
    npm install
    gulp build
    ```
- Styleguide: documentation and tools for building [styleguide.cfapps.io](http://styleguide.cfapps.io/). Styleguide
depends on library

    ```
    ./update_styleguide.sh
    ```

## Development

**Note**: It may be convenient to set a [css-critic](https://github.com/cburgmer/csscritic) baseline before
making any changes. See the section on **Testing** for more details.

### Library

1. `cd library`
1. `gulp sandbox`
1. Open a new session
1. `touch library/sandbox/sandbox.js`
1. Build test components in `library/sandbox/sandbox.js` with something like:

    ```
    import React from 'react'
    import {Label} from '../src/pivotal-ui-react/labels/labels'

    module.exports = () => (
      <div>
        <Label>A Label I'm Working On</Label>
      </div>
    )
    ```
    
1. Navigate to http://localhost:8001/

**Note**: After running `gulp sandbox`, copy any images used by the CSS into your 'sandbox/build' directory.

### Styleguide

1. `./update_styleguide.sh`
1. `cd styleguide`
1. `gulp dev`
1. Navigate to [http://localhost:8000](http://localhost:8000)

**Note**: If you update components, you must rebuild them in the library (`update_styleguide.sh`)
and then reinstall the node_modules in the styleguide. A simple `npm install` probably will not
be good enough to get the new changes.

**Note**: If you add any new image or font assets to any CSS packages, you will need to rerun `gulp dev` to see those
additions.

## Testing

1. `cd library`
1. Run tests in terminal: `gulp ci`
1. Run tests in browser: `gulp jasmine-react` and navigate to [http://localhost:8888](http://localhost:8888)

#### Visual-diff regression testing

We use [css-critic](https://github.com/cburgmer/csscritic) for visual-diff regression testing. The workflow is:

1. `./css_critic.sh`
1. Click 'Accept All' once processing is done (everything should be yellow)
1. Develop
1. `./css_critic.sh` - make sure everything is green (nothing impacted)

## Pull requests

Before starting your pull request:

- Please [open up an issue on Github](https://github.com/pivotal-cf/pivotal-ui/issues)
- Read over our [commit guidelines](https://github.com/pivotal-cf/pivotal-ui/blob/development/COMMIT_GUIDELINES.md)
- If you are making a new component, see our [guidelines for adding new CSS components](#adding-new-components)
- [Document any new components](#documenting-components) in the styleguide and the package README
- Update the `package.json` file of the component you're working on to include any new dependencies - either CSS
or JS packages (see [component dependencies](#component-dependencies) for more info)

Pull request process:

```
git remote add <your-git-name> git@github.com:<your-git-name>/pivotal-ui.git
git checkout development
git pull origin development
git checkout -b feature/<short_description_of_feature>
# Do some work
git pull --rebase upstream development
git push origin <your branch name>
# Submit branch as PR: https://help.github.com/articles/using-pull-requests/
```

Once your PR is submitted, we'll take care of publishing it to NPM. You can begin using your changes immediately by
vendoring the appropriate package with:

- React components: `gulp vendor-package --type=react --component=alerts --dest=<your-project-folder>`
- CSS components: `gulp vendor-package --type=css --component=typography --dest=<your-project-folder>`

This creates a vendored version of your modified components (`pui-react-alerts` or `pui-css-typography`) in your
project, and points your project's package json to these vendored versions.
