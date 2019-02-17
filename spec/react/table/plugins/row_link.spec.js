import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Table, withFlex, withRowLink} from '../../../../src/react/table';

describe('withRowLink', () => {
  let columns, data, link, onClick, ComposedTable;

  beforeEach(() => {
    columns = [{
      attribute: 'attr1'
    }, {
      attribute: 'attr2', displayName: 'Display2'
    }];
    data = [{
      attr1: 'row1-value1', attr2: 'row1-value2'
    }, {
      attr1: 'row2-value1', attr2: 'row2-value2'
    }];

    link = jasmine.createSpy('link');
    onClick = jasmine.createSpy('link');

    ComposedTable = withRowLink(withFlex(Table));
  });

  describe('when link does not return an href', () => {
    beforeEach(() => {
      ReactDOM.render(<ComposedTable {...{columns, data, rowLink: {link, onClick}}}/>, root);
    });

    it('renders the rows as div tags', () => {
      expect('.table .thead > div:eq(0)').toHaveClass('tr');
      expect('.table .tbody > div:eq(0)').toHaveClass('tr');
      expect('.table .tbody > div:eq(1)').toHaveClass('tr');
    });

    describe('when clicking the divs', () => {
      beforeEach(() => {
        $('.table .thead > div:eq(0)').simulate('click');
        $('.table .tbody > div:eq(0)').simulate('click');
        $('.table .tbody > div:eq(1)').simulate('click');
      });

      it('does not call the onClick callback', () => {
        expect(onClick).not.toHaveBeenCalled();
      });
    });
  });

  describe('when link returns an href', () => {
    beforeEach(() => {
      link.and.returnValue('some-href');
      ReactDOM.render(<ComposedTable {...{columns, data, rowLink: {link, onClick}}}/>, root);
    });

    it('renders the header row as a div tag', () => {
      expect('.table .thead > div:eq(0)').toHaveClass('tr');
    });

    describe('when clicking the header div', () => {
      beforeEach(() => {
        $('.table .thead > div:eq(0)').simulate('click');
      });

      it('does not call the onClick callback', () => {
        expect(onClick).not.toHaveBeenCalled();
      });
    });

    it('renders the body rows as anchor tags', () => {
      expect('.table .tbody > a:eq(0)').toHaveClass('tr');
      expect('.table .tbody > a:eq(1)').toHaveClass('tr');
    });

    describe('when clicking the first body anchor', () => {
      beforeEach(() => {
        $('.table .tbody > a:eq(0)').simulate('click');
      });

      it('calls the onClick callback', () => {
        expect(onClick).toHaveBeenCalledWith(jasmine.any(Object), data[0]);
      });
    });

    describe('when clicking the second body anchor', () => {
      beforeEach(() => {
        $('.table .tbody > a:eq(1)').simulate('click');
      });

      it('calls the onClick callback', () => {
        expect(onClick).toHaveBeenCalledWith(jasmine.any(Object), data[1]);
      });
    });
  });
});