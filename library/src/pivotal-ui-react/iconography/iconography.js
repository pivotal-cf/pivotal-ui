import {mergeProps} from 'pui-react-helpers'
import React from 'react'
import {Svg} from 'pui-react-svg'
import 'pui-css-iconography'
import classnames from 'classnames'

const types = React.PropTypes

class SvgIcon extends Svg {
  svgPathLoader = src => require(`!!babel-loader!svg-react-loader!pui-css-iconography/svgs/${src}.svg`)
}

export class Icon extends React.Component {
  static propTypes = {
    src: types.string.isRequired,
    style: types.object,
    verticalAlign: types.oneOf(['middle', 'baseline'])
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
