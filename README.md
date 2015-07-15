# pivotal-ui
[![Build Status](https://travis-ci.org/pivotal-cf/pivotal-ui.svg)](https://travis-ci.org/pivotal-cf/pivotal-ui)

***

Pivotal UI includes Pivotal styles as well as Bootstrap CSS, OOCSS, FontAwesome icons fonts, and the Source Sans Pro Google Font in your project. This is everything you need to get started building UI at Pivotal.


[Visit the live styleguide](http://styleguide.pivotal.io)  
If you are ready to start using Pivotal UI **[download the latest release](https://github.com/pivotal-cf/pivotal-ui/releases)**.   
To contribute, see the [contributing readme](CONTRIBUTING.md).

***

# What's included

- jQuery v2.1.1
- LoDash v2.4.1
- Bootstrap v3.2
- Prism.js
- Font Awesome v4.10
- Normalize CSS v1.0.2
- OOCSS
- Source Sans Pro

***

# Using PivotalUI on your project (without React)

The prefered way to consume Pivotal UI is through NPM, even for Rails
projects. Using NPM to install PUI will ensure proper dependency management on
your project.

1. Install the Pivotal UI CSS modules

   ```
   npm install --save pui-css-all
   ```

1. Install jQuery and bootstrap.js

   ```
   npm install --save-dev jquery
   npm install --save-dev bootstrap
   ```

   These installs must happen **after** you've installed the PUI module. This
   ensures you'll get the correct version of bootstrap js.

   **NB** - It's important that you install these modules with `--save-dev`.
   Otherwise Dr. Frankenstyle will try to include CSS from these modules, and
   your page will look less awesome.

1. Install and run Dr. Frankenstyle

   [Dr. Frankenstyle](http://github.com/pivotal-cf/dr-frankenstyle)
   is the tool that we recommend using to compile all the PUI css packages
   together. The simplist way to set it up is:

   ```
   npm install --save-dev dr-frankenstyle
   dr-frankenstyle <path-to-your-asset-build-folder>
   ```

1. Add the css and javascript files to your html template

   ```html
   <!doctype html>
   <html>
     <head>
       <title>...</title>
       <link rel="stylesheet" href="<path-to-your-asset-build-folder>/components.css">
       <script src="<path-to-your-project's-node-modules>/bootstrap/dist/js/bootstrap.js"></script>
       <script src="<path-to-your-project's-node-modules>/jquery/dist/jquery.js"></script>
     </head>
     <body>
       <!-- ... -->
     </body>
   </html>
   ```

1. Write some CSS/HTML and enjoy!

   ```html
   <!-- ... -->
   <body>
     <div class="container">
       <h1 class="type-brand-1 em-high">Hello world!</h1>
     </div>
   </body>
   <!-- ... -->
   ```

1. Upgrade PUI frequently

   ```
   npm update pui-css-all
   dr-frankenstyle <path-to-your-asset-build-folder>
   ```

   **NB** - You must rerun Dr. Frankenstyle after you update PUI (or add any
   additional CSS module).

# Legacy - Using PivotalUI on your project

If you really don't want to use NPM, you can use our compiled PUI monolith.
Be warned, you will have to manage updates and dependencies yourself.

1. [Download the latest release](https://github.com/pivotal-cf/pivotal-ui/releases).
1. Unzip the release archive and move the resulting directory into your project.
1. Link to the css file in your html template to include the styles.
1. Add a script tag to your html template to use the javascript.
1. Use the css classes (reference the [styleguide](https://github.com/pivotal-cf/pivotal-ui#styleguide) for examples and usage)

```html
<html>
  <head>
    <title>...</title>
    <link rel="stylesheet" href="/path/to/release/pivotal-ui.css">
    <script src="/path/to/release/pivotal-ui.js"></script>
  </head>
  <body>
    <p class='type-brand-1'>Hello, world!</p>
  </body>
</html>
```

You'll need to maintain the structure in the release directory to have fonts
and assets work properly. **Do not modify the release files directly**. If you
need a component and you cannot find it in the styleguide, write your own
styles and javascript separately. Doing so will make it easier to update to
newer versions.

# Using PivotalUI on your Rails project

If you're installing PivotalUI into a Rails project, you should unzip the
constituent files into a directory named `vendor/assets/pui-vX.X.X`.

In your `application.scss` file, add the line `@import "pivotal-ui-rails"`

In your `application.js` file, add the line `//= require pivotal-ui` as **the
very first** require declaration.

Lastly, in your application's `config/application.rb`, you'll need to add the
following to make sure all vendored files are properly compiled:

```
  config.assets.precompile << /\.(?:svg|eot|woff|ttf)\z/
```

# Including SCSS variables and mixins (optional, beta)

If you are building CSS using Sass, you can get pivotal-ui variables and mixins from the [pui-css-variables-and-mixins](https://www.npmjs.com/package/pui-css-variables-and-mixins) node module.

```sh
  $ npm install --save pui-css-variables-and-mixins
```

Import the file and use the variables:

```scss
@import '/path/to/pui-variables.scss';
@import '/path/to/mixins.scss';

.bg-special {
  background-color: $brand-1;
}
```

# Styleguide

Visit <http://styleguide.pivotal.io> of host the styleguide files with a web server to view the available components.

    $ cd /path/to/release/pivotal-ui/styleguide/ && python -m SimpleHTTPServer 8000

then visit <http://localhost:8000>

# Syntax Highlighting

There are two themes, **dark** and **light**, for syntax highlighting. You can choose a theme by linking to one of the following stylesheets:

* `pivotal-ui/prismjs/prism.css` (for the light theme)
* `pivotal-ui/prismjs/prism-okaidia.css` (for the dark theme).

You can only include one of these themes at a time.

See the latest styleguide for [examples of syntax highlighting in action](http://styleguide.pivotal.io/all.html#code).

## Syntax Highlighting Example

```html

  <pre>
	<code class='language-ruby'>
	  class Foo
	    def bar
	    end
	  end
	</code>
  </pre>

```

# React components

If you'd like to try out react, swap in the react js file in place of the
standard file: 

```html

<script src="/path/to/release/pivotal-ui.js"></script> 

```

Should become:

```html

<script src="/path/to/release/pivotal-ui-react.js"></script>

```

***

# Contributing

If you want a feature added to Pivotal UI, or you've found a bug that needs fixing, please refer to our [contribution guidelines](https://github.com/pivotal-cf/pivotal-ui/blob/master/CONTRIBUTING.md).

## Highlights

When creating a pull request, make sure you rebase your branch against our code base (upstream).
Read our [Commit guidelines](https://github.com/pivotal-cf/pivotal-ui/blob/master/CONTRIBUTING.md#commit-guidelines)! We have a very specific syntax for our messages.

# Copyright Notice

Copyright 2015 Pivotal Software, Inc. All Rights Reserved.
