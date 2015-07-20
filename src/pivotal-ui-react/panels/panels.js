var React = require('react');
var types = React.PropTypes;
var classnames = require('classnames');
import {mergeProps} from 'pui-react-helpers';

var paddingTypes = [
  for (type of ['p', 'm'])
  for (location of ['l', 'r', 't', 'b', 'h', 'v', 'a'])
  for (size of ['n', 's', 'm', 'l', 'xl', 'xxl', 'xxxl', 'xxxxl'])
  `${type}${location}${size}`
  ];
var PanelTypes = {
  propTypes: {
    type: types.string,
    padding: function(props, propName, componentName) {
      if (props.padding && !props.padding.split(' ').every(pad => paddingTypes.indexOf(pad) >= 0)) {
        return new Error(`Invalid padding type used in ${componentName}`);
      }
    },
    scrollable: types.oneOfType([
      types.bool,
      types.number
    ])
  }
};

/**
 * @component Panel
 * @description A container for grouping related content
 *
 * @property title {String} Text to show as the header of the `<Panel>`
 *
 * @example ```js
 * var Panel = require('pui-react-panels').Panel;
 * var MyComponent = React.createClass({
 *   render() {
 *     return <Panel title="Header Text">Content Text</Panel>;
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#panel_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#panel)
 */
var Panel = React.createClass({
  mixins: [PanelTypes],

  propTypes: {
    kind: types.string,
    title: types.string
  },

  render() {
   const {kind, innerClassName, padding, scrollable, children, ...other} = this.props;
    const panelStyle = (typeof scrollable === 'number') ? {maxHeight: `${scrollable}px`} : null;
    const props = mergeProps(other, {
      className: ['panel', kind, {'panel-scrollable': scrollable}],
      style: panelStyle
    });

    const title = this.props.title ? (
      <div className="panel-header">
        <h5 className="panel-title-alt">{this.props.title}</h5>
      </div>
    ) : null;

    return (
      <div {...props}>
        {title}
        <div className={classnames('panel-body', padding, innerClassName)}>{children}</div>
      </div>
    );
  }
});

/**
 * @component ShadowPanel
 * @description A `<Panel>` with a shadow on the bottom
 *
 * @property title {String} Text to show as the header of the `<Panel>`
 * @property shadowLevel {Number} The thickness (1-4) (defaults to `3`) of the shadow
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#panel_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#panel)
 */
var ShadowPanel = React.createClass({
  mixins: [PanelTypes],

  propTypes: {
    shadowLevel: types.oneOf([1, 2, 3, 4])
  },

  getDefaultProps() {
    return {shadowLevel: 3};
  },

  render() {
    var {shadowLevel, ...other} = this.props;
    return <Panel {...other} kind={`panel-shadow-${shadowLevel}`}/>;
  }
});

function defPanel(props) {
  return React.createClass({
    mixins: [PanelTypes],
    render() {
      return <Panel {...props} {...this.props}/>;
    }
  });
}

module.exports = {
  Panel,

  /**
   * @component SimplePanel
   * @description A `<Panel>` with a simple rectangular border
   *
   * @property title {String} Text to show as the header of the `<Panel>`
   *
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#panel_react)
   * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#panel)
   */
  SimplePanel: defPanel({kind: 'panel-simple'}),

  /**
   * @component BasicPanel
   * @description A `<Panel>` with padding and a shadow on the bottom
   *
   * @property title {String} Text to show as the header of the `<Panel>`
   *
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#panel_react)
   * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#panel)
   */
  BasicPanel: defPanel({kind: 'panel-basic'}),

  /**
   * @component BasicPanelAlt
   * @description A `<Panel>` with padding, a shadow on the bottom, and a round border
   *
   * @property title {String} Text to show as the header of the `<Panel>`
   *
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#panel_react)
   * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#panel)
   */
  BasicPanelAlt: defPanel({kind: 'panel-basic-alt'}),

  /**
   * @component ClickablePanel
   * @description A `<Panel>` with a background that lightens when hovered to indicate it is clickable
   *
   * @property title {String} Text to show as the header of the `<Panel>`
   *
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#panel_react)
   * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#panel)
   */
  ClickablePanel: defPanel({kind: 'panel-clickable'}),

  /**
   * @component ClickableAltPanel
   * @description A `<Panel>` with a rounded border, a shadow on the bottom, and a background that lightens when hovered to indicate it is clickable
   *
   * @property title {String} Text to show as the header of the `<Panel>`
   *
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#panel_react)
   * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#panel)
   */
  ClickableAltPanel: defPanel({kind: 'panel-clickable-alt'}),

  /**
   * @component HighlightPanel
   * @description A `<Panel>` with a rounded border and a shadow on the bottom for highlighting important parts of a page
   *
   * @property title {String} Text to show as the header of the `<Panel>`
   *
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#panel_react)
   * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#panel)
   */
  HighlightPanel: defPanel({kind: 'panel-highlight'}),

  ShadowPanel
};
