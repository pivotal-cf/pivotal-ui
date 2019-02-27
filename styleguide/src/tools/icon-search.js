import React from 'react';
import {TextFilter} from '../../../src/react/text-filter';
import {Grid, FlexCol} from '../../../src/react/flex-grids';
import {Icon} from '../../../src/react/iconography';
import * as Icons from '../../../src/react/iconography/icons';

const IconSearch = () => (
  <TextFilter {...{
    className: 'mhl',
    filterPlaceholderText: 'Search icons...',
    data: Object.keys(Icons),
    emptyState: (
      <Grid className="border mtxl txt-c">
        <FlexCol className="paxl">No matching icons</FlexCol>
      </Grid>
    ),
    filter: (iconNames, filterText) => iconNames.filter(iconName => iconName.indexOf(filterText.toLowerCase()) > -1),
    renderFilteredData: iconNames => (
      <Grid className="border mtxl">
        {iconNames.map(iconName => {
          return (
            <FlexCol key={iconName} className="txt-c mvxxl" col={6} breakpoint="md">
              <Icon src={iconName} style={{fontSize: '48px'}}/>
              <pre className="pre-unstyled mtl">{iconName}</pre>
            </FlexCol>
          );
        })}
      </Grid>
    )
  }}/>
);

export default IconSearch;