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
    setState: PropTypes.func,
    fieldRowClassName: PropTypes.string,
    labelRowClassName: PropTypes.string
  };

  componentDidMount() {
    require('../../css/forms');
  }

  render() {
    const {
      className, hideHelpRow, retainLabelHeight, inline, label, labelClassName, labelPosition, optional, optionalText,
      tooltip, tooltipSize = 'lg', tooltipPlacement = 'top', field, help, hasError, labelFor, postLabel, state,
      setState, fieldRowClassName, labelRowClassName
    } = this.props;

    if (!label && !field && !help) return null;

    const tooltipIcon = tooltip &&
      <TooltipTrigger {...{tooltip, className: 'pui-tooltip-light', size: tooltipSize, placement: tooltipPlacement}}>
        <Icon verticalAlign="baseline" src="info_outline"/>
      </TooltipTrigger>;

    const labelElement = (
      <label {...{className: labelClassName, htmlFor: labelFor}}>
        {label}
        {tooltipIcon}
        {label && optional && <span
          className="optional-text type-neutral-4">
                  {optionalText || optionalText === '' ? optionalText : '(Optional)'}
                </span>}
      </label>
    );

    const labelRow = (label || retainLabelHeight || postLabel) && (
        inline
          ? labelElement
          : (
          <Grid {...{key: 'label-row', className: classnames('label-row', labelRowClassName), gutter: false}}>
            <FlexCol>{labelElement}</FlexCol>
            <FlexCol fixed contentAlignment="middle" className="post-label">
              {typeof postLabel === 'function' ? postLabel({state, setState}) : postLabel}
            </FlexCol>
          </Grid>
        )
      );

    const fieldRow = field && (inline
        ? field
        : <div className={classnames('field-row', fieldRowClassName)} key="field-row">{field}</div>);
    const helpRowClassName = classnames('help-row', {'type-dark-5': !hasError});
    const helpRow = inline ? help : <div className={helpRowClassName} key="help-row">{help}</div>;

    const sections = labelPosition === 'after' ? [fieldRow, labelRow] : [labelRow, fieldRow];

    const content = inline ? ([
        <Grid className="grid-inline" key="top">
          {sections.map((col, key) => <FlexCol {...{
            key,
            fixed: key === 0,
            className: classnames({
              [classnames('label-row', labelRowClassName)]: key === 0 && labelPosition !== 'after' || key === 1 && labelPosition === 'after',
              [classnames('field-row', fieldRowClassName)]: key === 0 && labelPosition === 'after' || key === 1 && labelPosition !== 'after'
            })
          }}>{col}</FlexCol>)}
        </Grid>]
    ) : sections;

    if (!hideHelpRow) {
      if (inline) {
        content.push((
          <Grid key="bottom">
            <FlexCol className={helpRowClassName}>
              {helpRow}
            </FlexCol>
          </Grid>
        ));
      } else {
        content.push(helpRow);
      }
    }

    return (
      <div className={classnames('form-unit', className, {'has-error': hasError, 'inline-form-unit': inline})}>
        {content}
      </div>
    );
  }
}
