import React from 'react';

import Plugin from '../plugin';

function Div({id, style, children, className}) {
  return <div {...{id, style, children, className}}/>;
}

export class Flexible extends Plugin {
  static Table = Div;
  static Thead = Div;
  static Th = Div;
  static Tbody = Div;
  static Tr = Div;
  static Td = Div;

  thead() {
    return this.mergeClasses('thead');
  }

  tbody() {
    return this.mergeClasses('tbody');
  }

  tr() {
    return this.mergeClasses('tr', 'grid');
  }

  th() {
    return this.mergeClasses('th', 'col');
  }

  td() {
    return this.mergeClasses('td', 'col');
  }
}