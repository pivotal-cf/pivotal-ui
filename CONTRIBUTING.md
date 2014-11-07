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

## I'd like to help, what can I do?

There are lots of ways to help depending on your interests and skills. For example, you can [report bugs]() or create new components. If you want to submit bug fixes, create new components, or update existing ones, please refer to our [pull request guidelines]().

If you need some inspiration, we have plenty of work for you to do. Please [email us](mailto:pivotal-ui@pivotal.io) to start a conversation.

## Setting up your environment

If you intend to make changes to Pivotal UI (or to manually build the distribution), there are a few things you'll need to do.

### Fork the project

[Fork](http://help.github.com/fork-a-repo/) the project by clicking the `fork` button in Github. Then, clone your fork, and configure the remotes:

   ```bash
   git clone https://github.com/<your-github-id>/pivotal-ui.git
   cd pivotal-ui
   git remote add upstream https://github.com/pivotal-cf/pivotal-ui.git
   ```

### Install Tools (in order)

You'll need to have these tools installed if you haven't got them in your system already, but many of them are preinstalled on a Pivotal dev box.

(Run all of these commands from the project root)

ruby 2.1.2 

bundle

    $ gem install bundle
    
node and npm 

    $ brew install node
    
the gulp cli

    $ npm install gulp -g

compass, haml, sass, and hologram

    $ bundle install

node modules

    $ npm install

### Build the project

As soon as you have your tools installed, run gulp _at the project root_:

    $ gulp

then visit [http://localhost:8000](http://localhost:8000)

This will start up the styleguide development server, and generate the `dist/` directory that will house the compiled resources and the styleguide. In addition, every time you make a change to any of the source files, it will regenerate the `dist/` directory.

## Pull requests

1. [Set up your environment](#setting-up-your-environment)

1. If you cloned a while ago, get the latest changes from upstream:

   ```bash
   git checkout master
   git pull upstream master
   ```

1. Create a feature branch based off of master. *Do not work off of master*. (Working off of master makes it hard to make multiple pull requests).

	```bash
	git checkout -b feature/<short_description_of_feature>
	```

1. **Before you make any changes**, [setup a CssCritic test baseline](#set-a-baseline-to-test-against-before-making-any-changes). This will allow you to test for regressions after you make changes.

1. Commit your changes in logical chunks. Please read over our [commit guidelines](#commit-guidelines).

1. File names should be plural, snake-cased, and end with `.scss` (i.e. `buttons.scss`).

1. CSS classes should be singular and separated by dashes (i.e. `.button-super-awesome`).

1. [Document your component](#documenting-components) in the styleguide.

1. **Before you push**, [test for regressions with CssCritic](#rerun-the-test-suite-for-regressions-before-you-commitmake-a-pull-request).

1. Rebase against upstream, and then push your changes

	```bash
	git pull --rebase upstream master
	git push origin head
	```

1. [Open a Pull Request](https://help.github.com/articles/using-pull-requests/) with a clear title and description against the master branch.

1. If you need to get the latest changes from upstream master, please rebase (not merge) the changes onto your branch. This will require you to force push your branch, but it'll make our git history cleaner.

	```bash
	git pull --rebase upstream master
	git push -f origin head
	```

## Bug reports

A bug is a _demonstrable problem_ that is caused by the code in the repository.
Good bug reports are extremely helpful, so thanks!

Guidelines for bug reports:

0. **Validate and lint your code** &mdash; [validate your HTML](http://html5.validator.nu)
   and [lint your HTML](https://github.com/twbs/bootlint) to ensure your
   problem isn't caused by a simple error in your own code.

1. **Use the GitHub issue search** &mdash; check if the issue has already been
   reported.

2. **Check if the issue has been fixed** &mdash; try to reproduce it using the
   latest `master` or development branch in the repository.

3. **Isolate the problem** &mdash; ideally create a [reduced test
   case](http://css-tricks.com/6263-reduced-test-cases/) and a live example.
   [This JS Bin](http://jsbin.com/lefey/1/edit?html,output) is a helpful template.

4.	**Add a screenshot** &mdash; a picture is worth a thousand words. A screenshot of the bug in action will be very helpful in debugging it.


A good bug report shouldn't leave others needing to chase you up for more
information. Please try to be as detailed as possible in your report. What is
your environment? What steps will reproduce the issue? What browser(s) and OS
experience the problem? Do other browsers show the bug differently? What
would you expect to be the outcome? All these details will help people to fix
any potential bugs.

Finally, if you've followed all these steps and you think you have a real bug, [open an issue in Github issues tracker](https://github.com/pivotal-cf/pivotal-ui/issues).

## Feature requests

To submit a Feature request, please [open an issue on Github](https://github.com/pivotal-cf/pivotal-ui/issues). Screenshots are very helpful! We'll then have a conversation about what you are trying to achieve in your project and the best way to do that.

## Testing

### Code linting

We lint our javascript code with JSHint, which is run every time you run `gulp test`. Please ensure the code is linted before you commit.

### Visual-diff regression testing

(for the moment, this section is aspirational)

We use CSSCritic for visual-diff regression testing. To test:

#### Set a baseline to test against (before making any changes!!)
1. Run `gulp` to build the assets
1. Run `gulp test`. This will open up Firefox and show all rendered test files in a "yellow" state.
1. Click "Accept the rendered page" for *each* component. Yes, this is slow. If it is too painful please let us know so we can prioritize automating this step.

#### Creating test fixtures for new components (very aspirational)

Test fixtures are automatically created every time you create a `haml_example`, `haml_example_table`, `html_example`, or `html_example_table` in the styleguide documentation.

If you create a new component, re-run `gulp test` to load the component in CssCritic, and set a baseline for it when you are happy with how it looks.

#### Rerun the test suite for regressions (before you commit/make a pull request)
1. Run `gulp` to build the latest assets
1. Run `gulp test`. This will open up Firefox.
1. If there are no regressions, all components will be green.
1. If you added any components, you'll have to click "Accept the rendered page" for that component.
1. If a component is red, this means either:
    1. You broke something. Fix it!
    2. You want to change the baseline. You should talk to the core Pivotal UI team first, especially the designers.


## Commit guidelines

Each commit should be "green" (i.e. it should not break any existing functionality). In addition, attempt to make each commit a complete idea. A single commit should not contain unrelated changes.

Your message should include information about the patch level of the changes made. You may be wondering what major, minor, and  patch mean in the context of CSS. Please follow these guidelines:

* **Major** - A breaking change which alters either *class names* or expected *HTML*. These commits can be labeled either as `feat(): ` or `fix(): `, but must also contain a `BREAKING CHANGE:` followed by what kind of breaking change it is (e.g., class name, sass variable, html, style) in the body of the commit.
* **Minor** - Either an *additional feature* (e.g. a new component), or an update which changes *Sass variables*. These commits should be labeled as `feat(): `.
* **Patch** - A *non-breaking change, bug fix, or design update* that any team should be able to upgrade to without changing their html. An example of this is updating the background color of the danger button or fixing the alignment of the horizontal tabs (as long as no html changes are required). These commits should be labeled as `fix(): `.

For example, for a patch, your commit might look like this:

```
fix(table): headers are now capitalized by default

- sections 1 & 2 
```
and example of a breaking change might look like this:

```
feat(color): "orange-color" class is now named "light-orange"

BREAKING CHANGE: class name
```


For additonal information regarding commit message format consult the [Conventional Changelog](https://github.com/ajoslin/conventional-changelog/blob/master/CONVENTIONS.md).
## Documenting components

We use [hologram for documentation and styleguide generation](https://github.com/trulia/hologram). The component docs are created from markdown comments in the SCSS.

Here are some guidelines to follow when writing docs:

- Make sure to name your component something unique or it will clobber other components' docs.

- All 'titles' should be plural, capitalized, and omit the parent name (i.e. the title for `name: button_style` should be `title: Styles`.

- Its better to have multiple child components than one big parent component. Check out "buttons" for a good way to organize the docs this way.

- Parent components should belong to a category (or categories) and should not have a parent. 

- Child components should have a parent but not a category. See below for more [category](#categories) guidelines.

- Child component 'names' should start with the parent name (i.e. the large version of the `gravatar` component should be `name: gravatar_large`).

### Categories

- **Layout** - components for structuring the placement of other components on a page *(i.e. grids, panes)*
- **Elements** - single-node components and elementary html components *(i.e. buttons, links, lists)*
- **Objects** - multi-node components *(i.e. alerts, panels, tables)*
- **Utilities** - mixins that modifiy other components *(i.e. colors, hover states)*
- **JavaScript** - components that have javascript behaviors *(i.e. animated progress bars, tabs, sortable tables)*
- **Forms** - everything form related *(i.e. forms, inputs, search boxes)*
- **by Product** - product specific components *(i.e. a PWS marketing pricing widget)*

In addition, every parent component **must** belong to the **All** category.

### Examples

Parent component:

	/*doc
	---
	title: Buttons
	name: button
	categories:
	  - All
	  - CSS
	  - marketing-site
	---

	Button styles can be applied to any element. Typically you'll want to
	use either a `<button>` or an `<a>` element:

	```haml_example_table
	%button.btn.btn-primary Button

	%a.btn.btn-primary{href: "http://trulia.com"} Link
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

## Code guidelines

### HTML

[Adhere to the Code Guide.](http://codeguide.co/#html)

- Use tags and elements appropriate for an HTML5 doctype (e.g., self-closing tags).
- Use [WAI-ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) attributes in documentation examples to promote accessibility.

### CSS

[Adhere to the Code Guide.](http://codeguide.co/#css)

- When feasible, default color palettes should comply with [WCAG color contrast guidelines](http://www.w3.org/TR/WCAG20/#visual-audio-contrast).
- Except in rare cases, don't remove default `:focus` styles (via e.g. `outline: none;`) without providing alternative styles. See [this A11Y Project post](http://a11yproject.com/posts/never-remove-css-outlines/) for more details.

### JS

- Use semicolons (in client-side JS)
- 2 spaces (no tabs)
- strict mode
- "Attractive"

