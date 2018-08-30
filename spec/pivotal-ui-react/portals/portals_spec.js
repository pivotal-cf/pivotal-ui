import '../spec_helper';
import {PortalSource, PortalDestination} from '../../../src/react/portals';


describe('Portals', () => {
  let subject;

  class Potato extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {};
    }
    render() {
      var {cake} = this.state;
      return (<div className="potato">{cake ? 'cake is a lie' : 'Potato'}</div>);
    }
  }

  const container = document.createElement('div');

  afterEach(() => {
    // // ReactDOM.unmountComponentAtNode(container); // TODO: remove? // TODO: remove?
  });

  describe('when there is more than one destination portal with the same name', () => {
    it('warns', () => {
      spyOn(console, 'warn');
      subject = shallow(<div>
        <div className="orange">
          <PortalDestination name="chell"/>
        </div>
        <div className="orange">
          <PortalDestination name="chell"/>
        </div>
        <div className="blue">
          <PortalSource name="chell">
            <div className="lemon"/>
          </PortalSource>
        </div>
      </div>);

      expect(console.warn).toHaveBeenCalledWith('Warning: Multiple destination portals with the same name "chell" detected.');
    });
  });

  describe('when there is more than one source portal with the same name', () => {
    it('renders the content for both source portals in the destination portal', () => {
      subject = shallow(<div>
        <div className="orange">
          <PortalDestination name="chell"/>
        </div>
        <div className="blue">
          <PortalSource name="chell">
            <div className="potato"/>
          </PortalSource>
        </div>
        <div className="blue">
          <PortalSource name="chell">
            <div className="lemon"/>
          </PortalSource>
        </div>
      </div>);

      const orange = subject.getElementsByClassName('orange')[0];
      expect(subject.find(orange.getElementsByClassName('potato'))).toHaveLength(1);
      expect(subject.find(orange.getElementsByClassName('lemon'))).toHaveLength(1);

      const blue = subject.getElementsByClassName('blue')[0];
      expect(subject.find(blue.getElementsByClassName('potato'))).toHaveLength(0);
      expect(subject.find(blue.getElementsByClassName('lemon'))).toHaveLength(0);
    });
  });

  describe('when the portals are rendered source first then destination', () => {
    class Context extends React.Component {
      constructor(props, context) {
        super(props, context);
        this.state = {visible: true};
      }

      render() {
        return (
          <div>
            <div className="blue">
              {this.state.visible && <PortalSource name="chell">
                <Potato ref="potato"/>
              </PortalSource>}
            </div>
            <div className="orange">
              <PortalDestination name="chell"/>
            </div>
          </div>
        );
      }
    }

    it('does not render the source portal content', () => {
      subject = shallow(<Context/>);
      const blue = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'blue');

      expect(subject.find(blue).text()).not.toBe('Potato');
    });

    it('renders the source portal into the destination portal', () => {
      subject = shallow(<Context/>);
      const orange = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'orange');

      expect(subject.find(orange).text()).toBe('Potato');
    });

    describe('when the blue contents change', () => {
      it('updates in the destination portal', () => {
        subject = shallow(<Context/>);
        const potato = subject.refs.potato;
        potato.setState({cake: true});
        const orange = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'orange');

        expect(subject.find(orange).text()).not.toBe('Potato');
        expect(subject.find(orange).text()).toBe('cake is a lie');
      });
    });

    describe('when the blue contents unmount', () => {
      it('cleans up the div in the destination portal', () => {
        subject = shallow(<Context/>);
        subject.setState({visible: false});
        const orange = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'orange');

        expect(subject.find(orange.getElementsByTagName('div'))).toHaveLength(1);
      });
    });
  });

  describe('when the portals are rendered destination first then source', () => {
    const renderComponent = () => subject = shallow(<div>
      <div className="orange">
        <PortalDestination name="chell"/>
      </div>
      <div className="blue">
        <PortalSource name="chell">
          <Potato/>
        </PortalSource>
      </div>
    </div>);


    it('does not render the source portal content', () => {
      subject = renderComponent();
      const blue = subject.getElementsByClassName('blue')[0];

      expect(subject.find(blue).text()).not.toBe('Potato');
    });

    it('renders the source portal into the destination portal', () => {
      subject = renderComponent();
      const orange = subject.getElementsByClassName('orange')[0];

      expect(subject.find(orange).text()).toBe('Potato');
    });
  });

  describe('with multiple portal pairs', () => {
    it('renders the source portal contents in the correct destination portals', () => {
      subject = shallow(<div>
        <div className="orange-chell">
          <PortalDestination name="chell"/>
        </div>
        <div className="blue-chell">
          <PortalSource name="chell">
            <Potato/>
          </PortalSource>
        </div>
        <div className="orange-wheatley">
          <PortalDestination name="wheatley"/>
        </div>
        <div className="blue-wheatley">
          <PortalSource name="wheatley">
            <div>Okay don't panic! Alright? Stop panicking! I can still stop this. Ahh. Oh there's a password. It's fine. I'll just hack it. Not a problem... umm...</div>
          </PortalSource>
        </div>
      </div>);

      const orangeChell = subject.getElementsByClassName('orange-chell')[0];
      expect(subject.find(orangeChell).text()).toBe('Potato');

      const orangeWheatley = subject.getElementsByClassName('orange-wheatley')[0];
      expect(subject.find(orangeWheatley).text()).toContain('Stop panicking!');
    });
  });

  describe('when the source is rendered significantly after the destination', () => {
    it('renders the source portal into the destination portal', () => {
      subject = shallow(<div><div className="orange"><PortalDestination name="chell"/></div></div>);
      expect(subject.find('.orange').text()).not.toBe('Potato');
      subject = shallow(<div><div className="orange"><PortalDestination name="chell"/></div><div className="blue">
        <PortalSource name="chell">
          <Potato/>
        </PortalSource>
      </div></div>);
      expect(subject.find('.blue').text()).not.toBe('Potato');
      expect(subject.find('.orange').text()).toBe('Potato');
    });
  });
});
