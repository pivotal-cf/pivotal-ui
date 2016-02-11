# Contributing

(Based off of the guidelines for [Twitter Bootstrap](https://github.com/twbs/bootstrap/blob/master/CONTRIBUTING.md))

  - [Setting up your environment](#setting-up-your-environment)
  - [Pull requests](#pull-requests)
  - [Bug reports](#bug-reports)
  - [Feature requests](#feature-requests)
  - [Testing](#testing)
  - [Commit guidelines](#commit-guidelines)
  - [Documenting components](#documenting-components)
  - [Code guidelines](#code-guidelines)

## Highlights

When creating a pull request, make sure you rebase your branch against our code
base (upstream).  Read our [Commit guidelines](#commit-guidelines)! We have a
very specific syntax for our messages.

## I'd like to help, what can I do?

There are lots of ways to help depending on your interests and skills. For
example, you can [report bugs](#bug-reports) or create new components. If you want to
submit bug fixes, create new components, or update existing ones, please refer
to our [pull request guidelines](https://github.com/pivotal-cf/pivotal-ui/blob/development/CONTRIBUTING.md#pull-requests).

If you need some inspiration, we have plenty of work for you to do. Please
[email us](mailto:pivotal-ui@pivotal.io) to start a conversation.

## Setting up your environment

If you intend to make changes to Pivotal UI (or to manually build the
distribution), there are a few things you'll need to do.

### Fork the project

[Fork](http://help.github.com/fork-a-repo/) the project by clicking the `fork`
button in Github. Then, clone your fork, and configure the remotes:

```bash
git clone https://github.com/<your-github-id>/pivotal-ui.git
cd pivotal-ui
git remote add upstream https://github.com/pivotal-cf/pivotal-ui.git
```

### Install Tools (in order)

You'll need to have these tools installed if you haven't got them in your
system already, but many of them are preinstalled on a Pivotal dev box.

(Run all of these commands from the project root)

1. ruby 2.1.2

2. bundler

  `$ gem install bundler`

3. node 4+

	If you are on a mac and `node -v` returns a version less than 4, `brew upgrade node`

	If your project requires an older version of node, you may want to use
	[nvm](https://github.com/creationix/nvm) to manage node versions)

4. the gulp cli

  `$ npm install gulp -g`
  
  OR
  
  add `./node_modules/.bin/` to your PATH

### Build the Projects

The Pivotal UI repo is split into two distinct projects, `library` and `styleguide`. `library` represents all of the components that are published to `npm`. `styleguide` is the documentation and tools for building the styleguide. `styleguide` requires `library` to work, but `library` does not require `styleguide`.

#### Library

To build the library, starting in the repository root:

```sh
cd library
npm install
```

#### Styleguide

To build the styleguide, starting in the repository root:
```sh
./update_styleguide.sh
```

### Development

#### Library

To work on components for the library, build the library and then start the sandbox server

```sh
cd library
gulp sandbox
```

Create a `sandbox.js` file and go to [http://localhost:8001](http://localhost:8001) to see your changes

To run unit tests:

`$ gulp jasmine-react`

Jasmine will be served at [http://localhost:8888](http://localhost:8888)

To run all tests:

`$ gulp ci`

#### Styleguide

To work on documentation in the styleguide, first build the library:

```sh
cd <repository-root>
./update_styleguide.sh
```

Then run the doc server:

`$ gulp dev`

This will generate a local version of the styleguide and start up the
styleguide development server. It also sets up some watchers to regenerate the
styleguide pages and styles when you change a PUI scss file or a JS documentation file.

The styleguide will be served at [http://localhost:8000](http://localhost:8000).

Note that if you update components, you must rebuild them in the library (`update_styleguide.sh`)
and then reinstall the node_modules in the styleguide. A simple `npm install` probably will not 
be good enough to get the new changes.


## Pull requests

Before starting your pull request, please [open up an issue on Github](#feature-requests).
This will ensure our conversation doesn't get lost in email or slack.

1. [Set up your environment](#setting-up-your-environment)

1. If you cloned a while ago, get the latest changes from upstream:

   ```bash
   git checkout development
   git pull upstream development
   ```

1. Create a feature branch based off of development. *Do not work off of development*.
   (Working off of development makes it hard to make multiple pull requests).

   ```bash
   git checkout -b feature/<short_description_of_feature>
   ```

1. **Before you make any changes**,
   [setup a CssCritic test baseline](#set-a-baseline-to-test-against-before-making-any-changes).
  This will allow you to test for regressions after you make changes.

1. Commit your changes in logical chunks. Our commit conventions are very
   particular -- please read over our [commit guidelines](#commit-guidelines).
   Each commit should look something like this:

   ```bash
   fix(table): headers are now capitalized by default
   ```

1. If you are making a new component, see our [guidelines for adding new
   CSS components](#adding-new-components).

1. Update the `package.json` file of the component you're working on to
   include any new dependencies - either CSS or JS packages (see
   [component dependencies](#component-dependencies) for more info).

1. For CSS components: if you add any new image or font assets to any CSS
   packages, you will need to restart your development server (rerun `gulp dev`) to
   see those additions.

1. [Document your component](#documenting-components) in the styleguide and the
   package README.

1. **Before you push**, [test for regressions with CssCritic](#rerun-the-test-suite-for-regressions-before-you-commitmake-a-pull-request).

1. Rebase against upstream, and then push your changes

   ```bash
   git pull --rebase upstream development
   git push origin <your branch name>
   ```

1. [Open a Pull Request](https://help.github.com/articles/using-pull-requests/)
   with a clear title and description against the development branch.

1. If you need to get the latest changes from upstream development, please rebase
   (not merge) the changes onto your branch. This will require you to force
   push your branch, but it'll make our git history cleaner.

   ```bash
   git pull --rebase upstream development
   git push -f origin <your branch name>
   ```

1. While you're waiting for your PR to be accepted, you can use your forked
   changes in your project. For example, if you made changes to the react alerts
   component, run the following command:

   ```bash
   gulp vendor-package --type=react --component=alerts --dest=<your-project-folder>
   ```

   Similarly, if you made changes to the CSS typography component, run

   ```bash
   gulp vendor-package --type=css --component=typography --dest=<your-project-folder>
   ```

   This creates a vendored version of your modified components
   (`pui-react-alerts` or `pui-css-typography`) in your project, and points your
   project's package json to these vendored versions. This way, you can use your
   forked changes right away, even in production!

1. Once we accept your pull request, we will publish any new or updated pacakges
   to NPM.


### Component dependencies

Because all of our CSS and React components are designed to be used
independently, we have to be very explicit about inter-package dependencies.

#### CSS components

Some components rely on styles from other components. For example, inconography
relies on typography and boostrap styles. Typography styles rely on bootstrap.
We specify these dependencies in the `package.json` files for each component.
Naming convention: `pui-css-<component-name>`.

Iconography's package json has the following:

```json
"dependencies": {
  "pui-css-typography": "1.9.3"
}
```

Because typography relies on bootstrap, we don't need to list bootstrap as a dependency
for iconography.

#### React components

Our react components can have 3 types of dependencies:

1. **Other PUI react modules** - for example, the `pui-react-alerts`
   component uses the `pui-react-media` and `pui-react-iconography` components
   internally.
1. **PUI css modules** - any PUI css necessary to style the react component
   must be included. For example, `pui-react-alerts` needs the styles from
   `pui-css-alerts`, `pui-css-iconography`, and `pui-css-media`. However,
   because `pui-css-media` is a dependency of `pui-react-media`, we don't need
   to explicity require it. The same is true for `pui-css-iconography`.
1. **External dependencies** - for example, `pui-react-alerts` relies on
  `react-bootstrap`.

So alert's package json has the following:

```json
"dependencies": {
  "pui-react-iconography": "1.9.3",
  "pui-react-media": "1.9.2",
  "pui-css-alerts": "1.9.2",
  "react-bootstrap": "^0.23.3"
}
```

### Adding new components
_We are still refining this process! If you find any of this confusing, let us know!_

**Don't worry about publishing the
component to NPM; we'll take care of it after merging your pull request!**

#### CSS components

If you are adding a new CSS component, please modify the files in
`library/src/pivotal-ui/components/[component name]`.

Write your css and hologram docs in `styleguide/src/pivotal-ui/components/[component name]/[component name].scss`.

The `styleguide/src/pivotal-ui/components/[component name]/package.json` file should contain
a homepage that links to the styleguide
(http://styleguide.pivotal.io/category#component-name), the version number
of the package (don't worry about this too much - we'll take care of it),
and any css dependencies (see
[component dependencies](#component-dependencies)).

The `README` file should contain an HTML example of component use.

E.g.:

```html
<div class="your-component">Your component goes here</div>
```

##### Viewing css components in the styleguide
In the styleguide top-level `package.json`, include a dependency on your new **unpublished** package.
`"pui-css-[component name]": "file:../library/dist/css/[component-name]"` All of our css packages are prefixed with `pui-css-`.

#### React components

If you are adding a new React component, please modify the files in
`src/pivotal-ui-react/[component name]`.

Write your components in `library/src/pivotal-ui-react/[component name]/[component name].js`.

Write your hologram docs for React in `styleguide/docs/react/[component name]/[component name].js`.

Many components do not have new css, if they do:

Write css for your components in `library/src/pivotal-ui/components/[component name]/[component name].js`.

Write hologram docs for your css in `styleguide/docs/css/[component name]/[component name].scss`.

Write your tests in `library/spec/pivotal-ui-react/[component name]/[component name]_spec.js`. In the library folder, run
`gulp jasmine-react` to test in the browser or `gulp jasmine-react-ci` to test headlessly with PhantomJS.

The `package.json` file should contain a homepage that links to the styleguide
(http://styleguide.pivotal.io/react.html#component-name), the version
number of the package (don't worry about this too much - we'll take care of it),
and any dependencies (see [component dependencies](#component-dependencies)).

## Bug reports

Good bug reports are extremely helpful, so thanks!

### Bug Priority

**P1. Blocker** - Reserved for catastrophic failures - exceptions, crashes, corrupt data, etc. that (a) prevent somebody from completing their task, and (b) have no workaround. These should be extremely rare. They must be fixed immediately (same-day) and deployed as hotfixes.

**P2. Critical** - These may refer to unhandled exceptions or to other "serious" bugs that only happen under certain specific conditions (i.e. a practical workaround is available). No hard limit for resolution time, but should be fixed within the week (hotfix) and must be fixed by next release. They key distinction between (1) and (2) is not the severity or impact but the existence of a workaround.

**P3. Major** - Usually reserved for perf issues. Anything that seriously hampers productivity but doesn't actually prevent work from being done. Fix by next release.

**P4. Minor** - These are "nuisance" bugs. A default setting not being applied, a read-only field showing as editable (or vice-versa), a race condition in the UI, a misleading error message, etc. Fix for this release if there are no higher-priority issues, otherwise the following release.

**P5. Trivial** - Cosmetic issues. Scroll bars appearing where they shouldn't, window doesn't remember saved size/location, typos, last character of a label being cut off, that sort of thing. They'll get fixed if the fix only takes a few minutes and somebody's working on the same screen/feature at the same time, otherwise, maybe never. No guarantee is attached to these.

Please let us know the priority level in your bug report.

### Guidelines for bug reports:


1. **Use the GitHub issue search** &mdash; check if the issue has already been
   reported.

2. **Check if the issue has been fixed** &mdash; try to reproduce it using the
   latest `master` or `development` branch in the repository.

3. **Isolate the problem** &mdash; ideally create a [reduced test
   case](http://css-tricks.com/6263-reduced-test-cases/) and a live example.
   [This JS Bin](http://jsbin.com/lefey/1/edit?html,output) is a helpful
   template.

4. **Add a screenshot** &mdash; a picture is worth a thousand words. A
   screenshot of the bug in action will be very helpful in debugging it.


A good bug report shouldn't leave others needing to chase you up for more
information. Please try to be as detailed as possible in your report. What is
your environment? What steps will reproduce the issue? What browser(s) and OS
experience the problem? Do other browsers show the bug differently? What
would you expect to be the outcome? All these details will help people to fix
any potential bugs.

Finally, if you've followed all these steps and you think you have a real bug,
[open an issue in Github issues tracker](https://github.com/pivotal-cf/pivotal-ui/issues).

## Feature requests

To submit a Feature request, please [open an issue on Github](https://github.com/pivotal-cf/pivotal-ui/issues).
Give context about how you're planning to use this component in your project.
Screenshots or mocks are very helpful! We'll then have a conversation about
what you are trying to achieve and the best way to do that.

## Testing

### Visual-diff regression testing

(for the moment, this section is aspirational)

We use CSSCritic for visual-diff regression testing. To test:

#### Set a baseline to test against (before making any changes!!)
1. Run `gulp css-critic`. This will open up Firefox and show all rendered test
   files in a "yellow" state.
1. Click "Accept All".

#### Creating test fixtures for new components (very aspirational)

Test fixtures are automatically created every time you create a `html_example`
or `html_example_table` in the styleguide documentation.

If you create a new component, re-run `gulp css-critic` to load the component in
CssCritic, and set a baseline for it when you are happy with how it looks.

#### Rerun the test suite for regressions (before you commit/make a pull request)
1. Run `gulp css-critic`. This will open up Firefox.
1. If there are no regressions, all components will be green.
1. If you added any components, you'll have to click "Accept the rendered page"
   for that component.
1. If a component is red, this means either:
    1. You broke something. Fix it!
    2. You want to change the baseline. You should talk to the core Pivotal UI
       team first, especially the designers.

## Commit guidelines

Each commit should be "green" (i.e. it should not break any existing
functionality). In addition, attempt to make each commit a complete idea. A
single commit should not contain unrelated changes.

The overall format of the commit should look like this:

```
patchlevel(scope): description of commit

Additional information

[Finishes #storynumber]

Breaking change/deprecation warning
```

### Patch level

Your message should include information about the patch level of the changes
made. You may be wondering what major, minor, and  patch mean in the context of
CSS. Please follow these guidelines:

* **Major** - A breaking change which alters either *class names* or expected
  *HTML*. These commits can be labeled either as `feat(): ` or `fix(): `, but
  must also contain a `BREAKING CHANGE:` followed by what kind of breaking
  change it is (e.g., class name, sass variable, html, style) in the body of
  the commit.
* **Minor** - Either an *additional feature* (e.g. a new component), or an
  update which changes *Sass variables*. These commits should be labeled as
  `feat(): `.
* **Patch** - A *non-breaking change, bug fix, or design update* that any team
  should be able to upgrade to without changing their html. An example of
  this is updating the background color of the danger button or fixing the
  alignment of the horizontal tabs (as long as no html changes are required).
  These commits should be labeled as `fix(): `.
* Sometimes you may have commits that do not modify a component (e.g. updating docs, gulp tasks, etc). Label these commits as a `chore(): `.

For example, for a patch, your commit might look like this:

```
fix(table): headers are now capitalized by default

Some additional info about the change

[Finishes #12345678]
```

A feature might look like this:

```
feat(notification): add an 'alert notification'

Some additional info about the change

[Finishes #12345678]
```

and example of a breaking change might look like this:

```
feat(color): update oranges

Some additional info about the change

[Finishes #12345678]

BREAKING CHANGE: (sass variable) "orange-color" class is now named "light-orange"
```

### Scope

The scope should be the component that is modified. It should match the folder
name of the modified component. For example, a patch fix to CSS alerts would
look like

```
fix(alerts): ...
```

The same scope is used for both css and react components.

For `chore`s, use your best guess for the scope. E.g., if you're chaning
documentation, use `chore(documentation):`. If you're changing release gulp
tasks, use `chore(release):`

### Breaking Changes

Breaking changes must be **the last line** of the commit, and there can only be
one breaking change per commit.  The breaking change message should be a
standalone sentence, illustrating what actually breaks and how to fix it.
In addition, the breaking change message should include the type of change:

- **html** - e.g. "BREAKING CHANGE: (html) alert icons are no longer included by
  default"
- **sass variable** - e.g. "BREAKING CHANGE: (sass variable)
  `$yellow-1`/`$warn-1` are now `$yellow-2`/`$warn-2`"
- **css class** - e.g. "BREAKING CHANGE: (css class) `.with-tooltip` is now
  `.button-with-tooltip-wrapper`"
- **javascript** - e.g. "BREAKING CHANGE: (javascript) tooltips must be
  explicitly initialized"

**Note** - any story numbers should come **before** the breaking change message

### Deprecation Warnings

If your commit marks a component for deprecation, add a deprecation warning like
so.

```
feat(alerts): deprecate warning alert

[Finishes #12345678]

DEPRECATION WARNING: "orange-color" class is now named "light-orange"
```

**Note** - any story numbers should come **before** the deprecation warning

## Documenting components

We write two types of component documentation - styleguide docs and README docs.
In the future, they'll be the same thing. For now, you'll have to write docs in
two places. Sorry.

### Styleguide docs

We use [hologram for documentation and styleguide generation](https://github.com/trulia/hologram).
The component docs are created from markdown comments in the SCSS. We've also built some custom tooling around hologram that allows us to organize documentation according to a specific taxonomy. 

- Parent components have a top-level hologram `category` (this puts them on their own pages)
- A `category` will follow this naming convention (which organizes them in a tree structure)
	
	```[language]_[category]_[component-name]```  
	
   **`language`** can be either `css` or `react`  
   **`component-name`** is the dash-seperated name of the component

- Make sure to name your component something unique or it will clobber other
  components' docs.
  
Style-wise, here are some guidelines to follow when writing docs for hologram:

- All 'titles' should be plural, capitalized, and omit the parent name (i.e.
  the title for `name: button_style` should be `title: Styles`.

- It's better to have multiple child components than one big parent component.
  Check out "buttons" for a good way to organize the docs this way.

- Child components should have a parent but not a category. See below for more
  [category](#categories) guidelines.

- Child component 'names' should start with the parent name (i.e. the large
  version of the `gravatar` component should be `name: gravatar_large`).

#### Categories

- **Base** - Discrete elements such as buttons, lists and images. Also includes iconography and typography guidelines.
- **Components** - Groups of elements that comprise a unit. Elements such as a form label, text input and autocomplete can create a form.
- **Utilities** - Simple typographic, layout and color utilities. Layout your pages with clean grids and whitespace that are also responsive.

In addition, every parent component **must** belong to the `[language]_all` category (either `react_all` or `css_all`).
However, please list all other categories before the all category.

#### Examples

Parent component:

```
/*doc
---
title: Crouching Tiger
name: crouching_tiger_react
categories:
 - react_object_crouching-tiger
 - react_all
---

Hi I'm an explanation of this component

*/
```

Child component:

```
/*doc
---
title: Hidden Dragon
name: crouching_tiger_hidden_dragon_react
parent: crouching_tiger_react
---

Hi I'm something a child component
```

### README documentation - CSS components

This documentation will show up in the README of the component npm packages.
Include a simple html example in the `README` file of the CSS component.

E.g. for iconography:

  ```html
  <i class="fa fa-download type-brand-3 title"></i>
  ```


### README documentation - React components

The `README` files for React components are auto-generated and simply point back to the styleguide; you do not need to write these.

## Code guidelines

### HTML

[Adhere to the Code Guide.](http://codeguide.co/#html)

- Use tags and elements appropriate for an HTML5 doctype (e.g., self-closing
  tags).
- Use [WAI-ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
  attributes in documentation examples to promote accessibility.

### CSS

[Adhere to the Code Guide.](http://codeguide.co/#css)

- When feasible, default color palettes should comply with
  [WCAG color contrast guidelines](http://www.w3.org/TR/WCAG20/#visual-audio-contrast).
- CSS classes should be singular and separated by dashes (i.e.
  `.button-super-awesome`).
- Except in rare cases, don't remove default `:focus` styles (via e.g.
  `outline: none;`) without providing alternative styles. See
  [this A11Y Project post](http://a11yproject.com/posts/never-remove-css-outlines/)
  for more details.

### JS

- Use semicolons (in client-side JS)
- 2 spaces (no tabs)
- strict mode
- Use ES6 features wherever applicable
- React code should use JSX
- "Attractive"
