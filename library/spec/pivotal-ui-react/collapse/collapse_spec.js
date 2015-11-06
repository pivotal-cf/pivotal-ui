require('../spec_helper');

describe('BaseCollapse', function() {
  var BsPanel, BaseCollapse, subject, bsPanel, TestUtils;

  beforeEach(() => {
    TestUtils = require('react-addons-test-utils');
    BsPanel = require('react-bootstrap/lib/Panel');
    BaseCollapse = require('../../../src/pivotal-ui-react/collapse/collapse').BaseCollapse;
  });

  it('creates a react-boostrap panel that is collapsible', function() {
    subject = ReactDOM.render((
      <BaseCollapse header="ima header">
        <h1>Child</h1>
      </BaseCollapse>
    ), root);

    bsPanel = TestUtils.findRenderedComponentWithType(subject, BsPanel);

    var props = bsPanel.props;
    expect(props.expanded).toBeFalsy();
    expect(props.header).toEqual('ima header');
    expect(props.collapsible).toBeTruthy();
    expect(props.children).toEqual(subject.props.children);
  });

  describe('#handleSelect', function() {
    let clickEvent;

    beforeEach(function() {
      subject = ReactDOM.render((
        <BaseCollapse header="ima header">
          <h1>Child</h1>
        </BaseCollapse>
      ), root);

      bsPanel = TestUtils.findRenderedComponentWithType(subject, BsPanel);

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
      subject = ReactDOM.render((
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
  describe('when the defaultExpanded property is set to true', () => {
    it('starts out expanded', () => {
      subject = ReactDOM.render((
        <BaseCollapse header="ima header" defaultExpanded={true}>
          <h1>Child</h1>
        </BaseCollapse>
      ), root);

      bsPanel = TestUtils.findRenderedComponentWithType(subject, BsPanel);

      expect(bsPanel.props.expanded).toBeTruthy();
    });
  });
});

describe('Collapse', function() {
  var Collapse, props;
  beforeEach(function() {
    Collapse = require('../../../src/pivotal-ui-react/collapse/collapse').Collapse;

    props = {
      className: 'test-class',
      style: {
        opacity: '0.5'
      }
    };

    ReactDOM.render(
      <Collapse header="ima header" {...props}>
        <h1>Child</h1>
      </Collapse>,
      root);
  });

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(root);
  });

  it('passes through className', function() {
    expect('#root .panel').toHaveClass('test-class');
  });

  it('passes through style', function() {
    expect('#root .panel').toHaveCss({opacity: '0.5'});
  });

  it('contains a right-caret as its collapsed icon', function() {
    expect('#root when-collapsed-inline fa-caret-right').toBeTruthy();
  });


  it('contains a down-caret as its collapsed icon', function() {
    expect('#root when-expanded-inline fa-caret-down').toBeTruthy();
  });
});

describe('AltCollapse', function() {
  var AltCollapse;
  beforeEach(function() {
    AltCollapse = require('../../../src/pivotal-ui-react/collapse/collapse').AltCollapse;

    ReactDOM.render(
      <AltCollapse header="ima header">
        <h1>Child</h1>
      </AltCollapse>
    , root);
  });

  it('contains a plus as its collapsed icon', function() {
    expect('.when-collapsed-inline .fa').toHaveClass('fa-plus-square');
  });

  it('contains a minus as its collapsed icon', function() {
    expect('.when-expanded-inline .fa').toHaveClass('fa-minus-square');
  });
});

describe('BaseCollapse behavior', function() {
  var BaseCollapse;

  beforeEach(function() {
    BaseCollapse = require('../../../src/pivotal-ui-react/collapse/collapse').BaseCollapse;

    ReactDOM.render((
      <BaseCollapse header="This is my heading">
        Collapse contents!
      </BaseCollapse>
    ), root);
  });

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(root);
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
