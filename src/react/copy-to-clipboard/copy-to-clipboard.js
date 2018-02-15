import React from 'react';
import {copy} from './clipboard-helper';
import {mergeProps} from '../helpers';
import PropTypes from 'prop-types';
import {TooltipTrigger} from '../tooltip';

export class CopyToClipboard extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    tooltip: PropTypes.string
  };

  componentDidMount() {
    require('../../css/copy-to-clipboard');
  }

  click = ({onClick, text}, e) => {
    copy(document, text);
    if (onClick) onClick(e);
  };

  render() {
    const {children, text, onClick, tooltip = 'Copied', ...others} = this.props;

    const anchorProps = mergeProps(others, {
      className: 'copy-to-clipboard pui-copy-to-clipboard',
      onClick: this.click.bind(null, this.props),
      role: 'button'
    });

    return (
      <a {...anchorProps}>
        <TooltipTrigger {...{tooltip, trigger: 'click'}}>
          {children}
        </TooltipTrigger>
      </a>
    );
  }
}
