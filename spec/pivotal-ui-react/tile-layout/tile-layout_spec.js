import '../spec_helper';

import {TileLayout, TileLayoutItem} from '../../../src/react/tile-layout';
import {findByClass} from '../spec_helper';

describe('TileLayout', () => {
  let subject;
  const renderComponent = (tileLayoutProps, tileItemProps) => subject = shallow(<TileLayout {...tileLayoutProps}>
    <TileLayoutItem {...tileItemProps}>
      Item 1
    </TileLayoutItem>
    <TileLayoutItem>
      Item 2
    </TileLayoutItem>
  </TileLayout>);

  it('creates tile-layout', () => {
    const result = renderComponent();
    expect(result.find('.tile-layout')).toBeTruthy();
  });

  it('creates tile-items', () => {
    const result = renderComponent();
    const tileLayout = result.find('.tile-layout');
    expect(tileLayout.childNodes.length).toEqual(2);

    expect(tileLayout.childNodes[0].className).toEqual('tile-item');
    expect(subject.find(tileLayout.childNodes[0]).text()).toBe('Item 1');
    expect(tileLayout.childNodes[1].className).toEqual('tile-item');
    expect(subject.find(tileLayout.childNodes[1]).text()).toBe('Item 2');
  });

  describe('columns', () => {
    it('supports setting number of columns', () => {
      const result = renderComponent({columns: 4});

      const tileLayout = result.find('.tile-layout');
      expect(subject.find(tileLayout).hasClass('tile-layout-xs-4')).toBeTruthy();
    });

    it('supports supports setting number of columns for different screen sizes', () => {
      const result = renderComponent({columns: {sm: 4, md: 3, lg: 2, xl: 1}});

      const tileLayout = result.find('.tile-layout');
      expect(subject.find(tileLayout).hasClass('tile-layout-sm-4')).toBeTruthy();
      expect(subject.find(tileLayout).hasClass('tile-layout-md-3')).toBeTruthy();
      expect(subject.find(tileLayout).hasClass('tile-layout-lg-2')).toBeTruthy();
      expect(subject.find(tileLayout).hasClass('tile-layout-xl-1')).toBeTruthy();
    });
  });

  describe('gutters', () => {
    it('supports no gutter', () => {
      const result = renderComponent({noGutter: true});
      const tileLayout = result.find('.tile-layout');

      expect(subject.find(tileLayout).hasClass('tile-gutter')).toBeFalsy();
    });

    it('has a gutter by default', () => {
      const result = renderComponent();
      const tileLayout = result.find('.tile-layout');

      expect(subject.find(tileLayout).hasClass('tile-gutter')).toBeTruthy();
    });
  });

  describe('attributes', () => {
    it('respects the passed-in class, id and style attributes', () => {
      const result = renderComponent({
        className: 'outer-class',
        id: 'outer-id',
        style: {opacity: '0.5'}
      }, {
        className: 'inner-class',
        id: 'inner-id',
        style: {opacity: '0.75'}
      });

      const tileLayout = result.find('.tile-layout');
      expect(subject.find(tileLayout).hasClass('outer-class')).toBeTruthy();
      expect(subject.find(tileLayout).prop('id')).toBe('outer-id');
      expect(subject.find(tileLayout).prop('style')).toEqual({opacity: '0.5'});

      const tileItem = tileLayout.childNodes[0];
      expect(subject.find(tileItem).hasClass('inner-class')).toBeTruthy();
      expect(subject.find(tileItem).prop('id')).toBe('inner-id');
      expect(subject.find(tileItem).prop('style')).toEqual({opacity: '0.75'});
    });
  });
});
