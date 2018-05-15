import {Collapsible} from '../../../src/react/collapsible';

describe('Collapsible', () => {
  let onEnteredSpy, onExitedSpy, subject;

  const render = delay => {
    onEnteredSpy = jasmine.createSpy('onEntered');
    onExitedSpy = jasmine.createSpy('onExited');
    class Klass extends React.Component {
      constructor(props, context) {
        super(props, context);
        this.state = {expanded: false};
      }

      toggle = () => {
        this.setState({expanded: !this.state.expanded});
      };

      render() {
        return (
          <div>
            <button className="pui-collapse-toggle" onClick={this.toggle}>Click to Toggle</button>
            <Collapsible {...this.state} onEntered={onEnteredSpy} onExited={onExitedSpy} delay={delay}>
              <div style={{height: 24}} className="maybe">cat</div>
            </Collapsible>
          </div>
        );
      }
    }

    subject = ReactDOM.render(<Klass />, root);
  };

  beforeEach(() => {
    render(200);
  });

  afterEach(() => {
    MockRaf.next();
  });

  it('renders children hidden by default', () => {
    expect('.pui-collapsible').not.toHaveClass('in');
  });

  it('shows children if expanded is true', () => {
    $('.pui-collapse-toggle').simulate('click');

    MockNow.tick(200);
    MockRaf.next();

    expect('.pui-collapsible').toHaveClass('in');
    expect('.pui-collapsible .maybe').toExist();
  });

  it('animates while expanding', () => {
    $('.pui-collapse-toggle').simulate('click');

    MockNow.tick(200);
    MockRaf.next();
    MockRaf.next();

    expect('.pui-collapsible-shield').toHaveCss({marginBottom: '0px'});
  });

  it('calls onEntered when done opening', () => {
    $('.pui-collapse-toggle').simulate('click');

    expect(onEnteredSpy).not.toHaveBeenCalled();
    MockNow.tick(200);
    MockRaf.next();
    MockRaf.next();
    expect(onEnteredSpy).toHaveBeenCalled();
    expect(onExitedSpy).not.toHaveBeenCalled();
  });

  it('calls onExited when done closing', () => {
    $('.pui-collapse-toggle').simulate('click');

    MockNow.tick(200);
    MockRaf.next();
    MockRaf.next();
    $('.pui-collapse-toggle').simulate('click');

    expect(onExitedSpy).not.toHaveBeenCalled();
    onEnteredSpy.calls.reset();
    MockNow.tick(200);
    MockRaf.next();
    MockRaf.next();
    expect(onExitedSpy).toHaveBeenCalled();
    expect(onEnteredSpy).not.toHaveBeenCalled();
  });

  describe('when there is no 200', () => {
    beforeEach(() => {
      render(0);
    });

    it('expands instantly', () => {
      $('.pui-collapse-toggle').simulate('click');

      expect('.pui-collapsible-shield').toHaveCss({marginBottom: '0px'});
    });

    it('calls onEntered when done opening', () => {
      $('.pui-collapse-toggle').simulate('click');

      expect(onEnteredSpy).toHaveBeenCalled();
      expect(onExitedSpy).not.toHaveBeenCalled();
    });

    it('calls onExited when done closing', () => {
      $('.pui-collapse-toggle').simulate('click');

      onEnteredSpy.calls.reset();
      $('.pui-collapse-toggle').simulate('click');

      expect(onExitedSpy).toHaveBeenCalled();
      expect(onEnteredSpy).not.toHaveBeenCalled();
    });
  });
});
