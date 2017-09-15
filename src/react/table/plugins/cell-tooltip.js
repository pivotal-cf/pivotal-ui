// eslint-disable-next-line no-unused-vars
import React from 'react';
import {Tooltip} from '../../tooltip';
import {OverlayTrigger} from '../../overlay-trigger';
import {Icon} from '../../iconography';

import {TablePlugin} from '../table-plugin';

export function withCellTooltip(Table) {
  function cellTooltip(props, tooltip, rowDatum, isHeader) {
    const {children: oldChildren} = props;
    if (!tooltip) return;

    const {text, size, theme, showIcon} = tooltip({isHeader}, rowDatum) || {};
    if (!text) return;

    const overlay = (<Tooltip {...{size}}>{text}</Tooltip>);
    const children = (
      <OverlayTrigger {...{
        placement: 'top',
        overlay,
        theme
      }}>
        <span className="overlay-trigger">
          <span>{oldChildren}</span>
          {showIcon && <Icon {...{
            src: 'info_outline',
            verticalAlign: 'baseline',
            className: 'mlm'
          }}/>}
        </span>
      </OverlayTrigger>
    );

    return {children};
  }

  return class TableWithCellTooltip extends TablePlugin {
    render() {
      return this.renderTable(Table, {
        th: (props, {column: {tooltip}, rowDatum}) => cellTooltip(props, tooltip, rowDatum, true),
        td: (props, {column: {tooltip}, rowDatum}) => cellTooltip(props, tooltip, rowDatum, false)
      });
    }
  };
}