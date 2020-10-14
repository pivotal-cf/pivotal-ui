import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const underlineMatch = (text, matchIndex, matchLength) => {
  const beforeMatch = text.substring(0, matchIndex);
  const match = text.substr(matchIndex, matchLength);
  const afterMatch = text.substr(matchIndex + matchLength);
  return <span>{beforeMatch}<u>{match}</u>{afterMatch}</span>;
};

export default class SearchResult extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    category: PropTypes.string,
    matchIndex: PropTypes.number,
    matchLength: PropTypes.number,
    matched: PropTypes.oneOf(['title', 'subtitle'])
  };

  render() {
    const {title, subtitle, category, matchIndex, matchLength, matched} = this.props;
    const renderedTitle = matched === 'title' ? underlineMatch(title, matchIndex, matchLength) : title;
    const renderedSubtitle = matched === 'subtitle' ? underlineMatch(subtitle, matchIndex, matchLength) : subtitle;

    return (
      <div className="search-result">
        <div className="search-result-category">{category}</div>
        <div className="search-result-title">
          {renderedTitle}{subtitle && <span className="type-dark-6 mhm">{'>'}</span>}{renderedSubtitle}
        </div>
      </div>
    );
  }
};