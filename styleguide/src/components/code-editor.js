import React, {useState} from 'react';
import {DefaultButton} from '../../../src/react/buttons';
import {Icon} from '../../../src/react/iconography';
import {transform as babelify} from '@babel/standalone';
import CodeMirror from 'react-codemirror';
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

const getOutput = (code, language) => {
  if (language === 'html') return (
    <div dangerouslySetInnerHTML={{__html: code}}/>
  );

  try {
    const transpiled = babelify(code, {presets: ['es2015', 'react']}).code;
    // eslint-disable-next-line no-eval
    return eval(transpiled) || null;
  } catch (err) {
    return <pre><code>{err.toString()}</code></pre>;
  }
};

const CodeEditor = props => {
  const {title, description, code, language} = props;
  const [value, setValue] = useState(code);
  const [showCode, setShowCode] = useState(false);
  const output = getOutput(value, language);
  const buttonText = language === 'html' ? 'HTML' : 'React';
  const mode = language === 'html' ? 'htmlmixed' : 'jsx';
  const iconSrc = language === 'html' ? 'html5' : 'react';

  return (
    <figure className="sg-code-editor">
      <figcaption className="sg-code-editor__header pal">
        <div className="display-flex" style={{justifyContent: 'space-between'}}>
          <span className="em-high">{title}</span>
          <DefaultButton
            small flat
            className="sg-code-editor__button phn"
            icon={<Icon src={iconSrc}/>}
            onClick={() => setShowCode(!showCode)}>
            {showCode ? 'hide' : 'show'} {buttonText}
          </DefaultButton>
        </div>
        {description && <div className="type-sm mtm">{description}</div>}
      </figcaption>
      <div className="pal">
        <ErrorBoundary>{output}</ErrorBoundary>
      </div>
      {showCode && (
        <div className="border-top pal">
          <CodeMirror
            className="sg-code-editor__codemirror"
            options={{mode}}
            value={value}
            onChange={newValue => setValue(newValue)}
          />
        </div>
      )}
    </figure>
  );
};

export default CodeEditor;
