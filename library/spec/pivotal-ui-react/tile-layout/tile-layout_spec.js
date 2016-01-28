require('../spec_helper');
import {itPropagatesAttributes} from '../support/shared_examples';

describe('TileLayout', () => {
  const {TileLayout} = require('../../../src/pivotal-ui-react/tile-layout/tile-layout');

  it('creates tile-layout', () => {
    ReactDOM.render(<TileLayout></TileLayout>, root);
    expect('#root .tile-layout').toExist();
  });
  it('creates tile-items', () => {
    ReactDOM.render(
      <TileLayout>
        <TileLayout.Item>
          Item 1
        </TileLayout.Item>
        <TileLayout.Item>
          Item 2
        </TileLayout.Item>
      </TileLayout>,
      root
    );

    expect('#root .tile-layout .tile-item:eq(0)')
      .toHaveText('Item 1');
    expect('#root .tile-layout .tile-item:eq(1)')
      .toHaveText('Item 2');
  });
  describe('columns', () => {
    it('supports setting number of columns', () => {
      ReactDOM.render(<TileLayout columns={4}></TileLayout>, root);

      expect('#root .tile-layout').toHaveClass('tile-layout-xs-4');
    });

    it('supports supports setting number of columns for different screen sizes', () => {
      ReactDOM.render(<TileLayout columns={{sm: 4, md: 3, lg: 2, xl: 1}}></TileLayout>, root);

      expect('#root .tile-layout').toHaveClass('tile-layout-sm-4');
      expect('#root .tile-layout').toHaveClass('tile-layout-md-3');
      expect('#root .tile-layout').toHaveClass('tile-layout-lg-2');
      expect('#root .tile-layout').toHaveClass('tile-layout-xl-1');
    });
  });

  describe('gutters', () => {
    it('supports no gutter', () => {
      ReactDOM.render(<TileLayout noGutter></TileLayout>, root);

      expect('#root .tile-layout').not.toHaveClass('tile-gutter');
    });

    it('supports gutter', () => {
      ReactDOM.render(<TileLayout></TileLayout>, root);

      expect('#root .tile-layout').toHaveClass('tile-gutter');
    });
  });

  describe('attributes', () => {
    beforeEach(() => {
      ReactDOM.render(
        <TileLayout className="outer-class" id="outer-id" style={{opacity: '0.5'}}>
          <TileLayout.Item className="inner-class" id="inner-id" style={{opacity: '0'}}>
            Item 1
          </TileLayout.Item>
        </TileLayout>,
        root);
    });
    it("doesn't wipe out tile layout classes", () => {
      expect('#root .tile-layout').toExist();
      expect('#root .tile-layout > .tile-item').toExist();
    });
    itPropagatesAttributes('.tile-layout', {className: 'outer-class', id: 'outer-id', style: {opacity: '0.5'}});
    itPropagatesAttributes('.tile-item', {className: 'inner-class', id: 'inner-id', style: {opacity: '0'}});
  });
});
