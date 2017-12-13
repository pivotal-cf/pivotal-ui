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
    header: PropTypes.string,
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
  }

  render() {
    const {className, title, titleCols, titleClassName, panelClassName, header, headerCols, headerClassName, bodyClassName, loading, children, footer, footerClassName, ...props} = this.props;

    return (
      <div {...{...props, className: classnames('panel-container', className)}}>
        {(title || titleCols.length > 0) && <Grid className={classnames('panel-title', titleClassName)}>
          {title && <FlexCol className="h5 em-high type-ellipsis">{title}</FlexCol>}
          {titleCols.map((el, key) => React.cloneElement(el, {key}))}
        </Grid>}
        <div {...{className: classnames('panel bg-neutral-11 box-shadow-1 border-rounded', panelClassName)}}>
          {(header || headerCols.length > 0) && <Grid className={classnames('panel-header', headerClassName)}>
            {header && <FlexCol className="type-ellipsis em-high">{header}</FlexCol>}
            {headerCols.map((el, key) => React.cloneElement(el, {key}))}
          </Grid>}
          {children && (
            <div className={classnames('panel-body', bodyClassName)}>
              {loading && <div className="panel-loading-indicator"/>}
              {children}
            </div>
          )}
          {footer && <div className={classnames('panel-footer type-ellipsis h6', footerClassName)}>{footer}</div>}
        </div>
      </div>
    );
  }
}