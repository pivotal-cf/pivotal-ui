import React from 'react';
import ReactDOM from 'react-dom';
import {Table, withCellEllipsis} from '../../../../src/react/table';

describe('withCellEllipsis', () => {
  let data, columns, ComposedTable;

  beforeEach(() => {
    columns = [{attribute: 'attr1'}];
    data = [{attr1: 'my value'}];
    ComposedTable = withCellEllipsis(Table);
  });

  describe('when ellipsis is true', () => {
    beforeEach(() => {
      columns[0].ellipsis = true;
      ReactDOM.render(<ComposedTable {...{columns, data}}/>, root);
    });

    it('renders with the "type-ellipsis" class', () => {
      expect('table tr:eq(1) td:eq(0) span').toHaveClass('type-ellipsis');
    });
  });

  describe('when ellipsis is false', () => {
    beforeEach(() => {
      columns[0].ellipsis = false;
      ReactDOM.render(<ComposedTable {...{columns, data}}/>, root);
    });

    it('does not render with the "type-ellipsis" class', () => {
      expect('table tr:eq(1) td:eq(0) span').not.toExist();
    });
  });
});
