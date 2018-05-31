import React from 'react';
import PropTypes from 'prop-types';

export default class Page extends React.PureComponent {
  static propTypes = {
    markdownContent: PropTypes.node.isRequired,
    pageMetadata: PropTypes.object
  };

  render() {
    const {markdownContent, pageMetadata} = this.props;
    const {title} = pageMetadata;

    return (
      <div>
        <h1>{title}</h1>
        {markdownContent}
      </div>
    );
  }
}