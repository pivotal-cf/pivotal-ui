import '../../spec_helper';
import {Table, withCellWidth} from '../../../../src/react/table';

describe('withCellWidth', () => {
  beforeEach(() => {
    const columns = [{
      attribute: 'attr1', width: '100px'
    }, {
      attribute: 'attr2', width: '200px', displayName: 'Display2'
    }];
    const data = [{
      attr1: 'row1-value1', attr2: 'row1-value2'
    }, {
      attr1: 'row2-value1', attr2: 'row2-value2'
    }];

    const ComposedTable = withCellWidth(Table);
    subject = shallow(<ComposedTable {...{columns, data}}/>);
  });

  it('renders th elements with col-fixed class', () => {
    expect(subject.find('table tr:eq(0) th:eq(0)').hasClass('col-fixed')).toBeTruthy();
    expect(subject.find('table tr:eq(0) th:eq(1)').hasClass('col-fixed')).toBeTruthy();
  });

  it('renders th elements with width style', () => {
    expect(subject.find('table tr:eq(0) th:eq(0)').prop('style')).toEqual({width: '100px'});
    expect('table tr:eq(0) th:eq(1)').toHaveStyle({width: '200px'});
  });

  it('renders td elements with col-fixed class', () => {
    expect(subject.find('table tr:eq(1) td:eq(0)').hasClass('col-fixed')).toBeTruthy();
    expect(subject.find('table tr:eq(1) td:eq(1)').hasClass('col-fixed')).toBeTruthy();

    expect(subject.find('table tr:eq(2) td:eq(0)').hasClass('col-fixed')).toBeTruthy();
    expect(subject.find('table tr:eq(2) td:eq(1)').hasClass('col-fixed')).toBeTruthy();
  });

  it('renders td elements with width style', () => {
    expect(subject.find('table tr:eq(1) td:eq(0)').prop('style')).toEqual({width: '100px'});
    expect('table tr:eq(1) td:eq(1)').toHaveStyle({width: '200px'});

    expect('table tr:eq(2) td:eq(0)').toHaveStyle({width: '100px'});
    expect('table tr:eq(2) td:eq(1)').toHaveStyle({width: '200px'});
  });
});