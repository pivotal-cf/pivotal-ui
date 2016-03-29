The recommended method for compiling Pivotal UI css is Webpack.

There are a number of required steps:

Install some tools from the command line:
```sh
npm i gulp webpack-stream extract-text-webpack-plugin url-loader file-loader css-loader --save-dev
```

Install Pivotal UI components, for example
```sh
npm i pui-css-buttons pui-css-ellipsis --save-dev
```

You need to have a JavaScript entry point. For example, we will call it `application.js`.
In that file you need to require your Pivotal UI components

```js
require('pui-css-buttons');
require('pui-css-ellipsis');

//normal JavaScript below if you have any
```

At the top of your project, create a `gulpfile.js` file, with the following code:

```js
var gulp = require('gulp');
var webpack = require('webpack-stream');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

gulp.task('assets', function() {
  return gulp.src('application.js')
    .pipe(webpack({
      module: {
        loaders: [
          {
            test: [/\.svg(\?|$)/, /\.png(\?|$)/, /\.eot(\?|$)/, /\.ttf(\?|$)/, /\.woff2?(\?|$)/, /\.jpg?(\?|$)/],
            include: /node_modules/,
            loader: 'url?name=[name].[ext]'
          },
          {
            test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader')
          }
        ]
      },
      plugins: [
        new ExtractTextPlugin('components.css', {
          allChunks: true
        })
      ],
      output: {
        filename: 'application.js'
      }
    }))
    .pipe(gulp.dest('public/'));
});
```

Note that this is the most basic setup, only for compiling the css.
If you are using React, you will want to add a line like `{test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}` 
to the list of loaders (after setting up Babel). There are many other useful Webpack configurations, like watching and source maps.

After running `gulp assets` from the command line, there will be a file called `components.css` in the `public` folder.
Feel free the change the destination by changing the last line, `gulp.dest('public/')`.

The above configuration will inline any css require assets, e.g.

```css
.list-checked {
  > li:before {
    background-image: url('images/check.svg');
  }
}
```

This will compile into a Base64 encoded image directly in the css. This is the easiest solution, 
but you can also extract the files and serve them using the file loader.
In your `gulpfile.js`, replace the url loader (`loader: 'url?name=[name].[ext]'`) with the file loader (`loader: 'file?name=[name]-[hash].[ext]'`).
Now your `public` directory will have images and fonts in addition to `components.css`.
