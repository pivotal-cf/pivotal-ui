import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export class AutocompleteList extends React.Component {
  static propTypes = {
    children(props, name) {
      if(props[name] && props[name].length) return new Error('AutocompleteList can only wrap one element');
    },
    className: PropTypes.string,
    hidden: PropTypes.bool,
    highlightedSuggestion: PropTypes.any,
    minSearchTerm: PropTypes.number,
    onClick: PropTypes.func,
    selectedSuggestion: PropTypes.any,
    showNoSearchResults: PropTypes.bool,
    suggestedValues: PropTypes.array,
    value: PropTypes.string
  };

  static defaultProps = {
    minSearchTerm: 0
  };

  constructor(props, context) {
    super(props, context);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    require('../../css/autocomplete');
  }

  onClick(value, e) {
    e.preventDefault();
    this.props.onClick(value);
  }

  renderSuggestionList() {
    const {className, showNoSearchResults, suggestedValues, highlightedSuggestion} = this.props;
    const suggestions = suggestedValues.map((suggestion, key) => {
      const value = suggestion._key_ ? suggestion._key_ : suggestion.value;
      const className = classnames('autocomplete-item', {highlighted: key === highlightedSuggestion}, {selected: value === this.props.selectedSuggestion});
      return (<li key={key}>
        <a href="#" onClick={this.onClick.bind(this, suggestion)} role="button" title={value}
           className={className}>{value}</a>
      </li>);
    });
    if(!suggestions.length) {
      return showNoSearchResults ? (<div><ul><li className="autocomplete-list autocomplete-item autocomplete-item-no-results">No search results</li></ul></div>) : null;
    }
    return (<ul className={classnames('autocomplete-list', className)}>{suggestions}</ul>);
  }

  renderDefault() {
    const {hidden, value, minSearchTerm} = this.props;
    if(hidden || (value.length < minSearchTerm)) return null;
    return this.renderSuggestionList();
  }

  render() {
    let {children, hidden, value, highlightedSuggestion, suggestedValues, ...props} = this.props;
    if(!children) return this.renderDefault();
    if(hidden) return null;


    children = React.Children.map(children, e => React.cloneElement(e, {
      value,
      suggestedValues,
      highlightedSuggestion,
      onClick: this.onClick,
      ...props
    }));

    return <div>{children}</div>;
  }
}
