var React = require('react');
var types = React.PropTypes;
var BsPanel = require('react-bootstrap/lib/Panel');
import {mergeProps} from 'pui-react-helpers';

/**
 * @component BaseCollapse
 * @description An unstyled accordion for showing and hiding content
 *
 * @property header {Element} HTML to use as the accordion toggle
 * @property divider {Boolean} Adds a line between the accordion header and accordion body
 *
 * @example ```js
 * var BaseCollapse = require('pui-react-collapse').BaseCollapse;
 * var MyComponent = React.createClass({
 *   render() {
 *     return (
 *       <BaseCollapse header="Click to Toggle">
 *         <p>Toggleable content</p>
 *       </BaseCollapse>
 *     );
 *   }
 * });
 * ```
 *
 */
var BaseCollapse = React.createClass({
  propTypes: {
    divider: types.bool,
    header: types.node.isRequired,
    defaultExpanded: types.bool
  },

  getInitialState() {
    return {
      expanded: this.props.defaultExpanded
    };
  },

  handleSelect(e) {
    e.preventDefault();
    this.setState({expanded: !this.state.expanded});
  },

  render() {
    var {divider, header, children, ...others} = this.props;
    var props = mergeProps(others, {className: {'panel-divider': divider}});

    return (
      <BsPanel {...props} collapsible expanded={this.state.expanded} onSelect={this.handleSelect} header={header}>
        {children}
      </BsPanel>
    );
  }
});

/**
 * @component Collapse
 * @description An accordion with an arrow icon in the toggle
 *
 * @property header {Element} HTML to use as the accordion toggle
 * @property divider {Boolean} Adds a line between the accordion header and accordion body
 *
 * @example ```js
 * var Collapse = require('pui-react-collapse').Collapse;
 * var MyComponent = React.createClass({
 *   render() {
 *     return (
 *       <Collapse header="Click to Toggle">
 *         <p>Toggleable content</p>
 *       </Collapse>
 *     );
 *   }
 * });
 * ```
 *
 */
var Collapse = React.createClass({
  propTypes: {
    divider: types.bool,
    header: types.node.isRequired
  },

  render() {
    var {header, ...others} = this.props;

    header = (
      <div className="collapse-trigger">
        <div className="when-collapsed-inline">
          <i className="fa fa-caret-right collapse-icon"></i>
        </div>
        <div className="when-expanded-inline">
          <i className="fa fa-caret-down collapse-icon"></i>
        </div>
        {header}
      </div>
    );

    return <BaseCollapse {...others} header={header} />;
  }
});

/**
 * @component AltCollapse
 * @description An accordion with a plus/minus icon in the toggle
 *
 * @property header {Element} HTML to use as the accordion toggle
 * @property divider {Boolean} Adds a line between the accordion header and accordion body
 *
 * @example ```js
 * var AltCollapse = require('pui-react-collapse').AltCollapse;
 * var MyComponent = React.createClass({
 *   render() {
 *     return (
 *       <AltCollapse header="Click to Toggle">
 *         <p>Toggleable content</p>
 *       </AltCollapse>
 *     );
 *   }
 * });
 * ```
 *
 */
var AltCollapse = React.createClass({
  propTypes: {
    divider: types.bool,
    header: types.node.isRequired
  },

  render() {
    var {header, ...others} = this.props;

    header = (
      <div className="collapse-trigger">
        <div className="when-collapsed-inline">
          <i className="fa fa-plus-square collapse-icon"></i>
        </div>
        <div className="when-expanded-inline">
          <i className="fa fa-minus-square collapse-icon"></i>
        </div>
        {header}
      </div>
    );

    return <BaseCollapse {...others} header={header}/>;
  }
});

module.exports = {BaseCollapse, Collapse, AltCollapse};
