import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {BrandButton, DefaultButton} from '../buttons';
import {Icon} from '../iconography';

class PaginationButton extends React.PureComponent {
  static propTypes = {
    content: PropTypes.node,
    active: PropTypes.bool,
    onSelect: PropTypes.func,
    eventKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    activePage: PropTypes.number
  };

  componentDidMount() {
    require('../../css/pagination');
  }

  click = e => {
    const {eventKey, onSelect, activePage} = this.props;
    let newActivePage;
    if (eventKey === 'next') newActivePage = activePage + 1;
    else if (eventKey === 'prev') newActivePage = activePage - 1;
    else newActivePage = eventKey;
    onSelect && onSelect(e, {eventKey, newActivePage});
  };


  render() {
    // eslint-disable-next-line no-unused-vars
    const {content, active, eventKey, activePage, ...props} = this.props;
    const ButtonType = active ? BrandButton : DefaultButton;

    return (<ButtonType {...{onClick: this.click, flat: true, className: classnames({'active': active}), ...props}}>
      {content}
    </ButtonType>);
  }
}

export class Pagination extends React.PureComponent {
  static propTypes = {
    items: PropTypes.number,
    next: PropTypes.bool,
    prev: PropTypes.bool,
    activePage: PropTypes.number,
    onSelect: PropTypes.func
  };

  static defaultProps = {
    items: 1,
    next: true,
    prev: true,
    onSelect: () => {
    },
    activePage: 1
  };

  componentDidMount() {
    require('../../css/pagination');
  }

  render() {
    const {items, next, prev, activePage, onSelect, className, ...props} = this.props;

    const elements = [];

    if (items < 6) {
      for (let i = 0; i < items; i++) {
        elements.push(<PaginationButton {...{
          key: i,
          content: i + 1,
          active: i + 1 === activePage,
          onSelect,
          eventKey: i + 1,
          activePage,
          ...props
        }}/>);
      }
    } else {
      if (activePage <= 3) {
        for (let i = 0; i < 4; i++) {
          elements.push(<PaginationButton {...{
            key: i,
            content: i + 1,
            active: i + 1 === activePage,
            onSelect,
            eventKey: i + 1,
            activePage,
            ...props
          }}/>);
        }
      } else {
        elements.push(<PaginationButton {...{
          key: 0,
          content: 1,
          active: activePage === 1,
          onSelect,
          eventKey: 1,
          activePage,
          ...props
        }}/>);
        elements.push(<span key="ellipsis1">&hellip;</span>);
      }

      if (activePage > 3 && activePage < items - 2) {
        for (let i = activePage - 2; i < activePage + 1; i++) {
          elements.push(<PaginationButton {...{
            key: i,
            content: i + 1,
            active: i + 1 === activePage,
            onSelect,
            eventKey: i + 1,
            activePage,
            ...props
          }}/>);
        }
      }

      if (activePage >= items - 2) {
        for (let i = items - 4; i < items; i++) {
          elements.push(<PaginationButton {...{
            key: i,
            content: i + 1,
            active: i + 1 === activePage,
            onSelect,
            eventKey: i + 1,
            activePage,
            ...props
          }}/>);
        }
      } else {
        elements.push(<span key="ellipsis2">&hellip;</span>);
        elements.push(<PaginationButton {...{
          key: items - 1,
          content: items,
          active: items === activePage,
          onSelect,
          eventKey: items,
          activePage,
          ...props
        }}/>);
      }
    }

    const prevButton = (<PaginationButton {...{
      disabled: activePage === 1,
      onSelect,
      eventKey: 'prev',
      content: <Icon src="chevron_left"/>,
      iconOnly: true,
      activePage,
      'aria-label': 'Previous page'
    }}/>);

    const nextButton = (<PaginationButton {...{
      disabled: activePage === items,
      onSelect,
      eventKey: 'next',
      content: <Icon src="chevron_right"/>,
      iconOnly: true,
      activePage,
      'aria-label': 'Next page'
    }}/>);

    return (<div className={classnames('pagination', className)} role="group">
      {prev ? prevButton : null}
      {elements}
      {next ? nextButton : null}
    </div>);
  }
}
