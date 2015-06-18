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
to our [pull request guidelines](https://github.com/pivotal-cf/pivotal-ui/blob/master/CONTRIBUTING.md#pull-requests).

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

ruby 2.1.2

bundler

  $ gem install bundler

node and npm (at this time `nodejs` version `0.10` is required. Install
[nvm](https://github.com/creationix/nvm) then use it to install node and npm.)

  $ nvm install 0.10

the gulp cli

  $ npm install gulp -g

haml, sass, and hologram

  $ bundle install

node modules

  $ npm install

### Build the project

As soon as you have your tools installed, run gulp _at the project root_:

  $ gulp

then visit [http://localhost:8000](http://localhost:8000)

This will generate a local version of the styleguide and start up the
styleguide development server. It also sets up some watchers to regenerate the
styleguide pages and styles when you change a PUI scss file, and watchers to
regenerate the JS when you change a react component.


## Pull requests

Before starting your pull request, please [open up an issue on Github](#feature-requests).
This will ensure our conversation doesn't get lost in email or slack.

1. [Set up your environment](#setting-up-your-environment)

1. If you cloned a while ago, get the latest changes from upstream:

   ```bash
   git checkout master
   git pull upstream master
   ```

1. Create a feature branch based off of master. *Do not work off of master*.
   (Working off of master makes it hard to make multiple pull requests).

   ```bash
   git checkout -b feature/<short_description_of_feature>
   ```

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
   packages, you will need to restart your development server (rerun `gulp`) to
   see those additions.

1. [Document your component](#documenting-components) in the styleguide and the
   package README.

1. Rebase against upstream, and then push your changes

   ```bash
   git pull --rebase upstream master
   git push origin head
   ```

1. [Open a Pull Request](https://help.github.com/articles/using-pull-requests/)
   with a clear title and description against the master branch.

1. If you need to get the latest changes from upstream master, please rebase
   (not merge) the changes onto your branch. This will require you to force
   push your branch, but it'll make our git history cleaner.

   ```bash
   git pull --rebase upstream master
   git push -f origin head
   ```

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

Because typography relies on bootstrap, we don't need to list it as a dependency
for bootstrap.

We like the versions of dependecies to be exact, not fuzzy (e.g. "1.9.3", not
"^1.9.3").

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

We like the versions of any `pui-*` dependecies to be exact, not fuzzy (e.g.
"1.9.3", not "^1.9.3"). For non-pui modules, use your best judgement :grin:

### Adding new components

Some conventions you should be aware of...

#### CSS components

Each CSS component should live in its own folder (e.g.
`src/pivotal-ui/components/iconography/`). The structure of the folder should
be:

    ├── <component-name>.scss
    ├── README.md
    ├── package.json
    └── <folder-for-assets-if-necessary>
        ├── <asset-1>
        ├── <asset-2>

File and folder names should be plural and dash-separated (i.e. `google-maps`).
When we publish the component to NPM, the package name will be
`pui-css-<component-name>`.

The `package.json` file should contain a homepage that links to the styleguide
(http://styleguide.pivotal.io/category#component-name), the version number
of the package (don't worry about this too much - we'll take care of it),
and any css dependencies (see
[component dependencies](#component-dependencies)).

E.g. for iconography:

```json
{
  "homepage": "http://styleguide.pivotal.io/elements.html#iconography",
  "dependencies": {
    "pui-css-typography": "*"
  },
  "version": "0.0.9"
}
```

The `README` file should contain an HTML example of component use.

E.g. for iconography:

```html
<i class="fa fa-download type-brand-3 title"></i>
```

#### React components

Each React component should live in its own folder (e.g.
`src/pivotal-ui-react/draggable-list/`). The structure of the folder should be:

    ├── <component-name>.js
    ├── package.json
    └── <additional-js-files-if-necessary>
        ├── <asset-1>
        ├── <asset-2>

File and folder names should be plural and dash-separated (i.e.
`draggable-list`). When we publish the component to NPM, the package name will
be `pui-react-<component-name>`.

The `package.json` file should contain a homepage that links to the styleguide
(http://styleguide.pivotal.io/react_beta.html#component-name), the version
number of the package (don't worry about this too much - we'll take care of it),
and any dependencies (see [component dependencies](#component-dependencies)).

E.g. for draggable lists:

```json
{
  "version": "0.1.0",
  "description": "A React component for showing a list of items that can be re-ordered by the user",
  "homepage": "http://styleguide.pivotal.io/react_beta.html#list_draggable_react",
  "dependencies": {
    "classnames": "^1.2.0",
    "pui-css-lists": "^0.0.5"
  }
}
```

## Bug reports

A bug is a _demonstrable problem_ that is caused by the code in the repository.
Good bug reports are extremely helpful, so thanks!

Guidelines for bug reports:

0. **Validate and lint your code** &mdash; If you're working with the HTML/CSS
   library, [validate your HTML](http://html5.validator.nu) and [lint your
   HTML](https://github.com/twbs/bootlint) to ensure your problem isn't caused
   by a simple error in your own code.

1. **Use the GitHub issue search** &mdash; check if the issue has already been
   reported.

2. **Check if the issue has been fixed** &mdash; try to reproduce it using the
   latest `master` or development branch in the repository.

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

Coming soon!

## Commit guidelines

Each commit should be "green" (i.e. it should not break any existing
functionality). In addition, attempt to make each commit a complete idea. A
single commit should not contain unrelated changes.

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

For example, for a patch, your commit might look like this:

```
fix(table): headers are now capitalized by default

- sections 1 & 2
```
and example of a breaking change might look like this:

```
feat(color): update oranges

BREAKING CHANGE: (sass variable) "orange-color" class is now named "light-orange"
```

For additonal information regarding commit message format consult the
[Conventional Changelog](https://github.com/ajoslin/conventional-changelog/blob/master/CONVENTIONS.md).

### Breaking Changes

Breaking changes must be **the last line** of the commit, and there can only be
one breaking change per commit.  The breaking change message should be a
standalone sentence, illustrating what actually breaks and how to fix it.
In addition, the breaking change message should include the type of change:

- **style** - e.g. "BREAKING CHANGE: (style) alert text has normal emphasis by
  default"
- **html** - e.g. "BREAKING CHANGE: (html) alert icons are no longer included by
  default"
- **sass variable** - e.g. "BREAKING CHANGE: (sass variable)
  `$yellow-1`/`$warn-1` are now `$yellow-2`/`$warn-2`"
- **css class** - e.g. "BREAKING CHANGE: (css class) `.with-tooltip` is now
  `.button-with-tooltip-wrapper`"
- **javascript** - e.g. "BREAKING CHANGE: (javascript) tooltips must be
  explicitly initialized"

## Documenting components

We write two types of component documentation - styleguide docs and README docs.
In the future, they'll be the same thing. For now, you'll have to write docs in
two places. Sorry.

### Styleguide docs

We use [hologram for documentation and styleguide generation](https://github.com/trulia/hologram).
The component docs are created from markdown comments in the SCSS.
Here are some guidelines to follow when writing docs for hologram:

- Make sure to name your component something unique or it will clobber other
  components' docs.

- All 'titles' should be plural, capitalized, and omit the parent name (i.e.
  the title for `name: button_style` should be `title: Styles`.

- Its better to have multiple child components than one big parent component.
  Check out "buttons" for a good way to organize the docs this way.

- Parent components should belong to a category (or categories) and should not
  have a parent.

- Child components should have a parent but not a category. See below for more
  [category](#categories) guidelines.

- Child component 'names' should start with the parent name (i.e. the large
  version of the `gravatar` component should be `name: gravatar_large`).

#### Categories

- **Layout** - components for structuring the placement of other components on
  a page *(i.e. grids, panes)*
- **Elements** - single-node components and elementary html components *(i.e.
  buttons, links, lists)*
- **Objects** - multi-node components *(i.e. alerts, panels, tables)*
- **Utilities** - mixins that modifiy other components *(i.e. colors, hover
  states)*
- **Forms** - everything form related *(i.e. forms, inputs, search boxes)*
- **by Product** - product specific components *(i.e. a PWS marketing pricing
  widget)*
- **React Beta** - All React components go here at the moment.

In addition, every parent component **must** belong to the **All** category.
However, please list all other categories before the all category.

#### Examples

Parent component:

    /*doc
    ---
    title: Buttons
    name: button
    categories:
      - Elements
      - All
    ---

    Button styles can be applied to any element. Typically you'll want to
    use either a `<button>` or an `<a>` element:

    ```html_example_table
    <button class="btn btn-primary">Button</button>

    <a class="btn btn-primary" href="http://trulia.com">Link</a>
    ```

    If your button is actually a link to another page, please use the
    `<a>` element, while if your button performs an action, such as submitting
    a form or triggering some javascript event, then use a `<button>` element.

    */

Child component:

    /*doc
    ---
    title: Button Sizes
    name: button_sizes
    parent: button
    ---

    There are two sizes for buttons: Large and default. Simply apply the
    size modifier class for the desired size.

    ```html_example_table
    <button class="btn btn-primary btn-lg">Large</button>

    <button class="btn btn-primary">Default</button>
    ```

    */

### README documentation - CSS components

This documentation will show up in the README of the component npm packages.
Include a simple html example in the `README` file of the CSS component.

E.g. for iconography:

  ```html
  <i class="fa fa-download type-brand-3 title"></i>
  ```
}

### README documentation - React components

This documentation will show up in the README of the component npm packages.
We generate README documentation from "javadocs" in the components' source
code. There should a javadoc for each React class exported by the
package. Each javadoc should have the following:

- `@component` - the name of the React class
- `@description` - keep it short
- `@priperty` **for each property** - required for every public-facing property
  that can be passed into the component
- `@example` - should show a basic use case. Include multiple if necessary
- `@see` - a markdown link to the component's styleguide documentation

For example, the draggable list package, which exports `DraggableList` and
`DraggableListItem` has the following javadocs:

```js
/**
 * @component DraggableList
 * @description A list that can be re-ordered via drag-drop
 *
 * @property onDrop {Function} A callback called when the user re-orders list items
 *
 * @example ```js
 * var DraggableList = require('pui-react-draggable-list').DraggableList;
 * var DraggableListItem = require('pui-react-draggable-list').DraggableListItem;
 * var MyComponent = React.createClass({
 *   render() {
 *     return (
 *       <DraggableList onDrop={draggableListDropCallback}>
 *         <DraggableListItem>Get me out of here!</DraggableListItem>
 *         <DraggableListItem>LOL</DraggableListItem>
 *         <DraggableListItem>Can't stop</DraggableListItem>
 *       </DraggableList>
 *     );
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react_beta.html#list_draggable_react)
 */

/**
 * @component DraggableListItem
 * @description Denotes list items of a DraggableList
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react_beta.html#list_draggable_react)
 */
```

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
