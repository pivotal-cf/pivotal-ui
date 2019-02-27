import React from 'react';
import ReactDOM from 'react-dom';
import {Input} from '../../../src/react/inputs';
import {setProps} from '../../support/jest-helpers';

describe('Input', () => {
  let subject;

  beforeEach(() => {
    subject = ReactDOM.render(<Input />, root);
  });

  it('renders an HTML input', () => {
    expect('input').toExist();
  });

  describe('when given props', () => {
    beforeEach(() => {
      subject::setProps({
        type: 'password',
        className: 'some-class'
      });
    });

    it('passes the props to the HTML input', () => {
      expect('input').toHaveAttr('type', 'password');
      expect('input').toHaveClass('some-class');
    });
  });

  describe('size = sm', () => {
    beforeEach(() => {
      subject::setProps({size: 'sm'});
    });

    it('has the input-sm class', () => {
      expect('input').toHaveClass('input-sm');
    });
  });

  describe('size = small', () => {
    beforeEach(() => {
      subject::setProps({size: 'small'});
    });

    it('has the input-sm class', () => {
      expect('input').toHaveClass('input-sm');
    });
  });

  describe('size = lg', () => {
    beforeEach(() => {
      subject::setProps({size: 'lg'});
    });

    it('has the input-lg class', () => {
      expect('input').toHaveClass('input-lg');
    });
  });

  describe('size = large', () => {
    beforeEach(() => {
      subject::setProps({size: 'large'});
    });

    it('has the input-lg class', () => {
      expect('input').toHaveClass('input-lg');
    });
  });

  describe('icon', () => {
    beforeEach(() => {
      subject::setProps({icon: 'search'});
    });

    it('renders an input-icon-container', () => {
      expect('.input-icon-container').toExist();
    });

    it('renders an icon', () => {
      expect('.input-icon-container > .icon svg').toHaveClass('icon-search');
    });

    it('renders an input', () => {
      expect('.input-icon-container > input').toExist();
    });
  });
});