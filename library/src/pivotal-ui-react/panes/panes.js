var React = require('react');
var types = React.PropTypes;
import {mergeProps} from 'pui-react-helpers';

/**
 * @component BasePane
 * @description A horizontal grouping of content that usually spans the width of the browser viewport
 *
 * @property outerClassName {String} Class names to apply to the pane
 * @property innerClassName {String} Class names to apply to the content
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
 */
var BasePane = React.createClass({
  propTypes: {
    className: types.string,
    innerClassName: types.string
  },

  render() {
    var {innerClassName, children, ...other} = this.props;
    const outerProps = mergeProps(other, {className: 'pane'});
    const innerProps = mergeProps({className: innerClassName}, {className: 'container'});
    return (
      <div {...outerProps} >
        <div {...innerProps}>{children}</div>
      </div>
    );
  }
});

/**
 * @component Pane
 * @description A horizontal grouping of content that usually spans the width of the browser viewport
 *
 * @property outerClassName {String} Class names to apply to the pane
 * @property innerClassName {String} Class names to apply to the content
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
 */
var Pane = React.createClass({
  propTypes: {
    className: types.string
  },
  render() {
    var {className, ...other} = this.props;
    return <BasePane {...other} className={className}/>;
  }
});

module.exports = {BasePane, Pane};
