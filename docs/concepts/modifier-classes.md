---
title: Modifier classes
---

Pivotal UI provides several CSS "modifier" classes. A modifier is a tiny CSS class that has **one** job (e.g., it sets a single CSS property). They are sometimes called utility classes or atomic classes by other front-end libraries. Modifiers help avoid writing repetitive CSS and make it easy to incorporate Pivotal UI's colors, typography, and other common patterns.

It is very often possible to achieve a desired effect just by composing modifier classes, without writing any new CSS. Prefer this approach whenever it is feasible, since it decreases the amount of CSS to maintain in your team's codebase and makes styling more consistent across codebases.

## Anatomy of a modifier

The CSS for a modifier class looks like this:

```css
.underline {
  text-decoration: underline;
}
```

The `underline` class does exactly one thing: gives any text with this class an underline. On its own, this is not very impressive. The real power of modifiers becomes clear when composing multiple modifiers together.

## Composing modifiers

To demonstrate how modifier classes can be composed, consider this unstyled content that displays the current year:

```jsx
//title=With no modifiers
<div>
  <span>current year:</span> <span>{new Date().getFullYear()}</span>
</div>;
```

Now, let's add a bunch of modifier classes to the outer `div` and inner `span` elements to center the text and add some style:

```jsx
//title=With several modifiers
<div className="paxl bg-brand-8 type-neutral-11 border border-rounded h2 txt-c">
  <span className="em-high">current year:</span> <span className="em-low">{new Date().getFullYear()}</span>
</div>;
```

Without writing any CSS, the content looks completely different.

See the sidebar for a full list of available modifiers.