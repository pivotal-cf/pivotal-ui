const React = require('react');
const types = React.PropTypes;
const classnames = require('classnames');
import {mergeProps} from 'pui-react-helpers';

const paddingTypes = [
  for (type of ['p', 'm'])
  for (location of ['l', 'r', 't', 'b', 'h', 'v', 'a'])
  for (size of ['n', 's', 'm', 'l', 'xl', 'xxl', 'xxxl', 'xxxxl'])
  `${type}${location}${size}`
  ];

const PanelTitle = React.createClass({
  propTypes: {
    className: types.string
  },

  render() {
    let {className, ...other} = this.props;
    className = classnames('panel-title-alt', className);
    return <div {...{className}} {...other}/>;
  }
});

class PanelHeader extends React.Component {
  static propTypes = {
    header: types.node
  };

  render() {
    const {header} = this.props;
    if(header) {
      var headerNode = header.constructor === String ?
        (<PanelTitle>{header}</PanelTitle>) :
        header;

      return (
        <div className="panel-header">
          {headerNode}
        </div>
      );
    } else {
      return null;
    }
  }
}

class PanelFooter extends React.Component {
  static propTypes = {
    footer: types.node
  };

  render() {
    const {footer} = this.props;

    if(footer) {
      return (
        <div className="panel-footer">
          {footer}
        </div>
      );
    } else {
      return null;
    }
  }
}

/**
 * @component Panel
 * @description A container for grouping related content
 *
 * @property header {String} Text to show as the header of the `<Panel>`
 *
 * @example ```js
 * var Panel = require('pui-react-panels').Panel;
 * var MyComponent = React.createClass({
 *   render() {
 *     return <Panel header="Header Text">Content Text</Panel>;
 *   }
 * });
 * ```
 *
 */

class Panel extends React.Component {
  static propTypes = {
    header: types.node,
    footer: types.node,
    innerClassName: types.string,
    padding: function(props, propName, componentName) {
      if (props.padding && !props.padding.split(' ').every(pad => paddingTypes.indexOf(pad) >= 0)) {
        return new Error(`Invalid padding type used in ${componentName}`);
      }
    },
    scrollable: types.oneOfType([
      types.bool,
      types.number
    ])
  };

  render() {
    const {header, footer, innerClassName, padding, scrollable, children, ...other} = this.props;
    const panelStyle = (typeof scrollable === 'number') ? {maxHeight: `${scrollable}px`} : null;
    const props = mergeProps(other, {
      className: ['panel', this.kind, {'panel-scrollable': scrollable}],
      style: panelStyle
    });

    return (
      <div {...props}>
        <PanelHeader header={header}/>
        <div className={classnames('panel-body', padding, innerClassName)}>{children}</div>
        <PanelFooter footer={footer}/>
      </div>
    );
  }
}

/**
 * @component ShadowPanel
 * @description A `<Panel>` with a shadow on the bottom
 *
 * @property header {String} Text to show as the header of the `<Panel>`
 * @property shadowLevel {Number} The thickness (1-4) (defaults to `3`) of the shadow
 *
 */
class ShadowPanel extends Panel {
  constructor(props) {
    super(props);
    this.kind = `panel-shadow-${props.shadowLevel}`;
  }

  static propTypes = {
    ...Panel.propTypes,
    shadowLevel: types.oneOf([1, 2, 3, 4])
  };

  static defaultProps = {
    shadowLevel: 3
  };
}

/**
 * @component SimplePanel
 * @description A `<Panel>` with a simple rectangular border
 *
 * @property header {String} Text to show as the header of the `<Panel>`
 *
 */
class SimplePanel extends Panel {
  kind = 'panel-simple';
}

/**
 * @component BasicPanel
 * @description A `<Panel>` with padding and a shadow on the bottom
 *
 * @property header {String} Text to show as the header of the `<Panel>`
 *
 */
class BasicPanel extends Panel {
  kind = 'panel-basic';
}

/**
 * @component BasicPanelAlt
 * @description A `<Panel>` with padding, a shadow on the bottom, and a round border
 *
 * @property header {String} Text to show as the header of the `<Panel>`
 *
 */
class BasicPanelAlt extends Panel {
  kind = 'panel-basic-alt';
}

/**
 * @component ClickablePanel
 * @description A `<Panel>` with a background that lightens when hovered to indicate it is clickable
 *
 * @property header {String} Text to show as the header of the `<Panel>`
 *
 */
class ClickablePanel extends Panel {
  kind = 'panel-clickable';
}


/**
 * @component ClickableAltPanel
 * @description A `<Panel>` with a rounded border, a shadow on the bottom, and a background that lightens when hovered to indicate it is clickable
 *
 * @property header {String} Text to show as the header of the `<Panel>`
 *
 */
class ClickableAltPanel extends Panel {
  kind = 'panel-clickable-alt';
}

/**
 * @component HighlightPanel
 * @description A `<Panel>` with a rounded border and a shadow on the bottom for highlighting important parts of a page
 *
 * @property header {String} Text to show as the header of the `<Panel>`
 *
 */
class HighlightPanel extends Panel {
  kind = 'panel-highlight';
}

module.exports = {
  Panel,
  SimplePanel,
  BasicPanel,
  BasicPanelAlt,
  ClickablePanel,
  ClickableAltPanel,
  HighlightPanel,
  ShadowPanel,
  PanelTitle
};
