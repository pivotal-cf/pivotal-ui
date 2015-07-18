require('../spec_helper');
import {itPropagatesAttributes} from '../support/shared_examples';
import {Dropdown, DropdownItem} from '../../../src/pivotal-ui-react/dropdowns/dropdowns';

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
    var props = {
      className: 'test-class',
      id: 'test-id',
      style: {
        opacity: '1'
      }
    };

    beforeEach(function() {
      React.render(
        <Dropdown title="Dropping" {...props} buttonClassName="test-btn-class">
          <DropdownItem href="test">Item #1</DropdownItem>
        </Dropdown>, root);
    });

    afterEach(function() {
      React.unmountComponentAtNode(root);
    });

    it('passes through className and style to the btn-group ', function() {
      expect('#root .btn-group').toHaveClass('test-class');
      expect('#root .btn-group').toHaveCss({opacity: '1'});
    });

    it('passes through id', function() {
      expect('#root #test-id').toExist();
    });

    it('create a dropdown-toggle, merging buttonClassName with the provided one', () => {
      expect('.dropdown-toggle').toContainText('Dropping');
      expect('.dropdown-toggle').toHaveClass('btn-default');
      expect('.dropdown-toggle').toHaveClass('test-btn-class');
    });

    it('renders all children DropdownItems', function() {
      expect('#root .dropdown-menu li').toHaveLength(1);
      expect('#root .dropdown-menu li').toHaveText('Item #1');
    });
  });

  describe('DropdownItem', function() {
    var props = {
      className: 'test-item-class',
      id: 'test-item-id',
      style: {
        opacity: '1'
      }
    };
    beforeEach(function() {
      React.render(
        <DropdownItem href='test' {...props}>Item</DropdownItem>,
        root);
    });

    afterEach(function() {
      React.unmountComponentAtNode(root);
    });

    itPropagatesAttributes('#root li', props);
  });

  dropdownTestFor('LinkDropdown', 'btn-link');

  dropdownTestFor('DefaultAltDropdown', 'btn-default-alt');

  dropdownTestFor('PrimaryDropdown', 'btn-primary');

  dropdownTestFor('LowlightDropdown', 'btn-lowlight');

  dropdownTestFor('DangerDropdown', 'btn-danger');

  dropdownTestFor('HighlightDropdown', 'btn-highlight');

  dropdownTestFor('HighlightAltDropdown', 'btn-highlight-alt');
});
