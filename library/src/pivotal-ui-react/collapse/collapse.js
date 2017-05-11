import React from 'react';
import PropTypes from 'prop-types';
import {Collapsible} from 'pui-react-collapsible';
import {mergeProps} from 'pui-react-helpers';
import {Icon} from 'pui-react-iconography';
import 'pui-css-collapse';

export class BaseCollapse extends React.Component {
  static propTypes = {
    divider: PropTypes.bool,
    header: PropTypes.node.isRequired,
    defaultExpanded: PropTypes.bool
  }

  constructor(props, context) {
    super(props, context);
    this.state = {expanded: !!props.defaultExpanded};
  }

  handleSelect = e => {
    e.preventDefault();
    this.setState({expanded: !this.state.expanded});
  }

  renderHeader() {
    const {header} = this.props;
    const {expanded} = this.state;
    return <a href="#" aria-expanded={expanded} aria-selected={expanded}>{header}</a>;
  }

  render() {
    const {children, defaultExpanded, divider, header, ...others} = this.props;
    const props = mergeProps(others, {className: ['panel', {'panel-divider': divider}]});
    const {expanded} = this.state;

    return (<div {...props}>
      <div className="panel-heading" onClick={this.handleSelect}>
        <div className="panel-title" role="presentation">
          {this.renderHeader()}
        </div>
      </div>
      <div className="panel-collapse">
        <Collapsible className="panel-body" expanded={expanded} delay={200}>
          {children}
        </Collapsible>
      </div>
    </div>);
  }
}

export class Collapse extends BaseCollapse {
  renderHeader() {
    const {header} = this.props;
    const {expanded} = this.state;
    const iconSrc = expanded ? 'arrow_drop_down' : 'arrow_drop_right';
    return (<div className="collapse-trigger">
      <Icon className="collapse-icon" src={iconSrc}/>
      {header}
    </div>);
  }
}

export class AltCollapse extends BaseCollapse {
  renderHeader() {
    const {header} = this.props;
    const {expanded} = this.state;
    const iconSrc = expanded ? 'remove_circle' : 'add_circle';
    return (<div className="collapse-trigger">
      <Icon className="collapse-icon" src={iconSrc}/>
      {header}
    </div>);
  }
}
