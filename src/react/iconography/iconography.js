import {mergeProps} from '../helpers';
import PropTypes from 'prop-types';
import React from 'react';
import {Svg} from '../svg';
import classnames from 'classnames';

class SvgIcon extends Svg {
  svgPathLoader = src => {
    try {
      return require(`!!babel-loader?{"presets":["react"]}!react-svg-loader?{"svgo":{"plugins":[{"removeUnknownsAndDefaults":false},{"cleanupNumericValues":false},{"removeUselessStrokeAndFill":false}]}}!../../css/iconography/svgs/${src}.svg`);
    } catch (e) {
      try {
        return require(`!!babel-loader?{"presets":["react"]}!react-svg-loader?{"svgo":{"plugins":[{"removeUnknownsAndDefaults":false},{"cleanupNumericValues":false},{"removeUselessStrokeAndFill":false}]}}!../../../../app/svgs/${src}.svg`);
      } catch (e) {
      }
    }
  }
}

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
      <SvgIcon {...{src, className: `icon-${src}`, key: src}}/>
    </div>);
  }
}
