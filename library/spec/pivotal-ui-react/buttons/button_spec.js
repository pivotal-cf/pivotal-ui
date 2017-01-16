require('../spec_helper');

describe('UIButton', function() {
  var UIButton;
  beforeEach(function() {
    UIButton = require('../../../src/pivotal-ui-react/buttons/buttons').UIButton;
    ReactDOM.render(<UIButton>Click here</UIButton>, root);
  });

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(root);
  });

  it('creates a button', function() {
    expect('#root button.btn-default').toContainText('Click here');
  });

  describe('when href attribute is set', function() {
    beforeEach(function() {
      ReactDOM.render(<UIButton href="http://example.com">Click here</UIButton>, root);
    });

    it('creates a link', function() {
      expect('#root a.button.btn-default').toContainText('Click here');
      expect('#root a.button').toHaveAttr('href', 'http://example.com');
    });
  });

  describe('when kind attribute is set', function() {
    beforeEach(function() {
      ReactDOM.render(<UIButton kind="danger">Click here</UIButton>, root);
    });

    it('adds the type class to the button', function() {
      expect('#root button').not.toHaveClass('btn-default');
      expect('#root button').toHaveClass('btn-danger');
    });
  });

  describe('when large is true', function() {
    beforeEach(function() {
      ReactDOM.render(<UIButton large>Click here</UIButton>, root);
    });

    it('adds the large button class', function() {
      expect('#root button').toHaveClass('btn-lg');
    });
  });

  describe('when small is true', function() {
    beforeEach(function() {
      ReactDOM.render(<UIButton small>Click here</UIButton>, root);
    });

    it('adds the small button class', function() {
      expect('#root button').toHaveClass('btn-sm');
    });
  });

  describe('when the button is given custom classes', function() {
    function renderButton(props) {
      ReactDOM.render(<UIButton {...props}>Click here</UIButton>, root);
    }

    describe('when no other options that effect class are given', function() {
      beforeEach(function() {
        renderButton({className: 'custom-class-1 custom-class-2'});
      });

      it('includes those custom classes', function() {
        expect('#root button').toHaveClass(['custom-class-1', 'custom-class-2']);
      });

      it('includes the default button classes', function() {
        expect('#root button').toHaveClass(['btn-default']);
      });
    });

    describe('when options that add class names are given', function() {
      beforeEach(function() {
        renderButton({
          className: 'custom-class-1 custom-class-2',
          kind: 'primary',
          large: true
        });
      });

      it('includes those custom classes', function() {
        expect('#root button').toHaveClass(['custom-class-1', 'custom-class-2']);
      });

      it('includes the button classes set by the other options', function() {
        expect('#root button').toHaveClass(['btn-primary', 'btn-lg']);
      });
    });
  });

  describe('when data-attributes are provided', function() {
    beforeEach(function() {
      ReactDOM.render(
        <UIButton data-click="myFunction" data-foo="bar">
          Click here
        </UIButton>, root
      );
    });

    it('passes through the data-attributes', function() {
      expect('#root button').toHaveAttr('data-click', 'myFunction');
      expect('#root button').toHaveAttr('data-foo', 'bar');
    });
  });

  describe('DefaultButton', () => {
    let Button;
    beforeEach(() => {
      Button = require('../../../src/pivotal-ui-react/buttons/buttons').DefaultButton;
    });

    describe('when there are flags', () => {
      it('renders with the alt classname when there is an alt flag', () => {
        ReactDOM.render(<Button alt>Click here</Button>, root);
        expect('#root button').not.toHaveClass('btn-default');
        expect('#root button').toHaveClass('btn-default-alt');
      });

      it('renders with the flat classname when there is an flat flag', () => {
        ReactDOM.render(<Button flat>Click here</Button>, root);
        expect('#root button').not.toHaveClass('btn-default');
        expect('#root button').toHaveClass('btn-default-flat');
      });
    });
  });

  [
    {name: 'DangerButton', btnClass: 'btn-danger'},
    {name: 'PrimaryButton', btnClass: 'btn-primary'},
    {name: 'BrandButton', btnClass: 'btn-brand'},
  ].forEach(function({name, btnClass}) {
    describe(name, function() {
      let Button;
      beforeEach(function() {
        Button = require('../../../src/pivotal-ui-react/buttons/buttons')[name];
        ReactDOM.render(<Button>Click here</Button>, root);
      });

      it(`renders with the ${btnClass} class`, function() {
        expect('#root button').not.toHaveClass('btn-default');
        expect('#root button').toHaveClass(btnClass);
      });

      describe('when there are flags', () => {
        it('renders with the alt classname when there is an alt flag', () => {
          ReactDOM.render(<Button alt>Click here</Button>, root);
          expect('#root button').not.toHaveClass('btn-default');
          expect('#root button').not.toHaveClass(btnClass);
          expect('#root button').toHaveClass(`${btnClass}-alt`);
        });

        it('renders with the flat classname when there is an flat flag', () => {
          ReactDOM.render(<Button flat>Click here</Button>, root);
          expect('#root button').not.toHaveClass('btn-default');
          expect('#root button').not.toHaveClass(btnClass);
          expect('#root button').toHaveClass(`${btnClass}-flat`);
        });
      });
    });
  });

  describe('button with icons', () => {
    const {Icon} = require('../../../src/pivotal-ui-react/iconography/iconography');
    const {DefaultButton} = require('../../../src/pivotal-ui-react/buttons/buttons');

    it('renders with an icon if an icon node is passed through props', () => {
      ReactDOM.render(<DefaultButton icon={<Icon src="add" />}>Click here</DefaultButton>, root);
      expect('#root button .svgicon').toExist();
    });

    it('renders with an icon if it is a link', () => {
      ReactDOM.render(<DefaultButton href="whatever" icon={<Icon src="add" />}>Click here</DefaultButton>, root);
      expect('#root a.button .svgicon').toExist();
    });
  });
});
