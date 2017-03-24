import '../spec_helper'
import {BaseCollapse, Collapse, AltCollapse} from 'pui-react-collapse'
import {Collapsible} from 'pui-react-collapsible'
import {findByClass, findByTag, clickOn} from '../spec_helper'

let subject
describe('BaseCollapse', () => {

  const renderIntoDom = props => ReactDOM.render(
    <BaseCollapse {...props}>
      <h1>Child</h1>
    </BaseCollapse>, root
  )

  it('creates a collapsed panel', () => {
    subject = renderIntoDom({header: 'ima header'})
    expect(findByClass(subject, 'panel-title')).toHaveText('ima header')
    expect(findByClass(subject, 'collapse')).not.toHaveClass('in')
    expect(findByClass(subject, 'panel-body')).toHaveText('Child')
  })

  describe('opening and closing', () => {
    it('updates the props of the bsPanel', () => {
      subject = renderIntoDom({header: 'ima header'})

      clickOn(findByTag(subject, 'a'))
      expect(findByClass(subject, 'collapse')).toHaveClass('in')
      clickOn(findByTag(subject, 'a'))
      expect(findByClass(subject, 'collapse')).not.toHaveClass('in')
    })
  })

  describe('when the divider property is set to true', () => {
    beforeEach(() => {
      subject = renderIntoDom({divider: true, header: 'a header'})
    })

    it('renders a divider on top of the panel body', () => {
      expect(findByClass(subject, 'panel')).toHaveClass('panel-divider')
    })
  })

  describe('when the defaultExpanded property is set to true', () => {
    beforeEach(() => {
      subject = renderIntoDom({header: 'a header', defaultExpanded: true})
    })

    it('starts out expanded', () => {
      expect(findByClass(subject, 'collapse')).toHaveClass('in')
    })
  })
})

describe('Collapse', () => {
  const renderIntoDom = props => ReactDOM.render(
    <Collapse {...props}>
      <h1>Child</h1>
    </Collapse>, root
  )

  beforeEach(() => {
    subject = renderIntoDom({className: 'test-class', style: {opacity: 0.5}, header: 'a header'})
  })

  it('passes through className', () => {
    expect(findByClass(subject, 'panel')).toHaveClass('test-class')
  })

  it('passes through style', () => {
    expect(findByClass(subject, 'panel')).toHaveCss({opacity: '0.5'})
  })

  it('contains a right-caret as its collapsed icon when closed', () => {
    expect(findByTag(subject, 'svg')).toHaveClass('icon-arrow_drop_right')
  })

  it('contains a down-caret as its collapsed icon when open', () => {
    clickOn(findByTag(subject, 'svg'))
    expect(findByTag(subject, 'svg')).toHaveClass('icon-arrow_drop_down')
  })
})

describe('AltCollapse', () => {
  const renderIntoDom = props => ReactDOM.render(
    <AltCollapse {...props}>
      <h1>Child</h1>
    </AltCollapse>, root
  )

  beforeEach(() => {
    subject = renderIntoDom({header: 'a header'})
  })

  it('contains a right-caret as its collapsed icon when closed', () => {
    expect(findByTag(subject, 'svg')).toHaveClass('icon-add_circle')
  })

  it('contains a down-caret as its collapsed icon when open', () => {
    clickOn(findByTag(subject, 'svg'))
    expect(findByTag(subject, 'svg')).toHaveClass('icon-remove_circle')
  })
})