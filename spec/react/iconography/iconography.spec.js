import React from 'react';
import ReactDOM from 'react-dom';
import {Icon} from '../../../src/react/iconography';
import * as Icons from '../../../src/react/iconography/icons';

describe('iconography', () => {
  afterEach(() => {
    ReactDOM.unmountComponentAtNode(root);
  });

  it('works', () => {
    ReactDOM.render(<Icon src="add"/>, root);
    expect('.icon svg').toExist();
  });

  it('propagates className and id to the span', () => {
    ReactDOM.render(<Icon src="add" className="foo" id="bar"/>, root);
    expect('.icon').toHaveClass('foo');
    expect('.icon').toHaveAttr('id', 'bar');
  });

  Object.keys(Icons).filter(iconName => {
    return !iconName.startsWith('_') && !iconName.includes('spinner');
  }).forEach(iconName => {
    it(`works with src "${iconName}"`, () => {
      ReactDOM.render(<Icon src={iconName} className="foo" id="bar"/>, root);
      expect('.icon svg').toHaveClass(`icon-${iconName}`);
    });
  });

  describe('spinner icons', () => {
    it('works with src "spinner_lg"', () => {
      ReactDOM.render(<Icon src="spinner_lg" className="foo" id="bar"/>, root);
      expect('.icon svg').toHaveClass('icon-spinner-lg');
    });

    it('works with src "spinner-lg" (for backwards compatibility)', () => {
      ReactDOM.render(<Icon src="spinner-lg" className="foo" id="bar"/>, root);
      expect('.icon svg').toHaveClass('icon-spinner-lg');
    });

    it('works with src "spinner_md"', () => {
      ReactDOM.render(<Icon src="spinner_md" className="foo" id="bar"/>, root);
      expect('.icon svg').toHaveClass('icon-spinner-md');
    });

    it('works with src "spinner-md" (for backwards compatibility)', () => {
      ReactDOM.render(<Icon src="spinner-md" className="foo" id="bar"/>, root);
      expect('.icon svg').toHaveClass('icon-spinner-md');
    });

    it('works with src "spinner_sm"', () => {
      ReactDOM.render(<Icon src="spinner_sm" className="foo" id="bar"/>, root);
      expect('.icon svg').toHaveClass('icon-spinner-sm');
    });

    it('works with src "spinner-sm" (for backwards compatibility)', () => {
      ReactDOM.render(<Icon src="spinner-sm" className="foo" id="bar"/>, root);
      expect('.icon svg').toHaveClass('icon-spinner-sm');
    });
  });

  describe('verticalAlign', () => {
    it('if verticalAlign is not specified it applies the .icon-middle', () => {
      ReactDOM.render(<Icon src="add"/>, root);
      expect('.icon').toHaveClass('icon-middle');
    });

    it('if verticalAlign=baseline it applies the .icon-middle class', () => {
      ReactDOM.render(<Icon src="add" verticalAlign="middle"/>, root);
      expect('.icon').toHaveClass('icon-middle');
    });

    it('if verticalAlign=baseline it applies the .icon-baseline class', () => {
      ReactDOM.render(<Icon src="add" verticalAlign="baseline"/>, root);
      expect('.icon').toHaveClass('icon-baseline');
    });
  });

  describe('unknown icon', () => {
    beforeEach(() => {
      spyOn(console, 'warn');
      ReactDOM.render(<Icon src="non-existing-icon"/>, root);
    });

    it('renders a help', () => {
      expect('.icon .icon-help').toExist();
    });

    it('logs an error message', () => {
      expect(console.warn).toHaveBeenCalledWith('Icon "non-existing-icon" is not recognized.');
    });
  });
});
