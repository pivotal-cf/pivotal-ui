import React, {Component} from 'react';
import PropTypes from 'prop-types';
import kebabCase from 'lodash.kebabcase';

export default class TocSidebar extends Component {
  static propTypes = {
    json: PropTypes.array.isRequired
  };

  isValidContent = (jsonEntry) => {
    const {depth, lang, type, value} = jsonEntry;
    let isHeading, isJsx, isHtml;

    isHeading = [2, 4].indexOf(depth) !== -1 && type === 'heading';
    isJsx = lang === 'jsx' && value && !!value.match('::title=');
    isHtml = lang == 'html' && value && !!value.match('::title=');

    return isHeading || isJsx || isHtml;
  };

  createTocEntry(jsonEntry, key) {
    let value, {children, depth = 4, lang} = jsonEntry;

    if (lang === 'jsx' || lang === 'html') {
      value = jsonEntry.value.match(/::title=(.*)\n/)[1]
    } else {
      value = children[0].value;
    }

    return (<a {...{
      key,
      className: `heading-${depth}`,
      href: `#${kebabCase(value.toLowerCase())}`
    }}>{value}</a>);
  };

  render() {
    const {json} = this.props;
    return (
      <div className="toc-sidebar">
        <div className="toc">
          {json
            .filter(this.isValidContent)
            .map(this.createTocEntry)
          }
        </div>
      </div>
    );
  };
}