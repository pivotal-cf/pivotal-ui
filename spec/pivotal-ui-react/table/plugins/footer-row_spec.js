import '../../spec_helper';
import {Table, withFooterRow} from '../../../../src/react/table';

describe('withFooterRow', () => {
  let footerRowText;

  beforeEach(() => {
    const columns = [{
      attribute: 'attr1'
    }, {
      attribute: 'attr2', displayName: 'Display2'
    }];
    const data = [{
      attr1: 'row1-value1', attr2: 'row1-value2'
    }, {
      attr1: 'row2-value1', attr2: 'row2-value2'
    }];

    footerRowText = 'some-footer-row-text';
    const footerRow = (<tr className="footer-row">
      <td colSpan={2}>{footerRowText}</td>
    </tr>);

    const ComposedTable = withFooterRow(Table);
    subject = shallow(<ComposedTable {...{columns, data, footerRow}}/>);
  });

  it('renders footerRow', () => {
    expect(subject.find('tfoot tr.footer-row').text()).toBe(footerRowText);
  });
});