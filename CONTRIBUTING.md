# Contributing

## I'd like to help, what can I do?

You can [report bugs](#bug-reports), work on [issues](https://github.com/pivotal-cf/pivotal-ui/issues), update existing
components, or create new ones. 

## Setting up your environment

1. Fork the project
1. Install tools
    1. latest ruby (e.g. `rbenv install <VERSION>`)
    1. bundler (`gem install bundler`)
    1. node `v7.10.0` or higher ([install instructions](https://nodejs.org/en/))

## Build the projects

Pivotal UI is split into two projects:

- Library: components that are published to [npm](https://www.npmjs.com).

    ```
    cd library
    yarn
    ```

## Development

**Note**: It may be convenient to set a [css-critic](https://github.com/cburgmer/csscritic) baseline before
making any changes. See the section on **Testing** for more details.

### Library

1. `cd library`
1. `./node_modules/.bin/gulp sandbox`
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

**Note**: After running `./node_modules/.bin/gulp sandbox`, copy any images used by the CSS into your 'sandbox/build' directory.

## Testing

1. Install [phantomjs](http://phantomjs.org/)
1. `cd library`
1. Run tests in terminal: `./node_modules/.bin/gulp ci`
1. Run tests in browser: `./node_modules/.bin/gulp jasmine-react` and navigate to [http://localhost:8888](http://localhost:8888)

#### Visual-diff regression testing

We use [css-critic](https://github.com/cburgmer/csscritic) for visual-diff regression testing. The workflow is:

1. Install firefox
1. `./css_critic.sh`
1. Click 'Accept All' once processing is done (everything should be yellow)
1. Develop
1. `./css_critic.sh` - make sure everything is green (nothing impacted)

## Pull requests

1. Fork this repo
1. Make changes
    - Update the `package.json` file of the component you're working on to include any new dependencies - either CSS
or JS packages
1. Commit/push to your fork
1. Please [open up an issue on Github](https://github.com/pivotal-cf/pivotal-ui/issues)
1. Submit a PR, and provide a link to the newly created Github issue

Once your PR is submitted, we'll take care of publishing it to NPM.

You can begin using your changes immediately by vendoring the appropriate package with:
- CSS components: `./node_modules/.bin/gulp vendor-package --type=css --component=typography --dest=<your-project-folder>`
- React components: `./node_modules/.bin/gulp vendor-package --type=react --component=alerts --dest=<your-project-folder>`

This creates a vendored version of your modified components (`pui-react-alerts` or `pui-css-typography`) in your
project, and points your project's package json to these vendored versions.
If you are vendoring a new component, then you must vendor the css component and then the react component (doing it the other way around won't work).
