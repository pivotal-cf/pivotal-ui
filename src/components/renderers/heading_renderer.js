import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const kebabCase = text => text
  .replace(/[^A-Za-z0-9 ]/g, '')
  .replace(/([a-z])([A-Z])/g, '$1-$2')
  .replace(/\s+/g, '-').toLowerCase();

export default level => class extends PureComponent {
  static propTypes = {
    children: PropTypes.array,
    className: PropTypes.string,
    level: PropTypes.oneOf([1, 2, 3, 4, 5, 6])
  };

  static defaultProps = {
    children: []
  };

  render() {
    const Heading = `h${level}`;
    const {children: [text = ''], className} = this.props;
    const id = kebabCase(text.toLowerCase());

    return (
      <Heading {...this.props} {...{
        id,
        className: classnames('md-heading em-high mvxl', className)
      }}/>
    );
  }
};