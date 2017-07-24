import '../spec_helper';
import {TableCell} from 'pui-react-table';

describe('TableCell', () => {
  beforeEach(() => {
    ReactDOM.render((
      <table>
        <tbody>
        <tr>
          <TableCell {...{cellClass: 'some-class-name'}}>some-content</TableCell>
        </tr>
        </tbody>
      </table>
    ), root);
  });

  it('renders td with className', () => {
    expect('td').toHaveClass('some-class-name');
  });
});