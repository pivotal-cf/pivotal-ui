import '../../spec_helper';
import {Table, withSorting} from '../../../../src/react/table';

describe('withSorting', () => {
  let data, ComposedTable, subject;
  beforeEach(() => {
    data = [{
      attr1: 'row1-value1', attr2: 'row1-value2'
    }, {
      attr1: 'row2-value1', attr2: 'row2-value2'
    }];
    ComposedTable = withSorting(Table);
  });

  describe('with columns', () => {
    let subject;

    beforeEach(() => {
      const columns = [{
        attribute: 'attr1', sortable: true
      }, {
        attribute: 'attr2', displayName: 'Display2'
      }];

      subject = shallow(<ComposedTable {...{columns, data, className: 'sorting-table'}}/>);
    });

    it('renders', () => {
      expect(subject.find('.sorting-table').exists()).toBeTruthy();
    });

    describe('when sorted in descending order', () => {
      beforeEach(() => {
        subject.find('.sortable').at(0).simulate('click');
      });

      it('sorts in descending order', () => {
        expect(subject.find('.sortable').at(0).hasClass('sorted-desc')).toBeTruthy();
      });

      describe('when new data is added', () => {
        beforeEach(() => {
          data.push({
            attr1: 'row3-value1', attr2: 'row3-value2'
          });
          subject.setProps({data});
        });

        it('retains the sort order', () => {
          expect(subject.find('.sortable').at(0).hasClass('sorted-desc')).toBeTruthy();
          expect(subject.find('tbody tr').at(0).find('td').at(0).text()).toBe('row3-value1');
        });
      });
    });
  });

  describe('without columns', () => {
    beforeEach(() => {
      subject = shallow(<ComposedTable {...{data, className: 'sorting-table'}}/>);
    });

    it('renders', () => {
      expect(subject.find('.sorting-table').exists()).toBeTruthy();
    });
  });
});