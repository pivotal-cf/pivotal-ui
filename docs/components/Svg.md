---
title: SVG
menu: components
reactPath: pivotal-ui/react/svg
reactComponents:
  Svg:
    src: Name of the SVG (excluding the `.svg` extension)
---

# Overview

# Examples

This is very difficult to run in the styleguide itself, so there is not a working example here, but it does work.
The example below will render the file `app/svgs/search.svg`.

```
<Svg src="search" width="20" height="20" />
```

By default, the `Svg` component will look in the `app/svgs` folder at the root of your project
(defined here as the location of your package.json). If you have SVG files in other folders, you can subclass the `Svg` component as follows:

```
class MySvg extends Svg {
  svgPathLoader(src) {
    return require(`!!babel-loader!react-svg-loader!./path/to/svgs/${src}.svg`);
  }
}
```

The path is relative to the file where you subclass the Svg component. Note that `react-svg-loader` will internally optimize your SVGs using [svgo](https://github.com/svg/svgo).
This optimization will sometimes change your SVG in undesirable ways. You can turn off parts of the optimization with loader params. For example, the `Svg` component itself uses:

```
 require(`!!babel-loader!react-svg-loader?{"svgo":{"plugins":[{"removeUnknownsAndDefaults":false},{"cleanupNumericValues":false},{"removeUselessStrokeAndFill":false}]}}!../../../../app/svgs/${src}.svg`);
```

Pivotal UI provides a set of commonly used icons in the [Iconography Component](/icons)
For a full list of available icons, go to [http://pivotalicons.cfapps.io](http://pivotalicons.cfapps.io).
