import {Icon} from 'pui-react-iconography';
import {mergeProps} from 'pui-react-helpers';
import PropTypes from 'prop-types';
import React from 'react';

import Pluggable from './pluggable';

export function newTableHeader(...plugins) {
  const reversedPlugins = [...plugins].reverse();

  return class extends React.Component {
    static propTypes = {
      column: PropTypes.object
    };

    render() {
      const {column} = this.props;
      const {attribute, displayName, className} = column;

      const Th = reversedPlugins.find(plugin => plugin.TableHeaderElement).TableHeaderElement;

      return (
        <Pluggable {...{type: 'tableHeader', plugins}}>
          <Th {...{column, className}}>{displayName || attribute}</Th>
        </Pluggable>
      );
    }
  }
}