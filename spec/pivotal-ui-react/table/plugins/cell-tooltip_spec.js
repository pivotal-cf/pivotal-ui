import '../../spec_helper';
import {Table, withCellTooltip} from '../../../../src/react/table';

describe('withCellTooltip', () => {
  let tooltip, data;

  beforeEach(() => {
    tooltip = jasmine.createSpy('tooltip').and.callFake(({isHeader}) => {
      return {
        text: `is header? ${isHeader}`,
        size: isHeader ? 'md' : undefined,
        theme: isHeader ? 'light' : 'dark',
        showIcon: isHeader
      };
    });
    const columns = [{
      attribute: 'attr1', tooltip
    }, {
      attribute: 'attr2', displayName: 'Display2'
    }];
    data = [{
      attr1: 'row1-value1', attr2: 'row1-value2'
    }, {
      attr1: 'row2-value1', attr2: 'row2-value2'
    }];

    const ComposedTable = withCellTooltip(Table);
    ReactDOM.render(<ComposedTable {...{columns, data}}/>, root);
  });

  it('calls tooltip callback for header and body cells', () => {
    expect(tooltip).toHaveBeenCalledWith({isHeader: true}, undefined);
    expect(tooltip).toHaveBeenCalledWith({isHeader: false}, data[0]);
    expect(tooltip).toHaveBeenCalledWith({isHeader: false}, data[1]);
  });

  it('does not render a tooltip', () => {
    expect('.pui-tooltip').not.toExist();
  });

  it('renders an Icon for the first header', () => {
    expect('th:eq(0) svg').toHaveClass('icon-info_outline');
  });

  it('does not render an Icon for the second header or any body cells', () => {
    expect('th:eq(1) svg').not.toExist();
    expect('tr:eq(1) td:eq(0) svg').not.toExist();
    expect('tr:eq(2) td:eq(1) svg').not.toExist();
    expect('tr:eq(3) td:eq(0) svg').not.toExist();
    expect('tr:eq(4) td:eq(1) svg').not.toExist();
  });

  describe('when hovering the first header', () => {
    beforeEach(() => {
      $('th:eq(0) .overlay-trigger').simulate('mouseOver');
    });

    afterEach(() => {
      $('th:eq(0) .overlay-trigger').simulate('mouseOut');
    });

    it('renders a tooltip', () => {
      expect('.pui-tooltip').toHaveText('is header? true');
    });
  });

  describe('when hovering the first body row first column', () => {
    beforeEach(() => {
      $('tr:eq(1) td:eq(0) .overlay-trigger').simulate('mouseOver');
    });

    afterEach(() => {
      $('tr:eq(1) td:eq(0) .overlay-trigger').simulate('mouseOut');
    });

    it('renders a tooltip', () => {
      expect('.pui-tooltip').toHaveText('is header? false');
    });
  });
});