import '../spec_helper' ;

describe('MountedMixin', () => {
  let Component, subject;
  beforeEach(() => {
    const mixin = require('pui-react-mixins');
    const Mounted = require('../../../src/pivotal-ui-react/mixins/mixins/mounted_mixin');
    class Klass extends mixin(React.Component).with(Mounted) {
      render() { return null; }
    }
    Component = Klass;
    subject = ReactDOM.render(<Component/>, root);
  });

  describe('#mounted', () => {
    it('returns true when the component is mounted', () => {
      expect(subject.mounted()).toBe(true);
      ReactDOM.unmountComponentAtNode(root);
      expect(subject.mounted()).toBe(false);
      subject = ReactDOM.render(<Component/>, root);
      expect(subject.mounted()).toBe(true);
    });
  });
});