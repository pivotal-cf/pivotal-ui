import React from 'react';
import ReactDOM from 'react-dom';
import {Table, withCellClassName} from '../../../../src/react/table';

describe('withCellClassName', () => {
  let className;

  beforeEach(() => {
    className = jasmine.createSpy('className')
      .and.callFake(rowDatum => `class-${rowDatum.attr1}-${rowDatum.attr2}`);
    const columns = [{
      attribute: 'attr1', className: 'class-attr1'
    }, {
      attribute: 'attr2', className, displayName: 'Display2'
    }];
    const data = [{
      attr1: 'row1-value1', attr2: 'row1-value2'
    }, {
      attr1: 'row2-value1', attr2: 'row2-value2'
    }];

    const ComposedTable = withCellClassName(Table);
    ReactDOM.render(<ComposedTable {...{columns, data}}/>, root);
  });

  it('renders th elements with class name', () => {
    expect('table tr:eq(0) th:eq(0)').toHaveClass('class-attr1');
    expect('table tr:eq(0) th:eq(1)').toHaveClass('class-undefined-undefined');
  });

  it('renders td elements with class name', () => {
    expect('table tr:eq(1) td:eq(0)').toHaveClass('class-attr1');
    expect('table tr:eq(1) td:eq(1)').toHaveClass('class-row1-value1-row1-value2');
    expect('table tr:eq(2) td:eq(0)').toHaveClass('class-attr1');
    expect('table tr:eq(2) td:eq(1)').toHaveClass('class-row2-value1-row2-value2');
  });
});