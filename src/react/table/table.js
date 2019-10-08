import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import '../../css/tables/index.js';
import {Collapsible} from '../collapsible';
import {Icon} from '../iconography';
import {DefaultButton} from '../buttons';

export const Table = ({className, ...props}) => (
  <table {...props} {...{
    className: classnames('pui-table', className)
  }}/>
);

export const Caption = ({className, children, ...props}) =>
  (<caption {...{...props, className: classnames(className, 'em-high h5 txt-l')}}>{children}</caption>);
export const Thead = props => <thead {...props}/>;
export const Tbody = props => <tbody {...props}/>;
export const Tfoot = props => <tfoot {...props}/>;
export const Tr = props => <tr {...props}/>;
export const Td = props => <td {...props}/>;
export const Th = ({scope = 'col', ...props}) => <th {...props} {...{scope}}/>;

export const TrHeaderForDrawers = ({children}) => (<Tr>
  <Th className="pui-table--collapsible-toggle border-right-0"/>
  {children}
</Tr>);

export const TrWithoutDrawer = ({children}) => (<Tr>
  <Td className="pui-table--collapsible-toggle border-right-0"/>
  {children}
</Tr>);

export class TrWithDrawer extends React.PureComponent {
  static propTypes = {
    ariaLabelCollapsed: PropTypes.string.isRequired,
    ariaLabelExpanded: PropTypes.string.isRequired,
    drawerContent: PropTypes.node,
    onExpand: PropTypes.func,
    children: PropTypes.node
  };

  state = {expanded: false};

  render() {
    const {
      ariaLabelCollapsed,
      ariaLabelExpanded,
      children,
      className,
      drawerContent,
      onExpand
    } = this.props;
    const {expanded} = this.state;

    return (<Fragment>
      <Tr className={classnames({'border-bottom': !expanded})}>
        <Td className={classnames('border-right-0', {'active-indicator': expanded})}>
          <DefaultButton
            className="pui-table--collapsible-btn"
            icon={<Icon src="chevron_right" className={
              classnames('transition-transform', {'rotate-qtr-turn': expanded})
            }/>}
            onClick={() => {
              if (!expanded && onExpand) onExpand();
              this.setState(({expanded}) => ({expanded: !expanded}));
            }}
            iconOnly
            flat
            aria-label={expanded ? ariaLabelExpanded : ariaLabelCollapsed}
          />
        </Td>
        {children}
      </Tr>
      <Tr className={classnames(className, {'border-top-0 display-none': !expanded})}>
        <Td colSpan={1 + children.length} className="pan">
          <Collapsible {...{expanded}}>
            {drawerContent}
          </Collapsible>
        </Td>
      </Tr>
    </Fragment>);
  }
}
