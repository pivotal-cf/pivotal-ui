import React from 'react';
import PropTypes from 'prop-types';
import {mergeProps} from 'pui-react-helpers';
import 'pui-css-pagination';

class PaginationButton extends React.Component {
  static propTypes = {
    content: PropTypes.node,
    active: PropTypes.bool,
    onSelect: PropTypes.func,
    eventKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }

  click = e => {
    const {eventKey, onSelect} = this.props;
    onSelect && onSelect(e, {eventKey});
  }

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

export class Pagination extends React.Component {
  static propTypes = {
    items: PropTypes.number,
    next: PropTypes.bool,
    prev: PropTypes.bool,
    activePage: PropTypes.number,
    onSelect: PropTypes.func
  }

  static defaultProps = {
    next: true,
    prev: true,
    onSelect: () => {
    }
  }

  render() {
    const {items, next, prev, activePage, onSelect, ...props} = this.props;
    const paginationButtons = [...Array(items)].map((_, index) => {
      const isActive = (index + 1 === activePage);
      return (<PaginationButton
        key={index}
        content={index + 1}
        active={isActive}
        onSelect={onSelect}
        eventKey={index + 1}
        {...props}/>);
    });

    const prevButton = <PaginationButton onSelect={onSelect} eventKey="prev" content="&lsaquo;"/>;
    const nextButton = <PaginationButton onSelect={onSelect} eventKey="next" content="&rsaquo;"/>;

    return (<ul className="pagination">
      {prev ? prevButton : null}
      {paginationButtons}
      {next ? nextButton : null}
    </ul>);
  }
}
