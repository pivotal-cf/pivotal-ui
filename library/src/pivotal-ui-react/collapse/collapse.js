import {Collapsible} from 'pui-react-collapsible';
import classnames from 'classnames';
import {mergeProps} from 'pui-react-helpers';
import {Panel} from 'pui-react-panels';
const React = require('react');
require('pui-css-collapse');

const types = React.PropTypes;

class BaseCollapse extends React.Component {
  static propTypes = {
    divider: types.bool,
    header: types.node.isRequired,
    defaultExpanded: types.bool
  };

  constructor(props, context) {
    super(props, context);
    this.state = {expanded: !!this.props.defaultExpanded};
  }

  handleSelect = (e) => {
    e.preventDefault();
    this.setState({expanded: !this.state.expanded});
  };

  renderHeader() {
    const {header} = this.props;
    const {expanded} = this.state;
    return <a href="#" aria-expanded={expanded} aria-selected={expanded}>{header}</a>

  }

  render() {
    var {divider, children, ...others} = this.props;
    var props = mergeProps(others, {className: ['panel', {'panel-divider': divider}]});

    var {expanded} = this.state;

    return (
      <div {...props}>
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
      </div>
    );
  }
}

class Collapse extends BaseCollapse {
  renderHeader() {
    const {header} = this.props;
    const {expanded} = this.state;
    const iconClass = expanded ? 'fa fa-caret-down' : 'fa fa-caret-right';
    return (
      <div className="collapse-trigger">
        <i className={classnames(iconClass, 'collapse-icon')}/>
        {header}
      </div>
    );
  }
}

class AltCollapse extends BaseCollapse {
  renderHeader() {
    const {header} = this.props;
    const {expanded} = this.state;
    const iconClass = expanded ? 'fa fa-minus-square' : 'fa fa-plus-square';
    return (
      <div className="collapse-trigger">
        <i className={classnames(iconClass, 'collapse-icon')}/>
        {header}
      </div>
    );
  }
}

module.exports = {BaseCollapse, Collapse, AltCollapse};
