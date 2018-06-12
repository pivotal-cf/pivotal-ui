import React, {PureComponent} from 'react';
import ReactDOMServer from 'react-dom/server';
import * as Babel from 'babel-standalone';
import {AllHtmlEntities} from 'html-entities';
import PropTypes from 'prop-types';
import {Panel} from 'pivotal-ui/react/panels';
import {FlexCol} from 'pivotal-ui/react/flex-grids';
import {DefaultButton} from 'pivotal-ui/react/buttons';
import {Icon} from 'pivotal-ui/react/iconography';
import unified from 'unified';
import parse from 'remark-parse';
import pretty from 'pretty';
import reactRenderer from 'remark-react';
import Editor from './editor';
import ErrorBoundary from './error_boundary';

const remark = unified().use(parse).use(reactRenderer);

const getRenderedReact = jsCode => {
  try {
    // eslint-disable-next-line no-eval
    const tempElem = React.createElement('div', {}, eval(jsCode));
    const renderedCode = ReactDOMServer.renderToStaticMarkup(tempElem);
    const strippedCode = renderedCode.replace(/^<div>/, '').replace(/<\/div>$/, '');

    return pretty(strippedCode);
  } catch (err) {
    console.error(err);
    return '<!--Failed to render React into HTML. See console for details.-->';
  }
}

export default class CodeExample extends PureComponent {
  static propTypes = {
    code: PropTypes.string,
    description: PropTypes.string,
    lang: PropTypes.string,
    noToolbar: PropTypes.bool,
    title: PropTypes.string
  };

  state = {showReact: false, showHtml: false, code: this.props.code};

  toggleReact = () => this.setState(({showReact}) => ({showReact: !showReact}));

  toggleHtml = () => this.setState(({showHtml}) => ({showHtml: !showHtml}));

  changeHandler = value => this.setState({code: AllHtmlEntities.decode(value)});

  render() {
    const {lang, title, description, noToolbar} = this.props;
    const {showReact, showHtml, code} = this.state;
    const hasReact = lang !== 'language-html';
    const hasHtml = lang !== 'language-jsx-only';
    let livePreview, transpiledCode;

    if (hasReact) {
      try {
        transpiledCode = Babel.transform(code, {presets: ['es2015', 'react']}).code;
        // eslint-disable-next-line no-eval
        livePreview = eval(transpiledCode);
      } catch (e) {
        livePreview = <pre className="caught-error">{e.toString()}</pre>;
      }
    } else {
      livePreview = <div dangerouslySetInnerHTML={{__html: code}}/>;
    }

    return (
      <Panel {...{
        className: 'code-example pvxl',
        title,
        titleCols: noToolbar ? null : [
          hasReact && <FlexCol fixed>
            <DefaultButton small flat {...{
              className: 'phs toolbar-button',
              icon: <Icon src="react"/>,
              onClick: this.toggleReact
            }}>
              {showReact ? 'hide' : 'show'} React
            </DefaultButton>
          </FlexCol>,
          hasHtml && <FlexCol fixed>
            <DefaultButton small flat {...{
              className: 'mll phs toolbar-button',
              icon: <Icon src="html5"/>,
              onClick: this.toggleHtml
            }}>
              {showHtml ? 'hide' : 'show'} HTML
            </DefaultButton>
          </FlexCol>
        ].filter(Boolean)
      }}>
        <div className="code-example-rendered">
          <ErrorBoundary>{livePreview}</ErrorBoundary>
        </div>
        {showReact && (
          <Editor {...{
            mode: 'jsx',
            code,
            changeHandler: this.changeHandler
          }}/>
        )}
        {showHtml && (
          <Editor {...{
            mode: 'html',
            code: hasReact ? getRenderedReact(transpiledCode) : code,
            readOnly: hasReact,
            changeHandler: hasReact ? null : this.changeHandler
          }}/>
        )}
      </Panel>
    );
  }
}