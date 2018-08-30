import '../../spec_helper';
import {Table, withFlex, withCellLink} from '../../../../src/react/table';

describe('withCellLink', () => {
  let link, subject;

  beforeEach(() => {
    link = jest.fn().mockName('link').mockReturnValue('some-href');
    const columns = [{
      attribute: 'attr1'
    }, {
      attribute: 'attr2', link, displayName: 'Display2'
    }];
    const data = [{
      attr1: 'row1-value1', attr2: 'row1-value2'
    }, {
      attr1: 'row2-value1', attr2: 'row2-value2'
    }];

    const ComposedTable = withCellLink(withFlex(Table));
    subject = shallow(<ComposedTable {...{columns, data}}/>);
  });

  it('renders div.th elements without href', () => {
    expect(subject.find('.table .tr').at(0).find('> div.th').at(0).prop('href')).toBeFalsy();
    expect(subject.find('.table .tr').at(0).find('> div.th').at(1).prop('href')).toBeFalsy();
  });

  it('renders a.td elements with href', () => {
    expect(subject.find('.table .tr').at(1).find('> a.td').prop('href')).toBe('some-href');
    expect(subject.find('.table .tr').at(2).find('> a.td').prop('href')).toBe('some-href');
  });

  it('renders div.td elements without href', () => {
    expect(subject.find('.table .tr').at(1).find('> div.td').prop('href')).toBeFalsy();
    expect(subject.find('.table .tr').at(2).find('> div.td').prop('href')).toBeFalsy();
  });
});