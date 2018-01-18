import React from 'react';
import PropTypes from 'prop-types';
import {Collapsible} from '../collapsible';
import {mergeProps} from '../helpers';
import {Icon} from '../iconography';

export class BaseCollapse extends React.PureComponent {
  static propTypes = {
    divider: PropTypes.bool,
    header: PropTypes.node.isRequired,
    defaultExpanded: PropTypes.bool
  };

  constructor(props, context) {
    super(props, context);
    this.state = {expanded: !!props.defaultExpanded};
  }

  componentDidMount() {
    require('../../css/collapse');
  }

  handleSelect = e => {
    e.preventDefault();
    this.setState({expanded: !this.state.expanded});
  };

  renderHeader() {
    const {header} = this.props;
    const {expanded} = this.state;
    return <a href="#" aria-expanded={expanded} aria-selected={expanded}>{header}</a>;
  }

  render() {
    const {children, defaultExpanded, divider, header, ...others} = this.props;
    const props = mergeProps(others, {
      className: [
        'pui-collapse',
        {'pui-collapse-divider': divider},
        'panel',
        {'panel-divider': divider}
      ]
    });
    const {expanded} = this.state;

    return (<div {...props}>
      <div className="pui-collapse-panel-heading panel-heading" onClick={this.handleSelect}>
        <div className="pui-collapse-panel-title panel-title" role="presentation">
          {this.renderHeader()}
        </div>
      </div>
      <div className="pui-collapse-panel panel-collapse">
        <Collapsible className="pui-collapse-panel-body panel-body" expanded={expanded} delay={200}>
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
    return (<div className="pui-collapse-trigger collapse-trigger">
      <Icon className="pui-collapse-icon collapse-icon" src={iconSrc}/>
      {header}
    </div>);
  }
}

export class AltCollapse extends BaseCollapse {
  renderHeader() {
    const {header} = this.props;
    const {expanded} = this.state;
    const iconSrc = expanded ? 'remove_circle' : 'add_circle';
    return (<div className="pui-collapse-trigger collapse-trigger">
      <Icon className="pui-collapse-icon collapse-icon" src={iconSrc}/>
      {header}
    </div>);
  }
}
