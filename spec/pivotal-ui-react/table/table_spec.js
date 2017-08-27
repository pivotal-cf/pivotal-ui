import '../spec_helper';
import {Table} from 'pui-react-table';

describe('Table', () => {
  let columns, data, table, thead, tbody, tr, th, td, subject;

  beforeEach(() => {
    columns = [{
      attribute: 'attr1'
    }, {
      attribute: 'attr2', displayName: 'Display2'
    }];
    data = [{
      attr1: 'row1-value1', attr2: 'row1-value2'
    }, {
      attr1: 'row2-value1', attr2: 'row2-value2'
    }];
    table = jasmine.createSpy('table').and.returnValue({className: 'table-class'});
    thead = jasmine.createSpy('thead').and.returnValue({className: 'thead-class'});
    tbody = jasmine.createSpy('tbody').and.returnValue({className: 'tbody-class'});
    tr = jasmine.createSpy('tr').and.returnValue({className: 'tr-class'});
    th = jasmine.createSpy('th').and.returnValue({className: 'th-class'});
    td = jasmine.createSpy('td').and.returnValue({className: 'td-class'});

    subject = ReactDOM.render(<Table {...{
      columns, data, table, thead, tbody, tr, th, td
    }}/>, root);
  });

  it('calls the table callback with empty context', () => {
    expect(table).toHaveBeenCalledWith({});
  });

  it('calls the thead callback with empty context', () => {
    expect(thead).toHaveBeenCalledWith({});
  });

  it('calls the tbody callback with empty context', () => {
    expect(tbody).toHaveBeenCalledWith({});
  });

  it('calls the tr callback with empty context', () => {
    expect(tr).toHaveBeenCalledWith({});
  });

  it('calls the th callback with column context', () => {
    columns.map(column => expect(th).toHaveBeenCalledWith({column}));
  });

  it('calls the td callback with column context', () => {
    columns.map(column => expect(td).toHaveBeenCalledWith({column}));
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

    expect('table tbody tr:eq(1) td:eq(0)').toHaveClass('td-class');
    expect('table tbody tr:eq(1) td:eq(0)').toHaveText('row2-value1');
    expect('table tbody tr:eq(1) td:eq(1)').toHaveClass('td-class');
    expect('table tbody tr:eq(1) td:eq(1)').toHaveText('row2-value2');
  });

  describe('with custom html tags', () => {
    beforeEach(() => subject::setProps({
      Table: 'div', Thead: 'div', Tbody: 'div', Tr: 'div', Th: 'div', Td: 'div'
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

      expect('.tbody-class .tr-class:eq(1) div:eq(0)').toHaveClass('td-class');
      expect('.tbody-class .tr-class:eq(1) div:eq(0)').toHaveText('row2-value1');
      expect('.tbody-class .tr-class:eq(1) div:eq(1)').toHaveClass('td-class');
      expect('.tbody-class .tr-class:eq(1) div:eq(1)').toHaveText('row2-value2');
    });
  });
});