import jquery from 'jquery';
import ReactDOM from 'react-dom';
import React from 'react';

require('babel-polyfill');
require('pivotal-js-jasmine-matchers');

const globals = {
  $: jquery,
  ReactDOM,
  React,
  ...require('pivotal-js-react-test-helpers')
};

Object.assign(global, globals);

beforeAll(() => {
  jasmine.MAX_PRETTY_PRINT_DEPTH = 5;
  jasmine.MAX_PRETTY_PRINT_ARRAY_LENGTH = 25;
});

beforeEach(() => {
  $('body').find('#root').remove().end().append('<div id="root"/>');
});

afterEach(() => {
  ReactDOM.unmountComponentAtNode(root);
});

afterAll(() => {
  Object.keys(globals).forEach(key => delete global[key]);
});