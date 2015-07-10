import classnames from 'classnames';

export function mergeProps(reactInstanceProps, defaultProps) {
  let {className, id, style, ...remainingProps} = reactInstanceProps;
  let {
    className: defaultClassName,
    id: defaultId,
    style: defaultStyle={},
  ...remainingDefaultProps
  } = defaultProps;

  className = classnames(defaultClassName, className);
  style = Object.assign(defaultStyle, style);
  id = id || defaultId;
  remainingProps = Object.assign(remainingDefaultProps, remainingProps);

  return {className, id, style, ...remainingProps};
}
