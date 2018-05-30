# Typography

## Description

Source Sans Pro is our font family.
It can be used with the following modifiers to achieve a variety of effects.

## Examples

```html
::title=Size
::description=Set font sizes using headings and modifier classes.
<h1>h1 32px</h1>

<h2>h2 24px</h2>

<h3>h3 20px</h3>

<h4>h4 18px</h4>

<h5>h5 16px</h5>

<h6>h6 13px</h6>

<p>base font size 16px</p>

<p class="type-sm">small text 14px</p>

<p class="type-xs">extra small text 12px</p>
```

```html
::title=Separating code and visual semantics
::description=Sometimes you may need to use a heading which has different visual and code semantics.
                  You can accomplish this by combining classes with elements
                  (classes take visual precedence over elements in this case).
<h1 class="h2">I am an h1!</h1>
<h2 class="h1">I am an h2!</h2>
```

```html
::title=Using heading classes
::description=If it's not a heading but you need similar visual treatment you can add just the class to any element. However, use headings when possible since they add semantic value.
<div class="h2">Heading level 2 on a div</div>
```

```html
::title=Emphasis modifiers
::description=Type emphasis modifiers can be used on any type element. Here's a table of all the emphasis modifier classes.
<h1 class="em-low">Low emphasis</h1>

<h1 class="em-default">Default emphasis</h1>

<h1 class="em-high">High emphasis</h1>

<h1 class="em-alt">Emphasis alternate</h1>
```

```html
::title=Colors
::description=You can apply color to any text with the color classes.
<p class="type-brand-8">I'm a brand color!</p>
```

