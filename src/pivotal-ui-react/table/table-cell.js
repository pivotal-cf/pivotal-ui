import PropTypes from 'prop-types';
import React from 'react';

import Pluggable, {useLast} from './pluggable';

function Td({id, style, children, className}) {
  return <td {...{id, style, children, className}}/>;
}

export function newTableCell(...plugins) {
  const reversedPlugins = [{Td}, ...plugins].reverse();

  return class extends React.Component {
    static propTypes = {
      column: PropTypes.object,
      rowDatum: PropTypes.object
    };

    render() {
      const {className, rowDatum, column} = this.props;
      const {attribute} = column;

      const Td = useLast({reversedPlugins, type: 'Td'});

      return (
        <Pluggable {...{type: 'td', plugins}}>
          <Td {...{className, column}}>{rowDatum[attribute]}</Td>
        </Pluggable>
      );
    }
  };
}