'use strict';

var React = require('react/addons');
var setClass = React.addons.classSet;

var MediaObject = React.createClass({
  render: function () {
    var classes = setClass({
      'media-left': this.props.horizontalAlignment === 'left',
      'media-right': this.props.horizontalAlignment === 'right',
      'media-middle': this.props.vAlign === 'middle',
      'media-bottom': this.props.vAlign === 'bottom'
    });

    var paddingClasses = setClass({
      'prs': this.props.leftMediaSpacing === 'small',
      'prm': this.props.leftMediaSpacing === 'medium',
      'prl': this.props.leftMediaSpacing === 'large',
      'prxl': this.props.leftMediaSpacing === 'xlarge',
      'pls': this.props.rightMediaSpacing === 'small',
      'plm': this.props.rightMediaSpacing === 'medium',
      'pll': this.props.rightMediaSpacing === 'large',
      'plxl': this.props.rightMediaSpacing === 'xlarge'
    });

    var mediaClasses = [classes, paddingClasses].join(' ');


    return (
      <div className={mediaClasses}>
        {this.props.children}
      </div>
    );
  }
});

var Media = React.createClass({
  propTypes: {
    hasImages: function(props) {
      if(!props["leftImage"] && !props["rightImage"]) {
        return new Error("The media component must have at least one image");
      }
    },
    leftMediaSpacing: React.PropTypes.oneOf(["small", "medium", "large", "xlarge"]),
    rightMediaSpacing: React.PropTypes.oneOf(["small", "medium", "large", "xlarge"]),
    stackSize: React.PropTypes.oneOf(["xsmall", "small", "medium", "large"]),
    vAlign: React.PropTypes.oneOf(["middle","bottom"]),
  },

  render: function () {
    var {leftImage, leftMediaSpacing, rightImage, rightMediaSpacing, 
        stackSize, vAlign, children, ...other} = this.props;
    var leftMedia, rightMedia;

    var classes = setClass({
      'media': true,
      'media-stackable-xs': stackSize === 'xsmall',
      'media-stackable-sm': stackSize === 'small',
      'media-stackable-md': stackSize === 'medium',
      'media-stackable-lg': stackSize === 'large'
    });

    if (this.props.className) {
      classes += ' ' + this.props.className;
    }

    var bodyClasses = setClass({
      'media-body': true,
      'media-middle': vAlign === 'middle',
      'media-bottom': vAlign === 'bottom'
    });

    if (leftImage) {
      leftMedia = (
        <MediaObject
          horizontalAlignment='left'
          vAlign={vAlign}
          leftMediaSpacing={leftMediaSpacing}>
            {leftImage}
        </MediaObject>
      );
    }

    if (rightImage) {
      rightMedia = (
        <MediaObject
          horizontalAlignment='right'
          vAlign={vAlign}
          rightMediaSpacing={rightMediaSpacing}>
            {rightImage}
        </MediaObject>
      );
    }

    return (
      <div {...other} className={classes}>
        {leftMedia}
        <div className={bodyClasses}>
          {children}
        </div>
        {rightMedia}
      </div>
    );
  }
});

var Flag = React.createClass({
  render: function () {
    return <Media {...this.props} vAlign='middle' />;
  }
});

module.exports = {
  Media: Media,
  Flag: Flag
};
