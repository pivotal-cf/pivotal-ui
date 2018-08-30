import '../../spec_helper';
import {Table, withCellRenderer} from '../../../../src/react/table';

describe('withCellRenderer', () => {
  let renderer1, renderer2, data, subject;

  beforeEach(() => {
    spyOn(console, 'warn');

    renderer1 = jest.fn().mockName('renderer1').mockImplementation(({attr1}) => <span>{attr1.toUpperCase()}</span>);
    renderer2 = jest.fn().mockName('renderer2').mockImplementation(({attr2}) => <span>{attr2.toUpperCase()}</span>);
    const columns = [{
      attribute: 'attr1', CellRenderer: renderer1
    }, {
      attribute: 'attr2', CellRenderer: renderer2, displayName: 'Display2'
    }];
    data = [{
      attr1: 'row1-value1', attr2: 'row1-value2'
    }, {
      attr1: 'row2-value1', attr2: 'row2-value2'
    }];

    const ComposedTable = withCellRenderer(Table);
    subject = shallow(<ComposedTable {...{columns, data}}/>);
  });

  it('renders td elements with expected text', () => {
    expect(subject.find('table tbody tr').at(0).find('td').at(0).text()).toBe(data[0].attr1.toUpperCase());
    expect(subject.find('table tbody tr').at(1).find('td').at(0).text()).toBe(data[1].attr1.toUpperCase());

    expect(subject.find('table tbody tr').at(0).find('td').at(1).text()).toBe(data[0].attr2.toUpperCase());
    expect(subject.find('table tbody tr').at(1).find('td').at(1).text()).toBe(data[1].attr2.toUpperCase());
  });
});