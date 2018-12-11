import React from 'react';
import PropTypes from 'prop-types';
import {Header} from './header';
import {Sidebar} from './sidebar';
import {Grid, FlexCol} from '../flex-grids';

export class Siteframe extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    headerProps: PropTypes.object,
    sidebarProps: PropTypes.object
  };

  componentDidMount() {
    require('../../css/siteframe');
  }

  render() {
    const {children, headerProps, sidebarProps} = this.props;
    return (
      <div className="pui-siteframe">
        {headerProps && <Header {...headerProps}/>}
        <Grid gutter={false} className="pui-siteframe-body">
          {sidebarProps && <FlexCol fixed><Sidebar {...sidebarProps}/></FlexCol>}
          <FlexCol>{children}</FlexCol>
        </Grid>
      </div>
    );
  }
}