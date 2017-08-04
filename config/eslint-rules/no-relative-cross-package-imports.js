import path from 'path';

function isReferencingAnotherComponent(currentFile, relativePathToImport) {
  if (!relativePathToImport.includes('/')) {
    return false;
  }

  const currentDir = path.dirname(currentFile);
  const pathToImport = path.normalize(path.join(currentDir, relativePathToImport));
  const [, pathToPivotalUiReact, packageName] = currentDir.match(
    new RegExp('^(.*/src/pivotal-ui-react)/([^/]*)(?:/.*)?$')
  );
  const componentRootDir = path.join(pathToPivotalUiReact, packageName);
  const pathFromComponentRootToImportedFile = path.relative(componentRootDir, pathToImport);
  const dirsInPath = pathFromComponentRootToImportedFile.split('/');

  return dirsInPath.includes('..');
}

export default function(context) {
  return {
    ImportDeclaration: function(node) {
      if (isReferencingAnotherComponent(context.getFilename(), node.source.value)) {
        context.report(node, 'Found import of another package using a relative path');
      }
    },
    CallExpression: function(node) {
      const {type, name} = node.callee;
      if (!(type === 'Identifier' && name === 'require')) {
        return;
      }

      if (isReferencingAnotherComponent(context.getFilename(), node.arguments[0].value)) {
        context.report(node, 'Found require of another package using a relative path');
      }
    }
  };
};
