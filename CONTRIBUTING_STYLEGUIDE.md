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

## Component dependencies

Because all of our CSS and React components are designed to be used
independently, we have to be very explicit about inter-package dependencies.

#### CSS components

Some components rely on styles from other components. For example, inconography
relies on typography and bootstrap styles. Typography styles rely on bootstrap.
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

## Documenting components

We write two types of component documentation - styleguide docs and README docs. In the future, they'll be the same
thing.

### Styleguide docs

We use [hologram for documentation and styleguide generation](https://github.com/trulia/hologram).
The component docs are created from markdown comments in the SCSS. We've also built some custom tooling around hologram that allows us to organize documentation according to a specific taxonomy.

- Parent components have a top-level hologram `category` (this puts them on their own pages)
- A `category` will follow this naming convention (which organizes them in a tree structure)

	```[language]_[category]_[component-name]```

   **`language`** can be either `css` or `react`
   **`component-name`** is the dash-seperated name of the component

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
