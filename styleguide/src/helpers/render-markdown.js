import React from 'react';
import rehypeReact from 'rehype-react';
import {Anchor, H1, H2, H3, H4, H5, H6, Table, Img} from '../components/markdown';
import ColorContrastTool from '../tools/color-contrast-tool';
import ColorPalette from '../tools/color-palette';
import IconSearch from '../tools/icon-search';
import CodeEditor from '../components/code-editor';

const renderMarkdownAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    'a': Anchor,
    'h1': H1,
    'h2': H2,
    'h3': H3,
    'h4': H4,
    'h5': H5,
    'h6': H6,
    'table': Table,
    'img': Img,
    'code-editor': CodeEditor,
    'color-contrast-tool': ColorContrastTool,
    'color-palette': ColorPalette,
    'icon-search': IconSearch
  }
}).Compiler;

export default function renderMarkdown(htmlAst) {
  return renderMarkdownAst(htmlAst);
}