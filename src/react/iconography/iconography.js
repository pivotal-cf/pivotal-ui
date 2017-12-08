import {mergeProps} from '../helpers';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Icons from './icons';

export class Icon extends React.Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    style: PropTypes.object,
    verticalAlign: PropTypes.oneOf(['middle', 'baseline'])
  };

  static defaultProps = {
    size: 'inherit',
    style: {},
    verticalAlign: 'middle'
  };

  componentDidMount() {
    require('../../css/iconography');
  }

  render() {
    const {src, verticalAlign, ...others} = this.props;
    const props = mergeProps(
      others,
      {className: classnames('icon', `icon-${verticalAlign}`, {'spinner': src.indexOf('spinner') === 0})}
    );

    return (<div {...props}>
      {React.cloneElement(Icons[src], {className: `icon-${src}`, key: src})}
    </div>);
  }
}
