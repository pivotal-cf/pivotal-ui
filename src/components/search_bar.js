import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Autocomplete, AutocompleteInput} from 'pivotal-ui/react/autocomplete';
import {Input} from 'pivotal-ui/react/inputs';
import classnames from 'classnames';
import {routeData} from '../routes';
import Router from '../helpers/router';

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

console.log(searchItems)

const SearchResult = ({title, subtitle, category}) => {
  return <div>
    <span>{category}</span>
    <span>{title}</span>
    <span>{subtitle}</span>
  </div>;
}

export default class SearchBar extends PureComponent {
  onPick = picked => {
    picked && picked.route && Router.navigate(picked.route);
  };

  onSearch = (input, callback) => {
    const searchText = input.toLowerCase();
    const titleMatches = [];
    const subtitleMatches = [];

    searchItems.forEach(({title, subtitle, category, route}) => {
      if (titleMatches.length + subtitleMatches.length > 50) return;

      if (title && title.toLowerCase().indexOf(searchText) > -1) {
        titleMatches.push({route, value: <SearchResult {...{title, subtitle, category}}/>});
        return;
      }

      if (subtitle && subtitle.toLowerCase().indexOf(searchText) > -1) {
        subtitleMatches.push({route, value: <SearchResult {...{title, subtitle, category}}/>});
        return;
      }
    });

    callback([...titleMatches, ...subtitleMatches]);
  };

  render() {
    return (
      <div className="styleguide-search-bar ptl phxl mbxl">
        <Autocomplete {...{
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