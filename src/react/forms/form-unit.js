import React from 'react';
import PropTypes from 'prop-types';
import {TooltipTrigger} from '../tooltip';
import {Icon} from '../iconography';
import {Grid, FlexCol} from '../flex-grids';
import classnames from 'classnames';

export class FormUnit extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    inline: PropTypes.bool,
    label: PropTypes.string,
    labelClassName: PropTypes.string,
    labelFor: PropTypes.string,
    postLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    hideHelpRow: PropTypes.bool,
    retainLabelHeight: PropTypes.bool,
    labelPosition: PropTypes.oneOf(['after']),
    optional: PropTypes.bool,
    optionalText: PropTypes.string,
    tooltip: PropTypes.node,
    tooltipSize: PropTypes.oneOf(['sm', 'md', 'lg']),
    tooltipPlacement: PropTypes.oneOf(['left', 'right', 'bottom', 'top']),
    field: PropTypes.node,
    help: PropTypes.node,
    hasError: PropTypes.bool,
    state: PropTypes.object,
    setState: PropTypes.func
  };

  componentDidMount() {
    require('../../css/forms');
  }

  render() {
    const {
      className, hideHelpRow, retainLabelHeight, inline, label, labelClassName, labelPosition, optional, optionalText,
      tooltip, tooltipSize = 'lg', tooltipPlacement = 'top', field, help, hasError, labelFor, postLabel, state,
      setState
    } = this.props;

    if (!label && !field && !help) return null;

    const tooltipIcon = tooltip &&
      <TooltipTrigger {...{tooltip, className: 'tooltip-light', size: tooltipSize, placement: tooltipPlacement}}>
        <Icon verticalAlign="baseline" src="info_outline"/>
      </TooltipTrigger>;

    const labelRow = (label || retainLabelHeight || postLabel) && (
        <Grid {...{key: 'label-row', className: 'label-row', gutter: false}}>
          <FlexCol>
            <label {...{className: labelClassName, htmlFor: labelFor}}>
              {label}
              {tooltipIcon}
              {label && optional && <span
                className="optional-text type-neutral-4">
                  {optionalText || optionalText === '' ? optionalText : '(Optional)'}
                </span>}
            </label>
          </FlexCol>
          {!inline && <FlexCol fixed contentAlignment="middle" className="post-label">
            {typeof postLabel === 'function' ? postLabel({state, setState}) : postLabel}
          </FlexCol>}
        </Grid>
      );

    const fieldRow = <div className="field-row" key="field-row">{field}</div>;
    const helpRow = hideHelpRow || <div className={classnames('help-row', {'type-dark-5': !hasError})}>{help}</div>;

    const sections = labelPosition === 'after' ? [fieldRow, labelRow] : [labelRow, fieldRow];

    return (
      <div className={classnames('form-unit', className, {'has-error': hasError})}>
        {inline ? (<Grid className="grid-inline grid-nogutter">
          {sections.map((col, key) =>
            <FlexCol {...{key, className: classnames({'col-fixed': key === 0})}}>{col}</FlexCol>)}
        </Grid>) : sections}
        {helpRow}
      </div>
    );
  }
}