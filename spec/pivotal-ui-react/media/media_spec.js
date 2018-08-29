import '../spec_helper';
import {Media, Flag} from '../../../src/react/media';

import {findByClass} from '../spec_helper';

describe('Media', () => {
  let result;
  const renderComponent = props => subject = shallow(<Media {...props}>fop</Media>);
  const image = <img src="http://placehold.it/20x20" alt="my fancy image description" height="50px" width="40px"/>;
  describe('attributes', () => {
    beforeEach(() => {
      result = renderComponent({className: 'media-class', image});
    });

    it('creates a media component', () => {
      const media = result.find('.media');
      expect(media.querySelector('.media-body')).toContainText('fop');
    });

    it('passes the provided className onto the .media element', () => {
      expect(result.find('.media').hasClass('media-class')).toBeTruthy();
    });

    it('passes image attributes through', () => {
      const media = result.find('.media');
      const img = media.querySelector('img');
      expect(subject.find(img).prop('src')).toBe('http://placehold.it/20x20');
      expect(subject.find(img).prop('alt')).toBe('my fancy image description');
      expect(subject.find(img).prop('height')).toBe('50px');
      expect(subject.find(img).prop('width')).toBe('40px');
    });

    it('confers media-left class on the image container', () => {
      const media = result.find('.media');
      expect(media.querySelector('.media-left img')).toBeDefined();
    });
  });

  describe('when media is left-aligned', () => {
    it('confers media-left class on the image container', () => {
      result = renderComponent({className: 'media-class', image, placement: 'left'});
      const media = result.find('.media');
      expect(media.querySelector('.media-left img')).toBeDefined();
    });

    it('adds the appropriate class based on media spacing', () => {
      result = renderComponent({className: 'media-class', image, placement: 'left', mediaSpacing: 'small'});
      expect(result.find('.media').querySelector('.media-left').hasClass('prs')).toBeTruthy();

      result = renderComponent({className: 'media-class', image, placement: 'left', mediaSpacing: 'medium'});
      expect(result.find('.media').querySelector('.media-left').hasClass('prm')).toBeTruthy();

      result = renderComponent({className: 'media-class', image, placement: 'left', mediaSpacing: 'large'});
      expect(result.find('.media').querySelector('.media-left').hasClass('prl')).toBeTruthy();

      result = renderComponent({className: 'media-class', image, placement: 'left', mediaSpacing: 'xlarge'});
      expect(result.find('.media').querySelector('.media-left').hasClass('prxl')).toBeTruthy();
    });
  });

  describe('when media is right-aligned', () => {
    it('confers media-right class on the image container', () => {
      result = renderComponent({className: 'media-class', image, placement: 'right'});
      const media = result.find('.media');
      expect(media.querySelector('.media-right img')).toBeDefined();
    });

    it('adds the appropriate class based on media spacing', () => {
      result = renderComponent({image, placement: 'right', mediaSpacing: 'small'});
      expect(result.find('.media').querySelector('.media-right').hasClass('pls')).toBeTruthy();

      result = renderComponent({image, placement: 'right', mediaSpacing: 'medium'});
      expect(result.find('.media').querySelector('.media-right').hasClass('plm')).toBeTruthy();

      result = renderComponent({image, placement: 'right', mediaSpacing: 'large'});
      expect(result.find('.media').querySelector('.media-right').hasClass('pll')).toBeTruthy();

      result = renderComponent({image, placement: 'right', mediaSpacing: 'xlarge'});
      expect(result.find('.media').querySelector('.media-right').hasClass('plxl')).toBeTruthy();
    });
  });

  it('confers the appropriate classes to both children based on vAlign', () => {
    ['middle', 'bottom'].forEach(vAlign => {
      result = renderComponent({image, vAlign});
      const media = result.find('.media');

      expect(media.querySelector('.media-body').hasClass(`media-${vAlign}`)).toBeTruthy();
      expect(media.querySelector('.media-left').hasClass(`media-${vAlign}`)).toBeTruthy();
    });
  });

  it('confers the appropriate classes based on stackSize', () => {
    result = renderComponent({image, stackSize: 'xsmall'});
    expect(result.find('.media').hasClass('media-stackable-xs')).toBeTruthy();

    result = renderComponent({image, stackSize: 'small'});
    expect(result.find('.media').hasClass('media-stackable-sm')).toBeTruthy();

    result = renderComponent({image, stackSize: 'medium'});
    expect(result.find('.media').hasClass('media-stackable-md')).toBeTruthy();

    result = renderComponent({image, stackSize: 'large'});
    expect(result.find('.media').hasClass('media-stackable-lg')).toBeTruthy();
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
      const media = result.find('.media');
      expect(subject.find(media).hasClass('test-class')).toBeTruthy();
      expect(subject.find(media).prop('id')).toBe('test-id');
      expect(subject.find(media).prop('style')).toEqual({opacity: '0.5'});
      expect(media.querySelector('.media-body').hasClass('inner-test-class')).toBeTruthy();
    });
  });
});

describe('Flag', () => {
  const image = <img src="http://placehold.it/20x20" alt="my fancy image description" height="50px" width="40px"/>;
  const renderComponent = props => subject = shallow(<Flag {...props}>fop</Flag>);

  it('renders a Media component with vAlign set to middle, regardless of the passed-in vAlign value', () => {
    const result = renderComponent({image, vAlign: 'bottom'});

    const mediaComponent = ReactTestUtils.findRenderedComponentWithType(result, Media);
    expect(mediaComponent).toBeDefined();

    const media = mediaComponent.find('.media');
    expect(media.querySelector('.media-body').hasClass('media-middle')).toBeTruthy();
    expect(media.querySelector('.media-left').hasClass('media-middle')).toBeTruthy();
  });
});