import React from 'react';
import classnames from 'classnames';

const types = React.PropTypes;

export class AutocompleteList extends React.Component {
  static propTypes = {
    $autocomplete: types.object,
    children(props, name) {
      if(props[name] && props[name].length) return new Error('AutocompleteList can only wrap one element');
    },
    className: types.string,
    minSearchTerm: types.number,
    onPick: types.func,
    selectedSuggestion: types.any
  }

  static defaultProps = {
    minSearchTerm: 0
  }

  constructor(props, context) {
    super(props, context);
    this.onClick = this.onClick.bind(this);
  }

  onClick(value, e) {
    e.preventDefault();
    this.props.onPick(value);
  }

  renderSuggestionList() {
    const {className} = this.props;
    const suggestedValues = this.props.$autocomplete.get('suggestedValues');
    const suggestions = suggestedValues.map((suggestion, key) => {
      const value = '_key_' in suggestion ? suggestion._key_ : suggestion.value;
      const className = classnames('autocomplete-item', {highlighted: key === this.props.$autocomplete.get('highlightedSuggestion')}, {selected: value === this.props.selectedSuggestion});
      return (<li key={key}>
        <a href="#" onClick={this.onClick.bind(this, suggestion)} role="button" title={value}
           className={className}>{value}</a>
      </li>);
    });
    if(!suggestions.length) return null;
    return (<ul className={classnames('autocomplete-list', className)}>{suggestions}</ul>);
  }

  renderDefault() {
    const {$autocomplete, minSearchTerm} = this.props;
    const {hidden, value} = $autocomplete.get();
    if(hidden || (value.length < minSearchTerm)) return null;
    return this.renderSuggestionList();
  }

  render() {
    let {children, $autocomplete, ...props} = this.props;
    if(!$autocomplete) return null;
    if(!children) return this.renderDefault();
    const {hidden, value, highlightedSuggestion, suggestedValues} = $autocomplete.get();
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
