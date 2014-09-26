# pivotal-ui

***

Pivotal UI includes Pivotal styles as well as Bootstrap CSS, OOCSS, FontAwesome icons fonts, and the Source Sans Pro Google Font in your project. This is everything you need to get started building UI at Pivotal.

## What's included

#### JavaScript
- jQuery v2.1.1
- modernizr v2.8.3
- Bootstrap v3.0.2
- Prism.js

#### CSS
- Bootstrap v3.0.2
- Font Awesome v4.10
- Normalize CSS v1.0.2
- OOCSS

#### Fonts
- Source Sans Pro

[Visit a live version of the styleguide](http://styleguide.cfapps.io).


## Getting started

[Download the latest release](https://github.com/pivotal-cf/pivotal-ui/releases) or follow the [developer notes](#developer-notes) to compile the source yourself.

### Compiled version (Recommended)

1. [Download the latest release](https://github.com/pivotal-cf/pivotal-ui/releases)
1. Unzip the release archive and move the release directory into your project
1. Add `<link rel="stylesheet" href="/path/to/release/pivotal-ui/pivotal-ui.css">` to your html template to include the styles.
1. Add `<script src="/path/to/release/pivotal-ui/pivotal-ui.js"></script>` to your html template to use the javascript.

#### Styleguide

Host `pivotal-ui/styleguide/` with a web server to view the available components.

#### Editing components

Do not edit compiled assets directly. If you need a component and you cannot find it in the styleguide, write your own styles and javascript separately. Doing so will make it easier to update to newer versions.


### Compiling from source

1. Copy `src/` into your project
2. Add Compass and Sass to your project
2. Compile *only* `src/pivotal-ui/pivotal-ui.scss` using compass 
3. Make the resulting css file available in your html.

## Syntax Highlighting

There are two themes, **dark** and **light**, for syntax highlighting. You can choose a theme, by linking to one of the following stylesheets:

* `pivotal-ui/syntax-highlighting/prism-default.css` (for the light theme)
* `pivotal-ui/syntax-highlighting/prism-okaida.css` (for the dark theme). 

You can only include one of these themes at a time.

See the latest styleguide for [examples of syntax highlighting in action](http://styleguide.cfapps.io/all.html#code).

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

If you intend to build pivotal ui itself, there are a few things you'll need to do.

### Install Tools (in order)

compass, haml, sass, and hologram

    $ bundle install

node and npm

    $ brew install node
    
grunt-cli 

    $ npm install grunt-cli --global

Add dependencies by running the following from the project root

    $ npm install

### Build the project

As soon as you have your tools installed, and then again each time you make changes you want to see reflected in the styleguide, you'll need to run grunt _at the project root_:

    $ grunt

This will create the `dist/` directory that will house the compiled resources and the styleguide.

### Pushing the styleguide to cfapps.io

After building, in the project root directory, run 

    $ cf push -f manifest.yml

This will deploy to <http://styleguide.cfapps.io>.

### Cleaning up the dist/ directory

You may (rarely!) need to clear out all the compiled files. 

    $ grunt clean

### Testing

(for the moment, this section is aspirational)

We use CSSCritic for front-end regression testing. Currently, we are only testing a few components, with plans to expand. To test:

#### Set a baseline to test against (before making any changes!!)
1. Run `gulp test`. This will open up Firefox and show all rendered test files in a "yellow" state.
2. Click "Accept the rendered page" for *each* component. Yes, this will get more painful as we add more tests. If it is slowing you down, please let us know so we can prioritize automating this step.

#### Rerun the test suite for regressions (before you commit/make a pull request)
1. Run `gulp test`. This will open up Firefox.
2. If there are no regressions, all components will be green.
3. If you added any components, you'll have to click "Accept the rendered page" for that component.
4. If a component is red, this means either:
    1. You broke something. Fix it!
    2. You want to change the baseline. You should talk to the core Pivotal UI team first, especially the designers.


