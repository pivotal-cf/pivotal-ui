import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import MockNextTick from './support/mock_next_tick'
import MockPromises from 'mock-promises'
import jQuery from 'jquery'
import MockNow from 'performance-now'
import MockRaf from 'raf'
import 'babel-polyfill'
import 'phantomjs-polyfill'
import './support/bluebird'
import './support/set_immediate'
import 'pivotal-js-jasmine-matchers'

MockNextTick.install()

Object.assign(global, {
  jQuery,
  MockNextTick,
  MockNow,
  MockPromises,
  $: jQuery,
  MockRaf,
  React,
  ReactDOM,
  TestUtils,
  ...require('pivotal-js-react-test-helpers')
})

global.shallowRender = jsx => {
  const shallowRenderer = TestUtils.createRenderer()
  shallowRenderer.render(jsx)
  return shallowRenderer.getRenderOutput()
};

global.setProps = function setProps(props, node = root) {
  const Component = this.constructor
  ReactDOM.render(<Component {...this.props} {...props}/>, node)
}

beforeEach(function() {
  $('body').find('#root').remove().end().append('<main id="root"/>')
  jasmine.clock().install()
  MockPromises.install(Promise)
});

beforeEach(function() {
  const consoleWarn = console.warn
  console.warn = function(message) {
    if(message.match(/Failed propType/)) {
      throw new Error(message)
    } else {
      consoleWarn.apply(console, arguments)
    }
  }
})

afterEach(function() {
  ReactDOM.unmountComponentAtNode(root)
  MockNextTick.next()
  jasmine.clock().tick(1)
  jasmine.clock().uninstall()
  MockPromises.contracts.reset()
  MockPromises.uninstall()
  MockNow.reset()
  MockRaf.reset()
})
