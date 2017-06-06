import {mergeProps} from 'pui-react-helpers';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

export class FlexTableRow extends React.Component {
  static propTypes = {
    index: PropTypes.number,
    rowDatum: PropTypes.object
  };

  render() {
    let {children, index, className, rowDatum, ...others} = this.props;
    const classes = classnames(className, 'tr', 'grid');
    const props = mergeProps(others, {className: classes});

    return (<div {...props}>
      {children}
    </div>);
  }
}