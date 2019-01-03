import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export class TablePlugin extends React.Component {
  static propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array.isRequired,
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
    plugProps: (tagName, props) => props
  };

  mergeProps(props1 = {}, props2 = {}) {
    return {
      ...props1,
      ...props2,
      className: classnames(props1.className, props2.className),
      style: {...props1.style, ...props2.style}
    };
  }

  plugProps = (tagName, props = {}, pluginContext = {}) => {
    const pluggedProps = this.props[tagName] && this.mergeProps(props, this.props[tagName](props, pluginContext));
    return this.props.plugProps(tagName, pluggedProps || props, pluginContext);
  }

  renderTable(Table, tagProps, props = this.props) {
    const {plugProps, table, thead, tbody, tfoot, tr, th, td, ...others} = props;
    return (<Table {...{...others, ...tagProps, plugProps: this.plugProps}}/>);
  }

  render() {
    return null;
  }
}