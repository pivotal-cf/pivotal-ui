require('../spec_helper');

describe('Portals', function() {
  let PortalSource, PortalDestination, Potato;
  beforeEach(function() {
    PortalSource = require('../../../src/pivotal-ui-react/portals/portals').PortalSource;
    PortalDestination = require('../../../src/pivotal-ui-react/portals/portals').PortalDestination;
    Potato = class extends React.Component {
      constructor(props, context) {
        super(props, context);
        this.state = {};
      }
      render() {
        var {cake} = this.state;
        return (<div className="potato">{cake ? 'cake is a lie' : 'Potato'}</div>);
      }
    }
  });

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(root);
  });

  describe('when there is more than one destination portal with the same name', function() {
    beforeEach(function() {
      spyOn(console, 'warn');
      ReactDOM.render(
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
        </div>,
        root);
    });

    it('warns', function() {
      expect(console.warn).toHaveBeenCalledWith('Warning: Multiple destination portals with the same name "chell" detected.');
    });
  });

  describe('when there is more than one source portal with the same name', function() {
    beforeEach(function() {
      ReactDOM.render(
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
        </div>,
        root);
    });

    it('renders the content for both source portals in the destination portal', function() {
      expect('.blue .potato').not.toExist();
      expect('.blue .lemon').not.toExist();
      expect('.orange .potato').toExist();
      expect('.orange .lemon').toExist();
    });
  });

  describe('when the portals are rendered source first then destination', function() {
    var potato, context;
    beforeEach(function() {
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
      context = ReactDOM.render(<Context/>, root);
      potato = context.refs.potato;
    });

    it('does not render the source portal content', function() {
      expect('.blue').not.toHaveText('Potato');
    });

    it('renders the source portal into the destination portal', function() {
      expect('.orange').toHaveText('Potato');
    });

    describe('when the blue contents change', function() {
      beforeEach(function() {
        potato.setState({cake: true});
      });

      it('updates in the destination portal', function() {
        expect('.orange').not.toHaveText('Potato');
        expect('.orange').toHaveText('cake is a lie');
      });
    });

    describe('when the blue contents unmount', function() {
      beforeEach(function() {
        context.setState({visible: false});
      });

      it('cleans up the div in the destination portal', function() {
        expect('.orange div').toHaveLength(1);
      });
    });
  });

  describe('when the portals are rendered destination first then source', function() {
    beforeEach(function() {
      ReactDOM.render(
        <div>
          <div className="orange">
            <PortalDestination name="chell"/>
          </div>
          <div className="blue">
            <PortalSource name="chell">
              <Potato/>
            </PortalSource>
          </div>
        </div>,
        root);
    });

    it('does not render the source portal content', function() {
      expect('.blue').not.toHaveText('Potato');
    });

    it('renders the source portal into the destination portal', function() {
      expect('.orange').toHaveText('Potato');
    });
  });

  describe('with multiple portal pairs', function() {
    beforeEach(function() {
      ReactDOM.render(
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
        </div>,
        root);
    });


    it('renders the source portal contents in the correct destination portals', function() {
      expect('.orange-chell').toHaveText('Potato');
      expect('.orange-wheatley').toContainText('Stop panicking!');
    });
  });
});
