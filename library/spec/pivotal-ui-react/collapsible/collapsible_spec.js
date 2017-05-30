import {Collapsible} from 'pui-react-collapsible';
import {findByClass, clickOn} from '../spec_helper';

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
            <button className="collapse-toggle" onClick={this.toggle}>Click to Toggle</button>
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
    expect(findByClass(subject, 'collapse')).not.toHaveClass('in');
  });

  it('shows children if expanded is true', () => {
    clickOn(findByClass(subject, 'collapse-toggle'));

    MockNow.tick(200);
    MockRaf.next();

    const collapse = findByClass(subject, 'collapse');

    expect(collapse).toHaveClass('in');
    expect(collapse.querySelector('.maybe')).toBeDefined();
  });

  xit('animates while expanding', () => {
    clickOn(findByClass(subject, 'collapse-toggle'));

    MockNow.tick(200);
    MockRaf.next();

    expect(findByClass(subject, 'collapse-shield')).toHaveAttr('style', /marginBottom: 0px/);
  });

  it('calls onEntered when done opening', () => {
    clickOn(findByClass(subject, 'collapse-toggle'));
    expect(onEnteredSpy).not.toHaveBeenCalled();
    MockNow.tick(200);
    MockRaf.next();
    MockRaf.next();
    expect(onEnteredSpy).toHaveBeenCalled();
    expect(onExitedSpy).not.toHaveBeenCalled();
  });

  it('calls onExited when done closing', () => {
    clickOn(findByClass(subject, 'collapse-toggle'));
    MockNow.tick(200);
    MockRaf.next();
    MockRaf.next();
    clickOn(findByClass(subject, 'collapse-toggle'));
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
      clickOn(findByClass(subject, 'collapse-toggle'));
      expect(findByClass(subject, 'collapse-shield')).toHaveCss({marginBottom: '0px'});
    });

    it('calls onEntered when done opening', () => {
      clickOn(findByClass(subject, 'collapse-toggle'));
      expect(onEnteredSpy).toHaveBeenCalled();
      expect(onExitedSpy).not.toHaveBeenCalled();
    });

    it('calls onExited when done closing', () => {
      clickOn(findByClass(subject, 'collapse-toggle'));
      onEnteredSpy.calls.reset();
      clickOn(findByClass(subject, 'collapse-toggle'));
      expect(onExitedSpy).toHaveBeenCalled();
      expect(onEnteredSpy).not.toHaveBeenCalled();
    });
  });
});
