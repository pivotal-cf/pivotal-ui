import '../../spec_helper';
import {Table, withCellClassName} from '../../../../src/react/table';

describe('withCellClassName', () => {
  let className;

  beforeEach(() => {
    className = jest.fn()
      .and.callFake(rowDatum => `class-${rowDatum.attr1}-${rowDatum.attr2}`);
    const columns = [{
      attribute: 'attr1', className: 'class-attr1'
    }, {
      attribute: 'attr2', className, displayName: 'Display2'
    }];
    const data = [{
      attr1: 'row1-value1', attr2: 'row1-value2'
    }, {
      attr1: 'row2-value1', attr2: 'row2-value2'
    }];

    const ComposedTable = withCellClassName(Table);
    subject = shallow(<ComposedTable {...{columns, data}}/>);
  });

  it('renders th elements with class name', () => {
    expect(subject.find('table tr:eq(0) th:eq(0)').hasClass('class-attr1')).toBeTruthy();
    expect(subject.find('table tr:eq(0) th:eq(1)').hasClass('class-undefined-undefined')).toBeTruthy();
  });

  it('renders td elements with class name', () => {
    expect(subject.find('table tr:eq(1) td:eq(0)').hasClass('class-attr1')).toBeTruthy();
    expect(subject.find('table tr:eq(1) td:eq(1)').hasClass('class-row1-value1-row1-value2')).toBeTruthy();
    expect(subject.find('table tr:eq(2) td:eq(0)').hasClass('class-attr1')).toBeTruthy();
    expect(subject.find('table tr:eq(2) td:eq(1)').hasClass('class-row2-value1-row2-value2')).toBeTruthy();
  });
});