require('../spec_helper');
var {TestUtils} = React.addons;

describe('BaseCollapse', function() {
  var BsPanel, BaseCollapse, subject, bsPanel;
  beforeEach(function() {
    BsPanel = require('react-bootstrap').Panel;
    BaseCollapse = require('../../../src/pivotal-ui-react/collapse/collapse').BaseCollapse;

    subject = React.render((
      <BaseCollapse header="ima header">
        <h1>Child</h1>
      </BaseCollapse>
    ), root);

    bsPanel = TestUtils.findRenderedComponentWithType(subject, BsPanel);
  });

  it('creates a react-boostrap panel that is collapsible', function() {
    var props = bsPanel.props;
    expect(props.expanded).toBeFalsy();
    expect(props.header).toEqual('ima header');
    expect(props.collapsible).toBeTruthy();
    expect(props.children).toEqual(subject.props.children);
  });

  describe('#handleSelect', function() {
    let clickEvent;
    beforeEach(function() {
      clickEvent = jasmine.createSpyObj('click', ['preventDefault']);
    });

    it('updates the props of the bsPanel', function() {
      subject.handleSelect(clickEvent);
      expect(bsPanel.props.expanded).toBeTruthy();
      subject.handleSelect(clickEvent);
      expect(bsPanel.props.expanded).toBeFalsy();
    });

    it('calls preventDefault on the event object', function() {
      subject.handleSelect(clickEvent);
      expect(clickEvent.preventDefault).toHaveBeenCalled();
    });
  });

  describe('when the divider property is set to true', function() {
    beforeEach(function() {
      subject = React.render((
        <BaseCollapse header="ima header" divider>
          <h1>Child</h1>
        </BaseCollapse>
      ), root);
      bsPanel = TestUtils.findRenderedComponentWithType(subject, BsPanel);
    });

    it('wraps the body content in the panel-body-accordion-divider class', function() {
      expect(TestUtils.findRenderedDOMComponentWithClass(subject, 'panel-divider')).toBeTruthy();
    });
  });
});

describe('Collapse', function() {
  var Collapse, subject;
  beforeEach(function() {
    Collapse = require('../../../src/pivotal-ui-react/collapse/collapse').Collapse;

    subject = TestUtils.renderIntoDocument(
      <Collapse header="ima header">
        <h1>Child</h1>
      </Collapse>
    );
  });

  it('contains a right-caret as its collapsed icon', function() {
    var collapsedIconContainer = TestUtils.findRenderedDOMComponentWithClass(subject, 'when-collapsed-inline');
    expect(TestUtils.findRenderedDOMComponentWithClass(collapsedIconContainer, 'fa-caret-right')).toBeTruthy();
  });

  it('contains a down-caret as its collapsed icon', function() {
    var expandedIconContainer = TestUtils.findRenderedDOMComponentWithClass(subject, 'when-expanded-inline');
    expect(TestUtils.findRenderedDOMComponentWithClass(expandedIconContainer, 'fa-caret-down')).toBeTruthy();
  });
});

describe('AltCollapse', function() {
  var AltCollapse, subject;
  beforeEach(function() {
    AltCollapse = require('../../../src/pivotal-ui-react/collapse/collapse').AltCollapse;

    subject = React.render((
      <AltCollapse header="ima header">
        <h1>Child</h1>
      </AltCollapse>
    ), root);
  });

  it('contains a plus as its collapsed icon', function() {
    var collapsedIconContainer = TestUtils.findRenderedDOMComponentWithClass(subject, 'when-collapsed-inline');
    expect(TestUtils.findRenderedDOMComponentWithClass(collapsedIconContainer, 'fa-plus-square')).toBeTruthy();
  });

  it('contains a minus as its collapsed icon', function() {
    var expandedIconContainer = TestUtils.findRenderedDOMComponentWithClass(subject, 'when-expanded-inline');
    expect(TestUtils.findRenderedDOMComponentWithClass(expandedIconContainer, 'fa-minus-square')).toBeTruthy();
  });
});

describe('BaseCollapse behavior', function() {
  var BaseCollapse;

  beforeEach(function() {
    BaseCollapse = require('../../../src/pivotal-ui-react/collapse/collapse').BaseCollapse;

    React.render((
      <BaseCollapse header="This is my heading">
        Collapse contents!
      </BaseCollapse>
    ), root);
  });

  afterEach(function() {
    React.unmountComponentAtNode(root);
  });

  // We should extract this test into a feature test
  xit('allows for expanding and collapsing of contents', function() {
    jasmine.clock().tick(500);
    expect('.panel-collapse').toBeHidden();
    expect('#root a').toHaveText('This is my heading');
    $('#root a').simulate('click');

    jasmine.clock().tick(500);
    expect('.panel-collapse').not.toBeHidden();
    expect('#root a').toHaveText('This is my heading');
    $('#root a').simulate('click');

    jasmine.clock().tick(500);
    expect('.panel-collapse').toBeHidden();
    expect('#root a').toHaveText('This is my heading');
  });
});
