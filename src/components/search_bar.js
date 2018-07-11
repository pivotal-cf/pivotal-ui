import React, {PureComponent} from 'react';
import {Autocomplete, AutocompleteInput} from 'pivotal-ui/react/autocomplete';
import {Input} from 'pivotal-ui/react/inputs';
import SearchResult from './search_result';
import {withRouter} from 'react-router-dom'

const searchItems = [];

class SearchBar extends PureComponent {
  constructor(props) {
    super(props);
    const {routes} = props;

    Object.values(routes).forEach(route => {
      if (route.route === '/' || route.route === '/404') return;
      searchItems.push(route);
    });
  }

  onPick = route => {
    this.props.history.push(route.route);
    this.el && this.el.setState({value: ''});
  };

  onSearch = (input, callback) => {
    const searchText = input.toLowerCase();
    const titleMatches = [];
    const subtitleMatches = [];

    searchItems.forEach(({parentTitle: title, pageTitle: subtitle, category, route}) => {
      if (titleMatches.length + subtitleMatches.length > 50) return;
      const matchLength = searchText.length;

      if (title) {
        const matchIndex = title.toLowerCase().indexOf(searchText);
        if (matchIndex > -1) {
          titleMatches.push({
            route, value: <SearchResult {...{
              title, subtitle, category, matchIndex, matchLength, matched: 'title'
            }}/>
          });
          return;
        }
      }

      if (subtitle) {
        const matchIndex = subtitle.toLowerCase().indexOf(searchText);
        if (matchIndex > -1) {
          subtitleMatches.push({
            route, value: <SearchResult {...{
              title, subtitle, category, matchIndex, matchLength, matched: 'subtitle'
            }}/>
          });
          return;
        }
      }
    });

    callback([...titleMatches, ...subtitleMatches]);
  };

  render() {
    return (
      <div className="styleguide-search-bar ptl phxl mbxl">
        <Autocomplete {...{
          ref: el => this.el = el,
          onInitializeItems: callback => callback(searchItems),
          placeholder: 'Search',
          input: <AutocompleteInput><Input icon="search" className="search-input"/></AutocompleteInput>,
          onPick: this.onPick,
          onSearch: this.onSearch
        }}/>
      </div>
    );
  }
}

export default withRouter(SearchBar)