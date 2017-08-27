import '../spec_helper';
import {TablePlugin} from '../../../src/pivotal-ui-react/table/table';

describe('TablePlugin', () => {
  it('has a table defaultProp that returns an empty object', () => {
    expect(TablePlugin.defaultProps.table()).toEqual({});
  });

  it('has a thead defaultProp that returns an empty object', () => {
    expect(TablePlugin.defaultProps.thead()).toEqual({});
  });

  it('has a tbody defaultProp that returns an empty object', () => {
    expect(TablePlugin.defaultProps.tbody()).toEqual({});
  });

  it('has a tr defaultProp that returns an empty object', () => {
    expect(TablePlugin.defaultProps.tr()).toEqual({});
  });

  it('has a th defaultProp that returns an empty object', () => {
    expect(TablePlugin.defaultProps.th()).toEqual({});
  });

  it('has a td defaultProp that returns an empty object', () => {
    expect(TablePlugin.defaultProps.td()).toEqual({});
  });

  describe('mergeProps', () => {
    let subject, table, context, mergedProps;

    beforeEach(() => {
      const oldProps = {
        className: 'old-class-name',
        id: 'old-id',
        style: {old: 'style-old'},
        old: 'prop-old'
      };
      table = jasmine.createSpy('table').and.returnValue(oldProps);
      subject = ReactDOM.render(<TablePlugin {...{
        columns: [], data: [], table
      }}/>, root);

      const newProps = {
        className: 'new-class-name',
        id: 'new-id',
        style: {new: 'style-new'},
        new: 'prop-new'
      };
      context = {some: 'context'};
      mergedProps = subject.mergeProps(newProps, context, 'table');
    });

    it('calls the table callback with the context', () => {
      expect(table).toHaveBeenCalledWith(context);
    });

    it('merges props', () => {
      expect(mergedProps).toEqual({
        className: 'new-class-name old-class-name',
        id: 'old-id',
        style: {old: 'style-old', new: 'style-new'},
        new: 'prop-new',
        old: 'prop-old'
      });
    });
  });

  describe('table', () => {
    let subject, table, context, mergedProps;

    beforeEach(() => {
      const oldProps = {
        className: 'old-class-name',
        id: 'old-id',
        style: {old: 'style-old'},
        old: 'prop-old'
      };
      table = jasmine.createSpy('table').and.returnValue(oldProps);
      subject = ReactDOM.render(<TablePlugin {...{
        columns: [], data: [], table
      }}/>, root);

      const newProps = {
        className: 'new-class-name',
        id: 'new-id',
        style: {new: 'style-new'},
        new: 'prop-new'
      };
      context = {some: 'context'};
      mergedProps = subject.table(newProps, context);
    });

    it('calls the table callback with the context', () => {
      expect(table).toHaveBeenCalledWith(context);
    });

    it('merges props', () => {
      expect(mergedProps).toEqual({
        className: 'new-class-name old-class-name',
        id: 'old-id',
        style: {old: 'style-old', new: 'style-new'},
        new: 'prop-new',
        old: 'prop-old'
      });
    });
  });

  describe('thead', () => {
    let subject, thead, context, mergedProps;

    beforeEach(() => {
      const oldProps = {
        className: 'old-class-name',
        id: 'old-id',
        style: {old: 'style-old'},
        old: 'prop-old'
      };
      thead = jasmine.createSpy('thead').and.returnValue(oldProps);
      subject = ReactDOM.render(<TablePlugin {...{
        columns: [], data: [], thead
      }}/>, root);

      const newProps = {
        className: 'new-class-name',
        id: 'new-id',
        style: {new: 'style-new'},
        new: 'prop-new'
      };
      context = {some: 'context'};
      mergedProps = subject.thead(newProps, context);
    });

    it('calls the thead callback with the context', () => {
      expect(thead).toHaveBeenCalledWith(context);
    });

    it('merges props', () => {
      expect(mergedProps).toEqual({
        className: 'new-class-name old-class-name',
        id: 'old-id',
        style: {old: 'style-old', new: 'style-new'},
        new: 'prop-new',
        old: 'prop-old'
      });
    });
  });

  describe('tbody', () => {
    let subject, tbody, context, mergedProps;

    beforeEach(() => {
      const oldProps = {
        className: 'old-class-name',
        id: 'old-id',
        style: {old: 'style-old'},
        old: 'prop-old'
      };
      tbody = jasmine.createSpy('tbody').and.returnValue(oldProps);
      subject = ReactDOM.render(<TablePlugin {...{
        columns: [], data: [], tbody
      }}/>, root);

      const newProps = {
        className: 'new-class-name',
        id: 'new-id',
        style: {new: 'style-new'},
        new: 'prop-new'
      };
      context = {some: 'context'};
      mergedProps = subject.tbody(newProps, context);
    });

    it('calls the tbody callback with the context', () => {
      expect(tbody).toHaveBeenCalledWith(context);
    });

    it('merges props', () => {
      expect(mergedProps).toEqual({
        className: 'new-class-name old-class-name',
        id: 'old-id',
        style: {old: 'style-old', new: 'style-new'},
        new: 'prop-new',
        old: 'prop-old'
      });
    });
  });

  describe('tr', () => {
    let subject, tr, context, mergedProps;

    beforeEach(() => {
      const oldProps = {
        className: 'old-class-name',
        id: 'old-id',
        style: {old: 'style-old'},
        old: 'prop-old'
      };
      tr = jasmine.createSpy('tr').and.returnValue(oldProps);
      subject = ReactDOM.render(<TablePlugin {...{
        columns: [], data: [], tr
      }}/>, root);

      const newProps = {
        className: 'new-class-name',
        id: 'new-id',
        style: {new: 'style-new'},
        new: 'prop-new'
      };
      context = {some: 'context'};
      mergedProps = subject.tr(newProps, context);
    });

    it('calls the tr callback with the context', () => {
      expect(tr).toHaveBeenCalledWith(context);
    });

    it('merges props', () => {
      expect(mergedProps).toEqual({
        className: 'new-class-name old-class-name',
        id: 'old-id',
        style: {old: 'style-old', new: 'style-new'},
        new: 'prop-new',
        old: 'prop-old'
      });
    });
  });

  describe('th', () => {
    let subject, th, context, mergedProps;

    beforeEach(() => {
      const oldProps = {
        className: 'old-class-name',
        id: 'old-id',
        style: {old: 'style-old'},
        old: 'prop-old'
      };
      th = jasmine.createSpy('th').and.returnValue(oldProps);
      subject = ReactDOM.render(<TablePlugin {...{
        columns: [], data: [], th
      }}/>, root);

      const newProps = {
        className: 'new-class-name',
        id: 'new-id',
        style: {new: 'style-new'},
        new: 'prop-new'
      };
      context = {some: 'context'};
      mergedProps = subject.th(newProps, context);
    });

    it('calls the th callback with the context', () => {
      expect(th).toHaveBeenCalledWith(context);
    });

    it('merges props', () => {
      expect(mergedProps).toEqual({
        className: 'new-class-name old-class-name',
        id: 'old-id',
        style: {old: 'style-old', new: 'style-new'},
        new: 'prop-new',
        old: 'prop-old'
      });
    });
  });

  describe('td', () => {
    let subject, td, context, mergedProps;

    beforeEach(() => {
      const oldProps = {
        className: 'old-class-name',
        id: 'old-id',
        style: {old: 'style-old'},
        old: 'prop-old'
      };
      td = jasmine.createSpy('td').and.returnValue(oldProps);
      subject = ReactDOM.render(<TablePlugin {...{
        columns: [], data: [], td
      }}/>, root);

      const newProps = {
        className: 'new-class-name',
        id: 'new-id',
        style: {new: 'style-new'},
        new: 'prop-new'
      };
      context = {some: 'context'};
      mergedProps = subject.td(newProps, context);
    });

    it('calls the td callback with the context', () => {
      expect(td).toHaveBeenCalledWith(context);
    });

    it('merges props', () => {
      expect(mergedProps).toEqual({
        className: 'new-class-name old-class-name',
        id: 'old-id',
        style: {old: 'style-old', new: 'style-new'},
        new: 'prop-new',
        old: 'prop-old'
      });
    });
  });
});