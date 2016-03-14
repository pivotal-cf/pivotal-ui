var classnames = require('classnames');
var React = require('react');

var types = React.PropTypes;

const DOWN_KEY = 40;
const ENTER_KEY = 13;
const ESC_KEY = 27;
const TAB_KEY = 9;
const UP_KEY = 38;

class AutocompleteInput extends React.Component {
  static propTypes = {
    $autocomplete: types.object,
    autoFocus: types.bool,
    children(props, name) {
      if (props[name] && props[name].length) return new Error('AutocompleteInput can only wrap one element');
    },
    disabled: types.bool,
    onClick: types.func,
    onFocus: types.func,
    onPick: types.func,
    onPicking: types.func,
    onSearch: types.func,
    scrollIntoView: types.func
  };

  static defaultProps = {
    autoFocus: null
  };

  static DOWN_KEY = DOWN_KEY;
  static ENTER_KEY = ENTER_KEY;
  static ESC_KEY = ESC_KEY;
  static TAB_KEY = TAB_KEY;
  static UP_KEY = UP_KEY;

  change = (e) => {
    var {value} = e.currentTarget;
    this.props.onSearch(value, (suggestedValues) => {
      this.props.$autocomplete.merge({hidden: false, highlightedSuggestion: 0, value, suggestedValues}).flush();
    });
  };

  keyDown = (e) => {
    var {keyCode} = e;
    var {highlightedSuggestion, suggestedValues} = this.props.$autocomplete.get();
    var {onPicking = () => suggestedValues} = this.props;

    var pickItem = () => {
      var selectableSuggestions = onPicking(suggestedValues);
      e && (keyCode === ENTER_KEY) && e.preventDefault();
      this.props.$autocomplete.merge({highlightedSuggestion: -1, hidden: true}).flush();
      this.props.onPick(selectableSuggestions[highlightedSuggestion] || {value: this.props.$autocomplete.get('value')});
    };

    const keyCodes = {
      [DOWN_KEY]: () => {
        var selectableSuggestions = onPicking(suggestedValues);
        this.props.$autocomplete.merge({hidden: false, highlightedSuggestion: Math.min(highlightedSuggestion + 1, selectableSuggestions.length - 1)});
        this.props.scrollIntoView();
      },

      [UP_KEY]: () => {
        this.props.$autocomplete.merge({highlightedSuggestion: Math.max(highlightedSuggestion - 1, -1)});
        this.props.scrollIntoView();
      },

      [TAB_KEY]: pickItem,

      [ENTER_KEY]: pickItem,

      [ESC_KEY]: () => {
        this.props.$autocomplete.merge({highlightedSuggestion: -1, hidden: true});
      },

      noop: () => {}
    };

    keyCodes[keyCode in keyCodes ? keyCode : 'noop']();
  };

  renderDefault(props) {
    return (<input {...props} className={classnames('autocomplete-input', 'form-control', props.className)} type="search" value={props.value} aria-label={props.placeholder}/>);
  }

  render() {
    var {autoFocus, children, $autocomplete, ...props} = this.props;
    if (!$autocomplete) return null;
    var {value} = $autocomplete.get();
    var otherProps = {autoFocus, value, onChange: this.change, onKeyDown: this.keyDown};
    props = {...props, ...otherProps};
    if (!children) return this.renderDefault(props);
    children = React.Children.map(children, e => React.cloneElement(e, props));
    return (<div>{children}</div>);
  }
}

module.exports = AutocompleteInput;
