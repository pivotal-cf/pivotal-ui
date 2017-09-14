// eslint-disable-next-line no-unused-vars
import React from 'react';

import {TablePlugin} from '../table-plugin';

export function withFlex(Table) {
  return class TableWithFlex extends TablePlugin {
    static defaultProps = {
      ...TablePlugin.defaultProps,
      tableTag: () => 'div',
      theadTag: () => 'div',
      tbodyTag: () => 'div',
      tfootTag: () => 'div',
      trTag: () => 'div',
      thTag: () => 'div',
      tdTag: () => 'div'
    };

    render() {
      return (<Table {...this.props} {...{
        tableTag: tableTagContext => this.plugTableTag(TableWithFlex.defaultProps.tableTag, tableTagContext),
        theadTag: theadTagContext => this.plugTheadTag(TableWithFlex.defaultProps.theadTag, theadTagContext),
        tbodyTag: tbodyTagContext => this.plugTbodyTag(TableWithFlex.defaultProps.tbodyTag, tbodyTagContext),
        tfootTag: tfootTagContext => this.plugTfootTag(TableWithFlex.defaultProps.tfootTag, tfootTagContext),
        trTag: trTagContext => this.plugTrTag(TableWithFlex.defaultProps.trTag, trTagContext),
        thTag: thTagContext => this.plugThTag(TableWithFlex.defaultProps.thTag, thTagContext),
        tdTag: tdTagContext => this.plugTdTag(TableWithFlex.defaultProps.tdTag, tdTagContext),
        thead: (props, theadContext) => this.plugTheadProps(this.mergeProps(props, {className: 'thead'}), theadContext),
        tbody: (props, tbodyContext) => this.plugTbodyProps(this.mergeProps(props, {className: 'tbody'}), tbodyContext),
        tfoot: (props, tfootContext) => this.plugTfootProps(this.mergeProps(props, {className: 'tfoot'}), tfootContext),
        tr: (props, trContext) => this.plugTrProps(this.mergeProps(props, {className: 'tr grid'}), trContext),
        th: (props, thContext) => this.plugThProps(this.mergeProps(props, {className: 'th col'}), thContext),
        td: (props, tdContext) => this.plugTdProps(this.mergeProps(props, {className: 'td col'}), tdContext)
      }}/>);
    }
  };
}