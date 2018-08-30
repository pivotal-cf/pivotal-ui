import '../../spec_helper';
import PropTypes from 'prop-types';
import {Table, withRenderTdChildren} from '../../../../src/react/table';

describe('withRenderTdChildren', () => {
  let data, renderToUpper, renderToLower, componentConstructed, subject;

  beforeEach(() => {
    componentConstructed = jest.fn().mockName('componentConstructed');
    renderToUpper = jest.fn().mockName('renderToUpper').mockImplementation(({attr1}) => <span>{attr1.toUpperCase()}</span>);
    renderToLower = jest.fn().mockName('renderToLower').mockImplementation(({attr2}) => <span>{attr2.toLowerCase()}</span>);

    class TestComponent extends React.Component {
      static propTypes = {
        value: PropTypes.string
      };

      constructor(props) {
        super(props);
        componentConstructed();
      }

      render() {
        const {value} = this.props;
        return <span>{value}</span>;
      }
    }

    const columns = [
      {attribute: 'attr1', renderTdChildren: renderToUpper},
      {attribute: 'attr2', renderTdChildren: renderToLower},
      {attribute: 'attr3', renderTdChildren: () => <TestComponent {...{value: 'test'}}/>}
    ];

    data = [{
      attr1: 'rOw1-VAlUe1',
      attr2: 'rOw1-vALUE2'
    }];

    const ComposedTable = withRenderTdChildren(Table);
    subject = shallow(<ComposedTable {...{columns, data}}/>);
  });

  it('renders the result of the renderTdChildren call', () => {
    expect(subject.find('table tr').at(1).find('td').at(0).text()).toBe(data[0].attr1.toUpperCase());
    expect(subject.find('table tr').at(1).find('td').at(1).text()).toBe(data[0].attr2.toLowerCase());
    expect(subject.find('table tr').at(1).find('td').at(2).text()).toBe('test');
  });

  it('calls the render functions for each column in each row', () => {
    expect(renderToUpper).toHaveBeenCalledWith(data[0]);
    expect(renderToUpper.calls.length).toEqual(1);

    expect(renderToLower).toHaveBeenCalledWith(data[0]);
    expect(renderToLower.calls.length).toEqual(1);
  });

  describe('when new data is provided to the table', () => {
    beforeEach(() => {
      data = [{
        attr1: 'new-attr-1', attr2: 'new-attr-2', attr3: 'new-attr-3'
      }];

      subject.setProps({data});
    });

    it('re-renders without re-constructing', () => {
      expect(componentConstructed.calls.length).toBe(1);
    });
  });
});
