import React from 'react';

import {Table} from './table-component';
import {Flexible} from './plugins/flexible';

export class FlexTable extends React.Component {
  render() {
    const plugins = [...Table.defaultProps.plugins, Flexible];
    return <Table {...this.props} {...{plugins}}/>
  }
}