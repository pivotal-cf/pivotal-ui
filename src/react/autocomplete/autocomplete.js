import {AutocompleteList} from './autocomplete_list';
import classnames from 'classnames';
import from from 'from';
import {default as mixin} from '../mixins';
import React from 'react';
import Scrim from '../mixins/mixins/scrim_mixin';
import through from 'through';
import TrieSearch from 'trie-search';
import PropTypes from 'prop-types';

const trieFromSearchableItems = (searchableItems, trieOptions) => {
  return new Promise(resolve => {
    let trie;
    from(function (count, callback) {
      if (searchableItems && count >= searchableItems.length) this.emit('end');
      this.emit('data', searchableItems[count]);
      callback();
    }).pipe(through(value => {
      if (typeof value === 'object') {
        if (!trie) trie = new TrieSearch(null, trieOptions);
        trie.addFromObject(value);
        resolve(trie);
        return;
      }
      if (!trie) trie = new TrieSearch('value', trieOptions);
      trie.add({value});
      resolve(trie);
    }));
  });
};

const DOWN_KEY = 40;
const ENTER_KEY = 13;
const ESC_KEY = 27;
const TAB_KEY = 9;
const UP_KEY = 38;

export class Autocomplete extends mixin(React.Component).with(Scrim) {
  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    input: PropTypes.object,
    maxItems: PropTypes.number,
    onClick: PropTypes.func,
    onFilter: PropTypes.func,
    onFocus: PropTypes.func,
    onInitializeItems: PropTypes.func,
    onPick: PropTypes.func,
    onSearch: PropTypes.func,
    placeholder: PropTypes.string,
    selectedSuggestion: PropTypes.any,
    trieOptions: PropTypes.object,
    value: PropTypes.string,
    showNoSearchResults: PropTypes.bool
  };

  static defaultProps = {
    maxItems: 50,
    onInitializeItems: done => done([]),
    input: <input/>,
    placeholder: 'Search',
    showNoSearchResults: false
  };

  constructor(props, context) {
    super(props, context);
    const value = this.props.value || '';
    this.state = {hidden: true, highlightedSuggestion: 0, suggestedValues: [], trie: null, value};
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this.mounted = false;
  }

  componentDidMount() {
    super.componentDidMount();
    this.mounted = true;
    require('../../css/autocomplete');
    this.props.onInitializeItems((searchableItems = []) => {
      return trieFromSearchableItems(searchableItems, this.props.trieOptions).then(trie => {
        if (this.mounted) this.setState({searchableItems, trie});
      });
    });
  }

  searchItemsInOrder = () => {
    const {searchableItems} = this.state;
    if (searchableItems.every(item => typeof item === 'string')) return searchableItems.map(value => ({value}));

    return searchableItems.map(item => {
      const key = Object.keys(item)[0];
      return {_key_: key, value: item[key]};
    });
  };

  onSearch = (value) => {
    const {maxItems} = this.props;
    const {trie} = this.state;
    let suggestedValues;
    if (this.props.onSearch) {
      this.setState({
        hidden: false,
        highlightedSuggestion: 0,
        value
      });
      return this.props.onSearch(value, suggestedValues => this.setState({
        suggestedValues
      }));
    } else if (!trie) {
      suggestedValues = [];
    } else {
      value = value.trim();
      let result = value ? trie.get(value) : this.searchItemsInOrder();

      if (this.props.onFilter) {
        result = this.props.onFilter(result);
      }
      suggestedValues = result.slice(0, maxItems);
    }
    this.setState({hidden: false, highlightedSuggestion: 0, value, suggestedValues});
  };

  getValue() {
    return this.props.value === undefined ? this.state.value : this.props.value;
  }

  onKeyDown = e => {
    const {keyCode} = e;
    const {highlightedSuggestion, suggestedValues} = this.state;

    const pickItem = () => {
      e && (keyCode === ENTER_KEY) && e.preventDefault();
      const value = suggestedValues[highlightedSuggestion] || {value: this.getValue()};
      this.setState({highlightedSuggestion: -1, hidden: true});
      this.onPick(value);
    };

    const keyCodes = {
      [DOWN_KEY]: () => {
        this.setState({
          hidden: false,
          highlightedSuggestion: Math.min(highlightedSuggestion + 1, suggestedValues.length - 1)
        });
      },

      [UP_KEY]: () => {
        this.setState({
          highlightedSuggestion: Math.max(highlightedSuggestion - 1, -1)
        });
      },

      [TAB_KEY]: () => this.setState({highlightedSuggestion: -1, hidden: true}),

      [ENTER_KEY]: pickItem,

      [ESC_KEY]: () => this.setState({highlightedSuggestion: -1, hidden: true}),
    };

    if (keyCodes[keyCode]) keyCodes[keyCode]();
  };

  updateList = (defaultValue = null) => {
    const value = defaultValue === null ? this.getValue() : defaultValue;
    this.onSearch(value, (suggestedValues) => {
      this.setState({suggestedValues: suggestedValues});
    });
  };

  showList = (defaultValue = null) => {
    const value = defaultValue === null ? this.getValue() : defaultValue;
    this.onSearch(value, (suggestedValues) => {
      this.setState({hidden: false, suggestedValues: suggestedValues});
    });
  };

  onPick = value => {
    this.props.onPick && this.props.onPick(value);
    this.hideList();
  };

  hideList = () => this.setState({hidden: true});
  scrimClick = () => this.hideList();

  render() {
    const {
      className, maxItems, onFocus, onClick, disabled, selectedSuggestion, placeholder, input, children,
      onInitializeItems: __IGNORE1, onFilter: __IGNORE2, onPick: __IGNORE3, onSearch: __IGNORE4,
      trieOptions: __IGNORE5, value: __IGNORE6, showNoSearchResults, ...props
    } = this.props;
    const {onKeyDown} = this;
    const clonedInput = React.cloneElement(
      input,
      {
        value: this.getValue(),
        onChange: (e) => this.onSearch(e.target.value),
        disabled,
        onFocus,
        onClick,
        onKeyDown,
        placeholder,
        'aria-label': placeholder,
        type: 'search',
        ...input.props,
        className: classnames('autocomplete-input', 'form-control', input.props.className)
      }
    );

    return (
      <div className={classnames('autocomplete', className)} ref={ref => this.autocomplete = ref} {...props}>
        {clonedInput}
        <AutocompleteList {...{
          ...this.state,
          value: this.getValue(),
          onClick: this.onPick,
          maxItems,
          selectedSuggestion,
          showNoSearchResults
        }}>
          {children}
        </AutocompleteList>
      </div>
    );
  }
}
