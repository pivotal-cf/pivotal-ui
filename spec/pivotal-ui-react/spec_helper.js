import 'babel-polyfill';
import React from 'react';
// import MockNextTick from './support/mock_next_tick';
// import MockPromises from 'mock-promises';
// import MockNow from 'performance-now';
// import MockRaf from 'raf';
// import './support/bluebird';
// import './support/set_immediate';
import '../support/matchers/jest_dom';
import '../support/react_helper';
import jQuery from 'jquery';
import {testRender, testReset} from '../support/matchers/jest_react';
import {shallow} from 'enzyme';

function spyOnRender(componentClass, returnValue = null) {
  return jest.spyOn(componentClass.prototype, 'render').mockReturnValue(returnValue);
}

Object.assign(global, {
  // jQuery,
  // MockNextTick,
  // MockNow,
  // MockPromises,
  $: jQuery,
  jQuery,
  // MockRaf,
  React,
  testRender,
  spyOnRender,
  shallow
});

beforeEach(() => {
  // MockPromises.install(Promise);
});

afterEach(() => {
  // MockNextTick.next();
  // MockPromises.uninstall();
  testReset();
  jest.clearAllMocks();
});
