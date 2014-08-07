# pivotal-ui

***

Pivotal UI will include Pivotal styles as well as Bootstrap CSS, OOCSS, FontAwesome icons fonts, and the Source Sans Pro Google Font in your project. This is everything you need to get started building UI at Pivotal.


## Getting started

### CSS Version

1. Copy the `dist/` directory into your project.

2. Link to `dist/pivotal-ui/pivotal-ui.css` in your html to use the styles. 

As long as you leave the directory structure intact this is all you need to do. Bravo!


### Sass Version

If you think you'll want to modify the CSS, you'll need the Sass version of Pivotal-UI.

1. Copy `src/` into your project
2. Add Compass and Sass to your project
2. Compile *only* `src/pivotal-ui/pivotal-ui.scss` using compass 
3. Make the resulting css file available in your html.

### JavaScript components

For the javascript components you will need to include `dist/pivotal-ui/pivotal-ui.js` from `dist/bootstrap/`.

`dist/index.html` has the static Style Guide for reference.

## Syntax Highlighting

There are two themes, **dark** and **light**, for syntax highlighting. You can choose a theme, by linking to one of the following stylesheets:

* `dist/syntax-highlighting/prism-default.css` (for the light theme)
* `dist/syntax-highlighting/prism-okaida.css` (for the dark theme). 

You can only include one of these themes at a time.

See the styleguide for [examples of syntax highlighting in action](http://styleguide.cfapps.io/all.html#code).

### Usage

```

  <pre>
	<code class='language-ruby'>
	  class Foo
	    def bar
	    end
	  end
	</code>
  </pre>

```




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



