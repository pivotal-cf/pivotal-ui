const h2 = text => ({
  type: 'heading',
  depth: 2,
  children: [{type: 'text', value: text}]
});

const paragraph = text => ({
  type: 'paragraph',
  children: [{type: 'text', value: text}]
});

const code = text => ({
  type: 'code',
  lang: 'js',
  value: text
});

module.exports = ({cssPath, reactPath, reactComponents}) => {
  const output = [];

  if (cssPath || reactPath) {
    output.push(h2('Imports'));

    if (reactPath) {
      output.push(paragraph('Import React components (including CSS):'));
      output.push(code(`import {${reactComponents.join(', ')}} from '${reactPath}';`));
    }

    if (cssPath) {
      const text = reactPath ? 'Import CSS only:' : 'Import CSS:';
      output.push(paragraph(text));
      output.push(code(`import '${cssPath}';`));
    }
  }

  return output;
};