var classnames = require('classnames');
var React = require('react');
var types = React.PropTypes;

function onClick(value, e) {
  e.preventDefault();
  this.props.onPick(value);
}

class AutocompleteList extends React.Component {
  static propTypes = {
    $autocomplete: types.object,
    children(props, name) {
      if (props[name] && props[name].length) return new Error('AutocompleteList can only wrap one element');
    },
    className: types.string,
    minSearchTerm: types.number,
    onPick: types.func,
    selectedSuggestion: types.any
  };

  static defaultProps = {
    minSearchTerm: 0
  };

  renderSuggestionList() {
    var {className} = this.props;
    var suggestedValues = this.props.$autocomplete.get('suggestedValues');
    var suggestions = suggestedValues.map((suggestion, key) => {
      var className = classnames('autocomplete-item', {highlighted: key === this.props.$autocomplete.get('highlightedSuggestion')}, {selected: suggestion.value === this.props.selectedSuggestion});
      return (
        <li key={key}>
          <a href="#" onClick={onClick.bind(this, suggestion)} role="button" title={suggestion.value} className={className}>{suggestion.value}</a>
        </li>
      );
    });
    if (!suggestions.length) return null;
    return (<ul className={classnames('autocomplete-list', className)}>{suggestions}</ul>);
  }

  renderDefault() {
    var {$autocomplete, minSearchTerm} = this.props;
    var {hidden, value} = $autocomplete.get();
    if (hidden || (value.length < minSearchTerm)) return null;
    return this.renderSuggestionList();
  }

  render() {
    var {children, $autocomplete, ...props} = this.props;
    if (!$autocomplete) return null;
    if (!children) return this.renderDefault();
    var {hidden, value, highlightedSuggestion, suggestedValues} = $autocomplete.get();
    if (hidden) return null;
    return (<div>{React.Children.map(children, e => React.cloneElement(e, {value, suggestedValues, highlightedSuggestion, onClick, ...props}))}</div>);
  }
}

module.exports = AutocompleteList;
