import '../spec_helper';
import ReactTestUtils from 'react-addons-test-utils'
import {Image} from '../../../src/pivotal-ui-react/images/images'
import {reactCompPropagatesAttrs} from '../support/shared_examples';

describe('Image', () => {
  const renderComponent = props => ReactTestUtils.renderIntoDocument(<Image src="http://placehold.it/20x20" {...props} />)

  describe('when responsive', () => {
    let result

    beforeEach(() => {
      result = renderComponent({responsive: true})
    })

    it('adds the image-responsive class to the image', () => {
      const component = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'img')
      expect(component).not.toBeNull()
      expect(component.className).toContain('img-responsive')
    })

    describe('when the href is set', function() {
      it('wraps the image in an link', function() {
        result = renderComponent({responsive: true, href: 'http://google.com'})
        const component = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'a')
        expect(component).not.toBeNull()
      })
    })

    reactCompPropagatesAttrs(renderComponent({className: 'foo', id: 'bar', style:{color: 'red'}}), 'foo', 'bar', {color: 'red'})

    it('adds the gutter class to the row', function() {
      const component = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'img')
      expect(component).not.toBeNull()
      expect(component.hasAttribute('src')).toBe(true)
      expect(component.getAttribute('src')).toEqual('http://placehold.it/20x20')
    })
  })

  describe('when responsive is set to be false', () => {
    let result

    beforeEach(() => {
      result = renderComponent({responsive: false})
    })

    it('does not add the image-responsive class to the image', function() {
      const component = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'img')
      expect(component.className).not.toContain('img-responsive')
    })
  })
})
