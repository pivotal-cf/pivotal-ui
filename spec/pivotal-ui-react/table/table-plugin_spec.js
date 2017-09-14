import '../spec_helper';
import {TablePlugin} from '../../../src/react/table';

describe('TablePlugin', () => {
  it('has a tableTag defaultProp that returns a falsy value', () => {
    expect(TablePlugin.defaultProps.tableTag()).toBeFalsy();
  });

  it('has a theadTag defaultProp that returns a falsy value', () => {
    expect(TablePlugin.defaultProps.theadTag()).toBeFalsy();
  });

  it('has a tbodyTag defaultProp that returns a falsy value', () => {
    expect(TablePlugin.defaultProps.tbodyTag()).toBeFalsy();
  });

  it('has a trTag defaultProp that returns a falsy value', () => {
    expect(TablePlugin.defaultProps.trTag()).toBeFalsy();
  });

  it('has a thTag defaultProp that returns a falsy value', () => {
    expect(TablePlugin.defaultProps.thTag()).toBeFalsy();
  });

  it('has a tdTag defaultProp that returns a falsy value', () => {
    expect(TablePlugin.defaultProps.tdTag()).toBeFalsy();
  });

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

  describe('plugTag', () => {
    let tableTag, context, subject, returned;

    beforeEach(() => {
      tableTag = jasmine.createSpy('tableTag');
      context = {a: 1, b: 2};
    });

    describe('when the props callback provides a value', () => {
      beforeEach(() => {
        tableTag.and.returnValue('some-value');
        subject = ReactDOM.render(<TablePlugin {...{
          columns: [], data: [], tableTag
        }}/>, root);
        returned = subject.plugTag(null, context, 'tableTag');
      });

      it('calls the prop callback with context', () => {
        expect(tableTag).toHaveBeenCalledWith(context);
      });

      it('returns the tag provided by the prop callback', () => {
        expect(returned).toBe('some-value');
      });
    });

    describe('when the props callback does not provide a value', () => {
      let tagCb;

      beforeEach(() => {
        tagCb = jasmine.createSpy('tagCb');
        tagCb.and.returnValue('cb-value');
        subject = ReactDOM.render(<TablePlugin {...{
          columns: [], data: [], tableTag
        }}/>, root);
        returned = subject.plugTag(tagCb, context, 'tableTag');
      });

      it('calls the prop callback with context', () => {
        expect(tableTag).toHaveBeenCalledWith(context);
      });

      it('calls the tagCb callback', () => {
        expect(tagCb).toHaveBeenCalledWith();
      });

      it('returns the tag provided by the tagCb', () => {
        expect(returned).toBe('cb-value');
      });
    });
  });

  describe('plugTableTag', () => {
    let tagCb, context, subject, returned;

    beforeEach(() => {
      spyOn(TablePlugin.prototype, 'plugTag').and.returnValue('some-tag');
      tagCb = jasmine.createSpy('tagCb');
      context = {a: 1, b: 2};
      subject = ReactDOM.render(<TablePlugin {...{columns: [], data: []}}/>, root);
      returned = subject.plugTableTag(tagCb, context);
    });

    it('calls plugTag', () => {
      expect(TablePlugin.prototype.plugTag).toHaveBeenCalledWith(tagCb, context, 'tableTag');
    });

    it('returns the tag provided by the prop callback', () => {
      expect(returned).toBe('some-tag');
    });
  });

  describe('plugTheadTag', () => {
    let tagCb, context, subject, returned;

    beforeEach(() => {
      spyOn(TablePlugin.prototype, 'plugTag').and.returnValue('some-tag');
      tagCb = jasmine.createSpy('tagCb');
      context = {a: 1, b: 2};
      subject = ReactDOM.render(<TablePlugin {...{columns: [], data: []}}/>, root);
      returned = subject.plugTheadTag(tagCb, context);
    });

    it('calls plugTag', () => {
      expect(TablePlugin.prototype.plugTag).toHaveBeenCalledWith(tagCb, context, 'theadTag');
    });

    it('returns the tag provided by the prop callback', () => {
      expect(returned).toBe('some-tag');
    });
  });

  describe('plugTbodyTag', () => {
    let tagCb, context, subject, returned;

    beforeEach(() => {
      spyOn(TablePlugin.prototype, 'plugTag').and.returnValue('some-tag');
      tagCb = jasmine.createSpy('tagCb');
      context = {a: 1, b: 2};
      subject = ReactDOM.render(<TablePlugin {...{columns: [], data: []}}/>, root);
      returned = subject.plugTbodyTag(tagCb, context);
    });

    it('calls plugTag', () => {
      expect(TablePlugin.prototype.plugTag).toHaveBeenCalledWith(tagCb, context, 'tbodyTag');
    });

    it('returns the tag provided by the prop callback', () => {
      expect(returned).toBe('some-tag');
    });
  });

  describe('plugTrTag', () => {
    let tagCb, context, subject, returned;

    beforeEach(() => {
      spyOn(TablePlugin.prototype, 'plugTag').and.returnValue('some-tag');
      tagCb = jasmine.createSpy('tagCb');
      context = {a: 1, b: 2};
      subject = ReactDOM.render(<TablePlugin {...{columns: [], data: []}}/>, root);
      returned = subject.plugTrTag(tagCb, context);
    });

    it('calls plugTag', () => {
      expect(TablePlugin.prototype.plugTag).toHaveBeenCalledWith(tagCb, context, 'trTag');
    });

    it('returns the tag provided by the prop callback', () => {
      expect(returned).toBe('some-tag');
    });
  });

  describe('plugThTag', () => {
    let tagCb, context, subject, returned;

    beforeEach(() => {
      spyOn(TablePlugin.prototype, 'plugTag').and.returnValue('some-tag');
      tagCb = jasmine.createSpy('tagCb');
      context = {a: 1, b: 2};
      subject = ReactDOM.render(<TablePlugin {...{columns: [], data: []}}/>, root);
      returned = subject.plugThTag(tagCb, context);
    });

    it('calls plugTag', () => {
      expect(TablePlugin.prototype.plugTag).toHaveBeenCalledWith(tagCb, context, 'thTag');
    });

    it('returns the tag provided by the prop callback', () => {
      expect(returned).toBe('some-tag');
    });
  });

  describe('plugTdTag', () => {
    let tagCb, context, subject, returned;

    beforeEach(() => {
      spyOn(TablePlugin.prototype, 'plugTag').and.returnValue('some-tag');
      tagCb = jasmine.createSpy('tagCb');
      context = {a: 1, b: 2};
      subject = ReactDOM.render(<TablePlugin {...{columns: [], data: []}}/>, root);
      returned = subject.plugTdTag(tagCb, context);
    });

    it('calls plugTag', () => {
      expect(TablePlugin.prototype.plugTag).toHaveBeenCalledWith(tagCb, context, 'tdTag');
    });

    it('returns the tag provided by the prop callback', () => {
      expect(returned).toBe('some-tag');
    });
  });

  describe('plugProps', () => {
    let subject, table, newProps, context, mergedProps;

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

      newProps = {
        className: 'new-class-name',
        id: 'new-id',
        style: {new: 'style-new'},
        new: 'prop-new'
      };
      context = {some: 'context'};
      mergedProps = subject.plugProps(newProps, context, 'table');
    });

    it('calls the table callback with the context', () => {
      expect(table).toHaveBeenCalledWith(newProps, context);
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

  describe('plugTableProps', () => {
    let subject, table, newProps, context, mergedProps;

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

      newProps = {
        className: 'new-class-name',
        id: 'new-id',
        style: {new: 'style-new'},
        new: 'prop-new'
      };
      context = {some: 'context'};
      mergedProps = subject.plugTableProps(newProps, context);
    });

    it('calls the table callback with the context and props', () => {
      expect(table).toHaveBeenCalledWith(newProps, context);
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

  describe('plugTheadProps', () => {
    let subject, thead, newProps, context, mergedProps;

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

      newProps = {
        className: 'new-class-name',
        id: 'new-id',
        style: {new: 'style-new'},
        new: 'prop-new'
      };
      context = {some: 'context'};
      mergedProps = subject.plugTheadProps(newProps, context);
    });

    it('calls the thead callback with the context', () => {
      expect(thead).toHaveBeenCalledWith(newProps, context);
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

  describe('plugTbodyProps', () => {
    let subject, tbody, newProps, context, mergedProps;

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

      newProps = {
        className: 'new-class-name',
        id: 'new-id',
        style: {new: 'style-new'},
        new: 'prop-new'
      };
      context = {some: 'context'};
      mergedProps = subject.plugTbodyProps(newProps, context);
    });

    it('calls the tbody callback with the context', () => {
      expect(tbody).toHaveBeenCalledWith(newProps, context);
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

  describe('plugTrProps', () => {
    let subject, tr, newProps, context, mergedProps;

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

      newProps = {
        className: 'new-class-name',
        id: 'new-id',
        style: {new: 'style-new'},
        new: 'prop-new'
      };
      context = {some: 'context'};
      mergedProps = subject.plugTrProps(newProps, context);
    });

    it('calls the tr callback with the context', () => {
      expect(tr).toHaveBeenCalledWith(newProps, context);
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

  describe('plugThProps', () => {
    let subject, th, newProps, context, mergedProps;

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

      newProps = {
        className: 'new-class-name',
        id: 'new-id',
        style: {new: 'style-new'},
        new: 'prop-new'
      };
      context = {some: 'context'};
      mergedProps = subject.plugThProps(newProps, context);
    });

    it('calls the th callback with the context', () => {
      expect(th).toHaveBeenCalledWith(newProps, context);
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

  describe('plugTdProps', () => {
    let subject, td, newProps, context, mergedProps;

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

      newProps = {
        className: 'new-class-name',
        id: 'new-id',
        style: {new: 'style-new'},
        new: 'prop-new'
      };
      context = {some: 'context'};
      mergedProps = subject.plugTdProps(newProps, context);
    });

    it('calls the td callback with the context', () => {
      expect(td).toHaveBeenCalledWith(newProps, context);
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