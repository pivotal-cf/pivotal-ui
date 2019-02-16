import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {setProps} from '../../../support/jest-helpers';
import {Table, withRenderTdChildren} from '../../../../src/react/table';

describe('withRenderTdChildren', () => {
  let data, renderToUpper, renderToLower, componentConstructed, subject;

  beforeEach(() => {
    componentConstructed = jasmine.createSpy('componentConstructed');
    renderToUpper = jasmine.createSpy('renderToUpper').and.callFake(({attr1}) => <span>{attr1.toUpperCase()}</span>);
    renderToLower = jasmine.createSpy('renderToLower').and.callFake(({attr2}) => <span>{attr2.toLowerCase()}</span>);

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
    subject = ReactDOM.render(<ComposedTable {...{columns, data}}/>, root);
  });

  it('renders the result of the renderTdChildren call', () => {
    expect('table tr:eq(1) td:eq(0)').toHaveText(data[0].attr1.toUpperCase());
    expect('table tr:eq(1) td:eq(1)').toHaveText(data[0].attr2.toLowerCase());
    expect('table tr:eq(1) td:eq(2)').toHaveText('test');
  });

  it('calls the render functions for each column in each row', () => {
    expect(renderToUpper).toHaveBeenCalledWith(data[0]);
    expect(renderToUpper.calls.count()).toEqual(1);

    expect(renderToLower).toHaveBeenCalledWith(data[0]);
    expect(renderToLower.calls.count()).toEqual(1);
  });

  describe('when new data is provided to the table', () => {
    beforeEach(() => {
      data = [{
        attr1: 'new-attr-1', attr2: 'new-attr-2', attr3: 'new-attr-3'
      }];

      subject::setProps({data});
    });

    it('re-renders without re-constructing', () => {
      expect(componentConstructed.calls.count()).toBe(1);
    });
  });
});
