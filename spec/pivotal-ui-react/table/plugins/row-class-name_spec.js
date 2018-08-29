import '../../spec_helper';
import {Table, withRowClassName} from '../../../../src/react/table';
import classnames from 'classnames';

describe('withRowClassName', () => {
  let rowClassName, data;

  beforeEach(() => {
    const columns = [{
      attribute: 'attr1', className: 'class-attr1'
    }, {
      attribute: 'attr2', className: 'class-attr2', displayName: 'Display2'
    }];
    data = [{
      attr1: 'row1-value1', attr2: 'row1-value2'
    }, {
      attr1: 'row2-value1', attr2: 'row2-value2'
    }];
    rowClassName = jest.fn();
    rowClassName.and.callFake(({isHeader}) => classnames({isHeader, isBody: !isHeader}));

    const ComposedTable = withRowClassName(Table);
    subject = shallow(<ComposedTable {...{columns, data, rowClassName}}/>);
  });

  it('calls rowClassName', () => {
    expect(rowClassName).toHaveBeenCalledWith({isHeader: true, rowIndex: -1});
    expect(rowClassName).toHaveBeenCalledWith({isHeader: false, rowDatum: data[0], rowIndex: 0});
    expect(rowClassName).toHaveBeenCalledWith({isHeader: false, rowDatum: data[1], rowIndex: 1});
  });

  it('renders header row with isHeader class name', () => {
    expect(subject.find('table thead tr').hasClass('isHeader')).toBeTruthy();
    expect(subject.find('table thead tr').hasClass('isBody')).toBeFalsy();
  });

  it('renders body rows with isBody class name', () => {
    expect(subject.find('table tbody tr:eq(0)').hasClass('isBody')).toBeTruthy();
    expect(subject.find('table tbody tr:eq(0)').hasClass('isHeader')).toBeFalsy();

    expect(subject.find('table tbody tr:eq(1)').hasClass('isBody')).toBeTruthy();
    expect(subject.find('table tbody tr:eq(1)').hasClass('isHeader')).toBeFalsy();
  });
});