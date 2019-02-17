import React from 'react';
import rehypeReact from 'rehype-react';
import {H1, H2, H3, H4, H5, H6, Table, Img} from '../components/markdown';
import ColorContrastTool from '../tools/color_contrast_tool';
import ColorSearch from '../tools/color_search';

const renderMarkdownAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    'h1': H1,
    'h2': H2,
    'h3': H3,
    'h4': H4,
    'h5': H5,
    'h6': H6,
    'table': Table,
    'img': Img,
    'color-contrast-tool': ColorContrastTool,
    'color-search': ColorSearch
  }
}).Compiler;

export default function renderMarkdown(htmlAst) {
  return renderMarkdownAst(htmlAst);
}