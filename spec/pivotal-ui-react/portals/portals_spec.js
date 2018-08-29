import '../spec_helper';
import {PortalSource, PortalDestination} from '../../../src/react/portals';


describe('Portals', function() {
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

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(container);
  });

  describe('when there is more than one destination portal with the same name', function() {
    it('warns', function() {
      spyOn(console, 'warn');
      subject = shallow(
        <div>
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
        </div>, container);

      expect(console.warn).toHaveBeenCalledWith('Warning: Multiple destination portals with the same name "chell" detected.');
    });
  });

  describe('when there is more than one source portal with the same name', function() {
    it('renders the content for both source portals in the destination portal', function() {
      subject = shallow(
        <div>
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
        </div>, container);

      const orange = subject.find('.orange')[0];
      expect(orange.find('.potato')).toHaveLength(1);
      expect(orange.find('.lemon')).toHaveLength(1);

      const blue = subject.find('.blue')[0];
      expect(blue.find('.potato')).toHaveLength(0);
      expect(blue.find('.lemon')).toHaveLength(0);
    });
  });

  describe('when the portals are rendered source first then destination', function() {
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

    it('does not render the source portal content', function() {
      subject = shallow(<Context/>, container);
      const blue = subject.find('blue');

      expect(blue).not.toHaveText('Potato');
    });

    it('renders the source portal into the destination portal', function() {
      subject = shallow(<Context/>, container);
      const orange = subject.find('orange');

      expect(subject.find(orange).text()).toBe('Potato');
    });

    describe('when the blue contents change', function() {
      it('updates in the destination portal', function() {
        subject = shallow(<Context/>, container);
        const potato = subject.refs.potato;
        potato.setState({cake: true});
        const orange = subject.find('orange');

        expect(orange).not.toHaveText('Potato');
        expect(subject.find(orange).text()).toBe('cake is a lie');
      });
    });

    describe('when the blue contents unmount', function() {
      it('cleans up the div in the destination portal', function() {
        subject = shallow(<Context/>, container);
        subject.setState({visible: false});
        const orange = subject.find('orange');

        expect(orange.getElementsByTagName('div')).toHaveLength(1);
      });
    });
  });

  describe('when the portals are rendered destination first then source', function() {
    const renderComponent = () => subject = shallow(
        <div>
          <div className="orange">
            <PortalDestination name="chell"/>
          </div>
          <div className="blue">
            <PortalSource name="chell">
              <Potato/>
            </PortalSource>
          </div>
        </div>, container);


    it('does not render the source portal content', function() {
      subject = renderComponent();
      const blue = subject.find('.blue')[0];

      expect(blue).not.toHaveText('Potato');
    });

    it('renders the source portal into the destination portal', function() {
      subject = renderComponent();
      const orange = subject.find('.orange')[0];

      expect(subject.find(orange).text()).toBe('Potato');
    });
  });

  describe('with multiple portal pairs', function() {
    it('renders the source portal contents in the correct destination portals', function() {
      subject = shallow(
        <div>
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
        </div>, container);

      const orangeChell = subject.getElementsByClassName('orange-chell')[0];
      expect(subject.find(orangeChell).text()).toBe('Potato');

      const orangeWheatley = subject.getElementsByClassName('orange-wheatley')[0];
      expect(orangeWheatley).toContainText('Stop panicking!');
    });
  });

  describe('when the source is rendered significantly after the destination', () => {
    it('renders the source portal into the destination portal', () => {
      subject = shallow((<div><div className="orange"><PortalDestination name="chell"/></div></div>));
      expect('.orange').not.toHaveText('Potato');
      subject = shallow(<div><div className="orange"><PortalDestination name="chell"/></div><div className="blue">
        <PortalSource name="chell">
          <Potato/>
        </PortalSource>
      </div></div>);
      expect('.blue').not.toHaveText('Potato');
      expect(subject.find('.orange').text()).toBe('Potato');
    });
  });
});
