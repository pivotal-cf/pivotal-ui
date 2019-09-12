import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Grid, FlexCol} from '../flex-grids';

export class Header extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    cols: PropTypes.array,
    companyName: PropTypes.node.isRequired,
    logo: PropTypes.node,
    productName: PropTypes.node
  };

  static defaultProps = {
    cols: [],
    logo: null
  };

  render() {
    const {className, cols, companyName, logo, productName} = this.props;

    return (
      <Grid className={classnames('pui-siteframe-header', className)}>
        {[
          logo && <FlexCol fixed>
            {logo}
          </FlexCol>,
          <FlexCol fixed className="pui-siteframe-header-title">
            <h4>{companyName} {productName && <span className="em-high">{productName}</span>}</h4>
          </FlexCol>,
          ...cols
        ].filter(Boolean).map((col, key) => React.cloneElement(col, {key}))}
      </Grid>
    );
  }
}