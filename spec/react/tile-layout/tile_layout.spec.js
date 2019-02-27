import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {TileLayout, TileLayoutItem} from '../../../src/react/tile-layout';

describe('TileLayout', () => {
  const renderComponent = (tileLayoutProps, tileItemProps) => ReactDOM.render(
    <TileLayout {...tileLayoutProps}>
      <TileLayoutItem {...tileItemProps}>
        Item 1
      </TileLayoutItem>
      <TileLayoutItem>
        Item 2
      </TileLayoutItem>
    </TileLayout>,
    root
  );

  it('creates tile-layout', () => {
    renderComponent();
    expect('.tile-layout').toExist();
  });

  it('creates tile-items', () => {
    renderComponent();
    const tileLayout = $('.tile-layout')[0];
    expect(tileLayout.childNodes.length).toEqual(2);

    expect(tileLayout.childNodes[0].className).toEqual('tile-item');
    expect(tileLayout.childNodes[0]).toHaveText('Item 1');
    expect(tileLayout.childNodes[1].className).toEqual('tile-item');
    expect(tileLayout.childNodes[1]).toHaveText('Item 2');
  });

  describe('columns', () => {
    it('supports setting number of columns', () => {
      renderComponent({columns: 4});

      expect('.tile-layout').toHaveClass('tile-layout-xs-4');
    });

    it('supports supports setting number of columns for different screen sizes', () => {
      renderComponent({columns: {sm: 4, md: 3, lg: 2, xl: 1}});

      expect('.tile-layout').toHaveClass('tile-layout-sm-4');
      expect('.tile-layout').toHaveClass('tile-layout-md-3');
      expect('.tile-layout').toHaveClass('tile-layout-lg-2');
      expect('.tile-layout').toHaveClass('tile-layout-xl-1');
    });
  });

  describe('gutters', () => {
    it('supports no gutter', () => {
      renderComponent({noGutter: true});

      expect('.tile-layout').not.toHaveClass('tile-gutter');
    });

    it('has a gutter by default', () => {
      renderComponent();

      expect('.tile-layout').toHaveClass('tile-gutter');
    });
  });

  describe('attributes', () => {
    it('respects the passed-in class, id and style attributes', () => {
      renderComponent({
        className: 'outer-class',
        id: 'outer-id',
        style: {opacity: '0.5'}
      }, {
        className: 'inner-class',
        id: 'inner-id',
        style: {opacity: '0.75'}
      });

      const tileLayout = $('.tile-layout')[0];
      expect(tileLayout).toHaveClass('outer-class');
      expect(tileLayout).toHaveAttr('id', 'outer-id');
      expect(tileLayout).toHaveCss({opacity: '0.5'});

      const tileItem = tileLayout.childNodes[0];
      expect(tileItem).toHaveClass('inner-class');
      expect(tileItem).toHaveAttr('id', 'inner-id');
      expect(tileItem).toHaveCss({opacity: '0.75'});
    });
  });
});
