pivotal-ui
==========
To use the styles, link to `build/pivotal-ui.css` and `build/font-awesome.css` to your html. You'll also need to copy `build/fonts` into your projects `public/` directory.

This will include Pivotal UI styles as well as Bootstrap CSS, OOCSS, FontAwesome font icons, and the Source Sans Pro Google Font.

For the javascript components you will need to include `application.js` from `lib/assets/`.

`styleguide/index.html` has the static Style Guide for reference.


## Example

### Markup

```html
<!-- index.html -->
<html>
<head>
  <title>a brand new styleguide: JavaScript</title>
  <link rel="stylesheet" href="./build/pivotal-ui.css">
  <link rel="stylesheet" href="./build/font-awesome.css">
</head>
...
```

### Directory structure

├── index.html
├── build
│   ├── font-awesome.css
│   ├── fonts
│   │   ├── FontAwesome.otf
│   │   ├── fontawesome-webfont.eot
│   │   ├── fontawesome-webfont.svg
│   │   ├── fontawesome-webfont.ttf
│   │   ├── fontawesome-webfont.woff
│   │   ├── sourcesanspro-black-webfont.eot
│   │   ├── sourcesanspro-black-webfont.svg
│   │   ├── sourcesanspro-black-webfont.ttf
│   │   ├── sourcesanspro-black-webfont.woff
│   │   ├── ...
│   ├── pivotal-ui.css
│   └── print.css
├── ...
