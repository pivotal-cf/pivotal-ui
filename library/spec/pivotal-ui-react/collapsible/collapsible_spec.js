require('../spec_helper');

describe('Collapsible', () => {
  const height = 24;
  const delay = 200;
  let Collapsible, onEnteredSpy, onExitedSpy;
  beforeEach(() => {
    Collapsible = require('../../../src/pivotal-ui-react/collapsible/collapsible').Collapsible;
    onEnteredSpy = jasmine.createSpy('onEntered');
    onExitedSpy = jasmine.createSpy('onExited');
    class Klass extends React.Component {
      constructor(props, context) {
        super(props, context);
        this.state = {expanded: false}
      }

      toggle = () => {
        this.setState({expanded: !this.state.expanded});
      };

      render() {
        return (
          <div>
            <button className="collapse-toggle" onClick={this.toggle}>Click to Toggle</button>
            <Collapsible {...this.state} onEntered={onEnteredSpy} onExited={onExitedSpy} delay={delay}>
              <div style={{height}} className="maybe">cat</div>
            </Collapsible>
          </div>
        )
      }
    }
    ReactDOM.render(<Klass/>, root);
  });

  afterEach(() => {
    MockRaf.next();
  });

  it('renders children hidden by default', () => {
    expect('.collapse').not.toHaveClass('in');
  });

  it('shows children if expanded is true', () => {
    $('.collapse-toggle').simulate('click');

    MockNow.tick(delay);
    MockRaf.next();

    expect('.collapse.in .maybe').toExist();
  });

  it('animates while expanding', () => {
    $('.collapse-toggle').simulate('click');
    MockNow.tick(delay);
    MockRaf.next();
    expect('.collapse-shield').toHaveCss({marginBottom: '0px'});
  });
  
  it('calls onEntered when done opening', () => {
    $('.collapse-toggle').simulate('click');
    expect(onEnteredSpy).not.toHaveBeenCalled();
    MockNow.tick(delay);
    MockRaf.next();
    MockRaf.next();
    expect(onEnteredSpy).toHaveBeenCalled();
    expect(onExitedSpy).not.toHaveBeenCalled();
  });


  it('calls onExited when done closing', () => {
    $('.collapse-toggle').simulate('click');
    MockNow.tick(delay);
    MockRaf.next();
    MockRaf.next();
    $('.collapse-toggle').simulate('click');
    expect(onExitedSpy).not.toHaveBeenCalled();
    onEnteredSpy.calls.reset();
    MockNow.tick(delay);
    MockRaf.next();
    MockRaf.next();
    expect(onExitedSpy).toHaveBeenCalled();
    expect(onEnteredSpy).not.toHaveBeenCalled();
  });
});
