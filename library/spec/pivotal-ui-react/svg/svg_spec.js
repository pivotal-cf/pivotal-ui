require('../spec_helper');

describe('Svg', () => {
  let subject, Svg;

  beforeEach(() => {
    Svg = require('../../../src/pivotal-ui-react/svg/svg').Svg;

    class MySvg extends Svg {
      svgPathLoader(src) {
        return require(`babel!svg-react!./${src}.svg`);
      }
    }
    subject = ReactDOM.render(<MySvg src="search"/>, root);
  });

  it('renders an svg', () => {
    expect('svg').toExist();
    expect('svg path').toExist();
  });

  it('renders the svg with the html attributes', () => {
    expect('svg').toHaveAttr('x', '0px');
    expect('svg').toHaveAttr('y', '0px');
    expect('svg').toHaveAttr('viewBox', '0 0 225 225');
  });

  describe('when there are props on the svg', () => {
    it('overrides the html attributes', () => {
      subject::setProps({x: '10px', y: '20px'});
      expect('svg').toHaveAttr('x', '10px');
      expect('svg').toHaveAttr('y', '20px');
    });
  });
});
