import React from 'react';
import PropTypes from 'prop-types';
import {mergeProps} from '../helpers';
import classnames from 'classnames';

export class Grid extends React.PureComponent {
  static propTypes = {
    gutter: PropTypes.bool,
    justifyContent: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly']),
    flexDirection: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse'])
  };

  static defaultProps = {
    gutter: true
  };

  componentDidMount() {
    require('../../css/flex-grids');
  }

  render() {
    const {gutter, justifyContent, flexDirection, ...props} = this.props;
    const newProps = mergeProps(props, {
      className: classnames('grid', gutter ? '' : 'grid-nogutter',
        {
          [`justify-content-${justifyContent}`]: justifyContent,
          [`flex-direction-${flexDirection}`]: flexDirection
        }
      )
    });
    return <div {...newProps}/>;
  }
};