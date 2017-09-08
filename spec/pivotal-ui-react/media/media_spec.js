import '../spec_helper';
import {Media, Flag} from '../../../src/react/media';

import {findByClass} from '../spec_helper';

describe('Media', () => {
  let result;
  const renderComponent = props => ReactDOM.render(<Media {...props}>fop</Media>, root);
  const image = <img src="http://placehold.it/20x20" alt="my fancy image description" height="50px" width="40px"/>;
  describe('attributes', () => {
    beforeEach(() => {
      result = renderComponent({className: 'media-class', image});
    });

    it('creates a media component', () => {
      const media = findByClass(result, 'media');
      expect(media.querySelector('.media-body')).toContainText('fop');
    });

    it('passes the provided className onto the .media element', () => {
      expect(findByClass(result, 'media')).toHaveClass('media-class');
    });

    it('passes image attributes through', () => {
      const media = findByClass(result, 'media');
      const img = media.querySelector('img');
      expect(img).toHaveAttr('src', 'http://placehold.it/20x20');
      expect(img).toHaveAttr('alt', 'my fancy image description');
      expect(img).toHaveAttr('height', '50px');
      expect(img).toHaveAttr('width', '40px');
    });

    it('confers media-left class on the image container', () => {
      const media = findByClass(result, 'media');
      expect(media.querySelector('.media-left img')).toBeDefined();
    });
  });

  describe('when media is left-aligned', () => {
    it('confers media-left class on the image container', () => {
      result = renderComponent({className: 'media-class', image, placement: 'left'});
      const media = findByClass(result, 'media');
      expect(media.querySelector('.media-left img')).toBeDefined();
    });

    it('adds the appropriate class based on media spacing', () => {
      result = renderComponent({className: 'media-class', image, placement: 'left', mediaSpacing: 'small'});
      expect(findByClass(result, 'media').querySelector('.media-left')).toHaveClass('prs');

      result = renderComponent({className: 'media-class', image, placement: 'left', mediaSpacing: 'medium'});
      expect(findByClass(result, 'media').querySelector('.media-left')).toHaveClass('prm');

      result = renderComponent({className: 'media-class', image, placement: 'left', mediaSpacing: 'large'});
      expect(findByClass(result, 'media').querySelector('.media-left')).toHaveClass('prl');

      result = renderComponent({className: 'media-class', image, placement: 'left', mediaSpacing: 'xlarge'});
      expect(findByClass(result, 'media').querySelector('.media-left')).toHaveClass('prxl');
    });
  });

  describe('when media is right-aligned', () => {
    it('confers media-right class on the image container', () => {
      result = renderComponent({className: 'media-class', image, placement: 'right'});
      const media = findByClass(result, 'media');
      expect(media.querySelector('.media-right img')).toBeDefined();
    });

    it('adds the appropriate class based on media spacing', () => {
      result = renderComponent({image, placement: 'right', mediaSpacing: 'small'});
      expect(findByClass(result, 'media').querySelector('.media-right')).toHaveClass('pls');

      result = renderComponent({image, placement: 'right', mediaSpacing: 'medium'});
      expect(findByClass(result, 'media').querySelector('.media-right')).toHaveClass('plm');

      result = renderComponent({image, placement: 'right', mediaSpacing: 'large'});
      expect(findByClass(result, 'media').querySelector('.media-right')).toHaveClass('pll');

      result = renderComponent({image, placement: 'right', mediaSpacing: 'xlarge'});
      expect(findByClass(result, 'media').querySelector('.media-right')).toHaveClass('plxl');
    });
  });

  it('confers the appropriate classes to both children based on vAlign', () => {
    ['middle', 'bottom'].forEach(vAlign => {
      result = renderComponent({image, vAlign});
      const media = findByClass(result, 'media');

      expect(media.querySelector('.media-body')).toHaveClass(`media-${vAlign}`);
      expect(media.querySelector('.media-left')).toHaveClass(`media-${vAlign}`);
    });
  });

  it('confers the appropriate classes based on stackSize', () => {
    result = renderComponent({image, stackSize: 'xsmall'});
    expect(findByClass(result, 'media')).toHaveClass('media-stackable-xs');

    result = renderComponent({image, stackSize: 'small'});
    expect(findByClass(result, 'media')).toHaveClass('media-stackable-sm');

    result = renderComponent({image, stackSize: 'medium'});
    expect(findByClass(result, 'media')).toHaveClass('media-stackable-md');

    result = renderComponent({image, stackSize: 'large'});
    expect(findByClass(result, 'media')).toHaveClass('media-stackable-lg');
  });

  describe('when custom attributes are set on media', () => {
    it('passes them through', () => {
      result = renderComponent({
        image,
        innerClassName: 'inner-test-class',
        className: 'test-class',
        id: 'test-id',
        style: {opacity: 0.5}
      });
      const media = findByClass(result, 'media');
      expect(media).toHaveClass('test-class');
      expect(media).toHaveAttr('id', 'test-id');
      expect(media).toHaveCss({opacity: '0.5'});
      expect(media.querySelector('.media-body')).toHaveClass('inner-test-class');
    });
  });
});

describe('Flag', () => {
  const image = <img src="http://placehold.it/20x20" alt="my fancy image description" height="50px" width="40px"/>;
  const renderComponent = props => ReactDOM.render(<Flag {...props}>fop</Flag>, root);

  it('renders a Media component with vAlign set to middle, regardless of the passed-in vAlign value', () => {
    const result = renderComponent({image, vAlign: 'bottom'});

    const mediaComponent = ReactTestUtils.findRenderedComponentWithType(result, Media);
    expect(mediaComponent).toBeDefined();

    const media = findByClass(mediaComponent, 'media');
    expect(media.querySelector('.media-body')).toHaveClass('media-middle');
    expect(media.querySelector('.media-left')).toHaveClass('media-middle');
  });
});