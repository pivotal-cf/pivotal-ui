'use strict';

var $ = require('jquery');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var SuccessAlert = require('../../../src/pivotal-ui/javascripts/alerts.jsx').SuccessAlert;
var InfoAlert = require('../../../src/pivotal-ui/javascripts/alerts.jsx').InfoAlert;
var WarningAlert = require('../../../src/pivotal-ui/javascripts/alerts.jsx').WarningAlert;
var ErrorAlert = require('../../../src/pivotal-ui/javascripts/alerts.jsx').ErrorAlert;

describe('Alert', function() {
  beforeEach(function() {
    this.node = $('<div id="container"></div>').appendTo('body').get(0);
  });

  afterEach(function() {
    React.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
  });

  describe('when dismissable is set to true', function() {
    beforeEach(function() {
      React.render(
        <SuccessAlert dismissable>alert body</SuccessAlert>,
        this.node
      );
    });

    it('has a close button', function() {
      expect($('#container button.close')).toExist();
    });

    it('disappears when close button is clicked', function() {
      TestUtils.Simulate.click($('#container button.close').get(0));
      expect($('#container .alert')).not.toExist();
    });
  });

  describe('when dismissable is set to a callback', function() {
    beforeEach(function() {
      this.callback = jasmine.createSpy('dismissable callback');
      React.render(
        <SuccessAlert dismissable={this.callback}>alert body</SuccessAlert>,
        this.node
      );
    });

    it('has a close button', function() {
      expect($('#container button.close')).toExist();
    });

    describe('when close button is clicked', function() {
      beforeEach(function() {
        TestUtils.Simulate.click($('#container button.close').get(0));
      });

      it('disappears', function() {
        expect($('#container .alert')).not.toExist();
      });

      it('calls the callback passed in', function() {
        expect(this.callback).toHaveBeenCalled();
      });
    });
  });

  describe('when dismissable is not present', function() {
    beforeEach(function() {
      React.render(
        <SuccessAlert>alert body</SuccessAlert>,
        this.node
      );
    });

    it('does not have a close button', function() {
      expect($('#container button.close')).not.toExist();
    });
  });
});

describe('SuccessAlert', function() {
  describe('when withIcon is set to true', function() {
    beforeEach(function() {
      this.node = $('<div id="container"></div>').appendTo('body').get(0);
      React.render(
        <SuccessAlert withIcon>alert body</SuccessAlert>,
        this.node
      );
    });

    afterEach(function() {
      React.unmountComponentAtNode(this.node);
      document.body.removeChild(this.node);
    });

    it('renders an icon in the alert', function() {
      expect($('#container i')).toHaveClass('fa-check-circle');
    });
  });
});

describe('InfoAlert', function() {
  describe('when withIcon is set to true', function() {
    beforeEach(function() {
      this.node = $('<div id="container"></div>').appendTo('body').get(0);
      React.render(
        <InfoAlert withIcon>alert body</InfoAlert>,
        this.node
      );
    });

    afterEach(function() {
      React.unmountComponentAtNode(this.node);
      document.body.removeChild(this.node);
    });

    it('renders an icon in the alert', function() {
      expect($('#container i')).toHaveClass('fa-info-circle');
    });
  });
});

describe('WarningAlert', function() {
   describe('when withIcon is set to true', function() {
     beforeEach(function() {
       this.node = $('<div id="container"></div>').appendTo('body').get(0);
       React.render(
         <WarningAlert withIcon>alert body</WarningAlert>,
         this.node
       );
     });

     afterEach(function() {
       React.unmountComponentAtNode(this.node);
       document.body.removeChild(this.node);
     });

     it('renders an icon in the alert', function() {
       expect($('#container i')).toHaveClass('fa-exclamation-triangle');
     });
   });
});

describe('ErrorAlert', function() {
   describe('when withIcon is set to true', function() {
     beforeEach(function() {
       this.node = $('<div id="container"></div>').appendTo('body').get(0);
       React.render(
         <ErrorAlert withIcon>alert body</ErrorAlert>,
         this.node
       );
     });

     afterEach(function() {
       React.unmountComponentAtNode(this.node);
       document.body.removeChild(this.node);
     });

     it('renders an icon in the alert', function() {
       expect($('#container i')).toHaveClass('fa-exclamation-triangle');
     });
   });
});