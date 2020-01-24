import React from 'react';
import {Grid, FlexCol} from '../flex-grids';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export class Panel extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    titleCols: PropTypes.array,
    titleClassName: PropTypes.string,
    panelClassName: PropTypes.string,
    header: PropTypes.node,
    headerCols: PropTypes.array,
    headerClassName: PropTypes.string,
    loading: PropTypes.bool,
    bodyClassName: PropTypes.string,
    footer: PropTypes.node,
    footerClassName: PropTypes.string
  };

  static defaultProps = {
    titleCols: [],
    headerCols: []
  };

  componentDidMount() {
    require('../../css/panels');
    require('../../css/box-shadows');
  }

  render() {
    const {className, title, titleCols, titleClassName, panelClassName, header, headerCols, headerClassName, bodyClassName, loading, children, footer, footerClassName, ...props} = this.props;

    return (
      <section {...{...props, className: classnames('pui-panel-container', className)}}>
        {(title || titleCols.length > 0) && <Grid className={classnames('pui-panel-title', titleClassName)}>
          {title && <FlexCol contentAlignment="middle" className="h5 em-high type-ellipsis">{title}</FlexCol>}
          {titleCols.map((el, key) => React.cloneElement(el, {key}))}
        </Grid>}
        <div {...{className: classnames('pui-panel bg-white box-shadow-1 border-rounded', panelClassName)}}>
          {loading && (
            <div className="pui-panel-loading-indicator-container">
              <div className="pui-panel-loading-indicator" />
            </div>
          )}
          {(header || headerCols.length > 0) && <Grid className={classnames('pui-panel-header', headerClassName)}>
            {header && <FlexCol contentAlignment="middle" className="type-ellipsis em-high">{header}</FlexCol>}
            {headerCols.map((el, key) => React.cloneElement(el, {key}))}
          </Grid>}
          {children && (
            <div className={classnames('pui-panel-body', bodyClassName)}>
              {children}
            </div>
          )}
          {footer && <div className={classnames('pui-panel-footer type-ellipsis h6', footerClassName)}>{footer}</div>}
        </div>
      </section>
    );
  }
}