require('../spec_helper');

describe('BaseCollapse', function() {
  let BaseCollapse, subject, Collapsible;

  beforeEach(() => {
    BaseCollapse = require('../../../src/pivotal-ui-react/collapse/collapse').BaseCollapse;
    Collapsible = require('../../../src/pivotal-ui-react/collapsible/collapsible').Collapsible;
    spyOn(Collapsible.prototype, 'render').and.callThrough();
    subject = ReactDOM.render((
      <BaseCollapse header="ima header">
        <h1>Child</h1>
      </BaseCollapse>
    ), root);
  });

  it('creates a collapsed panel', function() {
    expect('.panel-title').toHaveText('ima header');
    expect(Collapsible).toHaveBeenRenderedWithProps({expanded: false});
    expect('.panel-body').toHaveText('Child');
  });

  describe('opening and closing', function() {
    beforeEach(function() {
      $('.panel-title a').simulate('click');
    });

    it('updates the props of the bsPanel', function() {
      expect(Collapsible).toHaveBeenRenderedWithProps({expanded: true});
      $('.panel-title a').simulate('click');
      expect(Collapsible).toHaveBeenRenderedWithProps({expanded: false});
    });
  });

  describe('when the divider property is set to true', function() {
    beforeEach(function() {
      subject::setProps({divider: true});
    });

    it('renders a divider on top of the panel body', function() {
      expect('.panel').toHaveClass('panel-divider');
    });
  });

  describe('when the defaultExpanded property is set to true', () => {
    beforeEach(() => {
      ReactDOM.unmountComponentAtNode(root);
      ReactDOM.render((
        <BaseCollapse header="ima header" defaultExpanded={true}>
          <h1>Child</h1>
        </BaseCollapse>
      ), root);
    });

    it('starts out expanded', () => {
      expect(Collapsible).toHaveBeenRenderedWithProps({expanded: true});
    });
  });
});

describe('Collapse', function() {
  beforeEach(function() {
    const Collapse = require('../../../src/pivotal-ui-react/collapse/collapse').Collapse;
    ReactDOM.render(
      <Collapse header="ima header" className="test-class" style={{opacity: 0.5}}>
        <h1>Child</h1>
      </Collapse>,
      root);
  });

  it('passes through className', function() {
    expect('.panel').toHaveClass('test-class');
  });

  it('passes through style', function() {
    expect('.panel').toHaveCss({opacity: '0.5'});
  });

  it('contains a right-caret as its collapsed icon when closed', function() {
    expect('.panel-title i').toHaveClass('fa-caret-right');
  });

  it('contains a down-caret as its collapsed icon when open', function() {
    $('.panel-title i').simulate('click');
    expect('.panel-title i').toHaveClass('fa-caret-down');
  });
});

describe('AltCollapse', function() {
  beforeEach(function() {
    const AltCollapse = require('../../../src/pivotal-ui-react/collapse/collapse').AltCollapse;

    ReactDOM.render(
      <AltCollapse header="ima header">
        <h1>Child</h1>
      </AltCollapse>
    , root);
  });

  it('contains a right-caret as its collapsed icon when closed', function() {
    expect('.panel-title i').toHaveClass('fa-plus-square');
  });

  it('contains a down-caret as its collapsed icon when open', function() {
    $('.panel-title i').simulate('click');
    expect('.panel-title i').toHaveClass('fa-minus-square');
  });
});
