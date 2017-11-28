import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export class TablePlugin extends React.Component {
  static propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array.isRequired,
    plugTag: PropTypes.func.isRequired,
    tableTag: PropTypes.func,
    theadTag: PropTypes.func,
    tbodyTag: PropTypes.func,
    tfootTag: PropTypes.func,
    trTag: PropTypes.func,
    thTag: PropTypes.func,
    tdTag: PropTypes.func,
    plugProps: PropTypes.func.isRequired,
    table: PropTypes.func,
    thead: PropTypes.func,
    tbody: PropTypes.func,
    tfoot: PropTypes.func,
    tr: PropTypes.func,
    th: PropTypes.func,
    td: PropTypes.func
  };

  static defaultProps = {
    plugTag: (method, tag) => tag,
    plugProps: (method, props) => props
  };

  constructor(props) {
    super(props);
    this.plugTag = this.plugTag.bind(this);
    this.plugProps = this.plugProps.bind(this);
  }

  plugTag(method, tag, pluginContext = {}) {
    const pluggedTag = this.props[`${method}Tag`] && this.props[`${method}Tag`](pluginContext);
    return this.props.plugTag(method, pluggedTag, pluginContext) || tag;
  }

  mergeProps(props1 = {}, props2 = {}) {
    return {
      ...props1,
      ...props2,
      className: classnames(props1.className, props2.className),
      style: {...props1.style, ...props2.style}
    };
  }

  plugProps(method, props = {}, pluginContext = {}) {
    const pluggedProps = this.props[method] && this.mergeProps(props, this.props[method](props, pluginContext));
    return this.props.plugProps(method, pluggedProps || props, pluginContext);
  }

  renderTable(Table, methods, props = this.props) {
    const {plugTag, tableTag, theadTag, tbodyTag, tfootTag, trTag, thTag, tdTag, plugProps, table, thead, tbody, tfoot, tr, th, td, ...others} = props;
    return (<Table {...{...others, ...methods, plugTag: this.plugTag, plugProps: this.plugProps}}/>);
  }

  render() {
    return null;
  }
}