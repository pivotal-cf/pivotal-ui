// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import {Collapsible} from '../../collapsible';
import {Icon} from '../../iconography';
import {DefaultButton} from '../../buttons';
import classnames from 'classnames';

import {TablePlugin} from '../table_plugin';

const privates = new WeakMap();
const TABLE_KEYS = {
  UP: 38,
  DOWN: 40
};
const ROW_KEYS = {
  LEFT: 37,
  RIGHT: 39
};

export function withRowDrawer(Table) {
  class TbodyWithDrawer extends React.Component {
    static propTypes = {
      keyboardNavigation: PropTypes.bool
    };

    constructor(props) {
      super(props);
      this.state = {};
      privates.set(this, {});
    }

    componentWillMount() {
      if (!this.props.keyboardNavigation) return;
      const keyDownListener = e => this.handleKeyDown(e);
      privates.set(this, {keyDownListener});
      document.addEventListener('keydown', keyDownListener);
    }

    componentWillUnmount() {
      const {keyDownListener} = privates.get(this);
      if (!keyDownListener) return;
      document.removeEventListener('keydown', keyDownListener);
      privates.set(this, {keyDownListener: null});
    }

    handleKeyDown(e) {
      if (Object.values(TABLE_KEYS).indexOf(e.keyCode) === -1) return;

      e.preventDefault();

      const {children} = this.props;
      const {selectedRow} = this.state;

      const currentRow = typeof selectedRow === 'number' ? selectedRow : -1;

      let newSelectedRow;
      if (e.keyCode === TABLE_KEYS.UP) {
        newSelectedRow = Math.max(0, currentRow - 1);
      } else {
        newSelectedRow = Math.min(children.length - 1, currentRow + 1);
      }

      this.setState({selectedRow: newSelectedRow});
    }

    render() {
      const {selectedRow} = this.state;
      // eslint-disable-next-line no-unused-vars
      const {children: oldChildren, keyboardNavigation, ...props} = this.props;
      const children = oldChildren
        .filter(child => child)
        .map((child, i) => {
          const isSelected = i === selectedRow;
          if (!isSelected) return child;
          return React.cloneElement(child, {isSelected});
        });
      return <div {...props}>{children}</div>;
    }
  }

  class RowWithDrawer extends React.Component {
    static propTypes = {
      rowDrawer: PropTypes.func,
      rowIndex: PropTypes.number,
      rowDatum: PropTypes.object,
      keyboardNavigation: PropTypes.bool,
      isSelected: PropTypes.bool,
      expanded: PropTypes.bool,
      defaultExpanded: PropTypes.bool,
      setRowDrawerExpanded: PropTypes.func,
      rowDrawerExpandedIcon: PropTypes.string,
      rowDrawerCollapsedIcon: PropTypes.string,
    };

    static defaultProps = {
      defaultExpanded: false,
      rowDrawerExpandedIcon: 'chevron_down',
      rowDrawerCollapsedIcon: 'chevron_right',
    };

    constructor(props) {
      super(props);
      this.state = {expanded: false};
      privates.set(this, {});
    }

    componentWillMount() {
      if (!this.props.keyboardNavigation) return;
      const keyDownListener = e => this.handleKeyDown(e);
      privates.set(this, {keyDownListener});
      document.addEventListener('keydown', keyDownListener);
    }

    componentWillUnmount() {
      const {keyDownListener} = privates.get(this);
      if (!keyDownListener) return;
      document.removeEventListener('keydown', keyDownListener);
      privates.set(this, {keyDownListener: null});
    }

    handleKeyDown(e) {
      if (Object.values(ROW_KEYS).indexOf(e.keyCode) === -1) return;

      e.preventDefault();

      const {isSelected} = this.props;
      if (!isSelected) return;

      const {rowDrawer, rowIndex, rowDatum} = this.props;
      const drawerContent = rowIndex !== -1 && rowDrawer(rowIndex, rowDatum);
      if (!drawerContent) return;

      if (e.keyCode === ROW_KEYS.RIGHT) {
        this.setState({expanded: true});
      } else {
        this.setState({expanded: false});
      }
    }

    render() {
      // eslint-disable-next-line no-unused-vars
      const { children, rowDrawer, rowIndex, rowDatum, keyboardNavigation, isSelected, defaultExpanded, setRowDrawerExpanded, rowDrawerExpandedIcon, rowDrawerCollapsedIcon, expanded: expandedProps, ...props} = this.props;
      const {expanded: expandedState} = this.state;
      const expanded = expandedProps !== undefined && expandedProps !== null ? expandedProps : expandedState;

      const drawerContent = rowIndex !== -1 && rowDrawer(rowIndex, rowDatum);
      const onClick = () => {
        if (!drawerContent) {
          return;
        }

        if (expandedProps !== undefined && setRowDrawerExpanded) {
          setRowDrawerExpanded({rowIndex, rowDatum, expanded: !expanded});
        } else {
          this.setState({expanded: !expanded});
        }
      };
      const src = expanded ? rowDrawerExpandedIcon : rowDrawerCollapsedIcon;

      const className = classnames(
        props.className,
        {expandable: rowIndex !== -1},
        {expanded: expanded},
        {'tr-selected': isSelected},
        {'no-drawer-content': rowIndex !== -1 && !drawerContent}
      );

      let leftColumn;
      if (rowIndex !== -1) {
        leftColumn = (<DefaultButton
          flat
          iconOnly
          icon={<Icon {...{className: 'expand-icon', src}} />}
          className="expand-button"
          aria-label="Expand"
        />);
      } else {
        leftColumn = (
          <div
            {...{
              className: 'th col col-fixed',
              style: {borderRightWidth: '0px', width: '36px'},
            }}
          />
        );
      }
      return (
        <div className="tr-drawer">
          <div {...props} {...{onClick, className}}>
            {leftColumn}
            {children}
          </div>
          {rowIndex !== -1 && (
            <Collapsible {...{expanded: expanded && !!drawerContent, delay: 200}}>{drawerContent}</Collapsible>
          )}
        </div>
      );
    }
  }

  return class TableWithRowDrawer extends TablePlugin {
    static propTypes = {
      rowDrawer: PropTypes.func,
      keyboardNavigation: PropTypes.bool,
      getRowDrawerExpanded: PropTypes.func,
      setRowDrawerExpanded: PropTypes.func,
      rowDrawerExpandedIcon: PropTypes.string,
      rowDrawerCollapsedIcon: PropTypes.string,
    };

    render() {
      const {rowDrawer, keyboardNavigation, getRowDrawerExpanded, setRowDrawerExpanded, rowDrawerExpandedIcon, rowDrawerCollapsedIcon, ...props} = this.props;
      return this.renderTable(
        Table,
        {
          tbodyTag: () => rowDrawer && TbodyWithDrawer,
          trTag: () => rowDrawer && RowWithDrawer,
          tbody: () => rowDrawer && {keyboardNavigation},
          tr: (props, {rowIndex, rowDatum}) =>
            rowDrawer && {
              rowDrawer,
              rowIndex,
              rowDatum,
              keyboardNavigation,
              setRowDrawerExpanded,
              rowDrawerExpandedIcon,
              rowDrawerCollapsedIcon,
              expanded: getRowDrawerExpanded && getRowDrawerExpanded({rowIndex, rowDatum}),
            },
        },
        props
      );
    }
  };
}
