import React from 'react';
import classnames from 'classnames';
import {mergeProps} from 'pui-react-helpers';
import 'pui-css-panels';

const types = React.PropTypes;

const paddingTypes = [];
['p', 'm'].forEach(type => {
  ['l', 'r', 't', 'b', 'h', 'v', 'a'].forEach(location => {
    ['n', 's', 'm', 'l', 'xl', 'xxl', 'xxxl', 'xxxxl'].forEach(size => {
      paddingTypes.push(`${type}${location}${size}`);
    });
  });
});

export class PanelTitle extends React.Component {
  static propTypes = {
    className: types.string
  }

  render() {
    let {className, ...other} = this.props;
    className = classnames('panel-title-alt', className);
    return <div {...{className}} {...other}/>;
  }
}

class PanelHeader extends React.Component {
  static propTypes = {
    actions: types.node,
    header: types.node,
    subtitle: types.node
  }

  render() {
    const {actions, header, subtitle} = this.props;
    if (header) {
      const titleNode = header.constructor === String ?
        (<PanelTitle>{header}</PanelTitle>) :
        header;

      const headerNode = subtitle ?
        (<div>{titleNode}
          <div className="panel-subtitle">{subtitle}</div>
        </div>) :
        titleNode;

      const actionsNode = actions ? <div className="panel-actions">{actions}</div> : null;

      return (<div className="panel-header">
        {headerNode}
        {actionsNode}
      </div>);
    } else {
      return null;
    }
  }
}

class PanelFooter extends React.Component {
  static propTypes = {
    footer: types.node
  }

  render() {
    const {footer} = this.props;

    if (footer) {
      return (<div className="panel-footer">
        {footer}
      </div>);
    } else {
      return null;
    }
  }
}

export class Panel extends React.Component {
  static propTypes = {
    header: types.node,
    footer: types.node,
    actions: types.node,
    subtitle: types.node,
    innerClassName: types.string,
    padding: (props, propName, componentName) => {
      if (props.padding && !props.padding.split(' ').every(pad => paddingTypes.indexOf(pad) >= 0)) {
        return new Error(`Invalid padding type used in ${componentName}`);
      }
    },
    scrollable: types.oneOfType([
      types.bool,
      types.number
    ])
  }

  render() {
    const {actions, children, footer, header, innerClassName, padding, scrollable, shadowLevel, subtitle, ...other} = this.props;
    const scrollableStyle = (typeof scrollable === 'number') ? {maxHeight: `${scrollable}px`} : null;
    const props = mergeProps(other, {
      className: ['panel', this.kind]
    });

    const bodyProps = {
      className: classnames('panel-body', padding, innerClassName, {'panel-scrollable': scrollable}),
      style: scrollableStyle
    };

    return (<div {...props}>
      <PanelHeader {...{actions, header, subtitle}}/>
      <div {...bodyProps}>{children}</div>
      <PanelFooter footer={footer}/>
    </div>);
  }
}

export class ShadowPanel extends Panel {
  constructor(props) {
    super(props);
    this.kind = `panel-shadow-${props.shadowLevel}`;
  }

  static propTypes = {
    ...Panel.propTypes,
    shadowLevel: types.oneOf([1, 2, 3, 4])
  }

  static defaultProps = {
    shadowLevel: 3
  }
}

export class SimplePanel extends Panel { kind = 'panel-simple'; }
export class BasicPanel extends Panel { kind = 'panel-basic'; }
export class BasicPanelAlt extends Panel { kind = 'panel-basic-alt'; } 
export class ClickablePanel extends Panel { kind = 'panel-clickable'; } 
export class ClickableAltPanel extends Panel { kind = 'panel-clickable-alt'; } 
export class HighlightPanel extends Panel { kind = 'panel-highlight'; } 