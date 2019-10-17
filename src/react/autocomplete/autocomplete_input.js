import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const DOWN_KEY = 40;
const ENTER_KEY = 13;
const ESC_KEY = 27;
const TAB_KEY = 9;
const UP_KEY = 38;

export class AutocompleteInput extends React.Component {
  static propTypes = {
    autoFocus: PropTypes.bool,
    children(props, name) {
      if (props[name] && props[name].length) return new Error('AutocompleteInput can only wrap one element');
    },
    disabled: PropTypes.bool,
    highlightedSuggestion: PropTypes.any,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onPick: PropTypes.func,
    onPicking: PropTypes.func,
    onSearch: PropTypes.func,
    scrollIntoView: PropTypes.func,
    setState: PropTypes.func,
    suggestedValues: PropTypes.array,
    value: PropTypes.string
  };

  static defaultProps = {
    autoFocus: null
  };

  static DOWN_KEY = DOWN_KEY;
  static ENTER_KEY = ENTER_KEY;
  static ESC_KEY = ESC_KEY;
  static TAB_KEY = TAB_KEY;
  static UP_KEY = UP_KEY;

  componentDidMount() {
    require('../../css/inputs');
    require('../../css/forms');
  }

  change = e => {
    const {value} = e.currentTarget;
    this.props.setState({
      hidden: false, highlightedSuggestion: 0, value
    });
    this.props.onSearch(value, suggestedValues => {
      this.props.setState({suggestedValues});
    });
  };

  keyDown = e => {
    const {keyCode} = e;
    const {highlightedSuggestion, suggestedValues, value, onPicking = () => suggestedValues} = this.props;

    const pickItem = () => {
      const selectableSuggestions = onPicking(suggestedValues);
      e && (keyCode === ENTER_KEY) && e.preventDefault();
      this.props.setState({
        highlightedSuggestion: -1,
        hidden: true
      });
      this.props.onPick(selectableSuggestions[highlightedSuggestion] || {value});
    };

    const keyCodes = {
      [DOWN_KEY]: () => {
        const selectableSuggestions = onPicking(suggestedValues);
        this.props.setState({
          hidden: false,
          highlightedSuggestion: Math.min(highlightedSuggestion + 1, selectableSuggestions.length - 1)
        });
        this.props.scrollIntoView();
      },

      [UP_KEY]: () => {
        this.props.setState({
          highlightedSuggestion: Math.max(highlightedSuggestion - 1, -1)
        });
        this.props.scrollIntoView();
      },

      [TAB_KEY]: pickItem,

      [ENTER_KEY]: pickItem,

      [ESC_KEY]: () => {
        this.props.setState({
          highlightedSuggestion: -1,
          hidden: true
        });
      },

      noop: () => {
      }
    };

    keyCodes[keyCode in keyCodes ? keyCode : 'noop']();
  };

  renderDefault(props) {
    delete props.setState;
    delete props.highlightedSuggestion;
    delete props.suggestedValues;
    return (<input
      {...props}
      className={classnames('autocomplete-input', 'form-control', props.className)}
      type="search"
      value={props.value}
      aria-label={props.placeholder}
    />);
  }

  render() {
    let {autoFocus, value, children, onPick, onPicking, onSearch, scrollIntoView, ...props} = this.props;
    const otherProps = {autoFocus, value, onChange: this.change, onKeyDown: this.keyDown};
    props = {...props, ...otherProps};
    if (!children) return this.renderDefault(props);
    children = React.Children.map(children, e => React.cloneElement(e, props));

    return <div>{children}</div>;
  }
}
