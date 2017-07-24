function getComponentPath(path) {
  const navPathRegEx = /\/(\w*)_(\w*)_[\w\-]*.html/;

  const match = navPathRegEx.exec(path);

  if (match) {
    return {
      language: match[1],
      componentType: match[2]
    }
  }

  return {
    language: 'react',
    componentType: 'base'
  }
}

export default getComponentPath;