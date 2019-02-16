import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Select} from '../../../src/react/select';

jest.useFakeTimers();

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
      expect('input').toHaveAttr('type', 'hidden');
      expect('input').toHaveAttr('name', 'myName');
      expect('input').toHaveValue('defaultValue');
    });

    it('passes through className to the select', () => {
      expect('.select').toHaveClass('myClassName');
    });

    it('passes through style to the select', () => {
      expect('.select').toHaveCss({opacity: '0.5'});
    });

    it('passes through id to the select', () => {
      expect('.select').toHaveAttr('id', 'test-id');
    });

    it('creates a select-toggle with a double arrow', () => {
      expect('.select-toggle .icon-select_chevrons').toExist();
    });

    it('shows the default value in the toggle', () => {
      expect('.select-toggle').toHaveText('defaultValue');
    });

    it('shows the select menu on click', () => {
      $('.select-toggle').simulate('click');

      const menu = $('.select-menu')[0];
      expect(menu.parentNode).toHaveClass('open');
    });

    it('hides the menu when clicking outside the select', () => {
      $('.select-toggle').simulate('click');

      const evt = document.createEvent('HTMLEvents');
      evt.initEvent('click', true, true);
      document.documentElement.dispatchEvent(evt);

      const menu = $('.select-menu')[0];
      expect(menu.parentNode).not.toHaveClass('open');
    });

    it('hides the menu when clicking the select again', () => {
      $('.select-toggle').simulate('click');
      $('.select-toggle').simulate('click');

      const menu = $('.select-menu')[0];
      expect(menu.parentNode).not.toHaveClass('open');
    });

    it('calls onEntered when opening', () => {
      $('.select-toggle').simulate('click');

      expect(onEnteredSpy).toHaveBeenCalled();
    });

    it('calls onExited when closing', () => {
      $('.select-toggle').simulate('click');
      $('.select-toggle').simulate('click');

      expect(onExitedSpy).toHaveBeenCalled();
    });

    describe('when selecting an option', () => {
      beforeEach(() => {
        $('.select-toggle').simulate('click');
        $('.option:eq(1)').simulate('click');
      });

      it('calls then onChange callback', () => {
        expect(onChangeSpy).toHaveBeenCalledWith(jasmine.any(Object), 'one');
      });

      it('updates the selected value', () => {
        expect('.select-toggle-label').toHaveText('one');
        expect('input').toHaveAttr('type', 'hidden');
        expect('input').toHaveValue('one');
      });

      it('closes the menu', () => {
        const menu = $('.select-menu')[0];
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
      $('.select-toggle').simulate('click');
      jest.advanceTimersByTime(1);

      expect('.select-toggle-label').toHaveText('the default');
      expect('input').toHaveAttr('type', 'hidden');
      expect('input').toHaveValue('defaultValue');
    });

    it('renders the options', () => {
      expect('.option:eq(0)').toHaveText('the default');
      expect('.option:eq(1)').toHaveText('one');
      expect('.option:eq(2)').toHaveText('two');
    });
  });

  describe('when the select is given a value', () => {
    it('shows the value', () => {
      result = renderComponent({value: 'my value', options: ['anOption']});

      expect('.select-toggle-label').toHaveText('my value');
    });
  });
});
