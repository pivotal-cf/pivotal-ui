import '../spec_helper'

import {Panel, PanelTitle, ShadowPanel} from 'pui-react-panels'

let subject

describe('Panel', () => {
  const renderComponent = props => ReactTestUtils.renderIntoDocument(<Panel {...props}>Sup</Panel>)

  it('creates a panel', () => {
    subject = renderComponent()
    const panel = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'panel')
    const panelBody = panel.getElementsByClassName('panel-body')

    expect(panelBody).toHaveText('Sup')
  })

  describe('when a header is provided', () => {
    describe('when the header is a string', () => {
      beforeEach(() => {
        subject = renderComponent({header: 'This is a title'})
      })

      it('sets the header to the panel', () => {
        const panelHeader = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'panel-header')
        const panelTitle = panelHeader.getElementsByClassName('panel-title-alt')

        expect(panelTitle).toHaveText('This is a title')
      })
    })

    describe('when the header is a node', () => {
      beforeEach(() => {
        subject = renderComponent({header: <div className="custom-panel-class">HEY</div>})
      })

      it('renders the contents without .panel-title-alt', () => {
        const panelHeader = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'panel-header')
        const panelTitle = panelHeader.getElementsByClassName('custom-panel-class')

        expect(panelTitle).toHaveText('HEY')
        expect(panelHeader.getElementsByClassName('panel-title-alt')).toHaveLength(0)
      })
    })

    describe('when the panel header is passed a subtitle', () => {
      beforeEach(() => {
        subject = renderComponent({header: 'hey', subtitle: 'man'})
      })

      it('renders the subtitle', () => {
        expect(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'panel-subtitle')).toHaveText('man')
      })
    })

    describe('when the panel header is passed actions', () => {
      beforeEach(() => {
        subject = renderComponent({
          header: 'hey',
          actions: <div>
            <button key={1}>I'm a button</button>
            <button key={2}>I'm also a button</button>
          </div>
        })
      })

      it('renders the actions', () => {
        const panelActions = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'panel-actions')
        const buttons = panelActions.getElementsByTagName('button')
        expect(buttons).toHaveLength(2)
        expect(buttons[0]).toHaveText("I'm a button")
        expect(buttons[1]).toHaveText("I'm also a button")
      })
    })

    describe('when the panel header is passed with no actions', () => {
      beforeEach(() => {
        subject = renderComponent({header: 'hey'})
      })

      it('does not render the actions', () => {
        expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'panel-actions')).toHaveLength(0)
      })
    })
  })

  describe('when a footer is provided', () => {
    beforeEach(() => {
      subject = renderComponent({footer: 'This is a footer'})
    })

    it('sets the footer to the panel', () => {
      expect(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'panel-footer')).toHaveText('This is a footer')
    })
  })

  describe('pass-through attributes', () => {
    beforeEach(() => {
      subject = renderComponent({
        className: 'foo',
        innerClassName: 'inner-class',
        id: 'outer-id',
        style: {opacity: '0.5'}
      })
    })

    it('passes className, id, and style to the panel outer div', () => {
      const panel = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'panel')
      expect(panel).toHaveClass('foo')
      expect(panel).toHaveAttr('id', 'outer-id')
      expect(panel).toHaveCss({opacity: '0.5'})
    })

    it('sets innerClassName on the panel-body div', () => {
      expect(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'panel-body')).toHaveClass('inner-class')
    })
  })

  describe('when padding is provided', () => {
    beforeEach(() => {
      subject = renderComponent({padding: 'ptl'})
    })

    it('sets the padding as a class on the panel-body', () => {
      expect(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'panel-body')).toHaveClass('ptl')
    })
  })

  describe('when scrollable is set', () => {
    describe('when it is set to true', () => {
      beforeEach(() => {
        subject = renderComponent({scrollable: true})
      })

      it('adds the class "panel-scrollable"', () => {
        expect(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'panel-body')).toHaveClass('panel-scrollable')
      })
    })

    describe('when it is set to a number', () => {
      beforeEach(() => {
        subject = renderComponent({scrollable: 1337})
      })

      it('sets the max-height of the panel-body to to the supplied numerical value', () => {
        expect(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'panel-scrollable')).toHaveCss({maxHeight: '1337px'})
      })
    })

    describe('when header is set', () => {
      beforeEach(() => {
        subject = renderComponent({header: 'hey hey hey hey hey', scrollable: true})
      })

      it('does not scroll the header', () => {
        const panelScrollable = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'panel-scrollable')
        expect(panelScrollable.getElementsByClassName('panel-header')).toHaveLength(0)
      })
    })
  })

  describe('when scrollable is not set', () => {
    beforeEach(() => {
      subject = renderComponent()
    })

    it('does not add the class "panel-scrollable"', () => {
      const panel = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'panel')
      expect(panel).not.toHaveClass('panel-scrollable')
    })
  })
})

describe('PanelTitle', () => {
  const renderComponent = props => ReactTestUtils.renderIntoDocument(<PanelTitle {...props}>Titlist</PanelTitle>)

  let clickSpy
  beforeEach(() => {
    clickSpy = jasmine.createSpy('click')
    subject = renderComponent({className: 'extra-class', onClick: clickSpy})
  })

  it('renders as a panel-title-alt', () => {
    expect(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'panel-title-alt')).toHaveText('Titlist')
  })

  it('passes props through, including classname', () => {
    expect(clickSpy).not.toHaveBeenCalled()
    const panelTitle = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'panel-title-alt')
    ReactTestUtils.Simulate.click(panelTitle)

    expect(panelTitle).toHaveClass('extra-class')
    expect(clickSpy).toHaveBeenCalled()
  })
})

describe('ShadowPanel', () => {
  const renderComponent = props => ReactTestUtils.renderIntoDocument(<ShadowPanel {...props}>Sup</ShadowPanel>)

  it('creates a panel with the default shadow class', () => {
    subject = renderComponent()
    const panel = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'panel')
    const panelBody = panel.getElementsByClassName('panel-body')

    expect(panelBody).toHaveText('Sup')
    expect(panel).toHaveClass('panel-shadow-3')
  })

  describe('when the shadowLevel property is set', () => {
    it('creates a shadow panel with the corresponding level', () => {
      subject = renderComponent({shadowLevel: 2})
      expect(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'panel')).toHaveClass('panel-shadow-2')
    })
  })
})
