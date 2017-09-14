import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export class TablePlugin extends React.Component {
  static propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    tableTag: PropTypes.func,
    theadTag: PropTypes.func,
    tbodyTag: PropTypes.func,
    tfootTag: PropTypes.func,
    trTag: PropTypes.func,
    thTag: PropTypes.func,
    tdTag: PropTypes.func,
    table: PropTypes.func.isRequired,
    thead: PropTypes.func.isRequired,
    tbody: PropTypes.func.isRequired,
    tfoot: PropTypes.func.isRequired,
    tr: PropTypes.func.isRequired,
    th: PropTypes.func.isRequired,
    td: PropTypes.func.isRequired
  };

  static defaultProps = {
    tableTag: () => null,
    theadTag: () => null,
    tbodyTag: () => null,
    tfootTag: () => null,
    trTag: () => null,
    thTag: () => null,
    tdTag: () => null,
    table: () => ({}),
    thead: () => ({}),
    tbody: () => ({}),
    tfoot: () => ({}),
    tr: () => ({}),
    th: () => ({}),
    td: () => ({})
  };

  plugTag(tagCb, tagContext = {}, method) {
    return this.props[method](tagContext) || tagCb();
  }

  plugTableTag(tagCb, tableTagContext) {
    return this.plugTag(tagCb, tableTagContext, 'tableTag');
  }

  plugTheadTag(tagCb, theadTagContext) {
    return this.plugTag(tagCb, theadTagContext, 'theadTag');
  }

  plugTbodyTag(tagCb, tbodyTagContext) {
    return this.plugTag(tagCb, tbodyTagContext, 'tbodyTag');
  }

  plugTfootTag(tagCb, tfootTagContext) {
    return this.plugTag(tagCb, tfootTagContext, 'tfootTag');
  }

  plugTrTag(tagCb, trTagContext) {
    return this.plugTag(tagCb, trTagContext, 'trTag');
  }

  plugThTag(tagCb, thTagContext) {
    return this.plugTag(tagCb, thTagContext, 'thTag');
  }

  plugTdTag(tagCb, tdTagContext) {
    return this.plugTag(tagCb, tdTagContext, 'tdTag');
  }

  mergeProps(props1, props2) {
    return {
      ...props1,
      ...props2,
      className: classnames(props1.className, props2.className),
      style: {...props1.style, ...props2.style}
    };
  }

  plugProps(props = {}, pluginContext = {}, method) {
    return this.mergeProps(props, this.props[method](props, pluginContext));
  }

  plugTableProps(props, tableContext) {
    return this.plugProps(props, tableContext, 'table');
  }

  plugTheadProps(props, theadContext) {
    return this.plugProps(props, theadContext, 'thead');
  }

  plugTbodyProps(props, tbodyContext) {
    return this.plugProps(props, tbodyContext, 'tbody');
  }

  plugTfootProps(props, tfootContext) {
    return this.plugProps(props, tfootContext, 'tfoot');
  }

  plugTrProps(props, trContext) {
    return this.plugProps(props, trContext, 'tr');
  }

  plugThProps(props, thContext) {
    return this.plugProps(props, thContext, 'th');
  }

  plugTdProps(props, tdContext) {
    return this.plugProps(props, tdContext, 'td');
  }

  render() {
    return null;
  }
}