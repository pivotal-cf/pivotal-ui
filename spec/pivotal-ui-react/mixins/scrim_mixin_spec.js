import '../spec_helper';
import {default as ScrimMixin} from '../../../src/react/mixins/mixins/scrim_mixin';
import {default as mixin} from '../../../src/react/mixins';


describe('ScrimMixin', () => {
  let Component, subject;

  beforeEach(() => {
    class Klass extends mixin(React.Component).with(ScrimMixin) {
      render() {
        return <div className="component"/>;
      }
    }
    Component = Klass;
  });

  describe('when there is no document', () => {
    it('does not throw an exception', () => {
      expect(() => {
        subject = shallow(<Component getDocument={() => undefined}/>);
      }).not.toThrow();
    });
  });
});