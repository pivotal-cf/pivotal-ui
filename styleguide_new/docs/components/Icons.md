# Icons

***This component is limited to projects that use Webpack.***
***It requires the webpack loaders babel-loader and react-svg-loader.***

`npm install pui-react-icons --save`

`npm install babel-loader react-svg-loader --save-dev`

## Description

We use custom SVG icons, available at [http://pivotalicons.cfapps.io](http://pivotalicons.cfapps.io).
We recommend using the React Iconography component if you are using icons. We do provide all icons as SVGs
inside of the pui-css-iconography node module (inside `node_modules/pui-css-iconography/svgs/`).
If you are not using JavaScript and would like to use a Pivotal UI Icon,
you can copy these SVGs directly, either with an img tag or as inlined SVG.

When styling the SVGs, remember to use the `fill` or `stroke` attributes instead of `color`.
Wrapping the SVG or img tag in the `.icon` class will allow you to size and align the icon easily as presented in the
example below.

An SVG wrapped with `.icon` can inherit the font size of the element above it, be sized by a type modifier class, or be passed a font size directly.

```html
<h1>
  <div class="icon">
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
      <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm2 34h-4v-4h4v4zm4.13-15.49l-1.79 1.84C26.9 25.79 26 27 26 30h-4v-1c0-2.21.9-4.21 2.34-5.66l2.49-2.52C27.55 20.1 28 19.1 28 18c0-2.21-1.79-4-4-4s-4 1.79-4 4h-4c0-4.42 3.58-8 8-8s8 3.58 8 8c0 1.76-.71 3.35-1.87 4.51z"/>
    </svg>
  </div>
</h1>

```

Align SVG to baseline with `.icon-baseline` modifier class.

```html
<h1>
  Example
  <div class="icon icon-baseline">
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
      <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm2 34h-4v-4h4v4zm4.13-15.49l-1.79 1.84C26.9 25.79 26 27 26 30h-4v-1c0-2.21.9-4.21 2.34-5.66l2.49-2.52C27.55 20.1 28 19.1 28 18c0-2.21-1.79-4-4-4s-4 1.79-4 4h-4c0-4.42 3.58-8 8-8s8 3.58 8 8c0 1.76-.71 3.35-1.87 4.51z"/>
    </svg>
  </div>
</h1>
```

Wrap an image tag with `.icon` to get the same sizing functionality.

```html
<div class="icon">
  <img src="styleguide/help.svg">
</div>
```

## Spinner

Spinner behavior is determined by size. Note that the large spinner moves relatively slowly, whereas the small spinner
moves more quickly and dramatically.  In all cases, the base height and width is 1em
and is meant to be overwritten with a font-size attribute. The font sizes provided here are meant as suggestions.

```html_example
<div class="grid txt-c">
  <div class="col col-top">
  <div class="mbl"><code>.spinner-lg</code></div>
    <div class="icon icon-middle" style="font-size: 96px">
        <svg class="icon-spinner-lg" width="100px" height="100px" viewBox="0 0 101 101"
             xmlns="http://www.w3.org/2000/svg">
            <circle class="ring" fill="none" stroke-width="10%" stroke-linecap="butt" cx="50%" cy="50%"
                    r="45%"></circle>
            <circle class="path" fill="none" stroke-width="10%" stroke-linecap="butt" cx="50%" cy="50%"
                    r="45%"></circle>
        </svg>
    </div>
  </div>
  <div class="col col-top">
    <div class="mbl"><code>.spinner-md</code></div>
    <div class="icon icon-middle" style="font-size: 48px">
        <svg class="icon-spinner-md" width="100px" height="100px" viewBox="0 0 101 101"
             xmlns="http://www.w3.org/2000/svg">
            <circle class="ring" fill="none" stroke-width="10%" stroke-linecap="butt" cx="50%" cy="50%"
                    r="45%"></circle>
            <circle class="path" fill="none" stroke-width="10%" stroke-linecap="butt" cx="50%" cy="50%"
                    r="45%"></circle>
        </svg>
    </div>
  </div>
  <div class="col col-top">
    <div class="mbl"><code>.spinner-sm</code></div>
    <div class="icon icon-middle" style="font-size: 16px">
        <svg class="icon-spinner-sm" width="100px" height="100px" viewBox="0 0 101 101"
             xmlns="http://www.w3.org/2000/svg">
            <circle class="ring" fill="none" stroke-width="10%" stroke-linecap="butt" cx="50%" cy="50%"
                    r="45%"></circle>
            <circle class="path" fill="none" stroke-width="10%" stroke-linecap="butt" cx="50%" cy="50%"
                    r="45%"></circle>
        </svg>
    </div>
  </div>
</div>
```