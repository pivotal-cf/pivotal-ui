import React from 'react';
import ClipboardHelper from './clipboard_helper';
import {mergeProps} from '../helpers';
import PropTypes from 'prop-types';
import {TooltipTrigger} from '../tooltip';

export class CopyToClipboard extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    tooltip: PropTypes.string,
    tooltipPlacement: PropTypes.oneOf(['left', 'right', 'bottom', 'top'])
  };

  componentDidMount() {
    require('../../css/copy-to-clipboard');
  }

  click = ({onClick, text}, e) => {
    ClipboardHelper.copy(document, text);
    if (onClick) onClick(e);
  };

  render() {
    const {children, text, onClick, tooltip = 'Copied', tooltipPlacement, ...others} = this.props;

    const anchorProps = mergeProps(others, {
      className: 'pui-copy-to-clipboard',
      onClick: this.click.bind(null, this.props),
      role: 'button'
    });

    return (
      <a {...anchorProps}>
        <TooltipTrigger {...{tooltip, placement: tooltipPlacement, trigger: 'click'}}>
          {children}
        </TooltipTrigger>
      </a>
    );
  }
}
