import React from 'react';
import ReactDOMServer from 'react-dom/server';
import * as Babel from 'babel-standalone';
import {AllHtmlEntities} from 'html-entities';
import pretty from 'pretty';
import PropTypes from 'prop-types';
import unified from 'unified';
import parse from 'remark-parse';
import reactRenderer from 'remark-react';
import Editor from './ace_editor_wrapper';
import Toolbar from './toolbar';
import ErrorBoundary from '../error_boundary';

import 'brace/mode/jsx';
import 'brace/mode/html';
import 'brace/theme/crimson_editor';

export default class JsCodeArea extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    code: PropTypes.string.isRequired,
    noToolbar: PropTypes.bool,
    noHtml: PropTypes.bool
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
    return this.state.code !== nextState.code ||
      this.state.showReact !== nextState.showReact ||
      this.state.showHtmlPreview !== nextState.showHtmlPreview;
  }

  changeHandler = value => {
    this.setState({code: AllHtmlEntities.decode(value)});
  }

  toggleReact = () => {
    this.setState({showReact: !this.state.showReact});
  }

  toggleHtml = () => {
    this.setState({showHtmlPreview: !this.state.showHtmlPreview});
  }

  static getRenderedReact(code) {
    try {
    // eslint-disable-next-line no-eval
      const tempElem = React.createElement('div', {}, eval(code));
      const renderedCode = ReactDOMServer.renderToStaticMarkup(tempElem);
      const strippedCode = renderedCode.replace(/^<div>/, '').replace(/<\/div>$/, '');

      return pretty(strippedCode);
    } catch (err) {
      console.error(err);
      return '<!--Failed to render React into HTML. See console for details.-->';
    }
  }

  render() {
    const {title, description, noToolbar, noHtml} = this.props;
    const {code, remark} = this.state;

    let livePreview, transpiledCode;

    try {
      transpiledCode = Babel.transform(code, {presets: ['es2015', 'react']}).code;
      // eslint-disable-next-line no-eval
      livePreview = eval(transpiledCode);
    } catch (e) {
      livePreview = <pre>{e.toString()}</pre>;
    }

    let content;

    if (!noToolbar) {
      content = (
        <div>
          <Toolbar showReact={this.state.showReact}
                   showHtml={this.state.showHtmlPreview}
                   title={title}
                   toggleReact={this.toggleReact}
                   toggleHtml={this.toggleHtml}
                   isReact={true}
                   noHtml={noHtml}/>
          <div className="code-area-description">
            {remark.processSync(description).contents}
          </div>
        </div>
      );
    }

    return (
      <div className="code-editor">
        {content}
        <div className="code-editor--live-preview">
          <ErrorBoundary>{livePreview}</ErrorBoundary>
        </div>
        {this.state.showReact && (
          <Editor {...{
            mode: 'jsx',
            code,
            changeHandler: this.changeHandler
          }}/>
        )}
        {this.state.showHtmlPreview && (
          <Editor {...{
            mode: 'html',
            code: JsCodeArea.getRenderedReact(transpiledCode),
            readOnly: true
          }}/>
        )}
      </div>
    );
  }
}
