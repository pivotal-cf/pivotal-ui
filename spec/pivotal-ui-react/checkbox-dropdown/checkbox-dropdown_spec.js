import '../spec_helper';
import {CheckboxDropdown} from '../../../src/react/checkbox-dropdown';

describe('checkbox dropdown', () => {
  let subject;

  beforeEach(() => {
    subject = shallow(<CheckboxDropdown labels={['item #1', 'item #2', 'item #3']} />);
  });

  describe('on initial render', () => {
    it('on initialization state.open is false', () => {
      expect(subject.state.open).not.toExist();
    });

    it('renders the items passed in props', () => {
      expect($('.checkbox-dropdown-item-checkbox:eq(0)').text()).toBe('ALL');
      expect($('.checkbox-dropdown-item-checkbox:eq(1)').text()).toBe('item #1');
      expect($('.checkbox-dropdown-item-checkbox:eq(2)').text()).toBe('item #2');
      expect($('.checkbox-dropdown-item-checkbox:eq(3)').text()).toBe('item #3');
    });

    it('renders the items with labels and labelClassNames', () => {
      expect($('.pui-checkbox-label:eq(0)').hasClass('pui-checkbox-dropdown-item-label')).toBeTruthy();
      expect($('.pui-checkbox-label:eq(1)').hasClass('pui-checkbox-dropdown-item-label')).toBeTruthy();
      expect($('.pui-checkbox-label:eq(2)').hasClass('pui-checkbox-dropdown-item-label')).toBeTruthy();
      expect($('.pui-checkbox-label:eq(3)').hasClass('pui-checkbox-dropdown-item-label')).toBeTruthy();
    });

    it('has the text "ALL"', () => {
      expect($('.dropdown > button').text()).toBe('ALL');
    });

    it('all the checkboxes are checked', () => {
      expect($('.checkbox-dropdown-item-checkbox:eq(0) input[type="checkbox"]')[0].checked.exists()).toBeTruthy();
      expect($('.checkbox-dropdown-item-checkbox:eq(1) input[type="checkbox"]')[0].checked.exists()).toBeTruthy();
      expect($('.checkbox-dropdown-item-checkbox:eq(2) input[type="checkbox"]')[0].checked.exists()).toBeTruthy();
      expect($('.checkbox-dropdown-item-checkbox:eq(3) input[type="checkbox"]')[0].checked.exists()).toBeTruthy();
    });

    it('initializes the state to true for all the options', () => {
      expect(Object.values(subject.state.options).every(val => val).exists()).toBeTruthy();
    });

    it('all selected returns true', () => {
      expect(subject.allSelected().exists()).toBeTruthy();
    });
  });

  describe('unselecting a checkbox option', () => {
    beforeEach(() => {
      $('.checkbox-dropdown-item-checkbox:eq(2) input[type="checkbox"]').click();
    });

    it('the title changes to show the selected options', () => {
      expect($('.dropdown > button').text()).toBe('item #1, item #3');
    });

    it('will unselect the "ALL" checkbox', () => {
      expect($('.checkbox-dropdown-item-checkbox:eq(0) input[type="checkbox"]')[0].checked).not.toExist();
      expect($('.checkbox-dropdown-item-checkbox:eq(1) input[type="checkbox"]')[0].checked.exists()).toBeTruthy();
      expect($('.checkbox-dropdown-item-checkbox:eq(2) input[type="checkbox"]')[0].checked).not.toExist();
      expect($('.checkbox-dropdown-item-checkbox:eq(3) input[type="checkbox"]')[0].checked.exists()).toBeTruthy();
    });

    describe('reselecting the checkbox option', () => {
      beforeEach(() => {
        $('.checkbox-dropdown-item-checkbox:eq(2) input[type="checkbox"]').click();
      });

      it('the title text displays "ALL"', () => {
        expect($('.dropdown > button').text()).toBe('ALL');
      });

      it('will reselect the all checkboxes', () => {
        expect($('.checkbox-dropdown-item-checkbox:eq(0) input[type="checkbox"]')[0].checked.exists()).toBeTruthy();
        expect($('.checkbox-dropdown-item-checkbox:eq(1) input[type="checkbox"]')[0].checked.exists()).toBeTruthy();
        expect($('.checkbox-dropdown-item-checkbox:eq(2) input[type="checkbox"]')[0].checked.exists()).toBeTruthy();
        expect($('.checkbox-dropdown-item-checkbox:eq(3) input[type="checkbox"]')[0].checked.exists()).toBeTruthy();
      });
    });

    describe('reselecting the "ALL" checkbox option', () => {
      beforeEach(() => {
        $('.checkbox-dropdown-item-checkbox:eq(0) input[type="checkbox"]').click();
      });

      it('the title text displays "ALL"', () => {
        expect($('.dropdown > button').text()).toBe('ALL');
      });

      it('will reselect the all checkboxes', () => {
        expect($('.checkbox-dropdown-item-checkbox:eq(0) input[type="checkbox"]')[0].checked.exists()).toBeTruthy();
        expect($('.checkbox-dropdown-item-checkbox:eq(1) input[type="checkbox"]')[0].checked.exists()).toBeTruthy();
        expect($('.checkbox-dropdown-item-checkbox:eq(2) input[type="checkbox"]')[0].checked.exists()).toBeTruthy();
        expect($('.checkbox-dropdown-item-checkbox:eq(3) input[type="checkbox"]')[0].checked.exists()).toBeTruthy();
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
      expect($('.dropdown > button').text()).toBe('NONE');
    });

    it('will unselect the "ALL" checkbox', () => {
      expect($('.checkbox-dropdown-item-checkbox:eq(0) input[type="checkbox"]')[0].checked).not.toExist();
      expect($('.checkbox-dropdown-item-checkbox:eq(1) input[type="checkbox"]')[0].checked).not.toExist();
      expect($('.checkbox-dropdown-item-checkbox:eq(2) input[type="checkbox"]')[0].checked).not.toExist();
      expect($('.checkbox-dropdown-item-checkbox:eq(3) input[type="checkbox"]')[0].checked).not.toExist();
    });

    describe('reselecting the unchecked checkbox options', () => {
      beforeEach(() => {
        $('.checkbox-dropdown-item-checkbox:eq(1) input[type="checkbox"]').click();
        $('.checkbox-dropdown-item-checkbox:eq(2) input[type="checkbox"]').click();
        $('.checkbox-dropdown-item-checkbox:eq(3) input[type="checkbox"]').click();
      });

      it('the title text displays "ALL"', () => {
        expect($('.dropdown > button').text()).toBe('ALL');
      });

      it('will reselect all the checkboxes', () => {
        expect($('.checkbox-dropdown-item-checkbox:eq(0) input[type="checkbox"]')[0].checked.exists()).toBeTruthy();
        expect($('.checkbox-dropdown-item-checkbox:eq(1) input[type="checkbox"]')[0].checked.exists()).toBeTruthy();
        expect($('.checkbox-dropdown-item-checkbox:eq(2) input[type="checkbox"]')[0].checked.exists()).toBeTruthy();
        expect($('.checkbox-dropdown-item-checkbox:eq(3) input[type="checkbox"]')[0].checked.exists()).toBeTruthy();
      });
    });

    describe('reselecting the "ALL" checkbox option', () => {
      beforeEach(() => {
        $('.checkbox-dropdown-item-checkbox:eq(0) input[type="checkbox"]').click();
      });

      it('the title text displays "ALL"', () => {
        expect($('.dropdown > button').text()).toBe('ALL');
      });

      it('will reselect all the checkboxes', () => {
        expect($('.checkbox-dropdown-item-checkbox:eq(0) input[type="checkbox"]')[0].checked.exists()).toBeTruthy();
        expect($('.checkbox-dropdown-item-checkbox:eq(1) input[type="checkbox"]')[0].checked.exists()).toBeTruthy();
        expect($('.checkbox-dropdown-item-checkbox:eq(2) input[type="checkbox"]')[0].checked.exists()).toBeTruthy();
        expect($('.checkbox-dropdown-item-checkbox:eq(3) input[type="checkbox"]')[0].checked.exists()).toBeTruthy();
      });
    });
  });

  describe('unselecting the "ALL" checkbox option', () => {
    beforeEach(() => {
      $('.checkbox-dropdown-item-checkbox:eq(0) input[type="checkbox"]').click();
    });

    it('the title changes to show "NONE"', () => {
      expect($('.dropdown > button').text()).toBe('NONE');
    });

    it('will unselect all checkboxes', () => {
      expect($('.checkbox-dropdown-item-checkbox:eq(0) input[type="checkbox"]')[0].checked).not.toExist();
      expect($('.checkbox-dropdown-item-checkbox:eq(1) input[type="checkbox"]')[0].checked).not.toExist();
      expect($('.checkbox-dropdown-item-checkbox:eq(2) input[type="checkbox"]')[0].checked).not.toExist();
      expect($('.checkbox-dropdown-item-checkbox:eq(3) input[type="checkbox"]')[0].checked).not.toExist();
    });

    describe('reselecting any checkbox options', () => {
      beforeEach(() => {
        $('.checkbox-dropdown-item-checkbox:eq(2) input[type="checkbox"]').click();
        $('.checkbox-dropdown-item-checkbox:eq(3) input[type="checkbox"]').click();
      });

      it('the title changes to show the selected options', () => {
        expect($('.dropdown > button').text()).toBe('item #2, item #3');
      });

      it('will reselect some of the checkboxes', () => {
        expect($('.checkbox-dropdown-item-checkbox:eq(0) input[type="checkbox"]')[0].checked).not.toExist();
        expect($('.checkbox-dropdown-item-checkbox:eq(1) input[type="checkbox"]')[0].checked).not.toExist();
        expect($('.checkbox-dropdown-item-checkbox:eq(2) input[type="checkbox"]')[0].checked.exists()).toBeTruthy();
        expect($('.checkbox-dropdown-item-checkbox:eq(3) input[type="checkbox"]')[0].checked.exists()).toBeTruthy();
      });
    });

    describe('reselecting the "ALL" checkbox option', () => {
      beforeEach(() => {
        $('.checkbox-dropdown-item-checkbox:eq(0) input[type="checkbox"]').click();
      });

      it('the title changes to show "ALL"', () => {
        expect($('.dropdown > button').text()).toBe('ALL');
      });

      it('will reselect all the checkboxes', () => {
        expect($('.checkbox-dropdown-item-checkbox:eq(0) input[type="checkbox"]')[0].checked.exists()).toBeTruthy();
        expect($('.checkbox-dropdown-item-checkbox:eq(1) input[type="checkbox"]')[0].checked.exists()).toBeTruthy();
        expect($('.checkbox-dropdown-item-checkbox:eq(2) input[type="checkbox"]')[0].checked.exists()).toBeTruthy();
        expect($('.checkbox-dropdown-item-checkbox:eq(3) input[type="checkbox"]')[0].checked.exists()).toBeTruthy();
      });
    });
  });

  describe('when interacting with the checkboxes', () => {
    let testableFn;
    beforeEach(() => {
      testableFn = jest.fn();
      subject.setProps({onChange: testableFn});
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
      onChange = jest.fn();
      subject.setProps({onChange});
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