pivotal-ui
==========

Pivotal UI will include Pivotal styles as well as Bootstrap CSS, OOCSS, FontAwesome icons fonts, and the Source Sans Pro Google Font in your project. This is everything you need to get started building UI at Pivotal.


## Getting Started with the CSS Version

Copy the `dist/` directory into your project.

To use the styles, link to `dist/pivotal-ui/pivotal-ui.css` in your html. As long as you leave the directory structure intact this is all you need to do. Bravo!


## Getting Started with the Sass Version

If you think you'll want to modify the CSS, you'll need the Sass version of Pivotal-UI.

1. Copy `src/` into your project
2. Add Compass and Sass to your project
2. Compile *only* `src/pivotal-ui/pivotal-ui.scss` using compass 
3. Make the resulting css file available in your html.

## Including JavaScript components

For the javascript components you will need to include `dist/pivotal-ui/pivotal-ui.js` from `dist/bootstrap/`.

`dist/index.html` has the static Style Guide for reference.

## Developer Notes

If you intend to push code for pivotal ui itself, there are a few things you'll need to do.

### Install Tools (in order)

node and npm

    $ brew install node
    
grunt-cli 

    $ npm install grunt-cli --global

Add dependencies by running the following from the project root

    $ npm install

### Build the project

As soon as you have your tools installed, and then again each time you make changes you want to see reflected in the styleguide, you'll need to run grunt _at the project root_:

    $ grunt

### Pushing the styleguide to cfapps.io

After building, in the project root directory, run 

    $ cf push -f manifest.yml



