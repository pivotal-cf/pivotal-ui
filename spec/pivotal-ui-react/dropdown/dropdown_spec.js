require('../spec_helper');

describe('Dropdowns', function() {
  describe('Dropdown', function() {
    beforeEach(function() {
      var Dropdown = require('../../../src/pivotal-ui-react/dropdowns/dropdowns').Dropdown;
      React.render(<Dropdown title="Dropping"/>, root);
    });

    afterEach(function() {
      React.unmountComponentAtNode(root);
    });

    it('creates a dropdown', function() {
      expect('button.dropdown-toggle').toContainText('Dropping');
    });

    it('adds the appropriate button classes to the dropdown toggle', () => {
      expect('button.dropdown-toggle').toHaveClass('btn-default');
    });
  });

  describe('LinkDropdown', function() {
    beforeEach(function() {
      var LinkDropdown = require('../../../src/pivotal-ui-react/dropdowns/dropdowns').LinkDropdown;
      React.render(<LinkDropdown title="Dropping"/>, root);
    });

    afterEach(function() {
      React.unmountComponentAtNode(root);
    });

    it('creates a dropdown', function() {
      expect('button.dropdown-toggle').toContainText('Dropping');
    });

    it('adds the appropriate button classes to the dropdown toggle', () => {
      expect('button.dropdown-toggle').toHaveClass('btn-link');
      expect('button.dropdown-toggle').not.toHaveClass('btn-default');
    });
  });

  describe('DefaultAltDropdown', function() {
    beforeEach(function() {
      var DefaultAltDropdown = require('../../../src/pivotal-ui-react/dropdowns/dropdowns').DefaultAltDropdown;
      React.render(<DefaultAltDropdown title="Dropping"/>, root);
    });

    afterEach(function() {
      React.unmountComponentAtNode(root);
    });

    it('creates a dropdown', function() {
      expect('button.dropdown-toggle').toContainText('Dropping');
    });

    it('adds the appropriate button classes to the dropdown toggle', () => {
      expect('button.dropdown-toggle').toHaveClass('btn-default-alt');
      expect('button.dropdown-toggle').not.toHaveClass('btn-default');
    });
  });

  describe('PrimaryDropdown', function() {
    beforeEach(function() {
      var PrimaryDropdown = require('../../../src/pivotal-ui-react/dropdowns/dropdowns').PrimaryDropdown;
      React.render(<PrimaryDropdown title="Dropping"/>, root);
    });

    afterEach(function() {
      React.unmountComponentAtNode(root);
    });

    it('creates a dropdown', function() {
      expect('button.dropdown-toggle').toContainText('Dropping');
    });

    it('adds the appropriate button classes to the dropdown toggle', () => {
      expect('button.dropdown-toggle').toHaveClass('btn-primary');
      expect('button.dropdown-toggle').not.toHaveClass('btn-default');
    });

  });

  describe('LowlightDropdown', function() {
    beforeEach(function() {
      var LowlightDropdown = require('../../../src/pivotal-ui-react/dropdowns/dropdowns').LowlightDropdown;
      React.render(<LowlightDropdown title="Dropping"/>, root);
    });

    afterEach(function() {
      React.unmountComponentAtNode(root);
    });

    it('creates a dropdown', function() {
      expect('button.dropdown-toggle').toContainText('Dropping');
    });


    it('adds the appropriate button classes to the dropdown toggle', () => {
      expect('button.dropdown-toggle').toHaveClass('btn-lowlight');
      expect('button.dropdown-toggle').not.toHaveClass('btn-default');
    });
  });

  describe('DangerDropdown', function() {
    beforeEach(function() {
      var DangerDropdown = require('../../../src/pivotal-ui-react/dropdowns/dropdowns').DangerDropdown;
      React.render(<DangerDropdown title="Dropping"/>, root);
    });

    afterEach(function() {
      React.unmountComponentAtNode(root);
    });

    it('creates a dropdown', function() {
      expect('button.dropdown-toggle').toContainText('Dropping');
    });

    it('adds the appropriate button classes to the dropdown toggle', () => {
      expect('button.dropdown-toggle').toHaveClass('btn-danger');
      expect('button.dropdown-toggle').not.toHaveClass('btn-default');
    });
  });

  describe('HighlightDropdown', function() {
    beforeEach(function() {
      var HighlightDropdown = require('../../../src/pivotal-ui-react/dropdowns/dropdowns').HighlightDropdown;
      React.render(<HighlightDropdown title="Dropping"/>, root);
    });

    afterEach(function() {
      React.unmountComponentAtNode(root);
    });

    it('creates a dropdown', function() {
      expect('button.dropdown-toggle').toContainText('Dropping');
    });

    it('adds the appropriate button classes to the dropdown toggle', () => {
      expect('button.dropdown-toggle').toHaveClass('btn-highlight');
      expect('button.dropdown-toggle').not.toHaveClass('btn-default');
    });
  });

  describe('HighlightAltDropdown', function() {
    beforeEach(function() {
      var HighlightAltDropdown = require('../../../src/pivotal-ui-react/dropdowns/dropdowns').HighlightAltDropdown;
      React.render(<HighlightAltDropdown title="Dropping"/>, root);
    });

    afterEach(function() {
      React.unmountComponentAtNode(root);
    });

    it('creates a dropdown', function() {
      expect('button.dropdown-toggle').toContainText('Dropping');
    });

    it('adds the appropriate button classes to the dropdown toggle', () => {
      expect('button.dropdown-toggle').toHaveClass('btn-highlight-alt');
      expect('button.dropdown-toggle').not.toHaveClass('btn-default');
    });
  });
});
