import 'babel-polyfill';
import React from 'react';
import MockNextTick from './support/mock_next_tick';
import MockPromises from 'mock-promises';
import MockNow from 'performance-now';
import MockRaf from 'raf';
import './support/bluebird';
import './support/set_immediate';
import jQuery from 'jquery';
import {configure as configureEnzyme, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configureEnzyme({adapter: new Adapter()});

Object.assign(global, {
  jQuery,
  MockNextTick,
  MockNow,
  MockPromises,
  $: jQuery,
  MockRaf,
  React,
  shallow
});

beforeEach(() => {
  MockPromises.install(Promise);
});

afterEach(() => {
  MockNextTick.next();
  MockPromises.uninstall();
  jest.clearAllMocks();
});
