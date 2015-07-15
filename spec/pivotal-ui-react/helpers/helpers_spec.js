require('../spec_helper');
import {mergeProps} from '../../../src/pivotal-ui-react/helpers/helpers';

describe('mergeProps', function() {
  let subject;
  let defaultProps;
  beforeEach(function() {
    subject = {props: {}};
  });

  function mergedProps() {
    return mergeProps(subject.props, defaultProps);
  }

  describe('when default props are provided', function() {
    beforeEach(function() {
      // provide default props
      defaultProps = {
        className: 'class1',
        id: 'id1',
        style: {
          display: 'block',
          background: 'blue'
        },
        randomKey1: 'preamble'
      };

    });

    describe('when overriding props are provided', function() {
      beforeEach(function() {
        subject.props = {
          className: 'class2',
          id: 'id2',
          style: {display: 'inline'},
          randomKey2: 'stuff',
          randomKey3: 'things'
        };
      });

      it('overrides the id', function() {
        expect(mergedProps().id).toEqual(subject.props.id);
      });

      it('overrides keys under style that are provided', function() {
        expect(mergedProps().style.display).toEqual(subject.props.style.display);
      });

      it('does not override keys under style that are not provided', function() {
        expect(mergedProps().style.background).toEqual(defaultProps.style.background);
      });

      it('combines classNames', function() {
        let classNames = mergedProps().className.split(/\s+/);
        expect(classNames).toContain('class1');
        expect(classNames).toContain('class2');
        expect(classNames.length).toEqual(2);
      });

      it('combines the remainingProps', function() {
        expect(mergedProps().randomKey1).toEqual(defaultProps.randomKey1);
        expect(mergedProps().randomKey2).toEqual(subject.props.randomKey2);
        expect(mergedProps().randomKey3).toEqual(subject.props.randomKey3);
      });
    });

    describe('when overriding props are not provided', function() {
      it('uses the default id', function() {
        expect(mergedProps().id).toEqual(defaultProps.id);
      });

      it('uses the default style', function() {
        expect(mergedProps().style).toEqual(defaultProps.style);
      });

      it('uses the default className', function() {
        expect(mergedProps().className).toEqual(defaultProps.className);
      });

      it('uses the default remainingProps', function() {
        expect(mergedProps().randomKey1).toEqual(defaultProps.randomKey1);
      });
    });
  });

  describe('when default props are not provided', function() {
    describe('when overriding props are provided', function() {
      beforeEach(function() {
        defaultProps = {};
        subject.props = {
          className: 'class2',
          id: 'id2',
          style: {display: 'inline'},
          randomKey2: 'stuff',
          randomKey3: 'things'
        };
      });

      it('uses the overridden id', function() {
        expect(mergedProps().id).toEqual(subject.props.id);
      });

      it('uses the overridden style', function() {
        expect(mergedProps().style).toEqual(subject.props.style);
      });


      it('uses the overridden classNames', function() {
        expect(mergedProps().className).toEqual(subject.props.className);
      });

      it('uses the overridden remainingProps', function() {
        expect(mergedProps().randomKey2).toEqual(subject.props.randomKey2);
        expect(mergedProps().randomKey3).toEqual(subject.props.randomKey3);
      });
    });

    describe('when overriding props are not provided', function() {
      beforeEach(function() {
        defaultProps = {};
        subject.props = {};
      });

      it('uses an undefined id', function() {
        expect(mergedProps().id).toEqual(undefined);
      });

      it('uses an empty style', function() {
        expect(mergedProps().style).toEqual({});
      });


      it('uses an empty string for className', function() {
        expect(mergedProps().className).toEqual('');
      });
    });
  });
});
