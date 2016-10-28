/*doc
 ---
 title: Svg
 name: svg
 categories:
 - react_components_svg
 - react_all
 ---

 ***This component is limited to projects that use Webpack.***
 ***It requires the webpack loaders babel-loader and svg-react-loader.***
 ***If you are using pui-react-tools, this also requires version 2 or higher.***

 <code class="pam">
 <img src="/styleguide/download.svg" width="16" height="16"/>
 npm install pui-react-svg  --save

 <img src="/styleguide/download.svg" width="16" height="16"/>
 npm install babel-loader svg-react-loader --save-dev
 </code>

 Require the subcomponents:

 ```
var Svg = require('pui-react-svg').Svg;
 ```

This is very difficult to run in the styleguide itself, so there is not a working example here, but it does work.
The example below will render the file `app/svg/search.svg`.

 ```js
<Svg src="search" width="20" height="20" />
 ```

 The Svg Components require the following property:

 Property           |  Type         | Description
 -------------      | --------------| --------------------------------------------------------------------------
 `src`       | String        | Name of the svg (excluding the .svg extension)

By default, the Svg component will look in the `app/svg` folder at the root of your project
(defined here as the location of your package.json). If you have svg files in other folders, you can subclass the Svg component as follows


```js
const PuiSvg = require('pui-react-svg').Svg;

class MySvg extends PuiSvg {
 svgPathLoader(src) {
   return require(`!!babel!svg-react!./path/to/svgs/${src}.svg`);
 }
}
```

The path is relative to the file where you subclass the Svg component.

Pivotal UI provides a set of commonly used icons in the [Iconography Component](/react_base_iconography.html)
For a full list of available icons, go to [http://pivotalicons.cfapps.io](http://pivotalicons.cfapps.io).

 */
