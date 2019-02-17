import React from 'react';
import ReactDOM from 'react-dom';
import {setProps} from '../../support/jest-helpers';
import {Svg} from '../../../src/react/svg';
import ReactDOMServer from 'react-dom/server';

describe('Svg', () => {
  let subject, MySvg;

  beforeEach(() => {
    MySvg = class extends Svg {
      svgPathLoader(src) {
        return props => (
          <svg x="0px" y="0px" viewBox="0 0 225 225" {...props}>
            <path/>
          </svg>
        );
      }
    };

    subject = ReactDOM.render(<MySvg src="search"/>, root);
  });

  it('renders an svg', () => {
    expect('svg').toExist();
    expect('svg path').toExist();
  });

  it('renders the svg with the html attributes', () => {
    expect('svg').toHaveAttr('x', '0px');
    expect('svg').toHaveAttr('y', '0px');
    expect('svg').toHaveAttr('viewBox', '0 0 225 225');
  });

  describe('when there are props on the svg', () => {
    it('overrides the html attributes', () => {
      subject::setProps({x: '10px', y: '20px'});
      expect('svg').toHaveAttr('x', '10px');
      expect('svg').toHaveAttr('y', '20px');
    });
  });

  it('works on a server', () => {
    const markup = ReactDOMServer.renderToStaticMarkup(<MySvg className="im-on-a-server" src="foo"/>);
    expect(markup).toEqual('<svg class="im-on-a-server"></svg>');
  });

  describe('when updating the src prop', () => {
    beforeEach(() => {
      spyOn(Svg.prototype, 'setComponent');
      subject::setProps({src: 'add'});
    });

    it('updates the Component state', () => {
      expect(Svg.prototype.setComponent).toHaveBeenCalledWith({src: 'add'});
    });
  });
});
