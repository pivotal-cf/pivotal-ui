import React from 'react';
import ReactDOM from 'react-dom';
import {Table, withFlex} from '../../../../src/react/table';

describe('withFlex', () => {
  describe('without tag overrides', () => {
    beforeEach(() => {
      const columns = [{
        attribute: 'attr1'
      }, {
        attribute: 'attr2', displayName: 'Display2'
      }];
      const data = [{
        attr1: 'row1-value1', attr2: 'row1-value2'
      }, {
        attr1: 'row2-value1', attr2: 'row2-value2'
      }];

      const ComposedTable = withFlex(Table);
      ReactDOM.render(<ComposedTable {...{columns, data}}/>, root);
    });

    it('renders a div.table element', () => {
      expect('div.table').toExist();
    });

    it('renders a div.thead element', () => {
      expect('.table > div:eq(0)').toHaveClass('thead');
    });

    it('renders a div.tr header row', () => {
      expect('.table .thead > div').toHaveClass('tr');
    });

    it('renders div.th header cells', () => {
      expect('.table .thead .tr > div:eq(0)').toHaveClass('th');
      expect('.table .thead .tr > div:eq(1)').toHaveClass('th');
    });

    it('renders a div.tbody element', () => {
      expect('div.table > div:eq(1)').toHaveClass('tbody');
    });

    it('renders div.tr body rows', () => {
      expect('.table .tbody > div:eq(0)').toHaveClass('tr');
      expect('.table .tbody > div:eq(1)').toHaveClass('tr');
    });

    it('renders div.td body cells', () => {
      expect('.table .tbody .tr:eq(0) > div:eq(0)').toHaveClass('td');
      expect('.table .tbody .tr:eq(0) > div:eq(1)').toHaveClass('td');

      expect('.table .tbody .tr:eq(0) > div:eq(0)').toHaveClass('td');
      expect('.table .tbody .tr:eq(0) > div:eq(1)').toHaveClass('td');
    });

    it('renders all tr rows as grids', () => {
      expect('.table .thead .tr').toHaveClass('grid');
      expect('.table .tbody .tr:eq(0)').toHaveClass('grid');
      expect('.table .tbody .tr:eq(0)').toHaveClass('grid');
    });

    it('renders all th cells as cols', () => {
      expect('.table .thead .tr .th:eq(0)').toHaveClass('col');
      expect('.table .thead .tr .th:eq(1)').toHaveClass('col');
    });

    it('renders all td cells as cols', () => {
      expect('.table .tbody .tr:eq(0) .td:eq(0)').toHaveClass('col');
      expect('.table .tbody .tr:eq(0) .td:eq(1)').toHaveClass('col');

      expect('.table .tbody .tr:eq(1) .td:eq(0)').toHaveClass('col');
      expect('.table .tbody .tr:eq(1) .td:eq(1)').toHaveClass('col');
    });

    it('renders a div.tfoot element', () => {
      expect('.table > div:eq(2)').toHaveClass('tfoot');
    });
  });

  describe('with tag overrides', () => {
    beforeEach(() => {
      const columns = [{
        attribute: 'attr1'
      }, {
        attribute: 'attr2', displayName: 'Display2'
      }];
      const data = [{
        attr1: 'row1-value1', attr2: 'row1-value2'
      }, {
        attr1: 'row2-value1', attr2: 'row2-value2'
      }];

      const ComposedTable = withFlex(Table);
      ReactDOM.render(<ComposedTable {...{
        columns,
        data,
        tableTag: () => 'span',
        theadTag: () => 'span',
        tbodyTag: () => 'span',
        tfootTag: () => 'span',
        trTag: () => 'span',
        thTag: () => 'span',
        tdTag: () => 'span'
      }}/>, root);
    });

    it('renders a span.table element', () => {
      expect('span.table').toExist();
    });

    it('renders a span.thead element', () => {
      expect('.table > span:eq(0)').toHaveClass('thead');
    });

    it('renders a span.tr header row', () => {
      expect('.table .thead > span').toHaveClass('tr');
    });

    it('renders span.th header cells', () => {
      expect('.table .thead .tr > span:eq(0)').toHaveClass('th');
      expect('.table .thead .tr > span:eq(1)').toHaveClass('th');
    });

    it('renders a span.tbody element', () => {
      expect('span.table > span:eq(1)').toHaveClass('tbody');
    });

    it('renders span.tr body rows', () => {
      expect('.table .tbody > span:eq(0)').toHaveClass('tr');
      expect('.table .tbody > span:eq(1)').toHaveClass('tr');
    });

    it('renders span.td body cells', () => {
      expect('.table .tbody .tr:eq(0) > span:eq(0)').toHaveClass('td');
      expect('.table .tbody .tr:eq(0) > span:eq(1)').toHaveClass('td');

      expect('.table .tbody .tr:eq(0) > span:eq(0)').toHaveClass('td');
      expect('.table .tbody .tr:eq(0) > span:eq(1)').toHaveClass('td');
    });

    it('renders all tr rows as grids', () => {
      expect('.table .thead .tr').toHaveClass('grid');
      expect('.table .tbody .tr:eq(0)').toHaveClass('grid');
      expect('.table .tbody .tr:eq(0)').toHaveClass('grid');
    });

    it('renders all th cells as cols', () => {
      expect('.table .thead .tr .th:eq(0)').toHaveClass('col');
      expect('.table .thead .tr .th:eq(1)').toHaveClass('col');
    });

    it('renders all td cells as cols', () => {
      expect('.table .tbody .tr:eq(0) .td:eq(0)').toHaveClass('col');
      expect('.table .tbody .tr:eq(0) .td:eq(1)').toHaveClass('col');

      expect('.table .tbody .tr:eq(1) .td:eq(0)').toHaveClass('col');
      expect('.table .tbody .tr:eq(1) .td:eq(1)').toHaveClass('col');
    });

    it('renders a span.tfoot element', () => {
      expect('.table > span:eq(2)').toHaveClass('tfoot');
    });
  });
});