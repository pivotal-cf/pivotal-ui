import React, {PureComponent} from 'react';

export default class SearchResult extends PureComponent {
  render() {
    const {title, subtitle, category} = this.props;

    return (
      <div className="search-result">
        {category !== 'default' && <div className="search-result-category">{category}</div>}
        <div className="search-result-title">
          {title}{subtitle && <span className="type-dark-6 mhm">{'>'}</span>}{subtitle}
        </div>
      </div>
    );
  }
};