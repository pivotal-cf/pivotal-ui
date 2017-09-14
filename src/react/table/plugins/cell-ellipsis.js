// eslint-disable-next-line no-unused-vars
import React from 'react';

import {TablePlugin} from '../table-plugin';

export function withCellEllipsis(Table) {
  return class TableWithCellEllipsis extends TablePlugin {
    static defaultProps = {...TablePlugin.defaultProps};

    render() {
      return (<Table {...this.props} {...{
        td: (props, tdContext) => {
          const {children: oldChildren} = props;
          const {column: {ellipsis}} = tdContext;
          if (!ellipsis) return this.plugTdProps(props, tdContext);
          const children = <span className="type-ellipsis">{oldChildren}</span>;
          return this.plugTdProps({...props, children}, tdContext);
        }
      }}/>);
    }
  };
}