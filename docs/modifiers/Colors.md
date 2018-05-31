---
title: Colors
cssPath: pivotal-ui/css/colors
---

## Description

Our color pallet is composed of several different colors. At any given point it captures the current
evolution of our design and likely includes old and new colors. Whenever possible, evolve the old
colors rather than adding new ones.

Sass variables should only be used in variables.css.scss.
They should never be used directly when building components, because it makes it very hard to change the values later if you can't tell how they might have been used. You should **define your own variables** that use these colors in variables.css.scss.
```
$tabs-active-bg-color: $gray-2;
```

If you do want to use variables and mixins, see [Installation & Usage](#installation-usage).


## Examples

Prepend any color variable with `bg-` to apply that color to the background.

Prepend any color variable with `type-` to apply that color to the text.

```jsx
::noToolbar
<div>
<div className="color-chip-row">
    <div className="chip">
      <div className="chip-color bg-neutral-1"></div>
      <div className="chip-color-name">
        <p className="mvn">neutral-1</p>
      </div>
    </div>

    <div className="chip">
      <div className="chip-color bg-neutral-2"></div>
      <div className="chip-color-name">
        <p className="mvn">neutral-2</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-neutral-3"></div>
      <div className="chip-color-name">
        <p className="mvn">neutral-3</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-neutral-4"></div>
      <div className="chip-color-name">
        <p className="mvn">neutral-4</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-neutral-5"></div>
      <div className="chip-color-name">
        <p className="mvn">neutral-5</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-neutral-6"></div>
      <div className="chip-color-name">
        <p className="mvn">neutral-6</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-neutral-7"></div>
      <div className="chip-color-name">
        <p className="mvn">neutral-7</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-neutral-8"></div>
      <div className="chip-color-name">
        <p className="mvn">neutral-8</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-neutral-9"></div>
      <div className="chip-color-name">
        <p className="mvn">neutral-9</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-neutral-10"></div>
      <div className="chip-color-name">
        <p className="mvn">neutral-10</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-neutral-11"></div>
      <div className="chip-color-name">
        <p className="mvn">neutral-11</p>
      </div>
    </div>
</div>

<div className="color-chip-row">
    <div className="chip">
      <div className="chip-color bg-dark-1"></div>
      <div className="chip-color-name">
        <p className="mvn">dark-1</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-dark-2"></div>
      <div className="chip-color-name">
        <p className="mvn">dark-2</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-dark-3"></div>
      <div className="chip-color-name">
        <p className="mvn">dark-3</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-dark-4"></div>
      <div className="chip-color-name">
        <p className="mvn">dark-4</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-dark-5"></div>
      <div className="chip-color-name">
        <p className="mvn">dark-5</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-dark-6"></div>
      <div className="chip-color-name">
        <p className="mvn">dark-6</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-dark-7"></div>
      <div className="chip-color-name">
        <p className="mvn">dark-7</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-dark-8"></div>
      <div className="chip-color-name">
        <p className="mvn">dark-8</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-dark-9"></div>
      <div className="chip-color-name">
        <p className="mvn">dark-9</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-dark-10"></div>
      <div className="chip-color-name">
        <p className="mvn">dark-10</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-dark-11"></div>
      <div className="chip-color-name">
        <p className="mvn">dark-11</p>
      </div>
    </div>
</div>

<div className="color-chip-row">
    <div className="chip">
      <div className="chip-color bg-brand-1"></div>
      <div className="chip-color-name">
        <p className="mvn">brand-1</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-brand-2"></div>
      <div className="chip-color-name">
        <p className="mvn">brand-2</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-brand-3"></div>
      <div className="chip-color-name">
        <p className="mvn">brand-3</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-brand-4"></div>
      <div className="chip-color-name">
        <p className="mvn">brand-4</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-brand-5"></div>
      <div className="chip-color-name">
        <p className="mvn">brand-5</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-brand-6"></div>
      <div className="chip-color-name">
        <p className="mvn">brand-6</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-brand-7"></div>
      <div className="chip-color-name">
        <p className="mvn">brand-7</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-brand-8"></div>
      <div className="chip-color-name">
        <p className="mvn">brand-8</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-brand-9"></div>
      <div className="chip-color-name">
        <p className="mvn">brand-9</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-brand-10"></div>
      <div className="chip-color-name">
        <p className="mvn">brand-10</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-brand-11"></div>
      <div className="chip-color-name">
        <p className="mvn">brand-11</p>
      </div>
    </div>
</div>

<div className="color-chip-row">
    <div className="chip">
      <div className="chip-color bg-accent-1"></div>
      <div className="chip-color-name">
        <p className="mvn">accent-1</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-accent-2"></div>
      <div className="chip-color-name">
        <p className="mvn">accent-2</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-accent-3"></div>
      <div className="chip-color-name">
        <p className="mvn">accent-3</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-accent-4"></div>
      <div className="chip-color-name">
        <p className="mvn">accent-4</p>
      </div>
    </div>

    <div className="chip">
      <div className="chip-color bg-accent-5"></div>
      <div className="chip-color-name">
        <p className="mvn">accent-5</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-accent-6"></div>
      <div className="chip-color-name">
        <p className="mvn">accent-6</p>
      </div>
    </div>
    <div className="chip"></div>
    <div className="chip"></div>
    <div className="chip"></div>
    <div className="chip"></div>
    <div className="chip"></div>
</div>

<div className="color-chip-row">
    <div className="chip">
      <div className="chip-color bg-error-1"></div>
      <div className="chip-color-name">
        <p className="mvn">error-1</p>
      </div>
    </div>

    <div className="chip">
      <div className="chip-color bg-error-2"></div>
      <div className="chip-color-name">
        <p className="mvn">error-2</p>
      </div>
    </div>

    <div className="chip">
      <div className="chip-color bg-error-3"></div>
      <div className="chip-color-name">
        <p className="mvn">error-3</p>
      </div>
    </div>

    <div className="chip">
      <div className="chip-color bg-error-4"></div>
      <div className="chip-color-name">
        <p className="mvn">error-4</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-error-5"></div>
      <div className="chip-color-name">
        <p className="mvn">error-5</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-error-6"></div>
      <div className="chip-color-name">
        <p className="mvn">error-6</p>
      </div>
    </div>
    <div className="chip"></div>
    <div className="chip"></div>
    <div className="chip"></div>
    <div className="chip"></div>
    <div className="chip"></div>
</div>

<div className="color-chip-row">
    <div className="chip">
      <div className="chip-color bg-warn-1"></div>
      <div className="chip-color-name">
        <p className="mvn">warn-1</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-warn-2"></div>
      <div className="chip-color-name">
        <p className="mvn">warn-2</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-warn-3"></div>
      <div className="chip-color-name">
        <p className="mvn">warn-3</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-warn-4"></div>
      <div className="chip-color-name">
        <p className="mvn">warn-4</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-warn-5"></div>
      <div className="chip-color-name">
        <p className="mvn">warn-5</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-warn-6"></div>
      <div className="chip-color-name">
        <p className="mvn">warn-6</p>
      </div>
    </div>
    <div className="chip"></div>
    <div className="chip"></div>
    <div className="chip"></div>
    <div className="chip"></div>
    <div className="chip"></div>
</div>

<div className="color-chip-row">
    <div className="chip">
      <div className="chip-color bg-success-1"></div>
      <div className="chip-color-name">
        <p className="mvn">success-1</p>
      </div>
    </div>

    <div className="chip">
      <div className="chip-color bg-success-2"></div>
      <div className="chip-color-name">
        <p className="mvn">success-2</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-success-3"></div>
      <div className="chip-color-name">
        <p className="mvn">success-3</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-success-4"></div>
      <div className="chip-color-name">
        <p className="mvn">success-4</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-success-5"></div>
      <div className="chip-color-name">
        <p className="mvn">success-5</p>
      </div>
    </div>
    <div className="chip">
      <div className="chip-color bg-success-6"></div>
      <div className="chip-color-name">
        <p className="mvn">success-6</p>
      </div>
    </div>
    <div className="chip"></div>
    <div className="chip"></div>
    <div className="chip"></div>
    <div className="chip"></div>
    <div className="chip"></div>
</div>
</div>
```

## Installation & Usage

#### CSS Only

`npm install pivotal-ui --save`

`import 'pivotal-ui/css/colors';`

`import 'pivotal-ui/css/variables-and-mixins';`
