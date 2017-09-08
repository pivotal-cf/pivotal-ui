import PropTypes from 'prop-types';
import React from 'react';

export class TableRow extends React.Component {
  static propTypes = {
    index: PropTypes.number,
    rowDatum: PropTypes.object
  };

  render() {
    let {children, index, rowDatum, ...others} = this.props;

    return (<tr {...others}>
      {children}
    </tr>);
  }
}