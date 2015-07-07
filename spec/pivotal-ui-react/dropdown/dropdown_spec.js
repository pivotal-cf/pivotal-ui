require('../spec_helper');

describe('Dropdowns', function() {
  function dropdownTestFor(dropdownComponentName, dropdownClassName) {
    describe(dropdownComponentName, function() {
      beforeEach(function() {
        var DropdownClass = require('../../../src/pivotal-ui-react/dropdowns/dropdowns')[dropdownComponentName];
        React.render(<DropdownClass title="Dropping"/>, root);
      });

      afterEach(function() {
        React.unmountComponentAtNode(root);
      });

      it('creates a dropdown', function() {
        expect('button.dropdown-toggle').toContainText('Dropping');
      });

      it('adds the appropriate button classes to the dropdown toggle', () => {
        expect('button.dropdown-toggle').toHaveClass(dropdownClassName);
        expect('button.dropdown-toggle').not.toHaveClass('btn-default');
      });
    });
  }

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

  dropdownTestFor('LinkDropdown', 'btn-link');

  dropdownTestFor('DefaultAltDropdown', 'btn-default-alt');

  dropdownTestFor('PrimaryDropdown', 'btn-primary');

  dropdownTestFor('LowlightDropdown', 'btn-lowlight');

  dropdownTestFor('DangerDropdown', 'btn-danger');

  dropdownTestFor('HighlightDropdown', 'btn-highlight');

  dropdownTestFor('HighlightAltDropdown', 'btn-highlight-alt');
});
