import React, {PureComponent} from 'react';
import {Autocomplete, AutocompleteInput} from 'pivotal-ui/react/autocomplete';
import {Input} from 'pivotal-ui/react/inputs';
import {routeData} from '../routes';
import Router from '../helpers/router';
import SearchResult from './search_result';

const searchItems = [];

routeData.forEach(({route, pageMetadata, pageSections}) => {
  if (route === '/' || route === '/404' || !pageMetadata) return;
  const {title, menu} = pageMetadata;

  if (!pageSections || !pageSections.length) {
    searchItems.push({title, category: menu, route});
    return;
  }

  pageSections.forEach(({route, title: subtitle}) => {
    searchItems.push({title, subtitle, category: menu, route});
  });
});

export default class SearchBar extends PureComponent {
  onPick = picked => {
    picked && picked.route && Router.navigate(picked.route);
    this.el && this.el.setState({value: ''});
  };

  onSearch = (input, callback) => {
    const searchText = input.toLowerCase();
    const titleMatches = [];
    const subtitleMatches = [];

    searchItems.forEach(({title, subtitle, category, route}) => {
      if (titleMatches.length + subtitleMatches.length > 50) return;
      const matchLength = searchText.length;

      if (title) {
        const matchIndex = title.toLowerCase().indexOf(searchText);
        if (matchIndex > -1) {
          titleMatches.push({route, value: <SearchResult {...{
            title, subtitle, category, matchIndex, matchLength, matched: 'title'
          }}/>});
          return;
        }
      }

      if (subtitle) {
        const matchIndex = subtitle.toLowerCase().indexOf(searchText);
        if (matchIndex > -1) {
          subtitleMatches.push({route, value: <SearchResult {...{
            title, subtitle, category, matchIndex, matchLength, matched: 'subtitle'
          }}/>});
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