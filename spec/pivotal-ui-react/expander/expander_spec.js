require('../spec_helper');

describe('ExpanderContent', function() {
  beforeEach(function() {
    spyOn(React.addons.CSSTransitionGroup.prototype, 'render').and.callFake(function() {
      return React.createElement('div', this.props);
    });
  });

  afterEach(function() {
    React.unmountComponentAtNode(root);
  });

  function renderComponent(props) {
    var ExpanderContent = require('../../../src/pivotal-ui-react/expander/expander').ExpanderContent;

    props = Object.assign({
      expanded: false
    }, props);

    return React.render(
      (<ExpanderContent {...props}>
        <div>You won a brand new car!</div>
      </ExpanderContent>),
      root
    );
  }

  describe('initial state', function() {
    describe('when expanded is unset', function() {
      it('does not render the content', function() {
        renderComponent.call(this, {});
        expect(root).not.toContainText('You won a brand new car!');
      });
    });

    describe('when expanded is set to false', function() {
      it('does not render the content', function() {
        renderComponent.call(this, {expanded: false});
        expect(root).not.toContainText('You won a brand new car!');
      });
    });

    describe('when expanded is set to true', function() {
      it('renders the content', function() {
        renderComponent.call(this, {expanded: true});
        expect(root).toContainText('You won a brand new car!');
      });
    });
  });

  describe('#toggle', function() {
    describe('when the content is already visible', function() {
      beforeEach(function() {
        this.expanderContent = renderComponent.call(this, {expanded: true});
      });

      it('stops rendering the content', function() {
        this.expanderContent.toggle();
        expect(root).not.toContainText('You won a brand new car!');
      });
    });

    describe('when the content is not visible', function() {
      beforeEach(function() {
        this.expanderContent = renderComponent.call(this, {expanded: false});
      });

      it('renders the content', function() {
        this.expanderContent.toggle();
        expect(root).toContainText('You won a brand new car!');
      });
    });

    it('can be invoked ad nauseum', function() {
      this.expanderContent = renderComponent.call(this);

      this.expanderContent.toggle();
      expect(root).toContainText('You won a brand new car!');

      this.expanderContent.toggle();
      expect(root).not.toContainText('You won a brand new car!');
    });
  });
});

describe('ExpanderTrigger', function() {
  afterEach(function() {
    React.unmountComponentAtNode(root);
  });

  function renderComponent() {
    var ExpanderTrigger = require('../../../src/pivotal-ui-react/expander/expander').ExpanderTrigger;
    return React.render(
      (<ExpanderTrigger>
        <div>Click here to trigger</div>
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
