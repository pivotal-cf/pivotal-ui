import '../spec_helper' ;
import {BaseCollapse, Collapse, AltCollapse} from '../../../src/react/collapse';
import {Collapsible} from '../../../src/react/collapsible';

describe('BaseCollapse', () => {
  let subject;

  beforeEach(() => {
    spyOn(Collapsible.prototype, 'render').and.callThrough();
    subject = shallow((
      <BaseCollapse header="ima header">
        <h1>Child</h1>
      </BaseCollapse>
    ));
  });

  it('creates a collapsed panel', () => {
    expect(subject.find('.pui-collapse-panel-title').text()).toBe('ima header');
    expect(Collapsible).toHaveBeenRenderedWithProps(
      jasmine.objectContaining({expanded: false}));
    expect(subject.find('.pui-collapse-panel-body').text()).toBe('Child');
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
      subject.setProps({divider: true});
    });

    it('renders a divider on top of the panel body', () => {
      expect(subject.find('.pui-collapse').hasClass('pui-collapse-divider')).toBeTruthy();
    });
  });

  describe('when the defaultExpanded property is set to true', () => {
    beforeEach(() => {
      ReactDOM.unmountComponentAtNode(root);
      subject = shallow((
        <BaseCollapse header="ima header" defaultExpanded={true}>
          <h1>Child</h1>
        </BaseCollapse>
      ));
    });

    it('starts out expanded', () => {
      expect(Collapsible).toHaveBeenRenderedWithProps(
        jasmine.objectContaining({expanded: true}));
    });
  });
});

describe('Collapse', () => {
  beforeEach(() => {
    subject = shallow(
      <Collapse header="ima header" className="test-class" style={{opacity: 0.5}}>
        <h1>Child</h1>
      </Collapse>,
      root);
  });

  it('passes through className', () => {
    expect(subject.find('.pui-collapse').hasClass('test-class')).toBeTruthy();
  });

  it('passes through style', () => {
    expect(subject.find('.pui-collapse').prop('style')).toEqual({opacity: 0.5});
  });

  it('contains a right-caret as its collapsed icon when closed', () => {
    expect(subject.find('svg').hasClass('icon-arrow_drop_right')).toBeTruthy();
  });

  it('contains a down-caret as its collapsed icon when open', () => {
    $('.pui-collapse-panel-title svg').simulate('click');
    expect(subject.find('svg').hasClass('icon-arrow_drop_down')).toBeTruthy();
  });
});

describe('AltCollapse', () => {
  beforeEach(() => {
    subject = shallow(
      <AltCollapse header="ima header">
        <h1>Child</h1>
      </AltCollapse>
      );
  });

  it('contains a right-caret as its collapsed icon when closed', () => {
    expect(subject.find('svg').hasClass('icon-add_circle')).toBeTruthy();
  });

  it('contains a down-caret as its collapsed icon when open', () => {
    $('.pui-collapse-panel-title svg').simulate('click');
    expect(subject.find('svg').hasClass('icon-remove_circle')).toBeTruthy();
  });
});
