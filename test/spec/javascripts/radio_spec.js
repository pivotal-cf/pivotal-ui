'use strict';

require('./spec_helper');

var $ = require('jquery');
var React = require('react/addons');

var Radio = require('../../../src/pivotal-ui/javascripts/radio').Radio;

describe('Radio', function() {
  beforeEach(function() {
    this.node = $('<div id="container"></div>').appendTo('body').get(0);
  });

  afterEach(function() {
    React.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
  });

  it("renders a radio", function() {
    React.render(<Radio value="1" name="bananas" id="npr">One!!!</Radio>, this.node);
    expect($('#container .radio label :radio[name=bananas]')).toHaveValue('1');
    expect($('#container .radio label')).toContainText('One!!!');
    expect($('#container #npr:radio')).toExist();
  });

  describe('when the checked property is passed', function() {
    beforeEach(function() {
      React.render(<Radio value="1" name="bananas" checked onChange={jasmine.createSpy('change')}>One!!!</Radio>, this.node);
    });

    it('renders a checked radio', function() {
      expect($('#container .radio label :radio[name=bananas]:checked')).toExist();
    });
  });

  describe('when the defaultChecked property is passed', function() {
    var changeSpy;

    beforeEach(function() {
      changeSpy = jasmine.createSpy('change');
      React.render(<Radio value="1" name="bananas" onChange={changeSpy} defaultChecked>One!!!</Radio>, this.node);
    });

    it('renders a checked radio', function() {
      expect($('#container .radio label :radio[name=bananas]:checked')).toExist();
    });

    describe('changing the value of the radio button', function() {
      it('triggers the onChange callback', function() {
        $('#container .radio label :radio').simulate('click');
        expect(changeSpy).toHaveBeenCalled();
      });
    });
  });
});
