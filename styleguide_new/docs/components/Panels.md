# Panels

## Description

Using Panels, you can organize information collections into logical groups, aggregate your content and show it to be context specific. They include box headers, footers, and can be combined with any background. See it in action [here](https://pui-pivots.cfapps.io/).

## Do's

- Use a panel to logically group content that has the following form: header, body, and/or footer.
- Use multiple panels or list-group inside to group a collection of related content objects.
- Distinguish between primary and secondary CTAs in the header and footer (e.g., primary vs secondary buttons).

## Don'ts

- Use a panel as a generic wrapping element. Instead, avail yourself of the various background color modifiers we have.
- Overload the panel header with too many calls to action.
- Use a panel when screen real estate is valuable, instead consider a table layout or grouped-list.

## Variants

```jsx
::title=Basic Example
<div>
    <Panel className="bg-neutral-10 optional-class" innerClassName="opt-inner-class">
      <p>Base Panel</p>
    </Panel>
</div>
```

```jsx
::title=Basic Example
<div>
    <Panel className="bg-neutral-10" header='header'>
      Base Panel with base header
    </Panel>
</div>
```

```jsx
::title=Basic Example
<div>
    <Panel className="bg-neutral-10" header="Title" subtitle="subtitle">
      Base Panel with subtitle
    </Panel>
</div>
```

```jsx
::title=Basic Example
<Panel className="bg-neutral-8" scrollable={100}>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
</Panel>
```
