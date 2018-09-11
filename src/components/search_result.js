import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const underlineMatch = (text, matchIndex, matchLength, truncate) => {
  const beforeMatch = truncate ? '...' + text.substring(matchIndex - 10, matchIndex) : text.substring(0, matchIndex);
  const match = text.substr(matchIndex, matchLength);
  const afterMatch = text.substr(matchIndex + matchLength);
  return <span>{beforeMatch}<u>{match}</u>{afterMatch}</span>;
};

const underlineTextMatch = (text, matchIndex, matchLength) => {
  const startIndex = Math.max(0, matchIndex - 4);
  const beforeMatch = (startIndex > 0 ? '...' : '') + text.substring(startIndex, matchIndex);
  const match = text.substr(matchIndex, matchLength);
  const afterMatch = text.substr(matchIndex + matchLength);
  return <i>{beforeMatch}<u><b>{match}</b></u>{afterMatch}</i>;
};

export default class SearchResult extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    text: PropTypes.string,
    category: PropTypes.string,
    matchIndex: PropTypes.number,
    matchLength: PropTypes.number,
    matched: PropTypes.oneOf(['title', 'subtitle', 'text'])
  };

  render() {
    const {title, subtitle, text, category, matchIndex, matchLength, matched} = this.props;
    const renderedTitle = matched === 'title' ? underlineMatch(title, matchIndex, matchLength) : title;
    const renderedSubtitle = matched === 'subtitle' ? underlineMatch(subtitle, matchIndex, matchLength) : subtitle;
    const renderedText = matched === 'text' ? underlineTextMatch(text, matchIndex, matchLength) : null;

    return (
      <div className="search-result">
        <div className="search-result-category">{category}</div>
        <div className="search-result-title">
          {renderedTitle}{subtitle && <span className="type-dark-6 mhm">{'>'}</span>}{renderedSubtitle}
        </div>
        {renderedText}
      </div>
    );
  }
};