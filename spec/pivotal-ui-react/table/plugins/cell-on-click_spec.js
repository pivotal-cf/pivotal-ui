import '../../spec_helper';
import {Table, withCellOnClick} from '../../../../src/react/table';

describe('withCellOnClick', () => {
  let onClick, data, subject;

  beforeEach(() => {
    onClick = jest.fn().mockName('onClick');
    const columns = [{
      attribute: 'attr1',
      onClick
    }];
    data = [{attr1: 'my value'}];

    const ComposedTable = withCellOnClick(Table);
    subject = shallow(<ComposedTable {...{columns, data}}/>);
  });

  it('calls the onClick callback', () => {
    subject.find('table tr').at(1).find('td').at(0).simulate('click');
    expect(onClick).toHaveBeenCalledWith(expect.any(Object), data[0]);
  });
});