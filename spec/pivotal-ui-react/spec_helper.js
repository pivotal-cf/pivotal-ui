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
import ReactTestUtils from 'react-dom/test-utils';
import stringifier from 'stringifier';

export const findByClass = ReactTestUtils.findRenderedDOMComponentWithClass;
export const findAllByClass = ReactTestUtils.scryRenderedDOMComponentsWithClass;
export const findByTag = ReactTestUtils.findRenderedDOMComponentWithTag;
export const findAllByTag = ReactTestUtils.scryRenderedDOMComponentsWithTag;
export const clickOn = ReactTestUtils.Simulate.click;

MockNextTick.install();

delete ReactTestUtils.renderIntoDocument;

jasmine.pp = function(obj) {
  const stringifierInstance = stringifier({maxDepth: 5, indent: '  '});
  return stringifierInstance(obj);
};

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
  ...require('pivotal-js-react-test-helpers')
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
