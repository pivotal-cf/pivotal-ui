import '../../spec_helper';
import {Table, withCellRenderer} from '../../../../src/react/table';

describe('withCellRenderer', () => {
  let renderer1, renderer2, data;

  beforeEach(() => {
    renderer1 = jasmine.createSpy('renderer1').and.callFake(({attr1}) => <span>{attr1.toUpperCase()}</span>);
    renderer2 = jasmine.createSpy('renderer1').and.callFake(({attr2}) => <span>{attr2.toUpperCase()}</span>);
    const columns = [{
      attribute: 'attr1', CellRenderer: renderer1
    }, {
      attribute: 'attr2', CellRenderer: renderer2, displayName: 'Display2'
    }];
    data = [{
      attr1: 'row1-value1', attr2: 'row1-value2'
    }, {
      attr1: 'row2-value1', attr2: 'row2-value2'
    }];

    const ComposedTable = withCellRenderer(Table);
    ReactDOM.render(<ComposedTable {...{columns, data}}/>, root);
  });

  it('renders td elements using renderer1 with expected text', () => {
    expect('table tr:eq(1) td:eq(0)').toHaveText(data[0].attr1.toUpperCase());
    expect('table tr:eq(2) td:eq(0)').toHaveText(data[1].attr1.toUpperCase());
  });

  it('renders td elements using renderer2 with expected text', () => {
    expect('table tr:eq(1) td:eq(1)').toHaveText(data[0].attr2.toUpperCase());
    expect('table tr:eq(2) td:eq(1)').toHaveText(data[1].attr2.toUpperCase());
  });
});