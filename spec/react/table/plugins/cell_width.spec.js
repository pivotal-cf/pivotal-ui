import React from 'react';
import ReactDOM from 'react-dom';
import {Table, withCellWidth} from '../../../../src/react/table';

describe('withCellWidth', () => {
  beforeEach(() => {
    const columns = [{
      attribute: 'attr1', width: '100px'
    }, {
      attribute: 'attr2', width: '200px', displayName: 'Display2'
    }];
    const data = [{
      attr1: 'row1-value1', attr2: 'row1-value2'
    }, {
      attr1: 'row2-value1', attr2: 'row2-value2'
    }];

    const ComposedTable = withCellWidth(Table);
    ReactDOM.render(<ComposedTable {...{columns, data}}/>, root);
  });

  it('renders th elements with col-fixed class', () => {
    expect('table tr:eq(0) th:eq(0)').toHaveClass('col-fixed');
    expect('table tr:eq(0) th:eq(1)').toHaveClass('col-fixed');
  });

  it('renders th elements with width style', () => {
    expect('table tr:eq(0) th:eq(0)').toHaveStyle({width: '100px'});
    expect('table tr:eq(0) th:eq(1)').toHaveStyle({width: '200px'});
  });

  it('renders td elements with col-fixed class', () => {
    expect('table tr:eq(1) td:eq(0)').toHaveClass('col-fixed');
    expect('table tr:eq(1) td:eq(1)').toHaveClass('col-fixed');

    expect('table tr:eq(2) td:eq(0)').toHaveClass('col-fixed');
    expect('table tr:eq(2) td:eq(1)').toHaveClass('col-fixed');
  });

  it('renders td elements with width style', () => {
    expect('table tr:eq(1) td:eq(0)').toHaveStyle({width: '100px'});
    expect('table tr:eq(1) td:eq(1)').toHaveStyle({width: '200px'});

    expect('table tr:eq(2) td:eq(0)').toHaveStyle({width: '100px'});
    expect('table tr:eq(2) td:eq(1)').toHaveStyle({width: '200px'});
  });
});