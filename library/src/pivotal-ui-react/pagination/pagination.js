var React = require('react');
import {mergeProps} from 'pui-react-helpers';
const types = React.PropTypes;
require('pui-css-pagination');

class PaginationButton extends React.Component {
  static propTypes = {
    content: types.node,
    active: types.bool,
    onSelect: types.func,
    eventKey: types.oneOfType([types.number, types.string])
  };

  click = (e) => {
    const {eventKey, onSelect} = this.props;
    onSelect && onSelect(e, {eventKey});
  };

  render() {
    const {content, active} = this.props;
    const activeClass = active ? 'active' : '';
    return (
      <li onClick={this.click} className={activeClass}>
        <a>
          {content}
        </a>
      </li>
    );
  }
}

class Pagination extends React.Component {
  static propTypes = {
    items: types.number,
    next: types.bool,
    prev: types.bool,
    activePage: types.number,
    onSelect: types.func
  };

  static defaultProps = {
    next: true,
    prev: true,
    onSelect: () => {}
  };

  render() {
    const {items, next, prev, activePage, onSelect, ...props} = this.props;
    const paginationButtons = [...Array(items)].map((_, index) => {
      const isActive = (index + 1 === activePage);
      return (
        <PaginationButton
          key={index}
          content={index + 1}
          active={isActive}
          onSelect={onSelect}
          eventKey={index + 1}
          {...props}/>
      );
    });

    const prevButton = <PaginationButton onSelect={onSelect} eventKey='prev' content="&lsaquo;"/>;
    const nextButton = <PaginationButton onSelect={onSelect} eventKey='next' content="&rsaquo;"/>;

    return (
      <ul className='pagination'>
        {prev ? prevButton : null}
        {paginationButtons}
        {next ? nextButton : null}
      </ul>
    );
  }
}

module.exports = {Pagination};
