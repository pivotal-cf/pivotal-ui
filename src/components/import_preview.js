import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Panel} from 'pivotal-ui/react/panels';

export default class ImportPreview extends React.PureComponent {
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
          <Panel {...{
            title: `Import React component${multipleComponents ? 's' : ''}:`,
            className: 'styleguide-import-preview mtxl'
          }}>
            <pre className="pre-unstyled"><code className="styleguide-import-preview-code">{reactImport}</code></pre>
          </Panel>
        )}
        {cssPath && (
          <Panel {...{
            title: `Import CSS${reactPath ? ' only' : ''}:`,
            className: 'styleguide-import-preview mtxl'
          }}>
            <pre className="pre-unstyled"><code className="styleguide-import-preview-code">{cssImport}</code></pre>
          </Panel>
        )}
      </Fragment>
    );
  }
}