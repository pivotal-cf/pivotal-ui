import React from 'react';
import {TooltipTrigger} from '../../tooltip';
import {Icon} from '../../iconography';
import {TablePlugin} from '../table-plugin';

export function withCellTooltip(Table) {
  function cellTooltip(props, tooltip, rowDatum, isHeader) {
    const {children: oldChildren} = props;
    if (!tooltip) return;

    const {text, size, theme, showIcon} = tooltip({isHeader}, rowDatum) || {};
    if (!text) return;

    const children = (
      <TooltipTrigger {...{
        placement: 'top',
        tooltip: text,
        theme,
        size,
        trigger: 'hover'
      }}>
        <span>
          <span>{oldChildren}</span>
          {showIcon && <Icon {...{
            src: 'info_outline',
            verticalAlign: 'baseline',
            className: 'mlm'
          }}/>}
        </span>
      </TooltipTrigger>
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