```html
::noToolbar
<table class="styleguide table">
  <tr>
    <td class="bg-neutral-11"> <p class="type-inverse">Type inverse</p> </td>
    <td class="bg-dark-2"> <p class="type-inverse">Type inverse</p> </td>
    <td> <code>.type-inverse</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-neutral-1">Type neutral 1</p> </td>
    <td class="bg-dark-2"> <p class="type-neutral-1">Type neutral 1</p> </td>
    <td> <code>.type-neutral-1</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-neutral-2">Type neutral 2</p> </td>
    <td class="bg-dark-2"> <p class="type-neutral-2">Type neutral 2</p> </td>
    <td> <code>.type-neutral-2</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-neutral-3">Type neutral 3</p> </td>
    <td class="bg-dark-2"> <p class="type-neutral-3">Type neutral 3</p> </td>
    <td> <code>.type-neutral-3</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-neutral-4">Type neutral 4</p> </td>
    <td class="bg-dark-2"> <p class="type-neutral-4">Type neutral 4</p> </td>
    <td> <code>.type-neutral-4</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-neutral-5">Type neutral 5</p> </td>
    <td class="bg-dark-2"> <p class="type-neutral-5">Type neutral 5</p> </td>
    <td> <code>.type-neutral-5</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-neutral-6">Type neutral 6</p> </td>
    <td class="bg-dark-2"> <p class="type-neutral-6">Type neutral 6</p> </td>
    <td> <code>.type-neutral-6</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-neutral-7">Type neutral 7</p> </td>
    <td class="bg-dark-2"> <p class="type-neutral-7">Type neutral 7</p> </td>
    <td> <code>.type-neutral-7</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-neutral-8">Type neutral 8</p> </td>
    <td class="bg-dark-2"> <p class="type-neutral-8">Type neutral 8</p> </td>
    <td> <code>.type-neutral-8</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-neutral-9">Type neutral 9</p> </td>
    <td class="bg-dark-2"> <p class="type-neutral-9">Type neutral 9</p> </td>
    <td> <code>.type-neutral-9</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-neutral-10">Type neutral 10</p> </td>
    <td class="bg-dark-2"> <p class="type-neutral-10">Type neutral 10</p> </td>
    <td> <code>.type-neutral-10</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-neutral-11">Type neutral 11</p> </td>
    <td class="bg-dark-2"> <p class="type-neutral-11">Type neutral 11</p> </td>
    <td> <code>.type-neutral-11</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-dark-1">Type dark 1</p> </td>
    <td class="bg-dark-2"> <p class="type-dark-1">Type dark 1</p> </td>
    <td> <code>.type-dark-1</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-dark-2">Type dark 2</p> </td>
    <td class="bg-dark-2"> <p class="type-dark-2">Type dark 2</p> </td>
    <td> <code>.type-dark-2</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-dark-3">Type dark 3</p> </td>
    <td class="bg-dark-2"> <p class="type-dark-3">Type dark 3</p> </td>
    <td> <code>.type-dark-3</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-dark-4">Type dark 4</p> </td>
    <td class="bg-dark-2"> <p class="type-dark-4">Type dark 4</p> </td>
    <td> <code>.type-dark-4</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-dark-5">Type dark 5</p> </td>
    <td class="bg-dark-2"> <p class="type-dark-5">Type dark 5</p> </td>
    <td> <code>.type-dark-5</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-dark-6">Type dark 6</p> </td>
    <td class="bg-dark-2"> <p class="type-dark-6">Type dark 6</p> </td>
    <td> <code>.type-dark-6</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-dark-7">Type dark 7</p> </td>
    <td class="bg-dark-2"> <p class="type-dark-7">Type dark 7</p> </td>
    <td> <code>.type-dark-7</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-dark-8">Type dark 8</p> </td>
    <td class="bg-dark-2"> <p class="type-dark-8">Type dark 8</p> </td>
    <td> <code>.type-dark-8</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-dark-9">Type dark 9</p> </td>
    <td class="bg-dark-2"> <p class="type-dark-9">Type dark 9</p> </td>
    <td> <code>.type-dark-9</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-dark-10">Type dark 10</p> </td>
    <td class="bg-dark-2"> <p class="type-dark-10">Type dark 10</p> </td>
    <td> <code>.type-dark-10</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-dark-11">Type dark 11</p> </td>
    <td class="bg-dark-2"> <p class="type-dark-11">Type dark 11</p> </td>
    <td> <code>.type-dark-11</code> </td>
  </tr>
    <tr>
    <td class="bg-neutral-11"> <p class="type-accent-1">Type accent 1</p> </td>
    <td class="bg-dark-2"> <p class="type-accent-1">Type accent 1</p> </td>
    <td> <code>.type-accent-1</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-accent-2">Type accent 2</p> </td>
    <td class="bg-dark-2"> <p class="type-accent-2">Type accent 2</p> </td>
    <td> <code>.type-accent-2</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-accent-3">Type accent 3</p> </td>
    <td class="bg-dark-2"> <p class="type-accent-3">Type accent 3</p> </td>
    <td> <code>.type-accent-3</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-accent-4">Type accent 4</p> </td>
    <td class="bg-dark-2"> <p class="type-accent-4">Type accent 4</p> </td>
    <td> <code>.type-accent-4</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-accent-5">Type accent 5</p> </td>
    <td class="bg-dark-2"> <p class="type-accent-5">Type accent 5</p> </td>
    <td> <code>.type-accent-5</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-accent-6">Type accent 6</p> </td>
    <td class="bg-dark-2"> <p class="type-accent-6">Type accent 6</p> </td>
    <td> <code>.type-accent-6</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-brand-1">Type brand 1</p> </td>
    <td class="bg-dark-2"> <p class="type-brand-1">Type brand 1</p> </td>
    <td> <code>.type-brand-1</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-brand-2">Type brand 2</p> </td>
    <td class="bg-dark-2"> <p class="type-brand-2">Type brand 2</p> </td>
    <td> <code>.type-brand-2</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-brand-3">Type brand 3</p> </td>
    <td class="bg-dark-2"> <p class="type-brand-3">Type brand 3</p> </td>
    <td> <code>.type-brand-3</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-brand-4">Type brand 4</p> </td>
    <td class="bg-dark-2"> <p class="type-brand-4">Type brand 4</p> </td>
    <td> <code>.type-brand-4</code> </td>
  </tr>
    <tr>
    <td class="bg-neutral-11"> <p class="type-brand-5">Type brand 5</p> </td>
    <td class="bg-dark-2"> <p class="type-brand-5">Type brand 5</p> </td>
    <td> <code>.type-brand-5</code> </td>
  </tr>
    <tr>
    <td class="bg-neutral-11"> <p class="type-brand-6">Type brand 6</p> </td>
    <td class="bg-dark-2"> <p class="type-brand-6">Type brand 6</p> </td>
    <td> <code>.type-brand-6</code> </td>
  </tr>
    <tr>
    <td class="bg-neutral-11"> <p class="type-brand-7">Type brand 7</p> </td>
    <td class="bg-dark-2"> <p class="type-brand-7">Type brand 7</p> </td>
    <td> <code>.type-brand-7</code> </td>
  </tr>
    <tr>
    <td class="bg-neutral-11"> <p class="type-brand-8">Type brand 8</p> </td>
    <td class="bg-dark-2"> <p class="type-brand-8">Type brand 8</p> </td>
    <td> <code>.type-brand-8</code> </td>
  </tr>
    <tr>
    <td class="bg-neutral-11"> <p class="type-brand-9">Type brand 9</p> </td>
    <td class="bg-dark-2"> <p class="type-brand-9">Type brand 9</p> </td>
    <td> <code>.type-brand-9</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-brand-10">Type brand 10</p> </td>
    <td class="bg-dark-2"> <p class="type-brand-10">Type brand 10</p> </td>
    <td> <code>.type-brand-10</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-brand-11">Type brand 11</p> </td>
    <td class="bg-dark-2"> <p class="type-brand-11">Type brand 11</p> </td>
    <td> <code>.type-brand-11</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-error-1">Type error 1</p> </td>
    <td class="bg-dark-2"> <p class="type-error-1">Type error 1</p> </td>
    <td> <code>.type-error-1</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-error-2">Type error 2</p> </td>
    <td class="bg-dark-2"> <p class="type-error-2">Type error 2</p> </td>
    <td> <code>.type-error-2</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-error-3">Type error 3</p> </td>
    <td class="bg-dark-2"> <p class="type-error-3">Type error 3</p> </td>
    <td> <code>.type-error-3</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-error-4">Type error 4</p> </td>
    <td class="bg-dark-2"> <p class="type-error-4">Type error 4</p> </td>
    <td> <code>.type-error-4</code> </td>
  </tr>
    <tr>
    <td class="bg-neutral-11"> <p class="type-error-5">Type error 5</p> </td>
    <td class="bg-dark-2"> <p class="type-error-5">Type error 5</p> </td>
    <td> <code>.type-error-5</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-error-6">Type error 6</p> </td>
    <td class="bg-dark-2"> <p class="type-error-6">Type error 6</p> </td>
    <td> <code>.type-error-6</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-success-1">Type success 1</p> </td>
    <td class="bg-dark-2"> <p class="type-success-1">Type success 1</p> </td>
    <td> <code>.type-success-1</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-success-2">Type success 2</p> </td>
    <td class="bg-dark-2"> <p class="type-success-2">Type success 2</p> </td>
    <td> <code>.type-success-2</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-success-3">Type success 3</p> </td>
    <td class="bg-dark-2"> <p class="type-success-3">Type success 3</p> </td>
    <td> <code>.type-success-3</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-success-4">Type success 4</p> </td>
    <td class="bg-dark-2"> <p class="type-success-4">Type success 4</p> </td>
    <td> <code>.type-success-4</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-success-5">Type success 5</p> </td>
    <td class="bg-dark-2"> <p class="type-success-5">Type success 5</p> </td>
    <td> <code>.type-success-5</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-success-6">Type success 6</p> </td>
    <td class="bg-dark-2"> <p class="type-success-6">Type success 6</p> </td>
    <td> <code>.type-success-6</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-warn-1">Type warn 1</p> </td>
    <td class="bg-dark-2"> <p class="type-warn-1">Type warn 1</p> </td>
    <td> <code>.type-warn-1</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-warn-2">Type warn 2</p> </td>
    <td class="bg-dark-2"> <p class="type-warn-2">Type warn 2</p> </td>
    <td> <code>.type-warn-2</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-warn-3">Type warn 3</p> </td>
    <td class="bg-dark-2"> <p class="type-warn-3">Type warn 3</p> </td>
    <td> <code>.type-warn-3</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-warn-4">Type warn 4</p> </td>
    <td class="bg-dark-2"> <p class="type-warn-4">Type warn 4</p> </td>
    <td> <code>.type-warn-4</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-warn-5">Type warn 5</p> </td>
    <td class="bg-dark-2"> <p class="type-warn-5">Type warn 5</p> </td>
    <td> <code>.type-warn-5</code> </td>
  </tr>
  <tr>
    <td class="bg-neutral-11"> <p class="type-warn-6">Type warn 6</p> </td>
    <td class="bg-dark-2"> <p class="type-warn-6">Type warn 6</p> </td>
    <td> <code>.type-warn-6</code> </td>
  </tr>
</table>
```

```html
::title=Multiline headings
::description=Headings are spaced so their line height and padding are consistent on one or many lines.
<h1>One line heading</h1>

<h1>I am a <br/> multiline heading</h1>
```

## Installation & Usage

`npm install pivotal-ui --save`

`import 'pivotal-ui/css/typography';`
