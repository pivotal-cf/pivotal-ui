import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const shortSizes = {xsmall: 'xs', small: 'sm', medium: 'md', large: 'lg'};
const charSizes = {small: 's', medium: 'm', large: 'l', xlarge: 'xl'};
const paddingDirection = {left: 'r', right: 'l'};

export class Media extends React.Component {
  static propTypes = {
    image: PropTypes.oneOfType([PropTypes.node, PropTypes.object]).isRequired,
    innerClassName: PropTypes.string,
    mediaSpacing: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
    stackSize: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large']),
    vAlign: PropTypes.oneOf(['middle', 'bottom', 'top']),
    placement: PropTypes.oneOf(['left', 'right']),
    className: PropTypes.string
  };

  static defaultProps = {
    placement: 'left'
  };

  componentDidMount() {
    require('../../css/media');
  }

  render() {
    const {className, innerClassName, image, mediaSpacing, stackSize, vAlign, placement, children, ...other} = this.props;
    const vAlignClass = vAlign && `media-${vAlign}`;
    const classes = classnames('media', stackSize && `media-stackable-${shortSizes[stackSize]}`, className);
    const bodyClasses = classnames('media-body', vAlignClass, innerClassName);
    const mediaClasses = classnames(
      `media-${placement}`,
      vAlignClass,
      {[`p${paddingDirection[placement]}${charSizes[mediaSpacing]}`]: charSizes[mediaSpacing]}
    );
    const content = [
      <div key={0} className={mediaClasses}>{image}</div>,
      <div key={1} className={bodyClasses}>{children}</div>
    ];

    if (placement === 'right') content.reverse();

    return (<div {...other} className={classes}>
      {content}
    </div>);
  }
}

export class Flag extends React.Component {
  componentDidMount() {
    require('../../css/media');
  }

  render() {
    return <Media {...this.props} vAlign="middle"/>;
  }
}
