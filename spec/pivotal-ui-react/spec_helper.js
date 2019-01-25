import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import MockNextTick from './support/mock_next_tick';
import MockPromises from 'mock-promises';
import jQuery from 'jquery';
import MockNow from 'performance-now';
import MockRaf from 'raf';
import './support/bluebird';
import './support/set_immediate';
import 'pivotal-js-jasmine-matchers';
import 'react-spy-on-render';
import ReactTestUtils from 'react-dom/test-utils';
import stringifier from 'stringifier';
import ReactTestHelpers from 'pivotal-js-react-test-helpers';

const {spyOnRender, ...reactTestHelpers} = ReactTestHelpers;
const {DiffBuilder} = jasmine;

export const findByClass = ReactTestUtils.findRenderedDOMComponentWithClass;
export const findAllByClass = ReactTestUtils.scryRenderedDOMComponentsWithClass;
export const findByTag = ReactTestUtils.findRenderedDOMComponentWithTag;
export const findAllByTag = ReactTestUtils.scryRenderedDOMComponentsWithTag;
export const clickOn = ReactTestUtils.Simulate.click;

beforeAll(() => {
  jasmine.addMatchers({
    toHaveStyle(util, customEqualityTesters) {
      return {
        compare: function (actual, expected) {
          const {style} = jQuery(actual)[0];
          const actualStyle = {};
          for (let i = 0; i < style.length; i++) {
            actualStyle[style[i]] = style[style[i]];
          }

          const expectedStyle = Object.entries(expected).reduce((memo, [key, value]) => {
            key = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
            return {...memo, [key]: `${value}`};
          }, {});

          const diffBuilder = new DiffBuilder();
          const pass = util.equals(actualStyle, expectedStyle, customEqualityTesters, diffBuilder);
          const message = pass
            ? `Expected style not to match, but it did:\n${JSON.stringify(actualStyle, null, 2)}`
            : `Element style did not match expectations.\n${diffBuilder.getMessage()}`;

          return {pass, message};
        }
      };
    }
  });
});

MockNextTick.install();

delete ReactTestUtils.renderIntoDocument;

jasmine.pp = function (obj) {
  const stringifierInstance = stringifier({maxDepth: 5, indent: '  '});
  return stringifierInstance(obj);
};

jasmine.getEnv().configure({
  random: false
});

Object.assign(global, {
  jQuery,
  MockNextTick,
  MockNow,
  MockPromises,
  $: jQuery,
  MockRaf,
  React,
  ReactDOM,
  ReactTestUtils,
  ...reactTestHelpers
});

global.shallowRender = jsx => {
  const shallowRenderer = ReactTestUtils.createRenderer();
  shallowRenderer.render(jsx);
  return shallowRenderer.getRenderOutput();
};

global.setProps = function setProps(props, node = root) {
  const Component = this.constructor;
  ReactDOM.render(<Component {...this.props} {...props}/>, node);
};

beforeEach(() => {
  $('body').find('#root').remove().end().append('<main id="root"/>');
  jasmine.clock().install();
  MockPromises.install(Promise);
});

beforeEach(() => {
  const consoleWarn = console.warn;
  console.warn = message => {
    if (message.match(/Failed propType/)) {
      throw new Error(message);
    } else {
      consoleWarn.apply(console, arguments);
    }
  };
});

afterEach(() => {
  ReactDOM.unmountComponentAtNode(root);
  MockNextTick.next();
  jasmine.clock().tick(1);
  jasmine.clock().uninstall();
  MockPromises.contracts.reset();
  MockPromises.uninstall();
  MockNow.reset();
  MockRaf.reset();
});
