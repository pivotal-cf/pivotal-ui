require('../spec_helper')
import {PortalSource, PortalDestination} from '../../../src/pivotal-ui-react/portals/portals'
import ReactTestUtils from 'react-addons-test-utils'

describe('Portals', function() {
  let subject

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
      spyOn(console, 'warn')
      subject = ReactDOM.render(
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
        </div>, container)

      expect(console.warn).toHaveBeenCalledWith('Warning: Multiple destination portals with the same name "chell" detected.')
    })
  })

  describe('when there is more than one source portal with the same name', function() {
    it('renders the content for both source portals in the destination portal', function() {
      subject = ReactDOM.render(
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
        </div>, container)

      const orange = subject.getElementsByClassName('orange')[0]
      expect(orange.getElementsByClassName('potato')).toHaveLength(1)
      expect(orange.getElementsByClassName('lemon')).toHaveLength(1)

      const blue = subject.getElementsByClassName('blue')[0]
      expect(blue.getElementsByClassName('potato')).toHaveLength(0)
      expect(blue.getElementsByClassName('lemon')).toHaveLength(0)
    })
  })


  describe('when the portals are rendered source first then destination', function() {
    class Context extends React.Component {
      constructor(props, context) {
        super(props, context)
        this.state = {visible: true}
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
        )
      }
    }

    it('does not render the source portal content', function() {
      subject = ReactDOM.render(<Context/>, container)
      const blue = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'blue')

      expect(blue).not.toHaveText('Potato')
    })

    it('renders the source portal into the destination portal', function() {
      subject = ReactDOM.render(<Context/>, container)
      const orange = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'orange')

      expect(orange).toHaveText('Potato')
    })

    describe('when the blue contents change', function() {
      it('updates in the destination portal', function() {
        subject = ReactDOM.render(<Context/>, container)
        const potato = subject.refs.potato
        potato.setState({cake: true})
        const orange = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'orange')

        expect(orange).not.toHaveText('Potato')
        expect(orange).toHaveText('cake is a lie')
      })
    })

    describe('when the blue contents unmount', function() {
      it('cleans up the div in the destination portal', function() {
        subject = ReactDOM.render(<Context/>, container)
        subject.setState({visible: false})
        const orange = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'orange')

        expect(orange.getElementsByTagName('div')).toHaveLength(1)
      })
    })
  })

  describe('when the portals are rendered destination first then source', function() {
    const renderComponent = () => ReactDOM.render(
        <div>
          <div className="orange">
            <PortalDestination name="chell"/>
          </div>
          <div className="blue">
            <PortalSource name="chell">
              <Potato/>
            </PortalSource>
          </div>
        </div>, container)


    it('does not render the source portal content', function() {
      subject = renderComponent()
      const blue = subject.getElementsByClassName('blue')[0]

      expect(blue).not.toHaveText('Potato')
    })

    it('renders the source portal into the destination portal', function() {
      subject = renderComponent()
      const orange = subject.getElementsByClassName('orange')[0]

      expect(orange).toHaveText('Potato')
    })
  })

  describe('with multiple portal pairs', function() {
    beforeEach(function() {

    })


    it('renders the source portal contents in the correct destination portals', function() {
      subject = ReactDOM.render(
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
        </div>, container)

      const orangeChell = subject.getElementsByClassName('orange-chell')[0]
      expect(orangeChell).toHaveText('Potato')

      const orangeWheatley = subject.getElementsByClassName('orange-wheatley')[0]
      expect(orangeWheatley).toContainText('Stop panicking!')
    })
  })
})
