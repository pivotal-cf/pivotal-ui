import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class ImportPreview extends PureComponent {
  static propTypes = {
    cssPath: PropTypes.string,
    reactPath: PropTypes.string,
    componentProps: PropTypes.object
  };

  static defaultProps = {
    componentProps: {}
  };

  render() {
    const {cssPath, reactPath, componentProps} = this.props;
    if (!cssPath && !reactPath) return null;

    const componentNames = Object.keys(componentProps);
    const reactImport = reactPath && `import {${componentNames.join(', ')}} from '${reactPath}';`;
    const cssImport = cssPath && `import '${cssPath}';`;
    const multipleComponents = componentNames.length > 1;

    const preview = (label, code, className) => (
      <div {...{className: classnames('border styleguide-import-preview', className)}}>
        <div className="border-bottom em-high pal bg-neutral-10">{label}</div>
        <pre className="pre-unstyled man md-pre language-js"><code className="styleguide-import-preview-code">{code}</code></pre>
      </div>
    );

    return (
      <Fragment>
        {reactPath && preview(`Import React component${multipleComponents ? 's' : ''}`, reactImport)}
        {cssPath && preview(`Import CSS${reactPath ? ' only' : ''}`, cssImport, {'mtxxxl': reactPath})}
      </Fragment>
    );
  }
}