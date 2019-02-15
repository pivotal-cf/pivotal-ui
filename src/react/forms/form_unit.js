import React from 'react';
import PropTypes from 'prop-types';
import {TooltipTrigger} from '../tooltip';
import {Icon} from '../iconography';
import {Grid, FlexCol} from '../flex-grids';
import classnames from 'classnames';

export class FormUnit extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    fieldRowClassName: PropTypes.string,
    hasError: PropTypes.bool,
    help: PropTypes.node,
    hideHelpRow: PropTypes.bool,
    inline: PropTypes.bool,
    label: PropTypes.string,
    labelClassName: PropTypes.string,
    labelFor: PropTypes.string,
    labelPosition: PropTypes.oneOf(['after']),
    labelRowClassName: PropTypes.string,
    optional: PropTypes.bool,
    optionalText: PropTypes.string,
    postLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    retainLabelHeight: PropTypes.bool,
    setValues: PropTypes.func,
    state: PropTypes.object,
    tooltip: PropTypes.node,
    tooltipPlacement: PropTypes.oneOf(['left', 'right', 'bottom', 'top']),
    tooltipSize: PropTypes.oneOf(['sm', 'md', 'lg'])
  };

  static defaultProps = {
    tooltipSize: 'lg',
    tooltipPlacement: 'top'
  };

  componentDidMount() {
    require('../../css/forms');
  }

  newTooltipIcon = () => {
    const {tooltip, tooltipSize, tooltipPlacement} = this.props;
    return tooltip &&
      <TooltipTrigger {...{tooltip, className: 'tooltip-light', size: tooltipSize, placement: tooltipPlacement}}>
        <Icon verticalAlign="baseline" src="info_outline"/>
      </TooltipTrigger>;
  };

  newLabelElement = tooltipIcon => {
    const {labelClassName, labelFor, label, optional, optionalText} = this.props;
    return (
      <label {...{className: labelClassName, htmlFor: labelFor}}>
        {label}
        {tooltipIcon}
        {label && optional && <span
          className="optional-text type-gray">
                  {optionalText || optionalText === '' ? optionalText : '(Optional)'}
                </span>}
      </label>
    );
  };

  newLabelRow = () => {
    const {label, retainLabelHeight, postLabel, inline, labelRowClassName, state, setValues} = this.props;
    const tooltipIcon = this.newTooltipIcon();
    const labelElement = this.newLabelElement(tooltipIcon);
    return (label || retainLabelHeight || postLabel) && (
      inline
        ? labelElement
        : (
          <Grid {...{key: 'label-row', className: classnames('label-row', labelRowClassName), gutter: false}}>
            <FlexCol>{labelElement}</FlexCol>
            <FlexCol fixed contentAlignment="middle" className="post-label">
              {typeof postLabel === 'function' ? postLabel({state, setValues}) : postLabel}
            </FlexCol>
          </Grid>
        )
    );
  };

  newFieldRow = () => {
    const {children, inline, fieldRowClassName} = this.props;
    return children && (inline
      ? children
      : <div className={classnames('field-row', fieldRowClassName)} key="field-row">{children}</div>);
  };

  newContent = (labelRow, fieldRow, helpRow) => {
    const {inline, labelRowClassName, labelPosition, fieldRowClassName, hideHelpRow} = this.props;
    const sections = labelPosition === 'after' ? [fieldRow, labelRow] : [labelRow, fieldRow];
    const showRowClassNames = (key, position) => key === position && labelPosition !== 'after' || key === (1 - position) && labelPosition === 'after';
    const content = inline ? ([
        <Grid className="grid-inline" key="top">
          {sections.map((col, key) => (
            <FlexCol {...{
              key,
              fixed: key === 0,
              className: classnames({
                [classnames('label-row', labelRowClassName)]: showRowClassNames(key, 0),
                [classnames('field-row', fieldRowClassName)]: showRowClassNames(key, 1)
              })
            }}>{col}</FlexCol>
          ))}
        </Grid>]
    ) : sections;
    !hideHelpRow && content.push(helpRow);
    return content;
  };

  newHelpRow = () => {
    const {inline, hasError, help} = this.props;
    const helpRowClassName = classnames('help-row', {'type-gray': !hasError});
    if (inline) {
      return (
        <Grid key="bottom">
          <FlexCol className={helpRowClassName}>{help}</FlexCol>
        </Grid>
      );
    }
    return <div className={helpRowClassName} key="help-row">{help}</div>;
  };

  render() {
    const {className, inline, label, children, help, hasError} = this.props;

    if (!label && !children && !help) return null;

    const labelRow = this.newLabelRow();
    const fieldRow = this.newFieldRow();
    const helpRow = this.newHelpRow();

    return (
      <div className={classnames('form-unit', className, {'has-error': hasError, 'inline-form-unit': inline})}>
        {this.newContent(labelRow, fieldRow, helpRow)}
      </div>
    );
  }
}
