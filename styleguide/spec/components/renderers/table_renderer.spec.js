import React from 'react';
import ReactDOM from 'react-dom';
import TableRenderer from '../../../src/components/renderers/table_renderer';

describe('TableRenderer', () => {
  beforeEach(() => {
    ReactDOM.render(<TableRenderer {...{
      className: 'test-table-class',
      id: 'test-table-id',
      children: [
        <thead>
        <tr>
          <th>col1</th>
          <th>col2</th>
        </tr>
        </thead>,
        <tbody>
        <tr>
          <td>A</td>
          <td>B</td>
        </tr>
        <tr>
          <td>C</td>
          <td>D</td>
        </tr>
        </tbody>
      ]
    }}/>, root);
  });

  it('renders a table', () => {
    expect('table.md-table').toHaveClass('test-table-class');
    expect('table.md-table').toHaveAttr('id', 'test-table-id');
  });

  it('gives correct class names to thead rows', () => {
    expect('table.md-table thead tr').toHaveClass(['tr-no-h-borders', 'bg-white']);
  });

  it('gives correct class names to tbody rows', () => {
    expect('table.md-table tbody tr').toHaveLength(2);
    expect('table.md-table tbody tr:eq(0)').toHaveClass('tr-no-h-borders');
    expect('table.md-table tbody tr:eq(1)').toHaveClass('tr-no-h-borders');
  });
});