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
  const {percentage, fixed, grow, alignment, contentAlignment, breakpoint, ...other} = props;

  const percentageClassName = classnames({
    [`col-${percentage}`]: percentage
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

  const className = classnames('col', percentageClassName, fixedClassName, growClassName, alignmentClassName,
    contentAlignmentClassName, breakpointClassName);

  const newProps = mergeProps(other, {className});
  return <div {...newProps}/>;
};

FlexCol.propTypes = {
  percentage: PropTypes.number,
  fixed: PropTypes.bool,
  grow: PropTypes.number,
  alignment: PropTypes.oneOf(['top', 'middle', 'bottom']),
  contentAlignment: PropTypes.oneOf(['top', 'middle', 'bottom']),
  breakpoint: PropTypes.oneOf(['sm', 'md', 'lg'])
};