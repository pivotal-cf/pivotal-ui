import ImageRenderer from '../../../src/components/renderers/image_renderer';
import {testRender} from '../../support/matchers/jest_react';

describe('ImageRenderer', () => {
  beforeEach(() => {
    testRender(<ImageRenderer {...{
      id: 'test-img-id',
      className: 'test-img-class',
      title: 'Test title'
    }}/>);
  });

  it('renders an image', () => {
    expect('img.md-image').toHaveClass('test-img-class');
    expect('img.md-image').toHaveAttr('id', 'test-img-id');
    expect('img.md-image').toHaveAttr('title', 'Test title');
  });
});