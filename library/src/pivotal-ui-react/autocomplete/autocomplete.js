const AutocompleteList = require('./autocomplete-list');
const AutocompleteInput = require('./autocomplete-input');
const classnames = require('classnames');
const Cursor = require('pui-cursor');
const from = require('from');
const mixin = require('pui-react-mixins');
const React = require('react');
const ReactDOM = require('react-dom');
const Scrim = require('pui-react-mixins/mixins/scrim_mixin');
const scrollIntoView = require('scroll-into-view');
const through = require('through');
const TrieSearch = require('trie-search');

require('pui-css-autocomplete');

const types = React.PropTypes;

function trieFromSearchableItems(searchableItems, trieOptions) {
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
}

class Autocomplete extends mixin(React.Component).with(Scrim) {
  constructor(props, context) {
    super(props, context);
    const value = this.props.value || '';
    this.state = {hidden: true, highlightedSuggestion: 0, suggestedValues: [], trie: null, value};
  }

  static propTypes = {
    className: types.string,
    disabled: types.bool,
    input: types.object,
    maxItems: types.number,
    onClick: types.func,
    onFilter: types.func,
    onFocus: types.func,
    onInitializeItems: types.func,
    onPick: types.func,
    onSearch: types.func,
    placeholder: types.string,
    selectedSuggestion: types.any,
    trieOptions: types.object,
    value: types.string
  };

  static defaultProps = {
    maxItems: 50, onInitializeItems: (done) => done([]), input: (<AutocompleteInput/>), placeholder: 'Search'
  };

  componentWillReceiveProps({value}) {
    if (value !== this.props.value) {
      this.setState({value});
    }
  }

  componentDidMount() {
    super.componentDidMount();
    this.props.onInitializeItems((searchableItems = []) => {
      trieFromSearchableItems(searchableItems, this.props.trieOptions).then(trie => {
        this.setState({searchableItems, trie});
      });
    });
  }

  onSearch = (value, callback) => {
    if (this.props.onSearch) return this.props.onSearch(value, callback);
    const {maxItems} = this.props;
    const {trie} = this.state;
    if (!trie) return callback([]);
    value = value.trim();
    let result = trie.get(value || '');
    if (this.props.onFilter) {
      result = this.props.onFilter(result);
    }
    callback(result.slice(0, maxItems));
  };

  showList = (defaultValue = null) => {
    const value = defaultValue === null ? this.state.value : defaultValue;
    this.onSearch(value, (suggestedValues) => {
      this.setState({hidden: false, suggestedValues: suggestedValues});
    });
  };

  onPick = (value) => {
    this.props.onPick && this.props.onPick(value);
    this.hideList();
  };

  hideList = () => {
    this.setState({hidden: true});
  };

  scrimClick = () => {
    this.hideList();
  };

  scrollIntoView = () => {
    Array.from(ReactDOM.findDOMNode(this).querySelectorAll('.highlighted')).map((el) => scrollIntoView(el, {validTarget: target => target !== window}));
  };

  render() {
    const $autocomplete = new Cursor(this.state, state => this.setState(state));
    const {
      className, maxItems, onFocus, onClick, disabled, selectedSuggestion, placeholder, input, children,
      onInitializeItems: __IGNORE1, onFilter: __IGNORE2, onPick: __IGNORE3, onSearch: __IGNORE4,
      trieOptions: __IGNORE5, ...props
    } = this.props;
    const {scrollIntoView, onPick, onSearch} = this;
    const clonedInput = React.cloneElement(
      input,
      {$autocomplete, onPick, scrollIntoView, onSearch, disabled, onFocus, onClick, placeholder}
    );
    return (
      <div className={classnames('autocomplete', className)} {...props} >
        {clonedInput}
        <AutocompleteList {...{$autocomplete, onPick, maxItems, selectedSuggestion}}>{children}</AutocompleteList>
      </div>
    );
  }
}

module.exports = {
  Autocomplete,
  AutocompleteInput,
  AutocompleteList
};
