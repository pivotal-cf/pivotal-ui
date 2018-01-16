import '../spec_helper';
import {Icon} from '../../../src/react/iconography';

describe('iconography', function() {
  afterEach(function() {
    ReactDOM.unmountComponentAtNode(root);
  });

  it('works', function() {
    ReactDOM.render(<Icon src="add"/>, root);
    expect('.icon svg').toExist();
  });

  it('propagates className and id to the span', () => {
    ReactDOM.render(<Icon src="add" className="foo" id="bar"/>, root);
    expect('.icon').toHaveClass('foo');
    expect('.icon').toHaveAttr('id', 'bar');
  });

  describe('verticalAlign', () => {
    it('if verticalAlign is not specified it applies the .icon-middle', () => {
      ReactDOM.render(<Icon src="add"/>, root);
      expect('.icon').toHaveClass('icon-middle');
    });

    it('if verticalAlign=baseline it applies the .icon-middle class', () => {
      ReactDOM.render(<Icon src="add" verticalAlign="middle"/>, root);
      expect('.icon').toHaveClass('icon-middle');
    });

    it('if verticalAlign=baseline it applies the .icon-baseline class', () => {
      ReactDOM.render(<Icon src="add" verticalAlign="baseline"/>, root);
      expect('.icon').toHaveClass('icon-baseline');
    });
  });

  describe('unknown icon', () => {
    beforeEach(() => {
      spyOn(console, 'warn');
      ReactDOM.render(<Icon src="non-existing-icon"/>, root);
    });

    it('renders a help', () => {
      expect('.icon .icon-help').toExist();
    });

    it('logs an error message', () => {
      expect(console.warn).toHaveBeenCalledWith('Icon "non-existing-icon" is not recognized.');
    });
  });
});
