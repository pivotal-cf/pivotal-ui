import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class ImportPreview extends PureComponent {
  static propTypes = {
    cssPath: PropTypes.string,
    reactPath: PropTypes.string,
    reactComponents: PropTypes.object
  };

  static defaultProps = {
    reactComponents: {}
  };

  render() {
    const {cssPath, reactPath, reactComponents} = this.props;
    if (!cssPath && !reactPath) return null;

    const componentNames = Object.keys(reactComponents);
    const reactImport = reactPath && `import {${componentNames.join(', ')}} from '${reactPath}';`;
    const cssImport = cssPath && `import '${cssPath}';`;
    const multipleComponents = componentNames.length > 1;

    return (
      <Fragment>
        {reactPath && (
          <div {...{className: 'border styleguide-import-preview'}}>
            <div className="border-bottom em-high pal bg-neutral-10">{`Import React component${multipleComponents ? 's' : ''}`}</div>
            <pre className="pre-unstyled man md-pre language-js"><code className="styleguide-import-preview-code">{reactImport}</code></pre>
          </div>
        )}
        {cssPath && (
          <div {...{className: classnames('border styleguide-import-preview', {'mtxxxl': reactPath})}}>
            <div className="border-bottom em-high pal bg-neutral-10">{`Import CSS${reactPath ? ' only' : ''}`}</div>
            <pre className="pre-unstyled man md-pre language-js"><code className="styleguide-import-preview-code">{cssImport}</code></pre>
          </div>
        )}
      </Fragment>
    );
  }
}