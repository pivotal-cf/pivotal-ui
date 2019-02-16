import React from 'react';
import ReactDOM from 'react-dom';
import {Table, withRenderThChildren} from '../../../../src/react/table';

describe('withRenderThChildren', () => {
  let data;

  beforeEach(() => {
    const columns = [
      {attribute: 'attr1', renderThChildren: () => (<div className="custom">some header</div>)},
      {attribute: 'attr2', displayName: 'Attr2'}
    ];

    data = [{
      attr1: 'row1-value1',
      attr2: 'row1-value2'
    }];

    const ComposedTable = withRenderThChildren(Table);
    ReactDOM.render(<ComposedTable {...{columns, data}}/>, root);
  });

  it('renders the correct header', () => {
    expect('table thead th:eq(0) .custom').toHaveText('some header');
    expect('table thead th:eq(1)').toHaveText('Attr2');
  });
});
