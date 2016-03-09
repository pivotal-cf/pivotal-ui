var AutocompleteList = require('./autocomplete-list');
var AutocompleteInput = require('./autocomplete-input');
var classnames = require('classnames');
var Cursor = require('pui-cursor');
var {map, readable} = require('event-stream');
var React = require('react');
var ReactDOM = require('react-dom');
var scrollIntoView = require('scroll-into-view');
var TrieSearch = require('trie-search');

var types = React.PropTypes;

function trieFromSearchableItems(searchableItems) {
  return new Promise(resolve => {
    let trie;
    readable(function(count, callback) {
      if(searchableItems && count >= searchableItems.length) this.emit('end');
      callback(null, searchableItems[count]);
    }).pipe(map(value => {
      if (typeof value === 'object') {
        if (!trie) trie = new TrieSearch();
        trie.addFromObject(value);
        resolve(trie);
        return;
      }
      if (!trie) trie = new TrieSearch('value');
      trie.add({value});
      resolve(trie);
    }));
  });
}

var Autocomplete = React.createClass({
  propTypes: {
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
    value: types.string
  },

  getDefaultProps() {
    return {maxItems: 50, onInitializeItems: (done) => done([]), input: (<AutocompleteInput/>), placeholder: 'Search'};
  },

  getInitialState() {
    var value = this.props.value || '';
    return {hidden: true, highlightedSuggestion: 0, suggestedValues: [], trie: null, value};
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({value: nextProps.value});
    }
  },

  componentDidMount() {
    this.props.onInitializeItems(async (searchableItems = []) => {
      const trie = await trieFromSearchableItems(searchableItems);
      this.setState({searchableItems, trie});
    });
  },

  onSearch(value, callback) {
    if (this.props.onSearch) return this.props.onSearch(value, callback);
    var {maxItems} = this.props;
    var {trie} = this.state;
    if (!trie) return callback([]);
    value = value.trim();
    var result = trie.get(value || '');
    if (this.props.onFilter) { result = this.props.onFilter(result); }
    callback(result.slice(0, maxItems));
  },

  showList(defaultValue = null) {
    var value = defaultValue === null ? this.state.value : defaultValue;
    this.onSearch(value, (suggestedValues) => {
      this.setState({hidden: false, suggestedValues: suggestedValues});
    });
  },

  onPick(value) {
    this.props.onPick && this.props.onPick(value);
    this.hideList();
  },

  hideList() {
    this.setState({hidden: true});
  },

  scrollIntoView() {
    Array.from(ReactDOM.findDOMNode(this).querySelectorAll('.highlighted')).map((el) => scrollIntoView(el, {validTarget: target => target !== window}));
  },

  render() {
    var $autocomplete = new Cursor(this.state, state => this.setState(state));
    var {className, maxItems, onFocus, onClick, disabled, selectedSuggestion, placeholder, input, children, ...props} = this.props;
    var {hideList, scrollIntoView, onPick, onSearch} = this;
    input = React.cloneElement(input, {$autocomplete, onPick, hideList, scrollIntoView, onSearch, disabled, onFocus, onClick, placeholder});
    return (
      <div className={classnames('autocomplete', 'mhs', className)} {...props} >
        {input}
        <AutocompleteList {...{$autocomplete, onPick, maxItems, selectedSuggestion}}>{children}</AutocompleteList>
      </div>
    );
  }
});

module.exports = {
  Autocomplete,
  AutocompleteInput,
  AutocompleteList
};
