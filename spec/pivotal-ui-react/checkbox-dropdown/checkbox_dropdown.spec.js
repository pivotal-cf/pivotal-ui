import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {setProps} from '../../support/jest-helpers';
import {CheckboxDropdown} from '../../../src/react/checkbox-dropdown';

describe('checkbox dropdown', () => {
  let subject;

  describe('for an object of labels', () => {
    let labels;

    beforeEach(() => {
      labels = {'item #1': true, 'item #2': false, 'item #3': true};
      subject = ReactDOM.render(<CheckboxDropdown labels={labels} />, root);
    });

    it('initializes the state to the labels for all the options', () => {
      expect(subject.state.options).toEqual(labels);
    });

    it('checks the configured labels', () => {
      expect($('.checkbox-dropdown-item-checkbox:eq(0) input[type="checkbox"]')[0].checked).toBeFalsy();
      expect($('.checkbox-dropdown-item-checkbox:eq(1) input[type="checkbox"]')[0].checked).toBeTruthy();
      expect($('.checkbox-dropdown-item-checkbox:eq(2) input[type="checkbox"]')[0].checked).toBeFalsy();
      expect($('.checkbox-dropdown-item-checkbox:eq(3) input[type="checkbox"]')[0].checked).toBeTruthy();
    });
  });

  describe('for an array of labels', () => {
    beforeEach(() => {
      subject = ReactDOM.render(<CheckboxDropdown labels={['item #1', 'item #2', 'item #3']}/>, root);
    });

    describe('on initial render', () => {
      it('on initialization state.open is false', () => {
        expect(subject.state.open).toBeFalsy();
      });

      it('renders the items passed in props', () => {
        expect($('.checkbox-dropdown-item-checkbox:eq(0)')).toHaveText('ALL');
        expect($('.checkbox-dropdown-item-checkbox:eq(1)')).toHaveText('item #1');
        expect($('.checkbox-dropdown-item-checkbox:eq(2)')).toHaveText('item #2');
        expect($('.checkbox-dropdown-item-checkbox:eq(3)')).toHaveText('item #3');
      });

      it('renders the items with labels and labelClassNames', () => {
        expect($('.pui-checkbox-label:eq(0)')).toHaveClass('pui-checkbox-dropdown-item-label');
        expect($('.pui-checkbox-label:eq(1)')).toHaveClass('pui-checkbox-dropdown-item-label');
        expect($('.pui-checkbox-label:eq(2)')).toHaveClass('pui-checkbox-dropdown-item-label');
        expect($('.pui-checkbox-label:eq(3)')).toHaveClass('pui-checkbox-dropdown-item-label');
      });

      it('has the text "ALL"', () => {
        expect($('.dropdown > button')).toHaveText('ALL');
      });

      it('all the checkboxes are checked', () => {
        expect($('.checkbox-dropdown-item-checkbox:eq(0) input[type="checkbox"]')[0].checked).toBeTruthy();
        expect($('.checkbox-dropdown-item-checkbox:eq(1) input[type="checkbox"]')[0].checked).toBeTruthy();
        expect($('.checkbox-dropdown-item-checkbox:eq(2) input[type="checkbox"]')[0].checked).toBeTruthy();
        expect($('.checkbox-dropdown-item-checkbox:eq(3) input[type="checkbox"]')[0].checked).toBeTruthy();
      });

      it('initializes the state to true for all the options', () => {
        expect(Object.values(subject.state.options).every(val => val)).toBeTruthy();
      });

      it('all selected returns true', () => {
        expect(subject.allSelected()).toBeTruthy();
      });
    });

    describe('unselecting a checkbox option', () => {
      beforeEach(() => {
        $('.checkbox-dropdown-item-checkbox:eq(2) input[type="checkbox"]').click();
      });

      it('the title changes to show the selected options', () => {
        expect($('.dropdown > button')).toHaveText('item #1, item #3');
      });

      it('will unselect the "ALL" checkbox', () => {
        expect($('.checkbox-dropdown-item-checkbox:eq(0) input[type="checkbox"]')[0].checked).toBeFalsy();
        expect($('.checkbox-dropdown-item-checkbox:eq(1) input[type="checkbox"]')[0].checked).toBeTruthy();
        expect($('.checkbox-dropdown-item-checkbox:eq(2) input[type="checkbox"]')[0].checked).toBeFalsy();
        expect($('.checkbox-dropdown-item-checkbox:eq(3) input[type="checkbox"]')[0].checked).toBeTruthy();
      });

      describe('reselecting the checkbox option', () => {
        beforeEach(() => {
          $('.checkbox-dropdown-item-checkbox:eq(2) input[type="checkbox"]').click();
        });

        it('the title text displays "ALL"', () => {
          expect($('.dropdown > button')).toHaveText('ALL');
        });

        it('will reselect the all checkboxes', () => {
          expect($('.checkbox-dropdown-item-checkbox:eq(0) input[type="checkbox"]')[0].checked).toBeTruthy();
          expect($('.checkbox-dropdown-item-checkbox:eq(1) input[type="checkbox"]')[0].checked).toBeTruthy();
          expect($('.checkbox-dropdown-item-checkbox:eq(2) input[type="checkbox"]')[0].checked).toBeTruthy();
          expect($('.checkbox-dropdown-item-checkbox:eq(3) input[type="checkbox"]')[0].checked).toBeTruthy();
        });
      });

      describe('reselecting the "ALL" checkbox option', () => {
        beforeEach(() => {
          $('.checkbox-dropdown-item-checkbox:eq(0) input[type="checkbox"]').click();
        });

        it('the title text displays "ALL"', () => {
          expect($('.dropdown > button')).toHaveText('ALL');
        });

        it('will reselect the all checkboxes', () => {
          expect($('.checkbox-dropdown-item-checkbox:eq(0) input[type="checkbox"]')[0].checked).toBeTruthy();
          expect($('.checkbox-dropdown-item-checkbox:eq(1) input[type="checkbox"]')[0].checked).toBeTruthy();
          expect($('.checkbox-dropdown-item-checkbox:eq(2) input[type="checkbox"]')[0].checked).toBeTruthy();
          expect($('.checkbox-dropdown-item-checkbox:eq(3) input[type="checkbox"]')[0].checked).toBeTruthy();
        });
      });
    });

    describe('unselecting all checkbox options', () => {
      beforeEach(() => {
        $('.checkbox-dropdown-item-checkbox:eq(1) input[type="checkbox"]').click();
        $('.checkbox-dropdown-item-checkbox:eq(2) input[type="checkbox"]').click();
        $('.checkbox-dropdown-item-checkbox:eq(3) input[type="checkbox"]').click();
      });

      it('the title changes to show "NONE"', () => {
        expect($('.dropdown > button')).toHaveText('NONE');
      });

      it('will unselect the "ALL" checkbox', () => {
        expect($('.checkbox-dropdown-item-checkbox:eq(0) input[type="checkbox"]')[0].checked).toBeFalsy();
        expect($('.checkbox-dropdown-item-checkbox:eq(1) input[type="checkbox"]')[0].checked).toBeFalsy();
        expect($('.checkbox-dropdown-item-checkbox:eq(2) input[type="checkbox"]')[0].checked).toBeFalsy();
        expect($('.checkbox-dropdown-item-checkbox:eq(3) input[type="checkbox"]')[0].checked).toBeFalsy();
      });

      describe('reselecting the unchecked checkbox options', () => {
        beforeEach(() => {
          $('.checkbox-dropdown-item-checkbox:eq(1) input[type="checkbox"]').click();
          $('.checkbox-dropdown-item-checkbox:eq(2) input[type="checkbox"]').click();
          $('.checkbox-dropdown-item-checkbox:eq(3) input[type="checkbox"]').click();
        });

        it('the title text displays "ALL"', () => {
          expect($('.dropdown > button')).toHaveText('ALL');
        });

        it('will reselect all the checkboxes', () => {
          expect($('.checkbox-dropdown-item-checkbox:eq(0) input[type="checkbox"]')[0].checked).toBeTruthy();
          expect($('.checkbox-dropdown-item-checkbox:eq(1) input[type="checkbox"]')[0].checked).toBeTruthy();
          expect($('.checkbox-dropdown-item-checkbox:eq(2) input[type="checkbox"]')[0].checked).toBeTruthy();
          expect($('.checkbox-dropdown-item-checkbox:eq(3) input[type="checkbox"]')[0].checked).toBeTruthy();
        });
      });

      describe('reselecting the "ALL" checkbox option', () => {
        beforeEach(() => {
          $('.checkbox-dropdown-item-checkbox:eq(0) input[type="checkbox"]').click();
        });

        it('the title text displays "ALL"', () => {
          expect($('.dropdown > button')).toHaveText('ALL');
        });

        it('will reselect all the checkboxes', () => {
          expect($('.checkbox-dropdown-item-checkbox:eq(0) input[type="checkbox"]')[0].checked).toBeTruthy();
          expect($('.checkbox-dropdown-item-checkbox:eq(1) input[type="checkbox"]')[0].checked).toBeTruthy();
          expect($('.checkbox-dropdown-item-checkbox:eq(2) input[type="checkbox"]')[0].checked).toBeTruthy();
          expect($('.checkbox-dropdown-item-checkbox:eq(3) input[type="checkbox"]')[0].checked).toBeTruthy();
        });
      });
    });

    describe('unselecting the "ALL" checkbox option', () => {
      beforeEach(() => {
        $('.checkbox-dropdown-item-checkbox:eq(0) input[type="checkbox"]').click();
      });

      it('the title changes to show "NONE"', () => {
        expect($('.dropdown > button')).toHaveText('NONE');
      });

      it('will unselect all checkboxes', () => {
        expect($('.checkbox-dropdown-item-checkbox:eq(0) input[type="checkbox"]')[0].checked).toBeFalsy();
        expect($('.checkbox-dropdown-item-checkbox:eq(1) input[type="checkbox"]')[0].checked).toBeFalsy();
        expect($('.checkbox-dropdown-item-checkbox:eq(2) input[type="checkbox"]')[0].checked).toBeFalsy();
        expect($('.checkbox-dropdown-item-checkbox:eq(3) input[type="checkbox"]')[0].checked).toBeFalsy();
      });

      describe('reselecting any checkbox options', () => {
        beforeEach(() => {
          $('.checkbox-dropdown-item-checkbox:eq(2) input[type="checkbox"]').click();
          $('.checkbox-dropdown-item-checkbox:eq(3) input[type="checkbox"]').click();
        });

        it('the title changes to show the selected options', () => {
          expect($('.dropdown > button')).toHaveText('item #2, item #3');
        });

        it('will reselect some of the checkboxes', () => {
          expect($('.checkbox-dropdown-item-checkbox:eq(0) input[type="checkbox"]')[0].checked).toBeFalsy();
          expect($('.checkbox-dropdown-item-checkbox:eq(1) input[type="checkbox"]')[0].checked).toBeFalsy();
          expect($('.checkbox-dropdown-item-checkbox:eq(2) input[type="checkbox"]')[0].checked).toBeTruthy();
          expect($('.checkbox-dropdown-item-checkbox:eq(3) input[type="checkbox"]')[0].checked).toBeTruthy();
        });
      });

      describe('reselecting the "ALL" checkbox option', () => {
        beforeEach(() => {
          $('.checkbox-dropdown-item-checkbox:eq(0) input[type="checkbox"]').click();
        });

        it('the title changes to show "ALL"', () => {
          expect($('.dropdown > button')).toHaveText('ALL');
        });

        it('will reselect all the checkboxes', () => {
          expect($('.checkbox-dropdown-item-checkbox:eq(0) input[type="checkbox"]')[0].checked).toBeTruthy();
          expect($('.checkbox-dropdown-item-checkbox:eq(1) input[type="checkbox"]')[0].checked).toBeTruthy();
          expect($('.checkbox-dropdown-item-checkbox:eq(2) input[type="checkbox"]')[0].checked).toBeTruthy();
          expect($('.checkbox-dropdown-item-checkbox:eq(3) input[type="checkbox"]')[0].checked).toBeTruthy();
        });
      });
    });

    describe('when interacting with the checkboxes', () => {
      let testableFn;
      beforeEach(() => {
        testableFn = jasmine.createSpy('testableFn');
        subject::setProps({onChange: testableFn});
        $('.checkbox-dropdown-item-checkbox:eq(2) input[type="checkbox"]').click();
      });

      it('calls the onChange callback', () => {
        expect(testableFn).toHaveBeenCalledWith({
          'item #1': true,
          'item #2': false,
          'item #3': true
        });
      });
    });

    describe('when clicking on a label', () => {
      let onChange;

      beforeEach(() => {
        onChange = jasmine.createSpy('onChange');
        subject::setProps({onChange});
        $('.pui-checkbox-label:eq(2)').click();
      });

      it('calls the onChange callback', () => {
        expect(onChange).toHaveBeenCalledWith({
          'item #1': true,
          'item #2': false,
          'item #3': true
        });
      });
    });
  });
});