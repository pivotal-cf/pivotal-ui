var React = require('react');
var types = React.PropTypes;
var BsPanel = require('react-bootstrap').Panel;
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
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#collapse_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#accordion)
 */
var BaseCollapse = React.createClass({
  propTypes: {
    divider: types.bool,
    header: types.node.isRequired
  },

  getInitialState() {
    return {expanded: false};
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
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#collapse_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#accordion)
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
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#collapse_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#accordion)
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


/*doc
 ---
 title: Collapse
 name: collapse_react
 categories:
 - React
 ---

 <code class="pam">
 <i class="fa fa-download" alt="Install the Component">
 npm install pui-react-collapse --save
 </i>
 </code>

 Require the subcomponent:

 ```
 var BaseCollapse = require('pui-react-collapse').BaseCollapse;
 ```


 Collapse components are implementations of the [Accordion][accordion] style. In
 all `Collapse` component variations, the `header` prop describes the text
 of the clickable region to toggle the expand/collapse states.

 */

/*doc
---
title: Base
name: base_collapse_react
parent: collapse_react
---

This is a basic collapse with no additional styles.

```react_example
<BaseCollapse header="Panel 1">
  <p>Panel 1 content</p>
  <p>Panel 1 content</p>
  <p>Panel 1 content</p>
  <p>Panel 1 content</p>
  <p>Panel 1 content</p>
  <p>Panel 1 content</p>
  <p>Panel 1 content</p>
  <p>Panel 1 content</p>
  <p>Panel 1 content</p>
  <p>Panel 1 content</p>
</BaseCollapse>
```
*/

/*doc
---
title: Arrows
name: arrow_collapse_react
parent: collapse_react
---

This is a basic collapse with an arrow icon in the clickable region.

```react_example
<Collapse header="With Arrows">
  <p>Content!</p>
  <p>Content!</p>
  <p>Content!</p>
  <p>Content!</p>
  <p>Content!</p>
</Collapse>
```
*/

/*doc
---
title: Alt
name: alt_collapse_react
parent: collapse_react
---

This is a basic collapse with an +/- icon in the clickable region.

```react_example
<AltCollapse header="Without Arrows">
  <p>Content!</p>
  <p>Content!</p>
  <p>Content!</p>
  <p>Content!</p>
  <p>Content!</p>
</AltCollapse>
```
*/

/*doc
---
title: Adding Dividers
name: collapse_dividers_react
parent: collapse_react
---

To add a divider between the clickable region and the expanded content region,
simply set the `divider` property to be true.

```react_example
<Collapse header="With Divider" divider>
  <p>Content!</p>
  <p>Content!</p>
  <p>Content!</p>
  <p>Content!</p>
  <p>Content!</p>
</Collapse>
```
*/
