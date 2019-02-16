import React, {PureComponent} from 'react';
import {Autocomplete, AutocompleteInput} from 'pivotal-ui/react/autocomplete';
import {Input} from 'pivotal-ui/react/inputs';
import SearchResult from './search_result';
import {withRouter} from 'react-router-dom';

let searchItems;

class SearchBar extends PureComponent {
  constructor(props) {
    super(props);
    searchItems = Object.values(props.routes).filter(({route}) => route !== '/' && route !== '/404');
  }

  onPick = route => {
    this.props.history.push(route.route);
    this.el && this.el.setState({value: ''});
  };

  onSearch = (input, callback) => {
    const searchText = input.toLowerCase();
    const titleMatches = [];
    const subtitleMatches = [];

    searchItems.forEach(({parentTitle: title, pageTitle: subtitle, category, route, text}) => {
      if (titleMatches.length + subtitleMatches.length > 50) return;
      const matchLength = searchText.length;
      const resultProps = {title, subtitle, text, category, matchLength};

      if (title) {
        const matchIndex = title.toLowerCase().indexOf(searchText);
        if (matchIndex > -1) return titleMatches.push({
          route, value: <SearchResult {...{...resultProps, matchIndex, matched: 'title'}}/>
        });
      }

      if (subtitle) {
        const matchIndex = subtitle.toLowerCase().indexOf(searchText);
        if (matchIndex > -1) return subtitleMatches.push({
          route, value: <SearchResult {...{...resultProps, matchIndex, matched: 'subtitle'}}/>
        });
      }

      if (text) {
        const matchIndex = text.toLowerCase().indexOf(searchText);
        if (matchIndex > -1) return subtitleMatches.push({
          route, value: <SearchResult {...{...resultProps, matchIndex, matched: 'text'}}/>
        });
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

export default withRouter(SearchBar);