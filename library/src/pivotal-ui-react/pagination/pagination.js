import React from 'react';
import PropTypes from 'prop-types';
import 'pui-css-pagination';

class PaginationButton extends React.PureComponent {
  static propTypes = {
    content: PropTypes.node,
    active: PropTypes.bool,
    onSelect: PropTypes.func,
    eventKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  };

  click = e => {
    const {eventKey, onSelect} = this.props;
    onSelect && onSelect(e, {eventKey});
  };

  render() {
    const {content, active} = this.props;
    const activeClass = active ? 'active' : '';
    return (<li onClick={this.click} className={activeClass}>
      <a>
        {content}
      </a>
    </li>);
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
    }
  };

  render() {
    const {items, next, prev, activePage, onSelect, ...props} = this.props;
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

    return (<ul className="pagination">
      {prev ? prevButton : null}
      {paginationButtons}
      {next ? nextButton : null}
    </ul>);
  }
}
