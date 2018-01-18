import '../spec_helper' ;
import {BaseCollapse, Collapse, AltCollapse} from '../../../src/react/collapse';
import {Collapsible} from '../../../src/react/collapsible';

describe('BaseCollapse', () => {
  let subject;

  beforeEach(() => {
    spyOn(Collapsible.prototype, 'render').and.callThrough();
    subject = ReactDOM.render((
      <BaseCollapse header="ima header">
        <h1>Child</h1>
      </BaseCollapse>
    ), root);
  });

  it('creates a collapsed panel', () => {
    expect('.pui-collapse-panel-title').toHaveText('ima header');
    expect(Collapsible).toHaveBeenRenderedWithProps(
      jasmine.objectContaining({expanded: false}));
    expect('.pui-collapse-panel-body').toHaveText('Child');
  });

  describe('opening and closing', () => {
    beforeEach(() => {
      $('.pui-collapse-panel-title a').simulate('click');
    });

    it('updates the props of the bsPanel', () => {
      expect(Collapsible).toHaveBeenRenderedWithProps(
        jasmine.objectContaining({expanded: true}));
      $('.pui-collapse-panel-title a').simulate('click');
      expect(Collapsible).toHaveBeenRenderedWithProps(
        jasmine.objectContaining({expanded: false}));
    });
  });

  describe('when the divider property is set to true', () => {
    beforeEach(() => {
      subject::setProps({divider: true});
    });

    it('renders a divider on top of the panel body', () => {
      expect('.pui-collapse').toHaveClass('pui-collapse-divider');
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
      expect(Collapsible).toHaveBeenRenderedWithProps(
        jasmine.objectContaining({expanded: true}));
    });
  });
});

describe('Collapse', () => {
  beforeEach(() => {
    ReactDOM.render(
      <Collapse header="ima header" className="test-class" style={{opacity: 0.5}}>
        <h1>Child</h1>
      </Collapse>,
      root);
  });

  it('passes through className', () => {
    expect('.pui-collapse').toHaveClass('test-class');
  });

  it('passes through style', () => {
    expect('.pui-collapse').toHaveAttr('style', /opacity: 0\.5/);
  });

  it('contains a right-caret as its collapsed icon when closed', () => {
    expect('svg').toHaveClass('icon-arrow_drop_right');
  });

  it('contains a down-caret as its collapsed icon when open', () => {
    $('.pui-collapse-panel-title svg').simulate('click');
    expect('svg').toHaveClass('icon-arrow_drop_down');
  });
});

describe('AltCollapse', () => {
  beforeEach(() => {
    ReactDOM.render(
      <AltCollapse header="ima header">
        <h1>Child</h1>
      </AltCollapse>
      , root);
  });

  it('contains a right-caret as its collapsed icon when closed', () => {
    expect('svg').toHaveClass('icon-add_circle');
  });

  it('contains a down-caret as its collapsed icon when open', () => {
    $('.pui-collapse-panel-title svg').simulate('click');
    expect('svg').toHaveClass('icon-remove_circle');
  });
});
