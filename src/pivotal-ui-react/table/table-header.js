import PropTypes from 'prop-types';
import React from 'react';

import Pluggable, {useLast} from './pluggable';

function Th({id, style, children, className}) {
  return <th {...{id, style, children, className}}/>;
}

export function newTableHeader(...plugins) {
  const reversedPlugins = [{Th}, ...plugins].reverse();

  return class extends React.Component {
    static propTypes = {
      column: PropTypes.object
    };

    render() {
      const {column} = this.props;
      const {attribute, displayName, className} = column;

      const Th = useLast({reversedPlugins, type: 'Th'});

      return (
        <Pluggable {...{type: 'th', plugins}}>
          <Th {...{column, className}}>{displayName || attribute}</Th>
        </Pluggable>
      );
    }
  }
}