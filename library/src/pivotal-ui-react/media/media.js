import React from 'react';
import classnames from 'classnames';
import 'pui-css-media';

const types = React.PropTypes;

const shortSizes = {xsmall: 'xs', small: 'sm', medium: 'md', large: 'lg', xlarge: 'xl'};
const charSizes = {small: 's', medium: 'm', large: 'l', xlarge: 'xl'};
const paddingDirection = {left: 'r', right: 'l'};

export class Media extends React.Component {
  static propTypes = {
    image: types.node.isRequired,
    innerClassName: types.string,
    mediaSpacing: types.oneOf(['small', 'medium', 'large', 'xlarge']),
    stackSize: types.oneOf(['xsmall', 'small', 'medium', 'large']),
    vAlign: types.oneOf(['middle', 'bottom']),
    placement: types.oneOf(['left', 'right']),
    className: types.string
  }

  static defaultProps = {
    placement: 'left'
  }

  render() {
    const {className, innerClassName, image, mediaSpacing, stackSize, vAlign, placement, children, ...other} = this.props;
    const vAlignClass = vAlign && `media-${vAlign}`;
    const classes = classnames('media', stackSize && `media-stackable-${shortSizes[stackSize]}`, className);
    const bodyClasses = classnames('media-body', vAlignClass, innerClassName);
    const mediaClasses = classnames(
      `media-${placement}`,
      vAlignClass,
      `p${paddingDirection[placement]}${charSizes[mediaSpacing]}`
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
  render() {
    return <Media {...this.props} vAlign="middle"/>;
  }
}
