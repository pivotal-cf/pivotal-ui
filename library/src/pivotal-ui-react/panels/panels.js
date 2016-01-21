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

class SimplePanel extends Panel {
  kind = 'panel-simple';
}

class BasicPanel extends Panel {
  kind = 'panel-basic';
}

class BasicPanelAlt extends Panel {
  kind = 'panel-basic-alt';
}

class ClickablePanel extends Panel {
  kind = 'panel-clickable';
}


class ClickableAltPanel extends Panel {
  kind = 'panel-clickable-alt';
}

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
