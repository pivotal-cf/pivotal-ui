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
    header: PropTypes.any
  };

  static defaultProps = {
    close: () => {
    }
  };

  componentDidMount() {
    require('../../css/flyout');
  }

  componentWillUnmount() {
    this.props.close();
  }

  render() {
    const {children, open, close, header, width} = this.props;

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
          <div className="flyout-header grid">
            <div className="col col-fixed">
              <DefaultButton {...{
                className: 'flyout-close',
                iconOnly: true,
                flat: true,
                onClick: () => close()
              }}>
                <Icon {...{src: 'close'}}/>
              </DefaultButton>
            </div>
            <div className="col">
              {header}
            </div>
          </div>
          <div className="flyout-body">
            {children}
          </div>
        </div>
      </div>
    );
  }
}