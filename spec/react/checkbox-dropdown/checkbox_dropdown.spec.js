import React from 'react';
import ReactDOM from 'react-dom';
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
      expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[0].querySelector('input[type="checkbox"]').checked).toBeFalsy();
      expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[1].querySelector('input[type="checkbox"]').checked).toBeTruthy();
      expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[2].querySelector('input[type="checkbox"]').checked).toBeFalsy();
      expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[3].querySelector('input[type="checkbox"]').checked).toBeTruthy();
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
        expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[0]).toHaveText('ALL');
        expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[1]).toHaveText('item #1');
        expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[2]).toHaveText('item #2');
        expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[3]).toHaveText('item #3');
      });

      it('renders the items with labels and labelClassNames', () => {
        expect(document.querySelectorAll('.pui-checkbox-label')[0]).toHaveClass('pui-checkbox-dropdown-item-label');
        expect(document.querySelectorAll('.pui-checkbox-label')[1]).toHaveClass('pui-checkbox-dropdown-item-label');
        expect(document.querySelectorAll('.pui-checkbox-label')[2]).toHaveClass('pui-checkbox-dropdown-item-label');
        expect(document.querySelectorAll('.pui-checkbox-label')[3]).toHaveClass('pui-checkbox-dropdown-item-label');
      });

      it('has the text "ALL"', () => {
        expect(document.querySelector('.dropdown > button')).toHaveText('ALL');
      });

      it('all the checkboxes are checked', () => {
        expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[0].querySelector('input[type="checkbox"]').checked).toBeTruthy();
        expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[1].querySelector('input[type="checkbox"]').checked).toBeTruthy();
        expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[2].querySelector('input[type="checkbox"]').checked).toBeTruthy();
        expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[3].querySelector('input[type="checkbox"]').checked).toBeTruthy();
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
        document.querySelectorAll('.checkbox-dropdown-item-checkbox')[2].querySelector('input[type="checkbox"]').click();
      });

      it('the title changes to show the selected options', () => {
        expect(document.querySelector('.dropdown > button')).toHaveText('item #1, item #3');
      });

      it('will unselect the "ALL" checkbox', () => {
        expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[0].querySelector('input[type="checkbox"]').checked).toBeFalsy();
        expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[1].querySelector('input[type="checkbox"]').checked).toBeTruthy();
        expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[2].querySelector('input[type="checkbox"]').checked).toBeFalsy();
        expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[3].querySelector('input[type="checkbox"]').checked).toBeTruthy();
      });

      describe('reselecting the checkbox option', () => {
        beforeEach(() => {
          document.querySelectorAll('.checkbox-dropdown-item-checkbox')[2].querySelector('input[type="checkbox"]').click();
        });

        it('the title text displays "ALL"', () => {
          expect(document.querySelector('.dropdown > button')).toHaveText('ALL');
        });

        it('will reselect the all checkboxes', () => {
          expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[0].querySelector('input[type="checkbox"]').checked).toBeTruthy();
          expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[1].querySelector('input[type="checkbox"]').checked).toBeTruthy();
          expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[2].querySelector('input[type="checkbox"]').checked).toBeTruthy();
          expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[3].querySelector('input[type="checkbox"]').checked).toBeTruthy();
        });
      });

      describe('reselecting the "ALL" checkbox option', () => {
        beforeEach(() => {
          document.querySelectorAll('.checkbox-dropdown-item-checkbox')[0].querySelector('input[type="checkbox"]').click();
        });

        it('the title text displays "ALL"', () => {
          expect(document.querySelector('.dropdown > button')).toHaveText('ALL');
        });

        it('will reselect the all checkboxes', () => {
          expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[0].querySelector('input[type="checkbox"]').checked).toBeTruthy();
          expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[1].querySelector('input[type="checkbox"]').checked).toBeTruthy();
          expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[2].querySelector('input[type="checkbox"]').checked).toBeTruthy();
          expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[3].querySelector('input[type="checkbox"]').checked).toBeTruthy();
        });
      });
    });

    describe('unselecting all checkbox options', () => {
      beforeEach(() => {
        document.querySelectorAll('.checkbox-dropdown-item-checkbox')[1].querySelector('input[type="checkbox"]').click();
        document.querySelectorAll('.checkbox-dropdown-item-checkbox')[2].querySelector('input[type="checkbox"]').click();
        document.querySelectorAll('.checkbox-dropdown-item-checkbox')[3].querySelector('input[type="checkbox"]').click();
      });

      it('the title changes to show "NONE"', () => {
        expect(document.querySelector('.dropdown > button')).toHaveText('NONE');
      });

      it('will unselect the "ALL" checkbox', () => {
        expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[0].querySelector('input[type="checkbox"]').checked).toBeFalsy();
        expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[1].querySelector('input[type="checkbox"]').checked).toBeFalsy();
        expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[2].querySelector('input[type="checkbox"]').checked).toBeFalsy();
        expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[3].querySelector('input[type="checkbox"]').checked).toBeFalsy();
      });

      describe('reselecting the unchecked checkbox options', () => {
        beforeEach(() => {
          document.querySelectorAll('.checkbox-dropdown-item-checkbox')[1].querySelector('input[type="checkbox"]').click();
          document.querySelectorAll('.checkbox-dropdown-item-checkbox')[2].querySelector('input[type="checkbox"]').click();
          document.querySelectorAll('.checkbox-dropdown-item-checkbox')[3].querySelector('input[type="checkbox"]').click();
        });

        it('the title text displays "ALL"', () => {
          expect(document.querySelector('.dropdown > button')).toHaveText('ALL');
        });

        it('will reselect all the checkboxes', () => {
          expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[0].querySelector('input[type="checkbox"]').checked).toBeTruthy();
          expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[1].querySelector('input[type="checkbox"]').checked).toBeTruthy();
          expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[2].querySelector('input[type="checkbox"]').checked).toBeTruthy();
          expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[3].querySelector('input[type="checkbox"]').checked).toBeTruthy();
        });
      });

      describe('reselecting the "ALL" checkbox option', () => {
        beforeEach(() => {
          document.querySelectorAll('.checkbox-dropdown-item-checkbox')[0].querySelector('input[type="checkbox"]').click();
        });

        it('the title text displays "ALL"', () => {
          expect(document.querySelector('.dropdown > button')).toHaveText('ALL');
        });

        it('will reselect all the checkboxes', () => {
          expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[0].querySelector('input[type="checkbox"]').checked).toBeTruthy();
          expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[1].querySelector('input[type="checkbox"]').checked).toBeTruthy();
          expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[2].querySelector('input[type="checkbox"]').checked).toBeTruthy();
          expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[3].querySelector('input[type="checkbox"]').checked).toBeTruthy();
        });
      });
    });

    describe('unselecting the "ALL" checkbox option', () => {
      beforeEach(() => {
        document.querySelectorAll('.checkbox-dropdown-item-checkbox')[0].querySelector('input[type="checkbox"]').click();
      });

      it('the title changes to show "NONE"', () => {
        expect(document.querySelector('.dropdown > button')).toHaveText('NONE');
      });

      it('will unselect all checkboxes', () => {
        expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[0].querySelector('input[type="checkbox"]').checked).toBeFalsy();
        expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[1].querySelector('input[type="checkbox"]').checked).toBeFalsy();
        expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[2].querySelector('input[type="checkbox"]').checked).toBeFalsy();
        expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[3].querySelector('input[type="checkbox"]').checked).toBeFalsy();
      });

      describe('reselecting any checkbox options', () => {
        beforeEach(() => {
          document.querySelectorAll('.checkbox-dropdown-item-checkbox')[2].querySelector('input[type="checkbox"]').click();
          document.querySelectorAll('.checkbox-dropdown-item-checkbox')[3].querySelector('input[type="checkbox"]').click();
        });

        it('the title changes to show the selected options', () => {
          expect(document.querySelector('.dropdown > button')).toHaveText('item #2, item #3');
        });

        it('will reselect some of the checkboxes', () => {
          expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[0].querySelector('input[type="checkbox"]').checked).toBeFalsy();
          expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[1].querySelector('input[type="checkbox"]').checked).toBeFalsy();
          expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[2].querySelector('input[type="checkbox"]').checked).toBeTruthy();
          expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[3].querySelector('input[type="checkbox"]').checked).toBeTruthy();
        });
      });

      describe('reselecting the "ALL" checkbox option', () => {
        beforeEach(() => {
          document.querySelectorAll('.checkbox-dropdown-item-checkbox')[0].querySelector('input[type="checkbox"]').click();
        });

        it('the title changes to show "ALL"', () => {
          expect(document.querySelector('.dropdown > button')).toHaveText('ALL');
        });

        it('will reselect all the checkboxes', () => {
          expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[0].querySelector('input[type="checkbox"]').checked).toBeTruthy();
          expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[1].querySelector('input[type="checkbox"]').checked).toBeTruthy();
          expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[2].querySelector('input[type="checkbox"]').checked).toBeTruthy();
          expect(document.querySelectorAll('.checkbox-dropdown-item-checkbox')[3].querySelector('input[type="checkbox"]').checked).toBeTruthy();
        });
      });
    });

    describe('when interacting with the checkboxes', () => {
      let testableFn;
      beforeEach(() => {
        testableFn = jasmine.createSpy('testableFn');
        subject::setProps({onChange: testableFn});
        document.querySelectorAll('.checkbox-dropdown-item-checkbox')[2].querySelector('input[type="checkbox"]').click();
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
        document.querySelectorAll('.pui-checkbox-label')[2].click();
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

  describe('when there is a custom title', () => {
    let labels;
    let title;

    beforeEach(() => {
      labels = ['item #1', 'item #2', 'item #3'];
      title = (options) => {
        const selected = Object.keys(options).filter(key => options[key])
        if (selected.length > 0) {
          return `Selected (${selected.length})`
        }
        return ''
      }
      subject = ReactDOM.render(<CheckboxDropdown labels={labels} title={title}/>, root);
    });

    it('the title text displays "ALL" when all are clicked', () => {
      expect(document.querySelector('.dropdown > button')).toHaveText('ALL');
    });

    describe('when all are unclicked', () => {
      beforeEach(() => {
        document.querySelectorAll('.checkbox-dropdown-item-checkbox')[1].querySelector('input[type="checkbox"]').click();
        document.querySelectorAll('.checkbox-dropdown-item-checkbox')[2].querySelector('input[type="checkbox"]').click();
        document.querySelectorAll('.checkbox-dropdown-item-checkbox')[3].querySelector('input[type="checkbox"]').click();
      });

      it('the title changes to show "NONE"', () => {
        expect(document.querySelector('.dropdown > button')).toHaveText('NONE');
      })
    });

    describe('when some items are selected', () => {
      beforeEach(() => {
        document.querySelectorAll('.checkbox-dropdown-item-checkbox')[2].querySelector('input[type="checkbox"]').click();
      });

      it('the title changes to show the custom text when some items are selected ', () => {
        expect(document.querySelector('.dropdown > button')).toHaveText('Selected (2)');
      });
    })
  });
});