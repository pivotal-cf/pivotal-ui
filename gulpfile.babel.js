import 'babel-polyfill';
import gulp from 'gulp';
import fs from 'fs';
import parseMarkdown from './src/helpers/markdown_loader';
import YAML from 'yamljs';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const snakeCase = (str) => {
  return str.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();});
};

const getDocMetadata = (fileName) => {
  const filePath = './docs-temp/components/' + fileName;
  const content = fs.readFileSync(filePath);
  const parsed = parseMarkdown(content);
  const metadata = parsed.children[0].value;
  const {cssPath, reactPath, reactComponents} = YAML.parse(metadata);

  const componentName = fileName.charAt(0).toLowerCase() + fileName.slice(1, -3);
  return {[snakeCase(componentName)]: {cssPath, reactComponents, reactPath}}
};

gulp.task('gen-doc-metadata', () => {
  const componentFiles = fs.readdirSync('./docs-temp/components');
  const componentMetadata = componentFiles.map(getDocMetadata)
    .reduce((memo, metadata) => {
      return Object.assign(memo, metadata);
    }, {});
  fs.writeFile("./src/components/component_imports.json", JSON.stringify(componentMetadata));
});