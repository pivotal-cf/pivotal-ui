var React = require('react');
var classnames = require('classnames');

const shortSizes = {xsmall: 'xs', small: 'sm', medium: 'md', large: 'lg', xlarge: 'xl'};
const charSizes = {small: 's', medium: 'm', large: 'l', xlarge: 'xl'};
const paddingDirection = {left: 'r', right: 'l'};

var Media = React.createClass({
  propTypes: {
    image: React.PropTypes.node.isRequired,
    innerClassName: React.PropTypes.string,
    mediaSpacing: React.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
    stackSize: React.PropTypes.oneOf(['xsmall', 'small', 'medium', 'large']),
    vAlign: React.PropTypes.oneOf(['middle', 'bottom']),
    hAlign: React.PropTypes.oneOf(['left', 'right']),
    className: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      hAlign: 'left'
    };
  },

  render() {
    var {className, innerClassName, image, mediaSpacing, stackSize, vAlign, hAlign, children, ...other} = this.props;

    var vAlignClass = vAlign && `media-${vAlign}`;

    var classes = classnames(
      'media',
      stackSize && `media-stackable-${shortSizes[stackSize]}`,
      className
    );

    var bodyClasses = classnames(
      'media-body',
      vAlignClass,
      innerClassName
    );

    var mediaClasses = classnames(
      `media-${hAlign}`,
      vAlignClass,
      `p${paddingDirection[hAlign]}${charSizes[mediaSpacing]}`
    );

    var content = [
      <div key={0} className={mediaClasses}>{image}</div>,
      <div key={1} className={bodyClasses}>{children}</div>
    ];

    if(hAlign === 'right') {
      content.reverse();
    }

    return (
      <div {...other} className={classes}>
        {content}
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
