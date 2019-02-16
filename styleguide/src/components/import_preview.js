import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class ImportPreview extends PureComponent {
  static propTypes = {
    cssPath: PropTypes.string,
    reactPath: PropTypes.string,
    reactComponents: PropTypes.array
  };

  static defaultProps = {
    reactComponents: []
  };

  render() {
    const {cssPath, reactPath, reactComponents} = this.props;
    if (!cssPath && !reactPath) return null;

    const reactImport = reactPath && `import {${reactComponents.join(', ')}} from '${reactPath}';`;
    const cssImport = cssPath && `import '${cssPath}';`;
    const multipleComponents = reactComponents.length > 1;

    const preview = (label, code, className) => (
      <div {...{className: classnames('border styleguide-import-preview', className)}}>
        <div className="border-bottom em-high pal bg-white">{label}</div>
        <pre className="pre-unstyled man md-pre language-js"><code className="styleguide-import-preview-code">{code}</code></pre>
      </div>
    );

    return (
      <div>
        {reactPath && preview(`Import React component${multipleComponents ? 's' : ''}`, reactImport)}
        {cssPath && preview(`Import CSS${reactPath ? ' only' : ''}`, cssImport, {'mtxl': reactPath})}
      </div>
    );
  }
}