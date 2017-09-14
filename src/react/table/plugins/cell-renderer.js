// eslint-disable-next-line no-unused-vars
import React from 'react';

import {TablePlugin} from '../table-plugin';

export function withCellRenderer(Table) {
  return class TableWithCellRenderer extends TablePlugin {
    static defaultProps = {...TablePlugin.defaultProps};

    render() {
      return (<Table {...this.props} {...{
        td: (props, tdContext) => {
          const {column: {CellRenderer}, rowDatum} = tdContext;
          if (!CellRenderer) return this.plugTdProps(props, tdContext);
          const cellRendererProps = {};
          if (CellRenderer.propTypes) {
            Object.keys(CellRenderer.propTypes).forEach(key => cellRendererProps[key] = rowDatum[key]);
          } else {
            Object.assign(cellRendererProps, rowDatum);
          }
          const children = <CellRenderer {...cellRendererProps}/>;
          return this.plugTdProps({...props, children}, tdContext);
        }
      }}/>);
    }
  };
}