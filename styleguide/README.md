# Pivotal UI Styleguide

This is the styleguide and documentation for [Pivotal UI](https://github.com/pivotal-cf/pivotal-ui), Pivotal's design system.

## Contributing

We encourage and appreciate pull requests to improve the styleguide. All documentation and code examples are written in Markdown files that live in the `docs` directory.

All React components live in the `src` directory, and all CSS lives in the `stylesheets` directory.

## Developing

The styleguide is a React app. To develop locally, you will need [Node](https://docs.npmjs.com/getting-started/installing-node) and [Yarn](https://yarnpkg.com/lang/en/docs/install) installed.

### Running Locally

The styleguide is built directly from the Pivotal UI source code, so you will need to clone both this repo and the [Pivotal UI](https://github.com/pivotal-cf/pivotal-ui) repo side-by-side on your computer.

1. Navigate to the styleguide directory
1. `yarn install` to install Node dependencies
1. `yarn start` to start the live-reloading development server on port 8080
1. Navigate to `localhost:8080` to view the styleguide

Changes to either the styleguide code or Pivotal UI code will now reload the dev server.

### Testing Locally

1. `yarn test` to run all the tests from the command line

### Pushing

1. `./push.sh` to run the linter, run the tests, and push