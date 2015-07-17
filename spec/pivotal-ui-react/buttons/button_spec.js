require('../spec_helper');

describe('UIButton', function() {
  var UIButton;
  beforeEach(function() {
    UIButton = require('../../../src/pivotal-ui-react/buttons/buttons').UIButton;
    React.render(<UIButton>Click here</UIButton>, root);
  });

  afterEach(function() {
    React.unmountComponentAtNode(root);
  });

  it('creates a button', function() {
    expect('#root button.btn.btn-default').toContainText('Click here');
  });

  describe('when href attribute is set', function() {
    beforeEach(function() {
      React.render(<UIButton href="http://example.com">Click here</UIButton>, root);
    });

    it('creates a link', function() {
      expect('#root a.btn.btn-default').toContainText('Click here');
      expect('#root a.btn').toHaveAttr('href', 'http://example.com');
    });
  });

  describe('when kind attribute is set', function() {
    beforeEach(function() {
      React.render(<UIButton kind="danger">Click here</UIButton>, root);
    });

    it('adds the type class to the button', function() {
      expect('#root button.btn').not.toHaveClass('btn-default');
      expect('#root button.btn').toHaveClass('btn-danger');
    });
  });

  describe('when block is true', function() {
    beforeEach(function() {
      React.render(<UIButton block={true}>Click here</UIButton>, root);
    });

    it('adds the block class', function() {
      expect('#root button.btn').toHaveClass('btn-block');
    });
  });

  describe('when large is true', function() {
    beforeEach(function() {
      React.render(<UIButton large={true}>Click here</UIButton>, root);
    });

    it('adds the large button class', function() {
      expect('#root button.btn').toHaveClass('btn-lg');
    });
  });

  describe('when the button is given custom classes', function() {
    function renderButton(props) {
      React.render(<UIButton {...props}>Click here</UIButton>, root);
    }

    describe('when no other options that effect class are given', function() {
      beforeEach(function() {
        renderButton({className: 'custom-class-1 custom-class-2'});
      });

      it('includes those custom classes', function() {
        expect('#root button').toHaveClass(['custom-class-1', 'custom-class-2']);
      });

      it('includes the default button classes', function() {
        expect('#root button').toHaveClass(['btn', 'btn-default']);
      });
    });


    describe('when options that add class names are given', function() {
      beforeEach(function() {
        renderButton({
          className: 'custom-class-1 custom-class-2',
          kind: 'lowlight',
          block: true,
          large: true
        });
      });

      it('includes those custom classes', function() {
        expect('#root button').toHaveClass(['custom-class-1', 'custom-class-2']);
      });

      it('includes the button classes set by the other options', function() {
        expect('#root button').toHaveClass(['btn', 'btn-lowlight', 'btn-block', 'btn-lg']);
      });
    });
  });

  describe('when data-attributes are provided', function() {
    beforeEach(function() {
      React.render(
        <UIButton data-click="myFunction" data-foo="bar">
          Click here
        </UIButton>, root
      );
    });

    it('passes through the data-attributes', function() {
      expect('#root button.btn').toHaveAttr('data-click', 'myFunction');
      expect('#root button.btn').toHaveAttr('data-foo', 'bar');
    });
  });

  [
    {name: 'DefaultAltButton', btnClass: 'btn-default-alt'},
    {name: 'PrimaryButton', btnClass: 'btn-primary'},
    {name: 'LowlightButton', btnClass: 'btn-lowlight'},
    {name: 'DangerButton', btnClass: 'btn-danger'},
    {name: 'HighlightButton', btnClass: 'btn-highlight'},
    {name: 'HighlightAltButton', btnClass: 'btn-highlight-alt'}
  ].forEach(function({name, btnClass}) {
      describe(name, function() {
        beforeEach(function() {
          var Button = require('../../../src/pivotal-ui-react/buttons/buttons')[name];
          React.render(<Button>Click here</Button>, root);
        });

        it('renders with the btn-primary class', function() {
          expect('button.btn').not.toHaveClass('btn-default');
          expect('button.btn').toHaveClass(btnClass);
        });
      });
    });
});
