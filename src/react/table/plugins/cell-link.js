// eslint-disable-next-line no-unused-vars
import React from 'react';

import {TablePlugin} from '../table-plugin';

export function withCellLink(Table) {
  return class TableWithCellLink extends TablePlugin {
    static defaultProps = {...TablePlugin.defaultProps};

    render() {
      return (<Table {...this.props} {...{
        tdTag: tdTagContext => {
          const {column: {link}, rowDatum} = tdTagContext;
          const href = link && link(rowDatum);
          return this.plugTdTag(() => href ? 'a' : null, tdTagContext);
        },
        td: (props, tdContext) => {
          const {children: oldChildren} = props;
          const {column: {link, target}, rowDatum} = tdContext;
          const href = link && link(rowDatum);
          if (!href) return this.plugTdProps(props, tdContext);
          const children = oldChildren ? <span className="hover-underline">{oldChildren}</span> : null;
          return this.plugTdProps({...props, children, href, target}, tdContext);
        }
      }}/>);
    }
  };
}