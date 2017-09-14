// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

import {TablePlugin} from '../table-plugin';

export function withRowClassName(Table) {
  return class TableWithRowClassName extends TablePlugin {
    static propTypes = {
      rowClassName: PropTypes.func
    };

    static defaultProps = {...TablePlugin.defaultProps};

    render() {
      const {rowClassName, ...props} = this.props;
      return (<Table {...props} {...{
        tr: (props, trContext) => {
          if (!rowClassName) return this.plugTrProps(props, trContext);
          return this.plugTrProps(this.mergeProps(props, {className: rowClassName(trContext)}), trContext);
        }
      }}/>);
    }
  };
}