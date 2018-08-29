import '../spec_helper';
import {Table} from '../../../src/react/table';

describe('Table', () => {
  let data, columns, table, thead, tbody, tfoot, tr, th, td, subject;

  beforeEach(() => {
    table = jest.fn().and.returnValue({className: 'table-class'});
    thead = jest.fn().and.returnValue({className: 'thead-class'});
    tbody = jest.fn().and.returnValue({className: 'tbody-class'});
    tfoot = jest.fn().and.returnValue({className: 'tfoot-class'});
    tr = jest.fn().and.returnValue({className: 'tr-class'});
    th = jest.fn().and.returnValue({className: 'th-class'});
    td = jest.fn().and.returnValue({className: 'td-class'});
  });

  describe('with columns', () => {
    beforeEach(() => {
      data = [{
        attr1: 'row1-value1', attr2: 'row1-value2', attr3: {usage: {name: 'name1'}}
      }, {
        attr1: 'row2-value1', attr2: 'row2-value2', attr3: {}
      }];
      columns = [{
        attribute: 'attr1'
      }, {
        attribute: 'attr2', displayName: 'Display2'
      }, {
        attribute: 'attr3.usage.name'
      }];

      subject = shallow(<Table {...{
        className: 'some-class-name',
        columns, data, table, thead, tbody, tfoot, tr, th, td
      }}/>);
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
      expect(tr).toHaveBeenCalledWith({children: jasmine.any(Array)}, {
        isHeader: false,
        rowDatum: data[0],
        rowIndex: 0
      });
      expect(tr).toHaveBeenCalledWith({children: jasmine.any(Array)}, {
        isHeader: false,
        rowDatum: data[1],
        rowIndex: 1
      });
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
      expect(subject.find('table').hasClass('table')).toBeTruthy();
      expect(subject.find('table').hasClass('table-class')).toBeTruthy();
    });

    it('renders a thead element with the expected class', () => {
      expect(subject.find('table thead').hasClass('thead-class')).toBeTruthy();
    });

    it('renders a header tr element with the expected class', () => {
      expect(subject.find('table thead tr').hasClass('tr-class')).toBeTruthy();
    });

    it('renders th elements with the expected class and text', () => {
      expect(subject.find('table thead tr th:eq(0)').hasClass('th-class')).toBeTruthy();
      expect('table thead tr th:eq(0)'.text()).toBe('attr1');

      expect(subject.find('table thead tr th:eq(1)').hasClass('th-class')).toBeTruthy();
      expect('table thead tr th:eq(1)'.text()).toBe('Display2');

      expect(subject.find('table thead tr th:eq(2)').hasClass('th-class')).toBeTruthy();
      expect('table thead tr th:eq(2)'.text()).toBe('attr3.usage.name');
    });

    it('renders a tbody element with the expected class', () => {
      expect(subject.find('table tbody').hasClass('tbody-class')).toBeTruthy();
    });

    it('renders body tr elements with the expected class', () => {
      expect(subject.find('table tbody tr:eq(0)').hasClass('tr-class')).toBeTruthy();
      expect(subject.find('table tbody tr:eq(1)').hasClass('tr-class')).toBeTruthy();
    });

    it('renders td elements with the expected class and text', () => {
      expect(subject.find('table tbody tr:eq(0) td:eq(0)').hasClass('td-class')).toBeTruthy();
      expect('table tbody tr:eq(0) td:eq(0)'.text()).toBe('row1-value1');
      expect(subject.find('table tbody tr:eq(0) td:eq(1)').hasClass('td-class')).toBeTruthy();
      expect('table tbody tr:eq(0) td:eq(1)'.text()).toBe('row1-value2');
      expect(subject.find('table tbody tr:eq(0) td:eq(2)').hasClass('td-class')).toBeTruthy();
      expect('table tbody tr:eq(0) td:eq(2)'.text()).toBe('name1');

      expect(subject.find('table tbody tr:eq(1) td:eq(0)').hasClass('td-class')).toBeTruthy();
      expect('table tbody tr:eq(1) td:eq(0)'.text()).toBe('row2-value1');
      expect(subject.find('table tbody tr:eq(1) td:eq(1)').hasClass('td-class')).toBeTruthy();
      expect('table tbody tr:eq(1) td:eq(1)'.text()).toBe('row2-value2');
      expect(subject.find('table tbody tr:eq(1) td:eq(2)').hasClass('td-class')).toBeTruthy();
      expect('table tbody tr:eq(1) td:eq(2)'.text()).toBe('');
    });

    it('renders a tfoot element with the expected class', () => {
      expect(subject.find('table tfoot').hasClass('tfoot-class')).toBeTruthy();
    });

    describe('with custom html tags', () => {
      beforeEach(() => subject.setProps({
        tableTag: () => 'div',
        theadTag: () => 'div',
        tbodyTag: () => 'div',
        tfootTag: () => 'div',
        trTag: () => 'div',
        thTag: () => 'div',
        tdTag: () => 'div'
      }));

      it('renders a table div element with the expected classes', () => {
        expect(subject.find('div.table').hasClass('table-class')).toBeTruthy();
      });

      it('renders a thead div element with the expected classes', () => {
        expect('.table > div:eq(0)').toExist('thead-class');
      });

      it('renders a header tr div element with the expected class', () => {
        expect(subject.find('.thead-class > div').hasClass('tr-class')).toBeTruthy();
      });

      it('renders th div elements with the expected class and text', () => {
        expect(subject.find('.thead-class .tr-class div:eq(0)').hasClass('th-class')).toBeTruthy();
        expect('.thead-class .tr-class div:eq(0)'.text()).toBe('attr1');

        expect(subject.find('.thead-class .tr-class div:eq(1)').hasClass('th-class')).toBeTruthy();
        expect('.thead-class .tr-class div:eq(1)'.text()).toBe('Display2');

        expect(subject.find('.thead-class .tr-class div:eq(2)').hasClass('th-class')).toBeTruthy();
        expect('.thead-class .tr-class div:eq(2)'.text()).toBe('attr3.usage.name');
      });

      it('renders a tbody div element with the expected classes', () => {
        expect(subject.find('div.table > div:eq(1)').hasClass('tbody-class')).toBeTruthy();
      });

      it('renders body tr div elements with the expected class', () => {
        expect(subject.find('.tbody-class .tr-class:eq(0)').hasClass('tr-class')).toBeTruthy();
        expect(subject.find('.tbody-class .tr-class:eq(1)').hasClass('tr-class')).toBeTruthy();
      });

      it('renders td div elements with the expected class and text', () => {
        expect(subject.find('.tbody-class .tr-class:eq(0) div:eq(0)').hasClass('td-class')).toBeTruthy();
        expect('.tbody-class .tr-class:eq(0) div:eq(0)'.text()).toBe('row1-value1');
        expect(subject.find('.tbody-class .tr-class:eq(0) div:eq(1)').hasClass('td-class')).toBeTruthy();
        expect('.tbody-class .tr-class:eq(0) div:eq(1)'.text()).toBe('row1-value2');
        expect(subject.find('.tbody-class .tr-class:eq(0) div:eq(2)').hasClass('td-class')).toBeTruthy();
        expect('.tbody-class .tr-class:eq(0) div:eq(2)'.text()).toBe('name1');

        expect(subject.find('.tbody-class .tr-class:eq(1) div:eq(0)').hasClass('td-class')).toBeTruthy();
        expect('.tbody-class .tr-class:eq(1) div:eq(0)'.text()).toBe('row2-value1');
        expect(subject.find('.tbody-class .tr-class:eq(1) div:eq(1)').hasClass('td-class')).toBeTruthy();
        expect('.tbody-class .tr-class:eq(1) div:eq(1)'.text()).toBe('row2-value2');
        expect(subject.find('.tbody-class .tr-class:eq(1) div:eq(2)').hasClass('td-class')).toBeTruthy();
        expect('.tbody-class .tr-class:eq(1) div:eq(2)'.text()).toBe('');
      });

      it('renders a tfoot div element with the expected classes', () => {
        expect(subject.find('div.table > div:eq(2)').hasClass('tfoot-class')).toBeTruthy();
      });
    });

    describe('with opt-out custom html tags', () => {
      beforeEach(() => subject.setProps({
        tableTag: () => null,
        theadTag: () => null,
        tbodyTag: () => null,
        tfootTag: () => null,
        trTag: () => null,
        thTag: () => null,
        tdTag: () => null
      }));

      it('renders a table element with the expected classes', () => {
        expect(subject.find('table').hasClass('table')).toBeTruthy();
        expect(subject.find('table').hasClass('table-class')).toBeTruthy();
      });

      it('renders a thead element with the expected class', () => {
        expect(subject.find('table thead').hasClass('thead-class')).toBeTruthy();
      });

      it('renders a header tr element with the expected class', () => {
        expect(subject.find('table thead tr').hasClass('tr-class')).toBeTruthy();
      });

      it('renders th elements with the expected class and text', () => {
        expect(subject.find('table thead tr th:eq(0)').hasClass('th-class')).toBeTruthy();
        expect('table thead tr th:eq(0)'.text()).toBe('attr1');

        expect(subject.find('table thead tr th:eq(1)').hasClass('th-class')).toBeTruthy();
        expect('table thead tr th:eq(1)'.text()).toBe('Display2');

        expect(subject.find('table thead tr th:eq(2)').hasClass('th-class')).toBeTruthy();
        expect('table thead tr th:eq(2)'.text()).toBe('attr3.usage.name');
      });

      it('renders a tbody element with the expected class', () => {
        expect(subject.find('table tbody').hasClass('tbody-class')).toBeTruthy();
      });

      it('renders body tr elements with the expected class', () => {
        expect(subject.find('table tbody tr:eq(0)').hasClass('tr-class')).toBeTruthy();
        expect(subject.find('table tbody tr:eq(1)').hasClass('tr-class')).toBeTruthy();
      });

      it('renders td elements with the expected class and text', () => {
        expect(subject.find('table tbody tr:eq(0) td:eq(0)').hasClass('td-class')).toBeTruthy();
        expect('table tbody tr:eq(0) td:eq(0)'.text()).toBe('row1-value1');
        expect(subject.find('table tbody tr:eq(0) td:eq(1)').hasClass('td-class')).toBeTruthy();
        expect('table tbody tr:eq(0) td:eq(1)'.text()).toBe('row1-value2');
        expect(subject.find('table tbody tr:eq(0) td:eq(2)').hasClass('td-class')).toBeTruthy();
        expect('table tbody tr:eq(0) td:eq(2)'.text()).toBe('name1');

        expect(subject.find('table tbody tr:eq(1) td:eq(0)').hasClass('td-class')).toBeTruthy();
        expect('table tbody tr:eq(1) td:eq(0)'.text()).toBe('row2-value1');
        expect(subject.find('table tbody tr:eq(1) td:eq(1)').hasClass('td-class')).toBeTruthy();
        expect('table tbody tr:eq(1) td:eq(1)'.text()).toBe('row2-value2');
        expect(subject.find('table tbody tr:eq(1) td:eq(2)').hasClass('td-class')).toBeTruthy();
        expect('table tbody tr:eq(1) td:eq(2)'.text()).toBe('');
      });

      it('renders a tfoot element with the expected class', () => {
        expect(subject.find('table tfoot').hasClass('tfoot-class')).toBeTruthy();
      });
    });
  });

  describe('without columns', () => {
    beforeEach(() => {
      data = [{
        attr1: 'row1-value1', attr2: 'row1-value2', attr3: 'row1-value3'
      }, {
        attr1: 'row2-value1', attr2: 'row2-value2'
      }];

      subject = shallow(<Table {...{
        className: 'some-class-name',
        data, table, thead, tbody, tfoot, tr, th, td
      }}/>);
    });

    it('renders the data keys as column headers', () => {
      expect('table thead tr th:eq(0)'.text()).toBe('attr1');
      expect('table thead tr th:eq(1)'.text()).toBe('attr2');
      expect('table thead tr th:eq(2)'.text()).toBe('attr3');
    });
  });

  describe('with simple columns', () => {
    beforeEach(() => {
      data = [{
        attr1: 'row1-value1', attr2: 'row1-value2', attr3: 'row1-value3'
      }, {
        attr1: 'row2-value1', attr2: 'row2-value2'
      }];

      columns = ['attr3', 'attr1'];

      subject = shallow(<Table {...{
        className: 'some-class-name',
        data, columns, table, thead, tbody, tfoot, tr, th, td
      }}/>);
    });

    it('renders 2 columns', () => {
      expect('table thead tr th').toHaveLength(2);
    });

    it('uses the given strings as the column attributes', () => {
      expect('table thead tr th:eq(0)'.text()).toBe('attr3');
      expect('table thead tr th:eq(1)'.text()).toBe('attr1');
    });
  });
});