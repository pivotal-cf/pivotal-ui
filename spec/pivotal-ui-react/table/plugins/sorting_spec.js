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
    beforeEach(() => {
      const columns = [{
        attribute: 'attr1'
      }, {
        attribute: 'attr2', displayName: 'Display2'
      }];

      ReactDOM.render(<ComposedTable {...{columns, data, className: 'sorting-table'}}/>, root);
    });

    it('renders', () => {
      expect('.sorting-table').toExist();
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