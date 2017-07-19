# Links

## Description

Add the class `link-text` on any text links.
This will make the link underlined on hover (except lowlight links).

There are four different kinds of links you can use to connect related content.
In most cases (unless the designer specifically asks for another type of link)
you should choose the default link.

Link                                                                                                              | Class                           | Description
--------------------------------------------------------------------------------------------------------------    | ----------------------------    | -----------
<a class="link-text" href="http://bit.ly/1ulOAW7" target="_blank">default link</a>                                | `link-text`                     | Important links
<a class="link-text link-lowlight" href="http://bit.ly/1ulOAW7" target="_blank">lowlight link</a>                 | `link-text link-lowlight`       | Less important links
<a class="link-text link-inverse bg-dark-1" href="http://bit.ly/1ulOAW7" target="_blank">inverse link</a>         | `link-text link-inverse`        | I go on a non-white background

## Examples
```html
<a class="link-text" href="http://bitly.com/11vCzUx">
  <div class="icon icon-baseline">
      <svg class="icon-add-circle" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
          <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm10 22h-8v8h-4v-8h-8v-4h8v-8h4v8h8v4z"></path>
      </svg>
  </div>
  Click me!
</a>
```

```html
Here's a <a class="link-text link-lowlight" href="http://bit.ly/1wO7Nhv">less important link</a>
```

## Installation & Usage

`npm install pui-css-links --save`
