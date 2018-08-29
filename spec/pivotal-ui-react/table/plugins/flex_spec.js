import '../../spec_helper';
import {Table, withFlex} from '../../../../src/react/table';

describe('withFlex', () => {
  describe('without tag overrides', () => {
    beforeEach(() => {
      const columns = [{
        attribute: 'attr1'
      }, {
        attribute: 'attr2', displayName: 'Display2'
      }];
      const data = [{
        attr1: 'row1-value1', attr2: 'row1-value2'
      }, {
        attr1: 'row2-value1', attr2: 'row2-value2'
      }];

      const ComposedTable = withFlex(Table);
      subject = shallow(<ComposedTable {...{columns, data}}/>);
    });

    it('renders a div.table element', () => {
      expect(subject.find('div.table').exists()).toBeTruthy();
    });

    it('renders a div.thead element', () => {
      expect(subject.find('.table > div:eq(0)').hasClass('thead')).toBeTruthy();
    });

    it('renders a div.tr header row', () => {
      expect(subject.find('.table .thead > div').hasClass('tr')).toBeTruthy();
    });

    it('renders div.th header cells', () => {
      expect(subject.find('.table .thead .tr > div:eq(0)').hasClass('th')).toBeTruthy();
      expect(subject.find('.table .thead .tr > div:eq(1)').hasClass('th')).toBeTruthy();
    });

    it('renders a div.tbody element', () => {
      expect(subject.find('div.table > div:eq(1)').hasClass('tbody')).toBeTruthy();
    });

    it('renders div.tr body rows', () => {
      expect(subject.find('.table .tbody > div:eq(0)').hasClass('tr')).toBeTruthy();
      expect(subject.find('.table .tbody > div:eq(1)').hasClass('tr')).toBeTruthy();
    });

    it('renders div.td body cells', () => {
      expect(subject.find('.table .tbody .tr:eq(0) > div:eq(0)').hasClass('td')).toBeTruthy();
      expect(subject.find('.table .tbody .tr:eq(0) > div:eq(1)').hasClass('td')).toBeTruthy();

      expect(subject.find('.table .tbody .tr:eq(0) > div:eq(0)').hasClass('td')).toBeTruthy();
      expect(subject.find('.table .tbody .tr:eq(0) > div:eq(1)').hasClass('td')).toBeTruthy();
    });

    it('renders all tr rows as grids', () => {
      expect(subject.find('.table .thead .tr').hasClass('grid')).toBeTruthy();
      expect(subject.find('.table .tbody .tr:eq(0)').hasClass('grid')).toBeTruthy();
      expect(subject.find('.table .tbody .tr:eq(0)').hasClass('grid')).toBeTruthy();
    });

    it('renders all th cells as cols', () => {
      expect(subject.find('.table .thead .tr .th:eq(0)').hasClass('col')).toBeTruthy();
      expect(subject.find('.table .thead .tr .th:eq(1)').hasClass('col')).toBeTruthy();
    });

    it('renders all td cells as cols', () => {
      expect(subject.find('.table .tbody .tr:eq(0) .td:eq(0)').hasClass('col')).toBeTruthy();
      expect(subject.find('.table .tbody .tr:eq(0) .td:eq(1)').hasClass('col')).toBeTruthy();

      expect(subject.find('.table .tbody .tr:eq(1) .td:eq(0)').hasClass('col')).toBeTruthy();
      expect(subject.find('.table .tbody .tr:eq(1) .td:eq(1)').hasClass('col')).toBeTruthy();
    });

    it('renders a div.tfoot element', () => {
      expect(subject.find('.table > div:eq(2)').hasClass('tfoot')).toBeTruthy();
    });
  });

  describe('with tag overrides', () => {
    beforeEach(() => {
      const columns = [{
        attribute: 'attr1'
      }, {
        attribute: 'attr2', displayName: 'Display2'
      }];
      const data = [{
        attr1: 'row1-value1', attr2: 'row1-value2'
      }, {
        attr1: 'row2-value1', attr2: 'row2-value2'
      }];

      const ComposedTable = withFlex(Table);
      subject = shallow(<ComposedTable {...{
        columns,
        data,
        tableTag: () => 'span',
        theadTag: () => 'span',
        tbodyTag: () => 'span',
        tfootTag: () => 'span',
        trTag: () => 'span',
        thTag: () => 'span',
        tdTag: () => 'span'
      }}/>);
    });

    it('renders a span.table element', () => {
      expect(subject.find('span.table').exists()).toBeTruthy();
    });

    it('renders a span.thead element', () => {
      expect(subject.find('.table > span:eq(0)').hasClass('thead')).toBeTruthy();
    });

    it('renders a span.tr header row', () => {
      expect(subject.find('.table .thead > span').hasClass('tr')).toBeTruthy();
    });

    it('renders span.th header cells', () => {
      expect(subject.find('.table .thead .tr > span:eq(0)').hasClass('th')).toBeTruthy();
      expect(subject.find('.table .thead .tr > span:eq(1)').hasClass('th')).toBeTruthy();
    });

    it('renders a span.tbody element', () => {
      expect(subject.find('span.table > span:eq(1)').hasClass('tbody')).toBeTruthy();
    });

    it('renders span.tr body rows', () => {
      expect(subject.find('.table .tbody > span:eq(0)').hasClass('tr')).toBeTruthy();
      expect(subject.find('.table .tbody > span:eq(1)').hasClass('tr')).toBeTruthy();
    });

    it('renders span.td body cells', () => {
      expect(subject.find('.table .tbody .tr:eq(0) > span:eq(0)').hasClass('td')).toBeTruthy();
      expect(subject.find('.table .tbody .tr:eq(0) > span:eq(1)').hasClass('td')).toBeTruthy();

      expect(subject.find('.table .tbody .tr:eq(0) > span:eq(0)').hasClass('td')).toBeTruthy();
      expect(subject.find('.table .tbody .tr:eq(0) > span:eq(1)').hasClass('td')).toBeTruthy();
    });

    it('renders all tr rows as grids', () => {
      expect(subject.find('.table .thead .tr').hasClass('grid')).toBeTruthy();
      expect(subject.find('.table .tbody .tr:eq(0)').hasClass('grid')).toBeTruthy();
      expect(subject.find('.table .tbody .tr:eq(0)').hasClass('grid')).toBeTruthy();
    });

    it('renders all th cells as cols', () => {
      expect(subject.find('.table .thead .tr .th:eq(0)').hasClass('col')).toBeTruthy();
      expect(subject.find('.table .thead .tr .th:eq(1)').hasClass('col')).toBeTruthy();
    });

    it('renders all td cells as cols', () => {
      expect(subject.find('.table .tbody .tr:eq(0) .td:eq(0)').hasClass('col')).toBeTruthy();
      expect(subject.find('.table .tbody .tr:eq(0) .td:eq(1)').hasClass('col')).toBeTruthy();

      expect(subject.find('.table .tbody .tr:eq(1) .td:eq(0)').hasClass('col')).toBeTruthy();
      expect(subject.find('.table .tbody .tr:eq(1) .td:eq(1)').hasClass('col')).toBeTruthy();
    });

    it('renders a span.tfoot element', () => {
      expect(subject.find('.table > span:eq(2)').hasClass('tfoot')).toBeTruthy();
    });
  });
});