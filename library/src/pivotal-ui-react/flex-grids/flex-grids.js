import React from 'react';
import {mergeProps} from 'pui-react-helpers';
import classnames from 'classnames';
import 'pui-css-flex-grids';

const types = React.PropTypes;

export class Grid extends React.Component {
  static propTypes = {
    gutter: types.bool
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
  const newProps = mergeProps(props, {className: 'col'});
  return <div {...newProps}/>;
};