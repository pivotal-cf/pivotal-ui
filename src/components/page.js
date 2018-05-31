import React from 'react';
import PropTypes from 'prop-types';

export default class Page extends React.PureComponent {
  static propTypes = {
    markdownContent: PropTypes.node.isRequired,
    pageMetadata: PropTypes.object
  };

  render() {
    const {markdownContent, pageMetadata} = this.props;
    return markdownContent;
  }
}