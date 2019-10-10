---
title: Typography
cssPath: pivotal-ui/css/typography
---

Use the typography modifiers to control text sizing, emphasis, and color.

[Source Sans Pro](https://fonts.google.com/specimen/Source+Sans+Pro) is Pivotal UI's default font family. It is packaged with the typography CSS, so the import statement below includes it in your site.

## Classes

In addition to the modifiers listed here, importing typography CSS gives you the `type-{color-name}` modifiers listed on the [Colors page](/modifiers/colors).

Modifier | Purpose
---------|--------
`em-low` | Makes font weight thin
`em-default` | Makes font weight default
`em-high` | Makes font weight bold
`em-max` | Makes font weight extra bold
`em-alt` | Makes text uppercase
`em-capitalize` | Makes text capitalized
`h1` | Sets font size, family, and spacing to be the same as an `<h1>` tag
`h2` | Sets font size, family, and spacing to be the same as an `<h2>` tag
`h3` | Sets font size, family, and spacing to be the same as an `<h3>` tag
`h4` | Sets font size, family, and spacing to be the same as an `<h4>` tag
`h5` | Sets font size, family, and spacing to be the same as an `<h5>` tag
`h6` | Sets font size, family, and spacing to be the same as an `<h6>` tag
`type-lg` | Makes font size larger than the default
`type-sm` | Makes font size smaller than the default
`type-xs` | Makes font size much smaller than the default

```html
//title=Default font sizes
<h1>an h1 (32px)</h1>
<h2>an h2 (24px)</h2>
<h3>an h3 (20px)</h3>
<h4>an h4 (18px)</h4>
<h5>an h5 (16px)</h5>
<h6>an h6 (13px)</h6>
<p>base font size (16px)</p>
```

```html
//title=Size modifiers
<p class="type-lg">large font size (18px)</p>
<p>base font size (16px)</p>
<p class="type-sm">small font size (14px)</p>
<p class="type-xs">extra small font size (12px)</p>
```

```html
//title=Emphasis modifiers
<h1 class="mbxl em-low">Low emphasis</h1>
<h1 class="mbxl em-default">Default emphasis</h1>
<h1 class="mbxl em-high">High emphasis</h1>
<h1 class="mbxl em-max">Max emphasis</h1>
<h1 class="em-alt">Alternate emphasis (all-caps)</h1>
<h1 class="em-capitalize">capitalize emphasis</h1>
```

```html
//title=Separating code and visual semantics
//description=Sometimes you may need to use a heading which has different visual and code semantics. You can accomplish this by combining classes with elements (classes take visual precedence over elements in this case).
<h1 class="h2">I am an h1!</h1>
<h2 class="h1">I am an h2!</h2>
```

```html
//title=Using heading classes
//description=If it's not a heading but you need similar visual treatment, you can add just the class to any element. However, use headings when possible since they add semantic value.
<div class="h2">Heading level 2 on a div</div>
```

```html
//title=Multiline headings
//description=Headings are spaced so their line height and padding are consistent on one or many lines.
<h1>One line heading</h1>

<h1>I am a <br/> multiline heading</h1>
```