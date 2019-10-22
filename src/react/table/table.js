import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import '../../css/tables/index.js';
import {Collapsible} from '../collapsible';
import {Icon} from '../iconography';
import {DefaultButton} from '../buttons';
import {Checkbox} from '../checkbox';

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

export class TbodyForSelectable extends React.PureComponent {
  static propTypes = {
    onSelectionChanged: PropTypes.func,
    children: PropTypes.node
  };

  state = {selected: {}};


  constructor (props) {
    super(props);
    this.onSelected = this.onSelected.bind(this);
    this.onDeselected = this.onDeselected.bind(this);
  }

  onSelected(identifier) {
    console.log('oldState', this.state.selected);
    console.log('identifier onSelected', identifier);
    const newState = { ...this.state.selected, [identifier]:'selected'} ;
    console.log('newState', newState);

    this.props.onSelectionChanged(newState);
    this.setState({selected: newState });
  }

  onDeselected(identifier) {
    console.log('oldState', this.state.selected);
    console.log('identifier onDeselected', identifier);

    let tempSelected = Object.assign({}, this.state.selected);

    delete tempSelected[identifier];
    console.log('tempSelected', tempSelected);
    this.props.onSelectionChanged(tempSelected);

    this.setState({selected: tempSelected});
  }

  render() {
    const {
      children
    } = this.props;

    console.log('onSelected TbodyForSelectable.render', this.onSelected);

    const childrenWithCallback = React.Children.toArray(children)
            .map(child => {

              return React.cloneElement(child,
                  {
                    onSelected: this.onSelected,
                    onDeselected: this.onDeselected
                  });
            });


    return (
        <tbody>
          {childrenWithCallback}
        </tbody>
    );
  }
}


export const TrHeaderForDrawers = ({children, selectable}) => (<Tr>
  {selectable ? <Th className="pui-table--selectable-toggle border-right-0"/> : null}
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
    onSelected: PropTypes.func,
    onDeselected: PropTypes.func,
    children: PropTypes.node,
    selectable: PropTypes.bool,
    identifier: PropTypes.string
  };

  state = {expanded: false, selected: false};

  constructor (props) {
    super(props);
    this.checkboxOnChange = this.checkboxOnChange.bind(this);
  }


  checkboxOnChange(e){
    console.log('e.target', e.target);

    if(!this.state.selected) {
      this.props.onSelected(this.props.identifier);
    } else {
      this.props.onDeselected(this.props.identifier);
    }
    this.setState({selected: !this.state.selected});
  }

  render() {
    const {
      ariaLabelCollapsed,
      ariaLabelExpanded,
      children,
      className,
      drawerContent,
      onExpand,
        selectable
    } = this.props;
    const {expanded} = this.state;

    let collapsableBtnClassNames = classnames('border-right-0', {'active-indicator': expanded});

    let checkBoxTd;
    if (selectable) {
      checkBoxTd = (<Td className={classnames('border-right-0', {'active-indicator': expanded})}><Checkbox
          onChange={this.checkboxOnChange}/></Td>);
      collapsableBtnClassNames = classnames('border-right-0');
    }

    return (<Fragment>
      <Tr className={classnames({'border-bottom': !expanded})}>
        {checkBoxTd}

        <Td className={collapsableBtnClassNames}>
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
