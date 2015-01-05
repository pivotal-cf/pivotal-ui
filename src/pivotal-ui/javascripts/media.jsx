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
    stackSize: React.PropTypes.oneOf(["xsmall", "small", "medium", "large"]),
    vAlign: React.PropTypes.oneOf(["middle","bottom"]),
    hasImages: function(props) {
      if(!props["leftImage"] && !props["rightImage"]) {
        return new Error("The media component must have at least one image");
      }
    }
  },
  render: function () {
    var leftMedia,
        rightMedia = '';

    var classes = setClass({
      'media': true,
      'media-stackable-xs': this.props.stackSize === 'xsmall',
      'media-stackable-sm': this.props.stackSize === 'small',
      'media-stackable-md': this.props.stackSize === 'medium',
      'media-stackable-lg': this.props.stackSize === 'large'
    });

    var bodyClasses = setClass({
      'media-body': true,
      'media-middle': this.props.vAlign === 'middle',
      'media-bottom': this.props.vAlign === 'bottom'
    });

    if (this.props.leftImage) {
      leftMedia = (
        <MediaObject
          horizontalAlignment='left'
          vAlign={this.props.vAlign}
          leftMediaSpacing={this.props.leftMediaSpacing}>
            {this.props.leftImage}
        </MediaObject>
      );
    }

    if (this.props.rightImage) {
      rightMedia = (
        <MediaObject
          horizontalAlignment='right'
          vAlign={this.props.vAlign}
          rightMediaSpacing={this.props.rightMediaSpacing}>
            {this.props.rightImage}
        </MediaObject>
      );
    }

    return (
      <div {...this.props} className={classes}>
        {leftMedia}
        <div className={bodyClasses}>
          {this.props.children}
        </div>
        {rightMedia}
      </div>
    );
  }
});

var Flag = React.createClass({
  getDefaultProps: function () {
    return {
      vAlign: 'middle'
    };
  },
  render: function () {
    return (
      <Media {...this.props}>{this.props.children}</Media>
    );
  }
});

module.exports = {
  Media: Media,
  Flag: Flag
};
