var React = require('react');
var classnames = require('classnames');

const shortSizes = {xsmall: 'xs', small: 'sm', medium: 'md', large: 'lg', xlarge: 'xl'};
const charSizes = {small: 's', medium: 'm', large: 'l', xlarge: 'xl'};

var MediaObject = React.createClass({
  propTypes: {
    leftMediaSpacing: React.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
    rightMediaSpacing: React.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
    vAlign: React.PropTypes.oneOf(['middle', 'bottom']),
    className: React.PropTypes.string,
    horizontalAlignment: React.PropTypes.string
  },
  render() {
    var {horizontalAlignment, vAlign, leftMediaSpacing, rightMediaSpacing, children} = this.props;
    var className = classnames(
      horizontalAlignment && `media-${horizontalAlignment}`,
      vAlign && `media-${vAlign}`,
      leftMediaSpacing && `pr${charSizes[leftMediaSpacing]}`,
      rightMediaSpacing && `pr${charSizes[rightMediaSpacing]}`
    );
    return <div className={className}>{children}</div>;
  }
});

/**
 * @component Media
 * @description Displays a media object (images, video, or audio) to the left or right of a block of content
 *
 * @property leftImage {Element} `<Image>`, `<Video>`, or `<Audio>` to be shown left of the content
 * @property rightImage {Element} `<Image>`, `<Video>`, or `<Audio>` to be shown right of the content
 * @property vAlign {String} One of `middle` or `bottom`--if given, re-positions the content vertically
 * @property stackSize {String} One of `xsmall`, `small`, `medium`, or `large`--if given, sets the breakpoint at which the media object stacks
 * @property leftMediaSpacing {String} One of `small`, `medium`, `large` (default), or `xlarge`--sets the amount of space between the left media and the content
 * @property rightMediaSpacing {String} One of `small`, `medium`, `large` (default), or `xlarge`--sets the amount of space between the right media and the content
 *
 * @example ```js
 * var Media = require('pui-react-media').Media;
 * var Image = require('pui-react-image').Image;
 * var MyComponent = React.createClass({
 *   render() {
 *     var image = <Image src="http://placehold.it/50x50"/>;
 *     return (<Media leftImage={image} leftMediaSpacing="small">Content</Media>);
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#media_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/layout.html#media)
 */
var Media = React.createClass({
  propTypes: {
    leftImage: React.PropTypes.object,
    rightImage: React.PropTypes.object,
    innerClassName: React.PropTypes.string,
    hasImages: function(props) {
      if (!props.leftImage && !props.rightImage) {
        return new Error('The media component must have at least one image');
      }
    },
    leftMediaSpacing: React.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
    rightMediaSpacing: React.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
    stackSize: React.PropTypes.oneOf(['xsmall', 'small', 'medium', 'large']),
    vAlign: React.PropTypes.oneOf(['middle', 'bottom']),
    className: React.PropTypes.string
  },

  render() {
    var {className, innerClassName, leftImage, leftMediaSpacing, rightImage, rightMediaSpacing, stackSize, vAlign, children, ...other} = this.props;

    var classes = classnames('media', stackSize && `media-stackable-${shortSizes[stackSize]}`, className);
    var bodyClasses = classnames('media-body', vAlign && `media-${vAlign}`, innerClassName);

    var leftMedia = leftImage ?
      <MediaObject horizontalAlignment="left" {...{vAlign, leftMediaSpacing}}>{leftImage}</MediaObject> :
      null;
    var rightMedia = rightImage ?
      <MediaObject horizontalAlignment="right" {...{vAlign, rightMediaSpacing}}>{rightImage}</MediaObject> :
      null;

    return (
      <div {...other} className={classes}>
        {leftMedia}
        <div className={bodyClasses}>{children}</div>
        {rightMedia}
      </div>
    );
  }
});

/**
 * @component Flag
 * @description Displays a media object (images, video, or audio) to the left or right of a block of content with vertical centering
 *
 * @property leftImage {Element} `<Image>`, `<Video>`, or `<Audio>` to be shown left of the content
 * @property rightImage {Element} `<Image>`, `<Video>`, or `<Audio>` to be shown right of the content
 * @property stackSize {String} One of `xsmall`, `small`, `medium`, or `large`--if given, sets the breakpoint at which the media object stacks
 * @property leftMediaSpacing {String} One of `small`, `medium`, `large` (default), or `xlarge`--sets the amount of space between the left media and the content
 * @property rightMediaSpacing {String} One of `small`, `medium`, `large` (default), or `xlarge`--sets the amount of space between the right media and the content
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#media_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/layout.html#media)
 */
var Flag = React.createClass({
  render() {
    return <Media {...this.props} vAlign="middle"/>;
  }
});

module.exports = {Media, Flag};
