import React from 'react';
import PropTypes from 'prop-types';
import {DefaultButton} from '../buttons';
import {Icon} from '../iconography';
import classnames from 'classnames';

export class Flyout extends React.Component {
  static propTypes = {
    open: PropTypes.bool,
    close: PropTypes.func.isRequired,
    width: PropTypes.string,
    children: PropTypes.any,
    header: PropTypes.any,
    headerClassName: PropTypes.string,
    bodyClassName: PropTypes.string,
    iconSrc: PropTypes.string
  };

  static defaultProps = {
    close: () => {
    },
    iconSrc: 'close'
  };

  componentDidMount() {
    require('../../css/flyout');
  }

  componentWillUnmount() {
    this.props.close();
  }

  render() {
    const {children, open, close, header, width, headerClassName, bodyClassName, iconSrc} = this.props;

    let right;
    if (width) {
      const value = parseFloat(width);
      const unit = width.substr(('' + value).length);
      right = `${-0.8 * value}${unit}`;
    }

    return (
      <div className={classnames('flyout', {
        'flyout-open': open
      })}>
        <div className="flyout-content" style={{width, right}}>
          <div className={classnames('flyout-header grid', headerClassName)}>
            <div className="col col-fixed">
              <DefaultButton {...{
                className: 'flyout-close',
                iconOnly: true,
                flat: true,
                onClick: () => close()
              }}>
                <Icon {...{src: iconSrc}}/>
              </DefaultButton>
            </div>
            <div className="col">
              {header}
            </div>
          </div>
          <div className={classnames('flyout-body', bodyClassName)}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}