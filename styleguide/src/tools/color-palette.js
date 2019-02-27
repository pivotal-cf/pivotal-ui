import React from 'react';
import {FlexCol} from '../../../src/react/flex-grids';
import {colorGroups} from '../helpers/colors';

const rgbValueToHex = value => {
  return parseInt(value, 10).toString(16).padStart(2, '0');
};

export default function ColorPalette() {
  return (
    <ul className="mtxl pan">
      {Object.values(colorGroups).map(colorGroup => (
        <div className="border mtxl" key={colorGroup}>
          {colorGroup.map(colorName => {
            const calculateHexCodes = () => {
              const domNode = document.querySelector(`.grid .bg-${colorName}`);
              const rgbCode = window.getComputedStyle(domNode).backgroundColor;
              const rgbElems = rgbCode.substring(4, rgbCode.length - 1).split(',');
              const hexCode = '#' + rgbValueToHex(rgbElems[0]) + rgbValueToHex(rgbElems[1]) + rgbValueToHex(rgbElems[2]);
              document.getElementById(`hex-${colorName}`).innerHTML = hexCode;
            };

            const className = `bg-${colorName} ${colorName === 'white' ? 'border' : ''}`;

            return (
              <li key={colorName} className="grid maxl" ref={calculateHexCodes}>
                <FlexCol className="pal"><code>{colorName}</code></FlexCol>
                <FlexCol fixed className={className} style={{width: '50%'}}/>
                <FlexCol className="pal txt-r"><code id={`hex-${colorName}`}/></FlexCol>
              </li>
            );
          })}
        </div>
      ))}
    </ul>
  );
}