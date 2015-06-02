var React = require('react');
var types = React.PropTypes;
var classnames = require('classnames');

/**
 * @component BasePane
 * @description A horizontal grouping of content that usually spans the width of the browser viewport
 *
 * @property outerClass {String} Class names to apply to the pane
 * @property innerClass {String} Class names to apply to the content
 *
 * @example ```js
 * var BasePane = require('pui-react-panes').BasePane;
 * var DefaultH1 = require('pui-react-typography').DefaultH1;
 * var MyComponent = React.createClass({
 *   render() {
 *     return (
 *       <BasePane>
 *         <DefaultH1>Important information here</DefaultH1>
 *       </BasePane>
 *     );
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react_beta.html#pane_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/layout.html#pane)
 */
var BasePane = React.createClass({
  propTypes: {
    outerClass: types.string,
    innerClass: types.string
  },

  render() {
    var {outerClass, innerClass, children, ...other} = this.props;
    return (
      <div {...other} className={classnames('pane', outerClass)}>
        <div className={classnames('container', innerClass)}>{children}</div>
      </div>
    );
  }
});

/**
 * @component Pane
 * @description A horizontal grouping of content that usually spans the width of the browser viewport
 *
 * @property outerClass {String} Class names to apply to the pane
 * @property innerClass {String} Class names to apply to the content
 *
 * @example ```js
 * var Pane = require('pui-react-panes').Pane;
 * var DefaultH1 = require('pui-react-typography').DefaultH1;
 * var MyComponent = React.createClass({
 *   render() {
 *     return (
 *       <Pane>
 *         <DefaultH1>Important information here</DefaultH1>
 *       </Pane>
 *     );
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react_beta.html#pane_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/layout.html#pane)
 */
var Pane = React.createClass({
  render() {
    var {className, ...other} = this.props;
    return <BasePane {...other} outerClass={className}/>;
  }
});

module.exports = {BasePane, Pane};
