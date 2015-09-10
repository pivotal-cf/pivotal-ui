var React = require('react');
var types = React.PropTypes;
import {mergeProps} from 'pui-react-helpers';


/**
 * @component Image
 * @description A wrapper around the `<img>` tag that adds linking and responsiveness
 *
 * @property src {String} The URL to the image.
 * @property responsive {Boolean} Whether to have the image fill its container while preserving aspect ratio
 * @property href {String} If given a URL, makes the image link to that URL
 *
 * @example ```js
 * var Image = require('pui-react-images').Image;
 * var MyComponent = React.createClass({
 *   render() {
 *     return <Image src="http://placehold.it/1000x100" responsive={true} href="https://google.com"/>;
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#image_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#image)
 */
var Image = React.createClass({
  propTypes: {
    responsive: types.bool,
    href: types.string,
    alt: types.string,
    src: types.string.isRequired
  },

  render() {
    let {responsive, href, children, ...props} = this.props;
    if (responsive) {
      props = mergeProps(props, {className: 'img-responsive'});
    }

    const image = <img {...props}>{children}</img>;
    return href ? <a {...{href}}>{image}</a> : image;
  }
});

module.exports = {Image};
/*doc
---
title: Images
name: image_react
categories:
- React
---


<code class="pam">
<i class="fa fa-download" alt="Install the Component">
npm install pui-react-images --save
</i>
</code>

Require the subcomponent:

```
import Image from 'pui-react-images';
```


Images in react can be responsive and/or wrapped in a link.

```react_example
<Image src="http://placehold.it/1000x100" responsive={true} href="http://google.com" alt="A beautiful placeholder"/>
```


*/
