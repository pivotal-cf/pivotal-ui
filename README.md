# pivotal-ui

***

Pivotal UI includes Pivotal styles as well as Bootstrap CSS, OOCSS, FontAwesome icons fonts, and the Source Sans Pro Google Font in your project. This is everything you need to get started building UI at Pivotal.


[Visit the live styleguide](http://styleguide.cfapps.io)  
If you are ready to start using Pivotal UI **[download the latest release](https://github.com/pivotal-cf/pivotal-ui/releases)**.   
To contribute, see the [contributing readme](CONTRIBUTING.md).

***

# What's included

- jQuery v2.1.1
- modernizr v2.8.3
- Bootstrap v3.2
- Prism.js
- Font Awesome v4.10
- Normalize CSS v1.0.2
- OOCSS
- Source Sans Pro

***

# Using PivotalUI on your project

1. [Download the latest release](https://github.com/pivotal-cf/pivotal-ui/releases).
1. Unzip the release archive and move the resulting directory into your project.
1. Link to the css file in your html template to include the styles.
1. Add a script tag to your html template to use the javascript.
1. Use the css classes (reference the [styleguide](https://github.com/pivotal-cf/pivotal-ui#styleguide) for examples and usage)

```html
<html>
  <head>
    <title>...</title>
    <link rel="stylesheet" href="/path/to/release/pivotal-ui/pivotal-ui.css">
    <script src="/path/to/release/pivotal-ui/pivotal-ui.js"></script>
  </head>
  <body>
    <p class='type-brand-1'>Hello, world!</p>
  </body>
</html>
```

You'll need to maintain the structure in the release directory to have fonts and assets work properly. **Do not modify the release files directly**. If you need a component and you cannot find it in the styleguide, write your own styles and javascript separately. Doing so will make it easier to update to newer versions.

### Including SCSS variables (optional, beta)

If you are building CSS using Sass, you can get pivotal-ui variables by copying the appropriate file into your project:

    $ cp /path/to/release/src/pivotal-ui/components/variables.scss /path/to/your-project/

Import the file and use the variables:

```scss
@import '/path/to/variables.scss';

.bg-special {
  background-color: $brand-1;
}
```

### Styleguide

Visit <http://styleguide.cfapps.io> of host the styleguide files with a web server to view the available components.

    $ cd /path/to/release/pivotal-ui/styleguide/ && python -m SimpleHTTPServer 8000

then visit <http://localhost:8000>

### Syntax Highlighting

There are two themes, **dark** and **light**, for syntax highlighting. You can choose a theme by linking to one of the following stylesheets:

* `pivotal-ui/syntax-highlighting/prism-default.css` (for the light theme)
* `pivotal-ui/syntax-highlighting/prism-okaida.css` (for the dark theme).

You can only include one of these themes at a time.

See the latest styleguide for [examples of syntax highlighting in action](http://styleguide.cfapps.io/all.html#code).

#### Syntax Highlighting Example

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

***

# Contributing

If you want a feature added to Pivotal UI, or you've found a bug that needs fixing, please refer to our [contribution guidelines](https://github.com/pivotal-cf/pivotal-ui/blob/master/CONTRIBUTING.md).
