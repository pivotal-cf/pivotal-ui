---
title: Modifier Classes
menu: concepts
---

Pivotal UI provides several CSS "modifier" classes. Modifiers are tiny CSS classes that each do **one thing**. They are sometimes called utility classes or atomic classes by other front-end libraries. Modifiers help avoid writing repetitive CSS and make it easy to incorporate Pivotal UI's colors, typography, etc.

It is very often possible to achieve a desired effect just by composing modifier classes, without writing any new CSS. This approach is preferred whenever it is feasible, since it decreases the amount of CSS to maintain in a team's codebase and makes styling more consistent across codebases.

## Anatomy of a modifier

The CSS for a modifier class looks like this:

```
.underline {
  text-decoration: underline;
}
```

The `underline` class does exactly one thing: gives any text with this class an underline. On its own, this is not very impressive. The real power of modifiers becomes clear when composing multiple modifiers together.

## Using modifiers

To demonstrate how modifier classes can be composed, consider this unstyled content that displays the current year:

```jsx
::title=With no modifiers
<div>
  <span>current year:</span> <span>{new Date().getFullYear()}</span>
</div>
```

Now, let's add a bunch of modifier classes to the outer `div` and inner `span` elements:

```jsx
::title=With several modifiers
<div className="paxl bg-brand-8 type-neutral-11 border border-rounded h2 txt-c">
  <span className="em-high">current year:</span> <span className="em-low">{new Date().getFullYear()}</span>
</div>
```

Without writing any CSS, the content looks completely different.

## Modifier list

For details about all of the available modifiers, see the modifier documentation pages:

- [Alignment](/alignment)
- [Border](/border)
- [Box Shadows](/box-shadows)
- [Colors](/colors)
- [Ellipsis](/ellipsis)
- [Links](/links)
- [Positioning](/positioning)
- [Typography](/typography)
- [Vertical Alignment](/vertical-alignment)
- [Whitespace](/whitespace)