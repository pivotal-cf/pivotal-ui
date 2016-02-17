require('../spec_helper');

describe('ExpanderContent', function() {
  afterEach(function() {
    ReactDOM.unmountComponentAtNode(root);
  });

  function renderComponent(props) {
    var ExpanderContent = require('../../../src/pivotal-ui-react/expander/expander').ExpanderContent;

    props = Object.assign({
      expanded: false
    }, props);

    return ReactDOM.render(
      (<ExpanderContent {...props}>
        <div>You won a brand new car!</div>
      </ExpanderContent>),
      root
    );
  }

  describe('initial state', function() {
    describe('when expanded is unset', function() {
      it('hides the content', function() {
        renderComponent.call(this, {});
        expect('.collapse').not.toHaveClass('in');
      });
    });

    describe('when expanded is set to false', function() {
      it('hides the content', function() {
        renderComponent.call(this, {});
        expect('.collapse').not.toHaveClass('in');
      });
    });

    describe('when expanded is set to true', function() {
      it('shows the content', function() {
        renderComponent.call(this, {expanded: true});
        expect('.collapse').toHaveClass('in');
      });
    });
  });

  describe('#toggle', function() {
    describe('when the content was already visible', function() {
      beforeEach(function() {
        let expanderContent = renderComponent.call(this, {expanded: true});
        expanderContent.toggle();
        jasmine.clock().tick(1000);
      });

      it('hides the content', function() {
        expect('.collapse').not.toHaveClass('in');
      });
    });

    describe('when the content is not visible', function() {
      beforeEach(function() {
        this.expanderContent = renderComponent.call(this, {expanded: false});
        this.expanderContent.toggle();
        jasmine.clock().tick(1000);
      });

      it('shows the content', function() {
        expect('.collapse').toHaveClass('in');
      });
    });

    it('can be invoked ad nauseum', function() {
      this.expanderContent = renderComponent.call(this);

      this.expanderContent.toggle();
      jasmine.clock().tick(1000);
      expect('.collapse').toHaveClass('in');

      this.expanderContent.toggle();
      jasmine.clock().tick(1000);
      expect('.collapse').not.toHaveClass('in');
    });
  });
  describe('when toggling expanded prop', function() {
    beforeEach(function() {
      renderComponent.call(this, {expanded: true});
      jasmine.clock().tick(1000);
    });

    it('toggles open/closed', function() {
      expect('.collapse').toHaveClass('in');
      renderComponent.call(this, {expanded: false});
      jasmine.clock().tick(1000);
      expect('.collapse').not.toHaveClass('in');
    })
  })
});

describe('ExpanderTrigger', function() {
  afterEach(function() {
    ReactDOM.unmountComponentAtNode(root);
  });

  function renderComponent() {
    var ExpanderTrigger = require('../../../src/pivotal-ui-react/expander/expander').ExpanderTrigger;
    return ReactDOM.render(
      (<ExpanderTrigger>
        <button>Click here to trigger</button>
      </ExpanderTrigger>),
      root
    );
  }

  describe('#setTarget', function() {
    it('updates the target on the state', function() {
      var target = {};

      this.expanderTrigger = renderComponent.call(this);
      this.expanderTrigger.setTarget(target);

      expect(this.expanderTrigger.state.target).toEqual(target);
    });
  });

  describe('on click', function() {
    describe('when target is set on state', function() {
      beforeEach(function() {
        this.expanderContent = jasmine.createSpyObj('expanderContent', ['toggle']);

        this.expanderTrigger = renderComponent.call(this);
        this.expanderTrigger.setTarget(this.expanderContent);
      });

      it('invokes the #toggle method on the provided target', function() {
        $(root).children().first().simulate('click');
        expect(this.expanderContent.toggle).toHaveBeenCalled();
      });
    });

    describe('when target is not set on state', function() {
      it('warns the user that no ExpanderContent was provided', function() {
        spyOn(console, 'warn');

        this.expanderTrigger = renderComponent.call(this);
        $(root).children().first().simulate('click');

        expect(console.warn).toHaveBeenCalled();
      });
    });
  });
});
