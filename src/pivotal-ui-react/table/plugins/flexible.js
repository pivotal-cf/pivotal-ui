import classnames from 'classnames';
import React, {cloneElement} from 'react';
import types from 'prop-types';

function Div({id, style, children, className}) {
  return <div {...{id, style, children, className}}/>;
}

export class Flexible extends React.Component {
  static propTypes = {child: types.node.isRequired, target: types.node.isRequired, type: types.string.isRequired};

  static TableElement = Div;
  static TableHeadElement = Div;
  static TableHeaderElement = Div;
  static TableBodyElement = Div;
  static TableRowElement = Div;
  static TableCellElement = Div;

  tableHead = () => cloneElement(this.props.target, {...this.props, className: classnames(this.props.className, 'thead')});
  tableBody = () => cloneElement(this.props.target, {...this.props, className: classnames(this.props.className, 'tbody')});
  tableRow = () => cloneElement(this.props.target, {...this.props, className: classnames(this.props.className, 'tr', 'grid')});
  tableHeader = () => cloneElement(this.props.child, {...this.props, className: classnames(this.props.className, 'th', 'col')});
  tableCell = () => cloneElement(this.props.child, {...this.props, className: classnames(this.props.className, 'td', 'col')});

  render = () => {
    const {child, type} = this.props;
    if (!this[type]) return child;
    return this[type]();
  }
}