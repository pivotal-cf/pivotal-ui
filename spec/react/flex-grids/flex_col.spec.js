import React from 'react';
import ReactDOM from 'react-dom';
import {FlexCol} from '../../../src/react/flex-grids';

describe('FlexCol', () => {
  describe('alignment prop', () => {
    beforeEach(() => {
      ReactDOM.render(<FlexCol alignment="middle" />, root);
    });

    it('applies correct class name', () => {
      expect('.col').toHaveClass('col-align-middle');
    });
  });

  describe('breakpoint prop', () => {
    beforeEach(() => {
      ReactDOM.render(<FlexCol breakpoint="md" />, root);
    });

    it('applies correct class name', () => {
      expect('.col').toHaveClass('col-md');
    });
  });

  describe('col prop', () => {
    beforeEach(() => {
      ReactDOM.render(<FlexCol col={6}/>, root);
    });

    it('applies correct class name', () => {
      expect('.col').toHaveClass('col-6');
    });
  });

  describe('contentAlignment prop', () => {
    beforeEach(() => {
      ReactDOM.render(<FlexCol contentAlignment="middle" />, root);
    });

    it('applies correct class name', () => {
      expect('.col').toHaveClass('col-middle');
    });
  });

  describe('fixed prop', () => {
    beforeEach(() => {
      ReactDOM.render(<FlexCol fixed />, root);
    });

    it('applies correct class name', () => {
      expect('.col').toHaveClass('col-fixed');
    });
  });

  describe('grow prop', () => {
    beforeEach(() => {
      ReactDOM.render(<FlexCol grow={2} />, root);
    });

    it('applies correct class name', () => {
      expect('.col').toHaveClass('col-grow-2');
    });
  });
});
