import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Grid, FlexCol} from 'pivotal-ui/react/flex-grids';
import {Toggle} from 'pivotal-ui/react/toggle';
import {FormUnit} from 'pivotal-ui/react/forms';

const formatReactImport = (reactPath, reactComponents, useImportSyntax) => {
  if (!reactPath) return;
  if (useImportSyntax) return `import {${reactComponents.join(', ')}} from '${reactPath}';`;
  return `const {${reactComponents.join(', ')}} = require('${reactPath}');`;
}

const formatCssImport = (cssPath, useImportSyntax) => {
  if (!cssPath) return;
  if (useImportSyntax) return `import '${cssPath}';`;
  return `require('${cssPath}');`;
}

export default class ImportPreview extends React.PureComponent {
  static propTypes = {
    cssPath: PropTypes.string,
    reactPath: PropTypes.string,
    reactComponents: PropTypes.arrayOf(PropTypes.string)
  };

  state = {useImportSyntax: true};

  onToggleChange = ({target: {checked}}) => this.setState({useImportSyntax: checked});

  render() {
    const {cssPath, reactPath, reactComponents} = this.props;
    const {useImportSyntax} = this.state;

    const reactImport = formatReactImport(reactPath, reactComponents, useImportSyntax);
    const cssImport = formatCssImport(cssPath, useImportSyntax);
    const multipleComponents = reactComponents && reactComponents.length > 1;

    return (
      <div className="styleguide-import-preview mtxl">
        {reactPath && (
          <Fragment>
            <Grid>
              <FlexCol className="em-high">React component{multipleComponents ? 's' : ''}:</FlexCol>
              <FlexCol fixed>

              </FlexCol>
            </Grid>
            <pre><code className="styleguide-import-preview-code">{reactImport}</code></pre>
          </Fragment>
        )}
        {cssPath && (
          <Fragment>
            <div className="em-high mtxl">CSS only:</div>
            <pre><code className="styleguide-import-preview-code">{cssImport}</code></pre>
          </Fragment>
        )}
        <FormUnit {...{
          inline: true,
          label: 'Use ES6 import syntax',
          labelPosition: 'after',
          labelFor: 'imports-toggle',
          field: <Toggle id="imports-toggle" checked={useImportSyntax} onChange={this.onToggleChange}/>
        }}/>
      </div>
    );
  }
}