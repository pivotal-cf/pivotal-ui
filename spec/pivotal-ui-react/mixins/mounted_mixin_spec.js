import '../spec_helper';
import {default as mixin} from '../../../src/react/mixins';
import {default as Mounted} from '../../../src/react/mixins/mixins/mounted_mixin';

describe('MountedMixin', () => {
  let Component, subject;
  beforeEach(() => {
    class Klass extends mixin(React.Component).with(Mounted) {
      render() { return null; }
    }
    Component = Klass;
  });

  describe('#mounted', () => {
    it('returns true when the component is mounted', () => {
      subject = shallow(<Component/>);
      expect(subject.mounted()).toBe(true);
      ReactDOM.unmountComponentAtNode(root);
      expect(subject.mounted()).toBe(false);
    });
  });
});