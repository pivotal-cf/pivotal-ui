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
    eventKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  };

  componentDidMount() {
    require('../../css/pagination');
  }

  click = e => {
    const {eventKey, onSelect} = this.props;
    onSelect && onSelect(e, {eventKey});
  };


  render() {
    // eslint-disable-next-line no-unused-vars
    const {content, active, eventKey, ...props} = this.props;
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
          ...props
        }}/>);
      }
    }

    const prevButton = (<PaginationButton {...{
      disabled: activePage === 1,
      onSelect,
      eventKey: 'prev',
      content: <Icon src="chevron_left"/>,
      iconOnly: true
    }}/>);

    const nextButton = (<PaginationButton {...{
      disabled: activePage === items,
      onSelect,
      eventKey: 'next',
      content: <Icon src="chevron_right"/>,
      iconOnly: true
    }}/>);

    return (<div className={classnames('pagination', className)} role="group">
      {prev ? prevButton : null}
      {elements}
      {next ? nextButton : null}
    </div>);
  }
}
