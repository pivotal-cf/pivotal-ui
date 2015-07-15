import classnames from 'classnames';

/**
 * @component mergeProps
 * @description A helper function that merges default props and provided props
 *
 * @param reactInstanceProps properties passed into the component. Typically
 * `this.props`
 *
 * @param defaultProps default values for the react component
 *
 * @return a merged hash of props, giving precedence to the `reactInstanceProps`.
 * If `className` is defined by both sets of props, the resultant `className`
 * will be a combination of the two.
 * If `style` is defined by both, the resultant `style` hash will be a merge of
 * the two style hashes, with precedence given to `reactInstanceProps`'s style.
 *
 * @example ```js
 * var {mergeProps} = require('pui-react-helpers');
 *
 * var Ribbon = React.createClass({
 *   render() {
 *     var {children, ...others} = this.props;
 *     var props = mergeProps(others, {className: 'ribbon', style: {height: '50px', color: 'blue'}, id: 'default-ribbon-id'});
 *     return <div {...props}>{children}</div>;
 *   }
 * });
 *
 * React.render(<Ribbon className="my-ribbon" style={{height: '25px'}} id="unique-ribbon-id" />, myNode);
 * // Resultant props: {className: 'ribbon my-ribbon', style: {height: '25px', color: 'blue'}, id: 'unique-ribbon-id'}
 * ```
 */

export function mergeProps(reactInstanceProps, defaultProps) {
  let {className, id, style, ...remainingProps} = reactInstanceProps;
  let {
    className: defaultClassName,
    id: defaultId,
    style: defaultStyle={},
  ...remainingDefaultProps
  } = defaultProps;

  className = classnames(defaultClassName, className);
  style = {...defaultStyle, ...style};
  id = id || defaultId;
  remainingProps = {...remainingDefaultProps, ...remainingProps};

  return {className, id, style, ...remainingProps};
}
