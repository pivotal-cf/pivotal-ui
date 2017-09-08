import React from 'react';
import {copy} from './clipboard-helper';
import {Icon} from '../iconography';
import {mergeProps} from '../helpers';
import PropTypes from 'prop-types';
import {TooltipTrigger} from '../tooltip';
import {DefaultButton} from '../buttons';

export class CopyToClipboard extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    getWindow: PropTypes.func,
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
    const {children, text, onClick, getWindow, ...others} = this.props;
    const obj = {props: this.props, text: null};

    const anchorProps = mergeProps(others, {
      className: 'copy-to-clipboard',
      onClick: this.click.bind(undefined, obj),
      role: 'button'
    });

    return (<a {...anchorProps}>
      <span className="sr-only" ref={ref => obj.text = ref}>{text}</span>
      {children}
    </a>);
  }
}

export class CopyToClipboardButton extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
    getWindow: PropTypes.func,
    small: PropTypes.bool,
    large: PropTypes.bool
  };

  static defaultProps = {
    onClick() {
    },
    getWindow: () => window
  };

  constructor(props, context) {
    super(props, context);
    this.state = {display: false};
  }

  click = e => {
    if (!this.state.display) this.setState({display: true}, () => {
      this.setState({display: false});
    });
    this.props.onClick(e);
  };

  render() {
    const {onClick, small, large, ...props} = this.props;
    const {display} = this.state;

    const copyProps = mergeProps(props, {
      className: 'copy-to-clipboard-button',
      onClick: this.click,
      getWindow: this.props.getWindow
    });

    const button = (<DefaultButton {...{
      flat: true,
      className: 'clipboard-button',
      icon: <Icon src="copy"/>,
      small,
      large
    }}/>);

    return (<CopyToClipboard {...copyProps}>
      <TooltipTrigger tooltip="Copied" trigger="click">{button}</TooltipTrigger>
    </CopyToClipboard>);
  }
}