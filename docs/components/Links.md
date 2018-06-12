---
title: Links
menu: modifiers
cssPath: pivotal-ui/css/links
---

# Overview

The following classes allow you to control the underline color and the hover state. By default,
links are not underlined.

Class                           | Description
----------------------------    | -----------
`no-underline`                  | No text decoration or background image
`underline`                     | Adds text decoration underline
`underline-hover`               | Adds text decoration underline when the state is hover
`underline-blue`                | Utilizes background image to define a blue underline
`underline-blue-hover`          | Utilizes background image to define a blue underline when the state is hover
`underline-gray`                | Utilizes background image to define a gray underline
`underline-gray-hover`          | Utilizes background image to define a gray underline when the state is hover

# Examples

```html
::title=Link examples
<p>
    <a href="http://bitly.com/11vCzUx">
      <div class="icon icon-baseline">
          <svg class="icon-add-circle" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
              <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm10 22h-8v8h-4v-8h-8v-4h8v-8h4v8h8v4z"></path>
          </svg>
      </div>
      Click me, I'm a default link!
    </a>
</p>
<p> Here's a <a class="no-underline" href="http://bit.ly/1wO7Nhv">no underline</a> </p>
<p> Here's a <a class="underline" href="http://bit.ly/1wO7Nhv">underline</a> </p>
<p> Here's a <a class="underline-hover" href="http://bit.ly/1wO7Nhv">underline on hover</a> </p>
<p> Here's a <a class="underline-blue" href="http://bit.ly/1wO7Nhv">underline blue</a> </p>
<p> Here's a <a class="underline-blue-hover" href="http://bit.ly/1wO7Nhv">underline blue on hover</a> </p>
<p> Here's a <a class="underline-gray" href="http://bit.ly/1wO7Nhv">underline gray</a> </p>
<p> Here's a <a class="underline-gray-hover" href="http://bit.ly/1wO7Nhv">underline gray on hover</a> </p>
```