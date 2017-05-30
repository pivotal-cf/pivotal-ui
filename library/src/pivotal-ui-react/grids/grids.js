import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import {mergeProps} from 'pui-react-helpers';
import 'pui-css-grids';

export class Row extends React.Component {
  static propTypes = {
    componentClass: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    gutter: PropTypes.oneOf(['sm', 'md', 'lg'])
  };

  static defaultProps = {
    componentClass: 'div'
  };

  render() {
    const {componentClass: Component, gutter, ...other} = this.props;
    const gutterClass = {
      'row-gutter-md': gutter === 'md',
      'row-gutter-sm': gutter === 'sm'
    };
    const props = mergeProps(other, {className: classnames('row', gutterClass)});
    return <Component {...props}/>;
  }
}

export class Col extends React.Component {
  static propTypes = {
    componentClass: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    xs: PropTypes.number,
    sm: PropTypes.number,
    lg: PropTypes.number,
    md: PropTypes.number,
    xsHidden: PropTypes.bool,
    smHidden: PropTypes.bool,
    mdHidden: PropTypes.bool,
    lgHidden: PropTypes.bool,
    xsOffset: PropTypes.number,
    smOffset: PropTypes.number,
    mdOffset: PropTypes.number,
    lgOffset: PropTypes.number,
    xsPush: PropTypes.number,
    smPush: PropTypes.number,
    mdPush: PropTypes.number,
    lgPush: PropTypes.number,
    xsPull: PropTypes.number,
    smPull: PropTypes.number,
    mdPull: PropTypes.number,
    lgPull: PropTypes.number
  };

  static defaultProps = {
    componentClass: 'div'
  };

  render() {
    const {
      componentClass: Component,
      xs, sm, md, lg,
      xsHidden, smHidden, mdHidden, lgHidden,
      xsOffset, smOffset, mdOffset, lgOffset,
      xsPush, smPush, mdPush, lgPush,
      xsPull, smPull, mdPull, lgPull,
      ...other
    } = this.props;

    const sizeClassName = classnames({
      [`col-xs-${xs}`]: xs,
      [`col-sm-${sm}`]: sm,
      [`col-md-${md}`]: md,
      [`col-lg-${lg}`]: lg
    });

    const hiddenClassName = classnames({
      'hidden-xs': xsHidden,
      'hidden-sm': smHidden,
      'hidden-md': mdHidden,
      'hidden-lg': lgHidden
    });

    const offsetClassName = classnames({
      [`col-xs-offset-${xsOffset}`]: xsOffset,
      [`col-sm-offset-${smOffset}`]: smOffset,
      [`col-md-offset-${mdOffset}`]: mdOffset,
      [`col-lg-offset-${lgOffset}`]: lgOffset
    });

    const pushClassName = classnames({
      [`col-xs-push-${xsPush}`]: xsPush,
      [`col-sm-push-${smPush}`]: smPush,
      [`col-md-push-${mdPush}`]: mdPush,
      [`col-lg-push-${lgPush}`]: lgPush
    });

    const pullClassName = classnames({
      [`col-xs-pull-${xsPull}`]: xsPull,
      [`col-sm-pull-${smPull}`]: smPull,
      [`col-md-pull-${mdPull}`]: mdPull,
      [`col-lg-pull-${lgPull}`]: lgPull
    });

    const props = mergeProps(other, {
      className: classnames(sizeClassName, hiddenClassName, offsetClassName, pushClassName, pullClassName)
    });

    return <Component {...props}/>;
  }
}
