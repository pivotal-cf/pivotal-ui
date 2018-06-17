---
title: Colors
menu: modifiers
cssPath: pivotal-ui/css/colors
---

# Overview

Our color palette is composed of several different colors. At any given point it captures the current
evolution of our design and likely includes old and new colors. Whenever possible, evolve the old
colors rather than adding new ones.

## Classes

Prepend any color name with `bg-` to apply that color to the background.

Prepend any color name with `type-` to apply that color to the text.

# Palette

```jsx
::noToolbar

const colors = {
  neutral: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  dark: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  brand: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  accent: [1, 2, 3, 4, 5, 6],
  error: [1, 2, 3, 4, 5, 6],
  warn: [1, 2, 3, 4, 5, 6],
  success: [1, 2, 3, 4, 5, 6]
};

<div>
{Object.keys(colors).map(color => (
  <div className="color-chip-row" key={color}>
    {colors[color].map(number => (
      <div className="chip">
        <div className={'chip-color bg-' + color + '-' + number}/>
        <div className="chip-color-name" key={number}>
          <p className="mvn">{color}-{number}</p>
        </div>
      </div>
    ))}
  </div>
))}
</div>
```