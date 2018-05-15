import '../spec_helper';

import {Select} from '../../../src/react/select';
import {findByClass, findAllByClass, findByTag, clickOn} from '../spec_helper';

describe('Select', () => {
  let result, onChangeSpy, onEnteredSpy, onExitedSpy;

  const renderComponent = props => ReactDOM.render(<Select {...props}/>, root);

  describe('basic rendering and behavior', () => {
    beforeEach(() => {
      onChangeSpy = jasmine.createSpy('onChange');
      onEnteredSpy = jasmine.createSpy('onEntered');
      onExitedSpy = jasmine.createSpy('onExited');
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
      const input = findByTag(result, 'input');

      expect(input).toHaveAttr('type', 'hidden');
      expect(input).toHaveAttr('name', 'myName');
      expect(input).toHaveValue('defaultValue');
    });

    it('passes through className to the select', () => {
      const toggle = findByClass(result, 'select');
      expect(toggle).toHaveClass('myClassName');
    });

    it('passes through style to the select', () => {
      const toggle = findByClass(result, 'select');
      expect(toggle).toHaveCss({opacity: '0.5'});
    });

    it('passes through id to the select', () => {
      const toggle = findByClass(result, 'select');
      expect(toggle).toHaveAttr('id', 'test-id');
    });

    it('creates a select-toggle with a double arrow', () => {
      expect('.select-toggle .icon-select_chevrons').toExist();
    });

    it('shows the default value in the toggle', () => {
      const toggle = findByClass(result, 'select-toggle');
      expect(toggle).toHaveText('defaultValue');
    });

    it('shows the select menu on click', () => {
      const toggle = findByClass(result, 'select-toggle');
      clickOn(toggle);

      const menu = findByClass(result, 'select-menu');
      expect(menu.parentNode).toHaveClass('open');
    });

    it('hides the menu when clicking outside the select', () => {
      const toggle = findByClass(result, 'select-toggle');
      clickOn(toggle);

      const evt = document.createEvent('HTMLEvents');
      evt.initEvent('click', true, true);
      document.documentElement.dispatchEvent(evt);

      const menu = findByClass(result, 'select-menu');
      expect(menu.parentNode).not.toHaveClass('open');
    });

    it('hides the menu when clicking the select again', () => {
      const toggle = findByClass(result, 'select-toggle');
      clickOn(toggle);
      clickOn(toggle);

      const menu = findByClass(result, 'select-menu');
      expect(menu.parentNode).not.toHaveClass('open');
    });

    it('calls onEntered when opening', () => {
      const toggle = findByClass(result, 'select-toggle');
      clickOn(toggle);

      expect(onEnteredSpy).toHaveBeenCalled();
    });

    it('calls onExited when closing', () => {
      const toggle = findByClass(result, 'select-toggle');
      clickOn(toggle);
      clickOn(toggle);

      expect(onExitedSpy).toHaveBeenCalled();
    });

    describe('when selecting an option', () => {
      beforeEach(() => {
        const toggle = findByClass(result, 'select-toggle');
        clickOn(toggle);

        const optionOne = findAllByClass(result, 'option')[1];
        clickOn(optionOne);
      });

      it('calls then onChange callback', () => {
        expect(onChangeSpy).toHaveBeenCalledWith(jasmine.any(Object), 'one');
      });

      it('updates the selected value', () => {
        expect(findByClass(result, 'select-toggle-label')).toHaveText('one');
        const input = findByTag(result, 'input');
        expect(input).toHaveAttr('type', 'hidden');
        expect(input).toHaveValue('one');
      });

      it('closes the menu', () => {
        const menu = findByClass(result, 'select-menu');
        expect(menu.parentNode).not.toHaveClass('open');
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
      clickOn(findByClass(result, 'select-toggle'));
      jasmine.clock().tick(1);

      expect(findByClass(result, 'select-toggle-label')).toHaveText('the default');
      const input = findByTag(result, 'input');
      expect(input).toHaveAttr('type', 'hidden');
      expect(input).toHaveValue('defaultValue');
    });

    it('renders the options', () => {
      const options = findAllByClass(result, 'option');
      expect(options[0]).toHaveText('the default');
      expect(options[1]).toHaveText('one');
      expect(options[2]).toHaveText('two');
    });
  });

  describe('when the select is given a value', () => {
    it('shows the value', () => {
      result = renderComponent({value: 'my value', options: ['anOption']});

      expect(findByClass(result, 'select-toggle-label')).toHaveText('my value');
    });
  });
});
