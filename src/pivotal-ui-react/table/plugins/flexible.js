import React from 'react';

import Plugin from '../plugin';

function Div({id, style, children, className}) {
  return <div {...{id, style, children, className}}/>;
}

export class Flexible extends Plugin {
  static Table = Div;
  static Thead = Div;
  static Tbody = Div;
  static Tr = Div;
  static Th = Div;
  static Td = Div;

  thead() {
    return {className: 'thead'};
  }

  tbody() {
    return {className: 'tbody'};
  }

  tr() {
    return {className: 'tr grid'};
  }

  th() {
    return {className: 'th col'};
  }

  td() {
    return {className: 'td col'};
  }
}