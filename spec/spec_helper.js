require('babel-polyfill');

import './support/matchers/jest_dom';
import jQuery from 'jquery';
import React from 'react';
import {testRender, testReset} from './support/matchers/jest_react';

function spyOnRender(componentClass, returnValue = null) {
  return jest.spyOn(componentClass.prototype, 'render').mockReturnValue(returnValue);
}

const globals = {
  $: jQuery,
  React,
  testRender,
  spyOnRender
};

Object.assign(global, globals);

afterEach(() => {
  testReset();
  jest.clearAllMocks();
});

afterAll(() => {
  Object.keys(globals).forEach(key => delete global[key]);
});