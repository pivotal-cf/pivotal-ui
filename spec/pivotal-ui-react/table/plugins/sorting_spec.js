import '../../spec_helper';
import {Table, withSorting} from '../../../../src/react/table';

describe('withSorting', () => {
  let data, ComposedTable;
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

      subject = ReactDOM.render(<ComposedTable {...{columns, data, className: 'sorting-table'}}/>, root);
    });

    it('renders', () => {
      expect('.sorting-table').toExist();
    });

    describe('when sorted in descending order', () => {
      beforeEach(() => {
        $('.sortable:eq(0)').click();
      });

      it('sorts in descending order', () => {
        expect('.sortable:eq(0)').toHaveClass('sorted-desc');
      });

      describe('when new data is added', () => {
        beforeEach(() => {
          data.push({
            attr1: 'row3-value1', attr2: 'row3-value2'
          });
          subject::setProps({data});
        });

        it('retains the sort order', () => {
          expect('.sortable:eq(0)').toHaveClass('sorted-desc');
          expect('tbody tr:eq(0) td:eq(0)').toHaveText('row3-value1');
        });
      });
    });
  });

  describe('without columns', () => {
    beforeEach(() => {
      ReactDOM.render(<ComposedTable {...{data, className: 'sorting-table'}}/>, root);
    });

    it('renders', () => {
      expect('.sorting-table').toExist();
    });
  });
});