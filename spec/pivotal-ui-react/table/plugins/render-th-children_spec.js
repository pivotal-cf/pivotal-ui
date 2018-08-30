import '../../spec_helper';
import {Table, withRenderThChildren} from '../../../../src/react/table';

describe('withRenderThChildren', () => {
  let data, subject;

  beforeEach(() => {
    const columns = [
      {attribute: 'attr1', renderThChildren: () => (<div className="custom">some header</div>)},
      {attribute: 'attr2', displayName: 'Attr2'}
    ];

    data = [{
      attr1: 'row1-value1',
      attr2: 'row1-value2'
    }];

    const ComposedTable = withRenderThChildren(Table);
    subject = shallow(<ComposedTable {...{columns, data}}/>);
  });

  it('renders the correct header', () => {
    expect(subject.find('table thead th').at(0).find('.custom').text()).toBe('some header');
    expect(subject.find('table thead th').at(1).text()).toBe('Attr2');
  });
});
