// eslint-disable-next-line no-unused-vars
import React from 'react';
import {Tooltip} from '../../tooltip';
import {OverlayTrigger} from '../../overlay-trigger';
import {Icon} from '../../iconography';

import {TablePlugin} from '../table-plugin';

export function withCellTooltip(Table) {
  function tooltip(method, props, cellContext) {
    const {children: oldChildren} = props;
    const {column: {tooltip}, rowDatum} = cellContext;
    if (!tooltip) return this.plugProps(props, cellContext, method);

    const {text, size, theme, showIcon} = tooltip({isHeader: method === 'th'}, rowDatum) || {};
    if (!text) return this.plugProps(props, cellContext, method);

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

    return this.plugProps({...props, children}, cellContext, method);
  }

  return class TableWithCellTooltip extends TablePlugin {
    static defaultProps = {...TablePlugin.defaultProps};

    render() {
      return (<Table {...this.props} {...{
        th: tooltip.bind(this, 'th'),
        td: tooltip.bind(this, 'td')
      }}/>);
    }
  };
}