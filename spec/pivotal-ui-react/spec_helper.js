import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import MockNextTick from './support/mock_next_tick';
import MockPromises from 'mock-promises';
import MockNow from 'performance-now';
import MockRaf from 'raf';
import './support/bluebird';
import './support/set_immediate';
import $ from 'jquery';
import {configure as configureEnzyme, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configureEnzyme({adapter: new Adapter()});

Object.assign(global, {
  MockNextTick,
  MockNow,
  MockPromises,
  $,
  MockRaf,
  React,
  ReactDOM,
  shallow,
  mount
});

beforeEach(() => {
  MockPromises.install(Promise);
});

afterEach(() => {
  MockNextTick.next();
  MockPromises.uninstall();
  jest.clearAllMocks();
});
