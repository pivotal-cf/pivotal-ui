'use strict';

var React = require('react/addons');
var _ = require('lodash');
var setClass = React.addons.classSet;

var MediaObject = React.createClass({
  render: function () {
    var classes = setClass({
      'media-left': this.props.horizontalAlignment === 'left',
      'media-right': this.props.horizontalAlignment === 'right',
      'media-middle': this.props.verticalAlignment === 'middle',
      'media-bottom': this.props.verticalAlignment === 'bottom',
      'media-object': !this.props.imageHref
    });

    if (this.props.imageHref) {
      return (
        <a className={classes} href={this.props.imageHref}>
          <img alt="..." className="media-object" src={this.props.imageSource} />
        </a>
        );
    } else {
      return (
        <img alt="..." className={classes} src={this.props.imageSource} />
      );
    }
  }
});

var Media = React.createClass({
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
      'media-middle': this.props.bodyAlignment === 'middle',
      'media-bottom': this.props.bodyAlignment === 'bottom'
    });

    if (this.props.leftImageSource) {
      leftMedia = (
        <MediaObject
          horizontalAlignment='left'
          verticalAlignment={this.props.leftImageAlignment}
          imageHref={this.props.leftImageHref}
          imageSource={this.props.leftImageSource}>
        </MediaObject>
      );
    }

    if (this.props.rightImageSource) {
      rightMedia = (
        <MediaObject
          horizontalAlignment='right'
          verticalAlignment={this.props.rightImageAlignment}
          imageHref={this.props.rightImageHref}
          imageSource={this.props.rightImageSource}>
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

module.exports = {
  Media: Media
};
