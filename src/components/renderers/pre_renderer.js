import React, {Fragment, PureComponent} from 'react';
import classnames from 'classnames';
import CodeExample from '../code_example';

const customRenderLanguages = ['language-js', 'language-jsx', 'language-html'];

export default class PreRenderer extends PureComponent {
  render() {
    const {className = '', children} = this.props.children[0].props;
    const matches = className.match(/language-js|language-jsx|language-html/) || [];
    const lang = matches[0];

    if (customRenderLanguages.indexOf(lang) !== -1) {
      const rawContent = children[0];
      const lines = rawContent.split('\n');
      let title = '';
      let description = '';
      let noToolbar = false;
      let nonInteractive = false;

      if (lines[0].indexOf('::title=') === 0) {
        title = lines[0].replace('::title=', '');
        lines.splice(0, 1);
      }

      if (lines[0].indexOf('::description=') === 0) {
        description = lines[0].replace('::description=', '');
        lines.splice(0, 1);
      }

      if (lines[0].indexOf('::noToolbar') === 0) {
        noToolbar = true;
        lines.splice(0, 1);
      }

      if (lines[0].indexOf('::nonInteractive') === 0) {
        nonInteractive = true;
        lines.splice(0, 1);
      }

      const code = lines.join('\n').trim();

      if (!nonInteractive) return <CodeExample {...{lang, title, description, code, noToolbar}}/>;

      return (
        <pre {...{...this.props, className: classnames('md-pre border border-not-rounded', className)}}>
          {<code>{lines.join('\n').trim()}</code>}
        </pre>
      );
    }

    return (
      <pre {...{...this.props, className: classnames('md-pre border border-not-rounded', className)}}>
        {React.Children.map(this.props.children, (child, key) => React.cloneElement(child, {key}))}
      </pre>
    );
  }
};