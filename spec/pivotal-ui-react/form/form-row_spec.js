import '../spec_helper';
import {FormRow, FormCol} from '../../../src/react/forms';
import {Grid} from '../../../src/react/flex-grids';

describe('FormRow', () => {
  let subject, field1, field2;

  beforeEach(() => {
    spyOnRender(FormCol).and.callThrough();

    field1 = () => <div>hello</div>;
    field2 = () => <span>test</span>;

    subject = ReactDOM.render(<FormRow>
      <FormCol {...{children: field1}} />
      <FormCol {...{children: field2}} />
    </FormRow>, root);
  });

  it('renders a grid containing the children', () => {
    expect('#root > .grid .col').toHaveLength(2);
    expect('#root > .grid .col:eq(0)').toHaveText('hello');
    expect('#root > .grid .col:eq(1)').toHaveText('test');
  });

  describe('when given a wrapper', () => {
    beforeEach(() => {
      subject::setProps({wrapper: () => <div className="wrapper"/>});
    });

    it('wraps its children in the wrapper', () => {
      expect('#root > .grid .col').not.toExist();
      expect('#root > .wrapper .grid .col').toHaveLength(2);
      expect('#root > .wrapper .grid .col:eq(0)').toHaveText('hello');
      expect('#root > .wrapper .grid .col:eq(1)').toHaveText('test');
    });
  });

  describe('when given a class name and an ID', () => {
    beforeEach(() => {
      spyOnRender(Grid).and.callThrough();
      subject::setProps({className: 'my-form-row', id: 'my-form-row-id'});
    });

    it('puts the class name and the ID on the inner form row grid', () => {
      expect(Grid).toHaveBeenRenderedWithProps({
        className: 'my-form-row form-row',
        id: 'my-form-row-id',
        gutter: true,
        children: jasmine.any(Object)
      });
    });
  });
});