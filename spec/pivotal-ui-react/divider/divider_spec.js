require('../spec_helper');

import {propagateAttributes} from '../spec_helper';

describe('Divider', function() {
  var Divider;
  beforeEach(function() {
    Divider = require('../../../src/pivotal-ui-react/dividers/dividers').Divider;
    React.render(<Divider className='test-class' id='test-id' style={{opacity: '1'}}/>, root);
  });

  afterEach(function() {
    React.unmountComponentAtNode(root);
  });

  it('creates a divider', function() {
    expect('hr').toHaveClass('divider-alternate-1');
  });

  propagateAttributes('hr', {className: 'test-class', id: 'test-id', style: {opacity: '1'}});
  describe('when large is set to true', function() {
    beforeEach(function() {
      React.render(<Divider size="large"/>, root);
    });

    it('creates a divider with -2 appended to the classname', function() {
      expect('hr').toHaveClass('divider-alternate-2');
    });
  });

  describe('when the divider goes on a dark background, inverse: true', function() {
    beforeEach(function() {
      React.render(<Divider inverse={true}/>, root);
    });

    it('creates a divider without the -alternate in the class', function() {
      expect('hr').toHaveClass('divider-1');
    });
  });

  describe('when a large divider goes on a dark background, inverse: true', function() {
    beforeEach(function() {
      React.render(<Divider inverse={true} size="large"/>, root);
    });

    it('creates a divider without the -alternate in the class', function() {
      expect('hr').toHaveClass('divider-2');
    });
  });

  describe('setting a custom className', function() {
    beforeEach(function() {
      React.render(<Divider inverse={true} className="myClass"/>, root);
    });

    it('passes the class through to the divider', function() {
      expect('hr').toHaveClass('divider-1');
      expect('hr').toHaveClass('myClass');
    });
  });

  describe('setting a custom data attribute', function() {
    beforeEach(function() {
      React.render(<Divider data-behavior="myAttr"/>, root);
    });

    it('passes the data attribute through to the divider', function() {
      expect('hr').toHaveAttr('data-behavior', 'myAttr');
    });
  });
});
