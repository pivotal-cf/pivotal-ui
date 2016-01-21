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

var Flag = React.createClass({
  render() {
    return <Media {...this.props} vAlign="middle"/>;
  }
});

module.exports = {Media, Flag};
