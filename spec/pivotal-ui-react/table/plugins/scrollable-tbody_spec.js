import '../../spec_helper';
import {Table} from '../../../../src/react/table';
import {withScrollableTbody} from '../../../../src/react/table/plugins/scrollable-tbody';

describe('withScrollableTbody', () => {
  let data, columns, ComposedTable, subject;

  beforeEach(() => {
    columns = [{
      attribute: 'attr1',
    }];
    data = [{attr1: 'my value'}];
    ComposedTable = withScrollableTbody(Table);
  });

  describe('when "scrollable" prop is falsy', () => {
    beforeEach(() => {
      subject = shallow(<ComposedTable {...{
        columns,
        data,
        tbodyHeight: '70vh',
      }}/>);
    });

    it('does not apply the "scrollable-body" class to tbody', () => {
      expect(subject.find('table tbody').hasClass('scrollable-body')).toBeFalsy();
    });

    it('does not set the height of the tbody with the given prop', () => {
      expect(subject.find('table tbody').prop('style')).toEqual({});
    });
  });

  describe('when "scrollable" prop is true', () => {
    beforeEach(() => {
      subject = shallow(<ComposedTable {...{
        columns,
        data,
        tbodyHeight: '70vh',
        scrollable: true
      }}/>);
    });

    it('applies the "scrollable-body" class to tbody', () => {
      expect(subject.find('table tbody').hasClass('scrollable-body')).toBeTruthy();
    });

    it('sets the height of the tbody with the given prop', () => {
      expect(subject.find('table tbody').prop('style')).toEqual({height: '70vh'});
    });
  });
});