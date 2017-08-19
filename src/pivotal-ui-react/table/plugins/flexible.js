import classnames from 'classnames';
import React, {cloneElement} from 'react';

function Div({id, style, children, className}) {
 return <div {...{id, style, children, className}}/>;
}

export const Flexible = {
  TableElement: Div,
  TableHeadElement: Div,
  TableHeaderElement: Div,
  TableBodyElement: Div,
  TableRowElement: Div,
  TableCellElement: Div,

  table: element => cloneElement(element, {className: classnames(element.props.className, 'table')}),
  tableHead: element => cloneElement(element, {className: classnames(element.props.className, 'thead')}),
  tableBody: element => cloneElement(element, {className: classnames(element.props.className, 'tbody')}),
  tableRow: element => cloneElement(element, {className: classnames(element.props.className, 'tr', 'grid')}),
  tableHeader: element => cloneElement(element, {className: classnames(element.props.className, 'th', 'col')}),
  tableCell: element => cloneElement(element, {className: classnames(element.props.className, 'td', 'col')}),
};