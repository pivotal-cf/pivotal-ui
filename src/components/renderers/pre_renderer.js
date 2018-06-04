import React, {PureComponent} from 'react';
import CodeExample from '../code_example';

const customRenderLanguages = ['language-js', 'language-jsx', 'language-html', 'language-jsx-only'];

export default class PreRenderer extends PureComponent {
  render() {
    const {className = '', children} = this.props.children[0].props;
    const matches = className.match(/language-jsx-only|language-js|language-jsx|language-html/) || [];

    const lang = matches[0];

    let props;

    if (customRenderLanguages.indexOf(lang) !== -1) {
      const rawContent = children[0];

      const lines = rawContent.split('\n');
      let title = '';
      let description = '';
      let noToolbar = false;

      if (lines[0].indexOf('::title=') === 0) {
        title = lines[0];
        lines.splice(0, 1);
        title = title.replace('::title=', '');
      }

      if (lines[0].indexOf('::description=') === 0) {
        description = lines[0];
        lines.splice(0, 1);
        description = description.replace('::description=', '');
      }

      if (lines[0].indexOf('::noToolbar') === 0) {
        noToolbar = true;
        lines.splice(0, 1);
      }

      const code = lines.join('\n').trim();

      props = {lang, title, description, code, noToolbar};
    }

    switch (lang) {
      case 'language-js':
      case 'language-jsx':
      case 'language-jsx-only':
      case 'language-html':
        return <CodeExample {...props}/>;
      default:
        return <pre {...this.props}/>;
    }
  }
};