---
title: Colors
menu: modifiers
cssPath: pivotal-ui/css/colors
---

# Overview

Use color modifiers to to give elements background and text colors drawn from the Pivotal UI color palette.

Our color palette is composed of several different colors. At any given point it captures the current
evolution of our design and likely includes old and new colors. Whenever possible, evolve the old
colors rather than adding new ones.

## Classes

The full list of colors can be found [here](/colors/palette).

Prepend any color name with `bg-` to apply that color to an element's background.

Prepend any color name with `type-` to apply that color to an element's text.

# Palette

```jsx
::noToolbar

<TextFilter {...{
  className: 'mhl',
  filterPlaceholderText: 'Search colors...',
  data: Object.keys(colorPalette).reduce((memo, key) => [
    ...memo,
    ...colorPalette[key].map(number => `${key}-${number}`)
  ], []),
  emptyState: (
    <Grid className="border mtxl txt-c">
      <FlexCol className="paxl">No matching colors</FlexCol>
    </Grid>
  ),
  filter: (colorNames, filterText) => colorNames.filter(iconName => iconName.indexOf(filterText.toLowerCase()) > -1),
  renderFilteredData: colorNames => (
    <div className="border mtxl">
      {colorNames.map(colorName => {
        return (
          <Grid key={colorName} className="maxl">
            <FlexCol className={`bg-${colorName}`}/>
            <FlexCol className="pal txt-c">{colorName}</FlexCol>
            <FlexCol className="pal txt-c"><code>bg-{colorName}</code></FlexCol>
            <FlexCol className="pal txt-c"><code>type-{colorName}</code></FlexCol>
          </Grid>
        );
      })}
    </div>
  )
}}/>
```

# Examples

```html
::title=Text colors
<p class="type-brand-8">I'm a brand color!</p>
<p class="type-error-2">I'm an error color!</p>
```

```html
::title=Background colors
<p class="bg-brand-8">I'm a brand color!</p>
<p class="bg-warn-6">I'm a warning color!</p>
```