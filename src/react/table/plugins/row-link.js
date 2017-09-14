// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

import {TablePlugin} from '../table-plugin';

export function withRowLink(Table) {
  return class TableWithRowLink extends TablePlugin {
    static propTypes = {
      rowLink: PropTypes.object
    };

    static defaultProps = {...TablePlugin.defaultProps};

    render() {
      const {rowLink: {link, onClick} = {}, ...props} = this.props;
      return (<Table {...props} {...{
        trTag: trTagContext => {
          const {rowDatum} = trTagContext;
          if (!rowDatum) return this.plugTrTag(() => null, trTagContext);
          const href = link && link(rowDatum);
          return this.plugTrTag(() => href ? 'a' : null, trTagContext);
        },
        tr: (props, trContext) => {
          const {rowDatum} = trContext;
          if (!rowDatum) return this.plugTrProps(props, trContext);
          const href = link && link(rowDatum);
          return this.plugTrProps({
            ...props,
            href,
            onClick: href && (e => onClick(e, rowDatum))
          }, trContext);
        }
      }}/>);
    }
  };
}