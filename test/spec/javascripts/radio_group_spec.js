'use strict';

require('./spec_helper');

var $ = require('jquery');
var React = require('react/addons');

var RadioGroup = require('../../../src/pivotal-ui/javascripts/radio-group').RadioGroup;
var Radio = require('../../../src/pivotal-ui/javascripts/radio').Radio;

describe('RadioGroup', function() {
  var changeSpy;
  beforeEach(function() {
    this.node = $('<div id="container"></div>').appendTo('body').get(0);
    changeSpy = jasmine.createSpy('change');
    React.render(
      <RadioGroup name='bananas' onChange={changeSpy} id="clear-channel">
        <Radio value="1">One!!!</Radio>
        <Radio value="2">The two value</Radio>
        <Radio value="3">Three</Radio>
      </RadioGroup>,
      this.node
    );
  });

  afterEach(function() {
    React.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
  });

  it("renders the radio group", function() {
    expect($('#container .radio-group#clear-channel')).toExist();
  });


  it('renders 3 radiobuttons', function() {
    expect($('#container .radio-group .radio label :radio[name=bananas]')).toHaveLength(3);
    expect($('#container .radio-group .radio label :radio[name=bananas]').eq(0)).toHaveValue('1');
    expect($('#container .radio-group .radio label :radio[name=bananas]').eq(1)).toHaveValue('2');
    expect($('#container .radio-group .radio label :radio[name=bananas]').eq(2)).toHaveValue('3');
  });

  describe("when the radio button is changed", function() {
    beforeEach(function() {
      $('#container .radio-group :radio').eq(0).simulate('change').simulate('click');
    });

    it("calls the change callback", function() {
      expect(changeSpy).toHaveBeenCalledWith('1');
    });
  });
});
