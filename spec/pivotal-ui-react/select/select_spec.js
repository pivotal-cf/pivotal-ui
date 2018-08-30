import '../spec_helper';

import {Select} from '../../../src/react/select';
import {findByClass, findAllByClass, findByTag, clickOn} from '../spec_helper';

describe('Select', () => {
  let result, onChangeSpy, onEnteredSpy, onExitedSpy, subject;

  const renderComponent = props => subject = shallow(<Select {...props}/>);

  describe('basic rendering and behavior', () => {
    beforeEach(() => {
      onChangeSpy = jest.fn().mockName('onChange');
      onEnteredSpy = jest.fn().mockName('onEntered');
      onExitedSpy = jest.fn().mockName('onExited');
      result = renderComponent({
        className: 'myClassName',
        name: 'myName',
        style: {opacity: 0.5},
        id: 'test-id',
        defaultValue: 'defaultValue',
        onChange: onChangeSpy,
        onEntered: onEnteredSpy,
        onExited: onExitedSpy,
        options: ['defaultValue', 'one', 'two']
      });
    });

    it('renders a hidden input with the defaultValue', () => {
      const input = result.find('input');

      expect(subject.find(input).prop('type')).toBe('hidden');
      expect(subject.find(input).prop('name')).toBe('myName');
      expect(subject.find(input).prop('value')).toBe('defaultValue');
    });

    it('passes through className to the select', () => {
      const toggle = result.find('.select');
      expect(subject.find(toggle).hasClass('myClassName')).toBeTruthy();
    });

    it('passes through style to the select', () => {
      const toggle = result.find('.select');
      expect(subject.find(toggle).prop('style')).toEqual({opacity: '0.5'});
    });

    it('passes through id to the select', () => {
      const toggle = result.find('.select');
      expect(subject.find(toggle).prop('id')).toBe('test-id');
    });

    it('creates a select-toggle with a double arrow', () => {
      expect(subject.find('.select-toggle .icon-select_chevrons').exists()).toBeTruthy();
    });

    it('shows the default value in the toggle', () => {
      const toggle = result.find('.select-toggle');
      expect(subject.find(toggle).text()).toBe('defaultValue');
    });

    it('shows the select menu on click', () => {
      const toggle = result.find('.select-toggle');
      toggle.simulate('click', fakeEvent);

      const menu = result.find('.select-menu');
      expect(subject.find(menu.parentNode).hasClass('open')).toBeTruthy();
    });

    it('hides the menu when clicking outside the select', () => {
      const toggle = result.find('.select-toggle');
      toggle.simulate('click', fakeEvent);

      const evt = document.createEvent('HTMLEvents');
      evt.initEvent('click', true, true);
      document.documentElement.dispatchEvent(evt);

      const menu = result.find('.select-menu');
      expect(subject.find(menu.parentNode).hasClass('open')).toBeFalsy();
    });

    it('hides the menu when clicking the select again', () => {
      const toggle = result.find('.select-toggle');
      toggle.simulate('click', fakeEvent);
      toggle.simulate('click', fakeEvent);

      const menu = result.find('.select-menu');
      expect(subject.find(menu.parentNode).hasClass('open')).toBeFalsy();
    });

    it('calls onEntered when opening', () => {
      const toggle = result.find('.select-toggle');
      toggle.simulate('click', fakeEvent);

      expect(onEnteredSpy).toHaveBeenCalled();
    });

    it('calls onExited when closing', () => {
      const toggle = result.find('.select-toggle');
      toggle.simulate('click', fakeEvent);
      toggle.simulate('click', fakeEvent);

      expect(onExitedSpy).toHaveBeenCalled();
    });

    describe('when selecting an option', () => {
      beforeEach(() => {
        const toggle = result.find('.select-toggle');
        toggle.simulate('click', fakeEvent);

        const optionOne = findAllByClass(result, 'option')[1];
        optionOne.simulate('click', fakeEvent);
      });

      it('calls then onChange callback', () => {
        expect(onChangeSpy).toHaveBeenCalledWith(expect.any(Object), 'one');
      });

      it('updates the selected value', () => {
        expect(result.find('.select-toggle-label').text()).toBe('one');
        const input = result.find('input');
        expect(subject.find(input).prop('type')).toBe('hidden');
        expect(subject.find(input).prop('value')).toBe('one');
      });

      it('closes the menu', () => {
        const menu = result.find('.select-menu');
        expect(subject.find(menu.parentNode).hasClass('open')).toBeFalsy();
      });
    });
  });

  describe('when the options array has objects', () => {
    beforeEach(() => {
      result = renderComponent({
        defaultValue: 'defaultValue',
        options: [
          {label: 'the default', value: 'defaultValue'},
          {label: 'one', value: 1},
          {label: 'two', value: 2}]
      });
    });

    it('sets the value of the select and the label of the toggle', () => {
      result.find('.select-toggle').simulate('click', fakeEvent);
      jasmine.clock().tick(1);

      expect(result.find('.select-toggle-label').text()).toBe('the default');
      const input = result.find('input');
      expect(subject.find(input).prop('type')).toBe('hidden');
      expect(subject.find(input).prop('value')).toBe('defaultValue');
    });

    it('renders the options', () => {
      const options = findAllByClass(result, 'option');
      expect(subject.find(options[0]).text()).toBe('the default');
      expect(subject.find(options[1]).text()).toBe('one');
      expect(subject.find(options[2]).text()).toBe('two');
    });
  });

  describe('when the select is given a value', () => {
    it('shows the value', () => {
      result = renderComponent({value: 'my value', options: ['anOption']});

      expect(result.find('.select-toggle-label').text()).toBe('my value');
    });
  });
});
