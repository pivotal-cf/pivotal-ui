import '../../spec_helper';
import {Table, withCellWidth} from '../../../../src/react/table';

describe('withCellWidth', () => {
  let subject;
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
    expect(subject.find('table tr').at(0).find('th').at(0).hasClass('col-fixed')).toBeTruthy();
    expect(subject.find('table tr').at(0).find('th').at(1).hasClass('col-fixed')).toBeTruthy();
  });

  it('renders th elements with width style', () => {
    expect(subject.find('table tr').at(0).find('th').at(0).prop('style')).toEqual({width: '100px'});
    expect(subject.find('table tr').at(0).find('th').at(1).prop('style')).toEqual({width: '200px'});
  });

  it('renders td elements with col-fixed class', () => {
    expect(subject.find('table tr').at(1).find('td').at(0).hasClass('col-fixed')).toBeTruthy();
    expect(subject.find('table tr').at(1).find('td').at(1).hasClass('col-fixed')).toBeTruthy();

    expect(subject.find('table tr').at(2).find('td').at(0).hasClass('col-fixed')).toBeTruthy();
    expect(subject.find('table tr').at(2).find('td').at(1).hasClass('col-fixed')).toBeTruthy();
  });

  it('renders td elements with width style', () => {
    expect(subject.find('table tr').at(1).find('td').at(0).prop('style')).toEqual({width: '100px'});
    expect(subject.find('table tr').at(1).find('td').at(1).prop('style')).toEqual({width: '200px'});

    expect(subject.find('table tr').at(2).find('td').at(0).prop('style')).toEqual({width: '100px'});
    expect(subject.find('table tr').at(2).find('td').at(1).prop('style')).toEqual({width: '200px'});
  });
});