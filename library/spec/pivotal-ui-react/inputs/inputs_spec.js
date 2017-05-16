import '../spec_helper';
import {Input} from 'pui-react-inputs';

describe('Input', function() {
  let changeSpy, subject;
  const id = 'firstNameInput';
  const label = 'First Name';
  beforeEach(function() {
    changeSpy = jasmine.createSpy('change');
    subject = ReactDOM.render(<Input success {...{className: 'input-class', label, id, onChange: changeSpy}}/>, root);
  });

  it('renders an input with the label', function() {
    expect('.control-label').toContainText('First Name');
  });

  it('attaches the label to the input', function() {
    expect('.control-label').toHaveAttr('for', id);
    expect('.form-group input').toHaveAttr('id', id);
  });

  it('passes properties to the input', function() {
    $('.form-group input').simulate('change');
    expect(changeSpy).toHaveBeenCalled();
  });

  it('displays a checkmark when success prop is true', () => {
    expect('.success').toExist();
    expect('.form-group svg').toHaveClass('icon-check');
  });

  it('merges classnames', function() {
    ReactDOM.render(<Input className="foo"/>, root);
    expect('.form-group').toHaveClass('foo');
  });

  describe('when label is undefined', () => {
    beforeEach(() => {
      subject::setProps({label: undefined});
    });

    it('does not render label', () => {
      expect('label').not.toExist();
    });
  });

  describe('search', () => {
    beforeEach(() => {
      subject::setProps({success: false, search: true});
    });

    it('renders a form group with the search classes', function() {
      expect('.form-group').toHaveClass('form-group-left-icon');
      expect('.form-group svg').toHaveClass('icon-search');
    });
  });

  describe('leftIcon', () => {
    beforeEach(() => {
      subject::setProps({leftIcon: 'add', success: true, search: true});
    });

    it('renders a form group with custom icon', function() {
      expect('.form-group').toHaveClass('form-group-left-icon');
      expect('.form-group svg:eq(0)').toHaveClass('icon-add');
    });

    it('overrides search option', () => {
      expect('.form-group svg.icon-search').not.toExist();
    });

    it('can be used simultaneously with success', () => {
      expect('.form-group svg:eq(1)').toHaveClass('icon-check');
    });

    describe('when leftIcon is a node', () => {
      beforeEach(() => {
        subject::setProps({leftIcon: <div className="custom" />, success: true, search: true});
      });

      it('renders the node', () => {
        expect('.form-group .custom').toExist();
      });

      it('overrides search option', () => {
        expect('.form-group svg.icon-search').not.toExist();
      });

      it('can be used simultaneously with success', () => {
        expect('.form-group svg.icon-check').toExist();
      });
    });
  });

  describe('when a placeholder is provided', function() {
    beforeEach(function() {
      subject::setProps({placeholder: 'Search here...'});
    });

    it('renders the input with a placeholder', function() {
      expect('.form-group input').toHaveAttr('placeholder', 'Search here...');
    });

    it('adds an aria label with the placeholder value', function() {
      expect('.form-group input').toHaveAttr('aria-label', 'Search here...');
    });

    describe('when an aria-label is provided as well', function() {
      beforeEach(function() {
        subject::setProps({'aria-label': 'Search Box'});
      });

      it('uses the label as the aria-label instead of the placeholder', function() {
        expect('.form-group input').toHaveAttr('aria-label', 'Search Box');
      });
    });
  });
});
