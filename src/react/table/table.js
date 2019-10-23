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

const SelectionContext = React.createContext({
  isSelected: ()=>false,
  toggleSelected: ()=>{},
  allSelected: ()=>false,
  isSelectionIndeterminate: ()=>false,
  toggleSelectAll: ()=>{},
});

export class TableSelectable extends React.PureComponent {
  static propTypes = {
    onSelectionChanged: PropTypes.func,
    children: PropTypes.node,
    identifiers: PropTypes.array
  };

  constructor (props) {
    super(props);
    this.toggleSelected = this.toggleSelected.bind(this);
    this.isSelected = this.isSelected.bind(this);

    this.allSelected = this.allSelected.bind(this);
    this.isSelectionIndeterminate = this.isSelectionIndeterminate.bind(this);
    this.toggleSelectAll = this.toggleSelectAll.bind(this);

    this.state = {
      selection: {},
      selectionContextValue: {
        isSelected: this.isSelected,
        toggleSelected: this.toggleSelected,

        allSelected: this.allSelected,
        isSelectionIndeterminate: this.isSelectionIndeterminate,
        toggleSelectAll: this.toggleSelectAll,
      }
    };
  }

  isSelected(identifier) {
    return this.state.selection[identifier] === true;
  }

  toggleSelected(identifier) {
    let newSelection = Object.assign({}, this.state.selection);
    if(this.isSelected(identifier)) {
      delete newSelection[identifier];
    } else {
      newSelection[identifier] = true;
    }

    this.props.onSelectionChanged(newSelection);
    this.setState({selection: newSelection });
  }

  allSelected(){
    return Object.entries(this.state.selection).length === this.props.identifiers.length;
  }

  isSelectionIndeterminate(){
    let selected = Object.entries(this.state.selection).length;
    let allSelectable = this.props.identifiers.length;
    return selected !== 0 && (selected < allSelectable);
  }

  toggleSelectAll(){
    let selection = Object.assign({}, this.state.selection);
    let noneAreSelected = Object.entries(selection).length === 0;

    if (noneAreSelected) {
      this.props.identifiers.forEach(id => selection[id] = true);
    } else {
      this.props.identifiers.forEach(id => {
        if (this.isSelected(id)) {
          delete selection[id];
        }
      });
    }

    let forceUpdate = Object.assign({}, this.state.selectionContextValue);
    this.setState({selection, selectionContextValue:forceUpdate});
  }


  render() {
    const {className, onSelectionChanged, identifiers, ...props} = this.props;
    return (
        <SelectionContext.Provider value={this.state.selectionContextValue}>
          <table {...props} {...{
            className: classnames('pui-table', className)
          }}/>
        </SelectionContext.Provider>
    );
  }
}


export const TrHeaderForDrawers = ({children, selectable}) =>
    (<Tr>
      {selectable ?
          <SelectionContext.Consumer>
            { context =>
                (<Th className={classnames('pui-table--selectable-toggle border-right-0')}>
                  <Checkbox
                      checked={context.allSelected()}
                      indeterminate={context.isSelectionIndeterminate()}
                      onChange={context.toggleSelectAll}/>
                </Th>)
            }
          </SelectionContext.Consumer>
          : null}

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
    children: PropTypes.node,
    selectable: PropTypes.bool,
    identifier: PropTypes.string
  };

  state = {expanded: false, selected: false};

  static contextType = SelectionContext;

  constructor (props) {
    super(props);
    this.checkboxOnChange = this.checkboxOnChange.bind(this);
  }


  checkboxOnChange(){
    this.context.toggleSelected(this.props.identifier);
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
          checked={this.context.isSelected(this.props.identifier)}
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
