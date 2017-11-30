import React from 'react';
import types from 'prop-types';
import {TooltipTrigger} from '../tooltip';
import {Icon} from '../iconography';
import {Grid, FlexCol} from '../flex-grids';
import classnames from 'classnames';

export class FormUnit extends React.Component {
  static propTypes = {
    className: types.string,
    inline: types.bool,
    label: types.string,
    labelClassName: types.string,
    labelFor: types.string,
    hideHelpRow: types.bool,
    retainLabelHeight: types.bool,
    labelPosition: types.oneOf(['after']),
    optional: types.bool,
    optionalText: types.string,
    tooltip: types.node,
    tooltipSize: types.oneOf(['sm', 'md', 'lg']),
    tooltipPlacement: types.oneOf(['left', 'right', 'bottom', 'top']),
    field: types.node,
    help: types.node,
    hasError: types.bool
  };

  componentDidMount() {
    require('../../css/forms');
  }

  render() {
    const {
      className, hideHelpRow, retainLabelHeight, inline, label, labelClassName, labelPosition, optional, optionalText, tooltip,
      tooltipSize = 'lg', tooltipPlacement = 'top', field, help, hasError, labelFor
    } = this.props;

    if (!label && !field && !help) return null;

    const tooltipIcon = tooltip &&
      <TooltipTrigger {...{tooltip, className: 'tooltip-light', size: tooltipSize, placement: tooltipPlacement}}>
        <Icon verticalAlign="baseline" src="info_outline"/>
      </TooltipTrigger>;

    const labelRow = (label || retainLabelHeight) && (
      <label {...{className: classnames('label-row', labelClassName), key: 'label-row', htmlFor: labelFor}}>
        {label}
        {tooltipIcon}
        {label && optional && <span className="optional-text type-neutral-4">{optionalText || optionalText === '' ? optionalText : '(Optional)'}</span>}
      </label>
    );

    const fieldRow = field && <div className="field-row" key="field-row">{field}</div>;
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
