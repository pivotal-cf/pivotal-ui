// eslint-disable-next-line no-unused-vars
import React from 'react';

import {TablePlugin} from '../table-plugin';

export function withCellOnClick(Table) {
  return class TableWithCellOnClick extends TablePlugin {
    static defaultProps = {...TablePlugin.defaultProps};

    render() {
      return (<Table {...this.props} {...{
        td: (props, tdContext) => {
          const {column: {onClick}, rowDatum} = tdContext;
          if (!onClick) return this.plugTdProps(props, tdContext);
          return this.plugTdProps({...props, onClick: e => onClick(e, rowDatum)}, tdContext);
        }
      }}/>);
    }
  };
}