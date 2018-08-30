import '../../spec_helper';
import {Table, withFlex} from '../../../../src/react/table';

describe('withFlex', () => {
  let subject;
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
      expect(subject.find('.table > div').at(0).hasClass('thead')).toBeTruthy();
    });

    it('renders a div.tr header row', () => {
      expect(subject.find('.table .thead > div').hasClass('tr')).toBeTruthy();
    });

    it('renders div.th header cells', () => {
      expect(subject.find('.table .thead .tr > div').at(0).hasClass('th')).toBeTruthy();
      expect(subject.find('.table .thead .tr > div').at(1).hasClass('th')).toBeTruthy();
    });

    it('renders a div.tbody element', () => {
      expect(subject.find('div.table > div').at(1).hasClass('tbody')).toBeTruthy();
    });

    it('renders div.tr body rows', () => {
      expect(subject.find('.table .tbody > div').at(0).hasClass('tr')).toBeTruthy();
      expect(subject.find('.table .tbody > div').at(1).hasClass('tr')).toBeTruthy();
    });

    it('renders div.td body cells', () => {
      expect(subject.find('.table .tbody .tr').at(0).find('> div').at(0).hasClass('td')).toBeTruthy();
      expect(subject.find('.table .tbody .tr').at(0).find('> div').at(1).hasClass('td')).toBeTruthy();

      expect(subject.find('.table .tbody .tr').at(0).find('> div').at(0).hasClass('td')).toBeTruthy();
      expect(subject.find('.table .tbody .tr').at(0).find('> div').at(1).hasClass('td')).toBeTruthy();
    });

    it('renders all tr rows as grids', () => {
      expect(subject.find('.table .thead .tr').hasClass('grid')).toBeTruthy();
      expect(subject.find('.table .tbody .tr').at(0).hasClass('grid')).toBeTruthy();
      expect(subject.find('.table .tbody .tr').at(0).hasClass('grid')).toBeTruthy();
    });

    it('renders all th cells as cols', () => {
      expect(subject.find('.table .thead .tr .th').at(0).hasClass('col')).toBeTruthy();
      expect(subject.find('.table .thead .tr .th').at(1).hasClass('col')).toBeTruthy();
    });

    it('renders all td cells as cols', () => {
      expect(subject.find('.table .tbody .tr').at(0).find('.td').at(0).hasClass('col')).toBeTruthy();
      expect(subject.find('.table .tbody .tr').at(0).find('.td').at(1).hasClass('col')).toBeTruthy();

      expect(subject.find('.table .tbody .tr').at(1).find('.td').at(0).hasClass('col')).toBeTruthy();
      expect(subject.find('.table .tbody .tr').at(1).find('.td').at(1).hasClass('col')).toBeTruthy();
    });

    it('renders a div.tfoot element', () => {
      expect(subject.find('.table > div').at(2).hasClass('tfoot')).toBeTruthy();
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
      expect(subject.find('.table > span').at(0).hasClass('thead')).toBeTruthy();
    });

    it('renders a span.tr header row', () => {
      expect(subject.find('.table .thead > span').hasClass('tr')).toBeTruthy();
    });

    it('renders span.th header cells', () => {
      expect(subject.find('.table .thead .tr > span').at(0).hasClass('th')).toBeTruthy();
      expect(subject.find('.table .thead .tr > span').at(1).hasClass('th')).toBeTruthy();
    });

    it('renders a span.tbody element', () => {
      expect(subject.find('span.table > span').at(1).hasClass('tbody')).toBeTruthy();
    });

    it('renders span.tr body rows', () => {
      expect(subject.find('.table .tbody > span').at(0).hasClass('tr')).toBeTruthy();
      expect(subject.find('.table .tbody > span').at(1).hasClass('tr')).toBeTruthy();
    });

    it('renders span.td body cells', () => {
      expect(subject.find('.table .tbody .tr').at(0).find('> span').at(0).hasClass('td')).toBeTruthy();
      expect(subject.find('.table .tbody .tr').at(0).find('> span').at(1).hasClass('td')).toBeTruthy();

      expect(subject.find('.table .tbody .tr').at(0).find('> span').at(0).hasClass('td')).toBeTruthy();
      expect(subject.find('.table .tbody .tr').at(0).find('> span').at(1).hasClass('td')).toBeTruthy();
    });

    it('renders all tr rows as grids', () => {
      expect(subject.find('.table .thead .tr').hasClass('grid')).toBeTruthy();
      expect(subject.find('.table .tbody .tr').at(0).hasClass('grid')).toBeTruthy();
      expect(subject.find('.table .tbody .tr').at(0).hasClass('grid')).toBeTruthy();
    });

    it('renders all th cells as cols', () => {
      expect(subject.find('.table .thead .tr .th').at(0).hasClass('col')).toBeTruthy();
      expect(subject.find('.table .thead .tr .th').at(1).hasClass('col')).toBeTruthy();
    });

    it('renders all td cells as cols', () => {
      expect(subject.find('.table .tbody .tr').at(0).find('.td').at(0).hasClass('col')).toBeTruthy();
      expect(subject.find('.table .tbody .tr').at(0).find('.td').at(1).hasClass('col')).toBeTruthy();

      expect(subject.find('.table .tbody .tr').at(1).find('.td').at(0).hasClass('col')).toBeTruthy();
      expect(subject.find('.table .tbody .tr').at(1).find('.td').at(1).hasClass('col')).toBeTruthy();
    });

    it('renders a span.tfoot element', () => {
      expect(subject.find('.table > span').at(2).hasClass('tfoot')).toBeTruthy();
    });
  });
});