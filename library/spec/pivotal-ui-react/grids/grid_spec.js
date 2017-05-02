import '../spec_helper'
import {itPropagatesAttributes} from '../support/shared_examples'
import {Row, Col} from 'pui-react-grids'
import {findByClass} from '../spec_helper'


describe('Grid', () => {
  const renderComponent = (rowProps, colProps) => ReactTestUtils.renderIntoDocument(
    <Row {...rowProps}>
      <Col {...colProps}/>
    </Row>
  )

  describe('attribute propagation', () => {
    const result = renderComponent(
      {className: 'test-class', id: 'test-id', style: {opacity: 0.75}},
      {md: 9, className: 'test-class2', id: 'test-id2', style: {opacity: 0.5}}
    )

    itPropagatesAttributes(findByClass(result, 'row'), {
      className: 'test-class',
      id: 'test-id',
      style: {opacity: '0.75'}
    })

    itPropagatesAttributes(findByClass(result, 'col-md-9'), {
      className: 'test-class2',
      id: 'test-id2',
      style: {opacity: '0.5'}
    })
  })

  it('adds the gutter class to the row, except for large', () => {
    let result
    ['sm', 'md'].forEach(size => {
      result = renderComponent({gutter: size})
      expect(findByClass(result, 'row')).toHaveClass(`row-gutter-${size}`)
    })

    result = renderComponent({gutter: 'lg'})
    expect(findByClass(result, 'row').className).toEqual('row')
  })

  describe('componentClass', () => {
    const CustomFunctionalClass = props => <a {...props}/>
    class CustomNormalClass extends React.Component {
      render() {
        return <article {...this.props}/>
      }
    }
    it('allows a custom row componentClass', () => {
      const result = ReactTestUtils.renderIntoDocument(
        <div>
          <Row componentClass="span">
            <Col/>
          </Row>
          <Row componentClass={CustomFunctionalClass}>
            <Col/>
          </Row>
          <Row componentClass={CustomNormalClass}>
            <Col/>
          </Row>
        </div>
      )

      expect(result.querySelector('span.row')).toBeDefined()
      expect(result.querySelector('a.row')).toBeDefined()
      expect(result.querySelector('article.row')).toBeDefined()
    })

    it('allows a custom col componentClass', () => {
      const result = ReactTestUtils.renderIntoDocument(
        <Row>
          <Col className="col-1" componentClass={CustomFunctionalClass}/>
          <Col className="col-2" componentClass={CustomNormalClass}/>
          <Col className="col-3" componentClass="span"/>
        </Row>
      )

      const row = findByClass(result, 'row')
      expect(row.querySelector('a.col-1')).toBeDefined()
      expect(row.querySelector('article.col-2')).toBeDefined()
      expect(row.querySelector('span.col-3')).toBeDefined()
    })
  })

  describe('Col sizing', () => {
    let result
    beforeEach(() => {
      result = ReactTestUtils.renderIntoDocument(
        <Row>
          <Col lg={12} className="col-1"/>
          <Col md={12} className="col-2"/>
          <Col sm={12} className="col-3"/>
          <Col xs={12} className="col-4"/>
          <Col xs={24} sm={18} md={12} lg={6} className="col-5"/>
        </Row>
      )
    })

    it('renders the sizes when there is only one', () => {
      expect(findByClass(result, 'col-1')).toHaveClass('col-lg-12')
      expect(findByClass(result, 'col-2')).toHaveClass('col-md-12')
      expect(findByClass(result, 'col-3')).toHaveClass('col-sm-12')
      expect(findByClass(result, 'col-4')).toHaveClass('col-xs-12')
    })

    it('renders multiple sizes at once', () => {
      expect(findByClass(result, 'col-5')).toHaveClass(['col-lg-6', 'col-md-12', 'col-sm-18', 'col-xs-24'])
    })
  })

  describe('Col hiding', () => {
    let result
    beforeEach(() => {
      result = ReactTestUtils.renderIntoDocument(
        <Row>
          <Col {...{lgHidden: true}} className="col-1"/>
          <Col {...{mdHidden: true}} className="col-2"/>
          <Col {...{smHidden: true}} className="col-3"/>
          <Col {...{xsHidden: true}} className="col-4"/>
        </Row>
      )
    })

    it('uses col hidden', () => {
      expect(findByClass(result, 'col-1')).toHaveClass('hidden-lg')
      expect(findByClass(result, 'col-2')).toHaveClass('hidden-md')
      expect(findByClass(result, 'col-3')).toHaveClass('hidden-sm')
      expect(findByClass(result, 'col-4')).toHaveClass('hidden-xs')
    })
  })

  describe('Col offset', () => {
    let result
    beforeEach(() => {
      result = ReactTestUtils.renderIntoDocument(
        <Row>
          <Col {...{lgOffset: 2}} className="col-1"/>
          <Col {...{mdOffset: 2}} className="col-2"/>
          <Col {...{smOffset: 2}} className="col-3"/>
          <Col {...{xsOffset: 2}} className="col-4"/>
        </Row>
      )
    })

    it('adds the offset', () => {
      expect(findByClass(result, 'col-1')).toHaveClass('col-lg-offset-2')
      expect(findByClass(result, 'col-2')).toHaveClass('col-md-offset-2')
      expect(findByClass(result, 'col-3')).toHaveClass('col-sm-offset-2')
      expect(findByClass(result, 'col-4')).toHaveClass('col-xs-offset-2')
    })
  })

  describe('Col push', () => {
    let result
    beforeEach(() => {
      result = ReactTestUtils.renderIntoDocument(
        <Row>
          <Col md={12} {...{lgPush: 2}} className="col-1"/>
          <Col md={12} {...{mdPush: 2}} className="col-2"/>
          <Col md={12} {...{smPush: 2}} className="col-3"/>
          <Col md={12} {...{xsPush: 2}} className="col-4"/>
        </Row>
      )
    })

    it('adds the push', () => {
      expect(findByClass(result, 'col-1')).toHaveClass('col-lg-push-2')
      expect(findByClass(result, 'col-2')).toHaveClass('col-md-push-2')
      expect(findByClass(result, 'col-3')).toHaveClass('col-sm-push-2')
      expect(findByClass(result, 'col-4')).toHaveClass('col-xs-push-2')
    })
  })

  describe('Col pull', () => {
    let result
    beforeEach(() => {
      result = ReactTestUtils.renderIntoDocument(
        <Row>
          <Col md={12} {...{lgPull: 2}} className="col-1"/>
          <Col md={12} {...{mdPull: 2}} className="col-2"/>
          <Col md={12} {...{smPull: 2}} className="col-3"/>
          <Col md={12} {...{xsPull: 2}} className="col-4"/>
        </Row>
      )
    })

    it('adds the pull', () => {
      expect(findByClass(result, 'col-1')).toHaveClass('col-lg-pull-2')
      expect(findByClass(result, 'col-2')).toHaveClass('col-md-pull-2')
      expect(findByClass(result, 'col-3')).toHaveClass('col-sm-pull-2')
      expect(findByClass(result, 'col-4')).toHaveClass('col-xs-pull-2')
    })
  })
})
