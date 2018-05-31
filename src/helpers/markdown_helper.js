import React from 'react';
import MarkdownViewer from '../components/markdown_viewer';

const markdownFileToComponent = ({file, name}) => {
  const json = require(`../../docs/${file}`);
  return () => <MarkdownViewer {...{file, name, json}}/>;
};

export {markdownFileToComponent}