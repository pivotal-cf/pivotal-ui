import {mergeProps} from 'pui-react-helpers'
import PropTypes from 'prop-types';
import React from 'react'
import {Svg} from 'pui-react-svg'
import 'pui-css-iconography'
import classnames from 'classnames'

class SvgIcon extends Svg {
  svgPathLoader = src => {
    try {
      return require(`!!babel-loader!svg-react-loader!pui-css-iconography/svgs/${src}.svg`)
    } catch (e) {
      try {
        return require(`!!babel-loader!svg-react-loader!../../app/svg/${src}.svg`)
      } catch (e) {}
    }
  }
}

export class Icon extends React.Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    style: PropTypes.object,
    verticalAlign: PropTypes.oneOf(['middle', 'baseline'])
  }

  static defaultProps = {
    size: 'inherit',
    style: {},
    verticalAlign: 'middle'
  }

  render() {
    const {src, verticalAlign, ...others} = this.props
    const props = mergeProps(
      others,
      {className: classnames('icon', `icon-${verticalAlign}`, {'spinner': src.startsWith('spinner')})}
    )

    return (<div {...props}>
      <SvgIcon {...{src, className: `icon-${src}`, key: src}}/>
    </div>)
  }
}
