import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import MockPromises from 'mock-promises';
import MockNextTick from './support/mock_next_tick';
import MockNow from './support/mock_performance_now';
import MockRaf from './support/mock_raf';
import './support/bluebird';
import './support/set_immediate';
import $ from 'jquery';
import {configure as configureEnzyme, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configureEnzyme({adapter: new Adapter()});

Object.assign(global, {
  MockPromises,
  MockNextTick,
  MockNow,
  MockRaf,
  $,
  React,
  ReactDOM,
  shallow,
  mount,
  spyOn: jest.spyOn,
  fakeEvent: { preventDefault: jest.fn()},
});

beforeEach(() => {
  MockPromises.install(Promise);
});

afterEach(() => {
  MockNextTick.next();
  MockPromises.contracts.reset();
  MockPromises.uninstall();
  MockNow.reset();
  MockRaf.reset();
});
