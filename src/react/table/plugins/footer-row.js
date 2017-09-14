// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

import {TablePlugin} from '../table-plugin';

export function withFooterRow(Table) {
  return class TableWithFooterRow extends TablePlugin {
    static propTypes = {
      footerRow: PropTypes.any
    };

    static defaultProps = {...TablePlugin.defaultProps};

    render() {
      const {footerRow, ...props} = this.props;
      return (<Table {...props} {...{
        tfoot: (props, tfootContext) => this.plugTfootProps({...props, children: [...props.children, footerRow]}, tfootContext)
      }}/>);
    }
  };
}