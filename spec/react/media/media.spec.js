import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import {Media, Flag} from '../../../src/react/media';

describe('Media', () => {
  const renderComponent = props => ReactDOM.render(<Media {...props}>fop</Media>, root);
  const image = <img src="http://placehold.it/20x20" alt="my fancy image description" height="50px" width="40px"/>;

  describe('attributes', () => {
    beforeEach(() => {
      renderComponent({className: 'media-class', image});
    });

    it('creates a media component', () => {
      expect('.media .media-body').toContainText('fop');
    });

    it('passes the provided className onto the .media element', () => {
      expect('.media').toHaveClass('media-class');
    });

    it('passes image attributes through', () => {
      expect('.media img').toHaveAttr('src', 'http://placehold.it/20x20');
      expect('.media img').toHaveAttr('alt', 'my fancy image description');
      expect('.media img').toHaveAttr('height', '50px');
      expect('.media img').toHaveAttr('width', '40px');
    });

    it('confers media-left class on the image container', () => {
      expect('.media .media-left img').toBeDefined();
    });
  });

  describe('when media is left-aligned', () => {
    it('confers media-left class on the image container', () => {
      renderComponent({className: 'media-class', image, placement: 'left'});
      expect('.media .media-left img').toBeDefined();
    });

    it('adds the appropriate class based on media spacing', () => {
      renderComponent({className: 'media-class', image, placement: 'left', mediaSpacing: 'small'});
      expect('.media .media-left').toHaveClass('prs');

      renderComponent({className: 'media-class', image, placement: 'left', mediaSpacing: 'medium'});
      expect('.media .media-left').toHaveClass('prm');

      renderComponent({className: 'media-class', image, placement: 'left', mediaSpacing: 'large'});
      expect('.media .media-left').toHaveClass('prl');

      renderComponent({className: 'media-class', image, placement: 'left', mediaSpacing: 'xlarge'});
      expect('.media .media-left').toHaveClass('prxl');
    });
  });

  describe('when media is right-aligned', () => {
    it('confers media-right class on the image container', () => {
      renderComponent({className: 'media-class', image, placement: 'right'});
      expect('.media .media-right img').toBeDefined();
    });

    it('adds the appropriate class based on media spacing', () => {
      renderComponent({image, placement: 'right', mediaSpacing: 'small'});
      expect('.media .media-right').toHaveClass('pls');

      renderComponent({image, placement: 'right', mediaSpacing: 'medium'});
      expect('.media .media-right').toHaveClass('plm');

      renderComponent({image, placement: 'right', mediaSpacing: 'large'});
      expect('.media .media-right').toHaveClass('pll');

      renderComponent({image, placement: 'right', mediaSpacing: 'xlarge'});
      expect('.media .media-right').toHaveClass('plxl');
    });
  });

  it('confers the appropriate classes to both children based on vAlign', () => {
    ['middle', 'bottom', 'top'].forEach(vAlign => {
      renderComponent({image, vAlign});

      expect('.media .media-body').toHaveClass(`media-${vAlign}`);
      expect('.media .media-left').toHaveClass(`media-${vAlign}`);
    });
  });

  it('confers the appropriate classes based on stackSize', () => {
    renderComponent({image, stackSize: 'xsmall'});
    expect('.media').toHaveClass('media-stackable-xs');

    renderComponent({image, stackSize: 'small'});
    expect('.media').toHaveClass('media-stackable-sm');

    renderComponent({image, stackSize: 'medium'});
    expect('.media').toHaveClass('media-stackable-md');

    renderComponent({image, stackSize: 'large'});
    expect('.media').toHaveClass('media-stackable-lg');
  });

  describe('when custom attributes are set on media', () => {
    it('passes them through', () => {
      renderComponent({
        image,
        innerClassName: 'inner-test-class',
        className: 'test-class',
        id: 'test-id',
        style: {opacity: 0.5}
      });
      expect('.media').toHaveClass('test-class');
      expect('.media').toHaveAttr('id', 'test-id');
      expect('.media').toHaveCss({opacity: '0.5'});
      expect('.media .media-body').toHaveClass('inner-test-class');
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

    expect('.media .media-body').toHaveClass('media-middle');
    expect('.media .media-left').toHaveClass('media-middle');
  });
});