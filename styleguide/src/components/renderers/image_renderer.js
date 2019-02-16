import React, {PureComponent} from 'react';
import classnames from 'classnames';

export default class extends PureComponent {
  render() {
    const {className, ...props} = this.props;
    return <img {...{...props, className: classnames('md-image', className)}}/>;
  }
};