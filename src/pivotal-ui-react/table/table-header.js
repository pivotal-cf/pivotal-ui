import classnames from 'classnames';
import {Icon} from 'pui-react-iconography';
import {mergeProps} from 'pui-react-helpers';
import PropTypes from 'prop-types';
import React from 'react';
import 'pui-css-tables';

import {emit} from './event-emitter';

export class TableHeader extends React.Component {
  static propTypes = {
    column: PropTypes.object,
    index: PropTypes.number,
    table: PropTypes.object
  };

  render() {
    const {column, index, table} = this.props;
    const {attribute, displayName, className} = column;

    const baseHeaderProps = column.headerProps || {};
    const headerProps = emit(table, {
      event: 'beforeRenderTableHeader',
      opts: {column, index},
      initial: {
        ...baseHeaderProps,
        className: classnames(baseHeaderProps.className, className),
        key: index
      }
    });

    const icon = emit(table, {event: 'headerIcon', opts: {column}});

    const Header = emit(table, {event: 'tableHeaderElement', initial: 'th'});
    return (<Header {...headerProps}>
      <div>{displayName || attribute}{icon}</div>
    </Header>);
  }
}