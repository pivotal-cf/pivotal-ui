require('../spec_helper');
import {Dropdown, DropdownItem} from '../../../src/pivotal-ui-react/dropdowns/dropdowns';

describe('Dropdowns', function() {
  function dropdownTestFor(dropdownComponentName, dropdownClassName) {
    describe(dropdownComponentName, function() {
      beforeEach(function() {
        var DropdownClass = require('../../../src/pivotal-ui-react/dropdowns/dropdowns')[dropdownComponentName];
        ReactDOM.render(<DropdownClass title="Dropping" buttonClassName="test-btn-class"/>, root);
      });

      afterEach(function() {
        ReactDOM.unmountComponentAtNode(root);
      });

      it('creates a dropdown', function() {
        expect('button.dropdown-toggle').toContainText('Dropping');
      });

      it('adds the appropriate button classes (merging in buttonClassName) to the dropdown toggle', () => {
        expect('button.dropdown-toggle').toHaveClass(dropdownClassName);
        expect('button.dropdown-toggle').not.toHaveClass('btn-default');
        expect('.dropdown-toggle').toHaveClass('test-btn-class');
      });
    });
  }

  describe('Dropdown', function() {
    let subject

    beforeEach(function() {
      const props = {
        className: 'test-class',
        id: 'test-id',
        style: {
          opacity: '0.5'
        }
      };


      subject = ReactDOM.render(
        <Dropdown title="Dropping" {...props} buttonClassName="test-btn-class">
          <DropdownItem href="test">Item #1</DropdownItem>
        </Dropdown>, root);
    });

    afterEach(function() {
      ReactDOM.unmountComponentAtNode(root);
    });

    it('passes through className to the dropdown', function() {
      expect('.dropdown').toHaveClass('test-class');
    });

    it('passes through style to the button', function() {
      expect('.dropdown-toggle').toHaveCss({opacity: '0.5'});
    });

    it('passes through id to the button', function() {
      expect('.dropdown-toggle#test-id').toExist();
    });

    it('creates a dropdown-toggle', () => {
      expect('.dropdown-toggle').toContainText('Dropping');
      expect('.dropdown-toggle').toHaveClass('btn-default');
      expect('.dropdown-toggle').toHaveClass('test-btn-class');
    });

    it('renders all children DropdownItems', function() {
      expect('.dropdown-menu li').toHaveLength(1);
      expect('.dropdown-menu li').toHaveText('Item #1');
    });

    describe('split', () => {
      it('puts the title in the dropdown label when split is true', () => {
        subject::setProps({split: true});
        expect('.dropdown-label').toHaveText('Dropping');
        expect('.dropdown-toggle').not.toHaveText('Dropping');
      });

      it('puts the title in the dropdown toggle when split is false', () => {
        subject::setProps({split: false});
        expect('.dropdown-toggle').toHaveText('Dropping');
      });
    });

    describe('toggle', () => {
      beforeEach(() => {
        subject::setProps({title: 'Dropping', toggle: <div className="foo">Toggle!</div>});
      });

      it('puts the title in the dropdown label', () => {
        expect('.dropdown-label').toHaveText('Dropping');
        expect('.dropdown-toggle').not.toHaveText('Dropping');
      });

      it('puts the custom toggle in the dropdown toggle', () => {
        expect('.dropdown-label').not.toHaveText('Toggle!');
        expect('.dropdown-toggle').toHaveText('Toggle!');
      });
    });
  });

  dropdownTestFor('LinkDropdown', 'btn-link');

  dropdownTestFor('DefaultAltDropdown', 'btn-default-alt');

  dropdownTestFor('LowlightDropdown', 'btn-lowlight');

  dropdownTestFor('DangerDropdown', 'btn-danger');

  dropdownTestFor('HighlightDropdown', 'btn-highlight');

  dropdownTestFor('HighlightAltDropdown', 'btn-highlight-alt');
});
