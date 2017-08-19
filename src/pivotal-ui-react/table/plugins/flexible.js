import classnames from 'classnames';
import React, {cloneElement} from 'react';

function Div({id, style, children, className}) {
 return <div {...{id, style, children, className}}/>;
}

export const Flexible = {
  Table: Div,
  Thead: Div,
  Tbody: Div,
  Tr: Div,
  Th: Div,
  Td: Div,

  thead: element => cloneElement(element, {className: classnames(element.props.className, 'thead')}),
  tbody: element => cloneElement(element, {className: classnames(element.props.className, 'tbody')}),
  tr: element => cloneElement(element, {className: classnames(element.props.className, 'tr', 'grid')}),
  th: element => cloneElement(element, {className: classnames(element.props.className, 'th', 'col')}),
  td: element => cloneElement(element, {className: classnames(element.props.className, 'td', 'col')}),
};