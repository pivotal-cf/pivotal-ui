pivotal-ui
==========

Pivotal UI will include Pivotal styles as well as Bootstrap CSS, OOCSS, FontAwesome icons fonts, and the Source Sans Pro Google Font in your project. This is everything you need to get started building UI at Pivotal.


## Getting Started with the CSS Version

Copy the `styleguide/` directory into your project. 

To use the styles, link to `styleguide/pivotal-ui.css` in your html. As long as you leave the directory structure intact this is all you need to do. Bravo!


## Getting Started with the Sass Version

If you think you'll want to modify the CSS, you'll need the Sass version of Pivotal-UI.

1. Copy `src/` into your project
2. Add Compass and Sass to your project
2. Compile *only* `src/pivotal-ui/pivotal-ui.scss` using compass 
3. Make the resulting css file available in your html.

## Including JavaScript components

For the javascript components you will need to include `application.js` from `styleguide/bootstrap/`.

`styleguide/index.html` has the static Style Guide for reference.
