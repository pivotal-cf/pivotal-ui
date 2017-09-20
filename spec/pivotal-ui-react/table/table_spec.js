import '../spec_helper';
import {Table} from '../../../src/react/table';

describe('Table', () => {
  let columns, data, table, thead, tbody, tfoot, tr, th, td, subject;

  beforeEach(() => {
    columns = [{
      attribute: 'attr1'
    }, {
      attribute: 'attr2', displayName: 'Display2'
    }, {
      attribute: 'attr3.usage.name'
    }];
    data = [{
      attr1: 'row1-value1', attr2: 'row1-value2', attr3: {usage: {name: 'name1'}}
    }, {
      attr1: 'row2-value1', attr2: 'row2-value2', attr3: {}
    }];
    table = jasmine.createSpy('table').and.returnValue({className: 'table-class'});
    thead = jasmine.createSpy('thead').and.returnValue({className: 'thead-class'});
    tbody = jasmine.createSpy('tbody').and.returnValue({className: 'tbody-class'});
    tfoot = jasmine.createSpy('tfoot').and.returnValue({className: 'tfoot-class'});
    tr = jasmine.createSpy('tr').and.returnValue({className: 'tr-class'});
    th = jasmine.createSpy('th').and.returnValue({className: 'th-class'});
    td = jasmine.createSpy('td').and.returnValue({className: 'td-class'});

    subject = ReactDOM.render(<Table {...{
      className: 'some-class-name',
      columns, data, table, thead, tbody, tfoot, tr, th, td
    }}/>, root);
  });

  it('calls the table callback with props and empty context', () => {
    expect(table).toHaveBeenCalledWith({
      className: 'table some-class-name',
      children: jasmine.any(Array)
    }, {});
  });

  it('calls the thead callback with props and empty context', () => {
    expect(thead).toHaveBeenCalledWith({children: jasmine.any(Object)}, {});
  });

  it('calls the tbody callback with props and empty context', () => {
    expect(tbody).toHaveBeenCalledWith({children: jasmine.any(Array)}, {});
  });

  it('calls the tfoot callback with props and empty context', () => {
    expect(tfoot).toHaveBeenCalledWith({children: jasmine.any(Array)}, {});
  });

  it('calls the tr callback with props and isHeader context', () => {
    expect(tr).toHaveBeenCalledWith({children: jasmine.any(Array)}, {isHeader: true, rowIndex: -1});
    expect(tr).toHaveBeenCalledWith({children: jasmine.any(Array)}, {isHeader: false, rowDatum: data[0], rowIndex: 0});
    expect(tr).toHaveBeenCalledWith({children: jasmine.any(Array)}, {isHeader: false, rowDatum: data[1], rowIndex: 1});
  });

  it('calls the th callback with props and column context', () => {
    expect(th).toHaveBeenCalledWith({children: columns[0].attribute}, {column: columns[0]});
    expect(th).toHaveBeenCalledWith({children: columns[1].displayName}, {column: columns[1]});
  });

  it('calls the td callback with props and column context', () => {
    expect(td).toHaveBeenCalledWith({children: data[0].attr1}, {rowDatum: data[0], column: columns[0]});
    expect(td).toHaveBeenCalledWith({children: data[0].attr2}, {rowDatum: data[0], column: columns[1]});
    expect(td).toHaveBeenCalledWith({children: data[0].attr3.usage.name}, {rowDatum: data[0], column: columns[2]});
    expect(td).toHaveBeenCalledWith({children: data[1].attr1}, {rowDatum: data[1], column: columns[0]});
    expect(td).toHaveBeenCalledWith({children: data[1].attr2}, {rowDatum: data[1], column: columns[1]});
    expect(td).toHaveBeenCalledWith({children: undefined}, {rowDatum: data[1], column: columns[2]});
  });

  it('renders a table element with the expected classes', () => {
    expect('table').toHaveClass('table');
    expect('table').toHaveClass('table-class');
  });

  it('renders a thead element with the expected class', () => {
    expect('table thead').toHaveClass('thead-class');
  });

  it('renders a header tr element with the expected class', () => {
    expect('table thead tr').toHaveClass('tr-class');
  });

  it('renders th elements with the expected class and text', () => {
    expect('table thead tr th:eq(0)').toHaveClass('th-class');
    expect('table thead tr th:eq(0)').toHaveText('attr1');

    expect('table thead tr th:eq(1)').toHaveClass('th-class');
    expect('table thead tr th:eq(1)').toHaveText('Display2');

    expect('table thead tr th:eq(2)').toHaveClass('th-class');
    expect('table thead tr th:eq(2)').toHaveText('attr3.usage.name');
  });

  it('renders a tbody element with the expected class', () => {
    expect('table tbody').toHaveClass('tbody-class');
  });

  it('renders body tr elements with the expected class', () => {
    expect('table tbody tr:eq(0)').toHaveClass('tr-class');
    expect('table tbody tr:eq(1)').toHaveClass('tr-class');
  });

  it('renders td elements with the expected class and text', () => {
    expect('table tbody tr:eq(0) td:eq(0)').toHaveClass('td-class');
    expect('table tbody tr:eq(0) td:eq(0)').toHaveText('row1-value1');
    expect('table tbody tr:eq(0) td:eq(1)').toHaveClass('td-class');
    expect('table tbody tr:eq(0) td:eq(1)').toHaveText('row1-value2');
    expect('table tbody tr:eq(0) td:eq(2)').toHaveClass('td-class');
    expect('table tbody tr:eq(0) td:eq(2)').toHaveText('name1');

    expect('table tbody tr:eq(1) td:eq(0)').toHaveClass('td-class');
    expect('table tbody tr:eq(1) td:eq(0)').toHaveText('row2-value1');
    expect('table tbody tr:eq(1) td:eq(1)').toHaveClass('td-class');
    expect('table tbody tr:eq(1) td:eq(1)').toHaveText('row2-value2');
    expect('table tbody tr:eq(1) td:eq(2)').toHaveClass('td-class');
    expect('table tbody tr:eq(1) td:eq(2)').toHaveText('');
  });

  it('renders a tfoot element with the expected class', () => {
    expect('table tfoot').toHaveClass('tfoot-class');
  });

  describe('with custom html tags', () => {
    beforeEach(() => subject::setProps({
      tableTag: () => 'div',
      theadTag: () => 'div',
      tbodyTag: () => 'div',
      tfootTag: () => 'div',
      trTag: () => 'div',
      thTag: () => 'div',
      tdTag: () => 'div'
    }));

    it('renders a table div element with the expected classes', () => {
      expect('div.table').toHaveClass('table-class');
    });

    it('renders a thead div element with the expected classes', () => {
      expect('.table > div:eq(0)').toExist('thead-class');
    });

    it('renders a header tr div element with the expected class', () => {
      expect('.thead-class > div').toHaveClass('tr-class');
    });

    it('renders th div elements with the expected class and text', () => {
      expect('.thead-class .tr-class div:eq(0)').toHaveClass('th-class');
      expect('.thead-class .tr-class div:eq(0)').toHaveText('attr1');

      expect('.thead-class .tr-class div:eq(1)').toHaveClass('th-class');
      expect('.thead-class .tr-class div:eq(1)').toHaveText('Display2');

      expect('.thead-class .tr-class div:eq(2)').toHaveClass('th-class');
      expect('.thead-class .tr-class div:eq(2)').toHaveText('attr3.usage.name');
    });

    it('renders a tbody div element with the expected classes', () => {
      expect('div.table > div:eq(1)').toHaveClass('tbody-class');
    });

    it('renders body tr div elements with the expected class', () => {
      expect('.tbody-class .tr-class:eq(0)').toHaveClass('tr-class');
      expect('.tbody-class .tr-class:eq(1)').toHaveClass('tr-class');
    });

    it('renders td div elements with the expected class and text', () => {
      expect('.tbody-class .tr-class:eq(0) div:eq(0)').toHaveClass('td-class');
      expect('.tbody-class .tr-class:eq(0) div:eq(0)').toHaveText('row1-value1');
      expect('.tbody-class .tr-class:eq(0) div:eq(1)').toHaveClass('td-class');
      expect('.tbody-class .tr-class:eq(0) div:eq(1)').toHaveText('row1-value2');
      expect('.tbody-class .tr-class:eq(0) div:eq(2)').toHaveClass('td-class');
      expect('.tbody-class .tr-class:eq(0) div:eq(2)').toHaveText('name1');

      expect('.tbody-class .tr-class:eq(1) div:eq(0)').toHaveClass('td-class');
      expect('.tbody-class .tr-class:eq(1) div:eq(0)').toHaveText('row2-value1');
      expect('.tbody-class .tr-class:eq(1) div:eq(1)').toHaveClass('td-class');
      expect('.tbody-class .tr-class:eq(1) div:eq(1)').toHaveText('row2-value2');
      expect('.tbody-class .tr-class:eq(1) div:eq(2)').toHaveClass('td-class');
      expect('.tbody-class .tr-class:eq(1) div:eq(2)').toHaveText('');
    });

    it('renders a tfoot div element with the expected classes', () => {
      expect('div.table > div:eq(2)').toHaveClass('tfoot-class');
    });
  });

  describe('with opt-out custom html tags', () => {
    beforeEach(() => subject::setProps({
      tableTag: () => null,
      theadTag: () => null,
      tbodyTag: () => null,
      tfootTag: () => null,
      trTag: () => null,
      thTag: () => null,
      tdTag: () => null
    }));

    it('renders a table element with the expected classes', () => {
      expect('table').toHaveClass('table');
      expect('table').toHaveClass('table-class');
    });

    it('renders a thead element with the expected class', () => {
      expect('table thead').toHaveClass('thead-class');
    });

    it('renders a header tr element with the expected class', () => {
      expect('table thead tr').toHaveClass('tr-class');
    });

    it('renders th elements with the expected class and text', () => {
      expect('table thead tr th:eq(0)').toHaveClass('th-class');
      expect('table thead tr th:eq(0)').toHaveText('attr1');

      expect('table thead tr th:eq(1)').toHaveClass('th-class');
      expect('table thead tr th:eq(1)').toHaveText('Display2');

      expect('table thead tr th:eq(2)').toHaveClass('th-class');
      expect('table thead tr th:eq(2)').toHaveText('attr3.usage.name');
    });

    it('renders a tbody element with the expected class', () => {
      expect('table tbody').toHaveClass('tbody-class');
    });

    it('renders body tr elements with the expected class', () => {
      expect('table tbody tr:eq(0)').toHaveClass('tr-class');
      expect('table tbody tr:eq(1)').toHaveClass('tr-class');
    });

    it('renders td elements with the expected class and text', () => {
      expect('table tbody tr:eq(0) td:eq(0)').toHaveClass('td-class');
      expect('table tbody tr:eq(0) td:eq(0)').toHaveText('row1-value1');
      expect('table tbody tr:eq(0) td:eq(1)').toHaveClass('td-class');
      expect('table tbody tr:eq(0) td:eq(1)').toHaveText('row1-value2');
      expect('table tbody tr:eq(0) td:eq(2)').toHaveClass('td-class');
      expect('table tbody tr:eq(0) td:eq(2)').toHaveText('name1');

      expect('table tbody tr:eq(1) td:eq(0)').toHaveClass('td-class');
      expect('table tbody tr:eq(1) td:eq(0)').toHaveText('row2-value1');
      expect('table tbody tr:eq(1) td:eq(1)').toHaveClass('td-class');
      expect('table tbody tr:eq(1) td:eq(1)').toHaveText('row2-value2');
      expect('table tbody tr:eq(1) td:eq(2)').toHaveClass('td-class');
      expect('table tbody tr:eq(1) td:eq(2)').toHaveText('');
    });

    it('renders a tfoot element with the expected class', () => {
      expect('table tfoot').toHaveClass('tfoot-class');
    });
  });
});