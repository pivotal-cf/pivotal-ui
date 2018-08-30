import '../spec_helper';
import {CheckboxDropdown} from '../../../src/react/checkbox-dropdown';

describe('checkbox dropdown', () => {
  let subject;

  beforeEach(() => {
    subject = shallow(<CheckboxDropdown labels={['item #1', 'item #2', 'item #3']} />);
  });

  describe('on initial render', () => {
    it('on initialization state.open is false', () => {
      expect(subject.state.open).toBeFalsy();
    });

    it('renders the items passed in props', () => {
      expect(subject.find(subject.find('.checkbox-dropdown-item-checkbox').at(0)).text()).toBe('ALL');
      expect(subject.find(subject.find('.checkbox-dropdown-item-checkbox').at(1)).text()).toBe('item #1');
      expect(subject.find(subject.find('.checkbox-dropdown-item-checkbox').at(2)).text()).toBe('item #2');
      expect(subject.find(subject.find('.checkbox-dropdown-item-checkbox').at(3)).text()).toBe('item #3');
    });

    it('renders the items with labels and labelClassNames', () => {
      expect(subject.find(subject.find('.pui-checkbox-label').at(0)).hasClass('pui-checkbox-dropdown-item-label')).toBeTruthy();
      expect(subject.find(subject.find('.pui-checkbox-label').at(1)).hasClass('pui-checkbox-dropdown-item-label')).toBeTruthy();
      expect(subject.find(subject.find('.pui-checkbox-label').at(2)).hasClass('pui-checkbox-dropdown-item-label')).toBeTruthy();
      expect(subject.find(subject.find('.pui-checkbox-label').at(3)).hasClass('pui-checkbox-dropdown-item-label')).toBeTruthy();
    });

    it('has the text "ALL"', () => {
      expect(subject.find(subject.find('.dropdown > button')).text()).toBe('ALL');
    });

    it('all the checkboxes are checked', () => {
      expect(subject.find('.checkbox-dropdown-item-checkbox').at(0).find('input[type="checkbox"]')[0].checked).toBeTruthy();
      expect(subject.find('.checkbox-dropdown-item-checkbox').at(1).find('input[type="checkbox"]')[0].checked).toBeTruthy();
      expect(subject.find('.checkbox-dropdown-item-checkbox').at(2).find('input[type="checkbox"]')[0].checked).toBeTruthy();
      expect(subject.find('.checkbox-dropdown-item-checkbox').at(3).find('input[type="checkbox"]')[0].checked).toBeTruthy();
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
      subject.find('.checkbox-dropdown-item-checkbox').at(2).find('input[type="checkbox"]').simulate('click');
    });

    it('the title changes to show the selected options', () => {
      expect(subject.find(subject.find('.dropdown > button')).text()).toBe('item #1, item #3');
    });

    it('will unselect the "ALL" checkbox', () => {
      expect(subject.find('.checkbox-dropdown-item-checkbox').at(0).find('input[type="checkbox"]')[0].checked).toBeFalsy();
      expect(subject.find('.checkbox-dropdown-item-checkbox').at(1).find('input[type="checkbox"]')[0].checked).toBeTruthy();
      expect(subject.find('.checkbox-dropdown-item-checkbox').at(2).find('input[type="checkbox"]')[0].checked).toBeFalsy();
      expect(subject.find('.checkbox-dropdown-item-checkbox').at(3).find('input[type="checkbox"]')[0].checked).toBeTruthy();
    });

    describe('reselecting the checkbox option', () => {
      beforeEach(() => {
        subject.find('.checkbox-dropdown-item-checkbox').at(2).find('input[type="checkbox"]').simulate('click');
      });

      it('the title text displays "ALL"', () => {
        expect(subject.find(subject.find('.dropdown > button')).text()).toBe('ALL');
      });

      it('will reselect the all checkboxes', () => {
        expect(subject.find('.checkbox-dropdown-item-checkbox').at(0).find('input[type="checkbox"]')[0].checked).toBeTruthy();
        expect(subject.find('.checkbox-dropdown-item-checkbox').at(1).find('input[type="checkbox"]')[0].checked).toBeTruthy();
        expect(subject.find('.checkbox-dropdown-item-checkbox').at(2).find('input[type="checkbox"]')[0].checked).toBeTruthy();
        expect(subject.find('.checkbox-dropdown-item-checkbox').at(3).find('input[type="checkbox"]')[0].checked).toBeTruthy();
      });
    });

    describe('reselecting the "ALL" checkbox option', () => {
      beforeEach(() => {
        subject.find('.checkbox-dropdown-item-checkbox').at(0).find('input[type="checkbox"]').simulate('click');
      });

      it('the title text displays "ALL"', () => {
        expect(subject.find(subject.find('.dropdown > button')).text()).toBe('ALL');
      });

      it('will reselect the all checkboxes', () => {
        expect(subject.find('.checkbox-dropdown-item-checkbox').at(0).find('input[type="checkbox"]')[0].checked).toBeTruthy();
        expect(subject.find('.checkbox-dropdown-item-checkbox').at(1).find('input[type="checkbox"]')[0].checked).toBeTruthy();
        expect(subject.find('.checkbox-dropdown-item-checkbox').at(2).find('input[type="checkbox"]')[0].checked).toBeTruthy();
        expect(subject.find('.checkbox-dropdown-item-checkbox').at(3).find('input[type="checkbox"]')[0].checked).toBeTruthy();
      });
    });
  });

  describe('unselecting all checkbox options', () => {
    beforeEach(() => {
      subject.find('.checkbox-dropdown-item-checkbox').at(1).find('input[type="checkbox"]').simulate('click');
      subject.find('.checkbox-dropdown-item-checkbox').at(2).find('input[type="checkbox"]').simulate('click');
      subject.find('.checkbox-dropdown-item-checkbox').at(3).find('input[type="checkbox"]').simulate('click');
    });

    it('the title changes to show "NONE"', () => {
      expect(subject.find(subject.find('.dropdown > button')).text()).toBe('NONE');
    });

    it('will unselect the "ALL" checkbox', () => {
      expect(subject.find('.checkbox-dropdown-item-checkbox').at(0).find('input[type="checkbox"]')[0].checked).toBeFalsy();
      expect(subject.find('.checkbox-dropdown-item-checkbox').at(1).find('input[type="checkbox"]')[0].checked).toBeFalsy();
      expect(subject.find('.checkbox-dropdown-item-checkbox').at(2).find('input[type="checkbox"]')[0].checked).toBeFalsy();
      expect(subject.find('.checkbox-dropdown-item-checkbox').at(3).find('input[type="checkbox"]')[0].checked).toBeFalsy();
    });

    describe('reselecting the unchecked checkbox options', () => {
      beforeEach(() => {
        subject.find('.checkbox-dropdown-item-checkbox').at(1).find('input[type="checkbox"]').simulate('click');
        subject.find('.checkbox-dropdown-item-checkbox').at(2).find('input[type="checkbox"]').simulate('click');
        subject.find('.checkbox-dropdown-item-checkbox').at(3).find('input[type="checkbox"]').simulate('click');
      });

      it('the title text displays "ALL"', () => {
        expect(subject.find(subject.find('.dropdown > button')).text()).toBe('ALL');
      });

      it('will reselect all the checkboxes', () => {
        expect(subject.find('.checkbox-dropdown-item-checkbox').at(0).find('input[type="checkbox"]')[0].checked).toBeTruthy();
        expect(subject.find('.checkbox-dropdown-item-checkbox').at(1).find('input[type="checkbox"]')[0].checked).toBeTruthy();
        expect(subject.find('.checkbox-dropdown-item-checkbox').at(2).find('input[type="checkbox"]')[0].checked).toBeTruthy();
        expect(subject.find('.checkbox-dropdown-item-checkbox').at(3).find('input[type="checkbox"]')[0].checked).toBeTruthy();
      });
    });

    describe('reselecting the "ALL" checkbox option', () => {
      beforeEach(() => {
        subject.find('.checkbox-dropdown-item-checkbox').at(0).find('input[type="checkbox"]').simulate('click');
      });

      it('the title text displays "ALL"', () => {
        expect(subject.find(subject.find('.dropdown > button')).text()).toBe('ALL');
      });

      it('will reselect all the checkboxes', () => {
        expect(subject.find('.checkbox-dropdown-item-checkbox').at(0).find('input[type="checkbox"]')[0].checked).toBeTruthy();
        expect(subject.find('.checkbox-dropdown-item-checkbox').at(1).find('input[type="checkbox"]')[0].checked).toBeTruthy();
        expect(subject.find('.checkbox-dropdown-item-checkbox').at(2).find('input[type="checkbox"]')[0].checked).toBeTruthy();
        expect(subject.find('.checkbox-dropdown-item-checkbox').at(3).find('input[type="checkbox"]')[0].checked).toBeTruthy();
      });
    });
  });

  describe('unselecting the "ALL" checkbox option', () => {
    beforeEach(() => {
      subject.find('.checkbox-dropdown-item-checkbox').at(0).find('input[type="checkbox"]').simulate('click');
    });

    it('the title changes to show "NONE"', () => {
      expect(subject.find(subject.find('.dropdown > button')).text()).toBe('NONE');
    });

    it('will unselect all checkboxes', () => {
      expect(subject.find('.checkbox-dropdown-item-checkbox').at(0).find('input[type="checkbox"]')[0].checked).toBeFalsy();
      expect(subject.find('.checkbox-dropdown-item-checkbox').at(1).find('input[type="checkbox"]')[0].checked).toBeFalsy();
      expect(subject.find('.checkbox-dropdown-item-checkbox').at(2).find('input[type="checkbox"]')[0].checked).toBeFalsy();
      expect(subject.find('.checkbox-dropdown-item-checkbox').at(3).find('input[type="checkbox"]')[0].checked).toBeFalsy();
    });

    describe('reselecting any checkbox options', () => {
      beforeEach(() => {
        subject.find('.checkbox-dropdown-item-checkbox').at(2).find('input[type="checkbox"]').simulate('click');
        subject.find('.checkbox-dropdown-item-checkbox').at(3).find('input[type="checkbox"]').simulate('click');
      });

      it('the title changes to show the selected options', () => {
        expect(subject.find(subject.find('.dropdown > button')).text()).toBe('item #2, item #3');
      });

      it('will reselect some of the checkboxes', () => {
        expect(subject.find('.checkbox-dropdown-item-checkbox').at(0).find('input[type="checkbox"]')[0].checked).toBeFalsy();
        expect(subject.find('.checkbox-dropdown-item-checkbox').at(1).find('input[type="checkbox"]')[0].checked).toBeFalsy();
        expect(subject.find('.checkbox-dropdown-item-checkbox').at(2).find('input[type="checkbox"]')[0].checked).toBeTruthy();
        expect(subject.find('.checkbox-dropdown-item-checkbox').at(3).find('input[type="checkbox"]')[0].checked).toBeTruthy();
      });
    });

    describe('reselecting the "ALL" checkbox option', () => {
      beforeEach(() => {
        subject.find('.checkbox-dropdown-item-checkbox').at(0).find('input[type="checkbox"]').simulate('click');
      });

      it('the title changes to show "ALL"', () => {
        expect(subject.find(subject.find('.dropdown > button')).text()).toBe('ALL');
      });

      it('will reselect all the checkboxes', () => {
        expect(subject.find('.checkbox-dropdown-item-checkbox').at(0).find('input[type="checkbox"]')[0].checked).toBeTruthy();
        expect(subject.find('.checkbox-dropdown-item-checkbox').at(1).find('input[type="checkbox"]')[0].checked).toBeTruthy();
        expect(subject.find('.checkbox-dropdown-item-checkbox').at(2).find('input[type="checkbox"]')[0].checked).toBeTruthy();
        expect(subject.find('.checkbox-dropdown-item-checkbox').at(3).find('input[type="checkbox"]')[0].checked).toBeTruthy();
      });
    });
  });

  describe('when interacting with the checkboxes', () => {
    let testableFn;
    beforeEach(() => {
      testableFn = jest.fn().mockName('testableFn');
      subject.setProps({onChange: testableFn});
      subject.find('.checkbox-dropdown-item-checkbox').at(2).find('input[type="checkbox"]').simulate('click');
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
      onChange = jest.fn().mockName('onChange');
      subject.setProps({onChange});
      subject.find('.pui-checkbox-label').at(2).simulate('click');
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