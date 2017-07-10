import React from 'react';
import ReactDOMServer from 'react-dom/server';
import * as Babel from 'babel-standalone';
import {AllHtmlEntities} from 'html-entities';
import pretty from 'pretty';
import PropTypes from 'prop-types';
import unified from 'unified';
import parse from 'remark-parse';
import reactRenderer from 'remark-react';

import ReactEditor from './react_editor';
import HtmlEditor from './html_editor';
import Toolbar from './toolbar';

import 'brace/mode/jsx';
import 'brace/mode/html';
import 'brace/theme/crimson_editor';

export default class JsCodeArea extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    code: PropTypes.string.isRequired,
    file: PropTypes.string,
    name: PropTypes.string,
    noToolbar: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      code: props.code,
      showReact: false,
      showHtmlPreview: false,
      remark: unified().use(parse).use(reactRenderer)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.code !== this.props.code) this.setState({code: nextProps.code});
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.code != nextState.code ||
      this.state.showReact != nextState.showReact ||
      this.state.showHtmlPreview != nextState.showHtmlPreview;
  }

  changeHandler(value) {
    this.setState({code: AllHtmlEntities.decode(value)});
  }

  toggleEditor() {
    this.setState({showReact: !this.state.showReact});
  }

  toggleHtmlPreview() {
    this.setState({showHtmlPreview: !this.state.showHtmlPreview});
  }

  static getRenderedReact(code) {
    const tempElem = React.createElement('div', {}, eval(code));
    const renderedCode = ReactDOMServer.renderToStaticMarkup(tempElem);
    const strippedCode = renderedCode.replace(/^<div>/, '').replace(/<\/div>$/, '');

    return pretty(strippedCode);
  }

  render() {
    const {file, name, title, description, noToolbar} = this.props;
    const {code, remark} = this.state;

    let livePreview, transpiledCode;

    try {
      transpiledCode = Babel.transform(code, {presets: ['es2015', 'react']}).code;
      livePreview = eval(transpiledCode);
      ReactDOMServer.renderToStaticMarkup(livePreview);
    } catch (e) {
      console.log(e);
      livePreview = <pre>{e.toString()}</pre>;
    }

    let content;

    if (!noToolbar) {
      content = (
        <div>
          <Toolbar showReact={this.state.showReact}
                   showHtml={this.state.showHtmlPreview}
                   title={title}
                   file={file}
                   name={name}
                   toggleEditor={this.toggleEditor.bind(this)}
                   toggleHtmlPreview={this.toggleHtmlPreview.bind(this)}
                   isReact={true}/>
          <div className="code-area-description mtxl mbxxl type-sm">
            {remark.processSync(description).contents}
          </div>
        </div>
      );
    }

    return (
      <div className="code-editor">
        {content}
        {this.state.showReact && <ReactEditor code={code} changeHandler={this.changeHandler.bind(this)}/>}
        {this.state.showHtmlPreview && <HtmlEditor code={JsCodeArea.getRenderedReact(transpiledCode)} readOnly={true}/>}
        <div className="code-editor--live-preview">
          {livePreview}
        </div>
      </div>
    );
  }
}
