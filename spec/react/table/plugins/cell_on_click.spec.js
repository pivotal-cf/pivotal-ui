import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Table, withCellOnClick} from '../../../../src/react/table';

describe('withCellOnClick', () => {
  let onClick, data;

  beforeEach(() => {
    onClick = jasmine.createSpy('onClick');
    const columns = [{
      attribute: 'attr1',
      onClick
    }];
    data = [{attr1: 'my value'}];

    const ComposedTable = withCellOnClick(Table);
    ReactDOM.render(<ComposedTable {...{columns, data}}/>, root);
  });

  it('calls the onClick callback', () => {
    $('table tr:eq(1) td:eq(0)').simulate('click');
    expect(onClick).toHaveBeenCalledWith(jasmine.any(Object), data[0]);
  });
});