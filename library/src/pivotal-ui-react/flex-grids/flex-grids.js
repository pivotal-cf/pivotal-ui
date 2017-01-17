import React from 'react';
import {mergeProps} from 'pui-react-helpers';
import classnames from 'classnames';
import 'pui-css-flex-grids';

const types = React.PropTypes;

export class Grid extends React.Component {
  static propTypes = {
    gutter: types.bool
  }

  static defaultProps = {
    gutter: true
  }

  render() {
    const {gutter, children, ...props} = this.props
    const newProps = mergeProps(props, {className: classnames('grid', gutter ? '' : 'grid-nogutter')})
    return <div {...newProps}>
      {children}
    </div>
  }
}

export const Col = ({children, ...props}) => {
  const newProps = mergeProps(props, {className: 'col'})
  return <div {...newProps}>
    {children}
  </div>
}