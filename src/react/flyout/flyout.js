import React from 'react';
import PropTypes from 'prop-types';
import {DefaultButton} from '../buttons';
import {Icon} from '../iconography';
import classnames from 'classnames';
import {Dialog} from '../dialog';
import {Grid, FlexCol} from '../flex-grids';

export class Flyout extends React.PureComponent {
  static propTypes = {
    animationDuration: PropTypes.number,
    animationEasing: PropTypes.string,
    bodyClassName: PropTypes.string,
    children: PropTypes.any,
    className: PropTypes.string,
    dialogClassName: PropTypes.string,
    buttonAriaLabel: PropTypes.string,
    header: PropTypes.any,
    headerClassName: PropTypes.string,
    iconSrc: PropTypes.string,
    onHide: PropTypes.func.isRequired,
    show: PropTypes.bool,
    width: PropTypes.string
  };

  static defaultProps = {
    iconSrc: 'close',
    buttonAriaLabel: 'Close'
  };

  componentDidMount() {
    require('../../css/flyout');
  }

  render() {
    const {dialogClassName, buttonAriaLabel, header, onHide, children, headerClassName, bodyClassName, iconSrc, ...props} = this.props;

    const mergedDialogClassNames = classnames(dialogClassName, 'pui-flyout-dialog');
    const dialogProps = {...props, hideOnBackdropClick: false, hideOnEscKeyDown: false, dialogClassName: mergedDialogClassNames, onHide};

    return (
      <Dialog {...dialogProps}>
        <Grid className={classnames('pui-flyout-header', headerClassName)}>
          <FlexCol fixed>
            <DefaultButton {...{
              className: 'pui-flyout-icon-btn',
              iconOnly: true,
              flat: true,
              'aria-label': buttonAriaLabel,
              onClick: onHide,
              icon: <Icon {...{src: iconSrc}}/>
            }}/>
          </FlexCol>
          <FlexCol>{header}</FlexCol>
        </Grid>
        <div className={classnames('pui-flyout-body', bodyClassName)}>{children}</div>
      </Dialog>
    );
  }
}