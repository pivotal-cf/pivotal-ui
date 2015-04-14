'use strict';

var $ = require('jquery');
var _ = require('lodash');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var ExpanderContent = require('../../src/pivotal-ui/javascripts/expander.jsx').ExpanderContent;
var ExpanderTrigger = require('../../src/pivotal-ui/javascripts/expander.jsx').ExpanderTrigger;

describe('ExpanderContent', function() {
  beforeEach(function() {
    this.node = $('<div id="container"></div>').appendTo('body').get(0);
  });

  afterEach(function() {
    React.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
  });

  function renderComponent(props) {
    props = _.assign({
      expanded: false
    }, props);

    return React.render(
      <ExpanderContent {...props}>
        <div>You won a brand new car!</div>
      </ExpanderContent>,
      this.node
    );
  }

  describe('initial state', function() {
    describe('when expanded is unset', function() {
      it('does not render the content', function() {
        renderComponent.call(this, {});
        expect($(this.node)).not.toContainText('You won a brand new car!');
      });
    });

    describe('when expanded is set to false', function() {
      it('does not render the content', function() {
        renderComponent.call(this, { expanded: false });
        expect($(this.node)).not.toContainText('You won a brand new car!');
      });
    });

    describe('when expanded is set to true', function() {
      it('renders the content', function() {
        renderComponent.call(this, { expanded: true });
        expect($(this.node)).toContainText('You won a brand new car!');
      });
    });
  });

  describe('#toggle', function() {
    describe('when the content is already visible', function() {
      beforeEach(function() {
        this.expanderContent = renderComponent.call(this, { expanded: true });
      });

      it('stops rendering the content', function() {
        this.expanderContent.toggle();
        setTimeout(function() {
          expect($(this.node)).not.toContainText('You won a brand new car!');
        }, 1000);
      });
    });

    describe('when the content is not visible', function() {
      beforeEach(function() {
        this.expanderContent = renderComponent.call(this, { expanded: false });
      });

      it('renders the content', function() {
        this.expanderContent.toggle();
        expect($(this.node)).toContainText('You won a brand new car!');
      });
    });

    it("can be invoked ad nauseum", function() {
      this.expanderContent = renderComponent.call(this);

      this.expanderContent.toggle();
      expect($(this.node)).toContainText('You won a brand new car!');

      this.expanderContent.toggle();
      setTimeout(function() {
        expect($(this.node)).not.toContainText('You won a brand new car!');
      }, 1000);
    });
  });
});

describe('ExpanderTrigger', function() {
  beforeEach(function() {
    this.node = $('<div id="container"></div>').appendTo('body').get(0);
  });

  afterEach(function() {
    React.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
  });

  function renderComponent() {
    return React.render(
      <ExpanderTrigger>
        <div>Click here to trigger</div>
      </ExpanderTrigger>,
      this.node
    );
  }

  describe("#setTarget", function() {
    it("updates the target on the state", function() {
      var target = {};

      this.expanderTrigger = renderComponent.call(this);
      this.expanderTrigger.setTarget(target);

      expect(this.expanderTrigger.state.target).toEqual(target);
    });
  });

  describe("on click", function() {
    describe("when target is set on state", function() {
      beforeEach(function() {
        this.expanderContent = jasmine.createSpyObj('expanderContent', ['toggle']);

        this.expanderTrigger = renderComponent.call(this);
        this.expanderTrigger.setTarget(this.expanderContent);
      });

      it("invokes the #toggle method on the provided target", function() {
        $(this.node).children().first().simulate('click');
        expect(this.expanderContent.toggle).toHaveBeenCalled();
      });
    });

    describe("when target is not set on state", function() {
      it("warns the user that no ExpanderContent was provided", function() {
        spyOn(console, 'warn');

        this.expanderTrigger = renderComponent.call(this);
        $(this.node).children().first().simulate('click');

        expect(console.warn).toHaveBeenCalled();
      });
    });
  });
});
