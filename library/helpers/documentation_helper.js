var babel = require('babel');

function commentNodes(file) {
  var {ast: {comments}} = babel.transform(file.contents.toString(), {stage: 0});
  return comments;
}

function annotationsToMarkdown(annotations) {
  var components = annotations.map(annotation => {
    var example = `${annotation.example}` || '';
    var properties = (annotation.properties || [])
      .map(property => {
        var propertyTypes = Object.keys(property.types)
          .map(type => `  - \`${type}\`: ${property.types[type]}`)
          .join('\n');
        return `- \`${property.name}\`\n${propertyTypes}\n`;
      })
      .join('\n');
    return [
      `### ${annotation.component}`,
      annotation.description,
      annotation.example,
      'properties' in annotation ?
        `#### Properties\n\n${properties}` :
        ''
    ].join('\n\n');
  }).join('\n\n');

  return ['## Components', components].join('\n\n');
}

function parseAnnotation(annotations, name, value) {
  // Parse `@property` annotations
  if (name === 'property') {
    annotations.properties = annotations.properties || [];
    // Group property annotation by types and descriptions
    let [propertyName, ...propertyTypes] = value.match(/\{.*?}\s*[^{]+|\S+/g);
    propertyTypes = propertyTypes
      // Extract `type` and `description` from strings that look like `{type} description`
      .map(typeString => typeString.match(/\{(.*?)}\s*([\s\S]+)/).slice(1, 3))
      // Convert to JSON
      .reduce(
      (types, [name, value]) => Object.assign(types, {[name]: value.trim()}),
      {}
    );
    annotations.properties.push({name: propertyName, types: propertyTypes});
    // Parse `@see` annotations
  } else if (name === 'see') {
    annotations.references = annotations.references || [];
    annotations.references.push(value);
    // Parse other annotations
  } else {
    annotations[name] = value.trim();
  }
  return annotations;
}

function parseCommentNodes(commentNodes) {
  return commentNodes
    // Only process documentation blocks
    .filter(commentNode => commentNode.value.match(/^\*[\s\S]*@component/))
    // Extract @annotations
    .map(commentNode => commentNode.value.match(/@[^@]+/g))
    // Remove `*` characters and extra new lines
    .map(rawAnnotations => rawAnnotations.map(
        rawAnnotation => rawAnnotation.replace(/(?:\s*\n)?\s*\* ?/g, '\n').trim()
    ))
    // Extract `name` and `text` from a string that looks like '@name text'
    .map(annotationStrings => annotationStrings.map(
        annotationString => annotationString.match(/^@(\S+)\s+([\s\S]*)/).slice(1, 3)
    ))
    // Convert the result into JSON
    .map(annotationTuples => annotationTuples.reduce(
      (annotations, [name, value]) => parseAnnotation(annotations, name, value),
      {}
    ));
}

function componentDocs(file) {
  var comments = commentNodes(file);
  var annotations = parseCommentNodes(comments);
  var markdown = annotationsToMarkdown(annotations);

  return markdown
}

module.exports = {componentDocs};