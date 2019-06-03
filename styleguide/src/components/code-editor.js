import React, {useState} from 'react';
import ReactDOMServer from 'react-dom/server';
import {DefaultButton} from '../../../src/react/buttons';
import {transform as babelify} from '@babel/standalone';
import pretty from 'pretty';
import {Controlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/lib/codemirror.css';
import '../../stylesheets/code-editor.scss';

class ErrorBoundary extends React.Component {
  state = {error: null};

  componentDidCatch(error) {
    this.setState({error});
  }

  render() {
    return this.state.error ? null : this.props.children;
  }
}

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
};

const CodeEditor = props => {
  const {title, description, code, language} = props;

  const transpile = code => {
    try {
      return babelify(code, {presets: ['es2015', 'react']}).code;
    } catch (err) {
      return <pre><code>{err.toString()}</code></pre>;
    }
  };

  const getOutput = (code, transpiled, hasReact) => {
    if (!hasReact) return (
      <div dangerouslySetInnerHTML={{__html: code}}/>
    );
    // eslint-disable-next-line no-eval
    return eval(transpiled) || null;
  };

  const [value, setValue] = useState(code);
  const [transpiled, setTranspiled] = useState(transpile(code));
  const [showHtmlCode, setShowHtmlCode] = useState(false);
  const [showReactCode, setShowReactCode] = useState(false);

  const hasReact = language !== 'html';
  const output = getOutput(value, transpiled, hasReact);

  return (
    <figure className="sg-code-editor">
      <figcaption className="sg-code-editor__header pal">
        <div className="display-flex" style={{justifyContent: 'space-between'}}>
          <span className="em-high">{title}</span>
          <span>
            {hasReact && <DefaultButton
              small flat
              className="sg-code-editor__button phn"
              onClick={() => setShowReactCode(!showReactCode)}>
              {showReactCode ? 'hide' : 'show'} React
            </DefaultButton>}
            <DefaultButton
              small flat
              className="sg-code-editor__button phn"
              onClick={() => setShowHtmlCode(!showHtmlCode)}>
              {showHtmlCode ? 'hide' : 'show'} HTML
            </DefaultButton>
          </span>
        </div>
        {description && (
          <div
            className="type-sm mtm sg-code-editor__description"
            dangerouslySetInnerHTML={{__html: description}}
          />
        )}
      </figcaption>
      <div className="pal">
        <ErrorBoundary>{output}</ErrorBoundary>
      </div>
      {showReactCode && (
        <div className="border-top pal">
          <CodeMirror
            className="sg-code-editor__codemirror"
            options={{mode: 'jsx'}}
            value={value}
            onBeforeChange={(editor, data, value) => setValue(value) || setTranspiled(transpile(value))}
            onChange={(editor, data, value) => {}}
          />
        </div>
      )}{showHtmlCode && (
        <div className="border-top pal">
          <CodeMirror
            className="sg-code-editor__codemirror"
            options={{mode: 'htmlmixed', readOnly: hasReact}}
            value={hasReact ? getRenderedReact(transpiled) : value}
            onBeforeChange={(editor, data, value) => hasReact ? setTranspiled(value) : setValue(value)}
            onChange={(editor, data, value) => {}}
          />
        </div>
      )}
    </figure>
  );
};

export default CodeEditor;
