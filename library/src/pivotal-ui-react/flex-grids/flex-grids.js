import React from 'react';
import PropTypes from 'prop-types';
import {mergeProps} from 'pui-react-helpers';
import classnames from 'classnames';
import 'pui-css-flex-grids';

export class Grid extends React.Component {
  static propTypes = {
    gutter: PropTypes.bool
  };

  static defaultProps = {
    gutter: true
  };

  render() {
    const {gutter, ...props} = this.props;
    const newProps = mergeProps(props, {className: classnames('grid', gutter ? '' : 'grid-nogutter')});
    return <div {...newProps}/>;
  }
}

export const FlexCol = (props) => {
  const {col, fixed, grow, alignment, contentAlignment, breakpoint, ...other} = props;

  const colClassName = classnames({
    [`col-${col}`]: col
  });

  const fixedClassName = classnames({
    'col-fixed': fixed
  });

  const growClassName = classnames({
    [`col-grow-${grow}`]: grow
  });

  const alignmentClassName = classnames({
    [`col-align-${alignment}`]: alignment
  });

  const contentAlignmentClassName = classnames({
    [`col-${contentAlignment}`]: contentAlignment
  });

  const breakpointClassName = classnames({
    [`col-${breakpoint}`]: breakpoint
  });

  const className = classnames('col', colClassName, fixedClassName, growClassName, alignmentClassName,
    contentAlignmentClassName, breakpointClassName);

  const newProps = mergeProps(other, {className});
  return <div {...newProps}/>;
};

FlexCol.propTypes = {
  col: PropTypes.number,
  fixed: PropTypes.bool,
  grow: PropTypes.number,
  alignment: PropTypes.oneOf(['top', 'middle', 'bottom']),
  contentAlignment: PropTypes.oneOf(['top', 'middle', 'bottom']),
  breakpoint: PropTypes.oneOf(['sm', 'md', 'lg'])
};