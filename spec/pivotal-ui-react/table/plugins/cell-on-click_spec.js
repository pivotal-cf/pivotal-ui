import '../../spec_helper';
import {Table, withCellOnClick} from '../../../../src/react/table';

describe('withCellOnClick', () => {
  let onClick, data;

  beforeEach(() => {
    onClick = jest.fn();
    const columns = [{
      attribute: 'attr1',
      onClick
    }];
    data = [{attr1: 'my value'}];

    const ComposedTable = withCellOnClick(Table);
    subject = shallow(<ComposedTable {...{columns, data}}/>);
  });

  it('calls the onClick callback', () => {
    $('table tr:eq(1) td:eq(0)').simulate('click');
    expect(onClick).toHaveBeenCalledWith(jasmine.any(Object), data[0]);
  });
});