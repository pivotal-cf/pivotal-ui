import {Icon} from 'pui-react-iconography';
import {mergeProps} from 'pui-react-helpers';
import PropTypes from 'prop-types';
import React from 'react';
import 'pui-css-tables';
import flow from 'lodash.flow'

export function TableHeader(...plugins) {
  const reversedPlugins = [...plugins].reverse();

  return class extends React.Component {
    static propTypes = {
      column: PropTypes.object,
      table: PropTypes.object
    };

    render() {
      const {column} = this.props;
      const {attribute, displayName, className} = column;

      const Th = reversedPlugins.find(plugin => plugin.TableHeaderElement).TableHeaderElement;

      return flow(...plugins.map(p => p.tableHeader).filter(Boolean))(<Th {...{column, className}}>
        <div>{displayName || attribute}</div>
      </Th>);
    }
  }
}