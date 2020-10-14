import '../../spec_helper';
import ImageRenderer from '../../../src/components/renderers/image_renderer';

describe('ImageRenderer', () => {
  beforeEach(() => {
    ReactDOM.render(<ImageRenderer {...{
      id: 'test-img-id',
      className: 'test-img-class',
      title: 'Test title'
    }}/>, root);
  });

  it('renders an image', () => {
    expect('img.md-image').toHaveClass('test-img-class');
    expect('img.md-image').toHaveAttr('id', 'test-img-id');
    expect('img.md-image').toHaveAttr('title', 'Test title');
  });
});