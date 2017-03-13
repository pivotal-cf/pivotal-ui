import '../spec_helper' 
import {mergeProps} from '../../../src/pivotal-ui-react/helpers/helpers'

describe('mergeProps', () => {
  let subject
  let defaultProps
  beforeEach(() => {
    subject = {props: {}}
  })

  function mergedProps() {
    return mergeProps(subject.props, defaultProps)
  }

  describe('when default props are provided', () => {
    beforeEach(() => {
      defaultProps = {
        className: 'class1',
        id: 'id1',
        style: {
          display: 'block',
          background: 'blue'
        },
        randomKey1: 'preamble'
      }

    })

    describe('when overriding props are provided', () => {
      beforeEach(() => {
        subject.props = {
          className: 'class2',
          id: 'id2',
          style: {display: 'inline'},
          randomKey2: 'stuff',
          randomKey3: 'things'
        }
      })

      it('overrides the id', () => {
        expect(mergedProps().id).toEqual(subject.props.id)
      })

      it('overrides keys under style that are provided', () => {
        expect(mergedProps().style.display).toEqual(subject.props.style.display)
      })

      it('does not override keys under style that are not provided', () => {
        expect(mergedProps().style.background).toEqual(defaultProps.style.background)
      })

      it('combines classNames', () => {
        let classNames = mergedProps().className.split(/\s+/)
        expect(classNames).toContain('class1')
        expect(classNames).toContain('class2')
        expect(classNames.length).toEqual(2)
      })

      it('combines the remainingProps', () => {
        expect(mergedProps().randomKey1).toEqual(defaultProps.randomKey1)
        expect(mergedProps().randomKey2).toEqual(subject.props.randomKey2)
        expect(mergedProps().randomKey3).toEqual(subject.props.randomKey3)
      })
    })

    describe('when overriding props are not provided', () => {
      it('uses the default id', () => {
        expect(mergedProps().id).toEqual(defaultProps.id)
      })

      it('uses the default style', () => {
        expect(mergedProps().style).toEqual(defaultProps.style)
      })

      it('uses the default className', () => {
        expect(mergedProps().className).toEqual(defaultProps.className)
      })

      it('uses the default remainingProps', () => {
        expect(mergedProps().randomKey1).toEqual(defaultProps.randomKey1)
      })
    })
  })

  describe('when default props are not provided', () => {
    describe('when overriding props are provided', () => {
      beforeEach(() => {
        defaultProps = {}
        subject.props = {
          className: 'class2',
          id: 'id2',
          style: {display: 'inline'},
          randomKey2: 'stuff',
          randomKey3: 'things'
        }
      })

      it('uses the overridden id', () => {
        expect(mergedProps().id).toEqual(subject.props.id)
      })

      it('uses the overridden style', () => {
        expect(mergedProps().style).toEqual(subject.props.style)
      })

      it('uses the overridden classNames', () => {
        expect(mergedProps().className).toEqual(subject.props.className)
      })

      it('uses the overridden remainingProps', () => {
        expect(mergedProps().randomKey2).toEqual(subject.props.randomKey2)
        expect(mergedProps().randomKey3).toEqual(subject.props.randomKey3)
      })
    })

    describe('when overriding props are not provided', () => {
      beforeEach(() => {
        defaultProps = {}
        subject.props = {}
      })

      it('uses an undefined id', () => {
        expect(mergedProps().id).toBeUndefined()
      })

      it('uses an empty style', () => {
        expect(mergedProps().style).toEqual({})
      })

      it('uses an empty string for className', () => {
        expect(mergedProps().className).toEqual('')
      })
    })
  })
})
