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
    src: types.string.isRequired
  },

  render() {
    var {responsive, href, children, ...other} = this.props;
    const props = mergeProps(other, {className: 'img-responsive'});

    var image = <img {...props}>{children}</img>;
    return href ? <a {...{href}}>{image}</a> : image;
  }
});

module.exports = {Image};
