import glob from 'glob';
import path from 'path';

const reactPackageDirs = glob.sync('src/pivotal-ui-react/*', {realpath: true});
const reactAliases = reactPackageDirs.reduce((memo, packageDir) => {
  const componentName = path.basename(packageDir);
  memo[`pui-react-${componentName}\$`] = path.join(packageDir, `${componentName}.js`);
  memo[`pui-react-${componentName}`] = packageDir;
  return memo;
}, {});

const cssPackageDirs = glob.sync('src/pivotal-ui/components/*', {realpath: true});
const cssAliases = cssPackageDirs.reduce((memo, packageDir) => {
  const componentName = path.basename(packageDir);
  memo[`pui-css-${componentName}\$`] = path.join(packageDir, 'index.js');
  memo[`pui-css-${componentName}`] = packageDir;
  return memo;
}, {});


export default {...cssAliases, ...reactAliases}
