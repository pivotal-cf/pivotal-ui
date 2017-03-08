import '../spec_helper';
import ScrimMixin from '../../../src/pivotal-ui-react/mixins/mixins/scrim_mixin';
import mixin from '../../../src/pivotal-ui-react/mixins/mixins';

describe('ScrimMixin', () => {
  let Component;

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
        ReactDOM.render(<Component getDocument={() => undefined}/>, root);
      }).not.toThrow()
    });
  });
});