import '../../spec_helper';
import HeadingRenderer from '../../../src/components/renderers/heading_renderer';

describe('HeadingRenderer', () => {
  let Heading;

  beforeEach(() => {
    Heading = HeadingRenderer(6);
    ReactDOM.render(<Heading {...{
      className: 'test-heading',
      children: ['I am a heading!']
    }}/>, root);
  });

  it('renders a heading with correct class names', () => {
    expect('h6.test-heading').toHaveClass(['md-heading', 'em-high', 'mvxl']);
  });

  it('gives heading an id based on its text', () => {
    expect('h6.test-heading').toHaveAttr('id', 'i-am-a-heading');
  });
});