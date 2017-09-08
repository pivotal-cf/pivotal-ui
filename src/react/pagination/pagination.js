import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

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
    const {content, active} = this.props;
    return (<button onClick={this.click} className={classnames('btn', {
      'btn-default-alt': !active, 'btn-default': active
    })}>
      {content}
    </button>);
  }
}

export class Pagination extends React.PureComponent {
  static propTypes = {
    items: PropTypes.number,
    next: PropTypes.bool,
    prev: PropTypes.bool,
    activePage: PropTypes.number,
    onSelect: PropTypes.func,
    small: PropTypes.bool,
    large: PropTypes.bool
  };

  static defaultProps = {
    items: 1,
    next: true,
    prev: true,
    onSelect: () => {
    }
  };

  componentDidMount() {
    require('../../css/pagination');
  }

  render() {
    const {items, next, prev, activePage, onSelect, small, large, ...props} = this.props;
    const paginationButtons = [];
    for (let i = 0; i < items; i++) {
      const isActive = (i + 1 === activePage);
      paginationButtons.push(<PaginationButton
        key={i}
        content={i + 1}
        active={isActive}
        onSelect={onSelect}
        eventKey={i + 1}
        {...props}/>);
    }


    const prevButton = <PaginationButton onSelect={onSelect} eventKey="prev" content="&lsaquo;"/>;
    const nextButton = <PaginationButton onSelect={onSelect} eventKey="next" content="&rsaquo;"/>;

    return (<div className={classnames('pagination', 'btn-group', {
      'btn-group-small': small,
      'btn-group-large': large
    })} role="group">
      {prev ? prevButton : null}
      {paginationButtons}
      {next ? nextButton : null}
    </div>);
  }
}
