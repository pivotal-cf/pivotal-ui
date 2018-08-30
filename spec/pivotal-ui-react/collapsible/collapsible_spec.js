import {Collapsible} from '../../../src/react/collapsible';

describe('Collapsible', () => {
  let onEnteredSpy, onExitedSpy, subject;

  const render = delay => {
    onEnteredSpy = jest.fn().mockName('onEntered');
    onExitedSpy = jest.fn().mockName('onExited');
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

    subject = shallow(<Klass />);
  };

  beforeEach(() => {
    render(200);
  });

  afterEach(() => {
    MockRaf.next();
  });

  it('renders children hidden by default', () => {
    expect(subject.find('.pui-collapsible').hasClass('in')).toBeFalsy();
  });

  it('shows children if expanded is true', () => {
    subject.find('.pui-collapse-toggle').simulate('click');

    MockNow.tick(200);
    MockRaf.next();

    expect(subject.find('.pui-collapsible').hasClass('in')).toBeTruthy();
    expect(subject.find('.pui-collapsible .maybe').exists()).toBeTruthy();
  });

  it('animates while expanding', () => {
    subject.find('.pui-collapse-toggle').simulate('click');

    MockNow.tick(200);
    MockRaf.next();
    MockRaf.next();

    expect(subject.find('.pui-collapsible-shield').prop('style')).toEqual({marginBottom: '0px'});
  });

  it('calls onEntered when done opening', () => {
    subject.find('.pui-collapse-toggle').simulate('click');

    expect(onEnteredSpy).not.toHaveBeenCalled();
    MockNow.tick(200);
    MockRaf.next();
    MockRaf.next();
    expect(onEnteredSpy).toHaveBeenCalled();
    expect(onExitedSpy).not.toHaveBeenCalled();
  });

  it('calls onExited when done closing', () => {
    subject.find('.pui-collapse-toggle').simulate('click');

    MockNow.tick(200);
    MockRaf.next();
    MockRaf.next();
    subject.find('.pui-collapse-toggle').simulate('click');

    expect(onExitedSpy).not.toHaveBeenCalled();
    onEnteredSpy.mockReset();
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
      subject.find('.pui-collapse-toggle').simulate('click');

      expect(subject.find('.pui-collapsible-shield').prop('style')).toEqual({marginBottom: '0px'});
    });

    it('calls onEntered when done opening', () => {
      subject.find('.pui-collapse-toggle').simulate('click');

      expect(onEnteredSpy).toHaveBeenCalled();
      expect(onExitedSpy).not.toHaveBeenCalled();
    });

    it('calls onExited when done closing', () => {
      subject.find('.pui-collapse-toggle').simulate('click');

      onEnteredSpy.mockReset();
      subject.find('.pui-collapse-toggle').simulate('click');

      expect(onExitedSpy).toHaveBeenCalled();
      expect(onEnteredSpy).not.toHaveBeenCalled();
    });
  });
});
