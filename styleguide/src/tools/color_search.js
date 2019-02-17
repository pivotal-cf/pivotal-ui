import React from 'react';
import {Grid, FlexCol} from '../../../src/react/flex-grids';
import {TextFilter} from '../../../src/react/text-filter';
import {colorNames} from '../helpers/colors';

export default function ColorSearch() {
  return (
    <TextFilter {...{
      className: 'mhl',
      filterPlaceholderText: 'Search colors...',
      data: colorNames,
      emptyState: (
        <Grid className="border mtxl txt-c">
          <FlexCol className="paxl">No matching colors</FlexCol>
        </Grid>
      ),
      filter: (colorNames, filterText) => colorNames.filter(iconName => iconName.indexOf(filterText.toLowerCase()) > -1),
      renderFilteredData: colorNames => (
        <div className="border mtxl">
          {colorNames.map(colorName => {
            const rgbValueToHex = value => {
              return parseInt(value, 10).toString(16).padStart(2, '0');
            };

            const calculateHexCodes = () => {
              const selector = document.querySelector(`.grid .bg-${colorName}`);
              const rbgCode = window.getComputedStyle(selector).backgroundColor;
              const rbgElems = rbgCode.substring(4, rbgCode.length-1).split(',');
              const hexCode = '#' + rgbValueToHex(rbgElems[0]) + rgbValueToHex(rbgElems[1]) + rgbValueToHex(rbgElems[2]);
              document.getElementById(`hex-${colorName}`).innerHTML = hexCode;
            };

            return (
              <Grid key={colorName} className="maxl" ref={calculateHexCodes}>
                <FlexCol fixed className={`bg-${colorName}`} style={{width: '100px'}}/>
                <FlexCol className="pal txt-c">{colorName}</FlexCol>
                <FlexCol className="pal txt-c"><code>bg-{colorName}</code></FlexCol>
                <FlexCol className="pal txt-c"><code>type-{colorName}</code></FlexCol>
                <FlexCol className="pal txt-c"><code id={`hex-${colorName}`}/></FlexCol>
              </Grid>
            );
          })}
        </div>
      )
    }}/>
  );
}