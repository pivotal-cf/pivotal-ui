import React from 'react';
import ReactDOM from 'react-dom';
import {Table, withFlex, withCellLink} from '../../../../src/react/table';

describe('withCellLink', () => {
  let link;

  beforeEach(() => {
    link = jasmine.createSpy('link').and.returnValue('some-href');
    const columns = [{
      attribute: 'attr1'
    }, {
      attribute: 'attr2', link, displayName: 'Display2'
    }];
    const data = [{
      attr1: 'row1-value1', attr2: 'row1-value2'
    }, {
      attr1: 'row2-value1', attr2: 'row2-value2'
    }];

    const ComposedTable = withCellLink(withFlex(Table));
    ReactDOM.render(<ComposedTable {...{columns, data}}/>, root);
  });

  it('renders div.th elements without href', () => {
    expect('.table .tr:eq(0) > div.th:eq(0)').not.toHaveAttr('href');
    expect('.table .tr:eq(0) > div.th:eq(1)').not.toHaveAttr('href');
  });

  it('renders a.td elements with href', () => {
    expect('.table .tr:eq(1) > a.td').toHaveAttr('href', 'some-href');
    expect('.table .tr:eq(2) > a.td').toHaveAttr('href', 'some-href');
  });

  it('renders div.td elements without href', () => {
    expect('.table .tr:eq(1) > div.td').not.toHaveAttr('href');
    expect('.table .tr:eq(2) > div.td').not.toHaveAttr('href');
  });
});