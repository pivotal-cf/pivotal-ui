import '../spec_helper';
import {Image} from '../../../src/react/images';

describe('Image', () => {
  let subject;

  const renderComponent = props => subject = shallow(<Image src="http://placehold.it/20x20" {...props} />);

  it('adds classname, id, style to the component', () => {
    const result = renderComponent({className: 'foo', id: 'bar', style: {color: 'red'}});

    expect(result).not.toBeNull();
    expect(result.prop('id')).toEqual('bar');
    expect(result.prop('style').color).toEqual('red');
  });

  it('when responsive is set to be false does not add the image-responsive class to the image', () => {
    const result = renderComponent({responsive: false});
    expect(result.hasClass('img-responsive')).toBeFalsy();
  });

  describe('when responsive', () => {
    it('adds the image-responsive class to the image', () => {
      const result = renderComponent({responsive: true});
      expect(result).not.toBeNull();
      expect(result.hasClass('img-responsive')).toBeTruthy();
    });

    describe('when the href is set', () => {
      it('wraps the image in an link', () => {
        const result = renderComponent({responsive: true, href: 'http://google.com'});
        expect(result.is('a')).toBeTruthy();
        expect(result.prop('href')).toBe('http://google.com');
      });
    });

    it('adds the gutter class to the row', () => {
      const result = renderComponent({responsive: true});
      expect(result.is('img')).toBeTruthy();
      expect(result.prop('src')).toEqual('http://placehold.it/20x20');
    });
  });
});
