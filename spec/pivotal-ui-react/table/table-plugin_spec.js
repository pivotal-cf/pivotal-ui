import '../spec_helper';
import {TablePlugin} from '../../../src/react/table';

describe('TablePlugin', () => {
  let subject;
  it('has a plugTag defaultProp that returns the tag', () => {
    const tag = 'some-tag';
    expect(TablePlugin.defaultProps.plugTag(null, tag)).toBe(tag);
  });

  it('has a plugProps defaultProp that returns the props', () => {
    const props = {some: 'props'};
    expect(TablePlugin.defaultProps.plugProps(null, props)).toBe(props);
  });

  describe('plugTag', () => {
    let tableTag, context, subject, returned;

    beforeEach(() => {
      tableTag = jest.fn().mockName('tableTag');
      context = {a: 1, b: 2};
    });

    describe('when the props callback provides a value', () => {
      beforeEach(() => {
        tableTag.mockReturnValue('some-value');
        subject = shallow(<TablePlugin {...{
          columns: [], data: [], tableTag
        }}/>);
        returned = subject.plugTag('table', null, context);
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
        tagCb = jest.fn().mockName('tagCb');
        tagCb.mockReturnValue('cb-value');
        subject = shallow(<TablePlugin {...{
          columns: [], data: [], tableTag
        }}/>);
        returned = subject.plugTag('table', 'cb-value', context);
      });

      it('calls the prop callback with context', () => {
        expect(tableTag).toHaveBeenCalledWith(context);
      });

      it('returns the tag provided by the tagCb', () => {
        expect(returned).toBe('cb-value');
      });
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
      table = jest.fn().mockName('table').mockReturnValue(oldProps);
      subject = shallow(<TablePlugin {...{
        columns: [], data: [], table
      }}/>);

      newProps = {
        className: 'new-class-name',
        id: 'new-id',
        style: {new: 'style-new'},
        new: 'prop-new'
      };
      context = {some: 'context'};
      mergedProps = subject.plugProps('table', newProps, context);
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
});