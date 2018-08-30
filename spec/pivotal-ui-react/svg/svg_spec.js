import '../spec_helper';
import {Svg} from '../../../src/react/svg';
import ReactDOMServer from 'react-dom/server';

describe('Svg', () => {
  let subject, MySvg;

  beforeEach(() => {
    MySvg = class extends Svg {
      svgPathLoader(src) {
        return require(`!!babel-loader!react-svg-loader?{"svgo":{"plugins":[{"removeUnknownsAndDefaults":false},{"cleanupNumericValues":false},{"removeUselessStrokeAndFill":false}]}}!./${src}.svg`);
      }
    };

    subject = shallow(<MySvg src="search"/>);
  });

  it('renders an svg', () => {
    expect(subject.find('svg').exists()).toBeTruthy();
    expect(subject.find('svg path').exists()).toBeTruthy();
  });

  it('renders the svg with the html attributes', () => {
    expect(subject.find('svg').prop('x')).toBe('0px');
    expect(subject.find('svg').prop('y')).toBe('0px');
    expect(subject.find('svg').prop('viewBox')).toBe('0 0 225 225');
  });

  describe('when there are props on the svg', () => {
    it('overrides the html attributes', () => {
      subject.setProps({x: '10px', y: '20px'});
      expect(subject.find('svg').prop('x')).toBe('10px');
      expect(subject.find('svg').prop('y')).toBe('20px');
    });
  });

  it('works on a server', () => {
    const markup = ReactDOMServer.renderToStaticMarkup(<MySvg className="im-on-a-server" src="foo"/>);
    expect(markup).toEqual('<svg class="im-on-a-server"></svg>');
  });

  describe('when updating the src prop', () => {
    beforeEach(() => {
      spyOn(Svg.prototype, 'setComponent');
      subject.setProps({src: 'add'});
    });

    it('updates the Component state', () => {
      expect(Svg.prototype.setComponent).toHaveBeenCalledWith({src: 'add'});
    });
  });
});
