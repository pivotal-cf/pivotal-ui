import React from 'react';
import {copy} from './clipboard-helper';
import {mergeProps} from '../helpers';
import PropTypes from 'prop-types';
import {TooltipTrigger} from '../tooltip';

export class CopyToClipboard extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    getWindow: PropTypes.func,
    tooltip: PropTypes.string
  };

  static defaultProps = {
    getWindow: () => window,
  };

  componentDidMount() {
    require('../../css/copy-to-clipboard');
  }

  click = ({props, text}, e) => {
    const window = this.props.getWindow();
    copy(window, window.document, text);
    const {onClick} = props;
    if (onClick) onClick(e);
  };

  render() {
    const {children, text, onClick, getWindow, tooltip = "Copied", ...others} = this.props;
    const obj = {props: this.props, text: null};

    const anchorProps = mergeProps(others, {
      className: 'copy-to-clipboard',
      onClick: this.click.bind(undefined, obj),
      role: 'button'
    });

    return (<TooltipTrigger {...{tooltip, trigger: "click"}}>
        <a {...anchorProps}>
          <span className="sr-only" ref={ref => obj.text = ref}>{text}</span>
          {children}
        </a>
      </TooltipTrigger>);
  }
}